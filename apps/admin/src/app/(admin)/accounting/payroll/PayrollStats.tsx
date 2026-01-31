'use client';

import React from 'react';

interface Props {
  stats: {
    totalPay: number; // 총 지급액 (과세+비과세)
    totalDeduction: number; // 공제 합계 (4대보험+세금)
    netPay: number; // 실지급액
    employeeCount: number; // 대상 인원
  };
}

/**
 * 급여 집행 현황 요약 위젯
 * Agape-Care ERP 표준: 고밀도 블루 테마 및 금액별 컬러 코딩 적용
 */
export default function PayrollStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      {/* 1. 지급 총액 (Gross Pay) */}
      <StatWidget
        label="당월 급여 지급 총액"
        value={stats.totalPay}
        unit="원"
        icon="ri-money-dollar-circle-line"
        color="text-[#1a5a96]"
        bgColor="bg-blue-50/30"
        borderColor="border-blue-200"
      />

      {/* 2. 공제 합계 (Total Deductions) */}
      <StatWidget
        label="4대보험 및 세금 공제액"
        value={stats.totalDeduction}
        unit="원"
        icon="ri-hand-coin-line"
        color="text-red-600"
        bgColor="bg-red-50/30"
        borderColor="border-red-200"
      />

      {/* 3. 실지급액 (Net Pay - 최종 예산) */}
      <StatWidget
        label="최종 실지급 합계"
        value={stats.netPay}
        unit="원"
        icon="ri-checkbox-circle-line"
        color="text-emerald-700"
        bgColor="bg-emerald-50/50"
        borderColor="border-emerald-300"
        isMain
      />

      {/* 4. 집행 대상 (Staff Count) */}
      <div className="group flex flex-col justify-between border border-gray-300 bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-tighter text-gray-500">Payroll Staff</p>
          <i className="ri-team-line text-lg text-gray-300 transition-colors group-hover:text-[#1a5a96]"></i>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-gray-900">{stats.employeeCount}</span>
          <span className="text-[10px] font-bold text-gray-400">명</span>
        </div>
        <div className="mt-1">
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full bg-[#1a5a96]" style={{ width: '100%' }}></div>
          </div>
          <p className="mt-1 text-[9px] font-bold text-gray-400">전원 급여 계산 완료</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 개별 급여 통계 위젯
 */
function StatWidget({ label, value, unit, icon, color, bgColor, borderColor, isMain }: any) {
  return (
    <div
      className={`flex items-center justify-between border p-3 shadow-sm ${borderColor} ${bgColor} group transition-all hover:shadow-md`}
    >
      <div className="space-y-1">
        <p className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tight text-gray-500">
          {isMain && <span className="h-3 w-1 bg-emerald-500"></span>}
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={`font-mono text-xl font-black tracking-tighter ${color}`}>{value.toLocaleString()}</span>
          <span className="text-[10px] font-bold text-gray-400">{unit}</span>
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
