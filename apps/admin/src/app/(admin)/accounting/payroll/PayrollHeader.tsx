'use client';

import React from 'react';

interface Props {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onExcelDownload: () => void;
  onReflectToAccounting: () => void;
}

/**
 * 급여 관리 시스템 통합 헤더
 * 타이틀, 기간 설정 및 시스템 간 연동 액션 포함
 */
export default function PayrollHeader({ selectedMonth, onMonthChange, onExcelDownload, onReflectToAccounting }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 타이틀 및 정체성 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#1a5a96] p-2.5 text-white shadow-md shadow-blue-100">
          <i className="ri-calculator-line text-xl"></i>
        </div>
        <div>
          <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">급여 관리</h1>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Payroll Management System</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold text-[#1a5a96]">정밀 수당/공제 산출 및 회계 연동</p>
          </div>
        </div>
      </div>

      {/* 2. 오른쪽: 기간 선택 및 시스템 액션 */}
      <div className="flex items-center gap-2">
        {/* 기준월 선택 필드 */}
        <div className="group mr-2 flex items-center rounded-sm border border-gray-300 bg-[#f8fafc] px-3 py-1.5 shadow-inner transition-all focus-within:border-blue-500">
          <label className="mr-3 whitespace-nowrap text-[10px] font-black uppercase text-gray-400">
            Baseline Month
          </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => onMonthChange(e.target.value)}
            className="cursor-pointer bg-transparent text-[11px] font-black text-gray-800 outline-none"
          />
        </div>

        {/* 엑셀 다운로드 (데이터 추출) */}
        <button
          onClick={onExcelDownload}
          className="flex items-center gap-1.5 bg-emerald-600 px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
        >
          <i className="ri-file-excel-2-line text-sm"></i>
          엑셀 데이터 추출
        </button>

        {/* 회계 시스템 반영 (ERP 연동) */}
        <button
          onClick={onReflectToAccounting}
          className="flex items-center gap-1.5 bg-[#1a5a96] px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-[#144675] active:scale-95"
        >
          <i className="ri-exchange-funds-line text-sm"></i>
          회계 시스템 반영
        </button>
      </div>
    </div>
  );
}
