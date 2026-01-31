import React from 'react';
import { FreeBoardPost, FreeBoardCategory } from './free-board.type';

interface FreeBoardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: FreeBoardPost | null;
  onEdit: (post: FreeBoardPost) => void;
  onDelete: (id: string) => void;
}

const FreeBoardDetailModal = ({ isOpen, onClose, post, onEdit, onDelete }: FreeBoardDetailModalProps) => {
  if (!isOpen || !post) return null;

  // 카테고리별 스타일 (FreeBoardItem과 통일)
  const getCategoryStyle = (category: FreeBoardCategory) => {
    switch (category) {
      case '질문':
        return 'bg-blue-50 text-blue-600';
      case '정보':
        return 'bg-green-50 text-green-600';
      case '잡담':
        return 'bg-gray-50 text-gray-600';
      default:
        return 'bg-purple-50 text-purple-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-300">
        {/* 상단 헤더 & 메타 정보 */}
        <div className="border-b border-gray-100 px-8 py-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className={`rounded px-2.5 py-1 text-xs font-bold ${getCategoryStyle(post.category)}`}>
                {post.category}
              </span>
              {post.isNotice && (
                <span className="rounded bg-red-500 px-2.5 py-1 text-xs font-bold text-white">공지사항</span>
              )}
            </div>
            <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-900">{post.title}</h2>

          <div className="flex flex-wrap items-center gap-y-2 text-sm text-gray-500">
            <div className="mr-4 flex items-center border-r border-gray-200 pr-4">
              <span className="mr-2 font-semibold text-gray-700">작성자</span>
              <span>
                {post.authorName} ({post.authorId})
              </span>
            </div>
            <div className="mr-4 flex items-center border-r border-gray-200 pr-4">
              <span className="mr-2 font-semibold text-gray-700">조회수</span>
              <span>{post.viewCount.toLocaleString()}</span>
            </div>
            <div className="mr-4 flex items-center border-r border-gray-200 pr-4">
              <span className="mr-2 font-semibold text-gray-700">댓글</span>
              <span className="font-bold text-blue-600">{post.commentCount}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-semibold text-gray-700">등록일</span>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="max-h-[50vh] overflow-y-auto px-8 py-8">
          <div className="prose prose-blue max-w-none whitespace-pre-wrap leading-relaxed text-gray-800">
            {post.content}
          </div>

          {/* 댓글 미리보기 영역 (어드민용 더미) */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              댓글 내역 <span className="text-sm font-normal text-gray-400">{post.commentCount}개</span>
            </h3>
            <div className="rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-400">
              댓글 관리 기능은 해당 사용자의 상세 페이지에서 가능합니다.
            </div>
          </div>
        </div>

        {/* 하단 푸터 액션 */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-8 py-5">
          <button
            onClick={() => onDelete(post.id)}
            className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            게시글 완전히 삭제
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              닫기
            </button>
            <button
              onClick={() => onEdit(post)}
              className="rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-gray-900"
            >
              내용 수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardDetailModal;
