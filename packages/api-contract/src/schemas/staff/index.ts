/**
 * @description Staff 도메인 스키마 통합 Export
 * @author Shiwoo Min
 * @date 2026-01-27
 */

// 부서 및 조직 정보
export * from './department.schema.js';

// 직원 역할 및 RBAC 권한 정보
export * from './employee-role.schema.js';

// 직원 교육 이력 및 수료 정보
export * from './employee-education.schema.js';

// 직원 기본 계정 및 인사 정보
export * from './employee.schema.js';
