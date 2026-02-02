/**
 * Description : page.tsx - 📌 게시판 목록 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import boardData from '@/data/board.json';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BoardHeader from './BoardHeader';
import BoardMobileList from './BoardMobileList';
import BoardTable from './BoardTable';
import Pagination from './Pagination';

interface Post {
  id: string;
  title: string;
  writer_name: string;
  content: string;
  view_count: number;
  image_urls: string[];
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
}

export default function BoardPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // JSON 데이터에서 게시글 로드
  const allPosts: Post[] = boardData.posts;

  // 페이지네이션
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + postsPerPage);
  const totalPages = Math.ceil(allPosts.length / postsPerPage) || 1;

  // 게시글 클릭 핸들러
  const handlePostClick = (post: Post) => {
    router.push(`/notices/board/${post.id}`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <BoardHeader totalPosts={allPosts.length} onWriteClick={() => alert('글쓰기 기능은 준비 중입니다.')} />

        {/* 게시글 목록 */}
        {currentPosts.length === 0 ? (
          <div className="border border-gray-200 bg-white py-20 text-center">
            <i className="ri-article-line mb-4 text-6xl text-gray-300" />
            <p className="mb-2 text-lg font-semibold text-gray-900">등록된 게시글이 없습니다</p>
            <p className="text-sm text-gray-500">첫 번째 글을 작성해보세요!</p>
          </div>
        ) : (
          <>
            {/* 데스크톱 테이블 */}
            <BoardTable
              posts={currentPosts}
              totalPosts={allPosts.length}
              startIndex={startIndex}
              onPostClick={handlePostClick}
            />

            {/* 모바일 리스트 */}
            <BoardMobileList posts={currentPosts} onPostClick={handlePostClick} />

            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  );
}
