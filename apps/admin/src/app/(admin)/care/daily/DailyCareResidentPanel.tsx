'use client';

import React from 'react';
import clsx from 'clsx';

interface Resident {
  id: string;
  name: string;
  room: string;
  status: string;
  hasLog: boolean; // 간호일지 작성 여부
  hasMedication: boolean; // 투약 기록 여부
  hasWound: boolean; // 욕창 관리 여부
  hasTube: boolean; // 비위관 관리 여부
  hasExcretion: boolean; // 배설 기록 여부
}

interface Props {
  readonly residents: Resident[];
  readonly selectedResidentId: string;
  readonly onResidentSelect: (id: string) => void;
}

/**
 * [Sidebar Panel] 건강관리 대상자 상태 관제 패널
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 체크리스트 그리드 적용
 */
export default function DailyCareResidentPanel({ residents, selectedResidentId, onResidentSelect }: Props) {
  // 상태별 색상 매핑 (Agape-Standard)
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '입소중':
        return 'bg-emerald-50 text-[#5C8D5A] border-emerald-100';
      case '외출':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case '외박':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case '입원':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-400 border-gray-200';
    }
  };

  /** 작성 여부 인디케이터 렌더링 */
  const StatusMark = ({ checked }: { checked: boolean }) => (
    <div className="flex items-center justify-center">
      {checked ? (
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5C8D5A] text-[10px] text-white shadow-sm">
          <i className="ri-check-line font-black"></i>
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200"></span>
      )}
    </div>
  );

  return (
    <div className="flex h-full flex-col border-r border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 필터 및 검색 섹션 (고밀도 ERP 스타일) */}
      <div className="grid grid-cols-2 gap-1 border-b border-gray-200 bg-[#f8fafc] p-2">
        <button className="rounded border border-gray-300 bg-white py-1.5 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]">
          현황 필터
        </button>
        <button className="rounded border border-gray-300 bg-white py-1.5 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]">
          생활실 선택
        </button>
        <div className="relative col-span-2 mt-1">
          <i className="ri-search-2-line absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400"></i>
          <input
            type="text"
            placeholder="수급자 성함 검색..."
            className="w-full rounded border border-gray-300 py-1.5 pl-8 pr-2 text-[11px] font-bold outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
        </div>
      </div>

      {/* 2. 수급자 작성 현황 그리드 */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <table className="w-full border-collapse text-[11px]">
          <thead className="sticky top-0 z-10 border-b border-gray-300 bg-emerald-50/80 backdrop-blur-sm">
            <tr className="text-[10px] font-black uppercase tracking-tighter text-[#5C8D5A]">
              <th className="p-2 text-center">No.</th>
              <th className="p-2 text-left">수급자명</th>
              <th className="p-2 text-center">일지</th>
              <th className="p-2 text-center">투약</th>
              <th className="p-2 text-center">욕창</th>
              <th className="p-2 text-center">비위</th>
              <th className="p-2 text-center">배설</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {residents.map((r, i) => (
              <tr
                key={r.id}
                onClick={() => onResidentSelect(r.id)}
                className={clsx(
                  'cursor-pointer transition-colors',
                  selectedResidentId === r.id ? 'bg-[#5C8D5A]/10' : 'hover:bg-gray-50',
                )}
              >
                {/* 연번 */}
                <td className="border-r border-gray-50 p-2 text-center font-mono text-[10px] text-gray-400">
                  {String(i + 1).padStart(2, '0')}
                </td>

                {/* 수급자 정보 */}
                <td className="border-r border-gray-50 p-2">
                  <div className="flex flex-col">
                    <span
                      className={clsx(
                        'text-[12px] tracking-tight',
                        selectedResidentId === r.id ? 'font-black text-[#5C8D5A]' : 'font-bold text-gray-700',
                      )}
                    >
                      {r.name}
                    </span>
                    <span className="mt-0.5 text-[9px] font-bold uppercase leading-none text-gray-400">
                      {r.room || '실미지정'}
                    </span>
                  </div>
                </td>

                {/* 작성 상태 인디케이터 5종 */}
                <td className="border-r border-gray-50 p-2">
                  <StatusMark checked={r.hasLog} />
                </td>
                <td className="border-r border-gray-50 p-2">
                  <StatusMark checked={r.hasMedication} />
                </td>
                <td className="border-r border-gray-50 p-2">
                  <StatusMark checked={r.hasWound} />
                </td>
                <td className="border-r border-gray-50 p-2">
                  <StatusMark checked={r.hasTube} />
                </td>
                <td className="p-2">
                  <StatusMark checked={r.hasExcretion} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. 패널 푸터: 관제 요약 정보 */}
      <div className="border-t border-gray-300 bg-emerald-50 px-4 py-3">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#5C8D5A]">
          <div className="flex gap-3">
            <span>Total: {residents.length}명</span>
            <span className="h-3 w-[1px] bg-[#5C8D5A]/20"></span>
            <span>Male: {residents.filter(r => r.id === '1').length}명</span> {/* 임시 수치 */}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5C8D5A]"></span>
            Live Monitoring
          </div>
        </div>
        <div className="mt-2 flex gap-3 text-[9px] font-bold text-gray-400">
          <span className="flex items-center gap-1">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#5C8D5A] text-[7px] text-white">
              <i className="ri-check-line"></i>
            </span>{' '}
            작성완료
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-200"></span> 작성대상
          </span>
        </div>
      </div>
    </div>
  );
}
