'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface Props {
  readonly residents: any[];
  readonly selectedResident: any;
  readonly searchTerm: string;
  readonly filterStatus: string;
  readonly onSelectResident: (resident: any) => void;
  readonly onSearchChange: (value: string) => void;
  readonly onFilterChange: (status: string) => void;
  readonly getStatusColor: (status: string) => string;
  readonly getGradeColor: (grade: string) => string;
}

/**
 * [Sidebar Component] 입소자 검색 및 상태별 필터링 목록
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 레이아웃 적용
 */
export default function ResidentList({
  residents,
  selectedResident,
  searchTerm,
  filterStatus,
  onSelectResident,
  onSearchChange,
  onFilterChange,
  getStatusColor,
  getGradeColor,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex w-80 flex-col border-r border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 리스트 상단 헤더 */}
      <div className="border-b border-gray-200 bg-[#f8fafc] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[13px] font-black uppercase text-gray-800">입소자 마스터 명부</h2>
          </div>
          <span className="rounded-full bg-[#5C8D5A]/10 px-2 py-0.5 text-[10px] font-black text-[#5C8D5A]">
            {residents.length}명 검색됨
          </span>
        </div>
      </div>

      {/* 2. 통합 검색 필드 */}
      <div className="border-b border-gray-100 px-4 py-3">
        <div className="relative">
          <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="성함, 호실, 등급 검색..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-[12px] font-medium outline-none transition-all placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
        </div>
      </div>

      {/* 3. 상태 필터 탭 (아가페 그린 테마) */}
      <div className="border-b border-gray-200 bg-gray-50/50 px-4 py-2">
        <div className="custom-scrollbar flex gap-1 overflow-x-auto pb-1">
          {['전체', '입소', '퇴소', '대기', '상담'].map(status => (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className={clsx(
                'shrink-0 rounded px-3 py-1 text-[11px] font-black transition-all active:scale-95',
                filterStatus === status
                  ? 'bg-[#5C8D5A] text-white shadow-sm'
                  : 'border border-gray-200 bg-white text-gray-500 hover:border-[#5C8D5A] hover:text-[#5C8D5A]',
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 4. 입소자 카드 리스트 */}
      <div className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
        {residents.length === 0 ? (
          <div className="py-20 text-center">
            <i className="ri-user-search-line mb-2 block text-3xl text-gray-200"></i>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">일치하는 입소자가 없습니다</p>
          </div>
        ) : (
          residents.map(resident => (
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

              <div className="flex items-center gap-3">
                {/* 프로필 이니셜 아이콘 */}
                <div
                  className={clsx(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-black transition-colors',
                    selectedResident?.id === resident.id
                      ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white shadow-md'
                      : 'border-gray-200 bg-gray-50 text-gray-400 group-hover:border-[#5C8D5A] group-hover:text-[#5C8D5A]',
                  )}
                >
                  {resident.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <p
                      className={clsx(
                        'truncate text-[13px] tracking-tight',
                        selectedResident?.id === resident.id ? 'font-black text-gray-900' : 'font-bold text-gray-700',
                      )}
                    >
                      {resident.name} 어르신
                    </p>
                    <span
                      className={clsx(
                        'rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-tighter shadow-sm',
                        getStatusColor(resident.status),
                      )}
                    >
                      {resident.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-0.5">
                      <i className="ri-door-open-line"></i> {resident.room}
                    </span>
                    <span className="h-2 w-[1px] bg-gray-200"></span>
                    <span>{resident.gender}</span>
                    <span className="h-2 w-[1px] bg-gray-200"></span>
                    <span className={clsx('rounded-sm px-1 py-0.5', getGradeColor(resident.grade))}>
                      {resident.grade}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. 신규 등록 하단 액션 */}
      <div className="border-t border-gray-200 bg-[#f8fafc] p-4">
        <button
          onClick={() => router.push('/admin/resident/new')}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5C8D5A] py-3 text-[13px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-user-add-line text-lg" />
          신규 입소자 등록
        </button>
      </div>
    </div>
  );
}
