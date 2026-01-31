'use client';

import React from 'react';

/**
 * 청구 생성을 위한 액션 바
 * 개별 추가, 전체 생성, 데이터 추출 기능
 */
export default function ClaimActionBar({ onAdd, onGenerateAll, onExport, totalCount }: any) {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 bg-[#eef3f8] px-2 py-1.5">
      {/* 왼쪽: 현재 조회 정보 */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase text-gray-400">View Details:</span>
        <span className="text-[11px] font-bold text-[#1a5a96]">
          총 <span className="text-blue-700">{totalCount}</span>명의 청구 대상 조회됨
        </span>
      </div>

      {/* 오른쪽: 액션 버튼 그룹 */}
      <div className="flex items-center gap-1">
        <button
          onClick={onAdd}
          className="flex items-center gap-1 border border-gray-300 bg-white px-3 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-50"
        >
          <i className="ri-add-line text-blue-600"></i>
          개별 추가
        </button>

        <button
          onClick={onGenerateAll}
          className="flex items-center gap-1 bg-[#1a5a96] px-3 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-[#144675]"
        >
          <i className="ri-file-add-line"></i>
          전체 청구 자동 생성
        </button>

        <div className="mx-1 h-3 w-[1px] bg-gray-300"></div>

        <button
          onClick={onExport}
          className="flex items-center gap-1 bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white hover:bg-emerald-700"
        >
          <i className="ri-file-excel-2-line"></i>
          공단 청구용 CSV 추출
        </button>
      </div>
    </div>
  );
}
