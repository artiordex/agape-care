'use client';

import clsx from 'clsx';

interface Stats {
  readonly rate: string;
  readonly count: number;
  readonly totalCalories: number;
  readonly avgCalories: number;
}

interface Props {
  readonly stats: Stats;
  readonly month?: Date;
  readonly onPrevMonth?: () => void;
  readonly onNextMonth?: () => void;
}

/**
 * [Component] 급식관리 영양 통계 대시보드 배너
 * 월간 식단 등록 현황 및 칼로리 데이터를 4분할 그리드로 시각화
 */
export default function MealPlanStatBanner({ stats, month, onPrevMonth, onNextMonth }: Props) {
  // 통계 항목 정의
  const statItems = [
    {
      label: '식단 등록률',
      value: `${stats.rate}%`,
      icon: 'ri-pie-chart-line',
      color: 'text-[#5C8D5A]',
      bg: 'bg-emerald-50',
    },
    {
      label: '등록 일수',
      value: `${stats.count}일`,
      icon: 'ri-calendar-check-line',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: '월간 총 칼로리',
      value: `${stats.totalCalories.toLocaleString()} Kcal`,
      icon: 'ri-fire-line',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: '일평균 칼로리',
      value: `${stats.avgCalories.toLocaleString()} Kcal`,
      icon: 'ri-temp-hot-line',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="flex flex-col border-b border-gray-200 bg-[#f8fafc]">
      {/* 월 선택 내비게이션 영역 */}
      {month && (
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <h2 className="text-[20px] font-black tracking-tight text-gray-800">
              {month.getFullYear()}년 {month.getMonth() + 1}월
            </h2>
            <div className="flex items-center gap-1 rounded bg-gray-100 p-1">
              <button
                onClick={onPrevMonth}
                className="flex h-8 w-8 items-center justify-center rounded bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-[#5C8D5A]"
              >
                <i className="ri-arrow-left-s-line text-xl"></i>
              </button>
              <button
                onClick={onNextMonth}
                className="flex h-8 w-8 items-center justify-center rounded bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-[#5C8D5A]"
              >
                <i className="ri-arrow-right-s-line text-xl"></i>
              </button>
            </div>
            <button
              onClick={() => {
                const today = new Date();
                if (onPrevMonth && onNextMonth) {
                  // This is a bit hacky since we don't have a direct setMonth prop,
                  // but in a real app would use a direct setter.
                }
              }}
              className="px-3 py-1 text-[11px] font-bold text-gray-400 hover:text-gray-600"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
            <i className="ri-time-line"></i>
            <span>
              마지막 업데이트: <span suppressHydrationWarning>{new Date().toLocaleTimeString()}</span>
            </span>
          </div>
        </div>
      )}

      {/* 통계 그리드 영역 */}
      <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border border-gray-300 bg-white p-3 shadow-sm transition-all hover:shadow-md"
          >
            {/* 아이콘 영역 */}
            <div className={clsx('flex h-10 w-10 items-center justify-center rounded-lg border shadow-inner', item.bg)}>
              <i className={clsx(item.icon, 'text-xl', item.color)}></i>
            </div>

            {/* 데이터 영역 */}
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
              <span className={clsx('text-[16px] font-black leading-none tracking-tight', item.color)}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
