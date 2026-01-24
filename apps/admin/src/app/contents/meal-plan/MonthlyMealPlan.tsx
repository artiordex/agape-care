'use client';

import React, { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import heic2any from 'heic2any';

/* 타입 정의 */
interface MealImage {
  id: string;
  url: string; // base64 또는 blob URL
  uploadedAt: string;
}

interface MealPlan {
  id: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  memo?: string;
  nutrition_manager: string;
  images: MealImage[];
  created_at: string;
  updated_at: string;
}

type ViewMode = 'calendar' | 'list';
type SaveMode = 'overwrite' | 'merge' | 'selective';

/* 메인 컴포넌트 */
const MonthlyMealPlan: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);

  // 모달
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editingMeal, setEditingMeal] = useState<MealPlan | null>(null);

  // 편집 중 임시 값
  const [formData, setFormData] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    memo: '',
    manager: '김영양 영양사',
  });
  const [tempImages, setTempImages] = useState<MealImage[]>([]);

  // 엑셀 관련
  const [excelData, setExcelData] = useState<any[]>([]);
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [saveMode, setSaveMode] = useState<SaveMode>('overwrite');
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  /* 초기 로드 */
  useEffect(() => {
    const saved = localStorage.getItem('agape_meal_plans_v2');
    if (saved) {
      setMealPlans(JSON.parse(saved));
    }
  }, []);

  const saveToStorage = (updatedPlans: MealPlan[]) => {
    localStorage.setItem('agape_meal_plans_v2', JSON.stringify(updatedPlans));
    setMealPlans(updatedPlans);
  };

  /* 월간 통계 */
  const stats = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const prefix = `${year}-${String(month).padStart(2, '0')}`;

    const monthPlans = mealPlans.filter(p => p.date.startsWith(prefix));
    const daysInMonth = new Date(year, month, 0).getDate();

    const registeredCount = monthPlans.filter(p => p.breakfast || p.lunch || p.dinner).length;
    const photoCount = monthPlans.reduce((acc, p) => acc + (p.images?.length || 0), 0);

    return {
      rate: daysInMonth ? ((registeredCount / daysInMonth) * 100).toFixed(1) : '0.0',
      count: registeredCount,
      photos: photoCount,
    };
  }, [currentMonth, mealPlans]);

  /* 날짜 클릭 → 모달 오픈 */
  const handleDateClick = (dateStr: string) => {
    const existing = mealPlans.find(m => m.date === dateStr);
    setSelectedDate(dateStr);

    if (existing) {
      setEditingMeal(existing);
      setFormData({
        breakfast: existing.breakfast,
        lunch: existing.lunch,
        dinner: existing.dinner,
        memo: existing.memo || '',
        manager: existing.nutrition_manager,
      });
      setTempImages(existing.images || []);
    } else {
      setEditingMeal(null);
      setFormData({
        breakfast: '',
        lunch: '',
        dinner: '',
        memo: '',
        manager: '김영양 영양사',
      });
      setTempImages([]);
    }

    setShowEditModal(true);
  };

  /* 개별 식단 저장 */
  const handleSaveMeal = () => {
    if (!selectedDate) return;

    const newMeal: MealPlan = {
      id: editingMeal?.id || Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      breakfast: formData.breakfast,
      lunch: formData.lunch,
      dinner: formData.dinner,
      memo: formData.memo,
      nutrition_manager: formData.manager,
      images: tempImages,
      created_at: editingMeal?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let updated: MealPlan[];

    if (editingMeal) {
      updated = mealPlans.map(p => (p.id === editingMeal.id ? newMeal : p));
    } else {
      updated = [...mealPlans, newMeal];
    }

    saveToStorage(updated);
    setShowEditModal(false);
    alert('식단이 저장되었습니다.');
  };

  /* 이미지 업로드 (HEIC 변환) */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (file.name.toLowerCase().endsWith('.heic')) {
        const converted = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.7,
        });
        file = new File([converted as Blob], file.name.replace(/\.heic$/i, '.jpg'), {
          type: 'image/jpeg',
        });
      }

      const reader = new FileReader();
      reader.onload = ev => {
        const base64 = ev.target?.result as string;
        setTempImages(prev => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            url: base64,
            uploadedAt: new Date().toISOString(),
          },
        ]);
      };
      reader.readAsDataURL(file);
    }

    setLoading(false);
  };

  /* 엑셀 템플릿 다운로드 */
  const downloadTemplate = () => {
    const data = [
      ['날짜(YYYY-MM-DD)', '아침', '점심', '저녁', '메모', '영양사'],
      ['2026-01-01', '전복죽', '불고기정식', '된장찌개', '신정 특식', '김영양'],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '식단표템플릿');
    XLSX.writeFile(wb, '아가페케어_식단표_템플릿.xlsx');
  };

  /* 엑셀 파일 업로드 & 파싱 */
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const bstr = event.target?.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData: any[] = XLSX.utils.sheet_to_json(sheet);

      const parsed = rawData
        .map(row => ({
          date: row['날짜(YYYY-MM-DD)'] || row['날짜'] || row['date'],
          breakfast: row['아침'] || '',
          lunch: row['점심'] || '',
          dinner: row['저녁'] || '',
          memo: row['메모'] || '',
          manager: row['영양사'] || '김영양 영양사',
        }))
        .filter(r => r.date);

      setExcelData(parsed);
      setSelectedDates(new Set(parsed.map(p => p.date)));
      setShowExcelPreview(true);
    };

    reader.readAsBinaryString(file);
  };

  /* 엑셀 → 로컬 데이터 반영 */
  const commitExcelData = () => {
    const updatedPlans = [...mealPlans];

    const dataToApply = saveMode === 'selective' ? excelData.filter(d => selectedDates.has(d.date)) : excelData;

    dataToApply.forEach(row => {
      const idx = updatedPlans.findIndex(p => p.date === row.date);
      const existing = updatedPlans[idx];

      const newPlan: MealPlan = {
        id: existing?.id || Math.random().toString(36).substr(2, 9),
        date: row.date,
        breakfast: saveMode === 'merge' && existing?.breakfast ? existing.breakfast : row.breakfast,
        lunch: saveMode === 'merge' && existing?.lunch ? existing.lunch : row.lunch,
        dinner: saveMode === 'merge' && existing?.dinner ? existing.dinner : row.dinner,
        memo: row.memo,
        nutrition_manager: row.manager,
        images: existing?.images || [],
        created_at: existing?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (idx > -1) updatedPlans[idx] = newPlan;
      else updatedPlans.push(newPlan);
    });

    saveToStorage(updatedPlans);
    setShowExcelPreview(false);
    alert('엑셀 데이터가 반영되었습니다.');
  };

  /* 캘린더용 날짜 배열 */
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [currentMonth]);

  const goPrevMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonth(d);
  };

  const goNextMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonth(d);
  };

  const goTodayMonth = () => {
    setCurrentMonth(new Date());
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (loading) {
    return <div className="p-8 text-center text-gray-500">이미지를 처리 중입니다...</div>;
  }

  /* 렌더링 */
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      {/* 상단 타이틀 & 액션 */}
      <header className="mx-auto mb-10 flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-xl bg-emerald-600 p-2 text-white shadow-lg shadow-emerald-200">
              <i className="ri-restaurant-2-line text-xl"></i>
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">급식 및 식단 관리 (월간)</h1>
          </div>
          <p className="ml-12 font-medium text-gray-500">전문적인 영양 관리와 체계적인 식단 기록 시스템입니다.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
          >
            <i className="ri-download-cloud-2-line text-emerald-600"></i> 템플릿 다운로드
          </button>
          <label className="flex cursor-pointer items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700">
            <i className="ri-file-excel-2-line"></i> 엑셀 일괄 업로드
            <input type="file" className="hidden" accept=".xlsx,.xls" onChange={handleExcelUpload} />
          </label>
        </div>
      </header>

      {/* 통계 카드 */}
      <main className="mx-auto max-w-7xl space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard title="월간 식단 등록률" value={`${stats.rate}%`} icon="ri-pie-chart-line" color="emerald" />
          <StatCard title="식단 등록 일수" value={`${stats.count}일`} icon="ri-calendar-check-line" color="blue" />
          <StatCard title="업로드된 사진" value={`${stats.photos}장`} icon="ri-image-line" color="orange" />
          <div className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] bg-gray-900 p-6 text-white shadow-xl">
            <p className="mb-1 text-xs font-bold uppercase opacity-60">현재 조회 월</p>
            <h3 className="text-xl font-black">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h3>
            <i className="ri-time-line absolute -bottom-4 -right-4 rotate-12 text-8xl opacity-10"></i>
          </div>
        </div>

        {/* 뷰 토글 + 월 이동 */}
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
          <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-50 p-8 md:flex-row">
            <div className="flex rounded-2xl bg-gray-100 p-1.5 shadow-inner">
              <ViewBtn
                active={viewMode === 'calendar'}
                onClick={() => setViewMode('calendar')}
                icon="ri-grid-fill"
                label="캘린더"
              />
              <ViewBtn
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                icon="ri-list-unordered"
                label="리스트"
              />
            </div>

            <div className="flex items-center gap-4">
              <button onClick={goPrevMonth} className="rounded-2xl bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                <i className="ri-arrow-left-s-line text-xl"></i>
              </button>
              <button
                onClick={goTodayMonth}
                className="px-6 py-2.5 font-black text-gray-800 transition-colors hover:text-emerald-600"
              >
                이번 달
              </button>
              <button onClick={goNextMonth} className="rounded-2xl bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                <i className="ri-arrow-right-s-line text-xl"></i>
              </button>
            </div>
          </div>

          {/* 메인 뷰 */}
          <div className="p-8">
            {viewMode === 'calendar' ? (
              <div className="grid grid-cols-7 gap-px overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-sm">
                {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                  <div
                    key={d}
                    className={`bg-gray-50 py-4 text-center text-xs font-black uppercase tracking-widest ${
                      d === '일' ? 'text-red-400' : d === '토' ? 'text-blue-400' : 'text-gray-400'
                    }`}
                  >
                    {d}
                  </div>
                ))}

                {calendarDays.map((day, idx) => {
                  if (!day) {
                    return <div key={`empty-${idx}`} className="min-h-[140px] bg-gray-50/50"></div>;
                  }

                  const yyyy = currentMonth.getFullYear();
                  const mm = String(currentMonth.getMonth() + 1).padStart(2, '0');
                  const dd = String(day).padStart(2, '0');
                  const dateStr = `${yyyy}-${mm}-${dd}`;

                  const plan = mealPlans.find(p => p.date === dateStr);
                  const isToday = todayStr === dateStr;

                  return (
                    <div
                      key={dateStr}
                      onClick={() => handleDateClick(dateStr)}
                      className={`group relative min-h-[140px] cursor-pointer border-b border-r border-gray-50 bg-white p-4 transition-all hover:bg-emerald-50/50 ${
                        isToday ? 'bg-emerald-50/30 ring-2 ring-inset ring-emerald-500' : ''
                      }`}
                    >
                      <span
                        className={`text-sm font-black ${
                          idx % 7 === 0 ? 'text-red-500' : idx % 7 === 6 ? 'text-blue-500' : 'text-gray-900'
                        }`}
                      >
                        {day}
                      </span>

                      {plan && (
                        <div className="mt-3 space-y-1.5">
                          {plan.lunch && (
                            <div className="truncate rounded-lg bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                              ☀️ {plan.lunch}
                            </div>
                          )}
                          {plan.images?.length > 0 && (
                            <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500">
                              <i className="ri-image-fill"></i> 사진 {plan.images.length}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {mealPlans
                  .slice()
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map(plan => (
                    <div
                      key={plan.id}
                      className="group flex items-center justify-between rounded-3xl border border-gray-100 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-md"
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs font-black uppercase text-gray-400">{plan.date.slice(0, 7)}</p>
                          <p className="text-2xl font-black text-gray-900">{plan.date.slice(8, 10)}</p>
                        </div>
                        <div className="h-10 w-px bg-gray-100" />
                        <div>
                          <h4 className="line-clamp-1 font-bold text-gray-800">🥗 점심: {plan.lunch || '미등록'}</h4>
                          <p className="text-xs font-medium text-gray-400">담당: {plan.nutrition_manager}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDateClick(plan.date)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all group-hover:bg-emerald-600 group-hover:text-white"
                      >
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 수정 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-gray-50 p-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900">{selectedDate} 식단 상세 관리</h2>
                <p className="text-sm font-medium text-gray-400">영양 균형을 맞춘 건강한 메뉴를 작성해 주세요.</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-gray-400 transition-colors hover:bg-gray-100"
              >
                ✕
              </button>
            </header>

            <div className="space-y-8 overflow-y-auto p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <MealInput
                  label="🌅 아침 식단"
                  value={formData.breakfast}
                  onChange={(v: string) => setFormData({ ...formData, breakfast: v })}
                  placeholder="아침 메뉴 입력"
                />
                <MealInput
                  label="☀️ 점심 식단"
                  value={formData.lunch}
                  onChange={(v: string) => setFormData({ ...formData, lunch: v })}
                  placeholder="점심 메뉴 입력"
                />
                <MealInput
                  label="🌙 저녁 식단"
                  value={formData.dinner}
                  onChange={(v: string) => setFormData({ ...formData, dinner: v })}
                  placeholder="저녁 메뉴 입력"
                />
              </div>

              <div className="grid grid-cols-1 gap-10 border-t border-gray-50 pt-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-widest text-gray-400">
                      담당 영양사
                    </label>
                    <input
                      type="text"
                      value={formData.manager}
                      onChange={e => setFormData({ ...formData, manager: e.target.value })}
                      className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-widest text-gray-400">
                      메모 및 특이사항
                    </label>
                    <textarea
                      value={formData.memo}
                      onChange={e => setFormData({ ...formData, memo: e.target.value })}
                      rows={3}
                      className="w-full rounded-3xl border-none bg-gray-50 p-6 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="주의사항이나 메뉴 특징을 기록하세요."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="mb-3 block text-xs font-black uppercase tracking-widest text-gray-400">
                    배식 사진 (최대 5장)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {tempImages.map(img => (
                      <div key={img.id} className="group relative aspect-square overflow-hidden rounded-3xl shadow-sm">
                        <img src={img.url} className="h-full w-full object-cover" alt="식단 사진" />
                        <button
                          onClick={() => setTempImages(prev => prev.filter(i => i.id !== img.id))}
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {tempImages.length < 5 && (
                      <label className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-emerald-300 hover:bg-emerald-50">
                        <i className="ri-image-add-line text-2xl text-gray-300 group-hover:text-emerald-500"></i>
                        <span className="mt-1 text-[10px] font-bold text-gray-400">사진 추가</span>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          accept="image/*,.heic"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <footer className="flex justify-between gap-4 border-t border-gray-100 bg-gray-50 p-8">
              <button
                onClick={() => {
                  if (confirm('이 날짜의 식단 데이터를 완전히 삭제하시겠습니까?')) {
                    saveToStorage(mealPlans.filter(p => p.date !== selectedDate));
                    setShowEditModal(false);
                  }
                }}
                className="rounded-2xl px-6 py-4 font-bold text-red-500 transition-colors hover:bg-red-50"
              >
                데이터 삭제
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-bold text-gray-500 hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveMeal}
                  className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-12 py-4 font-black text-white shadow-xl shadow-emerald-200 transition-all hover:bg-emerald-700"
                >
                  <i className="ri-save-3-line"></i> 저장 및 확정
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* 엑셀 미리보기 모달 */}
      {showExcelPreview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md">
          <div className="flex max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900">엑셀 업로드 검토</h2>
                <p className="font-medium text-gray-500">
                  총 {excelData.length}건의 데이터를 불러왔습니다. 저장 방식을 선택하세요.
                </p>
              </div>
              <button onClick={() => setShowExcelPreview(false)} className="text-3xl text-gray-400">
                ✕
              </button>
            </header>

            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="grid grid-cols-1 gap-6 border-b border-gray-50 bg-white p-10 md:grid-cols-3">
                <SaveModeCard
                  active={saveMode === 'overwrite'}
                  onClick={() => setSaveMode('overwrite')}
                  title="기존 데이터 덮어쓰기"
                  desc="해당 날짜의 기존 식단 텍스트를 모두 삭제하고 새로 등록합니다."
                />
                <SaveModeCard
                  active={saveMode === 'merge'}
                  onClick={() => setSaveMode('merge')}
                  title="빈 칸만 병합하기"
                  desc="기존에 입력된 정보가 있다면 유지하고, 빈 곳만 엑셀 데이터로 채웁니다."
                />
                <SaveModeCard
                  active={saveMode === 'selective'}
                  onClick={() => setSaveMode('selective')}
                  title="선택한 날짜만 반영"
                  desc="아래 목록에서 체크한 날짜만 반영합니다."
                />
              </div>

              <div className="flex-1 overflow-y-auto p-10">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 border-b-2 border-gray-100 bg-white text-[11px] font-black uppercase tracking-widest text-gray-400">
                    <tr>
                      {saveMode === 'selective' && (
                        <th className="w-10 p-4">
                          <input
                            type="checkbox"
                            onChange={e =>
                              e.target.checked
                                ? setSelectedDates(new Set(excelData.map(d => d.date)))
                                : setSelectedDates(new Set())
                            }
                          />
                        </th>
                      )}
                      <th className="p-4">날짜</th>
                      <th className="p-4">아침</th>
                      <th className="p-4">점심</th>
                      <th className="p-4">저녁</th>
                      <th className="p-4">담당자</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                    {excelData.map((row, i) => (
                      <tr key={i} className="transition-colors hover:bg-gray-50">
                        {saveMode === 'selective' && (
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={selectedDates.has(row.date)}
                              onChange={() => {
                                const s = new Set(selectedDates);
                                if (s.has(row.date)) s.delete(row.date);
                                else s.add(row.date);
                                setSelectedDates(s);
                              }}
                            />
                          </td>
                        )}
                        <td className="p-4 font-black text-gray-900">{row.date}</td>
                        <td className="p-4">{row.breakfast || '-'}</td>
                        <td className="p-4 font-bold text-emerald-600">{row.lunch || '-'}</td>
                        <td className="p-4">{row.dinner || '-'}</td>
                        <td className="p-4 text-xs text-gray-400">{row.manager}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <footer className="flex justify-end gap-4 border-t border-gray-100 bg-gray-50/50 p-10">
              <button
                onClick={() => setShowExcelPreview(false)}
                className="rounded-3xl px-10 py-5 font-bold text-gray-400 transition-all hover:bg-gray-100"
              >
                취소 및 파기
              </button>
              <button
                onClick={commitExcelData}
                className="rounded-3xl bg-emerald-600 px-16 py-5 font-black text-white shadow-xl shadow-emerald-100 transition-all hover:scale-105"
              >
                데이터 최종 반영
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

/* 서브 컴포넌트들 */

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: string;
  color: 'emerald' | 'blue' | 'orange';
}) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
  };
  return (
    <div className="flex items-center justify-between rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-transform hover:scale-105">
      <div>
        <p className="mb-1 text-xs font-black uppercase tracking-widest text-gray-400">{title}</p>
        <h4 className="text-2xl font-black text-gray-900">{value}</h4>
      </div>
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${colors[color]}`}>
        <i className={icon}></i>
      </div>
    </div>
  );
}

function ViewBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-black transition-all ${
        active ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <i className={icon}></i> {label}
    </button>
  );
}

function MealInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-4">
      <label className="ml-2 text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className="min-h-[140px] w-full rounded-[2.5rem] border-none bg-gray-50 p-6 text-sm leading-relaxed shadow-inner outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500"
        placeholder={placeholder}
      />
    </div>
  );
}

function SaveModeCard({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[2rem] border-2 p-6 text-left transition-all ${
        active
          ? 'border-emerald-600 bg-emerald-50/30 ring-4 ring-emerald-50'
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`h-4 w-4 rounded-full border-4 ${
            active ? 'border-emerald-600 bg-white' : 'border-gray-200 bg-white'
          }`}
        ></div>
        <h4 className="font-black text-gray-900">{title}</h4>
      </div>
      <p className="text-xs font-medium leading-relaxed text-gray-500">{desc}</p>
    </button>
  );
}

export default MonthlyMealPlan;
