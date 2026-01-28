interface Props {
  currentMonth: Date;
  viewMode: 'week' | 'month';
  onMonthChange: (date: Date) => void;
  onViewModeChange: (mode: 'week' | 'month') => void;
}

export default function MealPlanControls({ currentMonth, viewMode, onMonthChange, onViewModeChange }: Props) {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* 월 네비게이션 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50"
          >
            <i className="ri-arrow-left-s-line text-lg text-gray-600" />
          </button>
          <h3 className="min-w-[140px] text-center text-lg font-bold text-gray-900">
            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
          </h3>
          <button
            onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50"
          >
            <i className="ri-arrow-right-s-line text-lg text-gray-600" />
          </button>
          <button
            onClick={() => onMonthChange(new Date())}
            className="whitespace-nowrap rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            이번 달
          </button>
        </div>

        {/* 보기 전환 */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('week')}
            className={`whitespace-nowrap rounded px-4 py-2 text-sm font-semibold transition-all ${
              viewMode === 'week'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            주간 보기
          </button>
          <button
            onClick={() => onViewModeChange('month')}
            className={`whitespace-nowrap rounded px-4 py-2 text-sm font-semibold transition-all ${
              viewMode === 'month'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            월간 보기
          </button>
        </div>
      </div>
    </div>
  );
}
