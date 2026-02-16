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
  allergyInfo: {
    possible: string[];
    restricted: string[];
  };
}

interface Props {
  readonly mealPlans: MealPlan[];
  readonly editingDates: Set<string>;
  readonly onToggleEdit: (date: string) => void;
  readonly onUpdateMeal: (
    idx: number,
    type: 'breakfast' | 'lunch' | 'dinner',
    field: 'menu' | 'calories',
    value: string,
  ) => void;
  readonly onUpdateSnack: (idx: number, type: 'morningSnack' | 'afternoonSnack', value: string) => void;
  readonly onUpdateAllergy: (idx: number, type: 'possible' | 'restricted', value: string) => void;
  readonly onSave: (idx: number) => void;
  readonly onDelete: (idx: number) => void;
}

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

/**
 * [Component] 주간 식단 캘린더 (수직형)
 * 요일별 카드를 수직으로 배치하여 캘린더 형태의 시각적 흐름 제공
 */
export default function WeeklyCalendar({
  mealPlans,
  editingDates,
  onToggleEdit,
  onUpdateMeal,
  onUpdateSnack,
  onUpdateAllergy,
  onSave,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto border border-gray-200 bg-white font-sans antialiased shadow-sm">
      <div className="min-w-[1200px]">
        {/* 1. 요일 헤더 */}
        <div className="grid grid-cols-7 border-b-2 border-[#5C8D5A] bg-gray-50">
          {mealPlans.map((plan, idx) => (
            <div
              key={plan.date}
              className={clsx(
                'border-r border-gray-200 py-3 text-center last:border-r-0',
                idx === 0 || idx === 6 ? 'text-gray-600' : 'text-gray-700',
              )}
            >
              <div className="text-[14px] font-black">{WEEKDAYS[idx]}</div>
              <div className="font-mono text-[10px] text-gray-500">{plan.date}</div>
            </div>
          ))}
        </div>

        {/* 2. 컨텐츠 바디 */}
        <div className="grid grid-cols-7 divide-x divide-gray-200">
          {mealPlans.map((plan, idx) => {
            const isEditing = editingDates.has(plan.date);

            return (
              <div
                key={plan.date}
                className={clsx(
                  'group relative flex min-h-[500px] flex-col gap-3 p-3 transition-colors',
                  isEditing ? 'bg-blue-50/30' : 'bg-white hover:bg-gray-50',
                )}
              >
                {/* 컨트롤 버튼 (상단) */}
                <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => (isEditing ? onSave(idx) : onToggleEdit(plan.date))}
                    className="rounded-full border border-gray-200 bg-white p-1.5 shadow hover:border-[#5C8D5A] hover:text-[#5C8D5A]"
                    title={isEditing ? '저장' : '수정'}
                  >
                    <i className={isEditing ? 'ri-save-line' : 'ri-edit-line'}></i>
                  </button>
                </div>

                {/* 아침 */}
                <div className="space-y-1">
                  <span className="mb-1 block border-b border-[#5C8D5A]/20 pb-0.5 text-[10px] font-black uppercase text-[#5C8D5A]">
                    Breakfast
                  </span>
                  {isEditing ? (
                    <>
                      <textarea
                        value={plan.breakfast.menu}
                        onChange={e => onUpdateMeal(idx, 'breakfast', 'menu', e.target.value)}
                        rows={3}
                        className="w-full rounded border border-gray-300 p-1.5 text-[11px] focus:border-[#5C8D5A]"
                        placeholder="메뉴 입력"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gray-400">Kcal</span>
                        <input
                          value={plan.breakfast.calories}
                          onChange={e => onUpdateMeal(idx, 'breakfast', 'calories', e.target.value)}
                          className="w-full rounded border border-gray-300 p-1 text-center text-[10px]"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="min-h-[60px] whitespace-pre-wrap text-[11px] leading-tight text-gray-700">
                      {plan.breakfast.menu || '-'}
                      {plan.breakfast.calories && (
                        <div className="mt-1 text-right font-mono text-[9px] text-orange-400">
                          {plan.breakfast.calories} Kcal
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 점심 */}
                <div className="space-y-1 border-t border-dashed border-gray-200 pt-2">
                  <span className="mb-1 block border-b border-[#5C8D5A]/20 pb-0.5 text-[10px] font-black uppercase text-[#5C8D5A]">
                    Lunch
                  </span>
                  {isEditing ? (
                    <>
                      <textarea
                        value={plan.lunch.menu}
                        onChange={e => onUpdateMeal(idx, 'lunch', 'menu', e.target.value)}
                        rows={3}
                        className="w-full rounded border border-gray-300 p-1.5 text-[11px] focus:border-[#5C8D5A]"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gray-400">Kcal</span>
                        <input
                          value={plan.lunch.calories}
                          onChange={e => onUpdateMeal(idx, 'lunch', 'calories', e.target.value)}
                          className="w-full rounded border border-gray-300 p-1 text-center text-[10px]"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="min-h-[60px] whitespace-pre-wrap text-[11px] leading-tight text-gray-700">
                      {plan.lunch.menu || '-'}
                      {plan.lunch.calories && (
                        <div className="mt-1 text-right font-mono text-[9px] text-orange-400">
                          {plan.lunch.calories} Kcal
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 저녁 */}
                <div className="space-y-1 border-t border-dashed border-gray-200 pt-2">
                  <span className="mb-1 block border-b border-[#5C8D5A]/20 pb-0.5 text-[10px] font-black uppercase text-[#5C8D5A]">
                    Dinner
                  </span>
                  {isEditing ? (
                    <>
                      <textarea
                        value={plan.dinner.menu}
                        onChange={e => onUpdateMeal(idx, 'dinner', 'menu', e.target.value)}
                        rows={3}
                        className="w-full rounded border border-gray-300 p-1.5 text-[11px] focus:border-[#5C8D5A]"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gray-400">Kcal</span>
                        <input
                          value={plan.dinner.calories}
                          onChange={e => onUpdateMeal(idx, 'dinner', 'calories', e.target.value)}
                          className="w-full rounded border border-gray-300 p-1 text-center text-[10px]"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="min-h-[60px] whitespace-pre-wrap text-[11px] leading-tight text-gray-700">
                      {plan.dinner.menu || '-'}
                      {plan.dinner.calories && (
                        <div className="mt-1 text-right font-mono text-[9px] text-orange-400">
                          {plan.dinner.calories} Kcal
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 간식 */}
                <div className="mt-auto space-y-1 border-t border-dashed border-gray-200 pt-2">
                  <span className="mb-1 block pb-0.5 text-[10px] font-black uppercase text-orange-500">Snacks</span>
                  {isEditing ? (
                    <div className="space-y-1">
                      <input
                        value={plan.morningSnack}
                        onChange={e => onUpdateSnack(idx, 'morningSnack', e.target.value)}
                        className="w-full rounded border border-gray-300 p-1 text-[10px]"
                        placeholder="오전 간식"
                      />
                      <input
                        value={plan.afternoonSnack}
                        onChange={e => onUpdateSnack(idx, 'afternoonSnack', e.target.value)}
                        className="w-full rounded border border-gray-300 p-1 text-[10px]"
                        placeholder="오후 간식"
                      />
                    </div>
                  ) : (
                    <div className="text-[10px] text-gray-500">
                      {[plan.morningSnack, plan.afternoonSnack].some(Boolean) ? (
                        <ul className="list-inside list-disc">
                          {plan.morningSnack && <li>AM: {plan.morningSnack}</li>}
                          {plan.afternoonSnack && <li>PM: {plan.afternoonSnack}</li>}
                        </ul>
                      ) : (
                        '-'
                      )}
                    </div>
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
