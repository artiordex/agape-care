/**
 * Description : page.tsx - ?? resident/info ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import ResidentFormModal from './modal/ResidentFormModal';
import ResidentRegistrationModal from './modal/ResidentRegistrationModal';
import ResidentHeader from './ResidentHeader';
import ResidentList from './ResidentList';
import ResidentProfile from './ResidentProfile';
import ResidentTabs from './ResidentTabs';

/* 11개 상세 관리 탭 컴포넌트 임포트 */
import AssessmentTab from './tabs/AssessmentTab';
import BasicInfoTab from './tabs/BasicInfoTab';
import CareSummaryTab from './tabs/CareSummaryTab';
import ConsultationTab from './tabs/ConsultationTab';
import CopaymentTab from './tabs/CopaymentTab';
import DocumentsTab from './tabs/DocumentsTab';
import ExtraCostTab from './tabs/ExtraCostTab';
import GuardiansTab from './tabs/GuardiansTab';
import MedicationTab from './tabs/MedicationTab';
import StandardContractTab from './tabs/StandardContractTab';

// JSON 데이터 import
import residentsData from '@/data/resident.json';

/**
 * [Main Page] 입소자 통합 관리 관제 시스템
 * 아가페 그린(#5C8D5A) 테마 기반의 고밀도 ERP 레이아웃
 */
export default function ResidentManagementPage() {
  const router = useRouter();
  // 1. 상태 관리: 데이터 및 UI 제어
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterClassification, setFilterClassification] = useState('전체');
  const [filterRoom, setFilterRoom] = useState('전체');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 2. JSON 데이터 변환 (평면 구조로)
  const residents = useMemo(() => {
    return residentsData.residents.map(resident => ({
      id: resident.id,
      name: resident.personalInfo.name,
      gender: resident.personalInfo.gender,
      birthDate: resident.personalInfo.birthDate,
      registrationNumber: resident.personalInfo.registrationNumber,
      phone: resident.personalInfo.phone,
      address: resident.personalInfo.address.full,
      admissionDate: resident.admissionInfo.admissionDate,
      dischargeDate: resident.admissionInfo.dischargeDate,
      status: resident.admissionInfo.status,
      room: resident.admissionInfo.room,
      grade: resident.insuranceInfo.grade,
      gradeValidUntil: resident.insuranceInfo.gradeValidUntil,
      copaymentRate: resident.insuranceInfo.copaymentRate,
      mainDiseases: resident.healthInfo.mainDiseases,
      mobility: resident.healthInfo.mobility,
      cognition: resident.healthInfo.cognition,
      mealStatus: resident.healthInfo.mealStatus,
      toiletStatus: resident.healthInfo.toiletStatus,
      medications: resident.healthInfo.medications,
      allergies: resident.healthInfo.allergies,
      specialNotes: resident.healthInfo.specialNotes,
      bloodPressure: resident.healthInfo.vitalSigns.bloodPressure,
      bloodSugar: resident.healthInfo.vitalSigns.bloodSugar,
      height: resident.healthInfo.vitalSigns.height,
      weight: resident.healthInfo.vitalSigns.weight,
      guardians: resident.guardians,
    }));
  }, []);

  // 3. 검색 및 필터링
  const filteredResidents = useMemo(() => {
    return residents.filter(resident => {
      const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === '전체' || resident.status === filterStatus;
      const matchesRoom = filterRoom === '전체' || resident.room === filterRoom;

      let matchesClassification = false;
      if (filterClassification === '전체') {
        matchesClassification = true;
      } else {
        const rate = resident.copaymentRate;
        const grade = resident.grade;

        switch (filterClassification) {
          case '일반 (20%)':
            matchesClassification = rate === 20;
            break;
          case '감경 (12%)':
            matchesClassification = rate === 12;
            break;
          case '감경 (10%)':
            matchesClassification = rate === 10;
            break; // 데이터 구분 필요 시 추가 로직
          case '감경 (8%)':
            matchesClassification = rate === 8;
            break;
          case '기초 (0%)':
            matchesClassification = rate === 0;
            break;
          case '의료 (10%)':
            matchesClassification = rate === 10;
            break; // 10% 중복, 우선 rate 일치로 처리
          case '의료 (8%)':
            matchesClassification = rate === 8;
            break; // 8% 중복
          case '등급외':
            matchesClassification = grade.includes('등급외');
            break;
          default:
            matchesClassification = true;
        }
      }

      return matchesSearch && matchesStatus && matchesClassification && matchesRoom;
    });
  }, [residents, searchTerm, filterStatus, filterClassification, filterRoom]);

  // 성함/상태 변경 시 첫 번째 어르신 자동 선택 (선택된 어르신이 목록에 없을 경우)
  React.useEffect(() => {
    if (filteredResidents.length > 0) {
      const isSelectedInFiltered = filteredResidents.some(r => r.id === selectedResident?.id);
      if (!isSelectedInFiltered) {
        setSelectedResident(filteredResidents[0]);
      }
    } else {
      setSelectedResident(null);
    }
  }, [filteredResidents, selectedResident?.id]);

  // 4. 아가페 표준 상태 컬러 매핑 (Green 테마 최적화)
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

  // 5. 11개 탭 콘텐츠 동적 렌더링 로직
  const renderTabContent = () => {
    if (!selectedResident) return null;

    switch (activeTab) {
      case 'basic':
        return <BasicInfoTab resident={selectedResident} />;
      case 'standard-contract':
        return <StandardContractTab />;
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
        onEditResident={() => setIsEditModalOpen(true)}
      />
      {/* ... */}

      {/* [중단] 메인 워크스페이스 (좌: 목록 / 우: 상세) */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 입소자 마스터 리스트 */}
        <div className={clsx('h-full flex-col md:flex', selectedResident ? 'hidden' : 'flex w-full', 'md:w-1/3.5')}>
          <ResidentList
            residents={filteredResidents}
            selectedResident={selectedResident}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            filterClassification={filterClassification}
            filterRoom={filterRoom}
            onSelectResident={setSelectedResident}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterStatus}
            onFilterClassificationChange={setFilterClassification}
            onFilterRoomChange={setFilterRoom}
            getStatusColor={getStatusColor}
            getGradeColor={getGradeColor}
            onAddResident={() => setIsRegistrationModalOpen(true)}
          />
        </div>

        {/* 우측: 상세 정보 관제 센터 */}
        <div
          className={clsx(
            'flex-1 flex-col overflow-hidden bg-white shadow-inner',
            selectedResident ? 'flex' : 'hidden md:flex',
          )}
        >
          {selectedResident ? (
            <>
              {/* 모바일용 뒤로가기 버튼 (명부로 돌아가기) */}
              <div className="flex items-center gap-2 border-b border-gray-200 bg-white p-2 md:hidden">
                <button
                  onClick={() => setSelectedResident(null)}
                  className="flex items-center gap-1 py-1 text-[12px] font-black text-[#5C8D5A]"
                >
                  <i className="ri-arrow-left-s-line text-lg"></i>명부로 돌아가기
                </button>
              </div>

              {/* 프로필 및 실시간 바이탈 보드 */}
              <ResidentProfile
                resident={selectedResident}
                getStatusColor={getStatusColor}
                getGradeColor={getGradeColor}
                onDownloadContract={() => alert('계약서 생성을 시작합니다.')}
              />

              {/* 11개 관리 섹션 탭 내비게이션 */}
              <ResidentTabs activeTab={activeTab as any} onTabChange={setActiveTab} />

              {/* 탭별 세부 데이터 출력 영역 (스크롤 가능) */}
              <main className="custom-scrollbar flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-6">
                <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto max-w-7xl duration-500">
                  {renderTabContent()}
                </div>
              </main>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center bg-[#f8fafc]">
              <div className="relative mb-6">
                <i className="ri-user-search-fill text-9xl text-[#5C8D5A]/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-1 animate-pulse rounded-full bg-[#5C8D5A]/20" />
                </div>
              </div>
              <h3 className="text-[15px] font-black tracking-tight text-gray-900">관리 대상을 선택하세요</h3>
              <p className="mt-2 px-4 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400">
                좌측 입소자 명부에서 조회할 어르신을 클릭해 주세요.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 신규 등록 모달 */}
      <ResidentRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSave={() => {
          alert('신규 입소자 등록이 완료되었습니다.');
          setIsRegistrationModalOpen(false);
        }}
      />

      {/* 기본정보 수정 모달 */}
      <ResidentFormModal
        isOpen={isEditModalOpen}
        mode="edit"
        initialData={selectedResident}
        onClose={() => setIsEditModalOpen(false)}
        onSave={() => {
          alert('정보 수정이 완료되었습니다.');
          setIsEditModalOpen(false);
        }}
        onDelete={id => {
          if (confirm('정말로 이 입소자 정보를 삭제하시겠습니까?')) {
            alert('삭제되었습니다.');
            setIsEditModalOpen(false);
            setSelectedResident(null);
          }
        }}
      />
    </div>
  );
}
