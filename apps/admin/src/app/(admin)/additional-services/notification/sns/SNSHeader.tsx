/**
 * Description : SNSHeader.tsx - ?? SNSHeader UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly isSaving: boolean;
  readonly onSave: () => void;
}

/**
 * [Header] SNS 알림 발송 및 관리 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 국문 인터페이스
 */
export default function SNSHeader({ isSaving, onSave }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 정체성 및 타이틀 */}
      <div className="flex items-center gap-3">
        {/* 아가페 그린 테마 아이콘 박스 */}
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-message-3-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">SNS 알림 관리</h1>
            <span className="rounded-full bg-[#E1F1E1] px-2 py-0.5 text-[10px] font-black uppercase text-[#5C8D5A]">
              Alpha Service
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[12px] font-bold text-[#5C8D5A]">카카오 알림톡 및 문자 설정</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              SOCIAL NOTIFICATION SERVICE (SNS)
            </p>
          </div>
        </div>
      </div>

      {/* 오른쪽: 전역 액션 */}
      <div className="flex items-center gap-2">
        {/* 발송 이력 (Audit Log) */}
        <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[12px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50">
          <i className="ri-history-line"></i>발송 이력 확인
        </button>

        {/* 저장 버튼 (Main Action - Agape Green) */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <i className="ri-loader-4-line animate-spin text-sm"></i>
              설정 저장 중...
            </>
          ) : (
            <>
              <i className="ri-save-3-line text-sm"></i>
              알림 설정 저장
            </>
          )}
        </button>
      </div>
    </div>
  );
}
