'use client';

import { useState } from 'react';
import WeeklyMealPlan from './WeeklyMealPlan';
import MonthlyMealPlan from './MonthlyMealPlan';

export default function MealPage() {
  const [tab, setTab] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 상단 탭 */}
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setTab('weekly')}
          className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition-all ${
            tab === 'weekly'
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          주간 식단표
        </button>

        <button
          onClick={() => setTab('monthly')}
          className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition-all ${
            tab === 'monthly'
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          월간/통합 식단 관리
        </button>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="rounded-3xl bg-white p-4 shadow">
        {tab === 'weekly' ? <WeeklyMealPlan /> : <MonthlyMealPlan />}
      </div>
    </div>
  );
}
