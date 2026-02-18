/**
 * Description : page.tsx - ?? contents/meal-plan ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useState } from 'react';
import MealPlanHeader from './MealPlanHeader';
import MonthlyMealPlan from './monthly/MonthlyMealPlan';

/**
 * [Main Page] Agape-Care 급식관리 통합 관제 시스템
 */
export default function MealPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0] ?? '');

  const handlePrintMonthly = () => {
    alert('선택된 월의 통합 식단 기록지를 출력합니다.');
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* 상단 헤더 섹션 */}
      <MealPlanHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onPrintMonthly={handlePrintMonthly}
      />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-6">
        <div className="mx-auto max-w-[1800px]">
          <section className="animate-in fade-in duration-500">
            <MonthlyMealPlan selectedDate={selectedDate} />
          </section>
        </div>
      </main>
    </div>
  );
}
