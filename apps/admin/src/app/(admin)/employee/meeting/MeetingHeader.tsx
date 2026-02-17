'use client';

import React from 'react';

interface Props {
  readonly year: number;
  readonly onYearChange: (year: number) => void;
  readonly onAdd: (category: 'committee' | 'guardian' | 'custom') => void;
}

/**
 * [Component] 회의 관리 시스템 통합 헤더 및 퀵 액션 바
 * image_109a86.png의 연도 선택 및 하단 버튼군 통합 적용
 */
export default function MeetingHeader({ year, onYearChange, onAdd }: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-300 bg-white p-6 font-sans antialiased shadow-sm md:flex-row md:items-center md:justify-between">
      {/* 1. 타이틀 및 연도 제어 노드 */}
      <div className="flex items-center gap-6">
        <div className="flex h-12 w-12 items-center justify-center bg-[#5C8D5A] text-white shadow-md">
          <i className="ri-team-line text-2xl"></i>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-[20px] font-black uppercase italic tracking-tighter text-gray-900">
            회의록 현황
          </h1>
          <div className="flex items-center overflow-hidden border-2 border-gray-100 bg-gray-50 shadow-inner">
            <button
              onClick={() => onYearChange(year - 1)}
              className="border-r border-gray-100 px-3 py-1.5 text-gray-400 hover:bg-white hover:text-[#5C8D5A]"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <span className="px-5 font-mono text-[15px] font-black text-gray-800">{year}년</span>
            <button
              onClick={() => onYearChange(year + 1)}
              className="border-l border-gray-100 px-3 py-1.5 text-gray-400 hover:bg-white hover:text-[#5C8D5A]"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 신규 작성 버튼 그룹 (이미지 하단 버튼 로직 반영) */}
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton label="운영 위원회 신규작성" onClick={() => onAdd('committee')} icon="ri-government-line" />
        <ActionButton label="보호자 소통 신규작성" onClick={() => onAdd('guardian')} icon="ri-parent-line" />
        <ActionButton
          label="일반 회의 신규생성"
          onClick={() => onAdd('custom')}
          icon="ri-add-box-line"
          variant="outline"
        />
      </div>
    </div>
  );
}

function ActionButton({ label, onClick, icon, variant = 'solid' }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 text-[12px] font-black shadow-sm transition-all active:scale-95 ${
        variant === 'solid'
          ? 'bg-[#5C8D5A] text-white hover:bg-[#4A7548]'
          : 'border-2 border-[#5C8D5A] bg-white text-[#5C8D5A] hover:bg-emerald-50'
      }`}
    >
      <i className={icon}></i>
      {label}
    </button>
  );
}
