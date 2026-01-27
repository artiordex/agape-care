/**
 * @description 대시보드 요약 및 최근 활동 Mock 데이터 (개선)
 * @author Shiwoo Min
 * @date 2026-01-27
 */

export const mockDashboardSummary = {
  residents: {
    current: 5, // mockResidents.length
    total: 60,
    capacity: 60,
    occupancyRate: 8.3, // (5/60)*100
    trend: '+1명 (지난 달 대비)',
  },
  schedules: {
    today: 4, // mockTodaySchedules.length
    upcoming: 12,
    status: '진행 중',
  },
  alerts: {
    emergency: 0,
    medication: 3, // 투약 알림
    healthCheck: 2, // 건강검진 필요
    status: '정상',
  },
  staff: {
    present: 6, // mockEmployees.filter(status: ACTIVE).length
    total: 6,
    onLeave: 0,
    status: '정상',
  },
};

export const mockRecentActivities = [
  {
    id: '1',
    type: 'VITAL' as const,
    icon: 'heart',
    name: '김영희 님',
    action: '활력징후 측정',
    details: '혈압 135/85, 정상 범위',
    time: '30분 전',
    timestamp: '2026-01-27T09:30:00Z',
    severity: 'info' as const,
  },
  {
    id: '2',
    type: 'MEDICATION' as const,
    icon: 'pill',
    name: '박순자 님',
    action: '약물 투여 완료',
    details: '도네페질 5mg',
    time: '1시간 전',
    timestamp: '2026-01-27T09:00:00Z',
    severity: 'success' as const,
  },
  {
    id: '3',
    type: 'PROGRAM' as const,
    icon: 'calendar',
    name: '인지활동 프로그램',
    action: '프로그램 시작',
    details: '참석자 4명',
    time: '2시간 전',
    timestamp: '2026-01-27T08:00:00Z',
    severity: 'info' as const,
  },
  {
    id: '4',
    type: 'NOTICE' as const,
    icon: 'bell',
    name: '시설 점검 안내',
    action: '공지사항 등록',
    details: '소방 안전 점검 예정',
    time: '3시간 전',
    timestamp: '2026-01-27T07:00:00Z',
    severity: 'warning' as const,
  },
  {
    id: '5',
    type: 'HEALTH_NOTE' as const,
    icon: 'file-text',
    name: '강영수 님',
    action: '건강 노트 기록',
    details: '휠체어 이동 시 도움 필요',
    time: '4시간 전',
    timestamp: '2026-01-27T06:00:00Z',
    severity: 'info' as const,
  },
];

export const mockTodaySchedules = [
  {
    id: 's1',
    title: '인지활동 프로그램',
    type: 'PROGRAM' as const,
    time: '14:00',
    duration: '90분',
    location: '2층 활동실',
    participants: 4,
    status: 'PLANNED' as const,
    instructor: '박간호사',
  },
  {
    id: 's2',
    title: '정기 건강검진',
    type: 'HEALTH_CHECK' as const,
    time: '15:30',
    duration: '30분',
    location: '의료실',
    participants: 2,
    status: 'PLANNED' as const,
    instructor: '박간호사',
  },
  {
    id: 's3',
    title: '가족 면회',
    type: 'VISIT' as const,
    time: '16:00',
    duration: '60분',
    location: '1층 로비',
    participants: 1,
    status: 'CONFIRMED' as const,
    visitor: '김철수 (김영희 님 아들)',
  },
  {
    id: 's4',
    title: '저녁 식사',
    type: 'MEAL' as const,
    time: '18:00',
    duration: '45분',
    location: '식당',
    participants: 5,
    status: 'PLANNED' as const,
    menu: '백미밥, 된장찌개, 불고기',
  },
];

export const mockWeeklyStats = {
  programAttendance: {
    total: 20,
    attended: 18,
    rate: 90,
    trend: '+5%',
  },
  medicationCompliance: {
    scheduled: 105, // 5명 * 3회 * 7일
    completed: 102,
    rate: 97.1,
    trend: '+2%',
  },
  vitalSignsRecords: {
    scheduled: 35, // 5명 * 1회 * 7일
    completed: 35,
    rate: 100,
    trend: '0%',
  },
  incidents: {
    total: 0,
    serious: 0,
    minor: 0,
    resolved: 0,
  },
};

export const mockMonthlyFinancials = {
  revenue: {
    total: 53500000,
    insurance: 45000000, // 장기요양급여
    personal: 8500000, // 본인부담금
  },
  expenses: {
    total: 36700000,
    salary: 32000000,
    food: 3500000,
    utilities: 1200000,
  },
  profit: 16800000,
  profitMargin: 31.4, // (profit/revenue)*100
};
