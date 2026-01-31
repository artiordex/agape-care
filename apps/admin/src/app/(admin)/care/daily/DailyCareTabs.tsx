'use client';

import React from 'react';
import clsx from 'clsx';

// 9개 간호 카테고리 정의
const CARE_TABS = [
  { id: 'vitals', label: '1. 간호일지' },
  { id: 'medication', label: '2. 투약관리' },
  { id: 'wound', label: '3. 욕창간호' },
  { id: 'tube', label: '4. 비위관관리' },
  { id: 'catheter', label: '5. 도뇨관관리' },
  { id: 'bowel', label: '6. 배설관리' },
  { id: 'nursing', label: '7. 진료기록' },
  { id: 'care', label: '8. 간호처치' },
  { id: 'technical', label: '9. 서류관리' },
] as const;

export type CareTabId = (typeof CARE_TABS)[number]['id'];

interface Props {
  readonly activeTab: CareTabId;
  readonly onTabChange: (id: CareTabId) => void;
}

/**
 * [Component] 슬림형 건강관리 통합 탭 내비게이션
 * 활성 탭 테두리에 아가페 그린(#5C8D5A) 적용 및 밀착 레이아웃
 */
export default function DailyCareTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="font-sans antialiased">
      {/* 탭 바 컨테이너: 아가페 그린 하단 경계선 적용 */}
      <div className="flex flex-wrap items-end gap-[2px] border-b-2 border-[#5C8D5A] bg-emerald-50/80 px-3 pt-2 backdrop-blur-sm">
        {CARE_TABS.map(tab => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                // 1. 형태: 상단 라운드 유지, 하단 직선
                'relative flex items-center justify-center rounded-b-none rounded-t-md transition-all',
                // 2. 크기 및 폰트 설정
                'min-w-[80px] px-3 py-1.5 text-[10px] tracking-tighter',
                // 3. 테두리 및 상태별 색상 (활성 탭 테두리 강조 추가)
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

      {/* 하단 관제 상태 바 (데이터 무결성 강조) */}
      <div className="flex items-center justify-end border-x border-b border-gray-200 bg-white px-4 py-1">
        <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1 text-[#5C8D5A]">
            <span className="h-1 w-1 rounded-full bg-[#5C8D5A]"></span>
            System Interface Optimized
          </span>
          <span className="h-2 w-[1px] bg-gray-200"></span>
          <span>AgapeCare Nursing v4.2.1</span>
        </div>
      </div>
    </div>
  );
}
