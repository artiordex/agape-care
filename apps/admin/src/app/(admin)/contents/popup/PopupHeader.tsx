'use client';

import React from 'react';

interface Props {
  readonly onAdd: () => void;
  readonly totalCount: number;
}

/**
 * [Component] 팝업 관리 시스템 헤더
 * 아가페 표준 UI 적용
 */
export default function PopupHeader({ onAdd, totalCount }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-6 font-sans antialiased shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <div className="rounded-none bg-[#5C8D5A] p-3 text-white shadow-md">
          <i className="ri-window-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
              홈페이지 팝업 관리
            </h1>
            <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Admin Node
            </span>
          </div>
          <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            Website Popup Management System
            <span className="mx-2 h-2 w-[1px] bg-gray-300"></span>
            <span className="font-mono text-[#5C8D5A]">Total: {totalCount}건</span>
          </p>
        </div>
      </div>

      <button
        onClick={onAdd}
        className="flex cursor-pointer items-center gap-2 rounded-none bg-[#5C8D5A] px-6 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
      >
        <i className="ri-add-line text-lg"></i>
        신규 팝업 등록
      </button>
    </div>
  );
}
