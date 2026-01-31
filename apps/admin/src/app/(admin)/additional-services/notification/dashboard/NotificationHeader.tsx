'use client';

interface Props {
  readonly selectedCampaignName: string | null; // 현재 선택된 캠페인명
  readonly isProcessing: boolean; // 발송 중 상태
  readonly onNewNotification: () => void; // 신규 알림 발송 액션
}

/**
 * [Header] 알림 발송 및 채널 관리 통합 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 레이아웃 적용
 */
export default function NotificationHeader({ selectedCampaignName, isProcessing, onNewNotification }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 정체성 및 타이틀 */}
      <div className="flex items-center gap-3">
        {/* 아가페 그린 테마 아이콘 박스 */}
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-notification-3-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">알림 통합 관리 및 발송</h1>
            <span className="rounded border border-red-100 bg-red-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-600">
              실시간 통신 대기
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">Multi-Channel Messaging</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              SMS / KakaoTalk / Band Integrated System
            </p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 현재 편집/조회 대상 (선택 시 노출) */}
      {selectedCampaignName && (
        <div className="animate-in fade-in zoom-in hidden items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 duration-300 xl:flex">
          <div className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#5C8D5A] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5C8D5A]"></span>
          </div>
          <p className="text-[11px] font-black text-gray-700">
            조회 중인 캠페인: <span className="ml-1 text-[#5C8D5A]">{selectedCampaignName}</span>
          </p>
        </div>
      )}

      {/* 3. 오른쪽: 전역 알림 액션 */}
      <div className="flex items-center gap-2">
        {/* 발송 통계 리포트 (History) */}
        <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50">
          <i className="ri-file-chart-line"></i>
          발송 결과 보고서
        </button>

        {/* 신규 발송 버튼 (Main Action - Agape Green) */}
        <button
          onClick={onNewNotification}
          disabled={isProcessing}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <i className="ri-loader-4-line animate-spin text-sm"></i>
              메시지 큐 동기화 중...
            </>
          ) : (
            <>
              <i className="ri-send-plane-fill text-sm"></i>
              신규 알림 발송 구성
            </>
          )}
        </button>
      </div>
    </div>
  );
}
