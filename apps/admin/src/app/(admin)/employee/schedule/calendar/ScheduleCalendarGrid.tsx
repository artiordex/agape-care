'use client';

import React from 'react';
import clsx from 'clsx';

// 근무 코드 및 시각적 스타일 정의
const WORK_CODES: any = {
  S: { name: '주간', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  A: { name: '단축', color: 'bg-cyan-50 text-cyan-700 border-cyan-100' },
  D: { name: '오전', color: 'bg-emerald-50 text-[#5C8D5A] border-emerald-100' },
  E: { name: '오후', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  N: { name: '야간', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  연: { name: '연차', color: 'bg-pink-50 text-pink-700 border-pink-100' },
  휴: { name: '휴무', color: 'bg-gray-100 text-gray-400 border-gray-200' },
  공: { name: '공휴', color: 'bg-red-50 text-red-700 border-red-100' },
};

interface Props {
  readonly daysInMonth: number;
  readonly selectedMonth: string;
  readonly getScheduleForDate: (date: string) => any;
  readonly handleDateClick: (day: number) => void;
}

/**
 * [Component] 고밀도 7열 근무 일정 관제 달력 그리드
 * 아가페 그린(#5C8D5A) 테마 및 직각형 셀 디자인 적용
 */
export default function ScheduleCalendarGrid({
  daysInMonth,
  selectedMonth,
  getScheduleForDate,
  handleDateClick,
}: Props) {
  // 요일 헤더 데이터
  const dayHeaders = [
    { label: '일', color: 'bg-red-500 text-white' },
    { label: '월', color: 'bg-gray-50 text-gray-500' },
    { label: '화', color: 'bg-gray-50 text-gray-500' },
    { label: '수', color: 'bg-gray-50 text-gray-500' },
    { label: '목', color: 'bg-gray-50 text-gray-500' },
    { label: '금', color: 'bg-gray-50 text-gray-500' },
    { label: '토', color: 'bg-blue-600 text-white' },
  ];

  return (
    <div className="font-sans text-gray-900 antialiased">
      {/* A. 요일 헤더 그리드 */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayHeaders.map((header, i) => (
          <div
            key={i}
            className={clsx(
              'border-r border-gray-100 p-3 text-center text-[11px] font-black uppercase tracking-widest last:border-r-0',
              header.color,
            )}
          >
            {header.label}
          </div>
        ))}
      </div>

      {/* B. 일자별 데이터 그리드 (7열 순회) */}
      <div className="grid grid-cols-7 border-l border-gray-200">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
          const date = new Date(dateStr);
          const dayOfWeek = date.getDay();
          const schedule = getScheduleForDate(dateStr);

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={clsx(
                'group relative min-h-[140px] cursor-pointer border-b border-r border-gray-100 p-3 transition-all hover:bg-emerald-50/30',
                dayOfWeek === 0 ? 'bg-red-50/5' : dayOfWeek === 6 ? 'bg-blue-50/5' : 'bg-white',
              )}
            >
              {/* 일자 라벨 노드 */}
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={clsx(
                    'font-mono text-[15px] font-black tracking-tighter',
                    dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-600' : 'text-gray-800',
                  )}
                >
                  {String(day).padStart(2, '0')}
                </span>
                {schedule && <i className="ri-checkbox-circle-fill text-[12px] text-[#5C8D5A] opacity-60"></i>}
              </div>

              {/* 근무 배치 데이터 시각화 */}
              {schedule ? (
                <div className="animate-in fade-in slide-in-from-top-1 space-y-1.5">
                  <div
                    className={clsx(
                      'rounded-none border px-2 py-1 text-center text-[10px] font-black uppercase tracking-tighter shadow-sm',
                      WORK_CODES[schedule.workType]?.color || 'border-gray-200 bg-gray-100',
                    )}
                  >
                    {schedule.workType} : {WORK_CODES[schedule.workType]?.name || '미지정'}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] font-bold italic text-gray-400">
                    <i className="ri-time-line text-[#5C8D5A]"></i>
                    {schedule.startTime} - {schedule.endTime}
                  </div>
                  {schedule.memo && (
                    <div className="truncate border-t border-gray-100 pt-1 text-[9px] font-medium italic text-gray-400">
                      <i className="ri-chat-3-line mr-1 text-emerald-300"></i>
                      {schedule.memo}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-16 items-center justify-center border border-dashed border-gray-50 text-[10px] font-bold italic text-gray-100">
                  No Data
                </div>
              )}

              {/* 하단 호버 상태 가이드 바 */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#5C8D5A] transition-all duration-300 group-hover:w-full"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
