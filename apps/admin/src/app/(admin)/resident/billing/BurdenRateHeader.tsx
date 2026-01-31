'use client';

import React from 'react';

interface Props {
  readonly selectedResidentName: string | null;
  readonly isProcessing: boolean;
  readonly onNewRecord: () => void;
}

/**
 * [Header] 본인부담률 이력 관리 통합 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 레이아웃 적용
 */
export default function BurdenRateHeader({ selectedResidentName, isProcessing, onNewRecord }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 현재 섹션 정보 */}
      <div className="flex items-center gap-3">
        {/* 아가페 그린 테마 아이콘 박스 */}
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-coins-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">
              본인부담률 변경이력 관리
            </h1>
            <span className="rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              재무 세무 관제 활성
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">Co-payment Rate Management</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Long-term Care Insurance Protocol
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

      {/* 3. 오른쪽: 전역 관리 액션 */}
      <div className="flex items-center gap-2">
        {/* 변경 안내 가이드 출력 */}
        <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50">
          <i className="ri-guide-line text-lg"></i>
          부담률 산정 기준표
        </button>

        {/* 신규 등록 버튼 (Main Action - Agape Green) */}
        <button
          onClick={onNewRecord}
          disabled={isProcessing}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <i className="ri-loader-4-line animate-spin text-sm"></i>
              기록 동기화 중...
            </>
          ) : (
            <>
              <i className="ri-add-line text-sm"></i>
              신규 부담률 정보 등록
            </>
          )}
        </button>
      </div>
    </div>
  );
}
