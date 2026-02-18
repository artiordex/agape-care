/**
 * Description : page.tsx - ?? care/daily-nursing ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useState } from 'react';
import DailyCareHeader from './DailyCareHeader';
import DailyCareInfoCards from './DailyCareInfoCards';
import DailyCareResidentPanel from './DailyCareList';
import DailyCareTabs, { CareTabId } from './DailyCareTabs';

// 9개 간호 영역 세부 탭 컴포넌트
import BowelManagementTab, { BowelManagement } from './tabs/BowelManagementTab';
import CatheterManagementTab, { CatheterManagement } from './tabs/CatheterManagementTab';
import DailyMedicationTab from './tabs/DailyMedicationTab';
import NursingCareTab, { NursingCareNote } from './tabs/NursingCareTab';
import NursingRecordTab, { NursingNote } from './tabs/NursingRecordTab';
import TubeManagementTab, { TubeManagement } from './tabs/TubeManagementTab';
import VitalSignsTab from './tabs/VitalSignsTab';
import WoundCareTab, { WoundCare } from './tabs/WoundCareTab';

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

  const [woundData, setWoundData] = useState<WoundCare>({
    location: '',
    stage: '',
    size: { length: '', width: '', depth: '' },
    appearance: [],
    treatment: [],
    dressing: '',
    note: '',
  });

  const [tubeData, setTubeData] = useState<TubeManagement>({
    tubeType: 'none',
    insertionDate: '',
    changeDate: '',
    feedingAmount: '',
    feedingTimes: [],
    tubeStatus: [],
    note: '',
  });

  const [catheterData, setCatheterData] = useState<CatheterManagement>({
    actions: {
      catheterReplacement: false,
      bladderIrrigation: false,
      siteDisinfection: false,
      bagPositionCheck: false,
      bagEmpty: false,
      bagChange: false,
    },
    note: '',
    manager: '홍길동',
    urineRecords: [],
  });

  const [bowelData, setBowelData] = useState<BowelManagement>({
    observation: '',
    actions: {
      fluidSupply: false,
      abdominalMassage: false,
      constipationMedicine: false,
      antidiarrheal: false,
      suppository: false,
      enema: false,
      etc: false,
    },
    etcDetail: '',
    result: '',
    writer: '홍길동',
    diaperChangeTimes: new Array(12).fill(''),
  });

  const [nursingNoteData, setNursingNoteData] = useState<NursingNote>({
    date: selectedDate,
    type: 'external',
    hospital: '',
    writer: '최인경',
    content: '',
    hasReceipt: false,
    medicalCost: '0',
    medicalCostBilling: 'billed',
    pharmacyCost: '0',
    pharmacyCostBilling: 'billed',
    hasOuting: false,
    outingTime: '',
    guardian: '',
    relation: '',
    contact: '',
  });

  const [nursingCareData, setNursingCareData] = useState<NursingCareNote>({
    writer: '최인경',
    respiratory: {
      suction: false,
      humidifier: false,
      nebulizer: false,
      oxygen: false,
      etc: false,
      etcDetail: '',
    },
    skin: {
      woundCare: false,
      dressing: false,
      ointment: false,
      medicatedBath: false,
      etc: false,
      etcDetail: '',
    },
    pain: {
      compress: false,
      etc: false,
      etcDetail: '',
    },
    emergency: {
      unconscious: false,
      dyspnea: false,
      bleeding: false,
      choking: false,
      seizure: false,
      burn: false,
      fall: false,
      cardiacArrest: false,
      stroke: false,
      etc: false,
      etcDetail: '',
    },
    vaccination: {
      flu: false,
      pneumonia: false,
      covid: false,
      covidRound: '',
      etc: false,
      etcDetail: '',
    },
    otherTreatment: {
      dialysis: false,
      tracheostomy: false,
      criticalCare: false,
      etc: false,
      etcDetail: '',
    },
    detailNote: '',
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
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
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
          </div>
        </div>
      </div>
    </div>
  );
}
