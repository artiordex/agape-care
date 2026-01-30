/**
 * @description API Contracts 통합 Export
 * @author Shiwoo Min
 * @date 2026-01-27
 */

// 회계, 급여 및 공단 청구 관리 API
export * from './accounting.contract';

// 직원 출결 및 근무 일정 관리 API
export * from './attendance.contract';

// 사용자 인증 및 세션 관리 API
export * from './auth.contract';

// 간호 기록, 요양 서비스 및 사고 보고 API
export * from './care.contract';

// 공지사항, 게시판 및 웹사이트 콘텐츠 관리 API
export * from './content.contract';

// 직원 인사 정보 및 통계 관리 API
export * from './employee.contract';

// 식단표 및 급식 관리 API
export * from './meal.contract';

// 알림 발송 큐 및 SMS 이력 관리 API
export * from './notification.contract';

// 시설 운영, 자산 및 인프라 관리 API
export * from './operations.contract';

// 프로그램 일정 및 참여 관리 API
export * from './program.contract';

// 입소자 기본 정보 및 생활실 배정 관리 API
export * from './resident.contract';

// 대시보드 통계 및 위젯 관리 API
export * from './dashboard.contract';

// 마이페이지 개인정보 및 일정 관리 API
export * from './mypage.contract';

// 시스템 설정, 권한 및 조직 관리 API
export * from './setting.contract';
export * from './web-inquiry.contract';
