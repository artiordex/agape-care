/**
 * Description : BoardSearch.tsx - ?? BoardSearch UI ????
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

export default function BoardSearch({ searchQuery, onSearchChange, onSearch }: Props) {
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
