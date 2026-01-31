/**
 * 장기요양보험 청구 관리용 상수 정의
 */

// 1. 청구 상태 정의
export const CLAIM_STATUS = {
  DRAFT: '작성중',
  SUBMITTED: '청구완료',
  APPROVED: '승인완료',
  REJECTED: '반려',
} as const;

export type ClaimStatusType = (typeof CLAIM_STATUS)[keyof typeof CLAIM_STATUS];

// 2. 장기요양 등급 정의
export const CARE_GRADES = [
  '1등급',
  '2등급',
  '3등급',
  '4등급',
  '5등급',
  '인지지원등급',
  '등급외(A)',
  '등급외(B)',
  '미정',
] as const;

// 3. 상태별 UI 스타일 매핑 (Agape-Care 표준 배지 스타일)
export const STATUS_STYLES: Record<ClaimStatusType, string> = {
  [CLAIM_STATUS.DRAFT]: 'bg-gray-100 text-gray-600 border-gray-300',
  [CLAIM_STATUS.SUBMITTED]: 'bg-blue-50 text-blue-700 border-blue-200',
  [CLAIM_STATUS.APPROVED]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  [CLAIM_STATUS.REJECTED]: 'bg-red-50 text-red-700 border-red-200',
};

// 4. 상태별 아이콘 매핑
export const STATUS_ICONS: Record<ClaimStatusType, string> = {
  [CLAIM_STATUS.DRAFT]: 'ri-edit-line',
  [CLAIM_STATUS.SUBMITTED]: 'ri-send-plane-fill',
  [CLAIM_STATUS.APPROVED]: 'ri-checkbox-circle-fill',
  [CLAIM_STATUS.REJECTED]: 'ri-error-warning-fill',
};

// 5. 기본 급여 기준 (예시 수치 - 수가 변경 시 여기만 수정)
export const CLAIM_CONFIG = {
  DEFAULT_SERVICE_DAYS: 30,
  DEFAULT_SERVICE_AMOUNT: 2000000,
  DEFAULT_COPAYMENT_RATE: 0.2, // 일반 20% 기준
};
