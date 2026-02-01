/**
 * Description : ProgramCalendarTab.tsx - 📌 프로그램 일정 달력 탭
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface ProgramCalendarTabProps {
  currentMonth: Date;
  filteredPrograms: any[];
  getCategoryInfo: (categoryId: string) => { name: string; color: string };
  openProgramDetail: (id: string) => void;
}

export default function ProgramCalendarTab({
  currentMonth,
  filteredPrograms,
  getCategoryInfo,
  openProgramDetail,
}: ProgramCalendarTabProps) {
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

  // 이전 달 빈 칸 영역
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={'empty-' + i} className="min-h-[160px] border-b border-r border-gray-300 bg-gray-100" />);
  }

  // 실제 날짜 셀 영역
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const isToday = date.toDateString() === new Date().toDateString();
    const dayOfWeek = date.getDay();
    const list = getProgramsForDate(date);

    let dateStyles = 'text-gray-500'; // 기본 (평일)
    if (isToday) {
      dateStyles = 'bg-[#5C8D5A] text-white';
    } else if (dayOfWeek === 0) {
      dateStyles = 'text-red-500'; // 일요일
    } else if (dayOfWeek === 6) {
      dateStyles = 'text-blue-500'; // 토요일
    }

    days.push(
      <div
        key={d}
        className={`group relative min-h-[160px] border-b border-r border-gray-300 p-2 transition-colors hover:bg-gray-50 ${
          isToday ? 'bg-[#5C8D5A]/5' : 'bg-white'
        }`}
      >
        {/* 날짜 표시 */}
        <div className="mb-3 flex items-center justify-between px-1">
          <span className={`rounded-md px-2 py-1 text-sm font-medium ${dateStyles}`}>
            {d.toString().padStart(2, '0')}
          </span>
        </div>

        {/* 일정 리스트 */}
        <div className="space-y-1.5">
          {list.map((program: any) => {
            const info = getCategoryInfo(program.category);
            return (
              <div
                key={program.id}
                onClick={() => openProgramDetail(program.id)}
                className="cursor-pointer rounded-none border border-gray-100 bg-white p-2 transition-all hover:border-gray-300"
                style={{ borderLeft: `3px solid ${info.color}` }}
              >
                {/* 카테고리 태그 */}
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-none" style={{ backgroundColor: info.color }} />
                  <span className="text-[10px] font-medium text-gray-400">{info.name}</span>
                </div>

                {/* 프로그램 제목 */}
                <div className="mb-1.5 text-[11px] font-medium leading-snug text-gray-900">{program.title}</div>

                {/* 시간 및 담당자 정보 */}
                <div className="flex flex-col gap-0.5">
                  <div className="text-[9px] font-medium text-[#5C8D5A]">
                    {program.start_time} - {program.end_time}
                  </div>
                  <div className="text-[9px] text-gray-400">담당: {program.staff}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>,
    );
  }

  return (
    /* 외부 테두리 및 전체 구조 */
    <div className="w-full rounded-none border-l border-t border-gray-200 bg-white shadow-none">
      {/* 요일 헤더 - 회색 경계선과 연한 배경색 */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className={`py-3 text-center text-sm font-medium tracking-widest ${
              idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 border-r border-gray-400">{days}</div>
    </div>
  );
}
