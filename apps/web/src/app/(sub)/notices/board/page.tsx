'use client';

import { useEffect, useState } from 'react';
import PostDetailModal from './PostDetailModal';
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      if (!apiUrl) {
        console.error('API URL이 설정되지 않았습니다');
        setPosts([]);
        return;
      }

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
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleWriteSuccess = () => {
    setShowWriteModal(false);
    fetchPosts();
  };

  const handleUpdateSuccess = () => {
    setShowDetailModal(false);
    fetchPosts();
  };

  const handleDeleteSuccess = () => {
    setShowDetailModal(false);
    fetchPosts();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">자유 게시판</h1>
          <p className="text-gray-600">누구나 자유롭게 글을 작성할 수 있습니다</p>
        </div>

        <button
          onClick={() => setShowWriteModal(true)}
          className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
        >
          <i className="ri-edit-line text-xl" />
          글쓰기
        </button>
      </div>

      {/* 게시글 목록 */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
        </div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center">
          <i className="ri-article-line mb-4 text-6xl text-gray-300" />
          <p className="text-lg text-gray-500">첫 번째 글을 작성해보세요!</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="divide-y divide-gray-200">
            {posts.map(post => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="cursor-pointer p-6 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 line-clamp-1 text-xl font-bold text-gray-900 transition-colors hover:text-amber-600">
                      {post.title}
                    </h3>

                    <p className="mb-3 line-clamp-2 text-gray-600">{post.content.replace(/<[^>]*>/g, '')}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-user-line" />
                        {post.writer_name}
                      </span>

                      <span className="flex items-center gap-1">
                        <i className="ri-eye-line" />
                        {post.view_count}
                      </span>

                      <span className="flex items-center gap-1">
                        <i className="ri-time-line" />
                        {new Date(post.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  </div>

                  {/* 이미지 썸네일 */}
                  {post.image_urls && post.image_urls.length > 0 && (
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <img src={post.image_urls[0]} alt={post.title} className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 글쓰기 모달 */}
      {showWriteModal && <WritePostModal onClose={() => setShowWriteModal(false)} onSuccess={handleWriteSuccess} />}

      {/* 상세 모달 */}
      {showDetailModal && selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setShowDetailModal(false)}
          onUpdateSuccess={handleUpdateSuccess}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
