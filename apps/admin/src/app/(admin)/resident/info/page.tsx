'use client';

import { useState } from 'react';
import ResidentList from './ResidentList';
import ResidentProfile from './ResidentProfile';
import ResidentTabs from './ResidentTabs';
import AdmissionHistoryTab from './tabs/AdmissionHistoryTab';
import AssessmentTab from './tabs/AssessmentTab';
import BasicInfoTab from './tabs/BasicInfoTab';
import CarePlanTab from './tabs/CarePlanTab';
import CareSummaryTab from './tabs/CareSummaryTab';
import ConsultationTab from './tabs/ConsultationTab';
import CopaymentTab from './tabs/CopaymentTab';
import DocumentsTab from './tabs/DocumentsTab';
import ExtraCostTab from './tabs/ExtraCostTab';
import GuardiansTab from './tabs/GuardiansTab';
import MedicationTab from './tabs/MedicationTab';

interface Guardian {
  name: string;
  relation: string;
  phone: string;
  email: string;
  address: string;
  receiveNotice: boolean;
}

interface Resident {
  id: number;
  name: string;
  photo: string;
  gender: string;
  birthDate: string;
  registrationNumber: string;
  phone: string;
  address: string;
  admissionDate: string;
  dischargeDate: string | null;
  status: string;
  room: string;
  grade: string;
  gradeValidUntil: string;
  copaymentRate: number;
  mainDiseases: string[];
  mobility: string;
  cognition: string;
  mealStatus: string;
  toiletStatus: string;
  medications: string[];
  allergies: string[];
  specialNotes: string;
  bloodPressure: string;
  bloodSugar: string;
  height: number;
  weight: number;
  guardians: Guardian[];
}

import { api } from '@/lib/api';

export default function ResidentManagement() {
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [showEditModal, setShowEditModal] = useState(false);

  // API 호출
  const { data: residentsData, isLoading } = api.resident.getResidents.useQuery(['residents']);

  const residents = residentsData?.status === 200 ? residentsData.body.residents : [];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-loader-4-line animate-spin text-3xl text-blue-600"></i>
          <p className="mt-2 text-sm text-gray-600">입소자 목록을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  const filteredResidents = residents.filter((r: Resident) => {
    const matchSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.grade.includes(searchTerm);
    const matchStatus = filterStatus === '전체' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-blue-50 text-blue-700';
      case '퇴소':
        return 'bg-gray-100 text-gray-700';
      case '대기':
        return 'bg-amber-50 text-amber-700';
      case '상담':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1등급')) return 'bg-red-50 text-red-700';
    if (grade.includes('2등급')) return 'bg-orange-50 text-orange-700';
    if (grade.includes('3등급')) return 'bg-yellow-50 text-yellow-700';
    if (grade.includes('4등급')) return 'bg-green-50 text-green-700';
    if (grade.includes('5등급')) return 'bg-blue-50 text-blue-700';
    return 'bg-purple-50 text-purple-700';
  };

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
        return <GuardiansTab guardians={selectedResident.guardians} onAddGuardian={() => {}} />;
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
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <i className="ri-file-list-line mb-3 text-4xl text-gray-300"></i>
            <p className="text-sm text-gray-500">준비 중입니다</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* 좌측 - 입소자 목록 */}
      <ResidentList
        residents={filteredResidents}
        selectedResident={selectedResident}
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSelectResident={setSelectedResident}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterStatus}
        onAddResident={() => {}}
        getStatusColor={getStatusColor}
        getGradeColor={getGradeColor}
      />

      {/* 우측 - 상세 정보 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedResident ? (
          <>
            {/* 프로필 헤더 */}
            <ResidentProfile
              resident={selectedResident}
              getStatusColor={getStatusColor}
              getGradeColor={getGradeColor}
              onEdit={() => setShowEditModal(true)}
              onDownloadContract={() => {}}
            />

            {/* 탭 네비게이션 */}
            <ResidentTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* 탭 내용 */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">{renderTabContent()}</div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <i className="ri-user-line mb-4 text-6xl text-gray-300"></i>
              <p className="text-sm text-gray-500">입소자를 선택하세요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
