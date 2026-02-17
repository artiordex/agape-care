'use client';

import React from 'react';
import clsx from 'clsx';

interface StatsProps {
  readonly stats: {
    workDays: number;
    totalHours: number;
    nightCount: number;
    vacation: number;
    overtime: number;
  };
}

/**
 * [Component] 직원의 월간 누적 근무 통계 대시보드
 * 아가페 그린(#5C8D5A) 테마 및 직각형 카드 레이아웃 적용
 */
export default function ScheduleMonthlyStats({ stats }: StatsProps) {
  // 시각화할 통계 데이터 정의
  const displayStats = [
    {
      label: '월간 근무일수',
      value: stats.workDays,
      unit: '일',
      color: 'text-[#5C8D5A]',
      icon: 'ri-calendar-check-line',
    },
    {
      label: '총 근무 시간',
      value: stats.totalHours,
      unit: 'h',
      color: 'text-gray-700',
      icon: 'ri-time-line',
    },
    {
      label: '야간 근무 횟수',
      value: stats.nightCount,
      unit: '회',
      color: 'text-purple-600',
      icon: 'ri-moon-clear-line',
    },
    {
      label: '휴가/반차 사용',
      value: stats.vacation,
      unit: '일',
      color: 'text-pink-600',
      icon: 'ri-rest-time-line',
    },
    {
      label: '초과 근무 시간',
      value: stats.overtime,
      unit: 'h',
      color: 'text-orange-600',
      icon: 'ri-timer-flash-line',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 font-sans text-gray-900 antialiased md:grid-cols-5">
      {displayStats.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'group flex h-24 flex-col justify-between rounded-none border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#5C8D5A] hover:shadow-md',
          )}
        >
          {/* 상단 라벨 및 아이콘 */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{item.label}</p>
            <i
              className={clsx(
                item.icon,
                'text-[14px] opacity-20 transition-opacity group-hover:opacity-100',
                item.color,
              )}
            ></i>
          </div>

          {/* 하단 수치 데이터 */}
          <div className="flex items-baseline justify-end gap-1">
            <span className={clsx('font-mono text-2xl font-black tracking-tighter', item.color)}>{item.value}</span>
            <span className="text-[10px] font-bold uppercase text-gray-300">{item.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
