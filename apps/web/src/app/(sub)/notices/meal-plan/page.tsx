'use client';

import { api } from '@/lib/api';
import { useState } from 'react';

import ImageModal from './ImageModal';
import MealDetailModal from './MealDetailModal';
import MealPlanControls from './MealPlanControls';
import MonthView from './MonthView';
import WeekView from './WeekView';

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

export default function MealPlanPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString().split('T')[0]!;
  const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString().split('T')[0]!;

  // API 호출
  const { data, isLoading } = api.meal.getMealPlans.useQuery(['meal', 'plans', { start, end }], {
    query: {
      start,
      end,
    },
  });

  const mealPlansRaw = data?.status === 200 ? data.body.data : [];

  // 데이터 가공
  const mealPlans: MealPlan[] = mealPlansRaw.map(plan => ({
    id: plan.id,
    date: plan.date,
    breakfast: plan.breakfast || '',
    morning_snack: plan.morningSnack || '',
    lunch: plan.lunch || '',
    afternoon_snack: plan.afternoonSnack || '',
    dinner: plan.dinner || '',
    memo: plan.memo || undefined,
    nutrition_manager: plan.managerName || '영양사', // API 필드 확인 필요
    images:
      plan.images?.map(img => ({
        id: img.id,
        url: img.url,
        uploadedAt: img.createdAt.toString(),
      })) || [],
  }));

  // 주간 보기 데이터
  const getWeekDays = (): { date: string; meal: MealPlan | null }[] => {
    const today = new Date();
    const currentDay = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    const days: { date: string; meal: MealPlan | null }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const iso = date.toISOString().split('T')[0];
      const dateStr: string = iso ?? '';

      const meal = mealPlans.find(m => m.date === dateStr) ?? null;

      days.push({ date: dateStr, meal });
    }

    return days;
  };

  // 월간 보기 데이터
  const getMonthDays = (): { date: string | null; meal: MealPlan | null }[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

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
        <MealPlanControls
          currentMonth={currentMonth}
          viewMode={viewMode}
          onMonthChange={setCurrentMonth}
          onViewModeChange={setViewMode}
        />

        {/* 로딩 */}
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-900 border-t-transparent" />
            <p className="mt-4 text-gray-600">식단표를 불러오는 중입니다...</p>
          </div>
        ) : (
          <>
            {/* 주간 보기 */}
            {viewMode === 'week' && <WeekView weekDays={getWeekDays()} onMealClick={setSelectedMeal} />}

            {/* 월간 보기 */}
            {viewMode === 'month' && <MonthView monthDays={getMonthDays()} onMealClick={setSelectedMeal} />}
          </>
        )}
      </div>

      {/* 상세 모달 */}
      <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} onImageClick={setSelectedImage} />

      {/* 이미지 확대 모달 */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
