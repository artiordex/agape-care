'use client';

import React from 'react';

interface Props {
  facilityName: string;
  isSaving: boolean;
  onSave: () => void;
  onReset: () => void;
}

/**
 * 시설 정보 관리 시스템 통합 헤더
 * 기관 타이틀 및 전역 액션(저장/초기화) 포함
 */
export default function FacilityHeader({ facilityName, isSaving, onSave, onReset }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 기관 타이틀 및 정보 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#1a5a96] p-2.5 text-white shadow-md shadow-blue-100">
          <i className="ri-bank-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">시설 기본 정보 관리</h1>
            <span className="rounded border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#1a5a96]">
              Official Info
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#1a5a96]">{facilityName || '기관명 미설정'}</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Management of Facility Fundamental Data
            </p>
          </div>
        </div>
      </div>

      {/* 2. 오른쪽: 전역 액션 버튼 */}
      <div className="flex items-center gap-2">
        {/* 최종 동기화 정보 (정적 표시) */}
        <div className="mr-4 hidden items-center gap-1.5 text-[10px] font-bold uppercase text-gray-400 lg:flex">
          <i className="ri-time-line"></i>
          <span>Last Sync: {new Date().toLocaleDateString()}</span>
        </div>

        {/* 초기화 버튼 */}
        <button
          onClick={onReset}
          disabled={isSaving}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="ri-refresh-line"></i>
          정보 초기화
        </button>

        {/* 저장 버튼 (Main Action) */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 bg-[#1a5a96] px-5 py-2 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-[#144675] active:scale-95 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              저장 중...
            </>
          ) : (
            <>
              <i className="ri-save-3-line"></i>
              시설 정보 저장
            </>
          )}
        </button>
      </div>
    </div>
  );
}
