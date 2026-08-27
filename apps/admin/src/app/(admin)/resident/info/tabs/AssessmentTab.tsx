/**
 * Description : AssessmentTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import FallRiskModal from './modals/FallRiskModal'; // ?숈긽?꾪뿕??紐⑤떖 ?꾪룷??
import BedsoreRiskModal from './modals/BedsoreRiskModal'; // ?뺤갹?꾪뿕??紐⑤떖 ?꾪룷??
import CognitiveEvalModal from './modals/CognitiveEvalModal'; // ?몄?湲곕뒫 紐⑤떖 ?꾪룷??
// import NeedsAssessmentModal from './modals/NeedsAssessmentModal'; // ?뺢뎄?ъ젙 紐⑤떖 ?꾪룷??
// import CarePlanModal from './modals/CarePlanModal'; // 湲됱뿬?쒓났 怨꾪쉷 紐⑤떖 ?꾪룷??
// import CarePlanResultModal from './modals/CarePlanResultModal'; // 湲됱뿬?쒓났 寃곌낵?됯? 紐⑤떖 ?꾪룷??
export default function AssessmentTab() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isFallRiskModalOpen, setFallRiskModalOpen] = useState(false);
  const [isBedsoreRiskModalOpen, setBedsoreRiskModalOpen] = useState(false);
  const [isCognitionModalOpen, setCognitionModalOpen] = useState(false);
  const [isNeedsAssessmentModalOpen, setNeedsAssessmentModalOpen] = useState(false);
  const [isCarePlanModalOpen, setCarePlanModalOpen] = useState(false);
  const [isCarePlanResultModalOpen, setCarePlanResultModalOpen] = useState(false);

  // 연도 리스트
  const years = ['2026', '2025', '2024', '2023', '2022', '2021'];

  // 테이블 스타일
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1 text-center text-[12px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] p-0 text-center text-[12px] min-h-[80px]';

  // ?섎떒 踰꾪듉 援ъ꽦 (?대?吏 ?섎떒 踰꾪듉 諛??ы쁽)
  const ACTION_BUTTONS = [
    { id: 'fall', label: '?숈긽?꾪뿕??n?좉퇋?묒꽦', onClick: () => setFallRiskModalOpen(true) },
    { id: 'bedsore', label: '?뺤갹?꾪뿕??n?좉퇋?묒꽦', onClick: () => setBedsoreRiskModalOpen(true) },
    { id: 'cognition', label: '?몄?湲곕뒫\n?좉퇋?묒꽦', onClick: () => setCognitionModalOpen(true) },
    { id: 'needs', label: '?뺢뎄?ъ젙\n?좉퇋?묒꽦', onClick: () => setNeedsAssessmentModalOpen(true) },
    { id: 'eval', label: '湲됱뿬?쒓났 寃곌낵?됯?\n?좉퇋?묒꽦', onClick: () => setCarePlanResultModalOpen(true) },
    { id: 'plan', label: '湲됱뿬?쒓났 怨꾪쉷\n?좉퇋?묒꽦', onClick: () => setCarePlanModalOpen(true) },
  ];

  return (
    <div className="flex flex-col gap-2 bg-white p-4 font-sans antialiased">
      {/* 1. ?곷떒 ?쒖뼱 諛?*/}
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
              {year}??            </button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-1">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded-none accent-[#E67E22]" />
          <span className="text-[12px] font-black text-gray-800">?뚯감?쒖쑝濡??뺣젹</span>
        </label>
      </div>

      {/* 2. 硫붿씤 留ㅽ듃由?뒪 ?뚯씠釉?*/}
      <div className="overflow-x-auto border-t-2 border-[#57A5CE]">
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr className="bg-[#E8F1F8]">
              <th rowSpan={2} className={clsx(thClass, 'w-10')}>
                ?뚯감
              </th>
              <th className={thClass}>
                ?숈긽?꾪뿕??                <br />
                <span className="text-[10px] font-normal">(諛섍린 1??</span>
              </th>
              <th className={thClass}>
                ?뺤갹?꾪뿕??                <br />
                <span className="text-[10px] font-normal">(諛섍린 1??</span>
              </th>
              <th className={thClass}>
                ?몄?湲곕뒫
                <br />
                <span className="text-[10px] font-normal">(諛섍린 1??</span>
              </th>
              <th className={thClass}>
                ?뺢뎄?ъ젙
                <br />
                <span className="text-[10px] font-normal">(諛섍린 1??</span>
              </th>
              <th className={thClass}>
                湲됱뿬?쒓났 寃곌낵?됯?
                <br />
                <span className="text-[10px] font-normal">(諛섍린 1??</span>
              </th>
              <th colSpan={2} className={thClass}>
                湲됱뿬?쒓났 怨꾪쉷
                <br />
                <span className="text-[10px] font-normal">(諛섍린 1??</span>
              </th>
            </tr>
            <tr className="bg-[#F8FAFC]">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <th key={i} className="border border-[#B8D1E0]"></th>
                ))}
              <th className={thClass}>湲됱뿬?쒓났 怨꾪쉷</th>
              <th className={thClass}>?덈궡(?ㅻ챸)</th>
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
                  <span>?좉퇋(16??</span>
                  <span className="font-mono text-[11px] text-gray-500">2026.01.23</span>
                  <div className="flex items-center justify-center gap-1">
                    <span>최종결과</span>
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

      {/* 3. ?섎떒 踰꾪듉 諛?*/}
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

      {/* ?숈긽?꾪뿕???됯? 紐⑤떖 */}
      <FallRiskModal isOpen={isFallRiskModalOpen} onClose={() => setFallRiskModalOpen(false)} />
      <BedsoreRiskModal isOpen={isBedsoreRiskModalOpen} onClose={() => setBedsoreRiskModalOpen(false)} />
      <CognitiveEvalModal isOpen={isCognitionModalOpen} onClose={() => setCognitionModalOpen(false)} />
      {/* <NeedsAssessmentModal isOpen={isNeedsAssessmentModalOpen} onClose={() => setNeedsAssessmentModalOpen(false)} />
      <CarePlanModal isOpen={isCarePlanModalOpen} onClose={() => setCarePlanModalOpen(false)} />
      <CarePlanResultModal isOpen={isCarePlanResultModalOpen} onClose={() => setCarePlanResultModalOpen(false)} /> */}
    </div>
  );
}

