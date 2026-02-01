/**
 * Description : ProgramScheduleSection.tsx - 📌 프로그램 통합 일정 관리 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useState } from 'react';
import CategoryFilter from './ProgramFilter';
import MonthHeader from './ProgramHeader';
import ProgramModal from './ProgramModal';
import CalendarView from './tabs/ProgramCalendarTab';
import ListView from './tabs/ProgramListTab';

// 시스템 표준 카테고리 정의 (Agape Green 포인트 적용)
const CATEGORIES = [
  { id: 'cognitive', name: '인지활동', color: '#5C8D5A', icon: 'ri-brain-line' },
  { id: 'leisure', name: '여가활동', color: '#EC4899', icon: 'ri-music-line' },
  { id: 'physical', name: '물리치료', color: '#10B981', icon: 'ri-heart-pulse-line' },
  { id: 'music', name: '음악치료', color: '#3B82F6', icon: 'ri-headphone-line' },
  { id: 'art', name: '미술활동', color: '#F59E0B', icon: 'ri-palette-line' },
  { id: 'event', name: '특별행사', color: '#EF4444', icon: 'ri-gift-line' },
];

export default function ProgramScheduleSection() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  // 임시 데이터 세트 (실제 환경에서는 API 호출을 통해 관리)
  const programs = [
    {
      id: '1',
      title: '오전 인지 정밀 케어',
      date: '2026-02-02',
      start_time: '10:00',
      end_time: '11:00',
      category: 'cognitive',
      staff: '민시우 복지사',
      location: '1층 프로그램실',
      description: '전문 교구를 활용한 집중 인지 자극 활동입니다.',
    },
    {
      id: '2',
      title: '실버 리듬 치료',
      date: '2026-02-02',
      start_time: '14:00',
      end_time: '15:30',
      category: 'music',
      staff: '김희진 강사',
      location: '2층 다목적홀',
      description: '전통 악기를 활용한 리듬 정서 지원 프로그램입니다.',
    },
  ];

  // 데이터 필터링 로직
  const filteredPrograms =
    selectedCategory === '전체'
      ? programs
      : programs.filter(p => {
          const category = CATEGORIES.find(c => c.id === p.category);
          return category ? category.name === selectedCategory : false;
        });

  const getCategoryInfo = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
    return {
      name: category!.name,
      color: category!.color,
    };
  };
  const selectedProgram = programs.find(p => p.id === selectedProgramId);

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
