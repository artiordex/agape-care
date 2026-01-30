'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import AdmissionHistoryTab from '../../tabs/AdmissionHistoryTab';
import AssessmentTab from '../../tabs/AssessmentTab';
import BasicInfoTab from '../../tabs/BasicInfoTab';
import CarePlanTab from '../../tabs/CarePlanTab';
import CareSummaryTab from '../../tabs/CareSummaryTab';
import ConsultationTab from '../../tabs/ConsultationTab';
import CopaymentTab from '../../tabs/CopaymentTab';
import DocumentsTab from '../../tabs/DocumentsTab';
import ExtraCostTab from '../../tabs/ExtraCostTab';
import GuardiansTab from '../../tabs/GuardiansTab';
import MedicationTab from '../../tabs/MedicationTab';
import ResidentDetailProfile from './ResidentDetailProfile';
import ResidentDetailTabs from './ResidentDetailTabs';

import { api } from '@/lib/api';

// ... imports ...

export default function ResidentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [activeTab, setActiveTab] = useState('basic');

  const { data: residentData, isLoading } = api.resident.getResident.useQuery(
    ['resident', id],
    {
      params: { id },
    },
    {
      enabled: !!id,
    },
  );

  const resident = residentData?.status === 200 ? residentData.body : null;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-loader-4-line animate-spin text-3xl text-blue-600"></i>
          <p className="mt-2 text-sm text-gray-600">입소자 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-error-warning-line text-3xl text-red-600"></i>
          <p className="mt-2 text-sm text-gray-600">입소자 정보를 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push('/resident/info')}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

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

  const handleBack = () => {
    router.push('/resident/info');
  };

  const handleEdit = () => {
    router.push(`/resident/edit/${resident.id}`);
  };

  const handleDownloadContract = () => {
    alert('계약서 다운로드 기능은 준비 중입니다.');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoTab resident={resident} />;
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
        return <GuardiansTab guardians={resident.guardians} onAddGuardian={() => {}} />;
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
    <div className="flex h-full flex-col bg-gray-50">
      {/* Header with Back Button */}
      <div className="border-b border-gray-200 bg-white px-6 py-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <i className="ri-arrow-left-line"></i>
          <span className="font-medium">목록으로</span>
        </button>
      </div>

      {/* Profile Header */}
      <ResidentDetailProfile
        resident={resident}
        getStatusColor={getStatusColor}
        getGradeColor={getGradeColor}
        onEdit={handleEdit}
        onDownloadContract={handleDownloadContract}
      />

      {/* Tabs Navigation */}
      <ResidentDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">{renderTabContent()}</div>
    </div>
  );
}
