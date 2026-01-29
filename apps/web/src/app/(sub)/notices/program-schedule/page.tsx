'use client';

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

// 샘플 프로그램 데이터
const MOCK_PROGRAMS = [
  {
    id: '1',
    title: '음악 힐링 클래스',
    start_time: '10:00',
    end_time: '11:00',
    date: '2026-01-27',
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
    date: '2026-01-27',
    category: 'cognitive',
    color: '#6366F1',
    staff: '박인지',
    description: '두뇌 회전을 돕는 퀴즈 프로그램입니다.',
  },
  {
    id: '3',
    title: '오후 산책 활동',
    start_time: '16:00',
    end_time: '17:00',
    date: '2026-01-28',
    category: 'leisure',
    color: '#EC4899',
    staff: '최여가',
    description: '어르신들과 함께하는 가벼운 산책 시간입니다.',
  },
  {
    id: '4',
    title: '물리치료 세션',
    start_time: '10:00',
    end_time: '11:30',
    date: '2026-01-29',
    category: 'physical',
    color: '#10B981',
    staff: '이물리',
    description: '신체 기능 회복을 위한 물리치료 프로그램입니다.',
  },
  {
    id: '5',
    title: '그림 그리기',
    start_time: '14:00',
    end_time: '15:30',
    date: '2026-01-29',
    category: 'art',
    color: '#F59E0B',
    staff: '정미술',
    description: '창의력을 키우는 미술 활동 시간입니다.',
  },
  {
    id: '6',
    title: '생신 잔치',
    start_time: '15:00',
    end_time: '16:30',
    date: '2026-01-30',
    category: 'event',
    color: '#EF4444',
    staff: '김행사',
    description: '1월 생신을 맞으신 어르신들의 축하 행사입니다.',
  },
  {
    id: '7',
    title: '아침 체조',
    start_time: '09:00',
    end_time: '10:00',
    date: '2026-01-27',
    category: 'physical',
    color: '#10B981',
    staff: '이물리',
    description: '하루를 활기차게 시작하는 아침 체조 시간입니다.',
  },
  {
    id: '8',
    title: '노래교실',
    start_time: '14:00',
    end_time: '15:00',
    date: '2026-01-28',
    category: 'music',
    color: '#3B82F6',
    staff: '김음악',
    description: '추억의 노래를 함께 부르는 시간입니다.',
  },
  {
    id: '9',
    title: '미술치료',
    start_time: '10:00',
    end_time: '11:30',
    date: '2026-01-30',
    category: 'art',
    color: '#F59E0B',
    staff: '정미술',
    description: '그림을 통한 감정 표현 시간입니다.',
  },
  {
    id: '10',
    title: '원예활동',
    start_time: '14:00',
    end_time: '15:30',
    date: '2026-01-31',
    category: 'leisure',
    color: '#EC4899',
    staff: '최여가',
    description: '화분 가꾸기 활동입니다.',
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
