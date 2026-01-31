'use client';

import React from 'react';
import clsx from 'clsx';

interface StatsProps {
  readonly stats: {
    total: number;
    completed: number;
    pending: number;
    avgAttendance: number;
  };
}

/**
 * [Component] 회의 및 간담회 운영 통계 대시보드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 직각형 레이아웃 적용
 */
export default function MeetingStats({ stats }: StatsProps) {
  const displayStats = [
    { label: '전체 회의 건수', value: stats.total, unit: '건', color: 'text-gray-800', icon: 'ri-calendar-check-line' },
    {
      label: '회의록 작성완료',
      value: stats.completed,
      unit: '건',
      color: 'text-[#5C8D5A]',
      icon: 'ri-checkbox-circle-line',
    },
    { label: '미작성/대기', value: stats.pending, unit: '건', color: 'text-red-500', icon: 'ri-error-warning-line' },
    { label: '평균 참석률', value: stats.avgAttendance, unit: '%', color: 'text-blue-600', icon: 'ri-user-heart-line' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 font-sans antialiased md:grid-cols-4">
      {displayStats.map((item, index) => (
        <div
          key={index}
          className="group flex h-24 flex-col justify-between border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#5C8D5A]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{item.label}</span>
            <i className={clsx(item.icon, 'text-[14px] opacity-20 group-hover:opacity-100', item.color)}></i>
          </div>
          <div className="flex items-baseline justify-end gap-1">
            <span className={clsx('font-mono text-2xl font-black tracking-tighter', item.color)}>{item.value}</span>
            <span className="text-[10px] font-bold uppercase text-gray-300">{item.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
