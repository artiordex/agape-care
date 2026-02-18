/**
 * Description : console.ts - ?? console ?? ?? ??
 * Author: Shiwoo Min
 * Date: 2026-01-24
 */

import type { LogLevel, LogRecord, Transport } from './logger-types.js';
import { PII_PATTERNS } from './logger-types.js';

/**
 * 레벨 가중치 (audit 포함)
 */
const LEVEL_WEIGHTS: Record<LogLevel, number> = {
  debug: 0,
  verbose: 1,
  http: 2,
  info: 3,
  audit: 3, // info와 동일한 레벨
  warn: 4,
  error: 5,
};

/**
 * ANSI 컬러 코드
 */
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m',
};

/**
 * 레벨별 컬러
 */
const LEVEL_COLORS: Record<LogLevel, string> = {
  error: COLORS.red,
  warn: COLORS.yellow,
  info: COLORS.green,
  audit: COLORS.yellow + COLORS.bold,
  http: COLORS.magenta,
  verbose: COLORS.cyan,
  debug: COLORS.blue,
};

/**
 * 간단한 PII 마스킹
 */
function quickMaskPII(text: string): string {
  let masked = text;

  // 주민등록번호 마스킹
  masked = masked.replace(PII_PATTERNS.ssn, match => {
    const parts = match.split('-');
    return parts.length === 2 ? `${parts[0]}-*******` : match;
  });

  // 전화번호 마스킹
  masked = masked.replace(PII_PATTERNS.phone, match => {
    const parts = match.split('-');
    return parts.length === 3 ? `${parts[0]}-****-${parts[2]}` : match;
  });

  // 이메일 마스킹
  masked = masked.replace(PII_PATTERNS.email, match => {
    const [local, domain] = match.split('@');
    if (!local || !domain) return match;
    if (local.length <= 3) return `***@${domain}`;
    return `${local.slice(0, 3)}***@${domain}`;
  });

  return masked;
}

/**
 * 콘솔 트랜스포트 옵션
 */
export interface ConsoleTransportOptions {
  minLevel?: LogLevel;
  enableColors?: boolean;
  maskPII?: boolean;
  showMetadata?: boolean;
  showTimestamp?: boolean;
}

/**
 * 타임스탬프 포맷팅
 */
function formatTimestamp(rec: LogRecord, showTimestamp: boolean, enableColors: boolean): string {
  if (!showTimestamp) return '';
  const ts = rec.timestamp || new Date().toISOString();
  return enableColors ? `${COLORS.cyan}[${ts}]${COLORS.reset}` : `[${ts}]`;
}

/**
 * 로그 레벨 포맷팅
 */
function formatLevel(level: LogLevel, enableColors: boolean): string {
  const label = level.toUpperCase().padEnd(7);
  if (!enableColors) return label;
  const color = LEVEL_COLORS[level] || '';
  return `${color}${label}${COLORS.reset}`;
}

/**
 * 컨텍스트 정보 포맷팅 (카테고리, 사용자, 입소자, 액션)
 */
function formatContext(rec: LogRecord): string {
  const parts: string[] = [];
  parts.push(`[${rec.category.padEnd(12)}]`);

  if (rec.userId) {
    const userName = rec.userName ? `(${rec.userName})` : '';
    parts.push(`[User:${rec.userId}${userName}]`);
  }

  if (rec.residentId) parts.push(`[Resident:${rec.residentId}]`);
  if (rec.action) parts.push(`[${rec.action}]`);

  return parts.join(' ');
}

/**
 * 에러 상세 정보 출력
 */
function logError(error: NonNullable<LogRecord['error']>, maskPII: boolean) {
  console.error('  Error:', error.message);
  if (error.name) console.error('  Type:', error.name);
  if (error.code) console.error('  Code:', error.code);
  if (error.stack) {
    const stack = maskPII ? quickMaskPII(error.stack) : error.stack;
    console.error(stack);
  }
}

/**
 * 추가 정보 출력 (메타데이터, PII 경고)
 */
function logExtras(rec: LogRecord, showMetadata: boolean, enableColors: boolean) {
  if (showMetadata && rec.metadata && Object.keys(rec.metadata).length > 0) {
    console.log('  Metadata:', JSON.stringify(rec.metadata, null, 2));
  }

  if (rec.pii) {
    const icon = '⚠️  Contains PII';
    console.log(`  ${enableColors ? COLORS.yellow : ''}${icon}${enableColors ? COLORS.reset : ''}`);
  }
}

/**
 * 콘솔 트랜스포트 (개선 버전)
 */
export function ConsoleTransport(options: ConsoleTransportOptions = {}): Transport {
  const {
    minLevel = 'info',
    enableColors = process.stdout.isTTY !== false, // TTY 환경에서만 컬러
    maskPII = true,
    showMetadata = true,
    showTimestamp = true,
  } = options;

  const minWeight = LEVEL_WEIGHTS[minLevel];

  return {
    log(rec: LogRecord) {
      if (LEVEL_WEIGHTS[rec.level] < minWeight) return;

      const timestamp = formatTimestamp(rec, showTimestamp, enableColors);
      const level = formatLevel(rec.level, enableColors);
      const context = formatContext(rec);
      const message = maskPII ? quickMaskPII(rec.message) : rec.message;

      const line = [timestamp, level, context, message].filter(Boolean).join(' ');

      if (rec.level === 'error') console.error(line);
      else if (rec.level === 'warn') console.warn(line);
      else console.log(line);

      if (rec.error) logError(rec.error, maskPII);
      logExtras(rec, showMetadata, enableColors);
    },

    async flush() {
      // Node.js stdout는 자동으로 flush됨
      // 필요시 process.stdout.write 사용 가능
    },

    close() {
      // 정리 작업 없음
    },
  };
}

/**
 * 사전 정의된 트랜스포트 (편의 함수)
 */

// 기본 콘솔 트랜스포트
export const defaultConsoleTransport = ConsoleTransport();

// 개발 환경용 (상세 정보 + 컬러)
export const devConsoleTransport = ConsoleTransport({
  minLevel: 'debug',
  enableColors: true,
  maskPII: false, // 개발 환경에서는 PII 마스킹 안 함
  showMetadata: true,
  showTimestamp: true,
});

// 프로덕션 환경용 (간결 + 마스킹)
export const prodConsoleTransport = ConsoleTransport({
  minLevel: 'info',
  enableColors: false,
  maskPII: true,
  showMetadata: false,
  showTimestamp: true,
});

// 감사 로그용 (상세 정보 + 타임스탬프)
export const auditConsoleTransport = ConsoleTransport({
  minLevel: 'audit',
  enableColors: true,
  maskPII: true,
  showMetadata: true,
  showTimestamp: true,
});
