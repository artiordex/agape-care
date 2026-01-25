/**
 * Description: logger.ts - 📌 요양원 ERP 로거
 * Author: Shiwoo Min
 * Date: 2026-01-24
 */
import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import type { LogCategory, LogConfig, LogLevel, LogRecord } from './logger-types.js';
import { PII_PATTERNS, SENSITIVE_FIELDS } from './logger-types.js';

/**
 * 환경변수 파싱
 */
const env = (key: string, fallback: string) => process.env[key] ?? fallback;
const envBool = (key: string, fallback: boolean) => {
  const val = process.env[key]?.toLowerCase();
  if (!val) return fallback;
  return val === 'true' || val === '1' || val === 'yes';
};

/**
 * 기본 설정
 */
const DEFAULT_CONFIG: LogConfig = {
  serviceName: env('SERVICE_NAME', 'agape-care-erp'),
  level: env('LOG_LEVEL', 'info') as LogLevel,
  enableConsole: envBool('ENABLE_CONSOLE_LOG', true),
  enableFile: envBool('ENABLE_FILE_LOG', true),
  enableAuditFile: envBool('ENABLE_AUDIT_LOG', true),
  logDir: env('LOG_DIR', './logs'),
  maxFiles: env('LOG_MAX_FILES', '30d'), // 법정 최소 30일 보관

  maskPII: envBool('MASK_PII', true),
  piiFields: SENSITIVE_FIELDS,
};

/**
 * 개인정보 마스킹 함수
 */
function maskPII(text: string): string {
  let masked = text;

  // 주민등록번호 마스킹: 123456-1******
  masked = masked.replace(PII_PATTERNS.ssn, match => {
    const parts = match.split('-');
    if (parts.length !== 2) return match; // 잘못된 형식
    return `${parts[0]}-${'*'.repeat(7)}`;
  });

  // 전화번호 마스킹: 010-****-5678
  masked = masked.replace(PII_PATTERNS.phone, match => {
    const parts = match.split('-');
    if (parts.length !== 3) return match; // 잘못된 형식
    return `${parts[0]}-****-${parts[2]}`;
  });

  // 이메일 마스킹: abc***@example.com
  masked = masked.replace(PII_PATTERNS.email, match => {
    const [local, domain] = match.split('@');
    if (!local || !domain) return match; // 잘못된 형식은 그대로 반환
    if (local.length <= 3) return `***@${domain}`;
    return `${local.slice(0, 3)}***@${domain}`;
  });

  return masked;
}

/**
 * 객체 내 민감 필드 마스킹
 */
function maskSensitiveFields(obj: unknown): unknown {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(maskSensitiveFields);
  }

  const masked: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
      masked[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      masked[key] = maskSensitiveFields(value);
    } else if (typeof value === 'string') {
      masked[key] = maskPII(value);
    } else {
      masked[key] = value;
    }
  }
  return masked;
}

/**
 * 에러 정규화
 */
function normalizeError(err: unknown) {
  if (err instanceof Error) {
    return {
      message: maskPII(err.message),
      name: err.name,
      stack: err.stack,
      ...(err.cause ? { cause: String(err.cause) } : {}),
    };
  }
  return { message: String(err) };
}

/**
 * 디렉토리 생성
 */
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 요양원 전용 로거 클래스
 */
export class AgapeCareLogger {
  private winston: winston.Logger;
  private config: LogConfig;

  constructor(config: Partial<LogConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    ensureDir(this.config.logDir);

    this.winston = this.createWinstonLogger();
  }

  private createWinstonLogger(): winston.Logger {
    const formats = this.createFormats();
    const transports = this.createTransports(formats);

    return winston.createLogger({
      level: this.config.level,
      levels: winston.config.npm.levels,
      defaultMeta: {
        service: this.config.serviceName,
        pid: process.pid,
        hostname: process.env.HOSTNAME || 'unknown',
      },
      transports,
      exitOnError: false,
    });
  }

  private createFormats() {
    const baseFormat = [
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.errors({ stack: true }),
    ];

    // 개발 환경용 (컬러)
    const devFormat = winston.format.combine(
      ...baseFormat,
      winston.format.colorize(),
      winston.format.printf(info => {
        const { timestamp, level, message, category, userId, userName, action, error } = info as Record<
          string,
          unknown
        >;
        let log = `${timestamp} [${level}]`;

        if (category) log += ` [${category}]`;
        if (userId) log += ` [User:${userId}${userName ? `(${userName})` : ''}]`;
        if (action) log += ` [${action}]`;

        log += ` ${message}`;

        if (error && typeof error === 'object' && 'message' in error) {
          log += `\n  Error: ${error.message}`;
          if ('stack' in error) log += `\n${error.stack}`;
        }

        return log;
      }),
    );

    // 프로덕션 환경용 (JSON)
    const prodFormat = winston.format.combine(...baseFormat, winston.format.json());

    return {
      dev: devFormat,
      prod: prodFormat,
    };
  }

  private createTransports(formats: { dev: winston.Logform.Format; prod: winston.Logform.Format }) {
    const isDev = process.env.NODE_ENV === 'development';
    const transports: winston.transport[] = [];

    // 콘솔
    if (this.config.enableConsole) {
      transports.push(
        new winston.transports.Console({
          format: isDev ? formats.dev : formats.prod,
        }),
      );
    }

    // 일반 로그 파일
    if (this.config.enableFile) {
      transports.push(
        new DailyRotateFile({
          dirname: this.config.logDir,
          filename: 'app-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: this.config.maxFiles,
          maxSize: '20m',
          format: formats.prod,
        }),
      );

      // 에러 전용 로그
      transports.push(
        new DailyRotateFile({
          dirname: this.config.logDir,
          filename: 'error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxFiles: this.config.maxFiles,
          maxSize: '10m',
          format: formats.prod,
        }),
      );
    }

    // 감사 로그 (법적 요구사항)
    if (this.config.enableAuditFile) {
      const auditDir = path.join(this.config.logDir, 'audit');
      ensureDir(auditDir);

      transports.push(
        new DailyRotateFile({
          dirname: auditDir,
          filename: 'audit-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '90d', // 감사 로그는 90일 보관
          maxSize: '50m',
          format: formats.prod,
          level: 'info',
        }),
      );
    }

    return transports;
  }

  /**
   * 일반 로그
   */
  private log(level: string, category: LogCategory, message: string, meta?: Partial<LogRecord>) {
    const record: Record<string, unknown> = {
      level,
      category,
      message: this.config.maskPII ? maskPII(message) : message,
      ...meta,
    };

    // 에러 정규화
    if (meta?.error) {
      record.error = normalizeError(meta.error);
    }

    // 메타데이터 마스킹
    if (meta?.metadata && this.config.maskPII) {
      record.metadata = maskSensitiveFields(meta.metadata);
    }

    this.winston.log(level, record);
  }

  // 편의 메서드
  error(message: string, meta?: Partial<LogRecord>) {
    this.log('error', meta?.category || 'SYSTEM', message, meta);
  }

  warn(message: string, meta?: Partial<LogRecord>) {
    this.log('warn', meta?.category || 'SYSTEM', message, meta);
  }

  info(message: string, meta?: Partial<LogRecord>) {
    this.log('info', meta?.category || 'SYSTEM', message, meta);
  }

  debug(message: string, meta?: Partial<LogRecord>) {
    this.log('debug', meta?.category || 'SYSTEM', message, meta);
  }

  http(method: string, url: string, statusCode: number, duration: number, meta?: Record<string, unknown>) {
    this.log('http', 'SYSTEM', `${method} ${url} ${statusCode} ${duration}ms`, {
      metadata: {
        method,
        url: this.config.maskPII ? maskPII(url) : url,
        statusCode,
        duration,
        ...meta,
      },
    });
  }

  /**
   * 감사 로그 (법적 요구사항)
   */
  audit(action: string, details: Partial<LogRecord>) {
    this.log('info', 'AUDIT', action, {
      ...details,
      action,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * 입소자 관련 로그
   */
  resident(action: string, residentId: number, details?: Partial<LogRecord>) {
    this.audit(action, {
      ...details,
      category: 'RESIDENT',
      residentId,
      entityType: 'resident',
      entityId: residentId,
    });
  }

  /**
   * 건강/의료 기록 로그
   */
  health(action: string, residentId: number, details?: Partial<LogRecord>) {
    this.audit(action, {
      ...details,
      category: 'HEALTH',
      residentId,
      entityType: 'health_record',
      pii: true, // 의료 정보는 개인정보
    });
  }

  /**
   * 투약 기록 로그
   */
  medication(action: string, residentId: number, details?: Partial<LogRecord>) {
    this.audit(action, {
      ...details,
      category: 'MEDICATION',
      residentId,
      entityType: 'medication',
      pii: true,
    });
  }

  /**
   * 사고/사건 로그
   */
  incident(action: string, details: Partial<LogRecord>) {
    this.audit(action, {
      ...details,
      category: 'INCIDENT',
      entityType: 'incident',
    });
  }

  /**
   * 개인정보 접근 로그
   */
  privacyAccess(action: string, userId: number, details?: Partial<LogRecord>) {
    this.audit(action, {
      ...details,
      category: 'PRIVACY',
      userId,
      pii: true,
    });
  }

  /**
   * 로거 종료
   */
  async close() {
    // Winston의 close()는 콜백을 받지 않으므로 직접 호출
    this.winston.close();
    // 트랜스포트들이 닫힐 때까지 짧은 대기
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

/**
 * 기본 로거 인스턴스
 */
export const logger = new AgapeCareLogger();

/**
 * Morgan 호환 스트림
 */
export const httpStream = {
  write: (message: string) => {
    const trimmed = message.trim();
    const match = trimmed.match(/^(\w+)\s+([^\s]+)\s+(\d+)\s+(\d+)ms/);
    if (match) {
      const [, method, url, status, duration] = match;
      // undefined 체크
      if (method && url && status && duration) {
        logger.http(method, url, parseInt(status), parseInt(duration));
      } else {
        logger.info(trimmed, { category: 'SYSTEM' });
      }
    } else {
      logger.info(trimmed, { category: 'SYSTEM' });
    }
  },
};

/**
 * 프로세스 종료 처리
 */
const shutdown = async () => {
  await logger.close();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
