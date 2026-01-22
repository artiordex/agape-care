
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

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

  useEffect(() => {
    fetchMealPlans();
  }, [currentMonth]);

  const fetchMealPlans = async () => {
    setLoading(true);
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (!error && data) {
      setMealPlans(data);
    }
    setLoading(false);
  };

  const getWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const meal = mealPlans.find(m => m.date === dateStr);
      days.push({ date: dateStr, meal });
    }
    return days;
  };

  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = 0; i < startDay; i++) {
      days.push({ date: '', meal: null });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      const meal = mealPlans.find(m => m.date === dateStr);
      days.push({ date: dateStr, meal });
    }
    
    return days;
  };

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <i className="ri-restaurant-2-line text-5xl"></i>
            </div>
            <h1 className="text-5xl font-bold mb-4">식단표</h1>
            <p className="text-xl text-teal-100">
              영양사가 정성껏 준비한 건강한 식단을 확인하세요
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Month Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
              <h3 className="text-xl font-bold text-gray-800 min-w-[150px] text-center">
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <i className="ri-arrow-right-line"></i>
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors whitespace-nowrap"
              >
                이번 달
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-6 py-2 rounded-lg transition-all whitespace-nowrap ${
                  viewMode === 'week'
                    ? 'bg-white text-teal-600 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="ri-calendar-line mr-2"></i>
                주간 보기
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-6 py-2 rounded-lg transition-all whitespace-nowrap ${
                  viewMode === 'month'
                    ? 'bg-white text-teal-600 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="ri-calendar-2-line mr-2"></i>
                월간 보기
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">식단표를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* Week View */}
            {viewMode === 'week' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                {getWeekDays().map(({ date, meal }, index) => {
                  const dateObj = new Date(date);
                  const isToday = date === new Date().toISOString().split('T')[0];

                  return (
                    <div
                      key={date}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                        isToday ? 'ring-2 ring-teal-500' : ''
                      }`}
                    >
                      <div className={`p-4 ${isToday ? 'bg-teal-600 text-white' : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'}`}>
                        <div className="text-center">
                          <div className="text-sm font-medium mb-1">{dayNames[index]}</div>
                          <div className="text-2xl font-bold">{dateObj.getDate()}</div>
                        </div>
                      </div>

                      <div className="p-4">
                        {meal ? (
                          <>
                            <div className="space-y-3 mb-4">
                              <div>
                                <div className="text-xs font-semibold text-gray-500 mb-1">🌅 아침</div>
                                <div className="text-sm text-gray-700 whitespace-pre-line line-clamp-2">
                                  {meal.breakfast || '-'}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-500 mb-1">☀️ 점심</div>
                                <div className="text-sm text-gray-700 whitespace-pre-line line-clamp-2">
                                  {meal.lunch || '-'}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-500 mb-1">🌙 저녁</div>
                                <div className="text-sm text-gray-700 whitespace-pre-line line-clamp-2">
                                  {meal.dinner || '-'}
                                </div>
                              </div>
                            </div>

                            {meal.images && meal.images.length > 0 && (
                              <div className="mb-3">
                                <img
                                  src={meal.images[0].url}
                                  alt="급식 사진"
                                  className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => setSelectedMeal(meal)}
                                />
                                {meal.images.length > 1 && (
                                  <div className="text-xs text-gray-500 text-center mt-1">
                                    +{meal.images.length - 1}장 더보기
                                  </div>
                                )}
                              </div>
                            )}

                            <button
                              onClick={() => setSelectedMeal(meal)}
                              className="w-full px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium whitespace-nowrap"
                            >
                              자세히 보기
                            </button>
                          </>
                        ) : (
                          <div className="text-center py-8 text-gray-400">
                            <i className="ri-restaurant-line text-3xl mb-2"></i>
                            <p className="text-sm">식단 정보가 없습니다</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Month View */}
            {viewMode === 'month' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 bg-gradient-to-r from-teal-500 to-teal-600">
                  {dayNames.map((day) => (
                    <div key={day} className="p-4 text-center text-white font-semibold">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Body */}
                <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
                  {getMonthDays().map(({ date, meal }, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="bg-gray-50 min-h-[120px]"></div>;
                    }

                    const dateObj = new Date(date);
                    const isToday = date === new Date().toISOString().split('T')[0];

                    return (
                      <div
                        key={date}
                        className={`min-h-[120px] p-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                          isToday ? 'bg-teal-50' : ''
                        }`}
                        onClick={() => meal && setSelectedMeal(meal)}
                      >
                        <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-teal-600' : 'text-gray-700'}`}>
                          {dateObj.getDate()}
                        </div>

                        {meal ? (
                          <div className="space-y-1">
                            {meal.breakfast && (
                              <div className="text-xs text-gray-600 line-clamp-1">
                                🌅 {meal.breakfast.split('\n')[0]}
                              </div>
                            )}
                            {meal.lunch && (
                              <div className="text-xs text-gray-600 line-clamp-1">
                                ☀️ {meal.lunch.split('\n')[0]}
                              </div>
                            )}
                            {meal.dinner && (
                              <div className="text-xs text-gray-600 line-clamp-1">
                                🌙 {meal.dinner.split('\n')[0]}
                              </div>
                            )}
                            {meal.images && meal.images.length > 0 && (
                              <div className="flex items-center gap-1 text-xs text-teal-600 mt-1">
                                <i className="ri-image-line"></i>
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

      {/* Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMeal(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {new Date(selectedMeal.date).getMonth() + 1}월 {new Date(selectedMeal.date).getDate()}일 ({dayNames[new Date(selectedMeal.date).getDay()]})
                  </h3>
                  <p className="text-teal-100">담당: {selectedMeal.nutrition_manager}</p>
                </div>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Meals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">🌅</span>
                    아침
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{selectedMeal.breakfast || '-'}</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">☀️</span>
                    점심
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{selectedMeal.lunch || '-'}</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center">🌙</span>
                    저녁
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{selectedMeal.dinner || '-'}</p>
                </div>
              </div>

              {/* Memo */}
              {selectedMeal.memo && (
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="ri-information-line text-amber-600 text-xl mt-0.5"></i>
                    <div>
                      <h5 className="font-semibold text-amber-900 mb-1">메모</h5>
                      <p className="text-gray-700">{selectedMeal.memo}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Images */}
              {selectedMeal.images && selectedMeal.images.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="ri-image-line text-teal-600"></i>
                    오늘의 급식 사진
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedMeal.images.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url}
                          alt="급식 사진"
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedImage(img.url)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                          <i className="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
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

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4" onClick={() => setSelectedImage(null)}>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-close-line text-white text-2xl"></i>
          </button>
          <img
            src={selectedImage}
            alt="급식 사진 확대"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
