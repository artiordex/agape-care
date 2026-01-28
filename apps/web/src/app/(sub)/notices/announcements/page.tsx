'use client';

import { useState } from 'react';

import { notices } from '@/data/announce.json';
import NoticeList from './NoticeList';
import NoticePagination from './NoticePagination';
import NoticeSearchSection from './NoticeSearchSection';

export default function AnnouncementsPage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 보여줄 공지 slice
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = notices.slice(startIdx, startIdx + itemsPerPage);

  const totalPages = Math.ceil(notices.length / itemsPerPage);

  return (
    <main>
      {/* 검색 섹션 */}
      <NoticeSearchSection />

      {/* 공지 리스트 */}
      <NoticeList notices={currentItems} />

      {/* 페이지네이션 */}
      <NoticePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => {
          if (page < 1 || page > totalPages) return;
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </main>
  );
}
