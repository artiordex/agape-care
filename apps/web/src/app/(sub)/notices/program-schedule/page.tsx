'use client';

import { useState } from 'react';
import Link from 'next/link';

import NoticeSidebar from '@/components/NoticeSidebar';

interface Program {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  category: string;
  color: string;
  staff: string;
  description: string;
}

const CATEGORIES = [
  { id: 'cognitive', name: '인지활동', color: '#8B5CF6', icon: 'ri-brain-line' },
  { id: 'leisure', name: '여가활동', color: '#EC4899', icon: 'ri-music-line' },
  { id: 'physical', name: '물리치료', color: '#10B981', icon: 'ri-heart-pulse-line' },
  { id: 'music', name: '음악치료', color: '#3B82F6', icon: 'ri-headphone-line' },
  { id: 'art', name: '미술활동', color: '#F59E0B', icon: 'ri-palette-line' },
  { id: 'event', name: '특별행사', color: '#EF4444', icon: 'ri-gift-line' },
];

// Mock Data
const MOCK_PROGRAMS: Program[] = [
  {
    id: '1',
    title: '음악 힐링 클래스',
    start_time: '10:00',
    end_time: '11:00',
    date: '2024-01-05',
    category: 'music',
    color: '#3B82F6',
    staff: '김음악',
    description: '전문 음악치료사와 함께하는 릴랙스 음악 프로그램입니다.',
  },
  {
    id: '2',
    title: '인지강화 퀴즈',
    start_time: '14:00',
    end_time: '15:00',
    date: '2024-01-05',
    category: 'cognitive',
    color: '#8B5CF6',
    staff: '박인지',
    description: '두뇌 회전을 돕는 퀴즈 프로그램입니다.',
  },
  {
    id: '3',
    title: '오후 산책 활동',
    start_time: '16:00',
    end_time: '17:00',
    date: '2024-01-07',
    category: 'leisure',
    color: '#EC4899',
    staff: '최여가',
    description: '어르신들과 함께하는 가벼운 산책 시간입니다.',
  },
];

export default function ProgramSchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const programs = MOCK_PROGRAMS;

  const categories = ['전체', ...CATEGORIES.map(c => c.name)];

  const filteredPrograms =
    selectedCategory === '전체'
      ? programs
      : programs.filter(p => {
          const category = CATEGORIES.find(c => c.id === p.category);
          return category?.name === selectedCategory;
        });

  const getCategoryInfo = (
    categoryId: string,
  ): {
    id: string;
    name: string;
    color: string;
    icon: string;
  } => CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0]!;

  const openProgramDetail = (id: string) => {
    setSelectedProgram(id);
    document.body.style.overflow = 'hidden';
  };

  const closeProgramDetail = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'auto';
  };

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  const getProgramsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredPrograms.filter(p => p.date === dateStr);
  };

  const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const days: JSX.Element[] = [];

    const headers = weekDays.map((day, idx) => (
      <div
        key={idx}
        className={`border-b-2 py-3 text-center text-sm font-bold ${
          idx === 0 ? 'text-red-600' : idx === 6 ? 'text-blue-600' : 'text-gray-700'
        }`}
      >
        {day}
      </div>
    ));

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-32 border bg-gray-50" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      const isToday = date.toDateString() === new Date().toDateString();
      const list = getProgramsForDate(date);

      days.push(
        <div key={d} className={`min-h-32 border p-2 ${isToday ? 'bg-purple-50 ring-2 ring-purple-600' : ''}`}>
          <div className="mb-2 font-bold">{d}</div>

          {list.slice(0, 3).map(program => {
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
        <div className="grid grid-cols-7">{headers}</div>
        <div className="grid grid-cols-7">{days}</div>
      </div>
    );
  };

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const goToday = () => setCurrentMonth(new Date());

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-grow pt-20">
        <div className="border-b bg-gradient-to-br from-purple-50 via-white to-teal-50 py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="text-4xl font-bold">프로그램 일정표</h1>
            <p className="mt-4 text-gray-600">월간 활동 일정을 한눈에 확인하세요</p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="border-b bg-gray-50 py-3">
          <div className="mx-auto flex max-w-7xl gap-2 px-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-600">
              홈
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link href="/communities" className="hover:text-teal-600">
              알림마당
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span>프로그램 일정표</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-8 px-6 py-12">
          <NoticeSidebar />

          <div className="flex-1">
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

            {/* Category Buttons */}
            <div className="mb-8 flex flex-wrap gap-4">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(selectedCategory === c.name ? '전체' : c.name)}
                  className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 ${
                    selectedCategory === c.name ? 'bg-white' : 'bg-gray-50 opacity-60'
                  }`}
                  style={{
                    borderColor: selectedCategory === c.name ? c.color : '#ddd',
                  }}
                >
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </button>
              ))}
            </div>

            <div className="mb-6 flex gap-3">
              <button
                className={`rounded-lg px-5 py-2.5 ${
                  viewMode === 'calendar' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setViewMode('calendar')}
              >
                달력 보기
              </button>
              <button
                className={`rounded-lg px-5 py-2.5 ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setViewMode('list')}
              >
                목록 보기
              </button>
            </div>

            {viewMode === 'calendar' && renderCalendarView()}

            {viewMode === 'list' && (
              <div className="space-y-3">
                {filteredPrograms.map(p => {
                  const info = getCategoryInfo(p.category);
                  return (
                    <div
                      key={p.id}
                      onClick={() => openProgramDetail(p.id)}
                      className="cursor-pointer rounded-lg border-l-4 bg-white p-5"
                      style={{ borderLeftColor: info.color }}
                    >
                      <h3 className="font-bold">{p.title}</h3>
                      <p className="mt-2 text-gray-600">{p.description}</p>
                      <div className="mt-2 flex gap-4 text-sm text-gray-500">
                        <span>
                          <i className="ri-calendar-line" /> {p.date}
                        </span>
                        <span>
                          <i className="ri-time-line" /> {p.start_time} - {p.end_time}
                        </span>
                        <span>
                          <i className="ri-user-line" /> {p.staff}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedProgram && selectedProgramData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeProgramDetail}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold">{selectedProgramData.title}</h2>

            <p className="mt-2 text-gray-600">{selectedProgramData.description}</p>

            <div className="mt-6 text-gray-700">
              <p>
                <i className="ri-calendar-line" /> {selectedProgramData.date}
              </p>
              <p>
                <i className="ri-time-line" /> {selectedProgramData.start_time} - {selectedProgramData.end_time}
              </p>
              <p>
                <i className="ri-user-line" /> 담당: {selectedProgramData.staff}
              </p>
            </div>

            <button
              className="mx-auto mt-6 block rounded-lg bg-gray-700 px-6 py-2 text-white"
              onClick={closeProgramDetail}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
