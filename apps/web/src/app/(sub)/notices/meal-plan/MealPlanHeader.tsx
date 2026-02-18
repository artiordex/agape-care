/**
 * Description : MealPlanHeader.tsx - ?? MealPlanHeader UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

interface Props {
  currentDate: Date;
  viewMode: 'week' | 'month';
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewModeChange: (mode: 'week' | 'month') => void;
}

export default function MealPlanHeader({ currentDate, viewMode, onPrev, onNext, onToday, onViewModeChange }: Props) {
  if (!currentDate) return null;

  const getCorrectWeekText = (date: Date) => {
    const target = new Date(date);
    const day = target.getDay();
    const diff = target.getDate() - day + (day === 0 ? -3 : 4);
    target.setDate(diff);
    const month = target.getMonth() + 1;
    const week = Math.floor((target.getDate() - 1) / 7) + 1;
    return `${month}월 ${week}주차`;
  };

  const getDisplayText = () => {
    if (viewMode === 'week') {
      return getCorrectWeekText(currentDate);
    }
    return `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
  };

  const getSubTitleText = () => {
    return viewMode === 'week' ? '주간 식단표' : '월간 식단표';
  };

  return (
    <div className="mb-10 flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-end">
      {/* 왼쪽: 제목 표시 */}
      <div className="flex items-start gap-5">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            {viewMode === 'week' ? (
              <span className="text-[#5C8D5A]">{getDisplayText()}</span>
            ) : (
              <>
                {currentDate.getFullYear()}.
                <span className="text-[#5C8D5A]">{(currentDate.getMonth() + 1).toString().padStart(2, '0')}</span>
              </>
            )}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{getSubTitleText()}</p>
        </div>
      </div>

      {/* 오른쪽 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 날짜 이동 버튼 그룹 */}
        <div className="flex border border-gray-200 bg-white">
          <button
            onClick={onPrev}
            className="flex h-12 w-12 items-center justify-center border-r border-gray-100 transition-colors hover:bg-[#5C8D5A]/10"
            title={viewMode === 'week' ? '이전 주' : '이전 달'}
          >
            <i className="ri-arrow-left-s-line text-xl text-gray-600" />
          </button>

          <button
            onClick={onToday}
            className="flex h-12 items-center px-6 text-sm font-semibold text-[#5C8D5A] transition-colors hover:bg-[#5C8D5A]/10"
          >
            이번 주
          </button>

          <button
            onClick={onNext}
            className="flex h-12 w-12 items-center justify-center border-l border-gray-100 transition-colors hover:bg-[#5C8D5A]/10"
            title={viewMode === 'week' ? '다음 주' : '다음 달'}
          >
            <i className="ri-arrow-right-s-line text-xl text-gray-600" />
          </button>
        </div>

        {/* 뷰 모드 전환 */}
        <div className="flex border border-[#5C8D5A] bg-white p-1">
          <button
            onClick={() => onViewModeChange('week')}
            className={`flex h-10 items-center gap-2 px-5 text-sm font-bold transition-colors ${
              viewMode === 'week' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-todo-line" /> 주간
          </button>

          <button
            onClick={() => onViewModeChange('month')}
            className={`flex h-10 items-center gap-2 px-5 text-sm font-bold transition-colors ${
              viewMode === 'month' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-fill" /> 월간
          </button>
        </div>
      </div>
    </div>
  );
}
