'use client';

import React from 'react';
import { PopupStatus } from './popup.type';

interface Props {
  readonly filterStatus: string;
  readonly setFilterStatus: (status: string) => void;
  readonly searchTerm: string;
  readonly setSearchTerm: (term: string) => void;
}

/**
 * [Component] 팝업 검색 및 필터 노드
 * 아가페 그린 테마 적용
 */
export default function PopupFilter({ filterStatus, setFilterStatus, searchTerm, setSearchTerm }: Props) {
  const statuses = [
    { value: 'all', label: '전체 상태' },
    { value: '활성', label: '활성' },
    { value: '비활성', label: '비활성' },
    { value: '예약', label: '예약' },
  ];

  return (
    <div className="rounded-none border border-gray-200 bg-[#F9FBF9] p-8 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[18px] font-black text-gray-900">팝업 검색 및 필터</h3>

        {/* 상태 필터 버튼 그룹 */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase text-gray-400">상태:</span>
          {statuses.map(status => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`px-4 py-1.5 text-[11px] font-black transition-all ${
                filterStatus === status.value
                  ? 'bg-[#5C8D5A] text-white'
                  : 'border border-gray-300 bg-white text-gray-600 hover:border-[#5C8D5A]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex max-w-full items-center bg-white shadow-inner">
        <input
          type="text"
          placeholder="팝업 제목을 검색하세요"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-none border border-gray-300 bg-transparent px-6 py-4 text-[15px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A]"
        />

        <button className="flex h-[58px] w-[60px] cursor-pointer items-center justify-center bg-[#5C8D5A] text-white transition-all hover:bg-[#4A7548] active:scale-95">
          <i className="ri-search-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
