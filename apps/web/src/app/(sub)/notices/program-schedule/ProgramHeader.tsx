/**
 * Description : MonthHeader.tsx - 📌 월 제어 헤더
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface MonthHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
  viewMode: 'calendar' | 'list';
  setViewMode: (mode: 'calendar' | 'list') => void;
}

export default function MonthHeader({
  currentMonth,
  prevMonth,
  nextMonth,
  goToday,
  viewMode,
  setViewMode,
}: MonthHeaderProps) {
  return (
    <div className="mb-10 flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-end">
      {/* 왼쪽: 월 표시 */}
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center bg-[#5C8D5A] text-white">
          <i className="ri-calendar-event-fill text-3xl" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            {currentMonth.getFullYear()}.
            <span className="text-[#5C8D5A]">{(currentMonth.getMonth() + 1).toString().padStart(2, '0')}</span>
          </h2>
        </div>
      </div>

      {/* 오른쪽 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 날짜 이동 버튼 그룹 */}
        <div className="flex border border-gray-200 bg-white">
          <button
            onClick={prevMonth}
            className="flex h-12 w-12 items-center justify-center border-r border-gray-100 transition-colors hover:bg-[#5C8D5A]/10"
            title="이전 달"
          >
            <i className="ri-arrow-left-s-line text-xl text-gray-600" />
          </button>

          <button
            onClick={goToday}
            className="flex h-12 items-center px-6 text-md font-semibold text-[#5C8D5A] transition-colors hover:bg-[#5C8D5A]/10"
          >
            {new Date().toLocaleDateString('ko-KR')}
          </button>

          <button
            onClick={nextMonth}
            className="flex h-12 w-12 items-center justify-center border-l border-gray-100 transition-colors hover:bg-[#5C8D5A]/10"
            title="다음 달"
          >
            <i className="ri-arrow-right-s-line text-xl text-gray-600" />
          </button>
        </div>

        {/* 뷰 모드 전환 */}
        <div className="flex border border-[#5C8D5A] bg-white p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`text-md flex h-10 items-center gap-2 px-5 transition-colors ${
              viewMode === 'calendar' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-grid-fill" />캘린더 뷰
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`text-md flex h-10 items-center gap-2 px-5 font-bold transition-colors ${
              viewMode === 'list' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-list-settings-fill" />리스트 뷰
          </button>
        </div>
      </div>
    </div>
  );
}
