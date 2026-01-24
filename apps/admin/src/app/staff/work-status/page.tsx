'use client';

import { useEffect, useState } from 'react';

interface Staff {
  id: string;
  name: string;
  position: string;
  type: string;
  status: string;
}

interface WorkSchedule {
  staffId: string;
  date: string;
  workType: string;
  startTime: string;
  endTime: string;
  breakTime: number;
  overtime: number;
}

interface StaffStats {
  totalWorkDays: number;
  totalHours: number;
  nightShifts: number;
  weekendShifts: number;
  vacationDays: number;
  overtimeHours: number;
  standardHours: number;
  shortage: number;
}

const WORK_CODES = {
  S: { name: '주간', hours: 12, color: 'bg-blue-100 text-blue-800' },
  A: { name: '단축주간', hours: 9, color: 'bg-cyan-100 text-cyan-800' },
  D: { name: '오전근무', hours: 9, color: 'bg-green-100 text-green-800' },
  E: { name: '오후근무', hours: 9, color: 'bg-yellow-100 text-yellow-800' },
  N: { name: '야간근무', hours: 12, color: 'bg-purple-100 text-purple-800' },
  연: { name: '연차', hours: 8, color: 'bg-pink-100 text-pink-800' },
  휴: { name: '휴무', hours: 0, color: 'bg-gray-100 text-gray-800' },
  O: { name: '반차', hours: 4, color: 'bg-orange-100 text-orange-800' },
};

export default function StaffWorkStatus() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [schedules, setSchedules] = useState<WorkSchedule[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(yearMonth);
    loadStaffData();
    loadSchedules(yearMonth);
  }, []);

  const loadStaffData = () => {
    const saved = localStorage.getItem('admin_staff');
    if (saved) {
      try {
        const allStaff = JSON.parse(saved);
        setStaffList(Array.isArray(allStaff) ? allStaff.filter((s: Staff) => s.status === '재직') : []);
      } catch (e) {
        console.error('Failed to parse staff data', e);
        setStaffList([]);
      }
    }
  };

  const loadSchedules = (month: string) => {
    const saved = localStorage.getItem(`work_schedule_detail_${month}`);
    if (saved) {
      try {
        setSchedules(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse schedules', e);
        setSchedules([]);
      }
    } else {
      setSchedules([]);
    }
  };

  const calculateStaffStats = (staffId: string): StaffStats => {
    const staffSchedules = schedules.filter(s => s.staffId === staffId);

    let totalWorkDays = 0;
    let totalHours = 0;
    let nightShifts = 0;
    let weekendShifts = 0;
    let vacationDays = 0;
    let overtimeHours = 0;

    staffSchedules.forEach(schedule => {
      const workCode = WORK_CODES[schedule.workType as keyof typeof WORK_CODES];
      if (workCode) {
        if (workCode.hours > 0) totalWorkDays++;
        totalHours += workCode.hours;

        if (schedule.workType === 'N') nightShifts++;
        if (schedule.workType === '연' || schedule.workType === 'O') vacationDays++;

        overtimeHours += schedule.overtime || 0;

        const date = new Date(schedule.date);
        if (date.getDay() === 0 || date.getDay() === 6) {
          if (schedule.workType !== '휴' && schedule.workType !== '연') {
            weekendShifts++;
          }
        }
      }
    });

    const standardHours = 209; // 월 209시간 (주 40시간 기준)
    const shortage = standardHours > totalHours ? standardHours - totalHours : 0;

    return {
      totalWorkDays,
      totalHours,
      nightShifts,
      weekendShifts,
      vacationDays,
      overtimeHours,
      standardHours,
      shortage,
    };
  };

  const handleMonthChange = (direction: number) => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const newDate = new Date(year, month - 1 + direction, 1);
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(newMonth);
    loadSchedules(newMonth);
  };

  const getDaysInMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  };

  const getScheduleForDate = (staffId: string, date: string) => {
    return schedules.find(s => s.staffId === staffId && s.date === date);
  };

  const exportToExcel = () => {
    let csv = '직원명,직위,근무일수,총근무시간,야간근무,주말근무,휴가,초과근무,부족시간\n';

    staffList.forEach(staff => {
      const stats = calculateStaffStats(staff.id);
      csv += `${staff.name},${staff.position},${stats.totalWorkDays}일,${stats.totalHours}h,${stats.nightShifts}회,${stats.weekendShifts}일,${stats.vacationDays}일,${stats.overtimeHours}h,${stats.shortage}h\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `직원근무현황_${selectedMonth}.csv`;
    link.click();
  };

  const daysInMonth = getDaysInMonth(selectedMonth);

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">직원별 근무현황</h1>
        <p className="text-sm text-gray-600">직원별 근무 통계 및 월간 근무 내역을 조회합니다</p>
      </div>

      {/* 컨트롤 영역 */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleMonthChange(-1)}
              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <i className="ri-arrow-left-s-line text-2xl text-gray-600"></i>
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedMonth.split('-')[0]}년 {parseInt(selectedMonth.split('-')[1])}월
              </h2>
            </div>
            <button
              onClick={() => handleMonthChange(1)}
              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <i className="ri-arrow-right-s-line text-2xl text-gray-600"></i>
            </button>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-2 rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`cursor-pointer rounded-lg px-4 py-2 transition-colors ${
                  viewMode === 'list' ? 'bg-white font-medium text-teal-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <i className="ri-list-check mr-2"></i>
                목록형
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`cursor-pointer rounded-lg px-4 py-2 transition-colors ${
                  viewMode === 'calendar' ? 'bg-white font-medium text-teal-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <i className="ri-calendar-line mr-2"></i>
                달력형
              </button>
            </div>
            <button
              onClick={exportToExcel}
              className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
            >
              <i className="ri-file-excel-line mr-2"></i>
              엑셀 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 목록형 뷰 */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 좌측: 직원 목록 및 통계 */}
          <div className="space-y-4">
            {staffList.map(staff => {
              const stats = calculateStaffStats(staff.id);
              const isSelected = selectedStaff?.id === staff.id;

              return (
                <div
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff)}
                  className={`cursor-pointer rounded-lg border-2 bg-white p-6 shadow-sm transition-all ${
                    isSelected ? 'border-teal-500 shadow-md' : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{staff.name}</h3>
                      <p className="text-sm text-gray-600">
                        {staff.position} · {staff.type}
                      </p>
                    </div>
                    {isSelected && <i className="ri-checkbox-circle-fill text-2xl text-teal-500"></i>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <div className="mb-1 text-xs font-medium text-blue-600">근무일수</div>
                      <div className="text-xl font-bold text-blue-700">{stats.totalWorkDays}일</div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <div className="mb-1 text-xs font-medium text-green-600">총 근무시간</div>
                      <div className="text-xl font-bold text-green-700">{stats.totalHours}h</div>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3">
                      <div className="mb-1 text-xs font-medium text-purple-600">야간근무</div>
                      <div className="text-xl font-bold text-purple-700">{stats.nightShifts}회</div>
                    </div>
                    <div className="rounded-lg bg-pink-50 p-3">
                      <div className="mb-1 text-xs font-medium text-pink-600">휴가</div>
                      <div className="text-xl font-bold text-pink-700">{stats.vacationDays}일</div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">주말근무:</span>
                      <span className="font-medium text-gray-800">{stats.weekendShifts}일</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">초과근무:</span>
                      <span className={`font-bold ${stats.overtimeHours > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
                        {stats.overtimeHours}h
                      </span>
                    </div>
                  </div>

                  {stats.shortage > 0 && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2">
                      <div className="text-xs font-medium text-red-600">
                        <i className="ri-alarm-warning-line mr-1"></i>
                        근무시간 부족: {stats.shortage}h (기준: {stats.standardHours}h)
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 우측: 선택된 직원의 달력 */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {selectedStaff ? (
              <>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white">
                  <h3 className="text-lg font-bold">{selectedStaff.name}님의 근무일정</h3>
                  <p className="mt-1 text-sm text-teal-100">{selectedMonth}</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-2">
                    {/* 요일 헤더 */}
                    {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                      <div
                        key={day}
                        className={`py-2 text-center text-xs font-bold ${
                          index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                    {/* 날짜 */}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                      const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
                      const schedule = getScheduleForDate(selectedStaff.id, dateStr);
                      const workCode = schedule ? WORK_CODES[schedule.workType as keyof typeof WORK_CODES] : null;
                      const date = new Date(dateStr);
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                      return (
                        <div
                          key={day}
                          className={`min-h-16 rounded-lg border p-2 ${
                            isWeekend ? 'bg-gray-50' : 'bg-white'
                          } border-gray-200`}
                        >
                          <div className={`mb-1 text-xs font-bold ${isWeekend ? 'text-red-500' : 'text-gray-700'}`}>
                            {day}
                          </div>
                          {workCode && schedule && (
                            <div className={`rounded px-1.5 py-0.5 text-center text-xs font-medium ${workCode.color}`}>
                              {schedule.workType}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <i className="ri-user-search-line mb-4 text-6xl text-gray-300"></i>
                <p className="text-gray-500">좌측에서 직원을 선택하세요</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 달력형 뷰 */}
      {viewMode === 'calendar' && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                  <th className="sticky left-0 z-10 border border-gray-300 bg-teal-500 px-4 py-3 text-left text-sm font-semibold">
                    직원명
                  </th>
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
                    const date = new Date(dateStr);
                    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                    return (
                      <th
                        key={day}
                        className={`border border-gray-300 px-2 py-3 text-center text-xs font-semibold ${
                          isWeekend ? 'bg-red-400' : 'bg-teal-500'
                        }`}
                      >
                        <div>{day}</div>
                        <div className="text-[10px] font-normal">{dayOfWeek}</div>
                      </th>
                    );
                  })}
                  <th className="border border-gray-300 bg-blue-500 px-4 py-3 text-center text-sm font-semibold">
                    통계
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => {
                  const stats = calculateStaffStats(staff.id);
                  return (
                    <tr key={staff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="sticky left-0 z-10 border border-gray-300 bg-inherit px-4 py-2 text-sm font-medium text-gray-800">
                        <div>{staff.name}</div>
                        <div className="text-xs text-gray-500">{staff.type}</div>
                      </td>
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                        const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
                        const schedule = getScheduleForDate(staff.id, dateStr);
                        const workCode = schedule ? WORK_CODES[schedule.workType as keyof typeof WORK_CODES] : null;

                        return (
                          <td key={day} className="border border-gray-300 px-1 py-1 text-center">
                            {workCode && schedule ? (
                              <span
                                className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${workCode.color} w-full`}
                              >
                                {schedule.workType}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-300">-</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="border border-gray-300 bg-blue-50 px-4 py-2 text-xs">
                        <div className="space-y-1">
                          <div className="font-medium text-blue-700">
                            {stats.totalWorkDays}일 / {stats.totalHours}h
                          </div>
                          <div className="text-purple-600">야간 {stats.nightShifts}회</div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
