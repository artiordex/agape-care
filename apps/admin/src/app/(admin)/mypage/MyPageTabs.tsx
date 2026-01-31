'use client';

import React from 'react';
import clsx from 'clsx';

type TabId = 'schedule' | 'musculoskeletal' | 'settings' | 'notifications';

interface Props {
  readonly activeTab: TabId;
  readonly onTabChange: (id: TabId) => void;
}

/**
 * [Component] 마이페이지 기능 전환 탭
 * **상단 라운드/하단 직각 형태 적용** 및 아가페 그린 테두리 밀착 레이아웃
 */
export default function MyPageTabs({ activeTab, onTabChange }: Props) {
  const tabs = [
    { id: 'schedule', label: '개인 근무 일정', icon: 'ri-calendar-line' },
    { id: 'musculoskeletal', label: '근골격계 관리', icon: 'ri-heart-pulse-line' },
    { id: 'settings', label: '개인 정보 설정', icon: 'ri-settings-3-line' },
    { id: 'notifications', label: '시스템 알림함', icon: 'ri-notification-3-line' },
  ] as const;

  return (
    <div className="font-sans antialiased">
      {/* 탭 바: 아가페 그린 베이스 라인 */}
      <div className="flex flex-wrap items-end gap-[2px] border-b-2 border-[#5C8D5A] bg-[#f8fafc] px-4 pt-2">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as TabId)}
              className={clsx(
                // 1. 형태: 상단은 둥글게(rounded-t-md), 하단은 직각으로(rounded-b-none) 변경
                'relative flex items-center justify-center rounded-b-none rounded-t-md transition-all',
                // 2. 크기 및 폰트
                'min-w-[120px] px-6 py-2.5 text-[11px] font-black uppercase tracking-tighter',
                // 3. 상태별 색상 및 테두리 규칙 적용
                isActive
                  ? 'z-10 translate-y-[2px] border-x-2 border-t-2 border-[#5C8D5A] bg-white text-[#5C8D5A]'
                  : 'border-x-2 border-t-2 border-transparent bg-[#5C8D5A] text-white hover:bg-[#4A7548]',
              )}
            >
              <i className={clsx(tab.icon, 'mr-2 text-sm opacity-80')}></i>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 하단 시스템 정보 바 */}
      <div className="flex items-center justify-end border-x border-b border-gray-200 bg-white px-4 py-1.5 shadow-sm">
        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
          <span className="flex items-center gap-1.5 text-[#5C8D5A]">
            <span className="h-1 w-1 animate-pulse bg-[#5C8D5A]"></span>
            Personal Node Secured
          </span>
          <span className="h-2 w-[1px] bg-gray-200"></span>
          <span>Agape Protocol v4.2.1</span>
        </div>
      </div>
    </div>
  );
}
