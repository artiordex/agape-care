
import React, { useState } from 'react';

interface DeleteConfirmModalProps {
  postId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteConfirmModal({
  postId,
  onClose,
  onSuccess,
}: DeleteConfirmModalProps) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/free-board-posts`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          password,
          isAdmin: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '게시글 삭제에 실패했습니다.');
        return;
      }

      onSuccess();
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      setError('게시글 삭제에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">게시글 삭제</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <p className="text-gray-700 mb-4">
              게시글을 삭제하시려면 비밀번호를 입력해주세요.
            </p>
            <p className="text-sm text-red-600 mb-4">
              * 삭제된 게시글은 복구할 수 없습니다.
            </p>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="게시글 작성 시 입력한 비밀번호"
              autoFocus
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {submitting ? '삭제 중...' : '삭제하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
