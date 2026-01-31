'use client';

import { Program } from './program.type';

interface Props {
  readonly currentDate: Date;
  readonly programs: Program[];
  readonly onDateClick: (date: string) => void;
  readonly onProgramClick: (program: Program) => void;
}

/**
 * [Component] 프로그램 캘린더 뷰
 * 이미지 스타일 적용
 */
export default function ProgramCalendar({ currentDate, programs, onDateClick, onProgramClick }: Props) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달력 생성 로직
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days = [];
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // 이전 달 날짜들
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  // 현재 달 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getProgramsForDate = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return programs.filter(p => p.date === dateStr);
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === todayStr;
  };

  return (
    <div className="bg-white">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
          <div
            key={day}
            className={`p-3 text-center text-sm font-medium ${
              idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">
        {weeks.map((week, weekIdx) =>
          week.map((day, dayIdx) => {
            const dayPrograms = getProgramsForDate(day);
            const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';

            return (
              <div
                key={`${weekIdx}-${dayIdx}`}
                onClick={() => day && onDateClick(dateStr)}
                className={`min-h-[120px] cursor-pointer border-b border-r border-gray-200 p-2 transition-colors hover:bg-gray-50 ${
                  !day ? 'bg-gray-50' : ''
                }`}
              >
                {day && (
                  <>
                    <div className="mb-1 flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          isToday(day)
                            ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white'
                            : dayIdx === 0
                              ? 'text-red-500'
                              : dayIdx === 6
                                ? 'text-blue-500'
                                : 'text-gray-700'
                        }`}
                      >
                        {day}
                      </span>
                    </div>

                    {/* 프로그램 목록 */}
                    <div className="space-y-1">
                      {dayPrograms.slice(0, 3).map(program => (
                        <div
                          key={program.id}
                          onClick={e => {
                            e.stopPropagation();
                            onProgramClick(program);
                          }}
                          className={`truncate rounded px-2 py-1 text-xs font-medium transition-colors hover:opacity-80`}
                          style={{ backgroundColor: program.color + '20', color: program.color }}
                        >
                          {program.time} {program.title}
                        </div>
                      ))}
                      {dayPrograms.length > 3 && (
                        <div className="px-2 text-xs text-gray-500">+{dayPrograms.length - 3}개 더보기</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
