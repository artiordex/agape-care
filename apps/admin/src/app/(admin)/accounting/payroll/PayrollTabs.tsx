'use client';

import React from 'react';

// 탭 타입 정의
export type PayrollTabType = 'calculation' | 'settings' | 'history';

interface Props {
  activeTab: PayrollTabType;
  onTabChange: (tab: PayrollTabType) => void;
}

/**
 * 급여 관리 시스템 메인 네비게이션 탭
 * 아이콘 중심의 고밀도 버튼 스타일 적용
 */
export default function PayrollTabs({ activeTab, onTabChange }: Props) {
  // 탭 구성 데이터
  const tabs: { id: PayrollTabType; label: string; icon: string }[] = [
    { id: 'calculation', label: '급여 계산 및 정산', icon: 'ri-calculator-fill' },
    { id: 'settings', label: '개별 급여 설정', icon: 'ri-user-settings-fill' },
    { id: 'history', label: '지급 이력 아카이브', icon: 'ri-history-fill' },
  ];

  return (
    <div className="flex items-center gap-0.5 border-b border-gray-300 bg-white px-1 pt-1 shadow-sm">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative -mb-[1px] flex items-center gap-2 rounded-t-sm border-x border-t px-6 py-2.5 text-[11px] font-black transition-all duration-200 ${
              isActive
                ? 'z-10 border-[#1a5a96] bg-[#1a5a96] text-white shadow-[0_-2px_10px_rgba(26,90,150,0.1)]'
                : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-white hover:text-[#1a5a96]'
            } `}
          >
            <i className={`${tab.icon} ${isActive ? 'text-white' : 'text-gray-400'} text-sm`}></i>
            <span className="whitespace-nowrap tracking-tight">{tab.label}</span>

            {/* 활성화 시 하단 인디케이터 */}
            {isActive && <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#1a5a96]"></div>}
          </button>
        );
      })}

      {/* 탭 우측 보조 정보 */}
      <div className="flex flex-1 items-center justify-end px-4 pb-1">
        <div className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-wider text-[#1a5a96]">Auto-Calculation Active</span>
        </div>
      </div>
    </div>
  );
}
