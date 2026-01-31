'use client';

import React, { useState } from 'react';
import ResidentHeader from './ResidentHeader';
import ResidentList from './ResidentList';
import ResidentProfile from './ResidentProfile';
import ResidentTabs from './ResidentTabs';

// 기존 탭 콘텐츠 컴포넌트들 (기존 경로 유지)
import BasicInfoTab from './tabs/BasicInfoTab';
import CarePlanTab from './tabs/CarePlanTab';
import AssessmentTab from './tabs/AssessmentTab';
// ... 기타 탭 컴포넌트 생략

/**
 * [Main] 입소자 통합 관리 관제 페이지
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 레이아웃 통합
 */
export default function ResidentManagement() {
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. 상태별 컬러 매핑 (아가페 그린 테마 적용)
  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-emerald-50 text-[#5C8D5A] border-emerald-100';
      case '퇴소':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case '대기':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case '상담':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1등급')) return 'bg-red-50 text-red-700 border-red-100';
    if (grade.includes('2등급')) return 'bg-orange-50 text-orange-700 border-orange-100';
    return 'bg-[#5C8D5A]/10 text-[#5C8D5A] border-[#5C8D5A]/20';
  };

  // 2. 신규 입소자 등록 핸들러
  const handleAddResident = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert('신규 입소자 등록 마법사가 실행됩니다.');
      setIsProcessing(false);
    }, 500);
  };

  // 3. 탭 콘텐츠 렌더링 로직
  const renderTabContent = () => {
    if (!selectedResident) return null;
    switch (activeTab) {
      case 'basic':
        return <BasicInfoTab resident={selectedResident} />;
      case 'care-plan':
        return <CarePlanTab />;
      // ... 추가 탭 매핑
      default:
        return (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-20 text-center">
            <i className="ri-tools-line mb-3 text-4xl text-gray-200"></i>
            <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400">해당 섹션 데이터 고도화 중</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* [파일 1] 통합 헤더: 전체 상태 및 전역 액션 제어 */}
      <ResidentHeader
        selectedResidentName={selectedResident?.name || null}
        isProcessing={isProcessing}
        onAddResident={handleAddResident}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* [파일 2] 좌측 사이드바: 입소자 마스터 리스트 */}
        <ResidentList
          residents={[]} // API 데이터 연동 영역
          selectedResident={selectedResident}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSelectResident={setSelectedResident}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          getStatusColor={getStatusColor}
          getGradeColor={getGradeColor}
        />

        {/* 우측 메인 영역: 상세 정보 및 바이탈 관제 */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {selectedResident ? (
            <>
              {/* [파일 3] 프로필 섹션: 핵심 지표 및 바이탈 보드 */}
              <ResidentProfile
                resident={selectedResident}
                getStatusColor={getStatusColor}
                getGradeColor={getGradeColor}
                onDownloadContract={() => alert('계약서 생성을 시작합니다.')}
              />

              {/* [파일 4] 상세 탭 내비게이션 */}
              <ResidentTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* 탭 내용 영역 (스크롤 가능) */}
              <main className="custom-scrollbar flex-1 overflow-y-auto bg-[#f8fafc] p-6">
                <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto max-w-6xl duration-500">
                  {renderTabContent()}
                </div>
              </main>
            </>
          ) : (
            /* 미선택 시 대기 화면 */
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 text-gray-300">
              <div className="relative mb-6">
                <i className="ri-user-search-line text-8xl opacity-20"></i>
                <div className="absolute inset-0 animate-pulse bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
              </div>
              <p className="text-[14px] font-black uppercase tracking-[0.3em]">Select a Resident to View Details</p>
              <p className="mt-2 text-[11px] font-bold text-gray-400">좌측 명부에서 관리할 어르신을 선택해 주세요.</p>
            </div>
          )}
        </div>
      </div>

      {/* 시스템 상태 하단 바 */}
      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5C8D5A]"></span>
            DB Connected
          </span>
          <span>● Last Sync: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-tighter text-[#5C8D5A]">
          Agape-Care Resident Management Intelligence
        </div>
      </footer>
    </div>
  );
}
