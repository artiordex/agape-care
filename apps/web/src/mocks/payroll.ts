
// 급여 관리 Mock 데이터

// 직원 급여 설정 정보
export const payrollSettings = [
  {
    employeeId: 'E001',
    employeeName: '김요양',
    position: '요양보호사',
    employmentType: 'hourly', // hourly: 시급제, monthly: 월급제
    baseWage: 10030, // 2026년 최저시급
    hourlyWage: 10030,
    monthlyWage: 0,
    nightBonusRate: 0.5, // 야간수당 50%
    overtimeRate: 0.5, // 연장수당 50%
    holidayRate: 1.5, // 휴일수당 150%
    weeklyAllowance: true, // 주휴수당 지급 여부
    mealAllowance: 100000, // 식대
    transportAllowance: 50000, // 교통비
    positionAllowance: 0, // 직책수당
    riskAllowance: 50000, // 위험수당
    longevityAllowance: 0, // 근속수당
    insurance: {
      pension: true, // 국민연금 4.5%
      health: true, // 건강보험 3.545%
      longTermCare: true, // 장기요양 0.4591%
      employ: true // 고용보험 0.9%
    },
    tax: {
      income: true, // 소득세
      local: true // 지방소득세
    },
    hireDate: '2024-03-01',
    yearsOfService: 1
  },
  {
    employeeId: 'E002',
    employeeName: '이간호',
    position: '간호조무사',
    employmentType: 'monthly',
    baseWage: 0,
    hourlyWage: 0,
    monthlyWage: 2800000,
    nightBonusRate: 0.5,
    overtimeRate: 0.5,
    holidayRate: 1.5,
    weeklyAllowance: false,
    mealAllowance: 150000,
    transportAllowance: 100000,
    positionAllowance: 200000,
    riskAllowance: 100000,
    longevityAllowance: 50000,
    insurance: {
      pension: true,
      health: true,
      longTermCare: true,
      employ: true
    },
    tax: {
      income: true,
      local: true
    },
    hireDate: '2023-01-15',
    yearsOfService: 2
  },
  {
    employeeId: 'E003',
    employeeName: '박시설',
    position: '시설장',
    employmentType: 'monthly',
    baseWage: 0,
    hourlyWage: 0,
    monthlyWage: 4500000,
    nightBonusRate: 0,
    overtimeRate: 0,
    holidayRate: 0,
    weeklyAllowance: false,
    mealAllowance: 200000,
    transportAllowance: 150000,
    positionAllowance: 500000,
    riskAllowance: 0,
    longevityAllowance: 200000,
    insurance: {
      pension: true,
      health: true,
      longTermCare: true,
      employ: true
    },
    tax: {
      income: true,
      local: true
    },
    hireDate: '2021-05-01',
    yearsOfService: 4
  },
  {
    employeeId: 'E004',
    employeeName: '최영양',
    position: '영양사',
    employmentType: 'monthly',
    baseWage: 0,
    hourlyWage: 0,
    monthlyWage: 2500000,
    nightBonusRate: 0,
    overtimeRate: 0.5,
    holidayRate: 1.5,
    weeklyAllowance: false,
    mealAllowance: 120000,
    transportAllowance: 80000,
    positionAllowance: 100000,
    riskAllowance: 0,
    longevityAllowance: 0,
    insurance: {
      pension: true,
      health: true,
      longTermCare: true,
      employ: true
    },
    tax: {
      income: true,
      local: true
    },
    hireDate: '2024-06-01',
    yearsOfService: 0
  },
  {
    employeeId: 'E005',
    employeeName: '정물리',
    position: '물리치료사',
    employmentType: 'hourly',
    baseWage: 15000,
    hourlyWage: 15000,
    monthlyWage: 0,
    nightBonusRate: 0,
    overtimeRate: 0.5,
    holidayRate: 1.5,
    weeklyAllowance: true,
    mealAllowance: 80000,
    transportAllowance: 60000,
    positionAllowance: 0,
    riskAllowance: 0,
    longevityAllowance: 0,
    insurance: {
      pension: true,
      health: true,
      longTermCare: true,
      employ: true
    },
    tax: {
      income: true,
      local: true
    },
    hireDate: '2024-09-01',
    yearsOfService: 0
  }
];

// 월별 급여 계산 결과
export const monthlyPayrollResults = [
  {
    employeeId: 'E001',
    employeeName: '김요양',
    position: '요양보호사',
    month: '2026-01',
    workDays: 22,
    totalWorkHours: 176,
    regularHours: 160,
    overtimeHours: 16,
    nightHours: 0,
    holidayHours: 0,
    lateCount: 0,
    earlyLeaveCount: 0,
    absentCount: 0,
    basePay: 1604800, // 160시간 × 10,030원
    overtimePay: 240720, // 16시간 × 10,030 × 1.5
    nightPay: 0,
    holidayPay: 0,
    weeklyAllowance: 401200, // 주휴수당
    mealAllowance: 100000,
    transportAllowance: 50000,
    positionAllowance: 0,
    riskAllowance: 50000,
    longevityAllowance: 0,
    totalPay: 2446720,
    pension: 110102, // 4.5%
    health: 86726, // 3.545%
    longTermCare: 11232, // 0.4591%
    employ: 22020, // 0.9%
    incomeTax: 36700,
    localTax: 3670,
    totalDeduction: 270450,
    netPay: 2176270,
    status: 'calculated' // calculated: 계산완료, paid: 지급완료, pending: 대기중
  },
  {
    employeeId: 'E002',
    employeeName: '이간호',
    position: '간호조무사',
    month: '2026-01',
    workDays: 22,
    totalWorkHours: 176,
    regularHours: 176,
    overtimeHours: 0,
    nightHours: 16,
    holidayHours: 0,
    lateCount: 0,
    earlyLeaveCount: 0,
    absentCount: 0,
    basePay: 2800000,
    overtimePay: 0,
    nightPay: 266667, // 통상시급 × 16시간 × 1.5
    holidayPay: 0,
    weeklyAllowance: 0,
    mealAllowance: 150000,
    transportAllowance: 100000,
    positionAllowance: 200000,
    riskAllowance: 100000,
    longevityAllowance: 50000,
    totalPay: 3666667,
    pension: 165000, // 4.5%
    health: 129974, // 3.545%
    longTermCare: 16832, // 0.4591%
    employ: 33000, // 0.9%
    incomeTax: 183330,
    localTax: 18333,
    totalDeduction: 546469,
    netPay: 3120198,
    status: 'paid'
  },
  {
    employeeId: 'E003',
    employeeName: '박시설',
    position: '시설장',
    month: '2026-01',
    workDays: 22,
    totalWorkHours: 176,
    regularHours: 176,
    overtimeHours: 0,
    nightHours: 0,
    holidayHours: 0,
    lateCount: 0,
    earlyLeaveCount: 0,
    absentCount: 0,
    basePay: 4500000,
    overtimePay: 0,
    nightPay: 0,
    holidayPay: 0,
    weeklyAllowance: 0,
    mealAllowance: 200000,
    transportAllowance: 150000,
    positionAllowance: 500000,
    riskAllowance: 0,
    longevityAllowance: 200000,
    totalPay: 5550000,
    pension: 249750, // 4.5%
    health: 196748, // 3.545%
    longTermCare: 25479, // 0.4591%
    employ: 49950, // 0.9%
    incomeTax: 444000,
    localTax: 44400,
    totalDeduction: 1010327,
    netPay: 4539673,
    status: 'paid'
  },
  {
    employeeId: 'E004',
    employeeName: '최영양',
    position: '영양사',
    month: '2026-01',
    workDays: 22,
    totalWorkHours: 176,
    regularHours: 176,
    overtimeHours: 0,
    nightHours: 0,
    holidayHours: 0,
    lateCount: 0,
    earlyLeaveCount: 0,
    absentCount: 0,
    basePay: 2500000,
    overtimePay: 0,
    nightPay: 0,
    holidayPay: 0,
    weeklyAllowance: 0,
    mealAllowance: 120000,
    transportAllowance: 80000,
    positionAllowance: 100000,
    riskAllowance: 0,
    longevityAllowance: 0,
    totalPay: 2800000,
    pension: 126000, // 4.5%
    health: 99260, // 3.545%
    longTermCare: 12855, // 0.4591%
    employ: 25200, // 0.9%
    incomeTax: 112000,
    localTax: 11200,
    totalDeduction: 386515,
    netPay: 2413485,
    status: 'calculated'
  },
  {
    employeeId: 'E005',
    employeeName: '정물리',
    position: '물리치료사',
    month: '2026-01',
    workDays: 15,
    totalWorkHours: 120,
    regularHours: 120,
    overtimeHours: 0,
    nightHours: 0,
    holidayHours: 0,
    lateCount: 0,
    earlyLeaveCount: 0,
    absentCount: 0,
    basePay: 1800000, // 120시간 × 15,000원
    overtimePay: 0,
    nightPay: 0,
    holidayPay: 0,
    weeklyAllowance: 360000, // 주휴수당
    mealAllowance: 80000,
    transportAllowance: 60000,
    positionAllowance: 0,
    riskAllowance: 0,
    longevityAllowance: 0,
    totalPay: 2300000,
    pension: 103500, // 4.5%
    health: 81535, // 3.545%
    longTermCare: 10559, // 0.4591%
    employ: 20700, // 0.9%
    incomeTax: 69000,
    localTax: 6900,
    totalDeduction: 292194,
    netPay: 2007806,
    status: 'calculated'
  }
];

// 급여 지급 이력
export const payrollHistory = [
  {
    id: 'PH001',
    month: '2025-12',
    totalEmployees: 5,
    totalPay: 14763387,
    totalDeduction: 2505955,
    totalNetPay: 12257432,
    paymentDate: '2026-01-10',
    paymentMethod: '계좌이체',
    status: 'completed',
    reflectedToAccounting: true,
    createdBy: '박시설',
    createdAt: '2026-01-08'
  },
  {
    id: 'PH002',
    month: '2026-01',
    totalEmployees: 5,
    totalPay: 14763387,
    totalDeduction: 2505955,
    totalNetPay: 12257432,
    paymentDate: '2026-02-10',
    paymentMethod: '계좌이체',
    status: 'pending',
    reflectedToAccounting: false,
    createdBy: '박시설',
    createdAt: '2026-02-05'
  }
];

// 공휴일 데이터 (2026년)
export const holidays2026 = [
  { date: '2026-01-01', name: '신정' },
  { date: '2026-01-28', name: '설날 연휴' },
  { date: '2026-01-29', name: '설날' },
  { date: '2026-01-30', name: '설날 연휴' },
  { date: '2026-03-01', name: '삼일절' },
  { date: '2026-04-05', name: '식목일' },
  { date: '2026-05-05', name: '어린이날' },
  { date: '2026-05-24', name: '부처님 오신 날' },
  { date: '2026-06-06', name: '현충일' },
  { date: '2026-08-15', name: '광복절' },
  { date: '2026-09-16', name: '추석 연휴' },
  { date: '2026-09-17', name: '추석' },
  { date: '2026-09-18', name: '추석 연휴' },
  { date: '2026-10-03', name: '개천절' },
  { date: '2026-10-09', name: '한글날' },
  { date: '2026-12-25', name: '크리스마스' }
];
