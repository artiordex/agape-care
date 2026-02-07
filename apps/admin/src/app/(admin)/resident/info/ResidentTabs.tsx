/**
 * Description : ResidentTabs.tsx - 📌 입소자 상세 섹션 통합 탭 내비게이션
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React from 'react';
import clsx from 'clsx';

/**
 * 입소자 상세 정보 탭 구성 정의
 */
const TABS = [
  { id: 'basic', label: '1. 기본정보' },
  { id: 'standard-contract', label: '2. 표준약관' },
  { id: 'assessment', label: '3. 기초평가' },
  { id: 'consultation', label: '4. 상담일지' },
  { id: 'extra-cost', label: '5. 비급여/기타' },
  { id: 'copayment', label: '6. 본인부담금' },
  { id: 'admission-history', label: '7. 입퇴소 이력' },
  { id: 'documents', label: '8. 서류 관리' },
] as const;

export type ResidentTabId = (typeof TABS)[number]['id'];

interface Props {
  readonly activeTab: ResidentTabId;
  readonly onTabChange: (id: ResidentTabId) => void;
}

/**
 * [Component] 입소자 상세 정보 통합 탭 내비게이션
 * 활성 탭 테두리에 아가페 그린(#5C8D5A) 적용 및 하단 바 밀착 레이아웃
 */
export default function ResidentTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="font-sans antialiased">
      {/* 탭 바 컨테이너: 아가페 그린 하단 경계선 및 배경색 적용 */}
      <div className="flex flex-wrap items-end gap-[2px] border-b-2 border-[#5C8D5A] bg-emerald-50/80 px-4 pt-3 backdrop-blur-sm">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                // 1. 형태: 상단 라운드 유지, 하단 직선 (탭 스타일)
                'relative flex items-center justify-center rounded-b-none rounded-t-md transition-all',
                // 2. 크기 및 폰트 설정: 고밀도 인터페이스 대응
                'min-w-[90px] px-4 py-2 text-[11px] tracking-tighter',
                // 3. 테두리 및 상태별 색상 (활성 탭은 배경색 흰색으로 하단 바와 연결)
                isActive
                  ? 'z-10 translate-y-[2px] border-x-2 border-t-2 border-[#5C8D5A] bg-white font-black text-[#5C8D5A]'
                  : 'border-x-2 border-t-2 border-transparent bg-[#5C8D5A] font-bold text-white hover:bg-[#4A7548]',
              )}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
