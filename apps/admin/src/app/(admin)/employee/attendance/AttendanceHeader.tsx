'use client';

import React from 'react';

interface Props {
  readonly onExport: () => void;
  readonly onManualEntry: () => void;
}

/**
 * [Component] 근태 관리 시스템 통합 헤더 및 액션 바
 * 아가페 그린(#5C8D5A) 테마 및 직각형 버튼 UI 적용
 */
export default function AttendanceHeader({ onExport, onManualEntry }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-5 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 상태 정보 */}
      <div className="flex items-center gap-4">
        <div className="bg-[#5C8D5A] p-2 text-white shadow-md">
          <i className="ri-user-follow-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
              직원 출퇴근 기록 관리
            </h2>
            <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              HR Attendance Node
            </span>
          </div>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Employee Time & Attendance Management System v4.2
          </p>
        </div>
      </div>

      {/* 2. 오른쪽: 직각형 액션 버튼 그룹 (Agape-Standard) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onExport}
          className="flex items-center gap-2 border border-gray-300 bg-white px-5 py-2.5 text-[12px] font-black text-gray-600 transition-all hover:bg-gray-50 active:bg-gray-100"
        >
          <i className="ri-file-excel-2-line text-lg text-green-600"></i>Excel 다운로드
        </button>

        <button
          onClick={onManualEntry}
          className="flex items-center gap-2 bg-[#5C8D5A] px-6 py-2.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-lg"></i>출퇴근 수동 등록
        </button>
      </div>
    </div>
  );
}
