'use client';

import { api } from '@/lib/api';
import { useState } from 'react';
import CalendarView from './CalendarView';
import CategoryFilter from './CategoryFilter';
import ListView from './ListView';
import MonthHeader from './MonthHeader';
import ProgramModal from './ProgramModal';

// 카테고리 데이터
const CATEGORIES = [
  { id: 'cognitive', name: '인지활동', color: '#6366F1', icon: 'ri-brain-line' },
  { id: 'leisure', name: '여가활동', color: '#EC4899', icon: 'ri-music-line' },
  { id: 'physical', name: '물리치료', color: '#10B981', icon: 'ri-heart-pulse-line' },
  { id: 'music', name: '음악치료', color: '#3B82F6', icon: 'ri-headphone-line' },
  { id: 'art', name: '미술활동', color: '#F59E0B', icon: 'ri-palette-line' },
  { id: 'event', name: '특별행사', color: '#EF4444', icon: 'ri-gift-line' },
];

export default function ProgramSchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString().split('T')[0]!;
  const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString().split('T')[0]!;

  // API 호출
  const { data, isLoading } = api.program.getSchedules.useQuery(['program', 'schedules', { start, end }], {
    query: {
      start,
      end,
    },
  });

  const programsRaw = data?.status === 200 ? data.body.data : [];

  // 데이터 가공
  const programs = programsRaw.map(prog => ({
    id: prog.id,
    title: prog.title,
    start_time: prog.startTime.substring(0, 5), // HH:mm:ss -> HH:mm
    end_time: prog.endTime.substring(0, 5),
    date: prog.date,
    category: prog.category || 'event', // TODO: 카테고리 매핑
    color: CATEGORIES.find(c => c.id === prog.category)?.color || '#EF4444',
    staff: prog.managerName || '진행자',
    description: prog.description || '',
  }));

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 월 헤더 */}
        <MonthHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} goToday={goToday} />

        {/* 카테고리 필터 */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* 보기 모드 전환 */}
        <div className="mb-6 flex gap-2">
          <button
            className={`rounded border px-4 py-2 text-sm font-semibold transition-all ${
              viewMode === 'calendar'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setViewMode('calendar')}
          >
            달력 보기
          </button>
          <button
            className={`rounded border px-4 py-2 text-sm font-semibold transition-all ${
              viewMode === 'list'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setViewMode('list')}
          >
            목록 보기
          </button>
        </div>

        {/* 뷰 */}
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

      {/* 프로그램 상세 모달 */}
      <ProgramModal selected={selectedData} close={closeProgramDetail} />
    </div>
  );
}
