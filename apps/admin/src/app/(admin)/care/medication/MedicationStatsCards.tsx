'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  readonly totalDoses: number;
  readonly completedDoses: number;
  readonly pendingDoses: number;
  readonly lowStockCount: number;
}

/**
 * [Component] 투약 및 약품 재고 실시간 모니터링 통계 카드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 대시보드 스타일 적용
 */
export default function MedicationStatsCards({ totalDoses, completedDoses, pendingDoses, lowStockCount }: Props) {
  // 투약 현황 통계 데이터 정의
  const stats = [
    {
      label: '오늘 투약 예정',
      value: totalDoses,
      unit: '회',
      icon: 'ri-medicine-bottle-line',
      color: 'text-gray-700',
      bgColor: 'bg-white',
      desc: 'Scheduled Doses',
    },
    {
      label: '투약 완료 (확정)',
      value: completedDoses,
      unit: '회',
      icon: 'ri-checkbox-circle-line',
      color: 'text-[#5C8D5A]', // 아가페 그린 적용
      bgColor: 'bg-emerald-50/50',
      desc: 'Completed',
    },
    {
      label: '미완료/진행중',
      value: pendingDoses,
      unit: '회',
      icon: 'ri-time-line',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50/50',
      desc: 'Pending',
    },
    {
      label: '재고 부족 약품',
      value: lowStockCount,
      unit: '개',
      icon: 'ri-alarm-warning-line',
      color: 'text-red-600',
      bgColor: 'bg-red-50/50',
      isAlert: lowStockCount > 0,
      desc: 'Low Stock Alert',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 font-sans antialiased md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={clsx(
            'relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md',
            stat.isAlert && 'border-red-200 ring-1 ring-red-100',
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              {/* 상단 라벨 및 영문 명세 */}
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
              </div>

              {/* 메인 수치 표시 (고밀도 타이포그래피) */}
              <div className="mt-2 flex items-baseline gap-1">
                <span className={clsx('font-mono text-2xl font-black tracking-tighter', stat.color)}>
                  {stat.value.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-gray-300">{stat.unit}</span>
              </div>

              {/* 하단 보조 설명 영역 */}
              <p className={clsx('mt-1 text-[9px] font-bold uppercase italic tracking-tighter opacity-40', stat.color)}>
                {stat.desc}
              </p>
            </div>

            {/* 상태 아이콘 박스 */}
            <div
              className={clsx(
                'flex h-12 w-12 items-center justify-center rounded-xl border transition-transform group-hover:scale-110',
                stat.bgColor,
                stat.isAlert ? 'animate-pulse border-red-100' : 'border-gray-100',
              )}
            >
              <i className={clsx(stat.icon, stat.color, 'text-2xl')}></i>
            </div>
          </div>

          {/* 배경 데코레이션 (ERP 디테일) */}
          <div className="absolute -bottom-2 -right-2 opacity-[0.03]">
            <i className={clsx(stat.icon, 'text-6xl')}></i>
          </div>
        </div>
      ))}
    </div>
  );
}
