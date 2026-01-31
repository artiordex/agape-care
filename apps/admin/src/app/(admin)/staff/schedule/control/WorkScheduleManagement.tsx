'use client';

import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import ScheduleLegend from '../calendar/ScheduleLegend';
import ScheduleDetailModal from './ScheduleDetailModal';

// 근무 코드 마스터 데이터 (시간 및 색상 규격)
const WORK_CODE_MAP: any = {
  S: { hours: 12, bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  A: { hours: 9, bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100' },
  D: { hours: 9, bg: 'bg-emerald-50', text: 'text-[#5C8D5A]', border: 'border-emerald-100' },
  E: { hours: 9, bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100' },
  N: { hours: 12, bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  연: { hours: 8, bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-100' },
  휴: { hours: 0, bg: 'bg-gray-50', text: 'text-gray-400', border: 'border-gray-100' },
  공: { hours: 8, bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' },
};

interface Props {
  readonly staffList: any[];
  readonly selectedMonth: string;
}

/**
 * [Component] 전사 근무표 통합 그리드 관제 시스템
 * 고밀도 데이터 그리드, Sticky UI, 실시간 시간 연산 포함
 */
export default function WorkScheduleManagement({ staffList, selectedMonth }: Props) {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ staff: any; date: string } | null>(null);

  // 1. 데이터 동기화 (Agape Master Node)
  useEffect(() => {
    const saved = localStorage.getItem(`work_schedule_detail_${selectedMonth}`);
    setSchedules(saved ? JSON.parse(saved) : []);
  }, [selectedMonth]);

  // 2. 월간 날짜 배열 생성
  const daysInMonth = useMemo(() => {
    const [y, m] = selectedMonth.split('-').map(Number);
    return new Date(y, m, 0).getDate();
  }, [selectedMonth]);

  const dateArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 3. 데이터 저장 핸들러
  const handleSave = (newSchedule: any) => {
    const idx = schedules.findIndex(s => s.staffId === newSchedule.staffId && s.date === newSchedule.date);
    const updated = idx >= 0 ? schedules.map((s, i) => (i === idx ? newSchedule : s)) : [...schedules, newSchedule];

    localStorage.setItem(`work_schedule_detail_${selectedMonth}`, JSON.stringify(updated));
    setSchedules(updated);
    setSelectedCell(null);
  };

  return (
    <div className="space-y-6 font-sans text-gray-900 antialiased">
      {/* A. 상단 요약 범례 가이드 */}
      <div className="flex justify-end">
        <ScheduleLegend />
      </div>

      {/* B. 메인 관제 그리드 (Sticky Table) */}
      <div className="custom-scrollbar overflow-x-auto rounded-none border border-gray-300 bg-white shadow-inner">
        <table className="w-full border-collapse text-[11px]">
          <thead className="sticky top-0 z-20 shadow-sm">
            <tr className="bg-[#5C8D5A] text-white">
              <th className="sticky left-0 z-30 min-w-[160px] border border-white/10 bg-[#5C8D5A] px-4 py-4 text-left">
                인력 식별 정보 (성명/직종)
              </th>
              {dateArray.map(day => {
                const date = new Date(`${selectedMonth}-${String(day).padStart(2, '0')}`);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return (
                  <th
                    key={day}
                    className={clsx(
                      'min-w-[40px] border border-white/10 px-1 py-2 text-center',
                      isWeekend ? 'bg-red-500/90' : 'bg-[#4A7548]',
                    )}
                  >
                    <div className="font-mono font-black">{day}</div>
                    <div className="text-[9px] font-bold italic opacity-70">
                      {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                    </div>
                  </th>
                );
              })}
              <th className="min-w-[60px] border border-white/10 bg-gray-800 px-2 font-black uppercase tracking-tighter">
                근무일
              </th>
              <th className="min-w-[60px] border border-white/10 bg-gray-800 px-2 font-black uppercase tracking-tighter">
                시간
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {staffList.map(staff => {
              const staffSchedules = schedules.filter(s => s.staffId === staff.id);
              let totalHours = 0;
              let workDayCount = 0;

              return (
                <tr key={staff.id} className="transition-colors hover:bg-emerald-50/30">
                  {/* 직원 정보 열 (Sticky) */}
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-4 py-3 shadow-[3px_0_10px_rgba(0,0,0,0.03)]">
                    <div className="font-black text-gray-800">{staff.name}</div>
                    <div className="text-[9px] font-bold uppercase italic text-gray-400">{staff.position}</div>
                  </td>

                  {/* 일자별 근무 셀 */}
                  {dateArray.map(day => {
                    const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
                    const sch = staffSchedules.find(s => s.date === dateStr);
                    const codeInfo = sch ? WORK_CODE_MAP[sch.workType] : null;

                    if (codeInfo && codeInfo.hours > 0) {
                      totalHours += codeInfo.hours;
                      workDayCount++;
                    }

                    return (
                      <td
                        key={day}
                        onClick={() => setSelectedCell({ staff, date: dateStr })}
                        className="group relative cursor-pointer border-r border-gray-100 p-1 text-center transition-all hover:bg-white"
                      >
                        {sch ? (
                          <div
                            className={clsx(
                              'flex h-8 w-full items-center justify-center rounded-none border text-[11px] font-black shadow-sm transition-transform group-hover:scale-105',
                              codeInfo?.bg,
                              codeInfo?.text,
                              codeInfo?.border,
                            )}
                          >
                            {sch.workType}
                          </div>
                        ) : (
                          <div className="text-gray-200">-</div>
                        )}
                        {/* 호버 시 배경 강조 효과 */}
                        <div className="absolute inset-0 z-[-1] opacity-0 group-hover:bg-emerald-50/50 group-hover:opacity-100"></div>
                      </td>
                    );
                  })}

                  {/* 개인별 합계 통계 */}
                  <td className="border-r border-gray-100 bg-gray-50 text-center font-black text-[#5C8D5A]">
                    {workDayCount}일
                  </td>
                  <td className="bg-gray-50 text-center font-mono font-black italic text-gray-700">{totalHours}h</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* C. 상세 수정 모달 연동 */}
      {selectedCell && (
        <ScheduleDetailModal
          date={selectedCell.date}
          staff={selectedCell.staff}
          schedule={schedules.find(s => s.staffId === selectedCell.staff.id && s.date === selectedCell.date)}
          building="본관"
          floor="1층"
          onClose={() => setSelectedCell(null)}
          onSave={handleSave}
          onDelete={(date, id) => {
            const updated = schedules.filter(s => !(s.staffId === id && s.date === date));
            localStorage.setItem(`work_schedule_detail_${selectedMonth}`, JSON.stringify(updated));
            setSchedules(updated);
            setSelectedCell(null);
          }}
        />
      )}
    </div>
  );
}
