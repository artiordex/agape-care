'use client';

export default function CalendarView({ currentMonth, filteredPrograms, getCategoryInfo, openProgramDetail }: any) {
  const getProgramsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredPrograms.filter((p: any) => p.date === dateStr);
  };

  const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const days: JSX.Element[] = [];

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={'e-' + i} className="min-h-[200px] border border-gray-200 bg-gray-50" />);
  }

  // Real days
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const isToday = date.toDateString() === new Date().toDateString();
    const list = getProgramsForDate(date);

    days.push(
      <div
        key={d}
        className={`min-h-[200px] border border-gray-200 p-2 transition-colors ${
          isToday ? 'bg-teal-50 ring-2 ring-inset ring-teal-600' : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className={`mb-2 text-sm font-bold ${isToday ? 'text-teal-600' : 'text-gray-700'}`}>{d}</div>

        <div className="space-y-1">
          {list.map((program: any) => {
            const info = getCategoryInfo(program.category);
            return (
              <div
                key={program.id}
                onClick={() => openProgramDetail(program.id)}
                className="cursor-pointer rounded border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50"
              >
                {/* 카테고리 태그 */}
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: info.color }} />
                  <span className="text-xs font-semibold text-gray-600">{info.name}</span>
                </div>

                {/* 프로그램 제목 */}
                <div className="mb-1 text-sm font-semibold text-gray-900">{program.title}</div>

                {/* 시간 */}
                <div className="text-xs text-gray-600">
                  {program.start_time} - {program.end_time}
                </div>

                {/* 담당자 */}
                <div className="mt-1 text-xs text-gray-500">담당: {program.staff}</div>
              </div>
            );
          })}
        </div>
      </div>,
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b-2 border-gray-300 bg-gray-50">
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className={`border-r border-gray-200 py-3 text-center text-sm font-bold last:border-r-0 ${
              idx === 0 ? 'text-red-600' : idx === 6 ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">{days}</div>
    </div>
  );
}
