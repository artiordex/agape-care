/**
 * Description : BoardItem.tsx - ?? BoardItem UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { FreeBoardPost } from './board.type';

interface FreeBoardItemProps {
  post: FreeBoardPost;
  displayIndex: number;
  onEdit: () => void;
  onDelete: () => void;
  onDetail: () => void;
}

const FreeBoardItem = ({ post, displayIndex, onEdit, onDelete, onDetail }: FreeBoardItemProps) => {
  return (
    <div className="group grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-[#f1f5f9]/50">
      {/* 번호 및 아이콘: 이미지의 투약 아이콘 스타일 반영 */}
      <div className="col-span-1 flex justify-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${post.isNotice ? 'border border-red-100 bg-red-50 text-red-500' : 'border border-gray-100 bg-gray-50 text-gray-400'}`}
        >
          {post.isNotice ? '📢' : displayIndex}
        </div>
      </div>

      {/* 카테고리: 이미지의 '혈압 상승' 배지 스타일 */}
      <div className="col-span-2">
        <span className="rounded-[2px] border border-[#e2e8f0] bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-[#1e293b]">
          {post.category}
        </span>
      </div>

      {/* 제목 및 댓글 수 */}
      <div className="col-span-4">
        <div className="flex cursor-pointer items-center gap-2" onClick={onDetail}>
          <span className="line-clamp-1 text-sm font-bold text-[#334155] transition-colors group-hover:text-[#004e9a]">
            {post.title}
          </span>
          {post.commentCount > 0 && (
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-black text-blue-500">
              {post.commentCount}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[10px] font-medium uppercase text-gray-400">Author: {post.authorName}</p>
      </div>

      {/* 조회수 */}
      <div className="col-span-1 text-center text-xs font-bold text-gray-500">{post.viewCount.toLocaleString()}</div>

      {/* 상태: 이미지의 '진행 중', '확인 필요' 컬러 반영 */}
      <div className="col-span-1 text-center">
        <span
          className={`text-[10px] font-black uppercase ${post.status === '게시' ? 'text-green-500' : 'text-orange-500'}`}
        >
          {post.status === '게시' ? '● Active' : '● Hidden'}
        </span>
      </div>

      {/* 등록일: 이미지 우측 상단의 시간 스타일 */}
      <div className="col-span-2 text-center font-mono text-[11px] font-bold text-gray-400">
        {new Date(post.createdAt).toLocaleDateString()}
        <span className="block text-[9px] font-normal text-gray-300">14:00:00</span>
      </div>

      {/* 관리 액션: 이미지의 'CONFIRM', 'CHECK VITALS' 버튼 스타일 */}
      <div className="col-span-1 text-right">
        <button
          onClick={onDetail}
          className="border-b border-transparent text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all hover:border-[#004e9a] hover:text-[#004e9a]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FreeBoardItem;
