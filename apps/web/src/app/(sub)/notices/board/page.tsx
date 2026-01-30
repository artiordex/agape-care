'use client';

import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // API 호출
  const { data, isLoading, refetch } = api.content.getPosts.useQuery(
    ['content', 'posts', { boardKey: 'FREE', page: currentPage, limit: postsPerPage }],
    {
      query: {
        boardKey: 'FREE', // TODO: 키 동적 처리 고려
        page: currentPage,
        limit: postsPerPage,
      },
    },
  );

  const postsRaw = data?.status === 200 ? data.body.data : [];

  // 데이터 가공
  const posts: Post[] = postsRaw.map(post => ({
    id: post.id,
    title: post.title,
    writer_name: post.authorName || '익명',
    content: post.content,
    view_count: post.viewCount || 0,
    image_urls: post.images || [],
    is_hidden: post.isHidden || false,
    created_at: post.createdAt.toString(), // Date 객체일 수 있으므로 변환 필요
    updated_at: post.updatedAt.toString(),
  }));

  const handlePostClick = (post: Post) => {
    router.push(`/notices/board/${post.id}`);
  };

  const handleWriteSuccess = () => {
    setShowWriteModal(false);
    refetch();
  };

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;

  // API가 토탈 카운트를 주지 않으면 페이지네이션이 정확하지 않을 수 있음.
  // getPostsContract가 array만 리턴하므로 현재는 받아온 것 기준.
  // 실제로는 limit만큼 받아왔다면 다음 페이지가 있을 수 있음.
  // 여기서는 UI 로직 유지를 위해 받아온 데이터 그대로 표시.

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BoardHeader totalPosts={posts.length} onWriteClick={() => setShowWriteModal(true)} />

        {isLoading ? (
          <div className="rounded-lg border border-gray-200 bg-white py-20 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent" />
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white py-20 text-center">
            <i className="ri-article-line mb-4 text-6xl text-gray-300" />
            <p className="mb-2 text-lg font-semibold text-gray-900">등록된 게시글이 없습니다</p>
            <p className="text-sm text-gray-500">첫 번째 글을 작성해보세요!</p>
          </div>
        ) : (
          <>
            <BoardTable
              posts={posts}
              totalPosts={posts.length}
              startIndex={(currentPage - 1) * postsPerPage}
              onPostClick={handlePostClick}
            />

            <BoardMobileList posts={posts} onPostClick={handlePostClick} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages < 1 ? 1 : totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {showWriteModal && <WritePostModal onClose={() => setShowWriteModal(false)} onSuccess={handleWriteSuccess} />}
    </div>
  );
}
