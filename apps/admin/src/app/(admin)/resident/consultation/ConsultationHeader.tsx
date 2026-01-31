'use client';

import React from 'react';

interface Props {
  readonly activeTab: 'consultation' | 'interview';
  readonly viewMode: 'quarterly' | 'list' | 'create' | 'detail';
  readonly isProcessing: boolean;
  readonly onAction: () => void;
  readonly onBack: () => void;
}

/**
 * [Header] 상담·면담 통합 관제 헤더
 * 아가페 그린(#5C8D5A) 테마 및 실시간 모니터링 상태 적용
 */
export default function ConsultationHeader({ activeTab, viewMode, isProcessing, onAction, onBack }: Props) {
  const isQuarterly = viewMode === 'quarterly';
  const title = activeTab === 'consultation' ? '상담일지 통합 관리' : '신규 수급자 면담 관리';

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 정체성 및 현재 상태 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className={activeTab === 'consultation' ? 'ri-chat-voice-line text-xl' : 'ri-user-heart-line text-xl'}></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">{title}</h1>
            <span className="rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              분기별 이행 모니터링 중
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">Consultation & Interview System</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Agape-Care Quality Control Protocol
            </p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 뷰 모드 인디케이터 */}
      {!isQuarterly && (
        <div className="animate-in fade-in zoom-in hidden items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 duration-300 xl:flex">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[11px] font-black text-gray-400 transition-colors hover:text-[#5C8D5A]"
          >
            <i className="ri-arrow-left-s-line"></i> 분기별 현황으로
          </button>
          <span className="h-2 w-[1px] bg-gray-300"></span>
          <p className="text-[11px] font-black text-gray-700">
            현재 뷰: <span className="ml-1 uppercase text-[#5C8D5A]">{viewMode} Mode</span>
          </p>
        </div>
      )}

      {/* 3. 오른쪽: 컨텍스트 액션 버튼 */}
      <div className="flex items-center gap-2">
        {isQuarterly ? (
          <button
            onClick={onAction}
            className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
          >
            <i className="ri-file-list-3-line text-[#5C8D5A]"></i>
            전체 상담 내역 조회
          </button>
        ) : (
          <button
            onClick={onAction}
            disabled={isProcessing}
            className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <i className="ri-loader-4-line animate-spin text-sm"></i>
                데이터 동기화 중...
              </>
            ) : (
              <>
                <i className="ri-add-line text-sm"></i>
                신규 기록 작성
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
