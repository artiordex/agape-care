/**
 * Description : page.tsx - ?? resident/initial ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';
import BedsoreRiskModal from './modals/BedsoreRiskModal';
import BenefitChangeModal from './modals/BenefitChangeModal';
import CarePlanModal from './modals/CarePlanModal';
import CistModal from './modals/CistModal';
import FallRiskModal from './modals/FallRiskModal';
import NeedsAssessmentModal from './modals/NeedsAssessmentModal';
import ProgramGroupModal from './modals/ProgramGroupModal';
import ServiceEvaluationModal from './modals/ServiceEvaluationModal';

/**
 * [Page] 초기 평과 관리 (ResidentInitial)
 * 신규 입소 어르신의 낙상, 욕창, 인지, 욕구사정 등 초기 평가 상태 관리
 */
export default function ResidentInitialPage() {
  // 모의 데이터
  const mockData = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    status: '입소중',
    name: '김철수',
    room: '101호',
    admissionDate: '2025.11.01',
    dischargeDate: '',
    linkageLog: '해당없음',
    programGroup: '미작성',
    fallRisk: '미작성',
    bedsoreRisk: '미작성',
    cognitive: '미작성',
    needs: '미작성',
    resultEval: '미작성',
    carePlan: '미작성',
    carePlanNotice: '미작성',
    carePlanChange: '미작성', // Renamed from careChange
  }));

  // 공통 스타일
  const thClass =
    'border border-[#B8D1E0] bg-[#E8F1F8] py-2 text-center text-[12px] font-bold text-[#333] tracking-tight leading-tight';
  const subThClass =
    'border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center text-[11px] font-bold text-[#555] tracking-tight';
  const summaryThClass =
    'border border-[#B8D1E0] bg-[#F1F8FF] py-1 text-center text-[11px] font-bold text-[#2E6A9E] tracking-tight';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] text-[#333]';
  const unwrittenClass = 'bg-[#FFF9C4] text-gray-600'; // 미작성 시 노란 배경

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFallRiskModalOpen, setIsFallRiskModalOpen] = useState(false);
  const [isBedsoreRiskModalOpen, setIsBedsoreRiskModalOpen] = useState(false);
  const [isCognitiveModalOpen, setIsCognitiveModalOpen] = useState(false);
  const [isNeedsModalOpen, setIsNeedsModalOpen] = useState(false);
  const [isServiceEvalModalOpen, setIsServiceEvalModalOpen] = useState(false);
  const [isCarePlanModalOpen, setIsCarePlanModalOpen] = useState(false);
  const [isBenefitChangeModalOpen, setIsBenefitChangeModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<any>(null);

  const handleOpenModal = (row: any) => {
    setSelectedResident(row);
    setIsModalOpen(true);
  };

  const handleOpenFallRiskModal = (row: any) => {
    setSelectedResident(row);
    setIsFallRiskModalOpen(true);
  };

  const handleOpenBedsoreRiskModal = (row: any) => {
    setSelectedResident(row);
    setIsBedsoreRiskModalOpen(true);
  };

  const handleOpenCognitiveModal = (row: any) => {
    setSelectedResident(row);
    setIsCognitiveModalOpen(true);
  };

  const handleOpenNeedsModal = (row: any) => {
    setSelectedResident(row);
    setIsNeedsModalOpen(true);
  };

  const handleOpenServiceEvalModal = (row: any) => {
    setSelectedResident(row);
    setIsServiceEvalModalOpen(true);
  };

  const handleOpenCarePlanModal = (row: any) => {
    setSelectedResident(row);
    setIsCarePlanModalOpen(true);
  };

  const handleOpenBenefitChangeModal = (row: any) => {
    setSelectedResident(row);
    setIsBenefitChangeModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white p-6 font-sans">
      {/* 1. 상단 컨트롤 바 */}
      <div className="mb-4 flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-4 py-2">
        <div className="flex items-center gap-2">
          <button className="rounded border border-[#9CA3AF] bg-gradient-to-b from-[#7A8B9A] to-[#5F7183] px-3 py-1.5 text-[12px] font-bold text-white shadow-sm hover:from-[#6A7B8A] hover:to-[#4F6173]">
            현황선택
          </button>
          <button className="rounded border border-[#9CA3AF] bg-gradient-to-b from-[#7A8B9A] to-[#5F7183] px-3 py-1.5 text-[12px] font-bold text-white shadow-sm hover:from-[#6A7B8A] hover:to-[#4F6173]">
            생활실선택
          </button>
          <div className="flex items-center rounded border border-[#B8D1E0] bg-white px-2 py-1">
            <input type="text" placeholder="이름조회" className="w-24 text-[12px] outline-none" />
            <button>
              <i className="ri-search-line text-gray-400"></i>
            </button>
          </div>
        </div>

        {/* 날짜 네비게이터 */}
        <div className="flex items-center gap-4">
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#57A5CE] text-white hover:bg-[#468db3]">
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <span className="text-[16px] font-black text-[#333]">2026년 상반기</span>
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#57A5CE] text-white hover:bg-[#468db3]">
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        {/* Placeholder for spacing alignment */}
        <div className="w-[200px]"></div>
      </div>

      {/* 2. 메인 데이터 테이블 */}
      <div className="overflow-x-auto border-t-2 border-[#5C8D5A]">
        <table className="w-full border-collapse">
          <thead>
            {/* Header Row 1: Main Headers */}
            <tr>
              <th className={thClass} rowSpan={2} style={{ width: '40px' }}>
                연번
              </th>
              <th className={thClass} rowSpan={2} style={{ width: '60px' }}>
                현황
              </th>
              <th className={thClass} rowSpan={2} style={{ width: '100px' }}>
                수급자명
                <br />
                (생활실)
              </th>
              <th className={thClass} rowSpan={2} style={{ width: '100px' }}>
                입소일
                <br />
                (퇴소일)
              </th>
              <th className={thClass} rowSpan={2} style={{ width: '90px' }}>
                연계기록지
                <i className="ri-question-fill ml-1 text-gray-500"></i>
              </th>
              <th className={thClass} rowSpan={2}>
                프로그램
                <br />
                수급자 그룹
                <br />
                (작성여부)
              </th>
              <th className={thClass} colSpan={4}>
                기초평가
                <br />
                (반기 1회)
              </th>
              <th className={thClass} rowSpan={2}>
                급여제공
                <br />
                결과평가
                <i className="ri-question-fill ml-1 text-gray-500"></i>
                <br />
                (반기 1회)
              </th>
              <th className={thClass} colSpan={2}>
                급여제공 계획(반기 1회)
              </th>
              <th className={thClass} rowSpan={2}>
                급여제공
                <br />
                변경, 반영
                <br />
                (발생시)
              </th>
            </tr>
            {/* Header Row 2: Sub Headers */}
            <tr>
              <th className={subThClass}>낙상위험도</th>
              <th className={subThClass}>욕창위험도</th>
              <th className={subThClass}>인지기능</th>
              <th className={subThClass}>욕구사정</th>
              <th className={subThClass}>
                <span className="rounded bg-[#5C8D5A] px-1 text-[10px] text-white">
                  <i className="ri-file-excel-2-line mr-1"></i>공단연동
                </span>
              </th>
              <th className={subThClass}>안내(설명)</th>
            </tr>
            {/* Header Row 3: Summary Row */}
            <tr className="bg-[#F8FBFF]">
              <td className={summaryThClass} colSpan={4}></td>
              <td className={summaryThClass} style={{ textAlign: 'right', paddingRight: '10px' }}>
                * 작성건수 / 대상자수
              </td>
              <td className={summaryThClass}>9 / 10</td>
              <td className={summaryThClass}>68 / 145</td>
              <td className={summaryThClass}>33 / 142</td>
              <td className={summaryThClass}>32 / 142</td>
              <td className={summaryThClass}>30 / 142</td>
              <td className={summaryThClass}>8 / 140</td>
              <td className={summaryThClass}>5 / 100</td>
              <td className={summaryThClass}>17 / 139</td>
              <td className={summaryThClass}>5 / 17</td>
              <td className={summaryThClass}></td>
            </tr>
          </thead>
          <tbody>
            {mockData.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className={tdClass}>{row.id}</td>
                <td className={clsx(tdClass, 'font-bold')}>{row.status}</td>
                <td className={tdClass}>
                  <div className="font-bold">{row.name}</div>
                  <div className="text-[11px] text-gray-500">({row.room})</div>
                </td>
                <td className={tdClass}>{row.admissionDate}</td>
                <td className={tdClass}>{row.linkageLog}</td>
                <td
                  className={clsx(
                    tdClass,
                    row.programGroup === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenModal(row)}
                >
                  {row.programGroup}
                </td>
                <td
                  className={clsx(
                    tdClass,
                    row.fallRisk === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenFallRiskModal(row)}
                >
                  {row.fallRisk}
                </td>
                <td
                  className={clsx(
                    tdClass,
                    row.bedsoreRisk === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenBedsoreRiskModal(row)}
                >
                  {row.bedsoreRisk}
                </td>
                <td
                  className={clsx(
                    tdClass,
                    row.cognitive === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenCognitiveModal(row)}
                >
                  {row.cognitive}
                </td>
                <td
                  className={clsx(
                    tdClass,
                    row.needs === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenNeedsModal(row)}
                >
                  {row.needs}
                </td>
                <td
                  className={clsx(
                    tdClass,
                    row.resultEval === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenServiceEvalModal(row)}
                >
                  {row.resultEval}
                </td>
                <td
                  className={clsx(
                    tdClass,
                    row.carePlan === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenCarePlanModal(row)}
                >
                  {row.carePlan}
                </td>
                <td className={clsx(tdClass, row.carePlanNotice === '미작성' && unwrittenClass)}>
                  {row.carePlanNotice}
                </td>
                <td
                  className={clsx(
                    tdClass,
                    row.carePlanChange === '미작성' && unwrittenClass,
                    'cursor-pointer hover:bg-blue-50 hover:underline',
                  )}
                  onClick={() => handleOpenBenefitChangeModal(row)}
                >
                  {row.carePlanChange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ProgramGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} resident={selectedResident} />
      <FallRiskModal
        isOpen={isFallRiskModalOpen}
        onClose={() => setIsFallRiskModalOpen(false)}
        resident={selectedResident}
      />
      <BedsoreRiskModal
        isOpen={isBedsoreRiskModalOpen}
        onClose={() => setIsBedsoreRiskModalOpen(false)}
        resident={selectedResident}
      />
      <CistModal
        isOpen={isCognitiveModalOpen}
        onClose={() => setIsCognitiveModalOpen(false)}
        resident={selectedResident}
      />
      <NeedsAssessmentModal
        isOpen={isNeedsModalOpen}
        onClose={() => setIsNeedsModalOpen(false)}
        resident={selectedResident}
      />
      <ServiceEvaluationModal
        isOpen={isServiceEvalModalOpen}
        onClose={() => setIsServiceEvalModalOpen(false)}
        resident={selectedResident}
      />
      <CarePlanModal
        isOpen={isCarePlanModalOpen}
        onClose={() => setIsCarePlanModalOpen(false)}
        resident={selectedResident}
      />
      <BenefitChangeModal
        isOpen={isBenefitChangeModalOpen}
        onClose={() => setIsBenefitChangeModalOpen(false)}
        resident={selectedResident}
      />
    </div>
  );
}
