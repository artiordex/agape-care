'use client';

export default function MonthHeader({
  currentMonth,
  prevMonth,
  nextMonth,
  goToday,
}: {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between border-b-2 border-gray-900 pb-4">
      <h2 className="text-2xl font-bold text-gray-900">
        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
      </h2>

      <div className="flex gap-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50"
          onClick={prevMonth}
        >
          <i className="ri-arrow-left-s-line text-gray-600" />
        </button>
        <button
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          onClick={goToday}
        >
          오늘
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50"
          onClick={nextMonth}
        >
          <i className="ri-arrow-right-s-line text-gray-600" />
        </button>
      </div>
    </div>
  );
}
