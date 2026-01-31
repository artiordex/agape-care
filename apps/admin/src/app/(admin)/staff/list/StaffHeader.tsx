'use client';

import React from 'react';

interface Props {
  selectedStaffName: string | null;
  totalStaffCount: number;
  isSaving: boolean;
  onNewStaff: () => void;
  onSave: () => void;
  onExport: () => void;
}

/**
 * [Component] 직원 정보 관리 시스템 통합 헤더
 * 아가페 그린(#5C8D5A) 테마 및 완전 직각 버튼 UI 적용
 */
export default function StaffHeader({
  selectedStaffName,
  totalStaffCount,
  isSaving,
  onNewStaff,
  onSave,
  onExport,
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-5 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 직원 타이틀 및 노드 정보 */}
      <div className="flex items-center gap-4">
        <div className="rounded-none bg-[#5C8D5A] p-2.5 text-white shadow-md">
          <i className="ri-team-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
              직원 인사 통합 관리 시스템
            </h1>
            <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              HR Master Node
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-tight text-[#5C8D5A]">
              Total Database: {totalStaffCount} 명 등록됨
            </p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
              Human Resource Information System v4.2
            </p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 실시간 조회 타겟 상태 (직각형 인디케이터) */}
      {selectedStaffName && (
        <div className="hidden items-center gap-3 rounded-none border border-gray-200 bg-gray-50 px-4 py-2 transition-all xl:flex">
          <div className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping bg-[#5C8D5A] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-[#5C8D5A]"></span>
          </div>
          <p className="text-[11px] font-black text-gray-700">
            현재 관제 대상:{' '}
            <span className="ml-1 font-black text-[#5C8D5A] underline decoration-2 underline-offset-4">
              {selectedStaffName} 직원
            </span>
          </p>
        </div>
      )}

      {/* 3. 오른쪽: 직각형 액션 버튼 그룹 */}
      <div className="flex items-center gap-2">
        {/* 내보내기 버튼 */}
        <button
          onClick={onExport}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-none border border-gray-300 bg-white px-4 py-2.5 text-[11px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="ri-file-excel-line text-green-600"></i>Excel 내보내기
        </button>

        {/* 저장 버튼 */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-none border border-[#5C8D5A] bg-white px-5 py-2.5 text-[11px] font-black text-[#5C8D5A] shadow-sm transition-all hover:bg-emerald-50 active:scale-95 disabled:opacity-70"
        >
          {isSaving ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-save-3-line"></i>}정보 업데이트
        </button>

        {/* 신규 등록 버튼 (Main Action) */}
        <button
          onClick={onNewStaff}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-none bg-[#5C8D5A] px-6 py-2.5 text-[11px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          <i className="ri-user-add-line"></i>신규 직원 등록
        </button>
      </div>
    </div>
  );
}
