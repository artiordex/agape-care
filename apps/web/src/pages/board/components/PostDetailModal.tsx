
import { useState } from 'react';
import EditPostModal from './EditPostModal';
import DeleteConfirmModal from './DeleteConfirmModal';

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

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
  onUpdateSuccess: () => void;
  onDeleteSuccess: () => void;
}

export default function PostDetailModal({
  post,
  onClose,
  onUpdateSuccess,
  onDeleteSuccess,
}: PostDetailModalProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

  const handleRefresh = async () => {
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/free-board-posts?id=${post.id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: Post = await response.json();
      setCurrentPost(data);
    } catch (error) {
      console.error('게시글 새로고침 실패:', error);
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    handleRefresh();
    onUpdateSuccess();
  };

  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    onDeleteSuccess();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{currentPost.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <i className="ri-user-line"></i>
                  {currentPost.writer_name}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-eye-line"></i>
                  {currentPost.view_count}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-time-line"></i>
                  {new Date(currentPost.created_at).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0 ml-4"
            >
              <i className="ri-close-line text-2xl text-gray-600"></i>
            </button>
          </div>

          <div className="p-6">
            {/* 이미지 갤러리 */}
            {currentPost.image_urls && currentPost.image_urls.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPost.image_urls.map((url, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 본문 내용 */}
            <div className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {currentPost.content}
              </p>
            </div>

            {/* 수정/삭제 버튼 */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 px-6 py-3 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-edit-line mr-2"></i>
                수정하기
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-delete-bin-line mr-2"></i>
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      {showEditModal && (
        <EditPostModal
          post={currentPost}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <DeleteConfirmModal
          postId={currentPost.id}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
}
