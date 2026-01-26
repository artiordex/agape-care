/**
 * @description 직원 출결 및 근태 Mock 데이터
 */

export const mockAttendanceRecords = [
  {
    id: '1',
    employeeName: '김간호',
    date: '2024-05-28',
    checkIn: '08:58',
    checkOut: '18:05',
    status: 'normal',
  },
  {
    id: '2',
    employeeName: '이요양',
    date: '2024-05-28',
    checkIn: '09:15',
    checkOut: '18:00',
    status: 'late', // 교통체증 지각 반영
  },
];

export const mockMonthlyAttendance = [
  { employeeName: '김간호', totalDays: 22, overtimeHours: 4.5 },
  { employeeName: '이요양', totalDays: 20, absentDays: 2 },
]; // 월간 근태 요약
