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
  mainDiseases: string[];
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
  readonly filterGrade: string;
  readonly onFilterGradeChange: (value: string) => void;
  readonly filterRoom: string;
  readonly onFilterRoomChange: (value: string) => void;
}

/**
 * [Sidebar Panel] 외출·외박 관리 전용 입소자 검색 및 필터링 패널
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 서식 레이아웃 적용
 */
export default function OutingResidentPanel({
  residents,
  selectedResident,
  onSelectResident,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterGrade,
  onFilterGradeChange,
  filterRoom,
  onFilterRoomChange,
}: Props) {
  // 상태별 색상 매핑 (Agape-Standard)
  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-emerald-50 text-[#5C8D5A] border-emerald-100';
      case '퇴소':
        return 'bg-gray-100 text-gray-500 border-gray-200';
      case '대기':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      default:
        return 'bg-gray-50 text-gray-400';
    }
  };

  return (
    <div className="flex w-80 flex-col border-r border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 패널 상단: 요약 정보 */}
      <div className="border-b border-gray-200 bg-[#f8fafc] px-4 py-3">
        <h2 className="text-[13px] font-black uppercase tracking-tight text-gray-800">외출·외박 대상자 선별</h2>
        <div className="mt-2 flex gap-1.5">
          <span className="rounded-sm bg-gray-200 px-2 py-0.5 text-[10px] font-black text-gray-600">
            총 {residents.length}명
          </span>
          <span className="rounded-sm bg-[#5C8D5A]/10 px-2 py-0.5 text-[10px] font-black text-[#5C8D5A]">
            입소 {residents.filter(r => r.status === '입소').length}명
          </span>
        </div>
      </div>

      {/* 2. 다중 필터링 섹션 (ERP Grid Style) */}
      <div className="space-y-3 border-b border-gray-100 bg-white p-4">
        {/* 이름 검색 */}
        <div className="relative">
          <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="성함 또는 호실 검색..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-[12px] font-medium outline-none transition-all placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
        </div>

        {/* 필터 그룹 */}
        <div className="grid grid-cols-1 gap-2">
          <FilterSelect
            label="현재 상태"
            value={filterStatus}
            onChange={onFilterStatusChange}
            options={['전체', '입소', '퇴소', '대기']}
          />
          <div className="grid grid-cols-2 gap-2">
            <FilterSelect
              label="등급"
              value={filterGrade}
              onChange={onFilterGradeChange}
              options={['전체', '1등급', '2등급', '3등급', '4등급', '5등급', '인지지원']}
            />
            <FilterSelect
              label="생활실"
              value={filterRoom}
              onChange={onFilterRoomChange}
              options={['전체', '101', '102', '103', '201', '202']}
            />
          </div>
        </div>
      </div>

      {/* 3. 입소자 카드 리스트 */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {residents.map(resident => (
          <div
            key={resident.id}
            onClick={() => onSelectResident(resident)}
            className={clsx(
              'group relative cursor-pointer border-b border-gray-100 px-4 py-4 transition-all',
              selectedResident?.id === resident.id ? 'bg-emerald-50/50' : 'hover:bg-gray-50',
            )}
          >
            {/* 선택 시 좌측 포인트 바 */}
            {selectedResident?.id === resident.id && (
              <div className="absolute left-0 top-0 h-full w-1 bg-[#5C8D5A]"></div>
            )}

            <div className="flex items-start gap-3">
              {/* 이니셜 아바타 */}
              <div
                className={clsx(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-black transition-colors',
                  selectedResident?.id === resident.id
                    ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-400',
                )}
              >
                {resident.name.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p
                    className={clsx(
                      'text-[13px] tracking-tight',
                      selectedResident?.id === resident.id ? 'font-black text-gray-900' : 'font-bold text-gray-700',
                    )}
                  >
                    {resident.name} 어르신
                  </p>
                  <span
                    className={clsx(
                      'rounded-sm border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest',
                      getStatusColor(resident.status),
                    )}
                  >
                    {resident.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                  <span className="flex items-center gap-0.5 text-[#5C8D5A]">
                    <i className="ri-door-open-line"></i> {resident.room}
                  </span>
                  <span className="h-2 w-[1px] bg-gray-200"></span>
                  <span>{resident.gender}</span>
                  <span className="h-2 w-[1px] bg-gray-200"></span>
                  <span className="uppercase text-gray-500">{resident.grade}</span>
                </div>
                <p className="mt-1 font-mono text-[9px] italic text-gray-300">{resident.birthDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 내부 서브 컴포넌트: 필터 셀렉트 */
function FilterSelect({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-black uppercase tracking-tighter text-gray-400">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt === '전체' ? `전체 ${label}` : opt}
          </option>
        ))}
      </select>
    </div>
  );
}
