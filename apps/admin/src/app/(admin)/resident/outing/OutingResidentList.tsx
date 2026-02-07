/**
 * Description : OutingResidentPanel.tsx - 📌 이미지(image_81915e.png) 스타일이 적용된 외출·외박 대상자 리스트
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React from 'react';
import clsx from 'clsx';

interface Resident {
  id: number;
  name: string;
  gender: string;
  grade: string;
  admissionDate: string;
  room: string;
  birthDate: string;
  status: string;
}

interface Props {
  readonly residents: Resident[];
  readonly selectedResident: Resident | null;
  readonly onSelectResident: (resident: Resident) => void;
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly filterStatus: string;
  readonly onFilterStatusChange: (value: string) => void;
}

export default function OutingResidentPanel({
  residents,
  selectedResident,
  onSelectResident,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
}: Props) {
  // 통계 계산
  const stats = {
    total: residents.length,
    male: residents.filter(r => r.gender === '남').length,
    female: residents.filter(r => r.gender === '여').length,
  };

  return (
    <div className="flex h-full w-[360px] flex-col border-r border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 상단 제어 및 검색 영역 (이미지 상단 탭 및 이름조회 스타일) */}
      <div className="border-b border-gray-200 bg-white p-2">
        <div className="mb-2 flex items-center justify-center gap-1 bg-[#E8F1F8] py-1 font-bold text-[#2E6A9E]">
          <i className="ri-arrow-left-s-line cursor-pointer"></i>
          <span className="text-[14px]">2026년</span>
          <i className="ri-arrow-right-s-line cursor-pointer"></i>
        </div>

        <div className="flex flex-wrap gap-1">
          {['현황선택', '등급선택', '생활실선택'].map(tab => (
            <button
              key={tab}
              className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
            >
              {tab}
            </button>
          ))}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="이름 조회"
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full border border-[#728292] px-2 py-1 text-[11px] font-medium outline-none focus:border-[#57A5CE]"
            />
          </div>
        </div>
      </div>

      {/* 2. 메인 테이블 영역 (이미지의 연청록색 격자 및 헤더 스타일 적용) */}
      <div className="mx-2 my-1 flex-1 overflow-auto border-x border-b border-[#B8D1E0]">
        <table className="w-full border-collapse text-[12px]">
          <thead className="sticky top-0 z-20">
            <tr className="bg-[#E8F1F8] text-gray-700">
              {['연번', '현황', '수급자명', '성별', '등급', '생활실'].map(header => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b border-r border-[#B8D1E0] px-1 py-2 font-medium last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B8D1E0]">
            {residents.map((resident, index) => {
              const isSelected = selectedResident?.id === resident.id;
              return (
                <tr
                  key={resident.id}
                  onClick={() => onSelectResident(resident)}
                  className={clsx(
                    'h-[32px] cursor-pointer transition-colors',
                    isSelected ? 'bg-[#DCF2D8]' : 'bg-white hover:bg-blue-50/50',
                  )}
                >
                  <td className="border-r border-[#B8D1E0] text-center text-gray-500">{index + 1}</td>
                  <td className="border-r border-[#B8D1E0] text-center text-gray-800">{resident.status}</td>
                  <td className="border-r border-[#B8D1E0] text-center font-bold text-gray-900">{resident.name}</td>
                  <td className="border-r border-[#B8D1E0] text-center text-gray-600">{resident.gender}</td>
                  <td className="border-r border-[#B8D1E0] text-center text-gray-800">{resident.grade}</td>
                  <td className="text-center text-gray-600">{resident.room}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. 하단 통계 바 (이미지의 하단 디자인 재현) */}
      <div className="flex items-center border-t border-[#B8D1E0] bg-[#E8F1F8] px-3 py-1.5 text-[11px] font-medium text-[#2E6A9E]">
        <div className="flex gap-4">
          <span>▸ 전체 : {stats.total}명</span>
          <span>▸ 남자 : {stats.male}명</span>
          <span>▸ 여자 : {stats.female}명</span>
        </div>
      </div>
    </div>
  );
}
