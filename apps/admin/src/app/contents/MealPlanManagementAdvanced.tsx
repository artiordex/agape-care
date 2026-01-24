import { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import * as XLSX from 'xlsx';
import heic2any from 'heic2any';

interface MealImage {
  id: string;
  url: string;
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

export default function MealPlanManagementAdvanced() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [editingMeal, setEditingMeal] = useState<MealPlan | null>(null);
  
  // Form fields
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [memo, setMemo] = useState('');
  const [nutritionManager, setNutritionManager] = useState('김영양');
  const [uploadedImages, setUploadedImages] = useState<MealImage[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Excel upload
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [excelData, setExcelData] = useState<any[]>([]);

  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isTemporaryApplied, setIsTemporaryApplied] = useState(false);
  const [saveMode, setSaveMode] = useState<'overwrite' | 'merge' | 'selective'>('overwrite');
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchMealPlans();
  }, [currentMonth]);

  const fetchMealPlans = async () => {
    setLoading(true);
    try {
      const year = currentMonth.getFullYear();
      const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
      const startDate = `${year}-${month}-01`;
      const endDate = `${year}-${month}-31`;

      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (error) throw error;
      setMealPlans(data || []);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      alert('식단표를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const existingMeal = mealPlans.find(m => m.date === dateStr);
    
    if (existingMeal) {
      openEditModal(existingMeal);
    } else {
      openCreateModal(dateStr);
    }
  };

  const openCreateModal = (date: string) => {
    setSelectedDate(date);
    setEditingMeal(null);
    setBreakfast('');
    setLunch('');
    setDinner('');
    setMemo('');
    setNutritionManager('김영양');
    setUploadedImages([]);
    setShowModal(true);
  };

  const openEditModal = (meal: MealPlan) => {
    setSelectedDate(meal.date);
    setEditingMeal(meal);
    setBreakfast(meal.breakfast || '');
    setLunch(meal.lunch || '');
    setDinner(meal.dinner || '');
    setMemo(meal.memo || '');
    setNutritionManager(meal.nutrition_manager || '김영양');
    setUploadedImages(meal.images || []);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedDate) {
      alert('날짜를 선택해주세요.');
      return;
    }

    setLoading(true);
    try {
      const mealData = {
        date: selectedDate,
        breakfast: breakfast.trim(),
        lunch: lunch.trim(),
        dinner: dinner.trim(),
        memo: memo.trim() || null,
        nutrition_manager: nutritionManager.trim(),
        images: uploadedImages,
        updated_at: new Date().toISOString()
      };

      if (editingMeal) {
        const { error } = await supabase
          .from('meal_plans')
          .update(mealData)
          .eq('id', editingMeal.id);

        if (error) throw error;
        alert('식단표가 수정되었습니다.');
      } else {
        const { error } = await supabase
          .from('meal_plans')
          .insert([{ ...mealData, created_at: new Date().toISOString() }]);

        if (error) throw error;
        alert('식단표가 등록되었습니다.');
      }

      setShowModal(false);
      fetchMealPlans();
    } catch (error) {
      console.error('Error saving meal plan:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingMeal) return;
    if (!confirm('이 날짜의 식단표를 삭제하시겠습니까?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', editingMeal.id);

      if (error) throw error;
      alert('식단표가 삭제되었습니다.');
      setShowModal(false);
      fetchMealPlans();
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      alert('삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (uploadedImages.length + files.length > 5) {
      alert('최대 5장까지 업로드 가능합니다.');
      return;
    }

    setUploadingImages(true);
    try {
      const newImages: MealImage[] = [];

      for (let i = 0; i < files.length; i++) {
        let file = files[i];

        if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
          try {
            const convertedBlob = await heic2any({
              blob: file,
              toType: 'image/jpeg',
              quality: 0.8
            });
            file = new File(
              [convertedBlob as Blob],
              file.name.replace(/\.heic$/i, '.jpg'),
              { type: 'image/jpeg' }
            );
          } catch (conversionError) {
            console.error('HEIC conversion failed:', conversionError);
            alert(`${file.name} 변환에 실패했습니다.`);
            continue;
          }
        }

        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name}은(는) 5MB를 초과합니다.`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('meal-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('meal-images')
          .getPublicUrl(filePath);

        newImages.push({
          id: Date.now().toString() + i,
          url: urlData.publicUrl,
          uploadedAt: new Date().toISOString()
        });
      }

      setUploadedImages([...uploadedImages, ...newImages]);
      alert(`${newImages.length}장의 사진이 업로드되었습니다.`);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('사진 업로드에 실패했습니다.');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (imageId: string) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== imageId));
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const year = currentMonth.getFullYear();
      const month = String(currentMonth.getMonth() + 1).padStart(2, '0');

      const parsedData = jsonData.map((row: any) => {
        let day = row['날짜'] || row['date'] || row['일'] || '';
        if (typeof day === 'number') {
          day = String(day).padStart(2, '0');
        }
        const dateStr = `${year}-${month}-${day}`;

        return {
          date: dateStr,
          breakfast: row['아침'] || row['breakfast'] || '',
          lunch: row['점심'] || row['lunch'] || '',
          dinner: row['저녁'] || row['dinner'] || '',
          memo: row['메모'] || row['memo'] || '',
          nutrition_manager: row['영양사'] || row['nutritionManager'] || '김영양'
        };
      }).filter(item => item.date.match(/^\d{4}-\d{2}-\d{2}$/));

      setExcelData(parsedData);
      setShowExcelPreview(true);
    } catch (error) {
      console.error('Error parsing excel:', error);
      alert('엑셀 파일 읽기에 실패했습니다.');
    }
  };

  const handleExcelSave = async () => {
    if (excelData.length === 0) return;

    setLoading(true);
    try {
      for (const item of excelData) {
        const existingMeal = mealPlans.find(m => m.date === item.date);
        
        const mealData = {
          date: item.date,
          breakfast: item.breakfast,
          lunch: item.lunch,
          dinner: item.dinner,
          memo: item.memo || null,
          nutrition_manager: item.nutrition_manager,
          images: existingMeal?.images || [],
          updated_at: new Date().toISOString()
        };

        if (existingMeal) {
          await supabase
            .from('meal_plans')
            .update(mealData)
            .eq('id', existingMeal.id);
        } else {
          await supabase
            .from('meal_plans')
            .insert([{ ...mealData, created_at: new Date().toISOString() }]);
        }
      }

      alert('엑셀 데이터가 저장되었습니다.');
      setShowExcelPreview(false);
      setExcelData([]);
      fetchMealPlans();
    } catch (error) {
      console.error('Error saving excel data:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 엑셀 템플릿 다운로드
  const downloadExcelTemplate = () => {
    const template = [
      ['날짜', '아침', '점심', '저녁', '메모', '영양사'],
      ...Array.from({ length: 31 }, (_, i) => [
        i + 1,
        '',
        '',
        '',
        '',
        ''
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '식단표');
    
    const fileName = `식단표_템플릿_${currentMonth.getFullYear()}년_${currentMonth.getMonth() + 1}월.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // 엑셀 파일 파싱
  const parseExcelFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 헤더 자동 매칭
        const headers = jsonData[0] as string[];
        const dateIndex = headers.findIndex(h => 
          ['날짜', '일자', 'Date', 'Day', 'date'].includes(h)
        );
        const breakfastIndex = headers.findIndex(h => 
          ['아침', '조식', 'Breakfast', 'breakfast'].includes(h)
        );
        const lunchIndex = headers.findIndex(h => 
          ['점심', '중식', 'Lunch', 'lunch'].includes(h)
        );
        const dinnerIndex = headers.findIndex(h => 
          ['저녁', '석식', 'Dinner', 'dinner'].includes(h)
        );
        const memoIndex = headers.findIndex(h => 
          ['메모', '비고', 'Note', 'note', 'Memo', 'memo'].includes(h)
        );
        const managerIndex = headers.findIndex(h => 
          ['영양사', '담당', '작성자', 'Manager', 'manager'].includes(h)
        );

        if (dateIndex === -1) {
          alert('날짜 컬럼을 찾을 수 없습니다. 엑셀 파일을 확인해주세요.');
          return;
        }

        // 데이터 파싱
        const parsed = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i] as any[];
          if (!row[dateIndex]) continue; // 빈 행 무시

          let dateStr = String(row[dateIndex]).trim();
          
          // 날짜 형식 변환
          if (/^\d{1,2}$/.test(dateStr)) {
            // "1", "15" 같은 숫자만 있는 경우
            const day = parseInt(dateStr);
            dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          } else if (/^\d{1,2}일$/.test(dateStr)) {
            // "1일", "15일" 형식
            const day = parseInt(dateStr.replace('일', ''));
            dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          } else {
            // YYYY-MM-DD, YYYY.MM.DD, YYYY/MM/DD 형식
            dateStr = dateStr.replace(/\./g, '-').replace(/\//g, '-');
          }

          parsed.push({
            date: dateStr,
            breakfast: breakfastIndex !== -1 ? (row[breakfastIndex] || null) : null,
            lunch: lunchIndex !== -1 ? (row[lunchIndex] || null) : null,
            dinner: dinnerIndex !== -1 ? (row[dinnerIndex] || null) : null,
            memo: memoIndex !== -1 ? (row[memoIndex] || null) : null,
            nutrition_manager: managerIndex !== -1 ? (row[managerIndex] || '영양사') : '영양사'
          });
        }

        // 날짜 기준 정렬
        parsed.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // 중복 날짜 체크
        const dateCount = new Map<string, number>();
        parsed.forEach(item => {
          dateCount.set(item.date, (dateCount.get(item.date) || 0) + 1);
        });
        
        const duplicates = Array.from(dateCount.entries()).filter(([_, count]) => count > 1);
        if (duplicates.length > 0) {
          const duplicateDates = duplicates.map(([date]) => date).join(', ');
          if (!confirm(`중복된 날짜가 있습니다: ${duplicateDates}\n마지막 행으로 덮어쓰시겠습니까?`)) {
            return;
          }
        }

        setParsedData(parsed);
        setPreviewData(parsed);
        setShowExcelUpload(true);
        
      } catch (error) {
        console.error('엑셀 파싱 오류:', error);
        alert('엑셀 파일을 읽는 중 오류가 발생했습니다.');
      }
    };

    reader.readAsBinaryString(file);
  };

  // 엑셀 파일 선택
  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExcelFile(file);
      parseExcelFile(file);
    }
  };

  // 임시 적용
  const applyTemporary = () => {
    setMealPlans(prevPlans => {
      const newPlans = [...prevPlans];
      
      parsedData.forEach(item => {
        const existingIndex = newPlans.findIndex(p => p.date === item.date);
        
        if (existingIndex !== -1) {
          // 기존 데이터 업데이트 (images 유지)
          newPlans[existingIndex] = {
            ...newPlans[existingIndex],
            breakfast: item.breakfast || newPlans[existingIndex].breakfast,
            lunch: item.lunch || newPlans[existingIndex].lunch,
            dinner: item.dinner || newPlans[existingIndex].dinner,
            memo: item.memo || newPlans[existingIndex].memo,
            nutrition_manager: item.nutrition_manager || newPlans[existingIndex].nutrition_manager
          };
        } else {
          // 새 데이터 추가
          newPlans.push({
            id: `temp-${item.date}`,
            date: item.date,
            breakfast: item.breakfast,
            lunch: item.lunch,
            dinner: item.dinner,
            memo: item.memo,
            nutrition_manager: item.nutrition_manager,
            images: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        }
      });

      return newPlans.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    setIsTemporaryApplied(true);
    alert('임시 적용되었습니다. 캘린더에서 확인 후 저장 확정을 눌러주세요.');
  };

  // 적용 취소
  const cancelApply = () => {
    setIsTemporaryApplied(false);
    setParsedData([]);
    setPreviewData([]);
    setExcelFile(null);
    setShowExcelUpload(false);
    fetchMealPlans(); // 원래 데이터 다시 불러오기
  };

  // 저장 확정
  const saveToDatabase = async () => {
    try {
      const dataToSave = saveMode === 'selective' 
        ? parsedData.filter(item => selectedDates.has(item.date))
        : parsedData;

      for (const item of dataToSave) {
        // 기존 데이터 조회 (images 보존용)
        const { data: existing } = await supabase
          .from('meal_plans')
          .select('images')
          .eq('date', item.date)
          .single();

        const saveData: any = {
          date: item.date,
          breakfast: item.breakfast,
          lunch: item.lunch,
          dinner: item.dinner,
          memo: item.memo,
          nutrition_manager: item.nutrition_manager,
          images: existing?.images || [], // 기존 images 유지
          updated_at: new Date().toISOString()
        };

        if (saveMode === 'merge' && existing) {
          // 병합 모드: 빈 칸만 채우기
          if (existing.breakfast) saveData.breakfast = existing.breakfast;
          if (existing.lunch) saveData.lunch = existing.lunch;
          if (existing.dinner) saveData.dinner = existing.dinner;
          if (existing.memo) saveData.memo = existing.memo;
          if (existing.nutrition_manager) saveData.nutrition_manager = existing.nutrition_manager;
        }

        // UPSERT
        const { error } = await supabase
          .from('meal_plans')
          .upsert(saveData, { onConflict: 'date' });

        if (error) throw error;
      }

      alert('식단표가 저장되었습니다.');
      setIsTemporaryApplied(false);
      setShowExcelUpload(false);
      setParsedData([]);
      setPreviewData([]);
      setExcelFile(null);
      fetchMealPlans(); // 저장 후 다시 불러오기

    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  // 날짜 선택 토글 (선택 모드용)
  const toggleDateSelection = (date: string) => {
    setSelectedDates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  const renderCalendarView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
            <div
              key={day}
              className={`py-3 text-center text-sm font-semibold ${
                idx === 0 ? 'text-red-600' : idx === 6 ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div>
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 border-b border-gray-200 last:border-b-0">
              {week.map((day, dayIdx) => {
                if (!day) {
                  return <div key={`empty-${dayIdx}`} className="min-h-[120px] bg-gray-50"></div>;
                }

                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const mealPlan = mealPlans.find(m => m.date === dateStr);
                const hasMenu = mealPlan && (mealPlan.breakfast || mealPlan.lunch || mealPlan.dinner);
                const photoCount = mealPlan?.images?.length || 0;
                const isToday = new Date().toDateString() === new Date(dateStr).toDateString();

                return (
                  <div
                    key={day}
                    onClick={() => handleDateClick(new Date(dateStr))}
                    className={`min-h-[120px] p-2 border-r border-gray-200 last:border-r-0 cursor-pointer hover:bg-teal-50 transition-colors ${
                      isToday ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div
                      className={`text-sm font-semibold mb-2 ${
                        dayIdx === 0 ? 'text-red-600' : dayIdx === 6 ? 'text-blue-600' : 'text-gray-700'
                      } ${isToday ? 'text-teal-600' : ''}`}
                    >
                      {day}
                    </div>

                    {hasMenu ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 bg-teal-500 rounded-full"></span>
                          <span className="text-xs text-gray-600">식단 등록</span>
                        </div>
                        {photoCount > 0 && (
                          <div className="flex items-center gap-1">
                            <i className="ri-image-line text-amber-500 text-xs"></i>
                            <span className="text-xs text-gray-600">{photoCount}장</span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                          {mealPlan.breakfast && `아침: ${mealPlan.breakfast.substring(0, 10)}...`}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400">식단 미등록</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const allDates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const mealPlan = mealPlans.find(m => m.date === dateStr);
      allDates.push({ date: dateStr, mealPlan });
    }

    return (
      <div className="space-y-4">
        {allDates.map(({ date, mealPlan }) => {
          const dateObj = new Date(date);
          const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
          const isToday = new Date().toDateString() === dateObj.toDateString();

          return (
            <div
              key={date}
              className={`bg-white rounded-lg shadow-sm border p-6 ${
                isToday ? 'border-teal-500 border-2' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`text-lg font-bold ${isToday ? 'text-teal-600' : 'text-gray-800'}`}>
                    {date} ({dayOfWeek})
                  </div>
                  {isToday && (
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                      오늘
                    </span>
                  )}
                </div>
                <button
                  onClick={() => mealPlan ? openEditModal(mealPlan) : openCreateModal(date)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                >
                  {mealPlan ? '수정' : '추가'}
                </button>
              </div>

              {mealPlan ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">🌅 아침</div>
                      <div className="text-sm text-gray-600 whitespace-pre-wrap">
                        {mealPlan.breakfast || '-'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">☀️ 점심</div>
                      <div className="text-sm text-gray-600 whitespace-pre-wrap">
                        {mealPlan.lunch || '-'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">🌙 저녁</div>
                      <div className="text-sm text-gray-600 whitespace-pre-wrap">
                        {mealPlan.dinner || '-'}
                      </div>
                    </div>
                  </div>

                  {mealPlan.memo && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">📝 메모</div>
                      <div className="text-sm text-gray-600">{mealPlan.memo}</div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="ri-user-line"></i>
                    <span>담당 영양사: {mealPlan.nutrition_manager}</span>
                  </div>

                  {mealPlan.images && mealPlan.images.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        📷 급식 사진 ({mealPlan.images.length}장)
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {mealPlan.images.map((img) => (
                          <img
                            key={img.id}
                            src={img.url}
                            alt="급식 사진"
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <i className="ri-restaurant-line text-4xl mb-2"></i>
                  <div className="text-sm">식단이 등록되지 않았습니다</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">식단표 관리</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={downloadExcelTemplate}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <i className="ri-download-line"></i>
            엑셀 템플릿 다운로드
          </button>
          <label className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer flex items-center gap-2">
            <i className="ri-upload-line"></i>
            엑셀 업로드
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 임시 적용 상태 배지 */}
      {isTemporaryApplied && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-information-line text-amber-600 text-xl"></i>
            <span className="text-amber-800 font-medium">임시 적용 중입니다. 저장 확정을 눌러 DB에 저장하세요.</span>
          </div>
          <button
            onClick={cancelApply}
            className="px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            적용 취소
          </button>
        </div>
      )}

      {/* 엑셀 업로드 미리보기 패널 */}
      {showExcelUpload && parsedData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">엑셀 미리보기</h3>
            <button
              onClick={() => setShowExcelUpload(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="text-sm text-teal-600 mb-1">총 입력일 수</div>
              <div className="text-2xl font-bold text-teal-700">{parsedData.length}일</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 mb-1">식단 등록일</div>
              <div className="text-2xl font-bold text-blue-700">
                {parsedData.filter(p => p.breakfast || p.lunch || p.dinner).length}일
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">미등록일</div>
              <div className="text-2xl font-bold text-gray-700">
                {parsedData.filter(p => !p.breakfast && !p.lunch && !p.dinner).length}일
              </div>
            </div>
          </div>

          {/* 저장 모드 선택 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">저장 모드</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="saveMode"
                  value="overwrite"
                  checked={saveMode === 'overwrite'}
                  onChange={(e) => setSaveMode(e.target.value as any)}
                  className="w-4 h-4 text-teal-600"
                />
                <span className="text-sm text-gray-700">월 전체 덮어쓰기 (텍스트만)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="saveMode"
                  value="merge"
                  checked={saveMode === 'merge'}
                  onChange={(e) => setSaveMode(e.target.value as any)}
                  className="w-4 h-4 text-teal-600"
                />
                <span className="text-sm text-gray-700">병합 (빈 칸만 채우기)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="saveMode"
                  value="selective"
                  checked={saveMode === 'selective'}
                  onChange={(e) => setSaveMode(e.target.value as any)}
                  className="w-4 h-4 text-teal-600"
                />
                <span className="text-sm text-gray-700">선택 날짜만 저장</span>
              </label>
            </div>
          </div>

          {/* 미리보기 테이블 */}
          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {saveMode === 'selective' && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      선택
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">아침</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">점심</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">저녁</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">메모</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {previewData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {saveMode === 'selective' && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedDates.has(item.date)}
                          onChange={() => toggleDateSelection(item.date)}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                      </td>
                    )}
                    <td className="px-4 py-3 font-medium text-gray-900">{item.date}</td>
                    <td className="px-4 py-3 text-gray-600">{item.breakfast || '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{item.lunch || '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{item.dinner || '-'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{item.memo || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center justify-end gap-3">
            {!isTemporaryApplied ? (
              <button
                onClick={applyTemporary}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                임시 적용
              </button>
            ) : (
              <button
                onClick={saveToDatabase}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                저장 확정
              </button>
            )}
            <button
              onClick={cancelApply}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* View Mode Toggle & Month Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'calendar'
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className="ri-calendar-line mr-2"></i>
            캘린더
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className="ri-list-check mr-2"></i>
            리스트
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ri-arrow-left-s-line text-xl text-gray-600"></i>
          </button>
          <div className="text-lg font-bold text-gray-800 min-w-[150px] text-center">
            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
          </div>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ri-arrow-right-s-line text-xl text-gray-600"></i>
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            오늘
          </button>
        </div>
      </div>

      {/* Calendar Usage Guide */}
      {viewMode === 'calendar' && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-teal-600 text-xl mt-0.5"></i>
            <div className="text-sm text-teal-800">
              <strong>사용 방법:</strong> 날짜를 클릭하면 식단을 등록하거나 수정할 수 있습니다.
              식단이 등록된 날짜는 초록색 점으로 표시되며, 급식 사진이 있는 경우 사진 아이콘이 표시됩니다.
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <div className="mt-2 text-sm text-gray-600">로딩 중...</div>
        </div>
      )}

      {/* Calendar or List View */}
      {!loading && (viewMode === 'calendar' ? renderCalendarView() : renderListView())}

      {/* Meal Plan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {editingMeal ? '식단표 수정' : '식단표 등록'} - {selectedDate}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Meal Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🌅 아침
                  </label>
                  <textarea
                    value={breakfast}
                    onChange={(e) => setBreakfast(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    placeholder="아침 메뉴를 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ☀️ 점심
                  </label>
                  <textarea
                    value={lunch}
                    onChange={(e) => setLunch(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    placeholder="점심 메뉴를 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🌙 저녁
                  </label>
                  <textarea
                    value={dinner}
                    onChange={(e) => setDinner(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    placeholder="저녁 메뉴를 입력하세요"
                  />
                </div>
              </div>

              {/* Memo & Nutrition Manager */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 메모
                  </label>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    placeholder="메모 (선택사항)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👨‍🍳 담당 영양사
                  </label>
                  <input
                    type="text"
                    value={nutritionManager}
                    onChange={(e) => setNutritionManager(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    placeholder="담당 영양사"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📷 급식 사진 (최대 5장)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <label className="cursor-pointer">
                    <div className="space-y-2">
                      <i className="ri-image-add-line text-4xl text-gray-400"></i>
                      <div className="text-sm text-gray-600">
                        클릭하여 사진을 업로드하세요
                      </div>
                      <div className="text-xs text-gray-400">
                        JPG, PNG, HEIC (최대 5MB)
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*,.heic"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploadingImages || uploadedImages.length >= 5}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url}
                          alt="급식 사진"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleRemoveImage(img.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <i className="ri-close-line text-sm"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div>
                {editingMeal && (
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    <i className="ri-delete-bin-line mr-2"></i>
                    삭제
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {loading ? '저장 중...' : '저장하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Excel Preview Modal */}
      {showExcelPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                엑셀 데이터 미리보기 ({excelData.length}건)
              </h3>
              <button
                onClick={() => setShowExcelPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">날짜</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">아침</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">점심</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">저녁</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">메모</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">영양사</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="px-4 py-2">{row.date}</td>
                        <td className="px-4 py-2">{row.breakfast}</td>
                        <td className="px-4 py-2">{row.lunch}</td>
                        <td className="px-4 py-2">{row.dinner}</td>
                        <td className="px-4 py-2">{row.memo}</td>
                        <td className="px-4 py-2">{row.nutrition_manager}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-2 border-t border-gray-200">
              <button
                onClick={() => setShowExcelPreview(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                취소
              </button>
              <button
                onClick={handleExcelSave}
                disabled={loading}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {loading ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
