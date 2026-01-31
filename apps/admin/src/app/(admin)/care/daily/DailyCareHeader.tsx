'use client';

import React from 'react';

interface Props {
  readonly selectedDate: string;
  readonly isProcessing: boolean;
  readonly onDateChange: (date: string) => void;
  readonly onPrintMonthly: () => void;
  readonly onPrintHealth: () => void;
}

/**
 * [Header] 건강관리 및 간호일지 통합 관제 헤더
 * 아가페 그린(#5C8D5A) 테마 및 날짜 내비게이션 적용
 */
export default function DailyCareHeader({
  selectedDate,
  isProcessing,
  onDateChange,
  onPrintMonthly,
  onPrintHealth,
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 현재 관제 섹션 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-stethoscope-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">
              건강관리 및 간호일지 관제
            </h1>
            <span className="rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Real-time Health Monitoring
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">Daily Nursing & Medical Records</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Agape-Care Medical Protocol</p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 날짜 내비게이션 컨트롤 */}
      <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-[#f8fafc] p-1 shadow-inner">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A] active:scale-95"
          onClick={() => {
            /* 날짜 -1 로직 */
          }}
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        <div className="flex items-center gap-2 px-4">
          <i className="ri-calendar-check-line text-[#5C8D5A]"></i>
          <span className="font-mono text-[14px] font-black tracking-tight text-gray-800">{selectedDate} (금)</span>
        </div>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A] active:scale-95"
          onClick={() => {
            /* 날짜 +1 로직 */
          }}
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* 3. 오른쪽: 출력 및 시스템 액션 */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrintMonthly}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
        >
          <i className="ri-printer-line text-sm"></i>
          월간 간호기록지
        </button>

        <button
          onClick={onPrintHealth}
          disabled={isProcessing}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          {isProcessing ? (
            <i className="ri-loader-4-line animate-spin text-sm"></i>
          ) : (
            <i className="ri-file-chart-line text-sm"></i>
          )}
          건강관리 기록지 출력
        </button>
      </div>
    </div>
  );
}
