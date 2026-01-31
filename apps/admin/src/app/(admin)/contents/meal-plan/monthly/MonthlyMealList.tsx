'use client';

import React from 'react';

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
  readonly monthPlans: MealPlan[];
  readonly onEditClick: (date: string) => void;
}

/**
 * [Component] 월간 식단 누적 리스트 테이블
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세서 스타일 적용
 */
export default function MonthlyMealList({ monthPlans, onEditClick }: Props) {
  // 데이터 부재 시 대기 화면
  if (monthPlans.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center border border-blue-400 bg-white">
        <i className="ri-database-2-line mb-2 text-4xl text-gray-200"></i>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          해당 월에 등록된 식단 데이터가 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-blue-400 bg-white font-sans antialiased shadow-sm">
      {/* 테이블 섹션 헤더 */}
      <div className="flex items-center justify-between border-b border-blue-400 bg-blue-50 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[11px] font-black uppercase tracking-tight text-blue-900">
            월간 식단 누적 데이터 리스트
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold text-blue-400">
          <span className="flex items-center gap-1">
            <i className="ri-list-check"></i> Total: {monthPlans.length} Days
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[11px]">
          {/* 고밀도 테이블 헤더 */}
          <thead className="sticky top-0 z-10 border-b-2 border-blue-400 bg-blue-50 text-[10px] font-black uppercase tracking-tighter text-blue-900">
            <tr>
              <th className="border-r border-blue-400 p-2">날짜</th>
              <th className="border-r border-blue-400 p-2">아침 식단</th>
              <th className="border-r border-blue-400 p-2">칼로리</th>
              <th className="border-r border-blue-400 p-2">점심 식단</th>
              <th className="border-r border-blue-400 p-2">칼로리</th>
              <th className="border-r border-blue-400 p-2">저녁 식단</th>
              <th className="border-r border-blue-400 p-2">칼로리</th>
              <th className="border-r border-blue-400 p-2">간식 (AM/PM)</th>
              <th className="border-r border-blue-400 p-2">담당자</th>
              <th className="p-2">제어</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {monthPlans.map(plan => (
              <tr key={plan.id} className="group transition-colors hover:bg-emerald-50/30">
                {/* 1. 날짜 정보 */}
                <td className="border-r border-blue-400 p-2 text-center font-mono text-[11px] font-black text-blue-900">
                  {plan.date}
                </td>

                {/* 2~7. 식단 및 칼로리 수치 (Agape-Standard 컬러 적용) */}
                <td className="border-r border-blue-200 p-2 text-[10px] leading-tight">{plan.breakfast.menu || '-'}</td>
                <td className="border-r border-blue-200 bg-yellow-50/30 p-2 text-center font-mono font-bold text-orange-700">
                  {plan.breakfast.calories ? `${plan.breakfast.calories} Kcal` : '-'}
                </td>
                <td className="border-r border-blue-200 p-2 text-[10px] leading-tight">{plan.lunch.menu || '-'}</td>
                <td className="border-r border-blue-200 bg-yellow-50/30 p-2 text-center font-mono font-bold text-orange-700">
                  {plan.lunch.calories ? `${plan.lunch.calories} Kcal` : '-'}
                </td>
                <td className="border-r border-blue-200 p-2 text-[10px] leading-tight">{plan.dinner.menu || '-'}</td>
                <td className="border-r border-blue-200 bg-yellow-50/30 p-2 text-center font-mono font-bold text-orange-700">
                  {plan.dinner.calories ? `${plan.dinner.calories} Kcal` : '-'}
                </td>

                {/* 8. 간식 정보 */}
                <td className="border-r border-blue-200 bg-green-50/20 p-2 text-[10px]">
                  {plan.morningSnack && (
                    <div className="flex items-center gap-1">
                      <span className="font-black text-emerald-600">AM:</span> {plan.morningSnack}
                    </div>
                  )}
                  {plan.afternoonSnack && (
                    <div className="mt-0.5 flex items-center gap-1">
                      <span className="font-black text-emerald-600">PM:</span> {plan.afternoonSnack}
                    </div>
                  )}
                  {!plan.morningSnack && !plan.afternoonSnack && '-'}
                </td>

                {/* 9. 담당 영양사 */}
                <td className="border-r border-blue-400 p-2 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-black leading-none text-gray-800">{plan.nutrition_manager}</span>
                    <span className="mt-1 text-[8px] font-bold uppercase tracking-tighter text-gray-300">
                      Dietician
                    </span>
                  </div>
                </td>

                {/* 10. 제어 액션 */}
                <td className="p-2 text-center">
                  <button
                    onClick={() => onEditClick(plan.date)}
                    className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A] hover:shadow-sm"
                  >
                    상세수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
