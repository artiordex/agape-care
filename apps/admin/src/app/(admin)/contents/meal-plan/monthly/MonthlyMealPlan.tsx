'use client';

import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import MealPlanStatBanner from '../MealPlanStatBanner';
import ExcelUploadModal from './ExcelUploadModal';
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

export default function MonthlyMealPlan() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);

  // 모달 및 편집 상태
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
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

  // 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('agape_meal_plans_enhanced');
    if (saved) setMealPlans(JSON.parse(saved));
  }, []);

  const saveToStorage = (updatedPlans: MealPlan[]) => {
    localStorage.setItem('agape_meal_plans_enhanced', JSON.stringify(updatedPlans));
    setMealPlans(updatedPlans);
  };

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
    setSelectedDate(dateStr);
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
    const newMeal: MealPlan = {
      id: editingMeal?.id || Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      breakfast: formData.breakfast,
      lunch: formData.lunch,
      dinner: formData.dinner,
      morningSnack: formData.morningSnack,
      afternoonSnack: formData.afternoonSnack,
      allergyInfo: {
        possible: formData.allergyPossible
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
        restricted: formData.allergyRestricted
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
      },
      memo: formData.memo,
      nutrition_manager: formData.manager,
      created_at: editingMeal?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = editingMeal ? mealPlans.map(p => (p.id === editingMeal.id ? newMeal : p)) : [...mealPlans, newMeal];

    saveToStorage(updated);
    setShowEditModal(false);
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
    const updatedPlans = [...mealPlans];
    const dataToApply = saveMode === 'selective' ? excelData.filter(d => selectedDates.has(d.date)) : excelData;

    dataToApply.forEach(row => {
      const idx = updatedPlans.findIndex(p => p.date === row.date);
      const existing = updatedPlans[idx];
      const newPlan: MealPlan = {
        id: existing?.id || Math.random().toString(36).substr(2, 9),
        date: row.date,
        breakfast: saveMode === 'merge' && existing?.breakfast.menu ? existing.breakfast : row.breakfast,
        lunch: saveMode === 'merge' && existing?.lunch.menu ? existing.lunch : row.lunch,
        dinner: saveMode === 'merge' && existing?.dinner.menu ? existing.dinner : row.dinner,
        morningSnack: saveMode === 'merge' && existing?.morningSnack ? existing.morningSnack : row.morningSnack,
        afternoonSnack: saveMode === 'merge' && existing?.afternoonSnack ? existing.afternoonSnack : row.afternoonSnack,
        allergyInfo: {
          possible: row.allergyPossible
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean),
          restricted: row.allergyRestricted
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean),
        },
        memo: saveMode === 'merge' && existing?.memo ? existing.memo : row.memo,
        nutrition_manager: row.manager,
        created_at: existing?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      if (idx > -1) updatedPlans[idx] = newPlan;
      else updatedPlans.push(newPlan);
    });

    saveToStorage(updatedPlans);
    setShowExcelPreview(false);
  };

  return (
    <div className="space-y-0 font-sans antialiased">
      {/* 1. 월간 날짜 제어 및 통계 배너 */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="rounded bg-[#5C8D5A] p-1.5 text-white shadow-md">
            <i className="ri-calendar-event-line text-lg"></i>
          </div>
          <div>
            <h1 className="text-[13px] font-black tracking-tight text-gray-900">월간 식단 관리 프로토콜</h1>
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded border border-gray-200 bg-[#f8fafc] p-0.5 shadow-inner">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="h-7 w-7 border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A]"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 text-[10px] font-bold text-gray-600 hover:text-[#5C8D5A]"
          >
            이번 달
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="h-7 w-7 border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A]"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>

      <MealPlanStatBanner stats={stats} />

      {/* 2. 상단 액션 바 */}
      <div className="flex items-center justify-end gap-1 border-b border-gray-200 bg-[#f8fafc] px-3 py-2">
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-3 py-1 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]"
        >
          <i className="ri-upload-2-line text-sm"></i> 식단 업로드
        </button>
        <button
          onClick={() => alert('월간 데이터 다운로드')}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-3 py-1 text-[10px] font-black text-white shadow-sm transition-all hover:bg-[#4A7548]"
        >
          <i className="ri-download-2-line text-sm"></i> 월간 엑셀 출력
        </button>
      </div>

      {/* 3. 월간 리스트 컨텐츠 */}
      <div className="min-h-full bg-[#f8fafc] p-4">
        <MonthlyMealList monthPlans={monthPlans} onEditClick={handleEditClick} />
      </div>

      {/* 4. 각종 모달 레이어 */}
      {showEditModal && (
        <MonthlyEditModal
          selectedDate={selectedDate}
          editingMeal={editingMeal}
          formData={formData}
          onFormChange={setFormData}
          onSave={handleSaveMeal}
          onDelete={() => {
            if (confirm('식단을 삭제하시겠습니까?')) {
              saveToStorage(mealPlans.filter(p => p.id !== editingMeal?.id));
              setShowEditModal(false);
            }
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {(showUploadModal || showExcelPreview) && (
        <ExcelUploadModal
          excelData={excelData}
          showPreview={showExcelPreview}
          saveMode={saveMode}
          selectedDates={selectedDates}
          onFileChange={handleExcelUpload}
          onDownloadTemplate={() => alert('Template Download')}
          onSetSaveMode={setSaveMode}
          onToggleDate={d => {
            const s = new Set(selectedDates);
            if (s.has(d)) s.delete(d);
            else s.add(d);
            setSelectedDates(s);
          }}
          onSelectAll={c => setSelectedDates(c ? new Set(excelData.map(d => d.date)) : new Set())}
          onCommit={commitExcelData}
          onClose={() => {
            setShowUploadModal(false);
            setShowExcelPreview(false);
          }}
        />
      )}
    </div>
  );
}
