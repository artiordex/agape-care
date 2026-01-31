'use client';

import React from 'react';
import clsx from 'clsx';

// 탭 타입 정의
export type AccountingTabType =
  | 'dashboard' // 종합 현황
  | 'journal' // 전표 관리
  | 'account' // 계정과목
  | 'closing' // 결산/마감
  | 'transactions' // 상세 내역
  | 'statistics'; // 통계 분석

interface Props {
  activeTab: AccountingTabType;
  onTabChange: (tab: AccountingTabType) => void;
}

/**
 * 회계 시스템 메인 네비게이션 탭 컴포넌트
 * 아가페 그린(#5C8D5A) 테마 및 컴팩트 둥근 사각 디자인
 */
export default function AccountingTabs({ activeTab, onTabChange }: Props) {
  const tabs: { id: AccountingTabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: '종합 현황', icon: 'ri-dashboard-3-line' },
    { id: 'journal', label: '전표 관리', icon: 'ri-file-list-3-line' },
    { id: 'account', label: '계정과목', icon: 'ri-list-settings-line' },
    { id: 'closing', label: '결산/마감', icon: 'ri-lock-password-line' },
    { id: 'transactions', label: '상세 내역', icon: 'ri-exchange-funds-line' },
    { id: 'statistics', label: '통계 분석', icon: 'ri-pie-chart-2-line' },
  ];

  return (
    <div className="flex items-end gap-1.5 border-b-2 border-[#5C8D5A] bg-[#f1f5f9] px-4 pt-3 shadow-sm">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              // 크기: 컴팩트 패딩, 폰트: 11px
              'relative flex items-center justify-center gap-1.5 rounded-t-md px-4 py-2 text-[11px] font-bold transition-all',
              // 컬러 반전 로직
              isActive
                ? 'z-10 -mb-[2px] border-x-2 border-t-2 border-[#5C8D5A] bg-white text-[#5C8D5A]'
                : 'bg-[#5C8D5A] text-white hover:bg-[#4A7548]',
            )}
          >
            <i className={clsx(tab.icon, 'text-sm')}></i>
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}

      {/* 우측 시스템 상태 표시 */}
      <div className="flex flex-1 items-center justify-end px-4 pb-2">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
          ACCOUNTING SYSTEM ONLINE
        </span>
      </div>
    </div>
  );
}
