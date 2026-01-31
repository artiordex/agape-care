'use client';

import { useEffect, useState } from 'react';
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

export default function WeeklyMealPlan() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [nutritionManager, setNutritionManager] = useState('김영양 영양사');
  const [editingDates, setEditingDates] = useState<Set<string>>(new Set());

  const days = [0, 1, 2, 3, 4, 5, 6]; // 월~일 인덱스

  // 초기 데이터 로드 및 주간 날짜 설정
  useEffect(() => {
    const monday = getMonday(new Date());
    setCurrentWeekStart(monday);
    loadWeekMealPlans(monday);
  }, []);

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

  /** 주간 식단 데이터 로딩 (LocalStorage 기반) */
  const loadWeekMealPlans = (monday: Date) => {
    setIsLoading(true);
    const saved = localStorage.getItem('agape_weekly_meal_enhanced');
    const allPlans: MealPlan[] = saved ? JSON.parse(saved) : [];

    const dates = days.map(idx => getDateString(monday, idx));
    const weekPlans = dates.map(date => {
      const exists = allPlans.find(p => p.date === date);
      return (
        exists || {
          id: Math.random().toString(36).substr(2, 9),
          date,
          breakfast: { menu: '', calories: '' },
          lunch: { menu: '', calories: '' },
          dinner: { menu: '', calories: '' },
          morningSnack: '',
          afternoonSnack: '',
          allergyInfo: { possible: [], restricted: [] },
          nutrition_manager: nutritionManager,
        }
      );
    });

    setMealPlans(weekPlans);
    setIsLoading(false);
  };

  /** 단일 날짜 데이터 저장 */
  const handleSave = (index: number) => {
    const plan = mealPlans[index];
    const saved = localStorage.getItem('agape_weekly_meal_enhanced');
    const allPlans: MealPlan[] = saved ? JSON.parse(saved) : [];
    const info = { ...plan, nutrition_manager: nutritionManager };

    const existIndex = allPlans.findIndex(p => p.date === plan.date);
    if (existIndex > -1) allPlans[existIndex] = info;
    else allPlans.push(info);

    localStorage.setItem('agape_weekly_meal_enhanced', JSON.stringify(allPlans));

    const newEditingDates = new Set(editingDates);
    newEditingDates.delete(plan.date);
    setEditingDates(newEditingDates);

    alert(`✅ ${plan.date} 식단이 시스템에 저장되었습니다.`);
  };

  /** 단일 날짜 데이터 삭제 */
  const handleDelete = (index: number) => {
    if (!confirm('해당 날짜의 식단을 삭제하시겠습니까?')) return;
    const plan = mealPlans[index];
    const saved = localStorage.getItem('agape_weekly_meal_enhanced');

    if (saved) {
      const allPlans: MealPlan[] = JSON.parse(saved);
      const filtered = allPlans.filter(p => p.date !== plan.date);
      localStorage.setItem('agape_weekly_meal_enhanced', JSON.stringify(filtered));
    }

    loadWeekMealPlans(currentWeekStart);
    alert('삭제되었습니다.');
  };

  /** 주간 전체 초기화 */
  const handleDeleteAll = () => {
    if (!confirm('현재 주간의 모든 식단을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) return;
    const saved = localStorage.getItem('agape_weekly_meal_enhanced');
    if (!saved) return;

    const allPlans: MealPlan[] = JSON.parse(saved);
    const dates = days.map(idx => getDateString(currentWeekStart, idx));
    const filtered = allPlans.filter(p => !dates.includes(p.date));

    localStorage.setItem('agape_weekly_meal_enhanced', JSON.stringify(filtered));
    loadWeekMealPlans(currentWeekStart);
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

      {/* 2. 주간 고밀도 식단 테이블 */}
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
