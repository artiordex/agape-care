'use client';

import { useState } from 'react';
import MealPlanHeader from './MealPlanHeader';
import MealPlanTabs from './MealPlanTabs';
import MonthlyMealPlan from './monthly/MonthlyMealPlan';
import WeeklyMealPlan from './weekly/WeeklyMealPlan';

/**
 * [Main Page] Agape-Care 급식관리 통합 관제 시스템
 * 주간/월간 섹션 스위칭 및 글로벌 상태(날짜, 탭) 관리
 */
export default function MealPage() {
  // 1. 글로벌 상태 관리
  const [tab, setTab] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // 2. 출력 핸들러
  const handlePrintWeekly = () => {
    alert('현재 주간 식단표를 ERP 리포트 형식으로 출력합니다.');
  };

  const handlePrintMonthly = () => {
    alert('선택된 월의 통합 식단 기록지를 출력합니다.');
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* 3. 상단 헤더 섹션: 시스템 타이틀 및 날짜 내비게이션 */}
      <MealPlanHeader
        selectedDate={selectedDate}
        selectedTab={tab}
        onTabChange={setTab}
        onDateChange={setSelectedDate}
        onPrintWeekly={handlePrintWeekly}
        onPrintMonthly={handlePrintMonthly}
      />

      {/* 4. 메인 탭 내비게이션: 주간/월간 전환 컨트롤 */}
      <MealPlanTabs activeTab={tab} onTabChange={setTab} />

      {/* 5. 메인 컨텐츠 영역: 고밀도 ERP 그리드 및 리스트 */}
      <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-6">
        <div className="mx-auto max-w-[1800px]">
          {tab === 'weekly' ? (
            /* [섹션] 주간 식단 모듈 */
            <section className="animate-in fade-in duration-500">
              <WeeklyMealPlan />
            </section>
          ) : (
            /* [섹션] 월간 식단 모듈 */
            <section className="animate-in fade-in duration-500">
              <MonthlyMealPlan />
            </section>
          )}
        </div>
      </main>

      {/* 시스템 알림 바 (선택 사항) */}
      <div className="bg-[#5C8D5A] px-4 py-1 text-right">
        <p className="text-[9px] font-black uppercase italic tracking-tighter text-white/80">
          Agape-Care High-Density ERP System Connected
        </p>
      </div>
    </div>
  );
}
