/**
 * @description Care 도메인 스키마 통합 Export
 * @author Shiwoo Min
 * @date 2026-01-27
 */

// 케어 플랜 수립 정보 (목표 및 기간)
export * from './care-plan.schema';

// 케어 플랜별 세부 실행 항목
export * from './care-plan-item.schema';

// 요양보호사 개별 업무(태스크) 정보
export * from './care-task.schema';

// 입소자/보호자 상담 및 면담 기록
export * from './consultation.schema';

// 시설 내 사건/사고 보고 및 처리 정보
export * from './incident.schema';

// 일일 요양 기록 (간호, 체중, 구강, 응급, 배설 등)
export * from './daily-care.schema';
