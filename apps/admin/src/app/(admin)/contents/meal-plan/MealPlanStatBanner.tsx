'use client';

import React from 'react';
import clsx from 'clsx';

interface Stats {
  readonly rate: string;
  readonly count: number;
  readonly totalCalories: number;
  readonly avgCalories: number;
}

interface Props {
  readonly stats: Stats;
}

/**
 * [Component] 급식관리 영양 통계 대시보드 배너
 * 월간 식단 등록 현황 및 칼로리 데이터를 4분할 그리드로 시각화
 */
export default function MealPlanStatBanner({ stats }: Props) {
  // 통계 항목 정의
  const statItems = [
    {
      label: '식단 등록률',
      value: `${stats.rate}%`,
      icon: 'ri-pie-chart-line',
      color: 'text-[#5C8D5A]',
      bg: 'bg-emerald-50',
    },
    {
      label: '등록 일수',
      value: `${stats.count}일`,
      icon: 'ri-calendar-check-line',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: '월간 총 칼로리',
      value: `${stats.totalCalories.toLocaleString()} Kcal`,
      icon: 'ri-fire-line',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: '일평균 칼로리',
      value: `${stats.avgCalories.toLocaleString()} Kcal`,
      icon: 'ri-temp-hot-line',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 border-b border-gray-200 bg-[#f8fafc] p-3 md:grid-cols-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border border-gray-300 bg-white p-3 shadow-sm transition-all hover:shadow-md"
        >
          {/* 아이콘 영역 */}
          <div className={clsx('flex h-10 w-10 items-center justify-center rounded-lg border shadow-inner', item.bg)}>
            <i className={clsx(item.icon, 'text-xl', item.color)}></i>
          </div>

          {/* 데이터 영역 */}
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
            <span className={clsx('text-[16px] font-black leading-none tracking-tight', item.color)}>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
