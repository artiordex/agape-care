'use client';

import React, { useEffect, useState, useMemo } from 'react';
import ScheduleMonthlyStats from '../control/ScheduleMonthlyStats';
import ScheduleCalendarGrid from '../calendar/ScheduleCalendarGrid';
import { WorkCode } from '../schedule.type';

interface Props {
  readonly staff: any;
  readonly month: string;
  readonly onMonthChange: (month: string) => void;
}

/**
 * [Component] 개인별 근무 현황 달력 및 분석 대시보드
 * 아가페 표준 UI 및 실시간 통계 연산 로직
 */
export default function IndividualCalendar({ staff, month, onMonthChange }: Props) {
  const [schedules, setSchedules] = useState<any[]>([]);

  // 로컬 데이터 동기화
  useEffect(() => {
    const saved = localStorage.getItem(`work_schedule_detail_${month}`);
    if (saved) setSchedules(JSON.parse(saved));
    else setSchedules([]);
  }, [month]);

  // 해당 직원의 월간 통계 엔진 가동
  const stats = useMemo(() => {
    const staffSchedules = schedules.filter(s => s.staffId === staff.id);
    const WORK_CODES_MAP: any = { S: 12, A: 9, D: 9, E: 9, N: 12, 연: 8, 공: 8, O: 4 };

    return staffSchedules.reduce(
      (acc, curr) => {
        const hours = WORK_CODES_MAP[curr.workType] || 0;
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

  const daysInMonth = new Date(Number(month.split('-')[0]), Number(month.split('-')[1]), 0).getDate();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
      {/* A. 월간 근무 분석 통계 패널 */}
      <ScheduleMonthlyStats stats={stats} />

      {/* B. 정밀 달력 관제 그리드 */}
      <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="border border-emerald-100 bg-emerald-50 px-2 py-1 text-[13px] font-black uppercase italic text-[#5C8D5A]">
              {staff.name} {staff.position}
            </span>
            <h2 className="text-[15px] font-black uppercase italic tracking-tighter text-gray-800">
              {month.replace('-', '. ')} 근무 현황 리포트
            </h2>
          </div>
          <div className="flex gap-2">
            <input
              type="month"
              value={month}
              onChange={e => onMonthChange(e.target.value)}
              className="rounded-none border border-gray-200 px-3 py-1 font-mono text-[12px] font-black outline-none focus:border-[#5C8D5A]"
            />
          </div>
        </div>

        <ScheduleCalendarGrid
          daysInMonth={daysInMonth}
          selectedMonth={month}
          getScheduleForDate={d => schedules.find(s => s.staffId === staff.id && s.date === d)}
          handleDateClick={day => {
            /* 상세 모달 로직 연동 가능 */
          }}
        />
      </div>

      {/* C. 하단 행정 특이사항 안내 */}
      <div className="rounded-none border-l-4 border-[#5C8D5A] bg-gray-900 p-6 text-white shadow-inner">
        <div className="mb-2 flex items-center gap-2">
          <i className="ri-information-line text-[#5C8D5A]"></i>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-400/80">
            Personal Protocol Insight
          </h4>
        </div>
        <p className="text-[12px] font-medium italic leading-relaxed text-gray-400">
          해당 데이터 노드는 아가페 ERP 통합 데이터베이스와 실시간 동기화 중입니다. 연차 및 야간 수당 산출 시 위 근무
          기록이 법적 근거 데이터로 활용됩니다.
        </p>
      </div>
    </div>
  );
}
