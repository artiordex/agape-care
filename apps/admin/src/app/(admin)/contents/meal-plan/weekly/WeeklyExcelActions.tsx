'use client';

import React from 'react';

interface Props {
  readonly manager: string;
  readonly onManagerChange: (name: string) => void;
  readonly onUploadClick: () => void;
  readonly onDownloadTemplate: () => void;
  readonly onDownloadCurrentWeek: () => void;
  readonly onDeleteAll: () => void;
}

/**
 * [Component] 주간 식단 관리 액션 제어 바
 * 영양사 설정 및 엑셀 데이터 인터페이스 통합
 */
export default function WeeklyExcelActions({
  manager,
  onManagerChange,
  onUploadClick,
  onDownloadTemplate,
  onDownloadCurrentWeek,
  onDeleteAll,
}: Props) {
  return (
    <div className="mb-3 flex flex-col justify-between gap-3 border border-gray-200 bg-[#f8fafc] p-3 shadow-sm md:flex-row md:items-center">
      {/* 1. 영양사 관리 섹션 */}
      <div className="flex items-center gap-3">
        <label className="text-[10px] font-black uppercase tracking-tighter text-gray-500">
          Responsible Nutritionist
        </label>
        <div className="relative">
          <i className="ri-user-settings-line absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5C8D5A]"></i>
          <input
            type="text"
            value={manager}
            onChange={e => onManagerChange(e.target.value)}
            placeholder="담당 영양사 입력"
            className="w-40 border border-gray-300 bg-white py-1.5 pl-8 pr-2 text-[11px] font-bold outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
        </div>
        <span className="h-4 w-[1px] bg-gray-300"></span>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5C8D5A]">
          <i className="ri-shield-check-line"></i>
          Qualified Professional
        </div>
      </div>

      {/* 2. 데이터 액션 그룹 (ERP 고밀도 버튼) */}
      <div className="flex flex-wrap items-center gap-1">
        {/* 업로드 */}
        <button
          onClick={onUploadClick}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-3 py-1.5 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A] hover:shadow-sm"
        >
          <i className="ri-upload-cloud-2-line text-sm"></i>
          식단표 엑셀 업로드
        </button>

        {/* 템플릿 다운로드 */}
        <button
          onClick={onDownloadTemplate}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-3 py-1.5 text-[10px] font-black text-gray-400 transition-all hover:bg-gray-50"
        >
          <i className="ri-file-excel-line text-sm"></i>
          업로드 양식(다운)
        </button>

        {/* 현재 주간 출력/저장 */}
        <button
          onClick={onDownloadCurrentWeek}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-4 py-1.5 text-[10px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-download-2-line text-sm"></i>
          주간 식단표 저장
        </button>

        <span className="mx-1 h-4 w-[1px] bg-gray-300"></span>

        {/* 초기화 */}
        <button
          onClick={onDeleteAll}
          className="flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1.5 text-[10px] font-black text-red-600 transition-all hover:bg-red-100"
        >
          <i className="ri-delete-bin-7-line text-sm"></i>
          주간 초기화
        </button>
      </div>
    </div>
  );
}
