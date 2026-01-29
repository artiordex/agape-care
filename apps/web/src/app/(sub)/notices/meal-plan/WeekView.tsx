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
  weekDays: { date: string; meal: MealPlan | null }[];
  onMealClick: (meal: MealPlan) => void;
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeekView({ weekDays, onMealClick }: Props) {
  const todayStr = new Date().toISOString().split('T')[0]!;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      {/* 헤더 - 요일 */}
      <div className="grid grid-cols-8 border-b-2 border-gray-300 bg-gray-50">
        <div className="border-r border-gray-200 p-4">
          <div className="text-center text-sm font-bold text-gray-900">구분</div>
        </div>
        {weekDays.map(({ date }, index) => {
          const dateObj = new Date(date);
          const isToday = date === todayStr;

          return (
            <div key={date} className={`border-r border-gray-200 p-4 last:border-r-0 ${isToday ? 'bg-teal-50' : ''}`}>
              <div className="text-center">
                <div className={`text-xs font-semibold ${isToday ? 'text-teal-600' : 'text-gray-500'}`}>
                  {dayNames[index]}
                </div>
                <div className={`mt-1 text-lg font-bold ${isToday ? 'text-teal-600' : 'text-gray-900'}`}>
                  {dateObj.getDate()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 식사별 행 */}
      <div className="divide-y divide-gray-200">
        {/* 아침 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200 bg-gray-50 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">아침</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`breakfast-${date}`}
                className={`cursor-pointer border-r border-gray-200 p-3 transition-colors last:border-r-0 hover:bg-gray-50 ${
                  isToday ? 'bg-teal-50/50' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-xs leading-relaxed text-gray-700">
                  {meal?.breakfast ? (
                    meal.breakfast.split('\n').map((item, i) => (
                      <div key={i} className="truncate">
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 오전간식 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200 bg-gray-50 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">오전간식</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`morning-snack-${date}`}
                className={`cursor-pointer border-r border-gray-200 p-3 transition-colors last:border-r-0 hover:bg-gray-50 ${
                  isToday ? 'bg-teal-50/50' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-xs leading-relaxed text-gray-700">
                  {meal?.morning_snack ? (
                    meal.morning_snack.split('\n').map((item, i) => (
                      <div key={i} className="truncate">
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 점심 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200 bg-gray-50 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">점심</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`lunch-${date}`}
                className={`cursor-pointer border-r border-gray-200 p-3 transition-colors last:border-r-0 hover:bg-gray-50 ${
                  isToday ? 'bg-teal-50/50' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-xs leading-relaxed text-gray-700">
                  {meal?.lunch ? (
                    meal.lunch.split('\n').map((item, i) => (
                      <div key={i} className="truncate">
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 오후간식 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200 bg-gray-50 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">오후간식</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`afternoon-snack-${date}`}
                className={`cursor-pointer border-r border-gray-200 p-3 transition-colors last:border-r-0 hover:bg-gray-50 ${
                  isToday ? 'bg-teal-50/50' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-xs leading-relaxed text-gray-700">
                  {meal?.afternoon_snack ? (
                    meal.afternoon_snack.split('\n').map((item, i) => (
                      <div key={i} className="truncate">
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 저녁 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200 bg-gray-50 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">저녁</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`dinner-${date}`}
                className={`cursor-pointer border-r border-gray-200 p-3 transition-colors last:border-r-0 hover:bg-gray-50 ${
                  isToday ? 'bg-teal-50/50' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-xs leading-relaxed text-gray-700">
                  {meal?.dinner ? (
                    meal.dinner.split('\n').map((item, i) => (
                      <div key={i} className="truncate">
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
