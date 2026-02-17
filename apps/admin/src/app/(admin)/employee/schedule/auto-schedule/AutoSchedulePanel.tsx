'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { DEFAULT_RULES, ScheduleRule } from '../schedule.type';
import StaffSelectionList from '../StaffSelectionList';
import AutoScheduleSettings from './AutoScheduleSettings';
import SchedulePreview from './SchedulePreview';
import { ScheduleGenerator } from './ScheduleGenerator';

// 테스트용 샘플 데이터
const SAMPLE_STAFF = [
  { id: 'ST001', name: '김철수', position: '선임요양보호사', status: '재직' },
  { id: 'ST002', name: '이영희', position: '요양보호사', status: '재직' },
  { id: 'ST003', name: '박민수', position: '사회복지사', status: '재직' },
  { id: 'ST004', name: '최지은', position: '간호조무사', status: '재직' },
  { id: 'ST005', name: '정다혜', position: '요양보호사', status: '재직' },
];

/**
 * [컴포넌트] 자동 근무표 생성 통합 제어 패널
 * 아가페 표준 UI 및 단계별 프로세스 관리 엔진
 */
export default function AutoSchedulePanel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);

  // 생성 옵션 상태 (schedule.type 규격 준수)
  const [config, setConfig] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    selectedStaffIds: SAMPLE_STAFF.map(s => s.id), // 초기값 5명 전체 선택
    rules: DEFAULT_RULES,
  });

  const steps = [
    { id: 1, label: '기간 및 직원 선택', icon: 'ri-user-follow-line' },
    { id: 2, label: '근무 규칙 구성', icon: 'ri-settings-4-line' },
    { id: 3, label: '생성 및 미리보기', icon: 'ri-magic-line' },
  ];

  const handleNext = () => currentStep < 3 && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  // 지능형 배정 알고리즘 실행
  const handleGenerate = () => {
    setIsGenerating(true);

    // 비동기 시뮬레이션 후 결과 산출
    setTimeout(() => {
      const selectedStaff = SAMPLE_STAFF.filter(s => config.selectedStaffIds.includes(s.id));
      const generator = new ScheduleGenerator(
        config.rules,
        selectedStaff,
        new Date(config.startDate),
        new Date(config.endDate),
        '본관',
        '1층',
      );

      const result = generator.generate();
      setGenerationResult(result);
      setIsGenerating(false);
      handleNext();
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col font-sans text-gray-900 antialiased">
      {/* 1. 상단 프로세스 인디케이터 (완전 직각형) */}
      <div className="flex border-b border-gray-300 bg-[#f8fafc]">
        {steps.map(step => (
          <div
            key={step.id}
            className={clsx(
              'flex flex-1 items-center justify-center gap-3 border-r border-gray-200 py-4 transition-all last:border-r-0',
              currentStep === step.id ? 'bg-white text-[#5C8D5A] shadow-[inset_0_-3px_0_#5C8D5A]' : 'text-gray-400',
            )}
          >
            <div
              className={clsx(
                'flex h-6 w-6 items-center justify-center rounded-none border-2 text-[11px] font-black',
                currentStep === step.id ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white' : 'border-gray-200',
              )}
            >
              {step.id}
            </div>
            <span className="text-[12px] font-black uppercase tracking-tighter">{step.label}</span>
          </div>
        ))}
      </div>

      {/* 2. 메인 컨텐츠 영역 (고밀도 ERP 레이아웃) */}
      <div className="flex-1 overflow-y-auto bg-white p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* 단계 1: 기간 및 인원 선택 */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
              <SectionHeader title="배정 기간 설정" desc="자동 근무 생성을 수행할 대상 기간을 지정하십시오." />
              <div className="grid grid-cols-2 gap-4">
                <DateInput
                  label="시작 일자"
                  value={config.startDate}
                  onChange={v => setConfig({ ...config, startDate: v })}
                />
                <DateInput
                  label="종료 일자"
                  value={config.endDate}
                  onChange={v => setConfig({ ...config, endDate: v })}
                />
              </div>

              <SectionHeader title="대상 인력 필터링" desc="근무 배치 노드에 포함될 직원을 선별하십시오." />
              <div className="h-[400px]">
                <StaffSelectionList
                  staffList={SAMPLE_STAFF}
                  selectedIds={config.selectedStaffIds}
                  onSelectionChange={ids => setConfig({ ...config, selectedStaffIds: ids })}
                />
              </div>
            </div>
          )}

          {/* 단계 2: 상세 규칙 구성 */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
              <SectionHeader title="배치 제약 조건" desc="법정 근로 기준 및 시설 운영 프로토콜을 설정하십시오." />
              <AutoScheduleSettings
                rules={config.rules}
                onChange={newRules => setConfig({ ...config, rules: newRules })}
              />
            </div>
          )}

          {/* 단계 3: 결과 검증 및 미리보기 */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
              <SectionHeader
                title="생성 결과 정밀 검토"
                desc="알고리즘이 도출한 배치안의 유효성을 최종 확인하십시오."
              />
              <SchedulePreview
                startDate={config.startDate}
                endDate={config.endDate}
                staffList={SAMPLE_STAFF.filter(s => config.selectedStaffIds.includes(s.id))}
                generatedSchedules={generationResult?.schedules || []}
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. 하단 액션 제어 바 */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-[#f8fafc] p-5">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest text-gray-400">
          <i className="ri-shield-check-line text-[#5C8D5A]"></i>
          Agape Optimization Engine v2.4.1
        </div>

        <div className="flex gap-2">
          {currentStep > 1 && (
            <button
              onClick={handlePrev}
              className="rounded-none border border-gray-300 bg-white px-6 py-2.5 text-[12px] font-black text-gray-600 transition-all hover:bg-gray-50"
            >
              이전 단계
            </button>
          )}

          {currentStep < 3 ? (
            <button
              onClick={currentStep === 2 ? handleGenerate : handleNext}
              disabled={isGenerating || config.selectedStaffIds.length === 0}
              className="flex items-center gap-2 rounded-none bg-[#5C8D5A] px-8 py-2.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95 disabled:bg-gray-300"
            >
              {isGenerating ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  지능형 배정 연산 중...
                </>
              ) : (
                <>
                  {currentStep === 2 ? '자동 근무표 생성 실행' : '다음 단계로'}
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => alert('최종 배정 결과가 시스템 마스터 데이터로 동기화되었습니다.')}
              className="rounded-none bg-[#5C8D5A] px-10 py-2.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
            >
              최종 근무표 확정 및 적용
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** [Sub] 섹션 헤더 */
function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-l-4 border-[#5C8D5A] pl-4">
      <h4 className="text-[16px] font-black tracking-tight text-gray-900">{title}</h4>
      <p className="mt-1 text-[12px] font-bold italic text-gray-400">{desc}</p>
    </div>
  );
}

/** [Sub] 날짜 입력 */
function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black uppercase italic tracking-widest text-gray-500">{label}</label>
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-none border-2 border-gray-100 bg-gray-50 p-3 font-mono text-[13px] font-bold text-gray-800 shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
      />
    </div>
  );
}
