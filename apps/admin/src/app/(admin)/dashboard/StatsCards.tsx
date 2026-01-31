'use client';

import React from 'react';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  change: string;
  trend?: 'up' | 'down' | 'neutral'; // 변동 방향 추가 가능
}

interface Props {
  readonly stats: StatCard[];
}

/**
 * [Section] 대시보드 핵심 운영 지표 카드 그룹
 * 수치 중심의 고밀도 그리드 레이아웃 적용
 */
export default function StatsCards({ stats }: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <div
          key={stat.title}
          className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow-sm transition-all hover:border-[#1a5a96] hover:shadow-md"
        >
          {/* 카드 상단: 타이틀 및 아이콘 */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.title}</p>
              <div className="mt-1 flex items-baseline gap-1">
                <p className="font-mono text-3xl font-black tracking-tighter text-gray-900">{stat.value}</p>
                {/* 지표별 단위 (필요 시 데이터에서 파싱) */}
                <span className="text-[11px] font-bold uppercase text-gray-400">Unit</span>
              </div>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-[#1a5a96] transition-colors group-hover:bg-[#1a5a96] group-hover:text-white`}
            >
              <i className={`${stat.icon} text-xl`} />
            </div>
          </div>

          {/* 카드 하단: 변동 지표 및 가이드 */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1.5">
              {/* 변동률 인디케이터 (임시 로직: '+' 포함 시 상승으로 간주) */}
              <span
                className={`flex items-center text-[10px] font-black uppercase ${stat.change.includes('+') ? 'text-emerald-500' : 'text-red-500'}`}
              >
                <i
                  className={`${stat.change.includes('+') ? 'ri-arrow-right-up-line' : 'ri-arrow-right-down-line'} mr-0.5`}
                ></i>
                {stat.change}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">vs Last Month</span>
            </div>

            {/* 상태 점등 (디자인 포인트) */}
            <div className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400"></span>
              <span className="h-1 w-1 rounded-full bg-gray-200"></span>
              <span className="h-1 w-1 rounded-full bg-gray-200"></span>
            </div>
          </div>

          {/* 호버 시 나타나는 미세한 브랜드 라인 */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#1a5a96] transition-all group-hover:w-full"></div>
        </div>
      ))}
    </section>
  );
}
