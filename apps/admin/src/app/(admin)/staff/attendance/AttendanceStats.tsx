'use client';

import React from 'react';
import clsx from 'clsx';

/**
 * [Component] 금일 전 직원 출근 현황 통계 대시보드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 카드 스타일 적용
 */
export default function AttendanceStats() {
  // 실제 환경에서는 상위 page.tsx에서 계산된 데이터를 props로 전달받습니다.
  const stats = [
    { label: '전체 직원', value: 48, unit: '명', icon: 'ri-group-line', color: 'text-gray-700', bgColor: 'bg-gray-50' },
    {
      label: '금일 출근',
      value: 42,
      unit: '명',
      icon: 'ri-user-check-line',
      color: 'text-[#5C8D5A]',
      bgColor: 'bg-emerald-50',
    },
    {
      label: '지각/미수행',
      value: 2,
      unit: '건',
      icon: 'ri-alarm-warning-line',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    { label: '부재/휴가', value: 4, unit: '명', icon: 'ri-plane-line', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 font-sans antialiased md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="relative flex items-center justify-between border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#5C8D5A]"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={clsx('font-mono text-2xl font-black tracking-tighter', stat.color)}>
                {stat.value.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-gray-300">{stat.unit}</span>
            </div>
          </div>

          <div
            className={clsx(
              'flex h-12 w-12 items-center justify-center border shadow-inner transition-transform',
              stat.bgColor,
              'border-gray-100',
            )}
          >
            <i className={clsx(stat.icon, stat.color, 'text-2xl')}></i>
          </div>

          {/* 하단 데코레이션 바 */}
          <div
            className={clsx(
              'absolute bottom-0 left-0 h-1 w-0 transition-all group-hover:w-full',
              stat.color.replace('text', 'bg'),
            )}
          ></div>
        </div>
      ))}
    </div>
  );
}
