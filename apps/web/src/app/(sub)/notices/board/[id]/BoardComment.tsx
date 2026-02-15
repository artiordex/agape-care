/**
 * Description : BoardComment.tsx - 📌 게시판 댓글 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-08
 */

'use client';

import { useState } from 'react';

interface Author {
  id: string;
  name: string;
}

interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  authorId: string | null;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  author: Author | null;
  replies: Comment[];
}

interface BoardCommentProps {
  postId: string;
  comments: Comment[];
  isLocked?: boolean;
  onCommentSubmit: (
    content: string,
    parentId: string | null,
    guestNickname?: string,
    guestPassword?: string,
  ) => Promise<void>;
  onCommentDelete: (commentId: string, password?: string) => Promise<void>;
}

export default function BoardComment({
  postId,
  comments,
  isLocked = false,
  onCommentSubmit,
  onCommentDelete,
}: BoardCommentProps) {
  const [newComment, setNewComment] = useState('');
  const [guestNickname, setGuestNickname] = useState('');
  const [guestPassword, setGuestPassword] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyGuestNickname, setReplyGuestNickname] = useState('');
  const [replyGuestPassword, setReplyGuestPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 최상위 댓글만 필터링 (parentId가 null인 댓글)
  const topLevelComments = comments.filter(comment => !comment.parentId);

  // 댓글 작성 핸들러
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    if (!guestNickname.trim() || !guestPassword.trim()) {
      alert('닉네임과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onCommentSubmit(newComment.trim(), null, guestNickname, guestPassword);
      setNewComment('');
      setGuestNickname('');
      setGuestPassword('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 대댓글 작성 핸들러
  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) {
      alert('답글 내용을 입력해주세요.');
      return;
    }

    if (!replyGuestNickname.trim() || !replyGuestPassword.trim()) {
      alert('닉네임과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onCommentSubmit(replyContent.trim(), parentId, replyGuestNickname, replyGuestPassword);
      setReplyContent('');
      setReplyGuestNickname('');
      setReplyGuestPassword('');
      setReplyTo(null);
    } catch (error) {
      console.error('답글 작성 실패:', error);
      alert('답글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 삭제 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (comment: Comment) => {
    // authorId가 없으면 비회원 댓글로 간주하여 비밀번호 확인 모달 표시
    if (!comment.authorId) {
      setCommentToDelete(comment);
      setIsDeleteModalOpen(true);
      setDeletePassword('');
    } else {
      if (!confirm('정말 삭제하시겠습니까?')) return;
      try {
        await onCommentDelete(comment.id);
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
      }
    }
  };

  // 모달을 통한 삭제 확인
  const handleConfirmDelete = async () => {
    if (!commentToDelete) return;
    if (!deletePassword.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onCommentDelete(commentToDelete.id, deletePassword);
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
      setDeletePassword('');
    } catch (error) {
      console.error('삭제 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 렌더링 (재귀적으로 대댓글 표시)
  const renderComment = (comment: Comment, depth: number = 0) => {
    const isDeleted = comment.isDeleted;
    const maxDepth = 2; // 최대 대댓글 depth

    return (
      <div key={comment.id} className={depth > 0 ? 'ml-12 mt-4' : 'mt-4'}>
        <div className="rounded border border-gray-200 bg-white p-4">
          {/* 댓글 헤더 */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-user-line text-sm text-[#5C8D5A]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{comment.author?.name || '알 수 없음'}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* 댓글 액션 버튼 */}
            {!isDeleted && (
              <div className="flex items-center gap-2">
                {depth < maxDepth && !isLocked && (
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="text-xs text-[#5C8D5A] transition-colors hover:text-[#4A7548]"
                  >
                    <i className="ri-reply-line" /> 답글
                  </button>
                )}
                <button
                  onClick={() => handleDeleteComment(comment)}
                  className="text-xs text-red-500 transition-colors hover:text-red-600"
                >
                  <i className="ri-delete-bin-line" /> 삭제
                </button>
              </div>
            )}
          </div>

          {/* 댓글 내용 */}
          <div className="text-sm text-gray-700">
            {isDeleted ? (
              <p className="italic text-gray-400">삭제된 댓글입니다.</p>
            ) : (
              <p className="whitespace-pre-wrap">{comment.content}</p>
            )}
          </div>

          {/* 답글 작성 폼 */}
          {replyTo === comment.id && !isLocked && (
            <div className="mt-4 rounded bg-gray-50 p-4">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="닉네임"
                  value={replyGuestNickname}
                  onChange={e => setReplyGuestNickname(e.target.value)}
                  className="rounded border border-gray-300 p-2 text-sm outline-none focus:border-[#5C8D5A]"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={replyGuestPassword}
                  onChange={e => setReplyGuestPassword(e.target.value)}
                  className="rounded border border-gray-300 p-2 text-sm outline-none focus:border-[#5C8D5A]"
                />
              </div>
              <textarea
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                placeholder="답글을 입력하세요..."
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm outline-none transition-all focus:border-[#5C8D5A] focus:ring-2 focus:ring-[#5C8D5A]/20"
                rows={3}
                disabled={isSubmitting}
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplyContent('');
                    setReplyGuestNickname('');
                    setReplyGuestPassword('');
                  }}
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                  disabled={isSubmitting}
                >
                  취소
                </button>
                <button
                  onClick={() => handleSubmitReply(comment.id)}
                  className="rounded bg-[#5C8D5A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4A7548] disabled:bg-gray-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '작성 중...' : '답글 작성'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 대댓글 렌더링 (재귀) */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">{comment.replies.map(reply => renderComment(reply, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-6 py-8 md:px-8">
      {/* 댓글 헤더 */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          댓글 <span className="text-[#5C8D5A]">{comments.length}</span>
        </h3>
        {isLocked && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <i className="ri-lock-line" />
            <span>댓글이 잠겼습니다</span>
          </div>
        )}
      </div>

      {/* 댓글 작성 폼 */}
      {!isLocked && (
        <div className="mb-8 rounded border border-gray-200 bg-white p-4">
          <div className="mb-3 grid grid-cols-2 gap-2 md:w-1/2">
            <input
              type="text"
              placeholder="닉네임"
              value={guestNickname}
              onChange={e => setGuestNickname(e.target.value)}
              className="rounded border border-gray-300 p-2 text-sm outline-none focus:border-[#5C8D5A]"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={guestPassword}
              onChange={e => setGuestPassword(e.target.value)}
              className="rounded border border-gray-300 p-2 text-sm outline-none focus:border-[#5C8D5A]"
            />
          </div>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="w-full resize-none rounded border border-gray-300 p-4 text-sm outline-none transition-all focus:border-[#5C8D5A] focus:ring-2 focus:ring-[#5C8D5A]/20"
            rows={4}
            disabled={isSubmitting}
          />
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleSubmitComment}
              className="rounded bg-[#5C8D5A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4A7548] disabled:bg-gray-300"
              disabled={isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? '작성 중...' : '댓글 작성'}
            </button>
          </div>
        </div>
      )}

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {topLevelComments.length === 0 ? (
          <div className="rounded border border-gray-200 bg-white py-12 text-center">
            <i className="ri-chat-3-line mb-3 text-4xl text-gray-300" />
            <p className="text-sm text-gray-500">첫 번째 댓글을 작성해보세요!</p>
          </div>
        ) : (
          topLevelComments.map(comment => renderComment(comment))
        )}
      </div>
      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <i className="ri-delete-bin-6-line text-lg text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">댓글 삭제</h4>
                <p className="text-sm text-gray-500">삭제를 위해 비밀번호를 입력해주세요.</p>
              </div>
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="비밀번호"
                value={deletePassword}
                onChange={e => setDeletePassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleConfirmDelete()}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                autoFocus
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCommentToDelete(null);
                  setDeletePassword('');
                }}
                className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:bg-red-300"
                disabled={isSubmitting || !deletePassword.trim()}
              >
                {isSubmitting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
