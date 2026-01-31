'use client';

import React from 'react';

interface Props {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onExcelDownload: () => void;
}

/**
 * 회계 시스템 통합 헤더 컴포넌트
 * 타이틀, 기간 선택, 공통 액션 버튼 포함
 */
export default function AccountingHeader({ selectedMonth, onMonthChange, onExcelDownload }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* 왼쪽: 타이틀 및 설명 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#1a5a96] p-2.5 text-white shadow-md shadow-blue-100">
          <i className="ri-bank-line text-xl"></i>
        </div>
        <div>
          <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">회계 관리</h1>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Accounting Management System</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold text-[#1a5a96]">복식부기 기반 정밀 결산</p>
          </div>
        </div>
      </div>

      {/* 오른쪽: 기간 선택 및 액션 버튼 */}
      <div className="flex items-center gap-2">
        {/* 월 선택 필드 */}
        <div className="group flex items-center rounded-sm border border-gray-300 bg-[#f8fafc] px-3 py-1.5 shadow-inner transition-all focus-within:border-blue-500">
          <label className="mr-2 whitespace-nowrap text-[10px] font-black uppercase text-gray-400">Search Period</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => onMonthChange(e.target.value)}
            className="cursor-pointer bg-transparent text-[11px] font-black text-gray-800 outline-none"
          />
        </div>

        {/* 엑셀 출력 버튼 */}
        <button
          onClick={onExcelDownload}
          className="flex items-center gap-1.5 bg-emerald-600 px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
        >
          <i className="ri-file-excel-2-line text-sm"></i>
          엑셀 데이터 출력
        </button>

        {/* 설정 버튼 (필요시) */}
        <button className="flex h-9 w-9 items-center justify-center border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-blue-600">
          <i className="ri-settings-3-line text-lg"></i>
        </button>
      </div>
    </div>
  );
}
