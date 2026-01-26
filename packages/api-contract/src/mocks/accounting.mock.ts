/**
 * @description 회계 및 급여 Mock 데이터
 */

export const mockAccountingTransactions = [
  {
    id: 'T001',
    date: '2026-01-21',
    type: 'income',
    category: '본인부담금',
    description: '1월 본인부담금 수납 - 김영희',
    amount: 520000,
    paymentMethod: 'CMS',
    status: 'completed',
  },
  // ... (T001 ~ T018 내역 통합)
];

export const mockPayrollResults = [
  {
    employeeId: 'E001',
    employeeName: '김요양',
    totalPay: 2446720,
    netPay: 2176270,
    status: 'calculated',
  },
  // ... (E001 ~ E005 계산 결과 통합)
];

export const mockPayrollHistory = [
  {
    id: 'PH001',
    month: '2025-12',
    totalEmployees: 5,
    totalNetPay: 12257432,
    status: 'completed',
  },
]; // 급여 지급 이력 데이터
