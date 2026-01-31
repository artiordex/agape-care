'use client';

import React from 'react';

interface Props {
  readonly selectedDate: string;
  readonly onDateChange: (date: string) => void;
  readonly onPrintLog: () => void;
  readonly onPrintStock: () => void;
}

/**
 * [Header] 투약 관리 및 약품 재고 통합 관제 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 액션 바 적용
 */
export default function MedicationHeader({ selectedDate, onDateChange, onPrintLog, onPrintStock }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 노드 정보 */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[#5C8D5A] p-2.5 text-white shadow-lg shadow-emerald-100">
          <i className="ri-medicine-bottle-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black uppercase leading-none tracking-tighter text-gray-900">
              투약 관리 관제 시스템
            </h1>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Medication Control
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-tight text-[#5C8D5A]">
              Administration & Inventory Node
            </p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
              Agape Medical Protocol v4.2
            </p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 실시간 투약일 선택 컨트롤 */}
      <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-[#f8fafc] p-1 shadow-inner">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:text-[#5C8D5A] active:scale-95"
          onClick={() => {
            /* 날짜 -1 로직 */
          }}
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        <div className="flex items-center gap-3 px-6">
          <i className="ri-calendar-check-line text-lg text-[#5C8D5A]"></i>
          <span className="font-mono text-[15px] font-black tracking-tight text-gray-800">{selectedDate}</span>
          <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Selected Date</span>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:text-[#5C8D5A] active:scale-95"
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
          onClick={onPrintLog}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-[11px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
        >
          <i className="ri-printer-line text-sm text-[#5C8D5A]"></i>
          투약 일지 출력
        </button>

        <button
          onClick={onPrintStock}
          className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-6 py-2.5 text-[11px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-file-list-3-line text-sm"></i>
          약품 재고 리포트
        </button>
      </div>
    </div>
  );
}
