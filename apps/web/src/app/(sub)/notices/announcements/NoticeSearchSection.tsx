/**
 * Description : NoticeSearchSection.tsx - 📌 공지사항 검색 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { motion } from 'framer-motion';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export default function NoticeSearchSection({ searchQuery, onSearchChange, onSearch }: Props) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-8 w-full border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center bg-[#5C8D5A] text-white">
          <i className="ri-search-line text-2xl" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">공지사항 검색</h3>
          <p className="text-sm text-gray-500">제목 또는 내용으로 검색하세요</p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="검색어를 입력하세요"
          className="w-full rounded border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-[#5C8D5A] focus:ring-2 focus:ring-[#5C8D5A]/20"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded bg-[#5C8D5A] text-white transition-colors hover:bg-[#4A7548]"
        >
          <i className="ri-search-line" />
        </button>
      </div>
    </motion.div>
  );
}
