/**
 * @description Employee 도메인 스키마 통합 Export
 * @author Shiwoo Min
 * @date 2026-01-27
 */

// 부서 정보 (부서 생성, 수정, 목록 조회 및 상세 정보)
export * from './department.schema.js';

// 직원 교육 이력 정보 (교육 생성, 수정, 목록 조회 및 통계)
export * from './education.schema.js';

// 직원 기본 정보 및 계정 관리 (직원 생성, 수정, 목록 조회, 통계 및 비밀번호 변경)
export * from './employee.schema.js';

// 직원 역할 및 권한 정보 (역할 생성, 수정, 권한 설정 및 목록 조회)
export * from './role.schema.js';
