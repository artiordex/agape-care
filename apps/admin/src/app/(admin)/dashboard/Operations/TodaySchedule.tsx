'use client';

import React from 'react';

interface Schedule {
  id: number | string;
  title: string;
  time: string;
  location: string;
}

interface Props {
  readonly schedules: Schedule[];
  readonly onAdd: () => void;
}

/**
 * [Section] 오늘의 시설 운영 및 케어 일정
 * 시간 중심의 고밀도 작전 명세서 UI
 */
export default function TodaySchedule({ schedules, onAdd }: Props) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더: Agape-Care 표준 서식 */}
      <header className="flex items-center justify-between border-b border-gray-300 bg-[#f8fafc] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1 bg-[#1a5a96]"></div>
          <h3 className="font-black uppercase tracking-tighter text-gray-800">Daily Operations Schedule</h3>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a5a96]">
          2026.01.30 (FRI)
        </span>
      </header>

      <div className="p-4">
        {/* 일정 리스트 영역 */}
        <div className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
          {schedules.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-300">
              <i className="ri-calendar-todo-line mb-2 text-3xl opacity-20"></i>
              <p className="font-bold uppercase tracking-widest">No Active Tasks Scheduled</p>
            </div>
          ) : (
            schedules.map(schedule => (
              <div
                key={schedule.id}
                className="group relative flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50/50 p-3 transition-all hover:border-[#1a5a96] hover:bg-white"
              >
                {/* 좌측 타임라인 데코레이션 */}
                <div className="mt-1 flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full border-2 border-[#1a5a96] bg-white group-hover:bg-[#1a5a96]"></div>
                  <div className="h-full w-[1px] bg-gray-200"></div>
                </div>

                {/* 일정 상세 정보 */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-black tracking-tight text-gray-800 group-hover:text-[#1a5a96]">
                      {schedule.title}
                    </p>
                    <span className="font-mono text-[10px] font-black text-gray-400 group-hover:text-[#1a5a96]">
                      {schedule.time}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                      <i className="ri-map-pin-2-line text-[#1a5a96]"></i>
                      {schedule.location}
                    </div>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                      <i className="ri-user-follow-line"></i> Assignee: Staff
                    </div>
                  </div>
                </div>

                {/* 퀵 액션 */}
                <button className="text-gray-300 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100">
                  <i className="ri-delete-bin-6-line"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {/* 일정 추가 버튼 */}
        <button
          onClick={onAdd}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-dashed border-gray-300 bg-white py-2.5 text-[10px] font-black text-gray-500 transition-all hover:border-[#1a5a96] hover:bg-blue-50 hover:text-[#1a5a96]"
        >
          <i className="ri-add-line text-sm"></i>NEW OPERATIONAL TASK
        </button>
      </div>
    </section>
  );
}
