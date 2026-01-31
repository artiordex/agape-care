'use client';

import React from 'react';

interface QuickAction {
  label: string;
  icon: string;
  path?: string;
  action?: string;
}

interface Props {
  readonly actions: QuickAction[];
  readonly onAction: (action: QuickAction) => void;
}

/**
 * [Section] 시스템 주요 메뉴 퀵 링크 그리드
 * 고밀도 아이콘 태그 및 역동적인 호버 인터랙션 UI
 */
export default function QuickLinkGrid({ actions, onAction }: Props) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 섹션 헤더: Agape-Care 표준 서식 */}
      <header className="mb-4 flex items-center gap-2">
        <div className="h-3 w-1 bg-[#1a5a96]"></div>
        <h3 className="text-[12px] font-black uppercase tracking-tighter text-gray-800">
          Operational Shortcut Control Center
        </h3>
      </header>

      {/* 퀵 링크 그리드 영역 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {actions.map(action => (
          <button
            key={action.label}
            onClick={() => onAction(action)}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow-sm transition-all hover:border-[#1a5a96] hover:shadow-md active:scale-95"
          >
            {/* 아이콘 배경 데코레이션 (호버 시 확장) */}
            <div className="absolute inset-0 z-0 translate-y-full bg-[#1a5a96] opacity-[0.03] transition-transform duration-300 group-hover:translate-y-0"></div>

            {/* 메인 아이콘 박스 */}
            <div className="relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition-all group-hover:rotate-3 group-hover:bg-[#1a5a96] group-hover:text-white">
              <i className={`${action.icon} text-2xl`} />
            </div>

            {/* 레이블 및 안내 */}
            <div className="relative z-10 text-center">
              <p className="text-[11px] font-black uppercase tracking-tighter text-gray-700 group-hover:text-[#1a5a96]">
                {action.label}
              </p>
              <span className="mt-1 block text-[8px] font-bold uppercase tracking-widest text-gray-300 opacity-0 transition-opacity group-hover:opacity-100">
                Launch Module
              </span>
            </div>

            {/* 우측 하단 숏컷 아이콘 */}
            <i className="ri-arrow-right-up-line absolute right-2 top-2 text-[10px] text-gray-200 group-hover:text-[#1a5a96]"></i>
          </button>
        ))}
      </div>
    </section>
  );
}
