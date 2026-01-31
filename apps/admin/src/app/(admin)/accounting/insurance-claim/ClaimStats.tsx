'use client';

import React from 'react';

interface Props {
  stats: {
    totalService: number;
    totalCopay: number;
    totalInsurance: number;
    count: number;
    submitted: number;
    approved: number;
  };
}

/**
 * 장기요양보험 청구 현황 요약 위젯
 * 고밀도 블루 ERP 스타일 적용
 */
export default function ClaimStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      {/* 1. 총 급여비용 (Total Service) */}
      <StatWidget
        label="당월 총 급여비용"
        value={stats.totalService}
        unit="원"
        icon="ri-file-shield-2-line"
        color="text-gray-900"
        bgColor="bg-white"
        borderColor="border-gray-300"
      />

      {/* 2. 본인부담금 (Copayment) */}
      <StatWidget
        label="수급자 본인부담 합계"
        value={stats.totalCopay}
        unit="원"
        icon="ri-user-received-2-line"
        color="text-purple-700"
        bgColor="bg-purple-50/30"
        borderColor="border-purple-200"
      />

      {/* 3. 공단부담금 (Insurance - 핵심 지표) */}
      <StatWidget
        label="공단 청구 예정액"
        value={stats.totalInsurance}
        unit="원"
        icon="ri-shield-check-line"
        color="text-emerald-700"
        bgColor="bg-emerald-50/50"
        borderColor="border-emerald-300"
        isMain
      />

      {/* 4. 청구 진척도 (Progress) */}
      <div className="flex flex-col justify-between border border-[#1a5a96] bg-[#1a5a96] p-3 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-tighter opacity-80">Claim Progress</p>
          <i className="ri-loader-4-line animate-spin-slow text-lg"></i>
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black">{stats.count}</span>
            <span className="text-[10px] font-medium opacity-70">명 대상</span>
          </div>
          <div className="mt-1 flex gap-2 text-[9px] font-bold">
            <span className="rounded-sm bg-white/20 px-1.5 py-0.5">청구: {stats.submitted}명</span>
            <span className="rounded-sm bg-emerald-500/40 px-1.5 py-0.5">승인: {stats.approved}명</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 개별 통계 위젯 컴포넌트
 */
function StatWidget({ label, value, unit, icon, color, bgColor, borderColor, isMain }: any) {
  return (
    <div className={`flex items-center justify-between border p-3 shadow-sm ${borderColor} ${bgColor} group`}>
      <div className="space-y-1">
        <p className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tight text-gray-500">
          {isMain && <span className="h-3 w-1 bg-emerald-500"></span>}
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={`font-mono text-xl font-black ${color}`}>{value.toLocaleString()}</span>
          <span className="text-[10px] font-medium text-gray-400">{unit}</span>
        </div>
      </div>
      <div
        className={`rounded-full p-2 transition-transform group-hover:scale-110 ${isMain ? 'bg-emerald-100' : 'bg-gray-100'}`}
      >
        <i className={`${icon} ${isMain ? 'text-emerald-600' : 'text-gray-400'} text-lg`}></i>
      </div>
    </div>
  );
}
