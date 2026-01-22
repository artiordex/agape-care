
// 회계 관리 Mock 데이터

// 회계 거래 내역
export const accountingTransactions = [
  // 수입 - 본인부담금
  {
    id: 'T001',
    date: '2026-01-21',
    type: 'income', // income: 수입, expense: 지출
    category: '본인부담금',
    subCategory: '등급별 본인부담금',
    description: '1월 본인부담금 수납 - 김영희',
    amount: 520000,
    paymentMethod: 'CMS',
    residentId: 'R001',
    residentName: '김영희',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-21 10:30:00'
  },
  {
    id: 'T002',
    date: '2026-01-21',
    type: 'income',
    category: '본인부담금',
    subCategory: '등급별 본인부담금',
    description: '1월 본인부담금 수납 - 이순자',
    amount: 480000,
    paymentMethod: 'CMS',
    residentId: 'R002',
    residentName: '이순자',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-21 10:30:00'
  },
  {
    id: 'T003',
    date: '2026-01-21',
    type: 'income',
    category: '본인부담금',
    subCategory: '식사재료비',
    description: '1월 식사재료비 수납 - 김영희',
    amount: 150000,
    paymentMethod: 'CMS',
    residentId: 'R001',
    residentName: '김영희',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-21 10:30:00'
  },
  
  // 수입 - 장기요양보험
  {
    id: 'T004',
    date: '2026-01-25',
    type: 'income',
    category: '장기요양보험',
    subCategory: '급여비',
    description: '12월 장기요양급여 입금',
    amount: 28500000,
    paymentMethod: '계좌이체',
    status: 'completed',
    memo: '공단 입금',
    createdBy: '사무국장',
    createdAt: '2026-01-25 14:20:00'
  },
  
  // 지출 - 인건비 (급여 자동 반영)
  {
    id: 'T005',
    date: '2026-01-10',
    type: 'expense',
    category: '인건비',
    subCategory: '급여',
    description: '12월 급여지급 - 김요양',
    amount: 2176270,
    paymentMethod: '계좌이체',
    employeeId: 'E001',
    employeeName: '김요양',
    status: 'completed',
    memo: '급여 자동 반영',
    linkedPayrollId: 'PH001',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-10 09:00:00'
  },
  {
    id: 'T006',
    date: '2026-01-10',
    type: 'expense',
    category: '인건비',
    subCategory: '급여',
    description: '12월 급여지급 - 이간호',
    amount: 3120198,
    paymentMethod: '계좌이체',
    employeeId: 'E002',
    employeeName: '이간호',
    status: 'completed',
    memo: '급여 자동 반영',
    linkedPayrollId: 'PH001',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-10 09:00:00'
  },
  {
    id: 'T007',
    date: '2026-01-10',
    type: 'expense',
    category: '인건비',
    subCategory: '급여',
    description: '12월 급여지급 - 박시설',
    amount: 4539673,
    paymentMethod: '계좌이체',
    employeeId: 'E003',
    employeeName: '박시설',
    status: 'completed',
    memo: '급여 자동 반영',
    linkedPayrollId: 'PH001',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-10 09:00:00'
  },
  {
    id: 'T008',
    date: '2026-01-10',
    type: 'expense',
    category: '인건비',
    subCategory: '급여',
    description: '12월 급여지급 - 최영양',
    amount: 2413485,
    paymentMethod: '계좌이체',
    employeeId: 'E004',
    employeeName: '최영양',
    status: 'completed',
    memo: '급여 자동 반영',
    linkedPayrollId: 'PH001',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-10 09:00:00'
  },
  {
    id: 'T009',
    date: '2026-01-10',
    type: 'expense',
    category: '인건비',
    subCategory: '급여',
    description: '12월 급여지급 - 정물리',
    amount: 2007806,
    paymentMethod: '계좌이체',
    employeeId: 'E005',
    employeeName: '정물리',
    status: 'completed',
    memo: '급여 자동 반영',
    linkedPayrollId: 'PH001',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-10 09:00:00'
  },
  
  // 지출 - 인건비 (4대보험)
  {
    id: 'T010',
    date: '2026-01-15',
    type: 'expense',
    category: '인건비',
    subCategory: '4대보험',
    description: '12월 4대보험료 납부',
    amount: 5011910,
    paymentMethod: '계좌이체',
    status: 'completed',
    memo: '국민연금+건강보험+장기요양+고용보험',
    createdBy: '사무국장',
    createdAt: '2026-01-15 11:00:00'
  },
  
  // 지출 - 식자재
  {
    id: 'T011',
    date: '2026-01-05',
    type: 'expense',
    category: '식자재',
    subCategory: '급식재료',
    description: '1월 식자재 구입 - ㈜농협식품',
    amount: 3500000,
    paymentMethod: '카드',
    status: 'completed',
    memo: '',
    createdBy: '최영양',
    createdAt: '2026-01-05 15:20:00'
  },
  {
    id: 'T012',
    date: '2026-01-12',
    type: 'expense',
    category: '식자재',
    subCategory: '급식재료',
    description: '1월 육류 구입 - 정육점',
    amount: 850000,
    paymentMethod: '카드',
    status: 'completed',
    memo: '',
    createdBy: '최영양',
    createdAt: '2026-01-12 10:40:00'
  },
  
  // 지출 - 공과금
  {
    id: 'T013',
    date: '2026-01-08',
    type: 'expense',
    category: '공과금',
    subCategory: '전기료',
    description: '12월 전기료',
    amount: 1250000,
    paymentMethod: '자동이체',
    status: 'completed',
    memo: '',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-08 09:00:00'
  },
  {
    id: 'T014',
    date: '2026-01-08',
    type: 'expense',
    category: '공과금',
    subCategory: '수도료',
    description: '12월 수도료',
    amount: 480000,
    paymentMethod: '자동이체',
    status: 'completed',
    memo: '',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-08 09:00:00'
  },
  {
    id: 'T015',
    date: '2026-01-08',
    type: 'expense',
    category: '공과금',
    subCategory: '가스료',
    description: '12월 가스료',
    amount: 920000,
    paymentMethod: '자동이체',
    status: 'completed',
    memo: '',
    createdBy: 'SYSTEM',
    createdAt: '2026-01-08 09:00:00'
  },
  
  // 지출 - 시설비
  {
    id: 'T016',
    date: '2026-01-18',
    type: 'expense',
    category: '시설비',
    subCategory: '수선유지',
    description: '난방시설 수리',
    amount: 650000,
    paymentMethod: '카드',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-18 16:30:00'
  },
  
  // 지출 - 비품
  {
    id: 'T017',
    date: '2026-01-20',
    type: 'expense',
    category: '비품',
    subCategory: '소모품',
    description: '위생용품 구입',
    amount: 320000,
    paymentMethod: '카드',
    status: 'completed',
    memo: '',
    createdBy: '이간호',
    createdAt: '2026-01-20 11:10:00'
  },
  
  // 지출 - 교육비
  {
    id: 'T018',
    date: '2026-01-22',
    type: 'expense',
    category: '교육비',
    subCategory: '직원교육',
    description: '감염관리 교육비',
    amount: 180000,
    paymentMethod: '카드',
    status: 'completed',
    memo: '요양보호사 3명',
    createdBy: '박시설',
    createdAt: '2026-01-22 14:00:00'
  }
];

// 회계 카테고리 정의
export const accountingCategories = {
  income: [
    { value: '본인부담금', label: '본인부담금', subCategories: ['등급별 본인부담금', '식사재료비', '상급침실비', '기타'] },
    { value: '장기요양보험', label: '장기요양보험', subCategories: ['급여비', '가산금', '기타'] },
    { value: '기타수입', label: '기타수입', subCategories: ['이자수익', '후원금', '기타'] }
  ],
  expense: [
    { value: '인건비', label: '인건비', subCategories: ['급여', '상여금', '퇴직금', '4대보험', '기타'] },
    { value: '식자재', label: '식자재', subCategories: ['급식재료', '간식재료', '기타'] },
    { value: '공과금', label: '공과금', subCategories: ['전기료', '수도료', '가스료', '통신비', '기타'] },
    { value: '시설비', label: '시설비', subCategories: ['임차료', '수선유지', '감가상각', '기타'] },
    { value: '비품', label: '비품', subCategories: ['소모품', '의료소모품', '사무용품', '기타'] },
    { value: '교육비', label: '교육비', subCategories: ['직원교육', '도서구입', '기타'] },
    { value: '운영비', label: '운영비', subCategories: ['차량유지비', '보험료', '세금', '기타'] }
  ]
};

// 결제 방법
export const paymentMethods = [
  { value: 'CMS', label: 'CMS' },
  { value: '계좌이체', label: '계좌이체' },
  { value: '자동이체', label: '자동이체' },
  { value: '카드', label: '카드' },
  { value: '현금', label: '현금' },
  { value: '어음', label: '어음' },
  { value: '기타', label: '기타' }
];

// 월별 회계 요약 통계
export const monthlySummary = {
  '2026-01': {
    totalIncome: 29650000,
    totalExpense: 22532433,
    balance: 7117567,
    incomeByCategory: {
      '본인부담금': 1150000,
      '장기요양보험': 28500000,
      '기타수입': 0
    },
    expenseByCategory: {
      '인건비': 17268342,
      '식자재': 4350000,
      '공과금': 2650000,
      '시설비': 650000,
      '비품': 320000,
      '교육비': 180000,
      '운영비': 0
    },
    transactionCount: {
      income: 4,
      expense: 14,
      total: 18
    }
  },
  '2025-12': {
    totalIncome: 30200000,
    totalExpense: 23800000,
    balance: 6400000,
    incomeByCategory: {
      '본인부담금': 1200000,
      '장기요양보험': 29000000,
      '기타수입': 0
    },
    expenseByCategory: {
      '인건비': 18500000,
      '식자재': 4200000,
      '공과금': 2100000,
      '시설비': 800000,
      '비품': 400000,
      '교육비': 200000,
      '운영비': 600000
    },
    transactionCount: {
      income: 5,
      expense: 16,
      total: 21
    }
  }
};
