'use client';

import React, { useState, useEffect } from 'react';
import DailyCareHeader from './DailyCareHeader';
import DailyCareResidentPanel from './DailyCareResidentPanel';
import DailyCareInfoCards from './DailyCareInfoCards';
import DailyCareTabs, { CareTabId } from './DailyCareTabs';
import NursingRecordTable from './NursingRecordTable';

// 9개 간호 영역 세부 탭 컴포넌트
import VitalSignsTab from './tabs/VitalSignsTab';
import DailyMedicationTab from './tabs/DailyMedicationTab';
import WoundCareTab from './tabs/WoundCareTab';
import TubeManagementTab from './tabs/TubeManagementTab';
import CatheterManagementTab from './tabs/CatheterManagementTab';
import BowelManagementTab from './tabs/BowelManagementTab';
import NursingRecordTab from './tabs/NursingRecordTab';
import NursingCareTab from './tabs/NursingCareTab';
import TechnicalNursingTab from './tabs/TechnicalNursingTab';

/**
 * [Main Page] 건강관리 및 간호일지 통합 관제 시스템
 * 아가페 그린(#5C8D5A) 테마 기반의 고밀도 ERP 워크스페이스
 */
export default function DailyCareRecordPage() {
  // 1. 관제 상태 관리: 날짜, 대상자, 활성 탭
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedResidentId, setSelectedResidentId] = useState('1');
  const [activeTab, setActiveTab] = useState<CareTabId>('vitals');
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * 2. 각 탭별 필수 데이터 상태 선언 (에러 해결 핵심)
   * 자식 컴포넌트(Tabs)에서 'record', 'care', 'note' 등으로 요구하는 상태값들입니다.
   */
  const [vitalData, setVitalData] = useState({
    time: '',
    bloodPressure: { systolic: '', diastolic: '' },
    pulse: '',
    temperature: '',
    respiration: '',
    weight: '',
    memo: { breakfast: '', lunch: '', dinner: '', snack: '' },
    excretion: { urine: 'yes', stool: '' },
  });

  const [woundData, setWoundData] = useState({
    location: '',
    stage: '',
    size: { length: '', width: '', depth: '' },
    appearance: [],
    treatment: [],
    dressing: '',
    note: '',
  });

  const [tubeData, setTubeData] = useState({
    tubeType: 'none',
    insertionDate: '',
    changeDate: '',
    feedingAmount: '',
    feedingTimes: [],
    tubeStatus: [],
    note: '',
  });

  const [catheterData, setCatheterData] = useState({
    hasCatheter: false,
    catheterType: '',
    insertionDate: '',
    changeDate: '',
    urineAmount: '',
    urineColor: '',
    catheterStatus: [],
    note: '',
  });

  const [bowelData, setBowelData] = useState({
    urineType: '',
    urineAmount: '',
    urineColor: '',
    stoolType: '',
    stoolAmount: '',
    stoolColor: '',
    note: '',
  });

  const [nursingNoteData, setNursingNoteData] = useState({
    date: selectedDate,
    type: '',
    hospital: '',
    doctorOpinion: '',
    diagnosis: '',
    cost: 0,
    costType: '',
    medicine: '',
    medicineTime: '',
    observation: '',
  });

  const [nursingCareData, setNursingCareData] = useState({
    staff: '',
    observations: { homeServices: false, homeNursing: false, endOfMeal: false, others: false },
    piercings: { oralIntake: false, feeding: false, bathing: false, nursing: false },
    observationNotes: '',
  });

  const [technicalNursingData, setTechnicalNursingData] = useState({
    services: { suction: false, oxygenTherapy: false, nebulizer: false, massage: false },
    otherDetail: '',
    note: '',
  });

  // 3. 수급자 마스터 데이터 (Mock)
  const residents = [
    {
      id: '1',
      name: '김영희',
      room: '101호',
      status: '입소중',
      hasLog: true,
      hasMedication: true,
      hasWound: false,
      hasTube: false,
      hasExcretion: true,
    },
    {
      id: '2',
      name: '박민수',
      room: '202호',
      status: '입소중',
      hasLog: false,
      hasMedication: false,
      hasWound: true,
      hasTube: false,
      hasExcretion: false,
    },
  ];

  // 4. 선택된 수급자 상세 정보 요약
  const selectedResident = {
    name: '김영희',
    gender: '여',
    age: 82,
    grade: '2등급',
    room: '101호',
    admissionDate: '2023-05-10',
    mainDiagnosis: '알츠하이머형 치매, 고혈압, 당뇨병',
  };

  const needsStatus = {
    physical: '보조필요',
    excretion: '기저귀사용',
    rehabilitation: '만성질환관리',
  };

  // 5. 저장 핸들러
  const handleSave = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert('✅ 해당 수급자의 간호 기록이 시스템에 안전하게 저장되었습니다.');
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* [상단] 날짜 및 출력 제어 헤더 */}
      <DailyCareHeader
        selectedDate={selectedDate}
        isProcessing={isProcessing}
        onDateChange={setSelectedDate}
        onPrintMonthly={() => alert('월간 간호기록지 출력을 생성합니다.')}
        onPrintHealth={() => alert('건강관리 기록지 출력을 생성합니다.')}
      />

      {/* [중단] 메인 워크스페이스: 2-Pane 관제 레이아웃 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 실시간 작성 현황 패널 */}
        <div className="w-[320px] shrink-0 border-r border-gray-300">
          <DailyCareResidentPanel
            residents={residents}
            selectedResidentId={selectedResidentId}
            onResidentSelect={setSelectedResidentId}
          />
        </div>

        {/* 우측: 상세 기록 및 입력 영역 */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
          <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto bg-[#f8fafc] p-6">
            {/* A. 수급자 정보 & 욕구사정 요약 */}
            <DailyCareInfoCards resident={selectedResident} needsStatus={needsStatus} />

            {/* B. 9대 간호 영역 전환 탭 */}
            <DailyCareTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* C. 탭별 세부 입력 서식 영역 */}
            <div className="animate-in fade-in rounded-b-xl border-x border-b border-gray-300 bg-white p-6 shadow-sm duration-500">
              <div className="mb-6 min-h-[400px]">
                {/* 1. 간호일지 (바이탈) */}
                {activeTab === 'vitals' && <VitalSignsTab record={vitalData} onChange={setVitalData} />}

                {/* 2. 투약관리 */}
                {activeTab === 'medication' && <DailyMedicationTab date={selectedDate} onManageMedication={() => {}} />}

                {/* 3. 욕창간호 */}
                {activeTab === 'wound' && <WoundCareTab care={woundData} onChange={setWoundData} onSave={handleSave} />}

                {/* 4. 비위관관리 */}
                {activeTab === 'tube' && (
                  <TubeManagementTab management={tubeData} onChange={setTubeData} onSave={handleSave} />
                )}

                {/* 5. 도뇨관관리 */}
                {activeTab === 'catheter' && (
                  <CatheterManagementTab management={catheterData} onChange={setCatheterData} onSave={handleSave} />
                )}

                {/* 6. 배설관리 */}
                {activeTab === 'bowel' && (
                  <BowelManagementTab management={bowelData} onChange={setBowelData} onSave={handleSave} />
                )}

                {/* 7. 진료기록 */}
                {activeTab === 'nursing' && (
                  <NursingRecordTab note={nursingNoteData} onChange={setNursingNoteData} onSave={handleSave} />
                )}

                {/* 8. 간호처치 */}
                {activeTab === 'care' && (
                  <NursingCareTab note={nursingCareData} onChange={setNursingCareData} onSave={handleSave} />
                )}

                {/* 9. 간호서류관리 */}
                {activeTab === 'technical' && (
                  <TechnicalNursingTab
                    management={technicalNursingData}
                    onChange={setTechnicalNursingData}
                    onSave={handleSave}
                  />
                )}
              </div>

              {/* 하단 통합 액션 버튼 (Agape-Green 스타일 적용) */}
              <div className="flex items-center justify-center gap-3 border-t border-gray-100 pt-8">
                <button
                  onClick={handleSave}
                  disabled={isProcessing}
                  className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-12 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <i className="ri-loader-4-line animate-spin text-lg"></i>
                  ) : (
                    <i className="ri-save-3-line text-lg"></i>
                  )}
                  간호 기록 저장 및 확정
                </button>
              </div>
            </div>

            {/* D. 하단 누적 기록 이력 테이블 */}
            <div className="mt-4">
              <NursingRecordTable records={[]} />
            </div>
          </div>
        </div>
      </div>

      {/* [하단] 시스템 보안 및 데이터 상태 바 */}
      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-5 text-[9px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-2 text-[#5C8D5A]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5C8D5A]"></span>
            Medical Data Sync Active
          </span>
          <span className="h-3 w-[1px] bg-gray-200"></span>
          <span>Security: Care Compliance Encryption</span>
        </div>
        <div className="text-[9px] font-black uppercase italic tracking-tighter text-[#5C8D5A]">
          Agape-Care Nursing Intelligence v4.2
        </div>
      </footer>
    </div>
  );
}
