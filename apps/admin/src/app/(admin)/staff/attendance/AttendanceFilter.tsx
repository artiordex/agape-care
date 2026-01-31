'use client';

import React from 'react';

interface Props {
  readonly activeTab: 'daily' | 'monthly';
  readonly filters: any;
  readonly setFilters: (filters: any) => void;
}

/**
 * [Component] 부서 및 기간별 근태 조회 필터 컨트롤러
 * 아가페 그린(#5C8D5A) 테마 및 직각형 폼 스타일 적용
 */
export default function AttendanceFilter({ activeTab, filters, setFilters }: Props) {
  return (
    <div className="border border-gray-300 bg-white p-5 font-sans antialiased shadow-sm">
      <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-4 lg:grid-cols-5">
        {/* 1. 기간 선택 (모드에 따라 동적 변경) */}
        <FilterItem label={activeTab === 'daily' ? '조회 일자' : '조회 년월'}>
          <input
            type={activeTab === 'daily' ? 'date' : 'month'}
            value={filters.date}
            onChange={e => setFilters({ ...filters, date: e.target.value })}
            className="w-full rounded-none border border-gray-300 bg-gray-50 p-2.5 text-[12px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
          />
        </FilterItem>

        {/* 2. 부서 필터 */}
        <FilterItem label="소속 부서">
          <select className="w-full rounded-none border border-gray-300 bg-gray-50 p-2.5 text-[12px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:bg-white">
            <option>전체 부서</option>
            <option>간호팀</option>
            <option>요양팀</option>
            <option>사무팀</option>
            <option>급식팀</option>
          </select>
        </FilterItem>

        {/* 3. 직원명 검색 */}
        <FilterItem label="직원 식별 정보">
          <div className="relative">
            <input
              type="text"
              placeholder="이름 또는 사번 입력"
              className="w-full rounded-none border border-gray-300 bg-gray-50 p-2.5 pr-10 text-[12px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
            />
            <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
          </div>
        </FilterItem>

        {/* 4. 조회 버튼 (Agape-Rectangle) */}
        <div className="lg:col-span-2">
          <button className="flex h-[41px] w-full items-center justify-center gap-2 rounded-none bg-[#5C8D5A] px-6 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-[0.99]">
            <i className="ri-filter-3-line text-lg"></i>필터 조건으로 기록 조회
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterItem({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1.5 text-[10px] font-black uppercase italic tracking-widest text-gray-500">
        <span className="h-1 w-1 bg-[#5C8D5A]"></span>
        {label}
      </label>
      {children}
    </div>
  );
}
