/**
 * Description: logger-types.ts - 📌 요양원 ERP 로깅 타입
 * Author: Shiwoo Min
 * Date: 2026-01-24
 */

/**
 * 로깅 레벨
 */
export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'audit';

/**
 * 요양원 전용 로그 카테고리
 */
export type LogCategory =
  | 'SYSTEM' // 시스템 로그
  | 'AUTH' // 인증/권한
  | 'RESIDENT' // 입소자 관련
  | 'HEALTH' // 건강/의료 기록
  | 'MEDICATION' // 투약 기록
  | 'INCIDENT' // 사고/사건
  | 'CARE' // 케어 서비스
  | 'ATTENDANCE' // 출결/근무
  | 'ACCOUNTING' // 회계
  | 'AUDIT' // 감사 추적
  | 'PRIVACY'; // 개인정보 접근

/**
 * 로그 에러 정보
 */
export interface LogError {
  message: string;
  stack?: string;
  name?: string;
  code?: string | number;
  cause?: unknown;
}

/**
 * 요양원 로그 레코드
 */
export interface LogRecord {
  timestamp: string; // ISO 8601 형식
  level: LogLevel;
  category: LogCategory;
  message: string;

  // 감사 추적
  userId?: number; // 작업 수행자 ID
  userName?: string; // 작업 수행자 이름
  residentId?: number; // 대상 입소자 ID (해당시)

  // 컨텍스트
  action?: string; // 수행한 작업 (CREATE, UPDATE, DELETE, VIEW 등)
  entityType?: string; // 대상 엔티티 타입
  entityId?: number; // 대상 엔티티 ID

  // 부가 정보
  ipAddress?: string;
  userAgent?: string;
  requestId?: string; // 요청 추적 ID

  error?: LogError;
  metadata?: Record<string, unknown>;

  // 개인정보 보호
  pii?: boolean; // 개인정보 포함 여부
}

/**
 * 로거 설정
 */
export interface LogConfig {
  serviceName: string;
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  enableAuditFile: boolean; // 감사 로그 별도 파일
  logDir: string;
  maxFiles: string; // '30d' - 법정 보관 기간

  // 개인정보 보호
  maskPII: boolean; // 자동 마스킹 활성화
  piiFields: string[]; // 마스킹 대상 필드
}

/**
 * Transport 인터페이스
 */
export interface Transport {
  log(rec: LogRecord): void | Promise<void>;
  flush?(): Promise<void>;
  close?(): void | Promise<void>;
}

/**
 * 레벨 순서
 */
export const LEVEL_ORDER: LogLevel[] = ['debug', 'verbose', 'http', 'info', 'warn', 'error', 'audit'];

/**
 * 레벨 가중치
 */
export function levelWeight(lvl: LogLevel): number {
  const i = LEVEL_ORDER.indexOf(lvl);
  return i === -1 ? 999 : i;
}

/**
 * 개인정보 필드 패턴 (주민등록번호, 전화번호 등)
 */
export const PII_PATTERNS = {
  // 주민등록번호: 123456-1234567
  ssn: /\d{6}-\d{7}/g,

  // 전화번호: 010-1234-5678
  phone: /01[0-9]-\d{3,4}-\d{4}/g,

  // 이메일
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
};

/**
 * 민감 필드명 패턴
 */
export const SENSITIVE_FIELDS = [
  'password',
  'passwordHash',
  'password_hash',
  'secret',
  'token',
  'apiKey',
  'api_key',
  'authorization',
  'national_id',
  'nationalId',
  'ssn',
  'social_security',
];
