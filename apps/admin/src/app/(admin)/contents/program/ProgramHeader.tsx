'use client';

interface Props {
  readonly currentDate: Date;
  readonly onPrevMonth: () => void;
  readonly onNextMonth: () => void;
  readonly onToday: () => void;
  readonly onAddProgram: () => void;
  readonly totalCount: number;
}

/**
 * [Component] 프로그램 관리 시스템 헤더
 * 아가페 표준 UI 적용
 */
export default function ProgramHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onAddProgram,
  totalCount,
}: Props) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-6 font-sans antialiased shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <div className="rounded-none bg-[#5C8D5A] p-3 text-white shadow-md">
          <i className="ri-calendar-event-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
              프로그램 일정 관리
            </h1>
            <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
              Admin Node
            </span>
          </div>
          <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            Program Schedule Management System v4.2
            <span className="mx-2 h-2 w-[1px] bg-gray-300"></span>
            <span className="font-mono text-[#5C8D5A]">Total: {totalCount}건</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 월 네비게이션 */}
        <div className="flex items-center gap-2 rounded-none border border-gray-300 bg-white p-1">
          <button
            onClick={onPrevMonth}
            className="flex h-7 w-7 items-center justify-center text-gray-600 transition-all hover:bg-gray-50"
          >
            <i className="ri-arrow-left-s-line text-lg"></i>
          </button>

          <button
            onClick={onToday}
            className="px-3 py-1 text-[11px] font-black uppercase text-gray-700 transition-all hover:bg-gray-50"
          >
            {year}년 {month}월
          </button>

          <button
            onClick={onNextMonth}
            className="flex h-7 w-7 items-center justify-center text-gray-600 transition-all hover:bg-gray-50"
          >
            <i className="ri-arrow-right-s-line text-lg"></i>
          </button>
        </div>

        {/* 추가 버튼 */}
        <button
          onClick={onAddProgram}
          className="flex cursor-pointer items-center gap-2 rounded-none bg-[#5C8D5A] px-6 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-lg"></i>
          신규 프로그램 등록
        </button>
      </div>
    </div>
  );
}
