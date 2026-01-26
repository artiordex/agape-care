/**
 * @description 상담 및 요양 기록 Mock 데이터
 */

export const mockConsultations = [
  {
    id: '1',
    recipientName: '김영희',
    guardianName: '김철수',
    categoryName: '건강상태',
    methodName: '전화',
    content: '혈압이 다소 높아진 상태이며 약물 조정 필요 보임.', // 상담 내용 반영
    status: 'completed',
  },
];

export const mockDailyCareRecords = [
  {
    residentId: 1,
    date: '2024-01-15',
    meal: { breakfast: '전량 섭취', lunch: '2/3 섭취' },
    vitals: { bp: '130/80', temp: '36.5' },
    notes: '컨디션 양호',
  },
]; // 일일 케어 기록
