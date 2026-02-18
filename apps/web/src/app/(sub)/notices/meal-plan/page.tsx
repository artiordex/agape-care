/**
 * Description : page.tsx - ?? notices/meal-plan ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useMemo, useState } from 'react';

import { api } from '@/lib/api';
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
  breakfast_image?: string;
  morning_snack: string;
  lunch: string;
  lunch_image?: string;
  afternoon_snack: string;
  dinner: string;
  dinner_image?: string;
  memo?: string;
  nutrition_manager: string;
  images: MealImage[];
}

export default function MealPlanPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);

  // API 데이터 로드
  const {
    data: mealPlansData,
    isLoading,
    error,
  } = api.webpage.getMealPlans.useQuery(['meal-plans'], {
    query: {
      page: 1,
      limit: 100, // 충분한 데이터를 가져오기 위해 큰 값 설정
    },
  });

  // API 응답 데이터를 UI에 맞게 변환
  const MEAL_DATA: MealPlan[] = useMemo(() => {
    if (!mealPlansData || mealPlansData.status !== 200) return [];

    const allDailyMeals: MealPlan[] = [];

    // 각 meal plan의 dailyMeals를 평탄화 (Optional chaining check included)
    if (mealPlansData?.body?.data) {
      mealPlansData.body.data.forEach(mealPlan => {
        mealPlan.dailyMeals?.forEach((dailyMeal: any) => {
          allDailyMeals.push({
            id: dailyMeal.id,
            date: String(dailyMeal.date),
            breakfast: dailyMeal.breakfast || '',
            breakfast_image: dailyMeal.breakfastImage || undefined,
            morning_snack: dailyMeal.morningSnack || '',
            lunch: dailyMeal.lunch || '',
            lunch_image: dailyMeal.lunchImage || undefined,
            afternoon_snack: dailyMeal.afternoonSnack || '',
            dinner: dailyMeal.dinner || '',
            dinner_image: dailyMeal.dinnerImage || undefined,
            memo: mealPlan.notes || undefined,
            nutrition_manager: mealPlan.nutritionManager || '미지정',
            images: [], // TODO: 이미지 지원 시 추가
          });
        });
      });
    }

    return allDailyMeals;
  }, [mealPlansData]);

  // 현재 월에 해당하는 데이터만 필터링 (월간 보기용)
  const mealPlans = MEAL_DATA.filter(meal => {
    if (!meal.date) return false;

    // meal.date is expected to be 'YYYY-MM-DD'
    const parts = meal.date.split('-');
    if (parts.length < 2) return false;

    const year = parseInt(parts[0] ?? '', 10);
    const month = parseInt(parts[1] ?? '', 10);

    // currentDate's year and month (0-indexed)
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 1-indexed

    const match = year === currentYear && month === currentMonth;
    return match;
  });

  // 주간 데이터 필터링
  const getWeekDays = (): { date: string; meal: MealPlan | null }[] => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // 월요일 시작
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const meal = MEAL_DATA.find(m => m.date === dateStr) || null;
      days.push({ date: dateStr, meal });
    }
    return days;
  };

  // 네비게이션 핸들러
  const handlePrev = () => {
    if (viewMode === 'month') {
      // 월간: 이전 달로
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      setCurrentDate(newDate);
    } else {
      // 주간: 이전 주로
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      // 월간: 다음 달로
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      setCurrentDate(newDate);
    } else {
      // 주간: 다음 주로
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  /**
   * 사진 업로드 핸들러
   */
  const handleImageUpload = async (mealType: 'breakfast' | 'lunch' | 'dinner', file: File) => {
    if (!selectedMeal) return;

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append('image', file);
      formData.append('mealType', mealType);
      formData.append('dailyMealId', selectedMeal.id);

      // TODO: API 엔드포인트 연결 필요
      // const response = await fetch('/api/meal-plans/upload-image', {
      //   method: 'POST',
      //   body: formData,
      // });

      // 임시: 로컬 URL 생성 (실제로는 서버에서 받은 URL 사용)
      const imageUrl = URL.createObjectURL(file);

      // 상태 업데이트
      setSelectedMeal(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [`${mealType}_image`]: imageUrl,
        };
      });

      alert('사진이 업로드되었습니다. (임시 - API 연결 필요)');
    } catch (error) {
      console.error('❌ 사진 업로드 실패:', error);
      throw error;
    }
  };

  /**
   * 사진 삭제 핸들러
   */
  const handleImageDelete = async (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (!selectedMeal) return;

    try {
      // TODO: API 엔드포인트 연결 필요
      // await fetch('/api/meal-plans/delete-image', {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dailyMealId: selectedMeal.id, mealType }),
      // });

      // 상태 업데이트
      setSelectedMeal(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [`${mealType}_image`]: undefined,
        };
      });

      alert('사진이 삭제되었습니다. (임시 - API 연결 필요)');
    } catch (error) {
      console.error('❌ 사진 삭제 실패:', error);
      throw error;
    }
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
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      const meal = mealPlans.find(m => m.date === dateStr) ?? null;

      days.push({ date: dateStr, meal });
    }

    return days;
  };

  return (
    <main>
      <div className="border border-gray-200 bg-white p-10 shadow-sm">
        {/* 컨트롤 */}
        <MealPlanHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
          </div>
        )}

        {/* 데이터 로드 완료 */}
        {!isLoading &&
          (viewMode === 'month' ? (
            <MonthTab monthDays={getMonthDays()} onMealClick={setSelectedMeal} />
          ) : (
            <WeekTab weekDays={getWeekDays()} onMealClick={setSelectedMeal} />
          ))}
      </div>

      {/* 상세 모달 */}
      <MealDetailModal
        meal={selectedMeal}
        onClose={() => setSelectedMeal(null)}
        onUpdateImage={handleImageUpload}
        onDeleteImage={handleImageDelete}
        isEditable={true} // TODO: 권한에 따라 동적으로 설정
      />
    </main>
  );
}
