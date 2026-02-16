'use client';

import clsx from 'clsx';

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
  nutrition_manager: string;
}

interface Props {
  readonly currentMonth: Date;
  readonly mealPlans: MealPlan[];
  readonly onEditClick: (date: string) => void;
  readonly onDeleteClick: (id: string) => void;
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/**
 * [Component] 월간 식단 캘린더 뷰
 * 기존 리스트 형식을 달력 그리드 형식으로 변경하여 직관적인 날짜별 관리를 지원
 */
export default function MonthlyCalendar({ currentMonth, mealPlans, onEditClick, onDeleteClick }: Props) {
  // 달력 날짜 생성 로직
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday

    const days = [];
    // 이전 달 빈칸 채우기
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: null });
    }
    // 현재 달 날짜 채우기
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ date: dateStr });
    }
    return days;
  };

  const calendarDays = getCalendarDays();
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="border border-gray-200 bg-white font-sans antialiased shadow-sm">
      {/* 1. 요일 헤더 */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {WEEKDAYS.map((day, idx) => (
          <div
            key={day}
            className={clsx(
              'py-2 text-center text-[10px] font-black tracking-widest',
              idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-500',
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 2. 달력 그리드 */}
      <div className="grid grid-cols-7 border-l border-t border-gray-200">
        {calendarDays.map((item, idx) => {
          // 빈 칸 렌더링
          if (!item.date) {
            return (
              <div key={`empty-${idx}`} className="min-h-[140px] border-b border-r border-gray-200 bg-gray-50/30" />
            );
          }

          const meal = mealPlans.find(m => m.date === item.date);
          const dayNum = parseInt(item.date!.split('-')[2] ?? '1', 10);
          const isSunday = idx % 7 === 0;
          const isSaturday = idx % 7 === 6;
          const isToday = item.date === todayStr;

          return (
            <div
              key={item.date}
              onClick={() => onEditClick(item.date as string)}
              className={clsx(
                'group relative min-h-[140px] cursor-pointer border-b border-r border-gray-200 p-2 transition-all',
                isToday ? 'bg-blue-50/30' : 'bg-white hover:bg-emerald-50/30',
              )}
            >
              {/* 날짜 표시 */}
              <div className="mb-2 flex items-start justify-between">
                <span
                  className={clsx(
                    'font-mono text-[12px] font-black leading-none',
                    isSunday ? 'text-red-500' : isSaturday ? 'text-blue-500' : 'text-gray-700',
                    isToday && 'rounded bg-blue-600 px-1.5 py-0.5 text-white',
                  )}
                >
                  {dayNum}
                </span>
                {/* 편집 아이콘 (호버 시 표시) */}
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  <i className="ri-edit-circle-fill text-lg text-[#5C8D5A]"></i>
                </div>
              </div>

              {/* 식단 내용 Summary */}
              <div className="space-y-1.5">
                {meal ? (
                  <>
                    {meal.breakfast?.menu && (
                      <div className="flex gap-1.5 text-[10px] leading-tight text-gray-700">
                        <span className="shrink-0 text-[9px] font-bold uppercase text-[#5C8D5A]">B</span>
                        <span className="truncate">{meal.breakfast.menu}</span>
                      </div>
                    )}
                    {meal.lunch?.menu && (
                      <div className="flex gap-1.5 text-[10px] leading-tight text-gray-700">
                        <span className="shrink-0 text-[9px] font-bold uppercase text-[#5C8D5A]">L</span>
                        <span className="truncate">{meal.lunch.menu}</span>
                      </div>
                    )}
                    {meal.dinner?.menu && (
                      <div className="flex gap-1.5 text-[10px] leading-tight text-gray-700">
                        <span className="shrink-0 text-[9px] font-bold uppercase text-[#5C8D5A]">D</span>
                        <span className="truncate">{meal.dinner.menu}</span>
                      </div>
                    )}
                    {(meal.morningSnack || meal.afternoonSnack) && (
                      <div className="mt-1.5 flex gap-1.5 border-t border-dashed border-gray-100 pt-1.5 text-[10px] leading-tight text-gray-500">
                        <span className="shrink-0 text-[9px] font-bold uppercase text-orange-400">S</span>
                        <span className="truncate">
                          {[meal.morningSnack, meal.afternoonSnack].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-20 items-center justify-center">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300 transition-colors group-hover:text-[#5C8D5A]">
                      No Meal Plan
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
