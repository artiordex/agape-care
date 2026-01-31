'use client';

import React, { useState } from 'react';
import { GalleryCategory, GalleryFilterType } from './gallery.type';

interface GalleryFilterProps {
  onFilterChange: (filters: GalleryFilterType) => void;
}

const GalleryFilter = ({ onFilterChange }: GalleryFilterProps) => {
  // 초기 필터 상태 설정
  const [filters, setFilters] = useState<GalleryFilterType>({
    category: '전체',
    searchType: 'title',
    searchKeyword: '',
  });

  const categories: (GalleryCategory | '전체')[] = ['전체', '활동', '시설', '행사', '기타'];

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetValues: GalleryFilterType = {
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
        {/* 카테고리 탭: 아가페 그린 테마 적용 */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`rounded-md px-4 py-1.5 text-sm transition-all ${
                filters.category === cat
                  ? 'bg-white font-bold text-[#5C8D5A] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mx-2 hidden h-6 w-[1px] bg-gray-200 md:block" />

        {/* 날짜 필터 영역 */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
            onChange={e => setFilters({ ...filters, startDate: e.target.value })}
          />
          <span className="text-gray-400">~</span>
          <input
            type="date"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
            onChange={e => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 검색 조건 선택 */}
        <select
          value={filters.searchType}
          onChange={e => setFilters({ ...filters, searchType: e.target.value as any })}
          className="block rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-[#5C8D5A] focus:ring-[#5C8D5A]"
        >
          <option value="title">이미지 제목</option>
          <option value="description">상세 설명</option>
          <option value="author">등록자</option>
        </select>

        {/* 검색어 입력창 */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="ri-search-line text-gray-400"></i>
          </div>
          <input
            type="text"
            value={filters.searchKeyword}
            onChange={e => setFilters({ ...filters, searchKeyword: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-[#5C8D5A] focus:ring-[#5C8D5A]"
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

export default GalleryFilter;
