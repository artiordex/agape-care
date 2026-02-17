'use client';

import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import MealPlanStatBanner from '../MealPlanStatBanner';
import ExcelUploadModal from './ExcelUploadModal';
import MonthlyCalendar from './MonthlyCalendar';
import MonthlyEditModal from './MonthlyEditModal';
import MonthlyMealList from './MonthlyMealList';

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
  memo?: string;
  nutrition_manager: string;
  created_at: string;
  updated_at: string;
}

type SaveMode = 'overwrite' | 'merge' | 'selective';

interface Props {
  readonly selectedDate?: string;
}

export default function MonthlyMealPlan({ selectedDate }: Props) {
  // 로컬 타임존 기준으로 현재 월의 1일로 초기화
  // Intl.DateTimeFormat으로 로컬 연/월을 추출하여 UTC 오프셋 문제 방지
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    return new Date(year, month, 1, 0, 0, 0, 0);
  });

  useEffect(() => {
    if (selectedDate) {
      // 'YYYY-MM-DD' 문자열은 UTC로 파싱되므로 로컬 타임존 기준으로 파싱
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1]!, 10) - 1; // 0-indexed
        setCurrentMonth(new Date(year, month, 1));
      } else {
        setCurrentMonth(new Date(selectedDate));
      }
    }
  }, [selectedDate]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [mealPlanId, setMealPlanId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // 모달 및 편집 상태
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [focusedDate, setFocusedDate] = useState('');
  const [editingMeal, setEditingMeal] = useState<MealPlan | null>(null);

  // 폼 및 엑셀 데이터
  const [formData, setFormData] = useState({
    breakfast: { menu: '', calories: '' },
    lunch: { menu: '', calories: '' },
    dinner: { menu: '', calories: '' },
    morningSnack: '',
    afternoonSnack: '',
    allergyPossible: '',
    allergyRestricted: '',
    memo: '',
    manager: '김영양 영양사',
  });

  const [excelData, setExcelData] = useState<any[]>([]);
  const [saveMode, setSaveMode] = useState<SaveMode>('overwrite');
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  const { isInitialized, accessToken } = useAuthStore(state => ({
    isInitialized: state.isInitialized,
    accessToken: state.accessToken,
  }));

  // API: 식단표 목록 조회
  const mealMonth = currentMonth.getFullYear() * 100 + (currentMonth.getMonth() + 1);
  const {
    data: mealPlansData,
    refetch,
    error,
    isError,
  } = api.meal.getMealPlans.useQuery(
    ['mealPlans', mealMonth],
    {
      query: {
        page: 1,
        limit: 100,
        // facilityCode: 'DEFAULT', // 잠시 주석 처리 (에러 원인 파악)
      },
    },
    {
      staleTime: 0, // 항상 최신 데이터 사용 (캐시 우회)
      enabled: isInitialized && !!accessToken,
    },
  );

  useEffect(() => {
    console.log('═══════════════════════════════════════════');
    console.log('[MONTHLY MEAL-PLAN] Data state changed');
    const localDateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(currentMonth.getDate()).padStart(2, '0')}`;
    console.log('[MONTHLY MEAL-PLAN] Current month (local):', localDateStr);
    console.log('[MONTHLY MEAL-PLAN] Meal month (YYYYMM):', mealMonth);
    console.log('[MONTHLY MEAL-PLAN] RAW mealPlansData (전체 구조):', mealPlansData);
    console.log('[MONTHLY MEAL-PLAN] mealPlansData structure:', {
      exists: !!mealPlansData,
      status: mealPlansData?.status,
      bodyKeys: mealPlansData?.body ? Object.keys(mealPlansData.body) : [],
      dataKeys: mealPlansData?.body?.data ? Object.keys(mealPlansData.body.data) : [],
      itemsCount: mealPlansData?.body?.data?.length || 0,
      paginationTotal: mealPlansData?.body?.pagination?.total || 0,
    });

    if (error) {
      console.error('[MONTHLY MEAL-PLAN] ❌ API Error:', error);
    }

    if (mealPlansData?.body?.data && mealPlansData.body.data.length > 0) {
      console.log('[MONTHLY MEAL-PLAN] First meal plan sample:', mealPlansData.body.data[0]);
    } else if (mealPlansData?.status === 200) {
      console.warn('[MONTHLY MEAL-PLAN] ⚠️ No meal plans found in response (empty array)');
    } else {
      console.warn('[MONTHLY MEAL-PLAN] ⚠️ Unexpected response status:', mealPlansData?.status);
    }
    console.log('═══════════════════════════════════════════');
  }, [mealPlansData, currentMonth, mealMonth, error, isError]);

  // API: 식단 항목 조회
  const { data: mealItemsData } = api.meal.getMealPlanItems.useQuery(
    ['mealPlanItems', mealPlanId],
    {
      params: { mealPlanId: mealPlanId || '' },
      query: {
        mealPlanId: mealPlanId || '',
      },
    } as any,
    {
      enabled: !!mealPlanId && isInitialized && !!accessToken,
    } as any,
  );

  useEffect(() => {
    if (mealItemsData) {
      console.log('[DEBUG] MonthlyMealPlan - mealItemsData:', mealItemsData);
    }
  }, [mealItemsData]);

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
    if (mealPlansData?.status === 200 && mealPlansData.body?.data) {
      const plans = mealPlansData.body.data;
      console.log('[DEBUG] MonthlyMealPlan - searching for mealMonth:', mealMonth, '(type:', typeof mealMonth, ')');

      // Robust comparison (String conversion)
      const currentMonthPlan = plans.find((p: any) => String(p.mealMonth) === String(mealMonth));

      if (currentMonthPlan) {
        console.log('[DEBUG] MonthlyMealPlan - Found currentMonthPlan:', currentMonthPlan);
        setMealPlanId(currentMonthPlan.id);
      } else {
        console.log('[DEBUG] MonthlyMealPlan - No plan found for month:', mealMonth);
        console.log(
          '[DEBUG] MonthlyMealPlan - Available plans:',
          plans.map((p: any) => ({ id: p.id, mealMonth: p.mealMonth })),
        );
        setMealPlanId(null);
      }
    }
  }, [mealPlansData, mealMonth]);

  useEffect(() => {
    if (mealItemsData?.body) {
      const items = mealItemsData.body;
      const converted: MealPlan[] = items.map((item: any) => ({
        id: item.id,
        date: item.date,
        breakfast: {
          menu: item.breakfast || '',
          calories: '',
        },
        lunch: {
          menu: item.lunch || '',
          calories: '',
        },
        dinner: {
          menu: item.dinner || '',
          calories: '',
        },
        morningSnack: item.morningSnack || '',
        afternoonSnack: item.afternoonSnack || '',
        allergyInfo: {
          possible: [],
          restricted: [],
        },
        memo: '',
        nutrition_manager: '김영양 영양사',
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      }));

      setMealPlans(converted);
    }
  }, [mealItemsData]);

  // 현재 월의 데이터 필터링
  const monthPlans = useMemo(() => {
    const prefix = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    return mealPlans.filter(p => p.date.startsWith(prefix)).sort((a, b) => a.date.localeCompare(b.date));
  }, [currentMonth, mealPlans]);

  // 통계 계산 로직
  const stats = useMemo(() => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const registeredCount = monthPlans.filter(p => p.breakfast.menu || p.lunch.menu || p.dinner.menu).length;
    const totalCalories = monthPlans.reduce((sum, p) => {
      return (
        sum +
        (parseFloat(p.breakfast.calories) || 0) +
        (parseFloat(p.lunch.calories) || 0) +
        (parseFloat(p.dinner.calories) || 0)
      );
    }, 0);

    return {
      rate: daysInMonth ? ((registeredCount / daysInMonth) * 100).toFixed(1) : '0.0',
      count: registeredCount,
      totalCalories: Math.round(totalCalories),
      avgCalories: registeredCount ? Math.round(totalCalories / registeredCount) : 0,
    };
  }, [currentMonth, monthPlans]);

  /** 상세 편집 모달 오픈 */
  const handleEditClick = (dateStr: string) => {
    const existing = mealPlans.find(m => m.date === dateStr);
    setFocusedDate(dateStr);
    if (existing) {
      setEditingMeal(existing);
      setFormData({
        breakfast: existing.breakfast,
        lunch: existing.lunch,
        dinner: existing.dinner,
        morningSnack: existing.morningSnack,
        afternoonSnack: existing.afternoonSnack,
        allergyPossible: existing.allergyInfo.possible.join(', '),
        allergyRestricted: existing.allergyInfo.restricted.join(', '),
        memo: existing.memo || '',
        manager: existing.nutrition_manager,
      });
    } else {
      setEditingMeal(null);
      setFormData({
        breakfast: { menu: '', calories: '' },
        lunch: { menu: '', calories: '' },
        dinner: { menu: '', calories: '' },
        morningSnack: '',
        afternoonSnack: '',
        allergyPossible: '',
        allergyRestricted: '',
        memo: '',
        manager: '김영양 영양사',
      });
    }
    setShowEditModal(true);
  };

  /** 식단 저장 처리 */
  const handleSaveMeal = () => {
    if (!mealPlanId) {
      alert('식단표 ID가 없습니다.');
      return;
    }

    if (editingMeal) {
      // 수정
      updateMealItem.mutate({
        params: {
          mealPlanId,
          id: editingMeal.id,
        },
        body: {
          date: focusedDate,
          breakfast: formData.breakfast.menu || null,
          lunch: formData.lunch.menu || null,
          dinner: formData.dinner.menu || null,
          morningSnack: formData.morningSnack || null,
          afternoonSnack: formData.afternoonSnack || null,
        },
      } as any);
    } else {
      // 생성
      createMealItem.mutate({
        params: { mealPlanId },
        body: {
          date: focusedDate,
          breakfast: formData.breakfast.menu,
          lunch: formData.lunch.menu,
          dinner: formData.dinner.menu,
          morningSnack: formData.morningSnack,
          afternoonSnack: formData.afternoonSnack,
        },
      } as any);
    }

    setShowEditModal(false);
  };

  /** 식단 삭제 */
  const handleDelete = (id: string) => {
    if (!confirm('정말로 이 식단을 삭제하시겠습니까?')) return;

    if (mealPlanId) {
      deleteMealItem.mutate({
        params: {
          mealPlanId,
          id,
        },
      });
    }
  };

  /** 모달에서 삭제 */
  const handleDeleteFromModal = () => {
    if (!editingMeal) return;
    handleDelete(editingMeal.id);
    setShowEditModal(false);
  };

  /**
   * 사진 업로드 핸들러
   */
  const handleImageUpload = async (mealType: 'breakfast' | 'lunch' | 'dinner', file: File) => {
    try {
      // FormData 생성
      const formData = new FormData();
      formData.append('image', file);
      formData.append('mealType', mealType);
      if (editingMeal) {
        formData.append('mealItemId', editingMeal.id);
      }

      // TODO: API 엔드포인트 연결 필요
      // const response = await fetch('/api/admin/meal-plans/upload-image', {
      //   method: 'POST',
      //   body: formData,
      // });

      // 임시: 로컬 URL 생성
      const imageUrl = URL.createObjectURL(file);

      // formData 상태 업데이트
      setFormData(prev => ({
        ...prev,
        [mealType]: {
          ...prev[mealType],
          image: imageUrl,
        },
      }));

      console.log('✅ 사진 업로드 성공 (임시):', mealType, imageUrl);
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
    try {
      // TODO: API 엔드포인트 연결 필요
      // await fetch('/api/admin/meal-plans/delete-image', {
      //   method: 'DELETE',
      //   body: JSON.stringify({ mealItemId: editingMeal?.id, mealType }),
      // });

      // formData 상태 업데이트
      setFormData(prev => ({
        ...prev,
        [mealType]: {
          ...prev[mealType],
          image: undefined,
        },
      }));

      console.log('✅ 사진 삭제 성공 (임시):', mealType);
      alert('사진이 삭제되었습니다. (임시 - API 연결 필요)');
    } catch (error) {
      console.error('❌ 사진 삭제 실패:', error);
      throw error;
    }
  };

  /** 엑셀 파일 파싱 로직 */
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const workbook = XLSX.read(event.target?.result, { type: 'binary' });
      const rawData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const parsed = rawData
        .map(row => ({
          date: row['날짜(YYYY-MM-DD)'] || '',
          breakfast: { menu: row['아침메뉴'] || '', calories: String(row['아침칼로리'] || '') },
          lunch: { menu: row['점심메뉴'] || '', calories: String(row['점심칼로리'] || '') },
          dinner: { menu: row['저녁메뉴'] || '', calories: String(row['저녁칼로리'] || '') },
          morningSnack: row['오전간식'] || '',
          afternoonSnack: row['오후간식'] || '',
          allergyPossible: row['가능별식이'] || '',
          allergyRestricted: row['저녁별식이'] || '',
          memo: row['메모'] || '',
          manager: row['영양사'] || '김영양 영양사',
        }))
        .filter(r => r.date);

      setExcelData(parsed);
      setSelectedDates(new Set(parsed.map(p => p.date)));
      setShowUploadModal(false);
      setShowExcelPreview(true);
    };
    reader.readAsBinaryString(file);
  };

  /** 엑셀 데이터 최종 반영 */
  const commitExcelData = () => {
    if (!mealPlanId) {
      alert('식단표 ID가 없습니다.');
      return;
    }

    const filtered = excelData.filter(d => selectedDates.has(d.date));

    filtered.forEach(data => {
      const existing = mealPlans.find(p => p.date === data.date);

      if (existing) {
        // 수정
        updateMealItem.mutate({
          params: {
            mealPlanId,
            id: existing.id,
          },
          body: {
            date: data.date,
            breakfast: data.breakfast.menu || null,
            lunch: data.lunch.menu || null,
            dinner: data.dinner.menu || null,
            morningSnack: data.morningSnack || null,
            afternoonSnack: data.afternoonSnack || null,
          },
        } as any);
      } else {
        // 생성
        createMealItem.mutate({
          params: { mealPlanId },
          body: {
            date: data.date,
            breakfast: data.breakfast.menu,
            lunch: data.lunch.menu,
            dinner: data.dinner.menu,
            morningSnack: data.morningSnack,
            afternoonSnack: data.afternoonSnack,
          },
        } as any);
      }
    });

    setShowExcelPreview(false);
    alert(`✅ ${filtered.length}건의 식단이 업로드되었습니다.`);
  };

  /** 엑셀 다운로드 (현재 월 기준) */
  const handleExportExcel = () => {
    const data = monthPlans.map(p => ({
      '날짜(YYYY-MM-DD)': p.date,
      아침메뉴: p.breakfast.menu,
      아침칼로리: p.breakfast.calories,
      점심메뉴: p.lunch.menu,
      점심칼로리: p.lunch.calories,
      저녁메뉴: p.dinner.menu,
      저녁칼로리: p.dinner.calories,
      오전간식: p.morningSnack,
      오후간식: p.afternoonSnack,
      가능별식이: p.allergyInfo.possible.join(','),
      저녁별식이: p.allergyInfo.restricted.join(','),
      메모: p.memo || '',
      영양사: p.nutrition_manager,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '월간식단표');
    const fileName = `월간식단표_${currentMonth.getFullYear()}년${currentMonth.getMonth() + 1}월.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="space-y-4 p-4">
      {/* 1. 상단 통계 배너 */}
      <MealPlanStatBanner
        month={currentMonth}
        stats={stats}
        onPrevMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
        onNextMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
      />

      {/* 2. 액션 버튼 그룹 */}
      <div className="flex items-center justify-between border border-gray-200 bg-white p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 border border-[#5C8D5A] bg-white px-4 py-2 text-[11px] font-black uppercase text-[#5C8D5A] transition-all hover:bg-[#5C8D5A] hover:text-white"
          >
            <i className="ri-upload-2-line"></i>
            Excel Upload
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 text-[11px] font-black uppercase text-gray-700 transition-all hover:bg-gray-50"
          >
            <i className="ri-download-2-line"></i>
            Export Excel
          </button>
        </div>
      </div>

      {/* 2.5 뷰 모드 토글 */}
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
            onClick={() => setViewMode('list')}
            className={`rounded px-3 py-1 text-[10px] font-bold transition-all ${
              viewMode === 'list' ? 'bg-white text-[#5C8D5A] shadow' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className="ri-list-check mr-1"></i> List View
          </button>
        </div>
      </div>

      {/* 3. 월간 식단 리스트/캘린더 */}
      {viewMode === 'calendar' ? (
        <MonthlyCalendar
          currentMonth={currentMonth}
          mealPlans={monthPlans}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
        />
      ) : (
        <MonthlyMealList
          currentMonth={currentMonth}
          mealPlans={monthPlans}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
        />
      )}

      {/* 4. 모달들 */}
      {showEditModal && (
        <MonthlyEditModal
          selectedDate={focusedDate}
          editingMeal={editingMeal}
          formData={formData}
          onFormChange={setFormData}
          onSave={handleSaveMeal}
          onDelete={handleDeleteFromModal}
          onClose={() => setShowEditModal(false)}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
        />
      )}

      {showUploadModal && (
        <ExcelUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onFileChange={handleExcelUpload}
        />
      )}

      {showExcelPreview && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="max-h-[80vh] w-full max-w-4xl overflow-hidden bg-white shadow-2xl">
            <div className="border-b border-gray-200 bg-white p-4">
              <h3 className="text-[14px] font-black uppercase text-gray-800">Excel Preview</h3>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="space-y-2">
                {excelData.map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 border border-gray-200 bg-white p-3">
                    <input
                      type="checkbox"
                      checked={selectedDates.has(item.date)}
                      onChange={e => {
                        const newSet = new Set(selectedDates);
                        e.target.checked ? newSet.add(item.date) : newSet.delete(item.date);
                        setSelectedDates(newSet);
                      }}
                      className="h-4 w-4"
                    />
                    <span className="font-mono text-[12px] font-bold text-gray-700">{item.date}</span>
                    <span className="text-[11px] text-gray-500">
                      {item.breakfast.menu} / {item.lunch.menu} / {item.dinner.menu}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-200 bg-white p-4">
              <button
                onClick={() => setShowExcelPreview(false)}
                className="border border-gray-300 px-4 py-2 text-[11px] font-black uppercase text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={commitExcelData}
                className="bg-[#5C8D5A] px-6 py-2 text-[11px] font-black uppercase text-white"
              >
                Commit {selectedDates.size} Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
