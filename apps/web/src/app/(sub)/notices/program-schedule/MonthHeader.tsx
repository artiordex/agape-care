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
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-3xl font-bold">
        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
      </h2>

      <div className="flex gap-2">
        <button className="icon-btn" onClick={prevMonth}>
          <i className="ri-arrow-left-s-line" />
        </button>
        <button className="rounded-lg bg-gray-100 px-4 py-2" onClick={goToday}>
          오늘
        </button>
        <button className="icon-btn" onClick={nextMonth}>
          <i className="ri-arrow-right-s-line" />
        </button>
      </div>
    </div>
  );
}
