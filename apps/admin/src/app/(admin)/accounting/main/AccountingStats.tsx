'use client';

import React from 'react';

interface Props {
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: { income: number; expense: number };
  };
}

/**
 * 회계 현황 요약 통계 섹션
 * 수입/지출/잔액을 카드 형태로 고밀도 시각화
 */
export default function AccountingStats({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {/* 총 수입 카드 */}
      <StatWidget
        label="총 수입 (Income)"
        value={summary.totalIncome}
        count={summary.transactionCount.income}
        color="text-blue-700"
        borderColor="border-blue-300"
        bgColor="bg-blue-50/50"
        icon="ri-arrow-left-down-line"
        delta="+5.2%" // 가상 데이터
      />

      {/* 총 지출 카드 */}
      <StatWidget
        label="총 지출 (Expense)"
        value={summary.totalExpense}
        count={summary.transactionCount.expense}
        color="text-red-600"
        borderColor="border-red-300"
        bgColor="bg-red-50/50"
        icon="ri-arrow-right-up-line"
        delta="+2.1%" // 가상 데이터
      />

      {/* 수지 차액 (잔액) 카드 */}
      <StatWidget
        label="수지 차액 (Balance)"
        value={summary.balance}
        color="text-gray-900"
        borderColor="border-gray-300"
        bgColor="bg-white"
        icon="ri-wallet-3-line"
        isBalance
        percentage={((summary.balance / summary.totalIncome) * 100).toFixed(1)}
      />
    </div>
  );
}

function StatWidget({ label, value, count, color, borderColor, bgColor, icon, delta, isBalance, percentage }: any) {
  return (
    <div className={`border ${borderColor} ${bgColor} group relative overflow-hidden p-4 shadow-sm`}>
      {/* 배경 장식 아이콘 */}
      <i
        className={`${icon} absolute -bottom-2 -right-2 text-5xl opacity-[0.03] transition-transform group-hover:scale-110`}
      ></i>

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span className={`h-3 w-1 ${isBalance ? 'bg-gray-400' : color.replace('text', 'bg')}`}></span>
            {label}
          </p>
          {delta && (
            <span className={`text-[10px] font-bold ${delta.startsWith('+') ? 'text-blue-600' : 'text-red-500'}`}>
              전월대비 {delta}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-black tracking-tighter ${color}`}>{value.toLocaleString()}</span>
          <span className="text-[11px] font-bold text-gray-400">원</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          {count !== undefined && (
            <span className="rounded-full border border-gray-200 bg-white/80 px-2 py-0.5 text-[10px] font-bold text-gray-500">
              {count}건의 거래 발생
            </span>
          )}
          {isBalance && (
            <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
              수익률 {percentage}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
