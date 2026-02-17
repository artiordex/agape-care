'use client';

import React from 'react';

interface Props {
  readonly onAdd: () => void;
}

/**
 * [Component] 교육일지 관리 시스템 통합 헤더 및 액션 바
 * 아가페 그린(#5C8D5A) 테마 및 완전 직각 버튼 UI 적용
 */
export default function EducationHeader({ onAdd }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-5 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 노드 정보 */}
      <div className="flex items-center gap-4">
        <div className="rounded-none bg-[#5C8D5A] p-2.5 text-white shadow-md">
          <i className="ri-book-open-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
              교육 및 훈련 통합 관리 시스템
            </h1>
            <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Education Node
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-tight text-[#5C8D5A]">
              Staff Competency & Safety Training
            </p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
              Agape Medical Protocol v4.2
            </p>
          </div>
        </div>
      </div>

      {/* 2. 오른쪽: 직각형 액션 버튼 */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-none bg-[#5C8D5A] px-6 py-3 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-lg"></i>
          신규 교육 기록 등록
        </button>
      </div>
    </div>
  );
}
