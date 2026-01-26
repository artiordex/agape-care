/**
 * @description API Contracts 통합 Export
 * @author Shiwoo Min
 * @date 2026-01-27
 */

// 회계, 급여 및 공단 청구 관리 API
export * from './accounting.contract.js';

// 직원 출결 및 근무 일정 관리 API
export * from './attendance.contract.js';

// 사용자 인증 및 세션 관리 API
export * from './auth.contract.js';

// 간호 기록, 요양 서비스 및 사고 보고 API
export * from './care.contract.js';

// 공지사항, 게시판 및 웹사이트 콘텐츠 관리 API
export * from './content.contract.js';

// 직원 인사 정보 및 통계 관리 API
export * from './employee.contract.js';

// 식단표 및 급식 관리 API
export * from './meal.contract.js';

// 알림 발송 큐 및 SMS 이력 관리 API
export * from './notification.contract.js';

// 시설 운영, 자산 및 인프라 관리 API
export * from './operations.contract.js';

// 프로그램 일정 및 참여 관리 API
export * from './program.contract.js';

// 입소자 기본 정보 및 생활실 배정 관리 API
export * from './resident.contract.js';
