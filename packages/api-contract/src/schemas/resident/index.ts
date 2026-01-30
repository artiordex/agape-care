/**
 * @description Resident 스키마 통합 export
 * @author Shiwoo Min
 * @date 2026-01-26
 */

// Resident 기본 정보
export * from './resident.schema';

// Resident 연락처
export * from './contact.schema';

// Resident 건강 노트
export * from './health-note.schema';

// Resident 투약 정보
export * from './medication.schema';

// Resident 호실 배정
export * from './room.schema';

// Resident 활력징후
export * from './vital.schema';
