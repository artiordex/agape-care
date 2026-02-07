/**
 * Description : MealPlanHeader.tsx - 📌 주차 계산 오류(0주차)가 해결된 식단표 헤더
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

  /**
   * 0주차 오류를 해결한 정밀 주차 계산 로직
   * 기준: 해당 주의 '목요일'이 속한 달이 그 주의 '월'이 되고,
   * 그 목요일이 해당 월의 몇 번째 목요일인지를 계산합니다.
   */
  const getCorrectWeekText = (date: Date) => {
    const target = new Date(date);
    const day = target.getDay(); // 0(일) ~ 6(토)

    // 1. 해당 주의 목요일로 날짜를 이동시킵니다.
    // (일요일인 경우 전주 목요일로 가기 위해 offset 계산)
    const diff = target.getDate() - day + (day === 0 ? -3 : 4);
    target.setDate(diff);

    const month = target.getMonth() + 1;

    // 2. 해당 목요일이 그 달의 몇 번째 날인지 확인하여 주차를 결정합니다.
    // 1~7일 사이면 1주차, 8~14일 사이면 2주차...
    const week = Math.floor((target.getDate() - 1) / 7) + 1;

    return `${month}월 ${week}주차`;
  };

  return (
    <div className="mb-10 flex flex-col items-stretch justify-between gap-6 font-['Pretendard'] lg:flex-row lg:items-end">
      {/* 왼쪽: 날짜 표시 (아가페 그린 테마) */}
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-none bg-[#5C8D5A] text-white">
          <i className="ri-restaurant-line text-3xl" />
        </div>
        <div>
          <div className="mb-1">
            <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
              Dietary Management System
            </span>
          </div>
          <h2 className="text-4xl font-medium tracking-tighter text-gray-900">
            {viewMode === 'week' ? (
              <span className="text-[#5C8D5A]">{getCorrectWeekText(currentDate)}</span>
            ) : (
              <>
                {currentDate.getFullYear()}.
                <span className="text-[#5C8D5A]">{(currentDate.getMonth() + 1).toString().padStart(2, '0')}</span>
              </>
            )}
          </h2>
        </div>
      </div>

      {/* 오른쪽 제어 컨트롤 (각진 디자인) */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-none border border-gray-100 bg-white">
          <button
            onClick={onPrev}
            className="flex h-12 w-12 items-center justify-center border-r border-gray-100 text-gray-600 transition-colors hover:bg-gray-50"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <button
            onClick={onToday}
            className="flex h-12 items-center px-6 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            오늘
          </button>
          <button
            onClick={onNext}
            className="flex h-12 w-12 items-center justify-center border-l border-gray-100 text-gray-600 transition-colors hover:bg-gray-50"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
        </div>

        {/* 뷰 모드 전환 (각진 탭) */}
        <div className="flex rounded-none border border-[#5C8D5A] bg-white p-1">
          <button
            onClick={() => onViewModeChange('week')}
            className={`flex h-10 items-center gap-2 rounded-none px-5 text-xs font-medium transition-all ${
              viewMode === 'week' ? 'bg-[#5C8D5A] text-white' : 'text-gray-400 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-week-line" />
            주간
          </button>
          <button
            onClick={() => onViewModeChange('month')}
            className={`flex h-10 items-center gap-2 rounded-none px-5 text-xs font-medium transition-all ${
              viewMode === 'month' ? 'bg-[#5C8D5A] text-white' : 'text-gray-400 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-line" />
            월간
          </button>
        </div>
      </div>
    </div>
  );
}
