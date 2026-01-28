'use client';

import { useState } from 'react';

import DeleteConfirmModal from './DeleteConfirmModal';
import EditPostModal from './EditPostModal';

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

export default function PostDetailModal({ post, onClose, onUpdateSuccess, onDeleteSuccess }: PostDetailModalProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleRefresh = async () => {
    try {
      if (!apiUrl) {
        console.error('API URL이 설정되지 않았습니다');
        return;
      }

      const response = await fetch(`${apiUrl}/board/posts/${post.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white">
          <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6">
            <div className="flex-1">
              <h2 className="mb-3 text-3xl font-bold text-gray-900">{currentPost.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <i className="ri-user-line" />
                  {currentPost.writer_name}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-eye-line" />
                  {currentPost.view_count}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-time-line" />
                  {new Date(currentPost.created_at).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            >
              <i className="ri-close-line text-2xl text-gray-600" />
            </button>
          </div>

          <div className="p-6">
            {/* 이미지 갤러리 */}
            {currentPost.image_urls && currentPost.image_urls.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {currentPost.image_urls.map((url, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border border-gray-200">
                      <img src={url} alt={`Image ${index + 1}`} className="h-auto w-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 본문 내용 */}
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{currentPost.content}</p>
            </div>

            {/* 수정/삭제 버튼 */}
            <div className="mt-8 flex gap-4 border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 whitespace-nowrap rounded-lg border border-amber-600 px-6 py-3 text-amber-600 transition-colors hover:bg-amber-50"
              >
                <i className="ri-edit-line mr-2" />
                수정하기
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 whitespace-nowrap rounded-lg border border-red-600 px-6 py-3 text-red-600 transition-colors hover:bg-red-50"
              >
                <i className="ri-delete-bin-line mr-2" />
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      {showEditModal && (
        <EditPostModal post={currentPost} onClose={() => setShowEditModal(false)} onSuccess={handleEditSuccess} />
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
