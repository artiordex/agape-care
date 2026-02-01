/**
 * Description : WeekTab.tsx - 📌 알림마당 식단표 주간 탭
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
  weekDays: { date: string; meal: MealPlan | null }[];
  onMealClick: (meal: MealPlan) => void;
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeekTab({ weekDays, onMealClick }: Props) {
  const todayStr = new Date().toISOString().split('T')[0]!;

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* 헤더 - 요일 */}
      <div className="grid grid-cols-8 border-b-2 border-[#5C8D5A]/30 bg-[#5C8D5A]/5">
        <div className="border-r border-[#5C8D5A]/20 p-4">
          <div className="text-center text-sm font-bold text-gray-900">구분</div>
        </div>
        {weekDays.map(({ date }, index) => {
          const dateObj = new Date(date);
          const isToday = date === todayStr;
          const isSunday = index === 0;
          const isSaturday = index === 6;

          return (
            <div
              key={date}
              className={`border-r border-[#5C8D5A]/20 p-4 last:border-r-0 ${isToday ? 'bg-[#5C8D5A]/10' : ''}`}
            >
              <div className="text-center">
                <div
                  className={`text-xs font-semibold ${
                    isToday
                      ? 'text-[#5C8D5A]'
                      : isSunday
                        ? 'text-red-500'
                        : isSaturday
                          ? 'text-blue-500'
                          : 'text-gray-500'
                  }`}
                >
                  {dayNames[index]}
                </div>
                <div
                  className={`mt-1 text-lg font-bold ${
                    isToday
                      ? 'text-[#5C8D5A]'
                      : isSunday
                        ? 'text-red-500'
                        : isSaturday
                          ? 'text-blue-500'
                          : 'text-gray-900'
                  }`}
                >
                  {dateObj.getDate()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 식사별 행 */}
      <div className="divide-y divide-[#5C8D5A]/10">
        {/* 아침 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">아침</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`breakfast-${date}`}
                className={`cursor-pointer border-r border-[#5C8D5A]/20 p-3 transition-colors last:border-r-0 hover:bg-[#5C8D5A]/5 ${
                  isToday ? 'bg-[#5C8D5A]/5' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-center text-sm leading-relaxed text-gray-700">
                  {meal?.breakfast ? (
                    meal.breakfast.split('\n').map((item, i) => <div key={i}>{item}</div>)
                  ) : (
                    <div className="text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 오전간식 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">오전간식</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`morning-snack-${date}`}
                className={`cursor-pointer border-r border-[#5C8D5A]/20 p-3 transition-colors last:border-r-0 hover:bg-[#5C8D5A]/5 ${
                  isToday ? 'bg-[#5C8D5A]/5' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-center text-sm leading-relaxed text-gray-700">
                  {meal?.morning_snack ? (
                    meal.morning_snack.split('\n').map((item, i) => <div key={i}>{item}</div>)
                  ) : (
                    <div className="text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 점심 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">점심</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`lunch-${date}`}
                className={`cursor-pointer border-r border-[#5C8D5A]/20 p-3 transition-colors last:border-r-0 hover:bg-[#5C8D5A]/5 ${
                  isToday ? 'bg-[#5C8D5A]/5' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-center text-sm leading-relaxed text-gray-900">
                  {meal?.lunch ? (
                    meal.lunch.split('\n').map((item, i) => (
                      <div key={i} className="font-medium">
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 오후간식 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">오후간식</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`afternoon-snack-${date}`}
                className={`cursor-pointer border-r border-[#5C8D5A]/20 p-3 transition-colors last:border-r-0 hover:bg-[#5C8D5A]/5 ${
                  isToday ? 'bg-[#5C8D5A]/5' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-center text-sm leading-relaxed text-gray-700">
                  {meal?.afternoon_snack ? (
                    meal.afternoon_snack.split('\n').map((item, i) => <div key={i}>{item}</div>)
                  ) : (
                    <div className="text-gray-400">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 저녁 */}
        <div className="grid grid-cols-8">
          <div className="border-r border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-4">
            <div className="text-center text-sm font-semibold text-gray-700">저녁</div>
          </div>
          {weekDays.map(({ date, meal }) => {
            const isToday = date === todayStr;
            return (
              <div
                key={`dinner-${date}`}
                className={`cursor-pointer border-r border-[#5C8D5A]/20 p-3 transition-colors last:border-r-0 hover:bg-[#5C8D5A]/5 ${
                  isToday ? 'bg-[#5C8D5A]/5' : ''
                }`}
                onClick={() => meal && onMealClick(meal)}
              >
                <div className="text-center text-sm leading-relaxed text-gray-900">
                  {meal?.dinner ? (
                    meal.dinner.split('\n').map((item, i) => (
                      <div key={i} className="font-medium">
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">-</div>
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
