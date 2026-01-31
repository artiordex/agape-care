'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  readonly activeTab: 'daily' | 'monthly';
  readonly onTabChange: (tab: 'daily' | 'monthly') => void;
}

/**
 * [Component] 일일/월별 근태 모드 전환 탭
 * 직각형 UI 및 아가페 그린(#5C8D5A) 테마 적용
 */
export default function AttendanceTabs({ activeTab, onTabChange }: Props) {
  const tabs = [
    { id: 'daily', label: '일일 출퇴근 상세 기록', icon: 'ri-calendar-check-line' },
    { id: 'monthly', label: '월별 근태 정산 현황', icon: 'ri- medalist-line' },
  ] as const;

  return (
    <div className="flex border-b border-gray-300 bg-[#f8fafc] font-sans antialiased">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              // 직각형 디자인 적용 (rounded-none)
              'relative flex items-center gap-2 rounded-none px-8 py-3.5 text-[12px] font-black uppercase tracking-widest transition-all',
              isActive
                ? 'bg-white text-[#5C8D5A] shadow-[inset_0_3px_0_#5C8D5A]' // 상단 그린 보더 포인트
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600',
            )}
          >
            <i className={clsx(tab.icon, 'text-lg')}></i>
            {tab.label}

            {/* 활성 상태 하단 보더 밀착 효과 */}
            {isActive && <div className="absolute bottom-[-1px] left-0 h-[1px] w-full bg-white"></div>}
          </button>
        );
      })}

      {/* 탭 우측 여백 시스템 정보 */}
      <div className="flex flex-1 items-center justify-end px-6 text-[10px] font-bold uppercase italic text-gray-300">
        Agape Attendance Protocol Active
      </div>
    </div>
  );
}
