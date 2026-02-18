/**
 * Description : Header.tsx - ?? Header UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly onRefresh: () => void;
}

/**
 * [Header] 예약 발송 관리 헤더
 */
export default function Header({ onRefresh }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-calendar-event-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">예약 발송 관리</h1>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[12px] font-bold text-[#5C8D5A]">발송 대기 중인 예약 알림 현황</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              SCHEDULED NOTIFICATION MANAGEMENT
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[12px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
        >
          <i className="ri-refresh-line"></i>새로고침
        </button>
      </div>
    </div>
  );
}
