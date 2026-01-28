'use client';
import React from 'react';

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
  for (let i = 0; i < firstDay; i++) days.push(<div key={'e-' + i} className="min-h-32 border bg-gray-50" />);

  // Real days
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const isToday = date.toDateString() === new Date().toDateString();
    const list = getProgramsForDate(date);

    days.push(
      <div key={d} className={`min-h-32 border p-2 ${isToday ? 'bg-purple-50 ring-2 ring-purple-600' : ''}`}>
        <div className="mb-2 font-bold">{d}</div>

        {list.slice(0, 3).map((program: any) => {
          const info = getCategoryInfo(program.category);
          return (
            <div
              key={program.id}
              onClick={() => openProgramDetail(program.id)}
              className="mb-1 cursor-pointer rounded p-1 text-xs"
              style={{
                backgroundColor: `${info.color}20`,
                borderLeft: `3px solid ${info.color}`,
              }}
            >
              {program.start_time} {program.title}
            </div>
          );
        })}
      </div>,
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="grid grid-cols-7">
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className={`border-b-2 py-3 text-center text-sm font-bold ${
              idx === 0 ? 'text-red-600' : idx === 6 ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">{days}</div>
    </div>
  );
}
