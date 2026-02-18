/**
 * Description : AssessmentTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import FallRiskModal from './modals/FallRiskModal'; // 낙상위험도 모달 임포트
import BedSoreRiskModal from './modals/BedSoreRiskModal'; // 욕창위험도 모달 임포트
import CognitiveEvalModal from './modals/CognitiveEvalModal'; // 인지기능 모달 임포트
// import NeedsAssessmentModal from './modals/NeedsAssessmentModal'; // 욕구사정 모달 임포트
// import CarePlanModal from './modals/CarePlanModal'; // 급여제공 계획 모달 임포트
// import CarePlanResultModal from './modals/CarePlanResultModal'; // 급여제공 결과평가 모달 임포트

export default function AssessmentTab() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isFallRiskModalOpen, setFallRiskModalOpen] = useState(false);
  const [isBedSoreRiskModalOpen, setBedSoreRiskModalOpen] = useState(false);
  const [isCognitionModalOpen, setCognitionModalOpen] = useState(false);
  const [isNeedsAssessmentModalOpen, setNeedsAssessmentModalOpen] = useState(false);
  const [isCarePlanModalOpen, setCarePlanModalOpen] = useState(false);
  const [isCarePlanResultModalOpen, setCarePlanResultModalOpen] = useState(false);

  // 연도 리스트
  const years = ['2026', '2025', '2024', '2023', '2022', '2021'];

  // 테이블 스타일
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1 text-center text-[12px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] p-0 text-center text-[12px] min-h-[80px]';

  // 하단 버튼 구성 (이미지 하단 버튼 바 재현)
  const ACTION_BUTTONS = [
    { id: 'fall', label: '낙상위험도\n신규작성', onClick: () => setFallRiskModalOpen(true) },
    { id: 'bedsore', label: '욕창위험도\n신규작성', onClick: () => setBedSoreRiskModalOpen(true) },
    { id: 'cognition', label: '인지기능\n신규작성', onClick: () => setCognitionModalOpen(true) },
    { id: 'needs', label: '욕구사정\n신규작성', onClick: () => setNeedsAssessmentModalOpen(true) },
    { id: 'eval', label: '급여제공 결과평가\n신규작성', onClick: () => setCarePlanResultModalOpen(true) },
    { id: 'plan', label: '급여제공 계획\n신규작성', onClick: () => setCarePlanModalOpen(true) },
  ];

  return (
    <div className="flex flex-col gap-2 bg-white p-4 font-sans antialiased">
      {/* 1. 상단 제어 바 */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex gap-1">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={clsx(
                'rounded border px-4 py-1 text-[12px] font-bold shadow-sm transition-all',
                selectedYear === year
                  ? 'border-[#468db3] bg-[#57A5CE] text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50',
              )}
            >
              {year}년
            </button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-1">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded-none accent-[#E67E22]" />
          <span className="text-[12px] font-black text-gray-800">회차순으로 정렬</span>
        </label>
      </div>

      {/* 2. 메인 매트릭스 테이블 */}
      <div className="overflow-x-auto border-t-2 border-[#57A5CE]">
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr className="bg-[#E8F1F8]">
              <th rowSpan={2} className={clsx(thClass, 'w-10')}>
                회차
              </th>
              <th className={thClass}>
                낙상위험도
                <br />
                <span className="text-[10px] font-normal">(반기 1회)</span>
              </th>
              <th className={thClass}>
                욕창위험도
                <br />
                <span className="text-[10px] font-normal">(반기 1회)</span>
              </th>
              <th className={thClass}>
                인지기능
                <br />
                <span className="text-[10px] font-normal">(반기 1회)</span>
              </th>
              <th className={thClass}>
                욕구사정
                <br />
                <span className="text-[10px] font-normal">(반기 1회)</span>
              </th>
              <th className={thClass}>
                급여제공 결과평가
                <br />
                <span className="text-[10px] font-normal">(반기 1회)</span>
              </th>
              <th colSpan={2} className={thClass}>
                급여제공 계획
                <br />
                <span className="text-[10px] font-normal">(반기 1회)</span>
              </th>
            </tr>
            <tr className="bg-[#F8FAFC]">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <th key={i} className="border border-[#B8D1E0]"></th>
                ))}
              <th className={thClass}>급여제공 계획</th>
              <th className={thClass}>안내(설명)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-24">
              <td className={clsx(tdClass, 'bg-[#F8FAFC] font-bold')}>1</td>
              <td
                className={clsx(tdClass, 'cursor-pointer bg-[#DCF2D8] hover:brightness-95')}
                onClick={() => setFallRiskModalOpen(true)}
              >
                <div className="flex flex-col gap-0.5 p-2 text-gray-700">
                  <span>신규(16점)</span>
                  <span className="font-mono text-[11px] text-gray-500">2026.01.23</span>
                  <div className="flex items-center justify-center gap-1">
                    <span>최인경</span>
                    <span className="rounded-sm bg-red-600 px-1 text-[9px] font-black text-white">고위험</span>
                  </div>
                </div>
              </td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. 하단 버튼 바 */}
      <div className="mt-4 flex justify-center gap-1">
        {ACTION_BUTTONS.map(btn => (
          <button
            key={btn.id}
            onClick={btn.onClick}
            className="flex min-w-[120px] items-center justify-center rounded-sm bg-[#57A5CE] px-3 py-2 text-center text-[12px] font-black leading-tight text-white shadow-md transition-all hover:bg-[#468db3] active:scale-95"
          >
            <span className="whitespace-pre-line">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* 낙상위험도 평가 모달 */}
      <FallRiskModal isOpen={isFallRiskModalOpen} onClose={() => setFallRiskModalOpen(false)} />
      <BedSoreRiskModal isOpen={isBedSoreRiskModalOpen} onClose={() => setBedSoreRiskModalOpen(false)} />
      <CognitiveEvalModal isOpen={isCognitionModalOpen} onClose={() => setCognitionModalOpen(false)} />
      {/* <NeedsAssessmentModal isOpen={isNeedsAssessmentModalOpen} onClose={() => setNeedsAssessmentModalOpen(false)} />
      <CarePlanModal isOpen={isCarePlanModalOpen} onClose={() => setCarePlanModalOpen(false)} />
      <CarePlanResultModal isOpen={isCarePlanResultModalOpen} onClose={() => setCarePlanResultModalOpen(false)} /> */}
    </div>
  );
}
