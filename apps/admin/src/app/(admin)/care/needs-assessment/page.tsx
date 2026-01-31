'use client';

import { useState } from 'react';
import DiseaseStatusSection from './DiseaseStatusSection';
import GeneralStatusSection from './GeneralStatusSection';
import {
  CognitiveStatusSection,
  CommunicationSection,
  FamilyEnvironmentSection,
  NursingCareSection,
  RehabilitationSection,
  ResourceUsageSection,
  SubjectiveNeedsSection,
  SummarySection,
} from './OtherAssessmentSection';
import PhysicalStatusSection from './PhysicalStatusSection';

export default function NeedsAssessmentPage() {
  // 수급자 정보
  const [residentInfo, setResidentInfo] = useState({
    name: '',
    room: '',
    grade: '',
    assessmentDate: new Date().toISOString().split('T')[0],
  });

  // 1. 일반상태
  const [generalStatus, setGeneralStatus] = useState({
    nutritionStatus: '',
    mealType: [] as string[],
    mealForm: '',
    treatmentFood: [] as string[],
    oralStatus: [] as string[],
    urineStatus: '',
    stoolStatus: '',
    judgmentBasis: '',
  });

  // 2. 질병상태
  const [diseaseStatus, setDiseaseStatus] = useState({
    chronicDiseases: [] as string[],
    circulatorySystem: [] as string[],
    nervousSystem: [] as string[],
    musculoskeletalSystem: [] as string[],
    mentalHealth: [] as string[],
    respiratorySystem: [] as string[],
    cancerHistory: [] as string[],
    allergyHistory: [] as string[],
    pastHistory: '',
    currentDiagnosis: '',
    judgmentBasis: '',
  });

  // 3. 신체상태
  const [physicalStatus, setPhysicalStatus] = useState({
    basicActions: {} as { [key: string]: string },
    physicalFunctions: {} as { [key: string]: string },
    dailyActivities: {} as { [key: string]: string },
    judgmentBasis: '',
  });

  // 4-11. 기타 섹션들
  const [rehabilitation, setRehabilitation] = useState({ judgmentBasis: '' });
  const [nursingCare, setNursingCare] = useState({ judgmentBasis: '' });
  const [cognitive, setCognitive] = useState({ items: [] as string[], judgmentBasis: '' });
  const [communication, setCommunication] = useState({ judgmentBasis: '' });
  const [familyEnvironment, setFamilyEnvironment] = useState({ judgmentBasis: '' });
  const [resourceUsage, setResourceUsage] = useState({ judgmentBasis: '' });
  const [subjectiveNeeds, setSubjectiveNeeds] = useState({ judgmentBasis: '' });
  const [summary, setSummary] = useState({ summary: '' });

  // 섹션 업데이트 핸들러
  const updateSection = (section: string, field: string, value: any) => {
    const setters: { [key: string]: Function } = {
      generalStatus: setGeneralStatus,
      diseaseStatus: setDiseaseStatus,
      physicalStatus: setPhysicalStatus,
      rehabilitation: setRehabilitation,
      nursingCare: setNursingCare,
      cognitive: setCognitive,
      communication: setCommunication,
      familyEnvironment: setFamilyEnvironment,
      resourceUsage: setResourceUsage,
      subjectiveNeeds: setSubjectiveNeeds,
      summary: setSummary,
    };

    const setter = setters[section];
    if (setter) {
      setter((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  // 저장 핸들러
  const handleSave = () => {
    alert('욕구사정평가가 임시저장되었습니다.');
    console.log({
      residentInfo,
      generalStatus,
      diseaseStatus,
      physicalStatus,
      rehabilitation,
      nursingCare,
      cognitive,
      communication,
      familyEnvironment,
      resourceUsage,
      subjectiveNeeds,
      summary,
    });
  };

  // 제출 핸들러
  const handleSubmit = () => {
    // 필수 필드 검증
    if (!residentInfo.name) {
      alert('수급자명을 입력하세요');
      return;
    }

    if (!generalStatus.judgmentBasis) {
      alert('일반상태 판단근거를 입력하세요');
      return;
    }

    if (!summary.summary) {
      alert('총평을 입력하세요');
      return;
    }

    if (confirm('욕구사정평가를 제출하시겠습니까?')) {
      alert('욕구사정평가가 제출되었습니다.');
      // TODO: API 호출
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">욕구사정 (시설급여)</h1>
            <p className="mt-1 text-sm text-gray-600">수급자의 욕구사정 평가를 작성하세요</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              임시저장
            </button>
            <button
              onClick={handleSubmit}
              className="rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              제출
            </button>
          </div>
        </div>

        {/* 수급자 기본 정보 */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-gray-900">수급자 기본 정보</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                수급자명 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={residentInfo.name}
                onChange={e => setResidentInfo({ ...residentInfo, name: e.target.value })}
                placeholder="이름 입력"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">생활실</label>
              <input
                type="text"
                value={residentInfo.room}
                onChange={e => setResidentInfo({ ...residentInfo, room: e.target.value })}
                placeholder="예: 101호"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">등급</label>
              <select
                value={residentInfo.grade}
                onChange={e => setResidentInfo({ ...residentInfo, grade: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">선택</option>
                <option value="1">1등급</option>
                <option value="2">2등급</option>
                <option value="3">3등급</option>
                <option value="4">4등급</option>
                <option value="5">5등급</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">평가일</label>
              <input
                type="date"
                value={residentInfo.assessmentDate}
                onChange={e => setResidentInfo({ ...residentInfo, assessmentDate: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 1. 일반상태 (영양상태) */}
        <GeneralStatusSection
          data={generalStatus}
          onChange={(field, value) => updateSection('generalStatus', field, value)}
        />

        {/* 2. 주요 질병 상태 */}
        <DiseaseStatusSection
          data={diseaseStatus}
          onChange={(field, value) => updateSection('diseaseStatus', field, value)}
        />

        {/* 3. 신체 상태 */}
        <PhysicalStatusSection
          data={physicalStatus}
          onChange={(field, value) => updateSection('physicalStatus', field, value)}
        />

        {/* 4. 재활 상태 */}
        <RehabilitationSection
          data={rehabilitation}
          onChange={(field: string, value: any) => updateSection('rehabilitation', field, value)}
        />

        {/* 5. 간호처치 상태 */}
        <NursingCareSection
          data={nursingCare}
          onChange={(field: string, value: any) => updateSection('nursingCare', field, value)}
        />

        {/* 6. 인지 상태 */}
        <CognitiveStatusSection
          data={cognitive}
          onChange={(field: string, value: any) => updateSection('cognitive', field, value)}
        />

        {/* 7. 의사소통 */}
        <CommunicationSection
          data={communication}
          onChange={(field: string, value: any) => updateSection('communication', field, value)}
        />

        {/* 8. 가족 및 환경상태 */}
        <FamilyEnvironmentSection
          data={familyEnvironment}
          onChange={(field: string, value: any) => updateSection('familyEnvironment', field, value)}
        />

        {/* 9. 자원 이용 */}
        <ResourceUsageSection
          data={resourceUsage}
          onChange={(field: string, value: any) => updateSection('resourceUsage', field, value)}
        />

        {/* 10. 주관적 욕구 */}
        <SubjectiveNeedsSection
          data={subjectiveNeeds}
          onChange={(field: string, value: any) => updateSection('subjectiveNeeds', field, value)}
        />

        {/* 11. 총평 */}
        <SummarySection
          data={summary}
          onChange={(field: string, value: any) => updateSection('summary', field, value)}
        />

        {/* 하단 버튼 */}
        <div className="flex items-center justify-end gap-2 rounded-lg border border-gray-200 bg-white px-6 py-4">
          <button
            onClick={handleSave}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            className="rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
