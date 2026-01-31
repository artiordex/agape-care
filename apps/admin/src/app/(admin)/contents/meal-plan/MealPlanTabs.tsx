'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  readonly activeTab: 'weekly' | 'monthly';
  readonly onTabChange: (tab: 'weekly' | 'monthly') => void;
}

/**
 * [Component] 슬림형 급식관리 통합 탭 내비게이션
 * 활성 탭에 아가페 그린(#5C8D5A) 테두리 강조 및 고밀도 레이아웃 적용
 */
export default function MealPlanTabs({ activeTab, onTabChange }: Props) {
  const tabs = [
    { id: 'weekly', label: '주간 식단표', icon: 'ri-calendar-line' },
    { id: 'monthly', label: '월간/통합 식단 관리', icon: 'ri-calendar-2-line' },
  ] as const;

  return (
    <div className="font-sans antialiased">
      {/* 1. 탭 바 컨테이너: 아가페 그린 하단 경계선 및 에메랄드 배경 적용 */}
      <div className="flex items-end gap-[2px] border-b-2 border-[#5C8D5A] bg-emerald-50/80 px-4 pt-2 backdrop-blur-sm">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                // 형태 및 트랜지션
                'relative flex items-center gap-2 rounded-t-md border-x-2 border-t-2 transition-all',
                // 크기 및 폰트 설정
                'px-6 py-2 text-[11px] font-black tracking-tighter',
                // 활성/비활성 상태별 색상
                isActive
                  ? 'z-10 translate-y-[2px] border-[#5C8D5A] bg-white text-[#5C8D5A]'
                  : 'border-transparent bg-[#5C8D5A] text-white hover:bg-[#4A7548]',
              )}
            >
              <i className={clsx(tab.icon, 'text-sm')}></i>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. 하단 시스템 인터페이스 상태 바 */}
      <div className="flex items-center justify-end border-b border-gray-200 bg-white px-4 py-1">
        <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1 text-[#5C8D5A]">
            <span className="h-1 w-1 rounded-full bg-[#5C8D5A]"></span>
            System Interface Optimized
          </span>
          <span className="h-2 w-[1px] bg-gray-200"></span>
          <span>AgapeCare Meal System v2.0</span>
        </div>
      </div>
    </div>
  );
}
