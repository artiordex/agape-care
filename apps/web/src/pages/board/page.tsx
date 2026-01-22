import { useState, useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';
import WritePostModal from './components/WritePostModal';
import PostDetailModal from './components/PostDetailModal';

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

  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${supabaseUrl}/functions/v1/free-board-posts`
      );
      const data = await response.json();
      
      // 데이터가 배열인지 확인하고, 아니면 빈 배열로 설정
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('예상치 못한 응답 형식:', data);
        setPosts([]);
      }
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <FloatingSidebar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">자유게시판</h1>
              <p className="text-gray-600">누구나 자유롭게 글을 작성할 수 있습니다</p>
            </div>
            <button
              onClick={() => setShowWriteModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-edit-line text-xl"></i>
              글쓰기
            </button>
          </div>

          {/* 게시글 목록 */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-article-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">첫 번째 글을 작성해보세요!</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2 mb-3">
                          {post.content.replace(/<[^>]*>/g, '')}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <i className="ri-user-line"></i>
                            {post.writer_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-eye-line"></i>
                            {post.view_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-time-line"></i>
                            {new Date(post.created_at).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                      </div>
                      {post.image_urls && post.image_urls.length > 0 && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={post.image_urls[0]}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* 글쓰기 모달 */}
      {showWriteModal && (
        <WritePostModal
          onClose={() => setShowWriteModal(false)}
          onSuccess={handleWriteSuccess}
        />
      )}

      {/* 상세보기 모달 */}
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
