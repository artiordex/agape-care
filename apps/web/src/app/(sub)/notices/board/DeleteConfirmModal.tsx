'use client';

import { api } from '@/lib/api';
import { useState } from 'react';

interface DeleteConfirmModalProps {
  postId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteConfirmModal({ postId, onClose, onSuccess }: DeleteConfirmModalProps) {
  const [error, setError] = useState('');

  const deletePost = api.content.deletePost.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await deletePost.mutateAsync({
        params: { id: postId },
        body: {},
      });

      onSuccess();
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      setError('게시글 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">게시글 삭제</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}

          <div>
            <p className="mb-4 text-gray-700">게시글을 삭제하시겠습니까?</p>
            <p className="mb-4 text-sm text-red-600">* 삭제된 게시글은 복구할 수 없습니다.</p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 whitespace-nowrap rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={deletePost.isPending}
              className="flex-1 whitespace-nowrap rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletePost.isPending ? '삭제 중...' : '삭제하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
