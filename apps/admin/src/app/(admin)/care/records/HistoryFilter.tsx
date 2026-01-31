'use client';

import React from 'react';

/**
 * [Component] 케어 기록 조회를 위한 통합 검색 필터 바
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 레이아웃 적용
 */
export default function HistoryFilter({ filters, setFilters }: any) {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-4 font-sans antialiased shadow-sm">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:grid-cols-6">
        {/* 1. 조회 기간 설정 (시작일/종료일) */}
        <FilterItem label="조회 시작일">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={e => setFilters({ ...filters, dateFrom: e.target.value })}
            className="w-full rounded-lg border border-gray-200 p-2 text-[11px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
        </FilterItem>

        <FilterItem label="조회 종료일">
          <input
            type="date"
            value={filters.dateTo}
            onChange={e => setFilters({ ...filters, dateTo: e.target.value })}
            className="w-full rounded-lg border border-gray-200 p-2 text-[11px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
        </FilterItem>

        {/* 2. 기록 유형 필터 */}
        <FilterItem label="기록유형">
          <select
            value={filters.type}
            onChange={e => setFilters({ ...filters, type: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white p-2 text-[11px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A]"
          >
            <option value="전체">전체 기록 데이터</option>
            <option value="간호기록">간호기록 (Vital)</option>
            <option value="투약기록">투약관리 기록</option>
            <option value="욕창간호">욕창간호 기록</option>
            <option value="배설기록">배설관리 기록</option>
            <option value="진료기록">진료/외래 기록</option>
          </select>
        </FilterItem>

        {/* 3. 작성 상태 필터 */}
        <FilterItem label="작성상태">
          <select
            value={filters.status}
            onChange={e => setFilters({ ...filters, status: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white p-2 text-[11px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A]"
          >
            <option value="전체">전체 상태 조회</option>
            <option value="작성중">작성중 (진행)</option>
            <option value="마감">작성완료 (마감)</option>
            <option value="검토필요">검토필요 항목</option>
          </select>
        </FilterItem>

        {/* 4. 검색어 입력 (수급자/생활실) */}
        <FilterItem label="수급자/생활실">
          <div className="relative">
            <input
              type="text"
              placeholder="이름 또는 호실 입력"
              value={filters.query}
              onChange={e => setFilters({ ...filters, query: e.target.value })}
              className="w-full rounded-lg border border-gray-200 p-2 pr-9 text-[11px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
            <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
          </div>
        </FilterItem>

        {/* 5. 통합 조회 실행 버튼 */}
        <div className="pb-[1px]">
          <button className="flex h-[38px] w-full items-center justify-center gap-2 rounded-lg bg-[#5C8D5A] px-4 py-2 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95">
            <i className="ri-refresh-line"></i>
            필터 결과 조회
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 개별 필터 항목 레이아웃 (그린 포인트 + 라벨)
 */
function FilterItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="ml-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#5C8D5A]"></span>
        {label}
      </label>
      {children}
    </div>
  );
}
