/**
 * Description : ProgramScheduleSection.tsx - ?? ProgramScheduleSection UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useMemo, useState } from 'react';
import CategoryFilter from './ProgramFilter';
import MonthHeader from './ProgramHeader';
import ProgramModal from './ProgramModal';
import CalendarView from './tabs/ProgramCalendarTab';
import ListView from './tabs/ProgramListTab';

// 시스템 표준 카테고리 정의 (Agape Green 포인트 적용)
const CATEGORIES = [
  { id: 'COGNITIVE', name: '인지활동', color: '#5C8D5A', icon: 'ri-brain-line' },
  { id: 'RECREATION', name: '여가활동', color: '#EC4899', icon: 'ri-music-line' },
  { id: 'EXERCISE', name: '물리치료', color: '#10B981', icon: 'ri-heart-pulse-line' },
  { id: 'MUSIC', name: '음악치료', color: '#3B82F6', icon: 'ri-headphone-line' },
  { id: 'ART', name: '미술활동', color: '#F59E0B', icon: 'ri-palette-line' },
  { id: 'EVENT', name: '특별행사', color: '#EF4444', icon: 'ri-gift-line' },
];

interface ProgramScheduleSectionProps {
  schedules?: any[];
  isLoading?: boolean;
}

export default function ProgramScheduleSection({ schedules = [], isLoading }: ProgramScheduleSectionProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  // API 데이터를 UI 형식으로 변환
  const programs = useMemo(() => {
    return schedules.map(item => ({
      id: item.id,
      title: item.program?.title || 'Unnamed Program',
      date: item.startTime.split('T')[0],
      start_time: item.startTime.split('T')[1].substring(0, 5),
      end_time: item.endTime ? item.endTime.split('T')[1].substring(0, 5) : '',
      category: item.program?.category || 'COGNITIVE',
      staff: item.facilitatorId || '',
      location: item.location || '',
      description: item.program?.description || '',
    }));
  }, [schedules]);

  // 데이터 필터링 로직
  const filteredPrograms = useMemo(() => {
    return selectedCategory === '전체'
      ? programs
      : programs.filter(p => {
          const category = CATEGORIES.find(c => c.id === p.category);
          return category ? category.name === selectedCategory : false;
        });
  }, [programs, selectedCategory]);

  const getCategoryInfo = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
    return {
      name: category!.name,
      color: category!.color,
    };
  };

  const selectedProgram = useMemo(() => programs.find(p => p.id === selectedProgramId), [programs, selectedProgramId]);

  if (isLoading) {
    return (
      <section className="flex h-[600px] items-center justify-center border border-gray-200 bg-white p-10 shadow-sm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section>
      <div className="border border-gray-200 bg-white p-10 shadow-sm">
        {/* 제어 헤더 (월 이동 및 뷰 전환) */}
        <MonthHeader
          currentMonth={currentMonth}
          prevMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          nextMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          goToday={() => setCurrentMonth(new Date())}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* 카테고리 필터링 도구 */}
        <div className="mb-10">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* 메인 일정 뷰 (달력/목록 전환) */}
        <div className="rounded-lg shadow-gray-300">
          {viewMode === 'calendar' ? (
            <CalendarView
              currentMonth={currentMonth}
              filteredPrograms={filteredPrograms}
              getCategoryInfo={getCategoryInfo}
              openProgramDetail={(id: string) => setSelectedProgramId(id)}
            />
          ) : (
            <ListView
              filteredPrograms={filteredPrograms}
              getCategoryInfo={getCategoryInfo}
              openProgramDetail={(id: string) => setSelectedProgramId(id)}
            />
          )}
        </div>
      </div>

      {/* 상세 명세 모달 팝업 */}
      <ProgramModal selected={selectedProgram} close={() => setSelectedProgramId(null)} />
    </section>
  );
}
