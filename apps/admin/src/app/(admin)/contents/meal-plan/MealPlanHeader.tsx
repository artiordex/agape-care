'use client';

interface Props {
  readonly selectedDate: string;
  readonly onDateChange?: (date: string) => void;
  readonly onPrintMonthly?: () => void;
}

/**
 * [Component] 급식관리 및 식단표 통합 관제 헤더
 * 아가페 그린(#5C8D5A) 테마 및 날짜 내비게이션 인터페이스 적용
 */
export default function MealPlanHeader({ selectedDate, onDateChange, onPrintMonthly }: Props) {
  /** 날짜 가감 로직 (월 단위 이동) */
  const handleDateChange = (offset: number) => {
    if (onDateChange) {
      const parts = selectedDate.split('-');
      const currentDate =
        parts.length === 3
          ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10))
          : new Date(selectedDate);
      currentDate.setMonth(currentDate.getMonth() + offset);
      const y = currentDate.getFullYear();
      const m = String(currentDate.getMonth() + 1).padStart(2, '0');
      const d = String(currentDate.getDate()).padStart(2, '0');
      onDateChange(`${y}-${m}-${d}`);
    }
  };

  /** 날짜 표시 형식 (YYYY.MM) */
  const getDisplayDate = () => {
    const parts = selectedDate.split('-');
    if (parts.length === 3) {
      return `${parts[0]}.${parts[1]}`;
    }
    const date = new Date(selectedDate);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-restaurant-2-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">급식관리 및 식단표 관제</h1>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">Daily Meal Planning & Nutrition Management</p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 월 내비게이션 컨트롤 */}
      <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-[#f8fafc] p-1 shadow-inner">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A] active:scale-95"
          onClick={() => handleDateChange(-1)}
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        <div className="flex items-center gap-2 px-4">
          <i className="ri-calendar-check-line text-[#5C8D5A]"></i>
          <span className="font-mono text-[14px] font-black tracking-tight text-gray-800">{getDisplayDate()}</span>
        </div>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:text-[#5C8D5A] active:scale-95"
          onClick={() => handleDateChange(1)}
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* 3. 오른쪽: 출력 액션 */}
      <div className="flex items-center gap-2">
        {onPrintMonthly && (
          <button
            onClick={onPrintMonthly}
            className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
          >
            <i className="ri-printer-line text-sm"></i>
            월간 식단표 출력
          </button>
        )}
      </div>
    </div>
  );
}
