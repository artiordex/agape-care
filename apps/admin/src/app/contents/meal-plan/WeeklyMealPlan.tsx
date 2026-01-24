'use client';

import { useEffect, useState } from 'react';

// 인터페이스 정의
interface MealPlan {
  id: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  nutrition_manager: string;
}

export default function WeeklyMealPlan() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [nutritionManager, setNutritionManager] = useState('김영양 영양사');
  const [editingDates, setEditingDates] = useState<Set<string>>(new Set());

  const days = [
    { key: 0, label: '월요일' },
    { key: 1, label: '화요일' },
    { key: 2, label: '수요일' },
    { key: 3, label: '목요일' },
    { key: 4, label: '금요일' },
    { key: 5, label: '토요일' },
    { key: 6, label: '일요일' },
  ];

  // 초기 로드
  useEffect(() => {
    const monday = getMonday(new Date());
    setCurrentWeekStart(monday);
    loadWeekMealPlans(monday);
  }, []);

  // 월요일 계산
  const getMonday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const getDateString = (baseDate: Date, offset: number) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0];
  };

  // 주간 데이터 로드 (localStorage)
  const loadWeekMealPlans = (monday: Date) => {
    setIsLoading(true);

    const saved = localStorage.getItem('agape_weekly_meal');
    const allPlans: MealPlan[] = saved ? JSON.parse(saved) : [];

    const dates = days.map((_, idx) => getDateString(monday, idx));

    const weekPlans = dates.map(date => {
      const exists = allPlans.find(p => p.date === date);
      return (
        exists || {
          id: Math.random().toString(36).substr(2, 9),
          date,
          breakfast: '',
          lunch: '',
          dinner: '',
          nutrition_manager: nutritionManager,
        }
      );
    });

    setMealPlans(weekPlans);
    setIsLoading(false);
  };

  // 저장
  const handleSave = (index: number) => {
    const plan = mealPlans[index];

    const saved = localStorage.getItem('agape_weekly_meal');
    const allPlans: MealPlan[] = saved ? JSON.parse(saved) : [];

    const info = { ...plan, nutrition_manager: nutritionManager };

    const existIndex = allPlans.findIndex(p => p.date === plan.date);

    if (existIndex > -1) allPlans[existIndex] = info;
    else allPlans.push(info);

    localStorage.setItem('agape_weekly_meal', JSON.stringify(allPlans));

    const newEditingDates = new Set(editingDates);
    newEditingDates.delete(plan.date);
    setEditingDates(newEditingDates);

    alert(`${plan.date} 식단이 저장되었습니다.`);
  };

  // 삭제
  const handleDelete = (index: number) => {
    if (!confirm('식단을 삭제하시겠습니까?')) return;

    const plan = mealPlans[index];
    const saved = localStorage.getItem('agape_weekly_meal');

    if (saved) {
      const allPlans: MealPlan[] = JSON.parse(saved);
      const filtered = allPlans.filter(p => p.date !== plan.date);
      localStorage.setItem('agape_weekly_meal', JSON.stringify(filtered));
    }

    const updated = [...mealPlans];
    updated[index] = { ...updated[index], breakfast: '', lunch: '', dinner: '' };

    setMealPlans(updated);
    alert('삭제되었습니다.');
  };

  const updateMeal = (index: number, mealType: 'breakfast' | 'lunch' | 'dinner', value: string) => {
    const updated = [...mealPlans];
    updated[index] = { ...updated[index], [mealType]: value };
    setMealPlans(updated);
  };

  const toggleEdit = (date: string) => {
    const set = new Set(editingDates);
    if (set.has(date)) set.delete(date);
    else set.add(date);
    setEditingDates(set);
  };

  const changeWeek = (offset: number) => {
    const newMonday = new Date(currentWeekStart);
    newMonday.setDate(newMonday.getDate() + offset);
    setCurrentWeekStart(newMonday);
    loadWeekMealPlans(newMonday);
  };

  const formatDateRange = () => {
    const start = currentWeekStart.toLocaleDateString('ko-KR');
    const end = new Date(currentWeekStart);
    end.setDate(end.getDate() + 6);
    return `${start} ~ ${end.toLocaleDateString('ko-KR')}`;
  };

  if (isLoading) return <div className="p-10 text-center">데이터 불러오는 중...</div>;

  return (
    <div className="animate-in fade-in space-y-8 duration-300">
      {/* 상단 네비 */}
      <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow">
        <div>
          <h2 className="text-xl font-bold">주간 식단표 관리</h2>
          <p className="text-sm text-gray-500">{formatDateRange()}</p>
        </div>

        <div className="flex gap-2 rounded-xl bg-gray-100 p-1">
          <NavBtn label="이전 주" icon="ri-arrow-left-s-line" onClick={() => changeWeek(-7)} />
          <NavBtn
            label="이번 주"
            onClick={() => {
              const m = getMonday(new Date());
              setCurrentWeekStart(m);
              loadWeekMealPlans(m);
            }}
          />
          <NavBtn label="다음 주" icon="ri-arrow-right-s-line" isRight onClick={() => changeWeek(7)} />
        </div>
      </div>

      {/* 영양사 */}
      <div className="rounded-2xl bg-emerald-700 p-6 text-white">
        <h3 className="text-lg font-bold">담당 영양사</h3>
        <input
          type="text"
          value={nutritionManager}
          onChange={e => setNutritionManager(e.target.value)}
          className="mt-3 w-full rounded-xl p-3 text-black"
        />
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="w-40 p-4 text-left">날짜</th>
              <th className="p-4 text-left">아침</th>
              <th className="p-4 text-left">점심</th>
              <th className="p-4 text-left">저녁</th>
              <th className="w-40 p-4 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, idx) => {
              const meal = mealPlans[idx];
              const isEditing = editingDates.has(meal.date);

              return (
                <tr key={day.key} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold">{day.label}</div>
                    <div className="text-xs text-gray-500">{meal.date}</div>
                  </td>

                  <MealCell
                    isEditing={isEditing}
                    value={meal.breakfast}
                    placeholder="아침 메뉴"
                    onChange={v => updateMeal(idx, 'breakfast', v)}
                  />

                  <MealCell
                    isEditing={isEditing}
                    value={meal.lunch}
                    placeholder="점심 메뉴"
                    onChange={v => updateMeal(idx, 'lunch', v)}
                  />

                  <MealCell
                    isEditing={isEditing}
                    value={meal.dinner}
                    placeholder="저녁 메뉴"
                    onChange={v => updateMeal(idx, 'dinner', v)}
                  />

                  <td className="p-4 text-center">
                    {isEditing ? (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleSave(idx)} className="rounded bg-emerald-600 px-3 py-1 text-white">
                          저장
                        </button>
                        <button onClick={() => toggleEdit(meal.date)} className="rounded bg-gray-200 px-3 py-1">
                          취소
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => toggleEdit(meal.date)} className="rounded border px-3 py-1">
                          수정
                        </button>
                        {(meal.breakfast || meal.lunch || meal.dinner) && (
                          <button onClick={() => handleDelete(idx)} className="px-2 text-red-500">
                            삭제
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* 보조 컴포넌트 */
/* ----------------------------- */

function NavBtn({ label, icon, onClick, isRight }: any) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-xl bg-white px-4 py-2 text-sm font-bold hover:bg-gray-200"
    >
      {!isRight && icon && <i className={icon}></i>}
      {label}
      {isRight && icon && <i className={icon}></i>}
    </button>
  );
}

function MealCell({ isEditing, value, onChange, placeholder }: any) {
  return (
    <td className="p-4 align-top">
      {isEditing ? (
        <textarea
          rows={3}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded border p-2"
          placeholder={placeholder}
        />
      ) : (
        <div className="min-h-[1.2rem] whitespace-pre-wrap text-sm">
          {value || <span className="text-gray-300">미등록</span>}
        </div>
      )}
    </td>
  );
}
