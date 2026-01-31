'use client';

import React from 'react';
import { AnnouncementCategory } from './announcement.type';

interface Props {
  readonly searchTerm: string;
  readonly setSearchTerm: (val: string) => void;
  readonly filterCategory: string;
  readonly setFilterCategory: (val: string) => void;
}

/**
 * [Component] 공지사항 검색 및 카테고리 필터 노드
 * image_102a40.png의 상단 디자인 프로토콜 적용
 */
export default function AnnouncementFilter({ searchTerm, setSearchTerm, filterCategory, setFilterCategory }: Props) {
  const categories = [
    { value: 'all', label: '전체' },
    { value: '일반', label: '일반' },
    { value: '긴급', label: '긴급' },
    { value: '교육', label: '교육' },
    { value: '행사', label: '행사' },
    { value: '점검', label: '점검' },
  ];

  return (
    <div className="rounded-none border border-gray-200 bg-[#F9FBF9] p-8 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[18px] font-black text-gray-900">공지사항 검색</h3>

        {/* 카테고리 필터 버튼 그룹 */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase text-gray-400">카테고리:</span>
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(cat.value)}
              className={`px-4 py-1.5 text-[11px] font-black transition-all ${
                filterCategory === cat.value
                  ? 'bg-[#5C8D5A] text-white'
                  : 'border border-gray-300 bg-white text-gray-600 hover:border-[#5C8D5A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex max-w-full items-center bg-white shadow-inner">
        <input
          type="text"
          placeholder="제목, 내용, 작성자를 검색하세요"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-none border border-gray-300 bg-transparent px-6 py-4 text-[15px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A]"
        />

        <button
          onClick={() => {
            /* 검색 실행 */
          }}
          className="flex h-[58px] w-[60px] cursor-pointer items-center justify-center bg-[#5C8D5A] text-white transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-search-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
