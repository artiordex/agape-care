'use client';

import React from 'react';

interface Stats {
  total: number;
  success: number;
  failed: number;
  pending: number;
}

interface Props {
  readonly todayStats: Stats;
  readonly scheduled: number;
}

/**
 * [Component] 알림 발송 현황 통계 보드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 수치 레이아웃
 */
export default function StatsBoard({ todayStats, scheduled }: Props) {
  const successRate = ((todayStats.success / todayStats.total) * 100 || 0).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-4 font-sans md:grid-cols-4">
      <StatCard
        label="금일 총 발송"
        value={todayStats.total}
        unit="건"
        icon="ri-send-plane-2-line"
        subLabel="전체 채널 합계"
      />
      <StatCard
        label="발송 성공"
        value={todayStats.success}
        unit="건"
        icon="ri-checkbox-circle-line"
        subLabel={`성공률 ${successRate}%`}
        isSuccess
      />
      <StatCard
        label="발송 실패"
        value={todayStats.failed}
        unit="건"
        icon="ri-error-warning-line"
        subLabel="오류 및 수신 거부"
        isError={todayStats.failed > 0}
      />
      <StatCard
        label="예약 대기"
        value={scheduled}
        unit="건"
        icon="ri-calendar-todo-line"
        subLabel="발송 예정 캠페인"
        isHighlight
      />
    </div>
  );
}

function StatCard({ label, value, unit, icon, subLabel, isSuccess, isError, isHighlight }: any) {
  return (
    <div className="group rounded-lg border border-gray-300 bg-white p-5 shadow-sm transition-all hover:border-[#5C8D5A]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-tighter text-gray-400">{label}</span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-md border ${
            isSuccess
              ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
              : isError
                ? 'border-red-100 bg-red-50 text-red-600'
                : isHighlight
                  ? 'border-[#5C8D5A]/20 bg-[#5C8D5A]/10 text-[#5C8D5A]'
                  : 'border-gray-100 bg-gray-50 text-gray-400'
          }`}
        >
          <i className={`${icon} text-lg`}></i>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-2xl font-black text-gray-900">{value.toLocaleString()}</span>
        <span className="text-[11px] font-bold text-gray-400">{unit}</span>
      </div>
      <p className="mt-2 text-[10px] font-bold uppercase italic tracking-tighter text-gray-400">{subLabel}</p>
      <div className={`mt-3 h-1 w-0 bg-[#5C8D5A] transition-all group-hover:w-full`}></div>
    </div>
  );
}
