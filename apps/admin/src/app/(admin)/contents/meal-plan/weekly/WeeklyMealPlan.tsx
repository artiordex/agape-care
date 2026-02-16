'use client';

import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import WeeklyCalendar from './WeeklyCalendar';
import WeeklyExcelActions from './WeeklyExcelActions';
import WeeklyMealTable from './WeeklyMealTable';

// 인터페이스 정의
interface MealDetail {
  menu: string;
  calories: string;
}

interface MealPlan {
  id: string;
  date: string;
  breakfast: MealDetail;
  lunch: MealDetail;
  dinner: MealDetail;
  morningSnack: string;
  afternoonSnack: string;
  allergyInfo: {
    possible: string[];
    restricted: string[];
  };
  nutrition_manager: string;
}

/** 주간 월요일 계산 */
const getMonday = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

/** 날짜 문자열 변환 (YYYY-MM-DD) */
const getDateString = (baseDate: Date, offset: number) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

interface Props {
  readonly selectedDate?: string;
}

export default function WeeklyMealPlan({ selectedDate }: Props) {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()));

  useEffect(() => {
    if (selectedDate) {
      setCurrentWeekStart(getMonday(new Date(selectedDate)));
    }
  }, [selectedDate]);
  const [nutritionManager, setNutritionManager] = useState('김영양 영양사');
  const [editingDates, setEditingDates] = useState<Set<string>>(new Set());
  const [mealPlanId, setMealPlanId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');

  const days = [0, 1, 2, 3, 4, 5, 6]; // 월~일 인덱스

  // API: 현재 주 식단표 조회
  const { data: weeklyData, refetch } = api.meal.getCurrentWeekMealPlan.useQuery(['currentWeekMealPlan'], {
    query: {
      facilityCode: 'DEFAULT',
      date: getDateString(currentWeekStart, 0),
    },
  });

  useEffect(() => {
    if (weeklyData) {
      console.log('[DEBUG] WeeklyMealPlan - weeklyData:', weeklyData);
    }
  }, [weeklyData]);

  // API: 식단 항목 생성
  const createMealItem = api.meal.createMealPlanItem.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // API: 식단 항목 수정
  const updateMealItem = api.meal.updateMealPlanItem.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // API: 식단 항목 삭제
  const deleteMealItem = api.meal.deleteMealPlanItem.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // API 데이터를 로컬 상태로 변환
  useEffect(() => {
    if (weeklyData?.body) {
      const { mealPlan, dailyMeals } = weeklyData.body;

      if (mealPlan) {
        setMealPlanId(mealPlan.id);
        setNutritionManager(mealPlan.nutritionManager || '김영양 영양사');
      }

      const dates = days.map(idx => getDateString(currentWeekStart, idx));
      const weekPlans = dates.map(date => {
        const dailyMeal = dailyMeals?.find((dm: any) => dm.date === date);
        const meals = dailyMeal?.meals;

        // meals.breakfast IS the MealPlanItem (grouped day summary)
        const summary = meals?.breakfast;

        return {
          id: summary?.id || Math.random().toString(36).substr(2, 9),
          date,
          breakfast: {
            menu: summary?.breakfast || '',
            calories: '',
          },
          lunch: {
            menu: summary?.lunch || '',
            calories: '',
          },
          dinner: {
            menu: summary?.dinner || '',
            calories: '',
          },
          morningSnack: summary?.morningSnack || '',
          afternoonSnack: summary?.afternoonSnack || '',
          allergyInfo: {
            possible: [],
            restricted: [],
          },
          nutrition_manager: mealPlan?.nutritionManager || nutritionManager,
        };
      });

      setMealPlans(weekPlans);
    }
  }, [weeklyData, currentWeekStart, days, nutritionManager]);

  /** 단일 날짜 데이터 저장 */
  const handleSave = (index: number) => {
    const plan = mealPlans[index];

    if (!mealPlanId) {
      alert('식단표 ID가 없습니다. 먼저 식단표를 생성해주세요.');
      return;
    }

    const dailyMeal = weeklyData?.body?.dailyMeals?.find((dm: any) => dm.date === plan.date);
    const existingItemId = dailyMeal?.meals?.breakfast?.id;

    if (existingItemId) {
      // 수정
      updateMealItem.mutate({
        params: {
          mealPlanId,
          id: existingItemId,
        },
        body: {
          date: plan.date,
          breakfast: plan.breakfast.menu || null,
          lunch: plan.lunch.menu || null,
          dinner: plan.dinner.menu || null,
          morningSnack: plan.morningSnack || null,
          afternoonSnack: plan.afternoonSnack || null,
        },
      });
    } else {
      // 생성
      createMealItem.mutate({
        params: { mealPlanId },
        body: {
          date: plan.date,
          breakfast: plan.breakfast.menu,
          lunch: plan.lunch.menu,
          dinner: plan.dinner.menu,
          morningSnack: plan.morningSnack,
          afternoonSnack: plan.afternoonSnack,
        },
      });
    }

    const newEditingDates = new Set(editingDates);
    newEditingDates.delete(plan.date);
    setEditingDates(newEditingDates);

    alert(`✅ ${plan.date} 식단이 시스템에 저장되었습니다.`);
  };

  /** 단일 날짜 데이터 삭제 */
  const handleDelete = (index: number) => {
    if (!confirm('해당 날짜의 식단을 삭제하시겠습니까?')) return;

    const plan = mealPlans[index];
    if (!mealPlanId) return;

    const dailyMeal = weeklyData?.body?.dailyMeals?.find((dm: any) => dm.date === plan.date);
    const existingItemId = dailyMeal?.meals?.breakfast?.id;

    if (existingItemId) {
      deleteMealItem.mutate({
        params: {
          mealPlanId,
          id: existingItemId,
        },
      });
    }

    alert('삭제되었습니다.');
  };

  /** 주간 전체 초기화 */
  const handleDeleteAll = () => {
    if (!confirm('현재 주간의 모든 식단을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) return;

    if (!mealPlanId || !weeklyData?.body?.dailyMeals) return;

    weeklyData.body.dailyMeals.forEach((dm: any) => {
      const itemId = dm.meals?.breakfast?.id;
      if (itemId) {
        deleteMealItem.mutate({
          params: {
            mealPlanId,
            id: itemId,
          },
        });
      }
    });

    alert('현재 주간 데이터가 초기화되었습니다.');
  };

  /** 식단 입력 값 업데이트 */
  const updateMeal = (idx: number, type: 'breakfast' | 'lunch' | 'dinner', field: 'menu' | 'calories', val: string) => {
    const updated = [...mealPlans];
    updated[idx] = { ...updated[idx], [type]: { ...updated[idx][type], [field]: val } };
    setMealPlans(updated);
  };

  /** 간식 입력 값 업데이트 */
  const updateSnack = (idx: number, type: 'morningSnack' | 'afternoonSnack', val: string) => {
    const updated = [...mealPlans];
    updated[idx] = { ...updated[idx], [type]: val };
    setMealPlans(updated);
  };

  /** 식이 정보 업데이트 */
  const updateAllergy = (idx: number, type: 'possible' | 'restricted', val: string) => {
    const updated = [...mealPlans];
    const items = val
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    updated[idx] = { ...updated[idx], allergyInfo: { ...updated[idx].allergyInfo, [type]: items } };
    setMealPlans(updated);
  };

  const isLoading = !weeklyData;

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center border border-dashed border-gray-300 bg-white">
        <div className="text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-[#5C8D5A]"></i>
          <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
            Loading Weekly Protocol...
          </p>
        </div>
      </div>
    );

  return (
    <div className="space-y-0 p-4">
      {/* 1. 주간 액션 바 (영양사 및 엑셀 제어) */}
      <WeeklyExcelActions
        manager={nutritionManager}
        onManagerChange={setNutritionManager}
        onUploadClick={() => alert('엑셀 업로드 모달 오픈')}
        onDownloadTemplate={() => alert('템플릿 다운로드')}
        onDownloadCurrentWeek={() => alert('현재 주간 저장')}
        onDeleteAll={handleDeleteAll}
      />

      {/* 1.5 뷰 모드 토글 */}
      <div className="flex justify-end px-4 pb-2">
        <div className="flex items-center gap-1 rounded bg-gray-100 p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`rounded px-3 py-1 text-[10px] font-bold transition-all ${
              viewMode === 'calendar' ? 'bg-white text-[#5C8D5A] shadow' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className="ri-calendar-line mr-1"></i> Calendar
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`rounded px-3 py-1 text-[10px] font-bold transition-all ${
              viewMode === 'table' ? 'bg-white text-[#5C8D5A] shadow' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className="ri-table-line mr-1"></i> ERP Grid
          </button>
        </div>
      </div>

      {/* 2. 주간 고밀도 식단 테이블 / 캘린더 */}
      {viewMode === 'calendar' ? (
        <WeeklyCalendar
          mealPlans={mealPlans}
          editingDates={editingDates}
          onToggleEdit={(date: string) => {
            const newSet = new Set(editingDates);
            editingDates.has(date) ? newSet.delete(date) : newSet.add(date);
            setEditingDates(newSet);
          }}
          onUpdateMeal={updateMeal}
          onUpdateSnack={updateSnack}
          onUpdateAllergy={updateAllergy}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ) : (
        <WeeklyMealTable
          mealPlans={mealPlans}
          editingDates={editingDates}
          onToggleEdit={(date: string) => {
            const newSet = new Set(editingDates);
            editingDates.has(date) ? newSet.delete(date) : newSet.add(date);
            setEditingDates(newSet);
          }}
          onUpdateMeal={updateMeal}
          onUpdateSnack={updateSnack}
          onUpdateAllergy={updateAllergy}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      {/* 3. 섹션 푸터 정보 */}
      <div className="mt-4 border border-gray-200 bg-white p-3">
        <div className="flex items-center gap-2 text-[10px] font-bold italic text-gray-500">
          <i className="ri-information-line text-[#5C8D5A]"></i>
          <span>[공지] 본 주간 식단표는 영양 관리 프로토콜 v4.0에 의해 실시간으로 동기화됩니다.</span>
        </div>
      </div>
    </div>
  );
}
