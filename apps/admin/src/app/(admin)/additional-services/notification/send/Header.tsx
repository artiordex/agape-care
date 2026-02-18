/**
 * Description : Header.tsx - ?? Header UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly isSaving?: boolean;
  readonly onSend: () => void;
}

/**
 * [Header] 알림 발송 통합 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 국문 인터페이스
 */
export default function Header({ isSaving, onSend }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 정체성 및 타이틀 */}
      <div className="flex items-center gap-3">
        {/* 아가페 그린 테마 아이콘 박스 */}
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-send-plane-2-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">알림 발송</h1>
            <span className="rounded-full bg-[#E1F1E1] px-2 py-0.5 text-[10px] font-black uppercase text-[#5C8D5A]">
              Standard
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[12px] font-bold text-[#5C8D5A]">수급자 및 보호자 대상 통합 알림 전송</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              NOTIFICATION DISPATCH SERVICE
            </p>
          </div>
        </div>
      </div>

      {/* 오른쪽: 전역 액션 */}
      <div className="flex items-center gap-2">
        {/* 발급 이력 (Audit Log) 등 추가 버튼 가능 */}
        <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[12px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50">
          <i className="ri-draft-line"></i>임시 저장함
        </button>

        {/* 발송 버튼 (Main Action - Agape Green) */}
        <button
          onClick={onSend}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          <i className="ri-send-plane-fill text-sm"></i>
          알림 통합 발송
        </button>
      </div>
    </div>
  );
}
