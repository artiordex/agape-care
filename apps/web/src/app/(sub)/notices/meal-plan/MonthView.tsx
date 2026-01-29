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
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b-2 border-gray-300 bg-gray-50">
        {dayNames.map(day => (
          <div key={day} className="border-r border-gray-200 p-3 text-center font-bold text-gray-700 last:border-r-0">
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
                className="min-h-[200px] border-b border-r border-gray-200 bg-gray-50 last:border-r-0"
              />
            );
          }

          const dateObj = new Date(date);
          const isToday = date === todayStr;

          return (
            <div
              key={date}
              className={`min-h-[200px] cursor-pointer border-b border-r border-gray-200 p-2 transition-colors last:border-r-0 hover:bg-gray-50 ${
                isToday ? 'bg-teal-50' : ''
              }`}
              onClick={() => meal && onMealClick(meal)}
            >
              <div className={`mb-2 text-sm font-bold ${isToday ? 'text-teal-600' : 'text-gray-700'}`}>
                {dateObj.getDate()}
              </div>

              {meal ? (
                <div className="space-y-2">
                  {/* 오전간식 */}
                  {meal.morning_snack && (
                    <div className="rounded border border-gray-200 bg-white p-1.5">
                      <div className="mb-0.5 text-[10px] font-semibold text-gray-600">오전간식</div>
                      <div className="text-[10px] leading-tight text-gray-700">
                        {meal.morning_snack.split('\n').map((item, i) => (
                          <div key={i} className="truncate">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 점심 */}
                  {meal.lunch && (
                    <div className="rounded border border-gray-200 bg-amber-50 p-1.5">
                      <div className="mb-0.5 text-[10px] font-semibold text-gray-600">점심</div>
                      <div className="text-[10px] leading-tight text-gray-700">
                        {meal.lunch
                          .split('\n')
                          .slice(0, 3)
                          .map((item, i) => (
                            <div key={i} className="truncate">
                              {item}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 오후간식 */}
                  {meal.afternoon_snack && (
                    <div className="rounded border border-gray-200 bg-white p-1.5">
                      <div className="mb-0.5 text-[10px] font-semibold text-gray-600">오후간식</div>
                      <div className="text-[10px] leading-tight text-gray-700">
                        {meal.afternoon_snack.split('\n').map((item, i) => (
                          <div key={i} className="truncate">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 저녁 */}
                  {meal.dinner && (
                    <div className="rounded border border-gray-200 bg-white p-1.5">
                      <div className="mb-0.5 text-[10px] font-semibold text-gray-600">저녁</div>
                      <div className="text-[10px] leading-tight text-gray-700">
                        {meal.dinner
                          .split('\n')
                          .slice(0, 3)
                          .map((item, i) => (
                            <div key={i} className="truncate">
                              {item}
                            </div>
                          ))}
                      </div>
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
