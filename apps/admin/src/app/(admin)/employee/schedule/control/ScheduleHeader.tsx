'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  readonly selectedMonth: string;
  readonly onMonthChange: (month: string) => void;
}

/**
 * [Component] 전사 근무표 관제 상단 헤더
 * 월 선택 제어 및 전사적 데이터 액션 버튼군 포함
 */
export default function ScheduleHeader({ selectedMonth, onMonthChange }: Props) {
  // 월 이동 핸들러 (이전/다음 달)
  const handleMonthShift = (direction: number) => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const date = new Date(year, month - 1 + direction, 1);
    const newMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    onMonthChange(newMonth);
  };

  return (
    <div className="flex flex-col gap-4 rounded-none border-b border-gray-200 bg-white p-6 font-sans text-gray-900 antialiased shadow-sm md:flex-row md:items-center md:justify-between">
      {/* A. 타이틀 및 상태 배지 */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-none bg-[#5C8D5A] text-white shadow-md">
          <i className="ri-dashboard-3-line text-2xl"></i>
        </div>
        <div>
          <h1 className="text-[20px] font-black uppercase italic tracking-tight text-gray-900">
            Agape Total Control Center
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-none border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Live Monitoring
            </span>
            <span className="text-[11px] font-bold italic text-gray-400">전사 인력 배치 및 근무 현황 통합 관제</span>
          </div>
        </div>
      </div>

      {/* B. 월 선택 및 행정 액션 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 월 탐색 버튼군 */}
        <div className="flex items-center overflow-hidden rounded-none border-2 border-gray-100 bg-gray-50 shadow-inner">
          <button
            onClick={() => handleMonthShift(-1)}
            className="cursor-pointer border-r border-gray-100 px-3 py-2 text-gray-400 transition-all hover:bg-white hover:text-[#5C8D5A]"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => onMonthChange(e.target.value)}
            className="bg-transparent px-4 py-2 font-mono text-[14px] font-black text-gray-800 outline-none transition-all focus:bg-white"
          />
          <button
            onClick={() => handleMonthShift(1)}
            className="cursor-pointer border-l border-gray-100 px-3 py-2 text-gray-400 transition-all hover:bg-white hover:text-[#5C8D5A]"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        {/* 행정 액션 버튼군 */}
        <div className="mx-1 hidden h-8 w-[1px] bg-gray-200 md:block"></div>

        <button
          onClick={() => alert('근무표 데이터를 엑셀 파일(.xlsx)로 추출합니다.')}
          className="flex cursor-pointer items-center gap-2 rounded-none bg-[#5C8D5A] px-5 py-2.5 text-[12px] font-black uppercase text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-file-excel-line"></i>
          엑셀 내보내기
        </button>

        <button
          onClick={() => window.print()}
          className="flex cursor-pointer items-center gap-2 rounded-none border-2 border-gray-200 bg-white px-5 py-2 text-[12px] font-black uppercase text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
        >
          <i className="ri-printer-line"></i>
          인쇄
        </button>
      </div>
    </div>
  );
}
