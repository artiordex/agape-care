'use client';

import React from 'react';

interface Props {
  readonly searchTerm: string;
  readonly setSearchTerm: (val: string) => void;
  readonly filter: string;
  readonly setFilter: (val: string) => void;
}

/**
 * [Component] 회의 기록 조회를 위한 통합 검색 및 유형 필터
 * 아가페 그린(#5C8D5A) 테마 및 직각형 폼 요소 적용
 */
export default function MeetingFilter({ searchTerm, setSearchTerm, filter, setFilter }: Props) {
  // 회의 마스터 카테고리 정의
  const meetingTypes = [
    { value: 'all', label: '전체 회의 항목' },
    { value: 'committee', label: '운영위원회 회의' },
    { value: 'guardian', label: '보호자 소통/간담회' },
    { value: 'custom', label: '일반/기타 회의' },
  ];

  return (
    <div className="rounded-none border border-gray-300 bg-white p-5 font-sans antialiased shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* 1. 검색어 입력 (회의주제 및 내용 검색) */}
        <div className="flex-1 space-y-2">
          <label className="flex items-center gap-1.5 text-[10px] font-black uppercase italic tracking-widest text-gray-500">
            <span className="h-1 w-1 bg-[#5C8D5A]"></span>
            회의 주제 및 상세 안건 검색
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="회의주제, 회의내용, 작성자 식별 정보 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-none border border-gray-300 bg-gray-50 p-2.5 pr-10 text-[12px] font-bold text-gray-700 shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
            />
            <i className="ri-search-2-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* 2. 유형 필터링 */}
        <div className="w-full space-y-2 lg:w-72">
          <label className="flex items-center gap-1.5 text-[10px] font-black uppercase italic tracking-widest text-gray-500">
            <span className="h-1 w-1 bg-[#5C8D5A]"></span>
            회의 카테고리 필터링
          </label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full cursor-pointer rounded-none border border-gray-300 bg-gray-50 p-2.5 text-[12px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
          >
            {meetingTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. 검색 실행 버튼 (Agape-Standard) */}
        <button className="flex h-[41px] cursor-pointer items-center justify-center gap-2 rounded-none bg-[#5C8D5A] px-8 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95">
          <i className="ri-filter-3-line"></i>
          필터 적용
        </button>
      </div>
    </div>
  );
}
