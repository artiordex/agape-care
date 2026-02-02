/**
 * Description : page.tsx - 📌 공지사항 목록 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import announceData from '@/data/announce.json';
import { useState } from 'react';

import NoticeList from './NoticeList';
import NoticePagination from './NoticePagination';
import NoticeSearchSection from './NoticeSearchSection';

export default function AnnouncementsPage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  // JSON 데이터에서 공지사항 로드
  const allNotices = announceData.notices.map(notice => ({
    id: notice.id,
    category: notice.category,
    title: notice.title,
    date: notice.date,
    views: notice.views,
    isNew: notice.isNew,
    isPinned: notice.isPinned,
  }));

  // 검색 필터링
  const filteredNotices = allNotices.filter(notice => {
    if (!activeSearchQuery) return true;
    const query = activeSearchQuery.toLowerCase();
    return notice.title.toLowerCase().includes(query) || notice.category.toLowerCase().includes(query);
  });

  // 페이지네이션
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredNotices.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage) || 1;

  // 검색 실행
  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 페이지 헤더 */}
        <div className="mb-10 flex items-start gap-5">
          <div className="flex h-16 w-16 items-center justify-center bg-[#5C8D5A] text-white">
            <i className="ri-notification-line text-3xl" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900">
              공지<span className="text-[#5C8D5A]">사항</span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">센터의 중요한 소식과 공지사항을 확인하세요</p>
          </div>
        </div>

        {/* 검색 섹션 */}
        <NoticeSearchSection searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />

        {/* 검색 결과 표시 */}
        {activeSearchQuery && (
          <div className="mb-4 flex items-center justify-between rounded border border-[#5C8D5A]/20 bg-[#5C8D5A]/5 px-4 py-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-[#5C8D5A]">&quot;{activeSearchQuery}&quot;</span> 검색 결과:{' '}
              <span className="font-semibold">{filteredNotices.length}</span>개
            </p>
            <button
              onClick={() => {
                setActiveSearchQuery('');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-sm text-gray-600 hover:text-[#5C8D5A]"
            >
              <i className="ri-close-line" /> 검색 초기화
            </button>
          </div>
        )}

        {/* 공지 리스트 */}
        <NoticeList notices={currentItems} />

        {/* 페이지네이션 */}
        <NoticePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
