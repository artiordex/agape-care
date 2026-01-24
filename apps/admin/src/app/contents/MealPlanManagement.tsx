import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

interface MealPlan {
  id: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  nutrition_manager: string;
  created_at: string;
  updated_at: string;
}

export default function MealPlanManagement() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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

  useEffect(() => {
    const monday = getMonday(new Date());
    setCurrentWeekStart(monday);
    loadWeekMealPlans(monday);
  }, []);

  const getMonday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getDateString = (baseDate: Date, offset: number) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0];
  };

  const loadWeekMealPlans = async (monday: Date) => {
    setIsLoading(true);
    try {
      const dates = days.map((_, index) => getDateString(monday, index));
      
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .in('date', dates)
        .order('date', { ascending: true });

      if (error) throw error;

      const plansMap = new Map(data?.map(plan => [plan.date, plan]) || []);
      
      const weekPlans = dates.map(date => {
        const existing = plansMap.get(date);
        return existing || {
          id: '',
          date,
          breakfast: '',
          lunch: '',
          dinner: '',
          nutrition_manager: nutritionManager,
          created_at: '',
          updated_at: ''
        };
      });

      setMealPlans(weekPlans);
    } catch (error) {
      console.error('식단표 로드 실패:', error);
      alert('식단표를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (index: number) => {
    const plan = mealPlans[index];
    setIsSaving(true);

    try {
      const dataToSave = {
        date: plan.date,
        breakfast: plan.breakfast.trim(),
        lunch: plan.lunch.trim(),
        dinner: plan.dinner.trim(),
        nutrition_manager: nutritionManager,
        updated_at: new Date().toISOString()
      };

      if (plan.id) {
        const { error } = await supabase
          .from('meal_plans')
          .update(dataToSave)
          .eq('id', plan.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('meal_plans')
          .insert([dataToSave])
          .select()
          .single();

        if (error) throw error;

        const updatedPlans = [...mealPlans];
        updatedPlans[index] = { ...updatedPlans[index], id: data.id };
        setMealPlans(updatedPlans);
      }

      const newEditingDates = new Set(editingDates);
      newEditingDates.delete(plan.date);
      setEditingDates(newEditingDates);

      alert('식단표가 저장되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    const plan = mealPlans[index];
    
    if (!plan.id) {
      const updatedPlans = [...mealPlans];
      updatedPlans[index] = {
        ...updatedPlans[index],
        breakfast: '',
        lunch: '',
        dinner: ''
      };
      setMealPlans(updatedPlans);
      return;
    }

    if (!confirm('이 날짜의 식단을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', plan.id);

      if (error) throw error;

      const updatedPlans = [...mealPlans];
      updatedPlans[index] = {
        ...updatedPlans[index],
        id: '',
        breakfast: '',
        lunch: '',
        dinner: ''
      };
      setMealPlans(updatedPlans);

      alert('식단이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const updateMeal = (index: number, mealTime: 'breakfast' | 'lunch' | 'dinner', value: string) => {
    const updatedPlans = [...mealPlans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      [mealTime]: value
    };
    setMealPlans(updatedPlans);
  };

  const toggleEdit = (date: string) => {
    const newEditingDates = new Set(editingDates);
    if (newEditingDates.has(date)) {
      newEditingDates.delete(date);
    } else {
      newEditingDates.add(date);
    }
    setEditingDates(newEditingDates);
  };

  const goToPreviousWeek = () => {
    const newMonday = new Date(currentWeekStart);
    newMonday.setDate(newMonday.getDate() - 7);
    setCurrentWeekStart(newMonday);
    loadWeekMealPlans(newMonday);
  };

  const goToNextWeek = () => {
    const newMonday = new Date(currentWeekStart);
    newMonday.setDate(newMonday.getDate() + 7);
    setCurrentWeekStart(newMonday);
    loadWeekMealPlans(newMonday);
  };

  const goToThisWeek = () => {
    const monday = getMonday(new Date());
    setCurrentWeekStart(monday);
    loadWeekMealPlans(monday);
  };

  const formatDateRange = () => {
    const start = currentWeekStart.toLocaleDateString('ko-KR');
    const end = new Date(currentWeekStart);
    end.setDate(end.getDate() + 6);
    return `${start} ~ ${end.toLocaleDateString('ko-KR')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-teal-600 animate-spin"></i>
          <p className="mt-4 text-gray-600">식단표를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">식단표 관리</h1>
          <p className="text-sm text-gray-600 mt-1">{formatDateRange()}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={goToPreviousWeek}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            이전 주
          </button>
          <button
            onClick={goToThisWeek}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            이번 주
          </button>
          <button
            onClick={goToNextWeek}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            다음 주
            <i className="ri-arrow-right-line ml-2"></i>
          </button>
        </div>
      </div>

      {/* Nutrition Manager */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          담당 영양사
        </label>
        <input
          type="text"
          value={nutritionManager}
          onChange={(e) => setNutritionManager(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="영양사 이름"
        />
      </div>

      {/* Weekly Meal Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  요일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  아침
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  점심
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  저녁
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {days.map((day, index) => {
                const meal = mealPlans[index];
                const isEditing = editingDates.has(meal?.date);
                const hasData = meal?.breakfast || meal?.lunch || meal?.dinner;

                return (
                  <tr 
                    key={day.key}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="font-semibold text-gray-900 block">{day.label}</span>
                        <span className="text-xs text-gray-500">{meal?.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <textarea
                          value={meal?.breakfast || ''}
                          onChange={(e) => updateMeal(index, 'breakfast', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                          placeholder="아침 식단 입력..."
                        />
                      ) : (
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                          {meal?.breakfast || '-'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <textarea
                          value={meal?.lunch || ''}
                          onChange={(e) => updateMeal(index, 'lunch', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                          placeholder="점심 식단 입력..."
                        />
                      ) : (
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                          {meal?.lunch || '-'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <textarea
                          value={meal?.dinner || ''}
                          onChange={(e) => updateMeal(index, 'dinner', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                          placeholder="저녁 식단 입력..."
                        />
                      ) : (
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                          {meal?.dinner || '-'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(index)}
                              disabled={isSaving}
                              className="px-3 py-1.5 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                            >
                              <i className="ri-save-line mr-1"></i>
                              저장
                            </button>
                            <button
                              onClick={() => toggleEdit(meal?.date)}
                              disabled={isSaving}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                            >
                              취소
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => toggleEdit(meal?.date)}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                            >
                              <i className="ri-edit-line mr-1"></i>
                              수정
                            </button>
                            {hasData && (
                              <button
                                onClick={() => handleDelete(index)}
                                className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                              >
                                <i className="ri-delete-bin-line mr-1"></i>
                                삭제
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helper Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <i className="ri-information-line text-blue-600 text-xl mt-0.5 w-5 h-5 flex items-center justify-center"></i>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">식단표 작성 팁</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 각 식사마다 줄바꿈으로 메뉴를 구분해주세요</li>
              <li>• 예: "쌀밥\n미역국\n불고기\n나물무침"</li>
              <li>• 저장 후 사용자 페이지에 자동으로 표시됩니다</li>
              <li>• 수정 버튼을 눌러 각 날짜별로 편집할 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
