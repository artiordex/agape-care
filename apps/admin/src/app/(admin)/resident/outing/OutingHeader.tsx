/**
 * Description : OutingHeader.tsx - ?? OutingHeader UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React from 'react';

interface Props {
  readonly selectedResidentName: string | null;
  readonly isProcessing: boolean;
  readonly onNewRecord: () => void;
  readonly onViewReport: () => void; // 📌 보고서 뷰 전환을 위한 prop 추가
}

export default function OutingHeader({
  selectedResidentName,
  isProcessing,
  onNewRecord,
  onViewReport, // 📌 추가됨
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-door-open-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">
              외출·외박 통합 관제 시스템
            </h1>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">외출, 외박 관리</p>
            {selectedResidentName && (
              <>
                <span className="text-[10px] text-gray-300">|</span>
                <p className="text-[10px] font-bold text-gray-500">선택된 대상: {selectedResidentName}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. 오른쪽: 전역 관리 액션 */}
      <div className="flex items-center gap-1.5">
        {/* 📌 월간 통계 리포트 - onClick 연결 및 너비 조정 */}
        <button
          onClick={onViewReport}
          className="flex min-w-[190px] items-center justify-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[12px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
        >
          <i className="ri-file-chart-line text-lg"></i>
          <span>월간 통계 리포트</span>
        </button>

        {/* 신규 등록 버튼 */}
        <button
          onClick={onNewRecord}
          disabled={isProcessing}
          className="flex min-w-[190px] items-center justify-center gap-1.5 bg-[#5C8D5A] px-4 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <i className="ri-loader-4-line animate-spin text-sm"></i>
              <span>기록 동기화 중...</span>
            </>
          ) : (
            <>
              <i className="ri-add-box-line text-sm"></i>
              <span>신규 외출·외박 기록 작성</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
