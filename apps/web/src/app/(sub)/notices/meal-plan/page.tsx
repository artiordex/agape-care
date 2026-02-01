/**
 * Description : page.tsx - 📌 알림마당 식단표 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useState } from 'react';

import mealData from '@/data/meal.json';
import MealDetailModal from './MealDetailModal';
import MealPlanHeader from './MealPlanHeader';
import MonthTab from './tabs/MonthTab';
import WeekTab from './tabs/WeekTab';

interface MealImage {
  id: string;
  url: string;
  uploadedAt: string;
}

interface MealPlan {
  id: string;
  date: string;
  breakfast: string;
  morning_snack: string;
  lunch: string;
  afternoon_snack: string;
  dinner: string;
  memo?: string;
  nutrition_manager: string;
  images: MealImage[];
}

// JSON 데이터 로드
const MEAL_DATA: MealPlan[] = mealData.mealPlans;

export default function MealPlanPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);

  // 현재 월에 해당하는 데이터만 필터링 (월간 보기용)
  const mealPlans = MEAL_DATA.filter(meal => {
    const mealDate = new Date(meal.date);
    return mealDate.getFullYear() === currentDate.getFullYear() && mealDate.getMonth() === currentDate.getMonth();
  });

  // 네비게이션 핸들러
  const handlePrev = () => {
    if (viewMode === 'week') {
      // 주간: 7일 전으로
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      // 월간: 이전 달로
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (viewMode === 'week') {
      // 주간: 7일 후로
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      // 월간: 다음 달로
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      setCurrentDate(newDate);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // 주간 보기 데이터
  const getWeekDays = (): { date: string; meal: MealPlan | null }[] => {
    const targetDate = new Date(currentDate);
    const currentDay = targetDate.getDay();

    const monday = new Date(targetDate);
    monday.setDate(targetDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    const days: { date: string; meal: MealPlan | null }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const iso = date.toISOString().split('T')[0];
      const dateStr: string = iso ?? '';

      const meal = MEAL_DATA.find(m => m.date === dateStr) ?? null;

      days.push({ date: dateStr, meal });
    }

    return days;
  };

  // 월간 보기 데이터
  const getMonthDays = (): { date: string | null; meal: MealPlan | null }[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();

    const days: { date: string | null; meal: MealPlan | null }[] = [];

    // 앞쪽 빈칸
    for (let i = 0; i < startDay; i++) {
      days.push({ date: null, meal: null });
    }

    // 실제 날짜들
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const iso = date.toISOString().split('T')[0];
      const dateStr: string | null = iso ?? null;

      const meal = dateStr ? (mealPlans.find(m => m.date === dateStr) ?? null) : null;

      days.push({ date: dateStr, meal });
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 컨트롤 */}
        <MealPlanHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          onViewModeChange={setViewMode}
        />

        {/* 주간 보기 */}
        {viewMode === 'week' && <WeekTab weekDays={getWeekDays()} onMealClick={setSelectedMeal} />}

        {/* 월간 보기 */}
        {viewMode === 'month' && <MonthTab monthDays={getMonthDays()} onMealClick={setSelectedMeal} />}
      </div>

      {/* 상세 모달 */}
      <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </div>
  );
}
