import React, { useState } from 'react';
import { FreeBoardCategory, FreeBoardFilter as FilterType } from './free-board.type';

interface FreeBoardFilterProps {
  onFilterChange: (filters: FilterType) => void;
}

const FreeBoardFilter = ({ onFilterChange }: FreeBoardFilterProps) => {
  const [filters, setFilters] = useState<FilterType>({
    category: '전체',
    searchType: 'title',
    searchKeyword: '',
  });

  const categories: (FreeBoardCategory | '전체')[] = ['전체', '일반', '질문', '정보', '잡담'];

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetValues: FilterType = {
      category: '전체',
      searchType: 'title',
      searchKeyword: '',
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* 카테고리 탭 스타일 선택 */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`rounded-md px-4 py-1.5 text-sm transition-all ${
                filters.category === cat
                  ? 'bg-white font-bold text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mx-2 hidden h-6 w-[1px] bg-gray-200 md:block" />

        {/* 날짜 필터 (선택 사항) */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            onChange={e => setFilters({ ...filters, startDate: e.target.value })}
          />
          <span className="text-gray-400">~</span>
          <input
            type="date"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            onChange={e => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 검색 조건 선택 */}
        <select
          value={filters.searchType}
          onChange={e => setFilters({ ...filters, searchType: e.target.value as any })}
          className="block rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="title">제목</option>
          <option value="author">작성자</option>
          <option value="content">내용</option>
        </select>

        {/* 검색어 입력창 */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={filters.searchKeyword}
            onChange={e => setFilters({ ...filters, searchKeyword: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="검색어를 입력하세요..."
          />
        </div>

        {/* 버튼 그룹 */}
        <button
          onClick={handleSearch}
          className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          조회
        </button>
        <button
          onClick={handleReset}
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default FreeBoardFilter;
