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

export default function MonthView({ monthDays, onMealClick }: Props) {
  const todayStr = new Date().toISOString().split('T')[0]!;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b-2 border-gray-900 bg-gray-50">
        {dayNames.map(day => (
          <div key={day} className="border-r border-gray-200 p-4 text-center font-bold text-gray-700 last:border-r-0">
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
                className="min-h-[140px] border-b border-r border-gray-200 bg-gray-50 last:border-r-0"
              />
            );
          }

          const dateObj = new Date(date);
          const isToday = date === todayStr;

          return (
            <div
              key={date}
              className={`min-h-[140px] cursor-pointer border-b border-r border-gray-200 p-2 transition-colors last:border-r-0 hover:bg-gray-50 ${
                isToday ? 'bg-teal-50' : ''
              }`}
              onClick={() => meal && onMealClick(meal)}
            >
              <div className={`mb-2 text-sm font-bold ${isToday ? 'text-teal-600' : 'text-gray-700'}`}>
                {dateObj.getDate()}
              </div>

              {meal ? (
                <div className="space-y-1">
                  {meal.lunch && (
                    <div className="text-[11px] leading-snug text-gray-700">
                      <div className="mb-0.5 font-semibold text-gray-600">점심</div>
                      <div className="line-clamp-2">{meal.lunch.split('\n').slice(0, 2).join(', ')}</div>
                    </div>
                  )}
                  {meal.dinner && (
                    <div className="text-[11px] leading-snug text-gray-700">
                      <div className="mb-0.5 font-semibold text-gray-600">저녁</div>
                      <div className="line-clamp-2">{meal.dinner.split('\n').slice(0, 2).join(', ')}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-xs text-gray-400">-</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
