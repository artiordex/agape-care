'use client';

import { useEffect, useMemo, useState } from 'react';
import ProgramCalendar from './ProgramCalendar';
import ProgramDetailModal from './ProgramDetailModal';
import ProgramFilter from './ProgramFilter';
import ProgramFormModal from './ProgramFormModal';
import ProgramHeader from './ProgramHeader';
import ProgramList from './ProgramList';
import { Program, ProgramCategory } from './program.type';

/**
 * [Page] 아가페 프로그램 관리 시스템
 * LocalStorage 기반 완전한 CRUD 구현
 */
export default function ProgramManagementPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState<ProgramCategory>('전체');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('agape_programs');
    if (saved) {
      setPrograms(JSON.parse(saved));
    } else {
      // 샘플 데이터
      const initial: Program[] = [
        {
          id: '1',
          title: '뇌건강 체조',
          category: '인지활동',
          date: '2026-01-15',
          time: '10:00',
          duration: 60,
          instructor: '김영희',
          location: '1층 강당',
          participants: 15,
          maxParticipants: 20,
          description: '치매 예방을 위한 뇌 건강 체조 프로그램',
          status: '완료',
          color: '#3B82F6',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          title: '노래교실',
          category: '음악치료',
          date: '2026-01-20',
          time: '14:00',
          duration: 90,
          instructor: '박민수',
          location: '2층 음악실',
          participants: 12,
          maxParticipants: 15,
          description: '옛날 가요를 함께 부르며 즐기는 음악 시간',
          status: '완료',
          color: '#8B5CF6',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          title: '물리치료',
          category: '물리치료',
          date: '2026-01-31',
          time: '11:00',
          duration: 45,
          instructor: '이철수',
          location: '물리치료실',
          participants: 8,
          maxParticipants: 10,
          description: '개인별 맞춤 물리치료 프로그램',
          status: '예정',
          color: '#F59E0B',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: '미술 작품 전시회',
          category: '특별행사',
          date: '2026-02-05',
          time: '15:00',
          duration: 120,
          instructor: '최순자',
          location: '전시실',
          participants: 0,
          maxParticipants: 50,
          description: '수급자 분들의 미술 작품 전시회',
          status: '예정',
          color: '#EF4444',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setPrograms(initial);
      localStorage.setItem('agape_programs', JSON.stringify(initial));
    }
    setIsLoading(false);
  }, []);

  // 저장
  const saveToStorage = (data: Program[]) => {
    localStorage.setItem('agape_programs', JSON.stringify(data));
    setPrograms(data);
  };

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    let result = programs;

    // 카테고리 필터
    if (activeCategory !== '전체') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 날짜 정렬
    return result.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });
  }, [programs, activeCategory]);

  // 현재 월의 프로그램만 필터
  const currentMonthPrograms = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const prefix = `${year}-${String(month).padStart(2, '0')}`;
    return filteredData.filter(p => p.date.startsWith(prefix));
  }, [filteredData, currentDate]);

  // 통계
  const stats = useMemo(() => {
    return {
      total: programs.length,
      scheduled: programs.filter(p => p.status === '예정').length,
      inProgress: programs.filter(p => p.status === '진행중').length,
      completed: programs.filter(p => p.status === '완료').length,
      cancelled: programs.filter(p => p.status === '취소').length,
    };
  }, [programs]);

  // 월 변경
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // 신규 등록
  const handleAddProgram = (date?: string) => {
    setEditingProgram(null);
    setSelectedDate(date || '');
    setIsFormModalOpen(true);
  };

  // 날짜 클릭
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    handleAddProgram(date);
  };

  // 프로그램 클릭
  const handleProgramClick = (program: Program) => {
    setSelectedProgram(program);
    setIsDetailModalOpen(true);
  };

  // 수정
  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setIsDetailModalOpen(false);
    setIsFormModalOpen(true);
  };

  // 삭제
  const handleDelete = (id: string) => {
    if (!confirm('정말로 이 프로그램을 삭제하시겠습니까?')) return;

    const updated = programs.filter(p => p.id !== id);
    saveToStorage(updated);
    setIsDetailModalOpen(false);
    alert('✅ 프로그램이 삭제되었습니다.');
  };

  // 저장 (신규/수정)
  const handleSave = (data: Partial<Program>) => {
    let updated: Program[];

    if (editingProgram) {
      // 수정
      updated = programs.map(p =>
        p.id === editingProgram.id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p,
      );
      alert('✅ 프로그램이 수정되었습니다.');
    } else {
      // 신규
      const maxId = Math.max(0, ...programs.map(p => parseInt(p.id))) + 1;
      const newProgram: Program = {
        ...data,
        id: maxId.toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Program;
      updated = [newProgram, ...programs];
      alert('✅ 새로운 프로그램이 등록되었습니다.');
    }

    saveToStorage(updated);
    setIsFormModalOpen(false);
    setEditingProgram(null);
    setSelectedDate('');
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      {/* A. 헤더 */}
      <ProgramHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onAddProgram={() => handleAddProgram()}
        totalCount={stats.total}
      />

      {/* B. 필터 탭 */}
      <ProgramFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* C. 메인 컨텐츠 */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <i className="ri-loader-4-line mb-2 animate-spin text-4xl text-gray-300"></i>
              <p className="text-sm font-medium text-gray-500">로딩중...</p>
            </div>
          </div>
        ) : viewMode === 'calendar' ? (
          <ProgramCalendar
            currentDate={currentDate}
            programs={currentMonthPrograms}
            onDateClick={handleDateClick}
            onProgramClick={handleProgramClick}
          />
        ) : (
          <ProgramList
            programs={filteredData}
            onProgramClick={handleProgramClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* D. 작성/수정 폼 모달 */}
      <ProgramFormModal
        isOpen={isFormModalOpen}
        program={editingProgram}
        initialDate={selectedDate}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProgram(null);
          setSelectedDate('');
        }}
        onSave={handleSave}
      />

      {/* E. 상세보기 모달 */}
      <ProgramDetailModal
        isOpen={isDetailModalOpen}
        program={selectedProgram}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProgram(null);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
