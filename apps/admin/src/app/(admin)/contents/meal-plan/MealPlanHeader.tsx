'use client';

import React from 'react';

interface Props {
  readonly selectedDate: string;
  readonly selectedTab: 'weekly' | 'monthly';
  readonly onTabChange: (tab: 'weekly' | 'monthly') => void;
  readonly onDateChange?: (date: string) => void;
  readonly onPrintWeekly?: () => void;
  readonly onPrintMonthly?: () => void;
}

/**
 * [Component] 급식관리 및 식단표 통합 관제 헤더
 * 아가페 그린(#5C8D5A) 테마 및 날짜 내비게이션 인터페이스 적용
 */
export default function MealPlanHeader({
  selectedDate,
  selectedTab,
  onTabChange,
  onDateChange,
  onPrintWeekly,
  onPrintMonthly,
}: Props) {
  /** 날짜 가감 로직 (일 단위) */
  const handleDateChange = (offset: number) => {
    if (onDateChange) {
      const currentDate = new Date(selectedDate);
      currentDate.setDate(currentDate.getDate() + offset);
      onDateChange(currentDate.toISOString().split('T')[0]);
    }
  };

  /** 요일 포함 날짜 문자열 생성 */
  const getDisplayDate = () => {
    const date = new Date(selectedDate);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = days[date.getDay()];
    return `${selectedDate} (${dayOfWeek})`;
  };

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 현재 관제 섹션 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-restaurant-2-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">급식관리 및 식단표 관제</h1>
            <span className="rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Real-time Meal Monitoring
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">Daily Meal Planning & Nutrition Management</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Agape-Care Meal Protocol</p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 날짜 내비게이션 컨트롤 */}
      <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-[#f8fafc] p-1 shadow-inner">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A] active:scale-95"
          onClick={() => handleDateChange(-1)}
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        <div className="flex items-center gap-2 px-4">
          <i className="ri-calendar-check-line text-[#5C8D5A]"></i>
          <span className="font-mono text-[14px] font-black tracking-tight text-gray-800">{getDisplayDate()}</span>
        </div>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A] active:scale-95"
          onClick={() => handleDateChange(1)}
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* 3. 오른쪽: 출력 및 시스템 액션 */}
      <div className="flex items-center gap-2">
        {selectedTab === 'weekly' && onPrintWeekly && (
          <button
            onClick={onPrintWeekly}
            className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
          >
            <i className="ri-printer-line text-sm"></i>
            주간 식단표 출력
          </button>
        )}

        {selectedTab === 'monthly' && onPrintMonthly && (
          <button
            onClick={onPrintMonthly}
            className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
          >
            <i className="ri-printer-line text-sm"></i>
            월간 식단표 출력
          </button>
        )}

        <button
          onClick={() => onTabChange(selectedTab === 'weekly' ? 'monthly' : 'weekly')}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-exchange-line text-sm"></i>
          {selectedTab === 'weekly' ? '월간 식단표로 전환' : '주간 식단표로 전환'}
        </button>
      </div>
    </div>
  );
}
