'use client';

import React from 'react';
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

/**
 * [Component] 주간 식단 고밀도 ERP 그리드 테이블
 * 아가페 그린(#5C8D5A) 테마 및 인라인 편집 모드 적용
 */
export default function WeeklyMealTable({
  mealPlans,
  editingDates,
  onToggleEdit,
  onUpdateMeal,
  onUpdateSnack,
  onUpdateAllergy,
  onSave,
  onDelete,
}: Props) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="overflow-hidden border border-blue-400 bg-white font-sans antialiased shadow-sm">
      {/* 테이블 섹션 헤더 */}
      <div className="flex items-center justify-between border-b border-blue-400 bg-blue-50 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[11px] font-black uppercase tracking-tight text-blue-900">주간 식단 관리 그리드</h3>
        </div>
        <span className="text-[9px] font-bold uppercase italic tracking-widest text-blue-400">Weekly Diet Control</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[11px]">
          <thead className="bg-blue-50 text-[10px] font-black uppercase tracking-tighter text-blue-900">
            <tr className="border-b-2 border-blue-400">
              <th className="border-r border-blue-400 p-2" rowSpan={2}>
                사용
              </th>
              <th className="border-r border-blue-400 p-2" rowSpan={2}>
                날짜
              </th>
              <th className="border-b border-r border-blue-400 p-1" colSpan={2}>
                아침 식단
              </th>
              <th className="border-b border-r border-blue-400 p-1" colSpan={2}>
                점심 식단
              </th>
              <th className="border-b border-r border-blue-400 p-1" colSpan={2}>
                저녁 식단
              </th>
              <th className="border-b border-r border-blue-400 p-1" colSpan={2}>
                오전/오후 간식
              </th>
              <th className="border-b border-r border-blue-400 p-1" colSpan={2}>
                가능별 식이
              </th>
              <th className="p-2" rowSpan={2}>
                제어
              </th>
            </tr>
            <tr className="border-b-2 border-blue-400 bg-white">
              <th className="border-r border-blue-400 p-1">메뉴</th>
              <th className="border-r border-blue-400 p-1">Kcal</th>
              <th className="border-r border-blue-400 p-1">메뉴</th>
              <th className="border-r border-blue-400 p-1">Kcal</th>
              <th className="border-r border-blue-400 p-1">메뉴</th>
              <th className="border-r border-blue-400 p-1">Kcal</th>
              <th className="border-r border-blue-400 p-1 text-emerald-600">AM</th>
              <th className="border-r border-blue-400 p-1 text-emerald-600">PM</th>
              <th className="border-r border-blue-400 p-1">일반</th>
              <th className="border-r border-blue-400 p-1 text-orange-600">제한</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {mealPlans.map((meal, idx) => {
              const isEditing = editingDates.has(meal.date);
              const hasData = meal.breakfast.menu || meal.lunch.menu || meal.dinner.menu;

              return (
                <tr
                  key={meal.date}
                  className={clsx('transition-colors', isEditing ? 'bg-emerald-50/30' : 'hover:bg-gray-50')}
                >
                  {/* 1. 사용여부 체크박스 */}
                  <td className="border-r border-blue-400 bg-yellow-50/50 p-2 text-center">
                    <input type="checkbox" checked={!!hasData} readOnly className="h-3.5 w-3.5 accent-[#5C8D5A]" />
                  </td>

                  {/* 2. 날짜 정보 */}
                  <td className="border-r border-blue-400 p-2 text-center">
                    <div className="font-black text-blue-900">{days[idx]}요일</div>
                    <div className="font-mono text-[9px] font-bold text-gray-400">{meal.date}</div>
                  </td>

                  {/* 3~8. 아침/점심/저녁 식단 및 칼로리 */}
                  {(['breakfast', 'lunch', 'dinner'] as const).map(type => (
                    <React.Fragment key={type}>
                      <td className="border-r border-blue-200 p-1">
                        {isEditing ? (
                          <textarea
                            rows={3}
                            value={meal[type].menu}
                            onChange={e => onUpdateMeal(idx, type, 'menu', e.target.value)}
                            className="w-full min-w-[100px] border border-blue-300 p-1 text-[10px] outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                          />
                        ) : (
                          <div className="min-h-[2.5rem] whitespace-pre-wrap leading-tight">
                            {meal[type].menu || '-'}
                          </div>
                        )}
                      </td>
                      <td className="border-r border-blue-200 bg-yellow-50/30 p-1 text-center font-bold text-orange-700">
                        {isEditing ? (
                          <input
                            type="text"
                            value={meal[type].calories}
                            onChange={e => onUpdateMeal(idx, type, 'calories', e.target.value)}
                            className="w-12 border border-blue-300 p-1 text-center text-[10px] outline-none focus:border-[#5C8D5A]"
                          />
                        ) : (
                          meal[type].calories || '-'
                        )}
                      </td>
                    </React.Fragment>
                  ))}

                  {/* 9~10. 간식 (AM/PM) */}
                  {(['morningSnack', 'afternoonSnack'] as const).map(type => (
                    <td key={type} className="border-r border-blue-200 bg-green-50/30 p-1 text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={meal[type]}
                          onChange={e => onUpdateSnack(idx, type, e.target.value)}
                          className="w-full border border-blue-300 p-1 text-center text-[10px] outline-none focus:border-[#5C8D5A]"
                        />
                      ) : (
                        meal[type] || '-'
                      )}
                    </td>
                  ))}

                  {/* 11~12. 식이 정보 (일반/제한) */}
                  {(['possible', 'restricted'] as const).map(type => (
                    <td key={type} className="border-r border-blue-400 bg-blue-50/20 p-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={meal.allergyInfo[type].join(', ')}
                          onChange={e => onUpdateAllergy(idx, type, e.target.value)}
                          className="w-full border border-blue-300 p-1 text-[10px] outline-none focus:border-[#5C8D5A]"
                        />
                      ) : (
                        <div className="max-w-[80px] truncate" title={meal.allergyInfo[type].join(', ')}>
                          {meal.allergyInfo[type].join(', ') || '-'}
                        </div>
                      )}
                    </td>
                  ))}

                  {/* 13. 제어 액션 */}
                  <td className="p-1">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => (isEditing ? onSave(idx) : onToggleEdit(meal.date))}
                        className={clsx(
                          'rounded px-2 py-1 text-[10px] font-black shadow-sm transition-all',
                          isEditing
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border border-gray-300 bg-white text-gray-600 hover:border-[#5C8D5A] hover:text-[#5C8D5A]',
                        )}
                      >
                        {isEditing ? '저장' : '수정'}
                      </button>
                      {isEditing ? (
                        <button
                          onClick={() => onToggleEdit(meal.date)}
                          className="rounded border border-gray-300 bg-white py-1 text-[10px] font-bold text-gray-400 hover:bg-gray-50"
                        >
                          취소
                        </button>
                      ) : (
                        hasData && (
                          <button
                            onClick={() => onDelete(idx)}
                            className="rounded border border-red-100 bg-red-50 py-1 text-[10px] font-bold text-red-500 hover:bg-red-100"
                          >
                            삭제
                          </button>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
