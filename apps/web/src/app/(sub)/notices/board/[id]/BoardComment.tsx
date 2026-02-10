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
  onCommentSubmit: (content: string, parentId: string | null) => Promise<void>;
  onCommentDelete: (commentId: string) => Promise<void>;
}

export default function BoardComment({
  postId,
  comments,
  isLocked = false,
  onCommentSubmit,
  onCommentDelete,
}: BoardCommentProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 최상위 댓글만 필터링 (parentId가 null인 댓글)
  const topLevelComments = comments.filter(comment => !comment.parentId);

  // 댓글 작성 핸들러
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onCommentSubmit(newComment.trim(), null);
      setNewComment('');
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

    try {
      setIsSubmitting(true);
      await onCommentSubmit(replyContent.trim(), parentId);
      setReplyContent('');
      setReplyTo(null);
    } catch (error) {
      console.error('답글 작성 실패:', error);
      alert('답글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await onCommentDelete(commentId);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
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
                  onClick={() => handleDeleteComment(comment.id)}
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
    </div>
  );
}
