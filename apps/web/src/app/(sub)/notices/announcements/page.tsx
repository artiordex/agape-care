'use client';

import { api } from '@/lib/api';
import { useState } from 'react';

import NoticeList from './NoticeList';
import NoticePagination from './NoticePagination';
import NoticeSearchSection from './NoticeSearchSection';

export default function AnnouncementsPage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // API 호출
  const { data, isLoading } = api.content.getNotices.useQuery(['content', 'notices', { isActive: true }], {
    query: {
      isActive: true,
    },
  });

  // 데이터 가공
  const notices =
    data?.status === 200
      ? data.body.data.map(notice => {
          const isNew = Date.now() - new Date(notice.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
          return {
            id: notice.id,
            category: notice.category || '공지',
            title: notice.title,
            date: new Date(notice.createdAt).toLocaleDateString(),
            views: 0, // API에 조회수 필드가 없으므로 0으로 처리
            isNew,
            isPinned: notice.isPinned,
          };
        })
      : [];

  // 현재 페이지에 보여줄 공지 slice
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = notices.slice(startIdx, startIdx + itemsPerPage);

  const totalPages = Math.ceil(notices.length / itemsPerPage) || 1;

  if (isLoading) {
    return <div className="py-20 text-center">로딩 중...</div>;
  }

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
