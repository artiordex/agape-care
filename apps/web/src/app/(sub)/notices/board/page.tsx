/**
 * Description : page.tsx - ?? notices/board ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import BoardList from './BoardList';
import BoardMobileList from './BoardMobileList';
import BoardSearch from './BoardSearch';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const postsPerPage = 10;

  // API 데이터 로드
  const { data: postsData, isLoading } = api.webpage.getPosts.useQuery(['board-posts', currentPage], {
    query: {
      board_key: 'FREE',
      page: currentPage,
      limit: postsPerPage,
    },
  });

  const allPosts = useMemo(() => {
    if (!postsData) {
      return [];
    }

    if (postsData.status !== 200) {
      return [];
    }

    const posts = postsData.body?.data;

    if (!posts || !Array.isArray(posts)) {
      return [];
    }

    const mappedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      writer_name: post.authorName || '관리자',
      content: post.content,
      view_count: post.viewCount || 0,
      image_urls: [],
      is_hidden: false,
      created_at: post.createdAt,
      updated_at: post.updatedAt,
    }));
    return mappedPosts;
  }, [postsData]);

  const totalPosts = postsData?.body?.meta?.total ?? 0;
  const startIndex = (currentPage - 1) * postsPerPage;
  const totalPages = Math.ceil(totalPosts / postsPerPage) || 1;

  // 검색 필터링
  const filteredPosts = useMemo(() => {
    if (!activeSearchQuery) return allPosts;

    const query = activeSearchQuery.toLowerCase();
    return allPosts.filter(post => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.writer_name.toLowerCase().includes(query)
      );
    });
  }, [allPosts, activeSearchQuery]);

  // 검색 핸들러
  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
    setCurrentPage(1);
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 검색 섹션 */}
        <BoardSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />

        {/* 검색 결과 표시 */}
        {activeSearchQuery && (
          <div className="mb-4 flex items-center justify-between rounded border border-[#5C8D5A]/20 bg-[#5C8D5A]/5 px-4 py-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-[#5C8D5A]">&quot;{activeSearchQuery}&quot;</span> 검색 결과:{' '}
              <span className="font-semibold">{filteredPosts.length}</span>개
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

        {/* 게시글 목록 */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
          </div>
        )}

        {!isLoading && filteredPosts.length === 0 && (
          <div className="border border-gray-200 bg-white py-20 text-center">
            <i className="ri-article-line mb-4 text-6xl text-gray-300" />
            <p className="mb-2 text-lg font-semibold text-gray-900">
              {activeSearchQuery ? '검색 결과가 없습니다' : '등록된 게시글이 없습니다'}
            </p>
            <p className="text-sm text-gray-500">
              {activeSearchQuery ? '다른 검색어로 시도해보세요' : '첫 번째 글을 작성해보세요!'}
            </p>
          </div>
        )}

        {!isLoading && filteredPosts.length > 0 && (
          <>
            {/* 데스크톱 테이블 */}
            <BoardList
              posts={filteredPosts}
              totalPosts={activeSearchQuery ? filteredPosts.length : totalPosts}
              startIndex={activeSearchQuery ? 0 : startIndex}
              onPostClick={handlePostClick}
            />

            {/* 모바일 리스트 */}
            <BoardMobileList posts={filteredPosts} onPostClick={handlePostClick} />

            {/* 페이지네이션 - 검색 중이 아닐 때만 표시 */}
            {!activeSearchQuery && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
