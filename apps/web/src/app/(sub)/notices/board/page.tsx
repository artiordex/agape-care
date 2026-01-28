'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BoardHeader from './BoardHeader';
import BoardMobileList from './BoardMobileList';
import BoardTable from './BoardTable';
import Pagination from './Pagination';
import WritePostModal from './WritePostModal';

// 샘플 데이터 import
import boardData from '@/data/board.json';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      // API URL이 없으면 샘플 데이터 사용
      if (!apiUrl) {
        console.log('API URL이 설정되지 않아 샘플 데이터를 사용합니다');
        setPosts(boardData.posts || []);
        setLoading(false);
        return;
      }

      // API 호출
      const response = await fetch(`${apiUrl}/board/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
      console.log('샘플 데이터로 대체합니다');
      // API 실패 시 샘플 데이터 사용
      setPosts(boardData.posts || []);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post: Post) => {
    // 상세 페이지로 이동
    router.push(`/notices/board/${post.id}`);
  };

  const handleWriteSuccess = () => {
    setShowWriteModal(false);
    fetchPosts();
  };

  // 페이지네이션 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <BoardHeader totalPosts={posts.length} onWriteClick={() => setShowWriteModal(true)} />

        {/* 게시글 목록 */}
        {loading ? (
          <div className="rounded-lg border border-gray-200 bg-white py-20 text-center">
            <i className="ri-article-line mb-4 text-6xl text-gray-300" />
            <p className="mb-2 text-lg font-semibold text-gray-900">등록된 게시글이 없습니다</p>
            <p className="text-sm text-gray-500">첫 번째 글을 작성해보세요!</p>
          </div>
        ) : (
          <>
            {/* 데스크톱 테이블 */}
            <BoardTable
              posts={currentPosts}
              totalPosts={posts.length}
              startIndex={indexOfFirstPost}
              onPostClick={handlePostClick}
            />

            {/* 모바일 리스트 */}
            <BoardMobileList posts={currentPosts} onPostClick={handlePostClick} />

            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>

      {/* 글쓰기 모달 */}
      {showWriteModal && <WritePostModal onClose={() => setShowWriteModal(false)} onSuccess={handleWriteSuccess} />}
    </div>
  );
}
