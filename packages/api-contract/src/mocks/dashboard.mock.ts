/**
 * @description 대시보드 요약 및 최근 활동 Mock 데이터
 * @author Shiwoo Min
 * @date 2026-01-27
 */

export const mockDashboardSummary = {
  residents: { current: 48, total: 60, trend: '+3명' }, // 이미지 수치 반영
  schedules: { today: 12, status: '진행 중' }, // 이미지 수치 반영
  alerts: { emergency: 2, status: '확인 필요' }, // 이미지 수치 반영
  staff: { present: 22, total: 25, status: '정상' }, // 이미지 수치 반영
};

export const mockRecentActivities = [
  { id: '1', type: 'ADMISSION', name: '김영희 님', action: '입소', time: '30분 전' },
  { id: '2', type: 'MEDICATION', name: '이철수 님', action: '약물 투여', time: '1시간 전' },
  { id: '3', type: 'VISIT', name: '박민지 님', action: '방문 예약', time: '2시간 전' },
  { id: '4', type: 'NOTICE', name: '시설 점검 안내', action: '공지사항', time: '3시간 전' },
  { id: '5', type: 'EMERGENCY', name: '강영수 님', action: '응급 상황', time: '4시간 전' },
]; // 대시보드 "최근 활동" 섹션 데이터

export const mockTodaySchedules = [
  { id: 's1', title: '인지활동 프로그램', time: '14:00', location: '2층 활동실' },
  { id: 's2', title: '정기 건강검진', time: '15:30', location: '의료실' },
  { id: 's3', title: '가족 면회', time: '16:00', location: '1층 로비' },
  { id: 's4', title: '저녁 식사', time: '18:00', location: '식당' },
]; // 대시보드 "오늘의 일정" 섹션 데이터
