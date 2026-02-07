/**
 * Description : page.tsx - 📌 게시판 목록 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import BoardHeader from './BoardHeader';
import BoardMobileList from './BoardMobileList';
import BoardTable from './BoardTable';
import Pagination from './Pagination';
import WritePostModal from './WritePostModal';

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
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const postsPerPage = 10;

  // API 데이터 로드
  const { data: postsData, isLoading } = api.content.getPosts.useQuery(
    {
      query: {
        boardKey: 'FREE',
        page: currentPage,
        limit: postsPerPage,
      },
    },
    {
      queryKey: ['board-posts', currentPage],
    },
  );

  const allPosts = useMemo(() => {
    if (postsData?.status !== 200) return [];

    return postsData.body.data.map((post: any) => ({
      id: post.id,
      title: post.title,
      writer_name: '관리자', // TODO: authorId로 이름 가져오기
      content: post.content,
      view_count: post.viewCount || 0,
      image_urls: [], // TODO: 이미지 지원 시 추가
      is_hidden: false,
      created_at: post.createdAt,
      updated_at: post.updatedAt,
    }));
  }, [postsData]);

  const totalPosts = postsData?.status === 200 ? postsData.body.total || allPosts.length : 0; // total이 없을 경우 대비
  const startIndex = (currentPage - 1) * postsPerPage;
  const totalPages = Math.ceil(totalPosts / postsPerPage) || 1;

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
        <BoardHeader totalPosts={totalPosts} onWriteClick={() => setIsWriteModalOpen(true)} />

        {/* 게시글 목록 */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
          </div>
        ) : allPosts.length === 0 ? (
          <div className="border border-gray-200 bg-white py-20 text-center">
            <i className="ri-article-line mb-4 text-6xl text-gray-300" />
            <p className="mb-2 text-lg font-semibold text-gray-900">등록된 게시글이 없습니다</p>
            <p className="text-sm text-gray-500">첫 번째 글을 작성해보세요!</p>
          </div>
        ) : (
          <>
            {/* 데스크톱 테이블 */}
            <BoardTable
              posts={allPosts}
              totalPosts={totalPosts}
              startIndex={startIndex}
              onPostClick={handlePostClick}
            />

            {/* 모바일 리스트 */}
            <BoardMobileList posts={allPosts} onPostClick={handlePostClick} />

            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}

        {/* 글쓰기 모달 */}
        {isWriteModalOpen && (
          <WritePostModal
            onClose={() => setIsWriteModalOpen(false)}
            onSuccess={() => {
              setIsWriteModalOpen(false);
              // queryClient.invalidateQueries({ queryKey: ['board-posts'] }); // api.ts에서 처리되거나 새로고침 유도
              window.location.reload(); // 간단하게 페이지 새로고침
            }}
          />
        )}
      </div>
    </div>
  );
}
