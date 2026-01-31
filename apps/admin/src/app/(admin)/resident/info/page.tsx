'use client';

import React, { useState } from 'react';
import ResidentHeader from './ResidentHeader';
import ResidentList from './ResidentList';
import ResidentProfile from './ResidentProfile';
import ResidentTabs from './ResidentTabs';

/* 11개 상세 관리 탭 컴포넌트 임포트 */
import BasicInfoTab from './tabs/BasicInfoTab';
import CarePlanTab from './tabs/CarePlanTab';
import AssessmentTab from './tabs/AssessmentTab';
import ConsultationTab from './tabs/ConsultationTab';
import ExtraCostTab from './tabs/ExtraCostTab';
import CopaymentTab from './tabs/CopaymentTab';
import GuardiansTab from './tabs/GuardiansTab';
import AdmissionHistoryTab from './tabs/AdmissionHistoryTab';
import DocumentsTab from './tabs/DocumentsTab';
import MedicationTab from './tabs/MedicationTab';
import CareSummaryTab from './tabs/CareSummaryTab';

/**
 * [Main Page] 입소자 통합 관리 관제 시스템
 * 아가페 그린(#5C8D5A) 테마 기반의 고밀도 ERP 레이아웃
 */
export default function ResidentManagementPage() {
  // 1. 상태 관리: 데이터 및 UI 제어
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [isProcessing, setIsProcessing] = useState(false);

  // 2. 아가페 표준 상태 컬러 매핑 (Green 테마 최적화)
  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-emerald-50 text-[#5C8D5A] border-emerald-100';
      case '퇴소':
        return 'bg-gray-100 text-gray-500 border-gray-200';
      case '대기':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case '상담':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-400';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1등급')) return 'bg-red-50 text-red-700 border-red-100';
    if (grade.includes('2등급')) return 'bg-orange-50 text-orange-700 border-orange-100';
    return 'bg-[#5C8D5A]/10 text-[#5C8D5A] border-[#5C8D5A]/20';
  };

  // 3. 11개 탭 콘텐츠 동적 렌더링 로직
  const renderTabContent = () => {
    if (!selectedResident) return null;

    switch (activeTab) {
      case 'basic':
        return <BasicInfoTab resident={selectedResident} />;
      case 'care-plan':
        return <CarePlanTab />;
      case 'assessment':
        return <AssessmentTab />;
      case 'consultation':
        return <ConsultationTab />;
      case 'extra-cost':
        return <ExtraCostTab />;
      case 'copayment':
        return <CopaymentTab />;
      case 'guardians':
        return <GuardiansTab guardians={selectedResident.guardians} />;
      case 'admission-history':
        return <AdmissionHistoryTab />;
      case 'documents':
        return <DocumentsTab />;
      case 'medication':
        return <MedicationTab />;
      case 'care-summary':
        return <CareSummaryTab />;
      default:
        return (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
            <i className="ri-error-warning-line mb-2 text-4xl text-gray-200"></i>
            <p className="text-[13px] font-black uppercase tracking-widest text-gray-400">
              해당 섹션의 데이터를 구성 중입니다
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* [상단] 리팩토링된 ResidentHeader 적용 */}
      <ResidentHeader
        selectedResidentName={selectedResident?.name || null}
        isProcessing={isProcessing}
        onAddResident={() => {
          setIsProcessing(true);
          setTimeout(() => {
            alert('신규 입소자 등록 시스템을 호출합니다.');
            setIsProcessing(false);
          }, 500);
        }}
      />

      {/* [중단] 메인 워크스페이스 (좌: 목록 / 우: 상세) */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 입소자 마스터 리스트 */}
        <ResidentList
          residents={[]} // API 데이터 연동 영역 (filteredResidents 등)
          selectedResident={selectedResident}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSelectResident={setSelectedResident}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          getStatusColor={getStatusColor}
          getGradeColor={getGradeColor}
        />

        {/* 우측: 상세 정보 관제 센터 */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white shadow-inner">
          {selectedResident ? (
            <>
              {/* 프로필 및 실시간 바이탈 보드 */}
              <ResidentProfile
                resident={selectedResident}
                getStatusColor={getStatusColor}
                getGradeColor={getGradeColor}
                onDownloadContract={() => alert('계약서 생성을 시작합니다.')}
              />

              {/* 11개 관리 섹션 탭 내비게이션 */}
              <ResidentTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* 탭별 세부 데이터 출력 영역 (스크롤 가능) */}
              <main className="custom-scrollbar flex-1 overflow-y-auto bg-[#f8fafc] p-6">
                <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto max-w-7xl duration-500">
                  {renderTabContent()}
                </div>
              </main>
            </>
          ) : (
            /* 미선택 시 대기 화면 */
            <div className="flex flex-1 flex-col items-center justify-center bg-[#f8fafc]">
              <div className="relative mb-6">
                <i className="ri-user-search-fill text-9xl text-[#5C8D5A]/10"></i>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-1 animate-pulse rounded-full bg-[#5C8D5A]/20"></div>
                </div>
              </div>
              <h3 className="text-[15px] font-black tracking-tight text-gray-900">관리 대상을 선택하세요</h3>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                좌측 입소자 명부에서 조회할 어르신을 클릭해 주세요.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* [하단] 시스템 상태 정보 바 */}
      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5C8D5A]"></span>
            Cloud Node Active
          </span>
          <span>● Last Sync: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-tighter text-[#5C8D5A]">
          Agape-Care Intelligence System / Resident Management v2.4
        </div>
      </footer>
    </div>
  );
}
