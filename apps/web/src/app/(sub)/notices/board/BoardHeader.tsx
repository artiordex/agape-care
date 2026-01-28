interface BoardHeaderProps {
  totalPosts: number;
  onWriteClick: () => void;
}

export default function BoardHeader({ totalPosts, onWriteClick }: BoardHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">게시판</h1>
        <p className="text-gray-600">누구나 자유롭게 글을 작성할 수 있습니다</p>
      </div>

      <button
        onClick={onWriteClick}
        className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
      >
        <i className="ri-edit-line text-xl" />
        글쓰기
      </button>
    </div>
  );
}
