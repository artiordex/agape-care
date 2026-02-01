/**
 * Description : MealPlanHeader.tsx - 📌 알림마당 식단표 헤더
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

interface Props {
  currentDate: Date;
  viewMode: 'week' | 'month';
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewModeChange: (mode: 'week' | 'month') => void;
}

export default function MealPlanHeader({ currentDate, viewMode, onPrev, onNext, onToday, onViewModeChange }: Props) {
  // currentDate가 undefined인 경우 대비
  if (!currentDate) {
    return null;
  }

  // 주간 보기일 때는 "M월 N주차", 월간 보기일 때는 "YYYY년 M월" 표시
  const getDisplayText = () => {
    if (viewMode === 'week') {
      const month = currentDate.getMonth() + 1;
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const dayOfMonth = currentDate.getDate();
      const weekOfMonth = Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
      return `${month}월 ${weekOfMonth}주차`;
    } else {
      return `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
    }
  };

  return (
    <div className="mb-10 flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-end">
      {/* 왼쪽: 월 표시 */}
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center bg-[#5C8D5A] text-white">
          <i className="ri-restaurant-line text-3xl" />
        </div>
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
          <p className="mt-1 text-sm text-gray-500">{viewMode === 'week' ? '주간 급식 식단표' : '월간 급식 식단표'}</p>
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
            className={`flex h-10 items-center gap-2 px-5 text-sm transition-colors ${
              viewMode === 'week' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-week-fill" />
            주간 보기
          </button>

          <button
            onClick={() => onViewModeChange('month')}
            className={`flex h-10 items-center gap-2 px-5 text-sm font-bold transition-colors ${
              viewMode === 'month' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-fill" />
            월간 보기
          </button>
        </div>
      </div>
    </div>
  );
}
