/**
 * Description : page.tsx - 📌 공지사항 목록 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-10
 */

'use client';

import { api } from '@/lib/api';
import { useMemo, useState } from 'react';
import NoticeList from './NoticeList';
import NoticeSearch from './NoticeSearch';
import NoticePagination from './Pagination';

// 카테고리 매핑 상수 (유지보수 용이성)
const CATEGORY_MAP: Record<string, string> = {
  GENERAL: '일반',
  URGENT: '긴급',
  EDUCATION: '교육',
  EVENT: '행사',
  MAINTENANCE: '점검',
};

export default function NoticePage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  // 1. API 데이터 로드
  const { data: noticesData, isLoading } = api.webpage.getNotices.useQuery(
    { isActive: true },
    {
      queryKey: ['webpage-notices'],
    },
  );

  // 2. 데이터 가공
  const allNotices = useMemo(() => {
    if (noticesData?.status !== 200) return [];

    // response.body 가 { status, message, data } 구조인지 확인 필요
    const rawData = Array.isArray(noticesData.body) ? noticesData.body : (noticesData.body as any).data || [];

    return rawData.map((notice: any) => {
      const createdAt = new Date(notice.createdAt);
      // 7일 이내 게시글은 '신규' 표시
      const isNew = new Date().getTime() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000;

      return {
        id: notice.id,
        category: CATEGORY_MAP[notice.category] || '일반',
        title: notice.title,
        // 한국 날짜 포맷 (ERP 스타일)
        date: createdAt
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\. /g, '-')
          .replace(/\.$/, ''),
        views: notice.viewCount || 0,
        isNew,
        isPinned: notice.isPinned, // 상단 고정 여부
      };
    });
  }, [noticesData]);

  // 3. 검색 필터링 (메모리 내 필터링)
  const filteredNotices = useMemo(() => {
    // 고정글(isPinned)을 최상단으로 올리고, 그 다음 최신순 정렬
    const sorted = [...allNotices].sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    if (!activeSearchQuery) return sorted;

    const query = activeSearchQuery.toLowerCase();
    return sorted.filter(
      notice => notice.title.toLowerCase().includes(query) || notice.category.toLowerCase().includes(query),
    );
  }, [allNotices, activeSearchQuery]);

  // 4. 페이지네이션 계산
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage) || 1;
  const currentItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredNotices.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredNotices, currentPage]);

  // 핸들러 함수들
  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <div className="font-pretendard py-20 text-center">데이터를 불러오는 중입니다...</div>;

  return (
    <main className="font-pretendard min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 검색 섹션 */}
        <NoticeSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />

        {/* 검색 결과 요약 */}
        {activeSearchQuery && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-[#5C8D5A]/20 bg-white px-6 py-4 shadow-sm">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-[#5C8D5A]">&quot;{activeSearchQuery}&quot;</span> 검색 결과:
              <span className="ml-1 font-bold text-gray-900">{filteredNotices.length}</span>건
            </p>
            <button
              onClick={() => {
                setActiveSearchQuery('');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-sm font-medium text-gray-400 transition-colors hover:text-[#5C8D5A]"
            >
              <i className="ri-refresh-line mr-1" /> 검색 초기화
            </button>
          </div>
        )}

        {/* 공지 리스트 (핵심 데이터 전달) */}
        <NoticeList notices={currentItems} />

        {/* 페이지네이션 */}
        <div className="mt-10">
          <NoticePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </main>
  );
}
