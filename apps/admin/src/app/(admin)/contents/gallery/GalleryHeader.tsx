'use client';

import React from 'react';

interface Props {
  readonly onAddClick: () => void;
  readonly totalCount: number;
}

/**
 * [Component] 갤러리 관리 시스템 고정 헤더 프로토콜
 * 아가페 표준 관리자 노드 UI 및 전사적 액션 버튼 적용
 */
export default function GalleryHeader({ onAddClick, totalCount }: Props) {
  return (
    /** * [변경] shrink-0을 적용하여 부모의 h-screen 레이아웃에서
     * 헤더 높이가 압착되지 않고 상단에 고정되도록 합니다.
     */
    <div className="flex shrink-0 flex-col justify-between gap-4 border-b border-gray-300 bg-white p-6 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 좌측: 타이틀 및 시스템 정보 노드 */}
      <div className="flex items-center gap-4">
        {/* 아가페 그린 전용 아이콘 박스 */}
        <div className="rounded-none bg-[#5C8D5A] p-3 text-white shadow-md">
          <i className="ri-image-2-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
              갤러리 콘텐츠 통합 관리
            </h1>
            <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Media Node
            </span>
          </div>
          <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            Visual Asset Management System v4.2
            <span className="mx-2 h-2 w-[1px] bg-gray-300"></span>
            <span className="font-mono text-[#5C8D5A]">Total Assets: {totalCount}건</span>
          </p>
        </div>
      </div>

      {/* 우측: 글로벌 액션 버튼 그룹 */}
      <div className="flex items-center gap-3">
        {/* 데이터 동기화 액션 */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-black text-gray-500 transition-all hover:bg-gray-50 active:scale-95"
        >
          <i className="ri-refresh-line font-bold"></i>
          데이터 동기화
        </button>

        {/* 신규 등록 액션 */}
        <button
          onClick={onAddClick}
          className="flex cursor-pointer items-center gap-2 rounded-none bg-[#5C8D5A] px-6 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-lg"></i>
          신규 이미지 등록
        </button>
      </div>
    </div>
  );
}
