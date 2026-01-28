'use client';

import { useState } from 'react';
import MonthHeader from './MonthHeader';
import CategoryFilter from './CategoryFilter';
import CalendarView from './CalendarView';
import ListView from './ListView';
import ProgramModal from './ProgramModal';
import Link from 'next/link';
import ProgramDetail from './ProgramDetail';

// 기존 데이터 그대로 page.tsx 안에 유지
const CATEGORIES = [
  { id: 'cognitive', name: '인지활동', color: '#8B5CF6', icon: 'ri-brain-line' },
  { id: 'leisure', name: '여가활동', color: '#EC4899', icon: 'ri-music-line' },
  { id: 'physical', name: '물리치료', color: '#10B981', icon: 'ri-heart-pulse-line' },
  { id: 'music', name: '음악치료', color: '#3B82F6', icon: 'ri-headphone-line' },
  { id: 'art', name: '미술활동', color: '#F59E0B', icon: 'ri-palette-line' },
  { id: 'event', name: '특별행사', color: '#EF4444', icon: 'ri-gift-line' },
];

const MOCK_PROGRAMS = [
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
  const filteredPrograms =
    selectedCategory === '전체'
      ? programs
      : programs.filter(p => CATEGORIES.find(c => c.id === p.category)?.name === selectedCategory);

  const getCategoryInfo = (categoryId: string) => CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];

  const openProgramDetail = (id: string) => {
    setSelectedProgram(id);
    document.body.style.overflow = 'hidden';
  };

  const closeProgramDetail = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'auto';
  };

  const selectedData = programs.find(p => p.id === selectedProgram) || null;

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const goToday = () => setCurrentMonth(new Date());

  return (
    <div className="flex min-h-screen flex-col bg-white pt-20">
      {/* Content */}
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-12">
        <div className="flex-1">
          <MonthHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} goToday={goToday} />

          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="mb-6 flex gap-3">
            <button
              className={`rounded-lg px-5 py-2.5 ${
                viewMode === 'calendar' ? 'bg-purple-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setViewMode('calendar')}
            >
              달력 보기
            </button>
            <button
              className={`rounded-lg px-5 py-2.5 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setViewMode('list')}
            >
              목록 보기
            </button>
          </div>

          {viewMode === 'calendar' ? (
            <CalendarView
              currentMonth={currentMonth}
              filteredPrograms={filteredPrograms}
              getCategoryInfo={getCategoryInfo}
              openProgramDetail={openProgramDetail}
            />
          ) : (
            <ListView
              filteredPrograms={filteredPrograms}
              getCategoryInfo={getCategoryInfo}
              openProgramDetail={openProgramDetail}
            />
          )}
        </div>
      </div>

      <ProgramModal selected={selectedData} close={closeProgramDetail} />
      <ProgramDetail />
    </div>
  );
}
