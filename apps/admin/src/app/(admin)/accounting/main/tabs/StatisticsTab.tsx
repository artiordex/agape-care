'use client';

import React from 'react';

interface Props {
  monthlySummary: Record<string, any>;
}

/**
 * [6] 통계 분석 탭
 * 월별 추이 및 항목별 구성비 시각화 대시보드
 */
export default function StatisticsTab({ monthlySummary }: Props) {
  // 월별 추이 데이터 가공 (최근 6개월)
  const months = Object.keys(monthlySummary).sort().reverse();
  const maxAmount = Math.max(
    ...months.map(m => Math.max(monthlySummary[m].totalIncome, monthlySummary[m].totalExpense)),
  );

  return (
    <div className="animate-in fade-in space-y-4 text-[11px] duration-500">
      {/* 1. 월별 수입/지출 추이 (Bar Chart Style) */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-300 bg-[#eef3f8] p-2.5">
          <h3 className="flex items-center gap-1 font-black text-gray-700">
            <i className="ri-bar-chart-fill text-blue-600"></i> 월별 수입/지출 현황 추이
          </h3>
          <span className="text-[10px] font-bold text-gray-400">* 최근 6개월 데이터 기준</span>
        </div>
        <div className="flex h-64 items-end justify-around gap-4 border-b border-gray-100 p-6">
          {months.map(month => (
            <div key={month} className="group flex flex-1 flex-col items-center gap-2">
              <div className="flex h-48 w-full items-end justify-center gap-1">
                {/* 수입 바 */}
                <div
                  className="group/bar relative w-4 bg-blue-500 transition-all hover:bg-blue-600"
                  style={{ height: `${(monthlySummary[month].totalIncome / maxAmount) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-[9px] text-white group-hover/bar:block">
                    수입: {monthlySummary[month].totalIncome.toLocaleString()}
                  </div>
                </div>
                {/* 지출 바 */}
                <div
                  className="group/bar relative w-4 bg-red-400 transition-all hover:bg-red-500"
                  style={{ height: `${(monthlySummary[month].totalExpense / maxAmount) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-[9px] text-white group-hover/bar:block">
                    지출: {monthlySummary[month].totalExpense.toLocaleString()}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-500">{month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 bg-gray-50 p-2">
          <div className="flex items-center gap-1 text-[10px] text-gray-600">
            <span className="h-2 w-2 bg-blue-500"></span> 수입
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-600">
            <span className="h-2 w-2 bg-red-400"></span> 지출
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* 2. 지출 구성비 상세 분석 */}
        <div className="border border-gray-300 bg-white shadow-sm">
          <div className="border-b border-gray-300 bg-[#eef3f8] p-2.5 font-black text-gray-700">
            주요 지출 항목 구성비
          </div>
          <div className="space-y-4 p-4">
            {Object.entries(monthlySummary[months[0]].expenseByCategory)
              .sort((a: any, b: any) => b[1] - a[1])
              .map(([cat, val]: [string, any], idx) => {
                const percent = ((val / monthlySummary[months[0]].totalExpense) * 100).toFixed(1);
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-600">{cat}</span>
                      <span className="text-gray-900">
                        {percent}% <span className="ml-1 font-normal text-gray-400">({val.toLocaleString()}원)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full transition-all duration-1000 ${idx === 0 ? 'bg-red-600' : 'bg-red-400'}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 3. 핵심 경영 지표 (KPI) */}
        <div className="flex flex-col border border-gray-300 bg-white shadow-sm">
          <div className="border-b border-gray-300 bg-[#eef3f8] p-2.5 font-black text-gray-700">회계 건전성 지표</div>
          <div className="grid flex-1 grid-cols-2 gap-3 p-4">
            <KPICard
              label="당기순이익률"
              value={
                ((monthlySummary[months[0]].balance / monthlySummary[months[0]].totalIncome) * 100).toFixed(1) + '%'
              }
              desc="수입 대비 이익 비중"
              trend="up"
            />
            <KPICard
              label="인건비 비중"
              value={
                (
                  (monthlySummary[months[0]].expenseByCategory['인건비'] / monthlySummary[months[0]].totalExpense) *
                  100
                ).toFixed(1) + '%'
              }
              desc="총 지출 내 인건비"
              trend="stable"
            />
            <KPICard label="전월 대비 수익" value="+5.2%" desc="매출 성장세" trend="up" />
            <KPICard label="고정비 비율" value="62.4%" desc="운영 안정성 지표" trend="down" />
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, desc, trend }: any) {
  return (
    <div className="flex flex-col justify-between rounded-sm border border-gray-200 bg-gray-50 p-3">
      <div>
        <p className="mb-1 text-[10px] font-bold text-gray-500">{label}</p>
        <p className="text-lg font-black text-[#1a5a96]">{value}</p>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-1.5">
        <span className="text-[9px] text-gray-400">{desc}</span>
        {trend === 'up' && <i className="ri-arrow-right-up-line font-bold text-emerald-500"></i>}
        {trend === 'down' && <i className="ri-arrow-right-down-line font-bold text-red-500"></i>}
        {trend === 'stable' && <i className="ri-subtract-line font-bold text-gray-400"></i>}
      </div>
    </div>
  );
}
