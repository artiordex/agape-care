'use client';

import React from 'react';

/**
 * 청구 데이터 필터링 컴포넌트
 * 월별 조회 및 수급자/상태별 검색 기능
 */
export default function ClaimFilter({ selectedMonth, onMonthChange, filters, setFilters }: any) {
  return (
    <div className="border border-gray-300 bg-white p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-4 text-[11px]">
        {/* 1. 조회 월 선택 */}
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-tighter text-gray-500">Period:</span>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => onMonthChange(e.target.value)}
            className="border border-gray-300 bg-gray-50 px-2 py-1 font-black text-[#1a5a96] outline-none transition-all focus:border-blue-500"
          />
        </div>

        <div className="h-4 w-[1px] bg-gray-200"></div>

        {/* 2. 청구 상태 필터 */}
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-tighter text-gray-500">Status:</span>
          <select
            className="border border-gray-300 bg-white px-2 py-1 font-bold text-gray-700 outline-none focus:border-blue-500"
            onChange={e => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">전체 상태</option>
            <option value="작성중">작성중</option>
            <option value="청구완료">청구완료</option>
            <option value="승인완료">승인완료</option>
            <option value="반려">반려됨</option>
          </select>
        </div>

        {/* 3. 이름 검색 */}
        <div className="ml-auto flex max-w-xs flex-1 items-center gap-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="수급자 성명 검색..."
              className="w-full border border-gray-300 bg-white px-8 py-1 font-medium outline-none focus:border-blue-500"
              onChange={e => setFilters({ ...filters, query: e.target.value })}
            />
            <i className="ri-search-line absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
