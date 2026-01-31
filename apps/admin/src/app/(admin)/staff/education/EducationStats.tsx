'use client';

import React from 'react';
import clsx from 'clsx';

interface StatsProps {
  readonly stats: {
    total: number;
    thisYear: number;
    avgAttendance: number;
    upcoming: number;
  };
}

/**
 * [Component] 교육 이력 요약 통계 대시보드
 * 아가페 그린(#5C8D5A) 테마 및 직각형 카드 스타일 적용
 */
export default function EducationStats({ stats }: StatsProps) {
  const displayStats = [
    {
      label: '누적 교육 횟수',
      value: stats.total,
      unit: '건',
      icon: 'ri-database-2-line',
      color: 'text-gray-700',
      bg: 'bg-white',
    },
    {
      label: '금년 시행 교육',
      value: stats.thisYear,
      unit: '건',
      icon: 'ri-calendar-check-line',
      color: 'text-[#5C8D5A]',
      bg: 'bg-emerald-50/50',
    },
    {
      label: '평균 직원 참석률',
      value: stats.avgAttendance,
      unit: '%',
      icon: 'ri-user-heart-line',
      color: 'text-teal-600',
      bg: 'bg-teal-50/50',
    },
    {
      label: '시행 예정 교육',
      value: stats.upcoming,
      unit: '건',
      icon: 'ri-time-line',
      color: 'text-orange-600',
      bg: 'bg-orange-50/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 font-sans antialiased md:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((item, index) => (
        <div
          key={index}
          className="group relative flex items-center justify-between rounded-none border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#5C8D5A]"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{item.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={clsx('font-mono text-2xl font-black tracking-tighter', item.color)}>
                {item.value.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold uppercase text-gray-300">{item.unit}</span>
            </div>
          </div>

          <div
            className={clsx(
              'flex h-12 w-12 items-center justify-center rounded-none border shadow-inner transition-all group-hover:bg-[#5C8D5A] group-hover:text-white',
              item.bg,
              'border-gray-100',
            )}
          >
            <i className={clsx(item.icon, 'text-2xl group-hover:text-white', item.color)}></i>
          </div>

          {/* 하단 데코레이션 바 */}
          <div
            className={clsx(
              'absolute bottom-0 left-0 h-1 w-0 transition-all group-hover:w-full',
              item.color.replace('text', 'bg'),
            )}
          ></div>
        </div>
      ))}
    </div>
  );
}
