'use client';

import React from 'react';

interface Props {
  readonly selectedResidentName: string | null;
  readonly isProcessing: boolean;
  readonly onAddResident: () => void;
}

/**
 * [Header] 입소자 관리 시스템 통합 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 ERP 레이아웃
 */
export default function ResidentHeader({ selectedResidentName, isProcessing, onAddResident }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 현재 섹션 정보 */}
      <div className="flex items-center gap-3">
        {/* 아가페 그린 테마 아이콘 박스 */}
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-user-heart-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">입소자 정보 통합 관리</h1>
            <span className="rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              관리자 모드 활성
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">Resident Management System</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Personal Health & Admission Records
            </p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 현재 편집/조회 대상 (선택 시 노출) */}
      {selectedResidentName && (
        <div className="animate-in fade-in zoom-in hidden items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 duration-300 xl:flex">
          <div className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#5C8D5A] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5C8D5A]"></span>
          </div>
          <p className="text-[11px] font-black text-gray-700">
            현재 조회 중: <span className="ml-1 font-black text-[#5C8D5A]">{selectedResidentName} 어르신</span>
          </p>
        </div>
      )}

      {/* 3. 오른쪽: 전역 입소자 관리 액션 */}
      <div className="flex items-center gap-2">
        {/* 입소 통계 보고서 */}
        <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50">
          <i className="ri-printer-line"></i>
          명부 출력
        </button>

        {/* 신규 등록 버튼 (Main Action - Agape Green) */}
        <button
          onClick={onAddResident}
          disabled={isProcessing}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <i className="ri-loader-4-line animate-spin text-sm"></i>
              데이터 처리 중...
            </>
          ) : (
            <>
              <i className="ri-user-add-line text-sm"></i>
              신규 입소자 등록
            </>
          )}
        </button>
      </div>
    </div>
  );
}
