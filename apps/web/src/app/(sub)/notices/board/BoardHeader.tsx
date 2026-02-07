/**
 * Description : BoardHeader.tsx - 📌 게시판 헤더
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

interface BoardHeaderProps {
  totalPosts: number;
  onWriteClick: () => void;
}

export default function BoardHeader({ totalPosts, onWriteClick }: BoardHeaderProps) {
  return (
    <div className="mb-10 flex items-start justify-between gap-4">
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center bg-[#5C8D5A] text-white">
          <i className="ri-message-3-line text-3xl" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            게시<span className="text-[#5C8D5A]">판</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            누구나 자유롭게 글을 작성할 수 있습니다 • 총{' '}
            <span className="font-semibold text-[#5C8D5A]">{totalPosts}</span>개
          </p>
        </div>
      </div>
    </div>
  );
}
