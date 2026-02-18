/**
 * Description : MonthTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

interface MealImage {
  id: string;
  url: string;
  uploadedAt: string;
}

interface MealPlan {
  id: string;
  date: string;
  breakfast: string;
  morning_snack: string;
  lunch: string;
  afternoon_snack: string;
  dinner: string;
  memo?: string;
  nutrition_manager: string;
  images: MealImage[];
}

interface Props {
  monthDays: { date: string | null; meal: MealPlan | null }[];
  onMealClick: (meal: MealPlan) => void;
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function MonthTab({ monthDays, onMealClick }: Props) {
  const todayStr = new Date().toISOString().split('T')[0]!;

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b-2 border-[#5C8D5A]/30 bg-[#5C8D5A]/5">
        {dayNames.map((day, idx) => (
          <div
            key={day}
            className={`border-r border-[#5C8D5A]/20 p-3 text-center font-bold last:border-r-0 ${
              idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 */}
      <div className="grid grid-cols-7">
        {monthDays.map(({ date, meal }, index) => {
          if (!date) {
            return (
              <div
                key={`empty-${index}`}
                className="min-h-[200px] border-b border-r border-[#5C8D5A]/10 bg-gray-50 last:border-r-0"
              />
            );
          }

          const dateObj = new Date(date);
          const isToday = date === todayStr;
          const dayOfWeek = dateObj.getDay();

          return (
            <div
              key={date}
              className={`min-h-[200px] cursor-pointer border-b border-r border-[#5C8D5A]/10 p-2 transition-colors last:border-r-0 hover:bg-[#5C8D5A]/5 ${
                isToday ? 'bg-[#5C8D5A]/10' : ''
              }`}
              onClick={() => meal && onMealClick(meal)}
            >
              <div
                className={`mb-2 text-sm font-bold ${
                  isToday
                    ? 'text-[#5C8D5A]'
                    : dayOfWeek === 0
                      ? 'text-red-500'
                      : dayOfWeek === 6
                        ? 'text-blue-500'
                        : 'text-gray-700'
                }`}
              >
                {dateObj.getDate()}
              </div>

              {meal ? (
                <div className="space-y-1 text-center text-sm leading-relaxed text-gray-700">
                  {/* 아침 */}
                  {meal.breakfast && (
                    <div className="border-b border-[#5C8D5A]/20 pb-1">
                      <div className="mb-0.5 font-semibold text-[#5C8D5A]">아침</div>
                      {meal.breakfast.split(/,\s*|\n/).map((item, i) => (
                        <div key={i}>{item}</div>
                      ))}
                    </div>
                  )}

                  {/* 오전간식 */}
                  {meal.morning_snack && (
                    <div className="border-b border-[#5C8D5A]/20 pb-1">
                      <div className="mb-0.5 font-semibold text-[#5C8D5A]">오전간식</div>
                      {meal.morning_snack.split(/,\s*|\n/).map((item, i) => (
                        <div key={i}>{item}</div>
                      ))}
                    </div>
                  )}

                  {/* 점심 */}
                  {meal.lunch && (
                    <div className="border-b border-[#5C8D5A]/20 pb-1">
                      <div className="mb-0.5 font-semibold text-[#5C8D5A]">점심</div>
                      {meal.lunch.split(/,\s*|\n/).map((item, i) => (
                        <div key={i} className="text-gray-900">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 오후간식 */}
                  {meal.afternoon_snack && (
                    <div className="border-b border-[#5C8D5A]/20 pb-1">
                      <div className="mb-0.5 font-semibold text-[#5C8D5A]">오후간식</div>
                      {meal.afternoon_snack.split(/,\s*|\n/).map((item, i) => (
                        <div key={i}>{item}</div>
                      ))}
                    </div>
                  )}

                  {/* 저녁 */}
                  {meal.dinner && (
                    <div className="pb-1">
                      <div className="mb-0.5 font-semibold text-[#5C8D5A]">저녁</div>
                      {meal.dinner.split(/,\s*|\n/).map((item, i) => (
                        <div key={i} className="text-gray-900">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-sm text-gray-400">-</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
