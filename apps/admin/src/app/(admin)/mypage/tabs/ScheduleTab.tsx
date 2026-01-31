'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

/**
 * [Component] 개인별 월간 근무 스케줄 및 일일 업무 명세 통합 탭
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 직각형 레이아웃 적용
 */
export default function ScheduleTab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 1. 달력 생성 엔진
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const days = generateCalendar();
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  // 2. 샘플 데이터 프로토콜
  const scheduleData = {
    workSchedule: { shift: '주간(S)', time: '08:30 (출근) ~ 17:30 (퇴근)', status: '정상수행' },
    events: [{ title: '시설 정기 소독일', time: '10:00' }],
    tasks: [{ title: '수급자 투약 이력 점검', description: '오전 투약 누락 여부 최종 전산 확인' }],
    diary: '금일 모든 수급자 활력징후 정상이며, 특이사항 없이 근무 인계함.',
  };

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* A. 상단: 월간 관제 내비게이션 */}
      <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              className="flex h-8 w-8 items-center justify-center rounded-none border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A]"
            >
              <i className="ri-arrow-left-s-line text-xl"></i>
            </button>
            <h3 className="font-mono text-[18px] font-black tracking-tighter text-gray-900">
              {currentMonth.getFullYear()}. {String(currentMonth.getMonth() + 1).padStart(2, '0')}
            </h3>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              className="flex h-8 w-8 items-center justify-center rounded-none border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A]"
            >
              <i className="ri-arrow-right-s-line text-xl"></i>
            </button>
          </div>
          <button
            onClick={() => {
              const now = new Date();
              setCurrentMonth(now);
              setSelectedDate(now);
            }}
            className="rounded-none bg-[#5C8D5A] px-4 py-1.5 text-[11px] font-black text-white shadow-sm transition-all hover:bg-[#4A7548] active:scale-95"
          >
            TODAY
          </button>
        </div>

        {/* B. 중앙: 직각형 달력 그리드 */}
        <div className="p-5">
          <div className="grid grid-cols-7 border-l border-t border-gray-100">
            {weekDays.map((day, idx) => (
              <div
                key={day}
                className={clsx(
                  'border-b border-r border-gray-100 bg-gray-50 py-2 text-center text-[10px] font-black tracking-widest',
                  idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-600' : 'text-gray-400',
                )}
              >
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              if (!day)
                return (
                  <div
                    key={`empty-${idx}`}
                    className="aspect-square border-b border-r border-gray-100 bg-gray-50/30"
                  ></div>
                );

              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              const dayOfWeek = day.getDay();

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={clsx(
                    'group relative aspect-square rounded-none border-b border-r border-gray-100 p-2 text-left transition-all',
                    isSelected ? 'z-10 bg-emerald-50 ring-2 ring-inset ring-[#5C8D5A]' : 'bg-white hover:bg-gray-50',
                  )}
                >
                  <span
                    className={clsx(
                      'font-mono text-[13px] font-black',
                      isSelected
                        ? 'text-[#5C8D5A]'
                        : isToday
                          ? 'text-emerald-600 underline decoration-2 underline-offset-4'
                          : dayOfWeek === 0
                            ? 'text-red-500'
                            : dayOfWeek === 6
                              ? 'text-blue-600'
                              : 'text-gray-800',
                    )}
                  >
                    {String(day.getDate()).padStart(2, '0')}
                  </span>
                  {/* 일정 인디케이터 배지 */}
                  <div className="mt-1 flex flex-wrap gap-0.5">
                    <div className="h-1 w-3 rounded-none bg-[#5C8D5A]/40"></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* C. 하단: 선택 일자 상세 업무 피드 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. 근무 정보 및 일정 섹션 */}
        <div className="space-y-4">
          <SectionTitle icon="ri-time-line" label="Shift & Timeline" />
          <div className="relative overflow-hidden rounded-none border border-[#5C8D5A] bg-emerald-50/30 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-none bg-[#5C8D5A] text-white shadow-md">
                <i className="ri-calendar-check-line text-2xl"></i>
              </div>
              <div className="flex-1">
                <p className="mb-0.5 text-[10px] font-black uppercase tracking-widest text-[#5C8D5A]">Today's Shift</p>
                <h4 className="text-[16px] font-black text-gray-900">{scheduleData.workSchedule.shift}</h4>
                <p className="font-mono text-[11px] font-bold italic text-gray-500">{scheduleData.workSchedule.time}</p>
              </div>
              <span className="rounded-none border border-[#5C8D5A] px-3 py-1 text-[10px] font-black uppercase text-[#5C8D5A]">
                {scheduleData.workSchedule.status}
              </span>
            </div>
          </div>

          <SectionTitle icon="ri-calendar-event-line" label="Events & Reminders" />
          <div className="space-y-2">
            {scheduleData.events.map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-none border border-gray-200 bg-white p-3"
              >
                <span className="text-[12px] font-black text-gray-800">{event.title}</span>
                <span className="font-mono text-[10px] font-bold text-gray-400">{event.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 할당 업무 및 간호일지 섹션 */}
        <div className="space-y-4">
          <SectionTitle icon="ri-task-line" label="Assigned Tasks" />
          <div className="space-y-2">
            {scheduleData.tasks.map((task, i) => (
              <div key={i} className="rounded-none border border-gray-200 bg-white p-4 shadow-sm">
                <h5 className="mb-1 text-[12px] font-black text-[#5C8D5A]">{task.title}</h5>
                <p className="text-[11px] font-medium leading-relaxed text-gray-500">{task.description}</p>
              </div>
            ))}
          </div>

          <SectionTitle icon="ri-edit-box-line" label="Nursing Daily Log" />
          <div className="group relative">
            <textarea
              readOnly
              value={scheduleData.diary}
              rows={3}
              className="w-full resize-none rounded-none border border-gray-300 bg-gray-50 p-4 text-[12px] font-medium text-gray-600 shadow-inner outline-none transition-all focus:border-[#5C8D5A]"
            />
            <button className="absolute bottom-3 right-3 rounded-none border border-gray-200 bg-white px-3 py-1 text-[10px] font-black text-[#5C8D5A] opacity-0 transition-all hover:bg-emerald-50 group-hover:opacity-100">
              LOG UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 섹션 타이틀 컴포넌트 */
function SectionTitle({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <i className={clsx(icon, 'text-lg text-[#5C8D5A]')}></i>
      <h4 className="text-[11px] font-black uppercase italic tracking-widest text-gray-400">{label}</h4>
      <div className="h-[1px] flex-1 bg-gray-100"></div>
    </div>
  );
}
