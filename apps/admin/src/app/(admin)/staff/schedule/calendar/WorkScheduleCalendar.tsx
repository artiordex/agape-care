'use client';

import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import ScheduleCalendarGrid from './ScheduleCalendarGrid';
import ScheduleLegend from './ScheduleLegend';
import ScheduleMonthlyStats from '../control/ScheduleMonthlyStats';
import ScheduleDetailModal from '../control/ScheduleDetailModal';

// 근무 코드 및 시간 규격 (연산용)
const WORK_CODE_HOURS: any = {
  S: 12,
  A: 9,
  D: 9,
  E: 9,
  N: 12,
  연: 8,
  휴: 0,
  공: 8,
  O: 4,
};

interface Props {
  readonly staff: any;
  readonly selectedMonth: string;
  readonly building?: string;
  readonly floor?: string;
}

/**
 * [Component] 개인별 통합 근무 일정 관제 달력
 * 통계 대시보드와 정밀 그리드를 결합한 표준 ERP 레이아웃
 */
export default function WorkScheduleCalendar({ staff, selectedMonth, building = '본관', floor = '1층' }: Props) {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 1. 데이터 동기화 프로토콜
  useEffect(() => {
    const saved = localStorage.getItem(`work_schedule_detail_${selectedMonth}`);
    setSchedules(saved ? JSON.parse(saved) : []);
  }, [selectedMonth]);

  // 2. 실시간 월간 통계 엔진
  const stats = useMemo(() => {
    const staffSchedules = schedules.filter(s => s.staffId === staff.id);
    return staffSchedules.reduce(
      (acc, curr) => {
        const hours = WORK_CODE_HOURS[curr.workType] || 0;
        return {
          workDays: acc.workDays + (hours > 0 ? 1 : 0),
          totalHours: acc.totalHours + hours,
          nightCount: acc.nightCount + (curr.workType === 'N' ? 1 : 0),
          vacation: acc.vacation + (['연', 'O'].includes(curr.workType) ? 1 : 0),
          overtime: acc.overtime + (curr.overtime || 0),
        };
      },
      { workDays: 0, totalHours: 0, nightCount: 0, vacation: 0, overtime: 0 },
    );
  }, [staff.id, schedules]);

  // 3. 달력 구성 데이터 연산
  const daysInMonth = useMemo(() => {
    const [y, m] = selectedMonth.split('-').map(Number);
    return new Date(y, m, 0).getDate();
  }, [selectedMonth]);

  // 4. 스케줄 저장 및 삭제 핸들러
  const handleSave = (data: any) => {
    const idx = schedules.findIndex(s => s.staffId === data.staffId && s.date === data.date);
    const updated = idx >= 0 ? schedules.map((s, i) => (i === idx ? data : s)) : [...schedules, data];
    localStorage.setItem(`work_schedule_detail_${selectedMonth}`, JSON.stringify(updated));
    setSchedules(updated);
    setShowModal(false);
  };

  const handleDelete = (date: string, staffId: string) => {
    const updated = schedules.filter(s => !(s.staffId === staffId && s.date === date));
    localStorage.setItem(`work_schedule_detail_${selectedMonth}`, JSON.stringify(updated));
    setSchedules(updated);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 font-sans text-gray-900 antialiased">
      {/* A. 개인 통계 대시보드 섹션 */}
      <ScheduleMonthlyStats stats={stats} />

      {/* B. 메인 달력 그리드 섹션 */}
      <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-none bg-[#5C8D5A] font-black text-white">
              <i className="ri-calendar-event-line"></i>
            </div>
            <h2 className="text-[15px] font-black uppercase italic tracking-tighter">
              {selectedMonth.replace('-', '. ')} <span className="text-[#5C8D5A]">Personal Node Control</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase italic text-gray-400">Active Deployment:</span>
            <span className="rounded-none border border-gray-200 bg-white px-3 py-1 text-[11px] font-bold text-gray-700 shadow-sm">
              {building} / {floor}
            </span>
          </div>
        </div>

        <ScheduleCalendarGrid
          daysInMonth={daysInMonth}
          selectedMonth={selectedMonth}
          getScheduleForDate={d => schedules.find(s => s.staffId === staff.id && s.date === d)}
          handleDateClick={day => {
            setSelectedDate(`${selectedMonth}-${String(day).padStart(2, '0')}`);
            setShowModal(true);
          }}
        />
      </div>

      {/* C. 하단 운영 범례 섹션 */}
      <ScheduleLegend />

      {/* D. 상세 수정 모달 */}
      {showModal && selectedDate && (
        <ScheduleDetailModal
          date={selectedDate}
          staff={staff}
          schedule={schedules.find(s => s.staffId === staff.id && s.date === selectedDate)}
          building={building}
          floor={floor}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
