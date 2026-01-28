'use client';

import { motion } from 'framer-motion';

export default function NoticeSearchSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 shadow-md"
    >
      <h3 className="mb-4 text-lg font-bold text-gray-900">공지사항 검색</h3>

      <div className="relative">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition-all focus:ring-2 focus:ring-[#5C8D5A]"
        />
        <button className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-[#5C8D5A] text-white hover:bg-[#4A7548]">
          <i className="ri-search-line" />
        </button>
      </div>
    </motion.div>
  );
}
