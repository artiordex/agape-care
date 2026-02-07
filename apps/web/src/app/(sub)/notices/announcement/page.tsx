/**
 * Description : page.tsx - 📌 공지사항 목록 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { api } from '@/lib/api';
import { useMemo, useState } from 'react';

import NoticeList from './AnnouncementList';
import NoticeSearch from './AnnouncementSearch';
import NoticePagination from './Pagination';

export default function AnnouncementsPage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  // API 데이터 로드
  const { data: noticesData, isLoading } = api.webpage.getNotices.useQuery(
    {
      query: {
        isActive: true,
      },
    },
    {
      queryKey: ['webpage-notices'],
    },
  );

  const allNotices = useMemo(() => {
    if (noticesData?.status !== 200) return [];

    return noticesData.body.data.map((notice: any) => {
      const createdAt = new Date(notice.createdAt);
      const isNew = new Date().getTime() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000;

      return {
        id: notice.id,
        category: categoryToKor(notice.category),
        title: notice.title,
        date: createdAt.toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
        views: notice.viewCount || 0,
        isNew,
        isPinned: notice.isPinned,
      };
    });
  }, [noticesData]);

  function categoryToKor(eng: string | null): string {
    const map: any = { GENERAL: '일반', URGENT: '긴급', EDUCATION: '교육', EVENT: '행사', MAINTENANCE: '점검' };
    return map[eng || 'GENERAL'] || '일반';
  }

  // 검색 필터링
  const filteredNotices = useMemo(() => {
    return allNotices.filter(notice => {
      if (!activeSearchQuery) return true;
      const query = activeSearchQuery.toLowerCase();
      return notice.title.toLowerCase().includes(query) || notice.category.toLowerCase().includes(query);
    });
  }, [allNotices, activeSearchQuery]);

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
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 검색 섹션 */}
        <NoticeSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />

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
