'use client';

import { useState } from 'react';

interface DeleteConfirmModalProps {
  postId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteConfirmModal({ postId, onClose, onSuccess }: DeleteConfirmModalProps) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    if (!apiUrl) {
      setError('API URL이 설정되지 않았습니다.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/board/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">게시글 삭제</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
          )}

          <div>
            <p className="mb-4 text-gray-700">게시글을 삭제하시려면 비밀번호를 입력해주세요.</p>
            <p className="mb-4 text-sm text-red-600">* 삭제된 게시글은 복구할 수 없습니다.</p>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="게시글 작성 시 입력한 비밀번호"
              autoFocus
            />
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
              disabled={submitting}
              className="flex-1 whitespace-nowrap rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? '삭제 중...' : '삭제하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
