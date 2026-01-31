'use client';

import { useEffect, useState, useMemo } from 'react';

// 리팩토링된 컴포넌트 임포트
import EducationHeader from './EducationHeader';
import EducationStats from './EducationStats';
import EducationGuide from './EducationGuide';
import EducationFilter from './EducationFilter';
import EducationList from './EducationList';
import EducationFormModal from './EducationFormModal';

export default function EducationManagementPage() {
  // 1. 관제 핵심 상태
  const [educations, setEducations] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<any | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 2. 초기 데이터 로드 및 동기화
  useEffect(() => {
    const saved = localStorage.getItem('agape_educations');
    if (saved) {
      setEducations(JSON.parse(saved));
    }
  }, []);

  const saveToStorage = (data: any[]) => {
    localStorage.setItem('agape_educations', JSON.stringify(data));
    setEducations(data);
  };

  // 3. 실시간 통계 계산 엔진 (Memoized)
  const stats = useMemo(() => {
    const currentYear = new Date().getFullYear().toString();
    const today = new Date().toISOString().split('T')[0] || '';
    return {
      total: educations.length,
      thisYear: educations.filter(e => e?.date?.startsWith(currentYear)).length,
      avgAttendance:
        educations.length > 0
          ? Math.round(educations.reduce((sum, e) => sum + (e?.attendanceRate || 0), 0) / educations.length)
          : 0,
      upcoming: educations.filter(e => e?.date && e.date >= today).length,
    };
  }, [educations]);

  // 4. 데이터 필터링 로직
  const filteredData = useMemo(() => {
    return educations
      .filter(item => filter === 'all' || item.type === filter)
      .filter(
        item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [educations, filter, searchTerm]);

  // 5. 비즈니스 로직 핸들러
  const handleSave = (formData: any) => {
    const filteredParticipants = formData.participants.filter((p: string) => p.trim() !== '');
    const attendanceRate = filteredParticipants.length > 0 ? 100 : 0; // 데모용 로직

    let updated;
    if (selectedEducation) {
      updated = educations.map(item =>
        item.id === selectedEducation.id ? { ...formData, id: item.id, attendanceRate } : item,
      );
    } else {
      updated = [...educations, { ...formData, id: Date.now().toString(), attendanceRate }];
    }

    saveToStorage(updated);
    setIsModalOpen(false);
    setSelectedEducation(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 교육 기록을 영구적으로 삭제하시겠습니까?')) {
      saveToStorage(educations.filter(item => item.id !== id));
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* A. 통합 액션 헤더 */}
      <EducationHeader
        onAdd={() => {
          setSelectedEducation(null);
          setIsModalOpen(true);
        }}
      />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* B. 교육 현황 요약 대시보드 */}
          <EducationStats stats={stats} />

          {/* C. 필수 교육 가이드 섹션 */}
          <EducationGuide />

          {/* D. 관제 워크스페이스 컨테이너 */}
          <div className="space-y-5">
            {/* 검색 및 필터 */}
            <EducationFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filter={filter}
              setFilter={setFilter}
            />

            {/* 교육 기록 리스트 */}
            <EducationList
              educations={filteredData}
              onEdit={edu => {
                setSelectedEducation(edu);
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          </div>

          {/* 하단 라이선스 정보 */}
          <div className="flex justify-center py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
            Agape Medical Education Audit Node v4.2
          </div>
        </div>
      </div>

      {/* E. 시스템 통합 모달 */}
      <EducationFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEducation(null);
        }}
        onSave={handleSave}
        education={selectedEducation}
      />
    </div>
  );
}
