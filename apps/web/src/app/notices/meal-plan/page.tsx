'use client';

import { useEffect, useState } from 'react';

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
}

export default function MealPlanPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  // 실제 데이터 가져오는 부분은 원하는 방식으로 바꿔서 사용
  const fetchMealPlans = async () => {
    setLoading(true);

    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString().split('T')[0]!;
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString().split('T')[0]!;

    const res = await fetch(`/api/meal-plans?start=${start}&end=${end}`);
    const data: MealPlan[] = await res.json();

    setMealPlans(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMealPlans();
  }, [currentMonth]);

  // ===== 주간 보기 : date는 항상 string =====
  const getWeekDays = (): { date: string; meal: MealPlan | null }[] => {
    const today = new Date();
    const currentDay = today.getDay(); // 0(일)~6(토)

    // 이번 주 월요일
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    const days: { date: string; meal: MealPlan | null }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const iso = date.toISOString().split('T')[0]; // string | undefined
      const dateStr: string = iso ?? ''; // 여기서 string 으로 고정

      const meal = mealPlans.find(m => m.date === dateStr) ?? null;

      days.push({ date: dateStr, meal });
    }

    return days;
  };

  // ===== 월간 보기 : 앞쪽 빈 칸 때문에 date가 null 가능 =====
  const getMonthDays = (): { date: string | null; meal: MealPlan | null }[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay(); // 0(일)~6(토)

    const days: { date: string | null; meal: MealPlan | null }[] = [];

    // 앞쪽 빈칸
    for (let i = 0; i < startDay; i++) {
      days.push({ date: null, meal: null });
    }

    // 실제 날짜들
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const iso = date.toISOString().split('T')[0]; // string | undefined
      const dateStr: string | null = iso ?? null; // 여기서 string | null 로 고정

      const meal = dateStr ? (mealPlans.find(m => m.date === dateStr) ?? null) : null;

      days.push({ date: dateStr, meal });
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 py-20 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <i className="ri-restaurant-2-line text-5xl" />
          </div>
          <h1 className="mb-4 text-5xl font-bold">식단표</h1>
          <p className="text-xl text-teal-100">영양사가 정성껏 준비한 건강한 식단을 확인하세요</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 상단 컨트롤 */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* 월 네비 */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <i className="ri-arrow-left-line" />
              </button>
              <h3 className="min-w-[150px] text-center text-xl font-bold text-gray-800">
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <i className="ri-arrow-right-line" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="whitespace-nowrap rounded-lg bg-teal-100 px-4 py-2 text-teal-700 hover:bg-teal-200"
              >
                이번 달
              </button>
            </div>

            {/* 보기 전환 */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`whitespace-nowrap rounded-lg px-6 py-2 transition-all ${
                  viewMode === 'week'
                    ? 'bg-white font-semibold text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="ri-calendar-line mr-2" />
                주간 보기
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`whitespace-nowrap rounded-lg px-6 py-2 transition-all ${
                  viewMode === 'month'
                    ? 'bg-white font-semibold text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="ri-calendar-2-line mr-2" />
                월간 보기
              </button>
            </div>
          </div>
        </div>

        {/* 로딩 */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
            <p className="mt-4 text-gray-600">식단표를 불러오는 중입니다...</p>
          </div>
        ) : (
          <>
            {/* 주간 보기 */}
            {viewMode === 'week' && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                {getWeekDays().map(({ date, meal }, index) => {
                  const todayStr = new Date().toISOString().split('T')[0]!;
                  const dateObj = new Date(date);
                  const isToday = date === todayStr;

                  // 첫 번째 이미지 안전하게 꺼내기
                  const firstImage = meal && meal.images && meal.images.length > 0 ? meal.images[0] : null;

                  return (
                    <div
                      key={date}
                      className={`overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl ${
                        isToday ? 'ring-2 ring-teal-500' : ''
                      }`}
                    >
                      <div
                        className={`p-4 ${
                          isToday ? 'bg-teal-600 text-white' : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="mb-1 text-sm font-medium">{dayNames[index]}</div>
                          <div className="text-2xl font-bold">{dateObj.getDate()}</div>
                        </div>
                      </div>

                      <div className="p-4">
                        {meal ? (
                          <>
                            <div className="mb-4 space-y-3">
                              <div>
                                <div className="mb-1 text-xs font-semibold text-gray-500">🌅 아침</div>
                                <div className="line-clamp-2 whitespace-pre-line text-sm text-gray-700">
                                  {meal.breakfast || '-'}
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 text-xs font-semibold text-gray-500">☀️ 점심</div>
                                <div className="line-clamp-2 whitespace-pre-line text-sm text-gray-700">
                                  {meal.lunch || '-'}
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 text-xs font-semibold text-gray-500">🌙 저녁</div>
                                <div className="line-clamp-2 whitespace-pre-line text-sm text-gray-700">
                                  {meal.dinner || '-'}
                                </div>
                              </div>
                            </div>

                            {firstImage && (
                              <img
                                src={firstImage.url}
                                alt="급식 사진"
                                className="h-32 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
                                onClick={() => setSelectedMeal(meal)}
                              />
                            )}

                            <button
                              onClick={() => setSelectedMeal(meal)}
                              className="mt-3 w-full rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100"
                            >
                              자세히 보기
                            </button>
                          </>
                        ) : (
                          <div className="py-8 text-center text-gray-400">
                            <i className="ri-restaurant-line mb-2 text-3xl" />
                            <p className="text-sm">식단 정보가 없습니다</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 월간 보기 */}
            {viewMode === 'month' && (
              <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                {/* 요일 헤더 */}
                <div className="grid grid-cols-7 bg-gradient-to-r from-teal-500 to-teal-600">
                  {dayNames.map(day => (
                    <div key={day} className="p-4 text-center font-semibold text-white">
                      {day}
                    </div>
                  ))}
                </div>

                {/* 달력 */}
                <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
                  {getMonthDays().map(({ date, meal }, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="min-h-[120px] bg-gray-50" />;
                    }

                    const todayStr = new Date().toISOString().split('T')[0]!;
                    const dateObj = new Date(date);
                    const isToday = date === todayStr;

                    return (
                      <div
                        key={date}
                        className={`min-h-[120px] cursor-pointer p-2 transition-colors hover:bg-gray-50 ${
                          isToday ? 'bg-teal-50' : ''
                        }`}
                        onClick={() => meal && setSelectedMeal(meal)}
                      >
                        <div className={`mb-2 text-sm font-semibold ${isToday ? 'text-teal-600' : 'text-gray-700'}`}>
                          {dateObj.getDate()}
                        </div>

                        {meal ? (
                          <div className="space-y-1 text-xs text-gray-600">
                            {meal.breakfast && <div className="line-clamp-1">🌅 {meal.breakfast.split('\n')[0]}</div>}
                            {meal.lunch && <div className="line-clamp-1">☀️ {meal.lunch.split('\n')[0]}</div>}
                            {meal.dinner && <div className="line-clamp-1">🌙 {meal.dinner.split('\n')[0]}</div>}
                            {meal.images && meal.images.length > 0 && (
                              <div className="mt-1 flex items-center gap-1 text-xs text-teal-600">
                                <i className="ri-image-line" />
                                <span>{meal.images.length}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">-</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 상세 모달 */}
      {selectedMeal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedMeal(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1 text-2xl font-bold">
                    {new Date(selectedMeal.date).getMonth() + 1}월 {new Date(selectedMeal.date).getDate()}일 (
                    {dayNames[new Date(selectedMeal.date).getDay()]})
                  </h3>
                  <p className="text-teal-100">담당: {selectedMeal.nutrition_manager}</p>
                </div>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
                >
                  <i className="ri-close-line text-2xl" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* 식단 내용 */}
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-orange-800">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200">🌅</span>
                    아침
                  </h4>
                  <p className="whitespace-pre-line text-gray-700">{selectedMeal.breakfast || '-'}</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-amber-800">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200">☀️</span>
                    점심
                  </h4>
                  <p className="whitespace-pre-line text-gray-700">{selectedMeal.lunch || '-'}</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-indigo-800">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200">🌙</span>
                    저녁
                  </h4>
                  <p className="whitespace-pre-line text-gray-700">{selectedMeal.dinner || '-'}</p>
                </div>
              </div>

              {/* 메모 */}
              {selectedMeal.memo && (
                <div className="mb-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-information-line mt-0.5 text-xl text-amber-600" />
                    <div>
                      <h5 className="mb-1 font-semibold text-amber-900">메모</h5>
                      <p className="text-gray-700">{selectedMeal.memo}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 이미지들 */}
              {selectedMeal.images && selectedMeal.images.length > 0 && (
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                    <i className="ri-image-line text-teal-600" />
                    오늘의 급식 사진
                  </h4>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {selectedMeal.images.map(img => (
                      <div key={img.id} className="group relative">
                        <img
                          src={img.url}
                          alt="급식 사진"
                          className="h-48 w-full cursor-pointer rounded-lg object-cover transition-opacity group-hover:opacity-90"
                          onClick={() => setSelectedImage(img.url)}
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 transition-colors group-hover:bg-black/20">
                          <i className="ri-zoom-in-line text-2xl text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
          >
            <i className="ri-close-line text-2xl text-white" />
          </button>
          <img
            src={selectedImage}
            alt="급식 사진 확대"
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
