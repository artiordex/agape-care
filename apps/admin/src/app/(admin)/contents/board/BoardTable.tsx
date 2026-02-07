import { FreeBoardPost } from './board.type';
import FreeBoardItem from './BoardItem';

interface FreeBoardTableProps {
  posts: FreeBoardPost[];
  onEdit: (post: FreeBoardPost) => void;
  onDelete: (id: string) => void;
  onDetail: (post: FreeBoardPost) => void;
}

const FreeBoardTable = ({ posts, onEdit, onDelete, onDetail }: FreeBoardTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* 섹션 헤더: 이미지의 'DAILY MEDICATION CONTROL' 스타일 반영 */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-[#f8fafc] px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 rounded-full bg-[#004e9a]"></div>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#1e293b]">Board Activity Registry</h2>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">Unit: Post Count / Status</div>
      </div>

      {/* 테이블 헤더: 더 정밀한 ERP 레이아웃 */}
      <div className="grid grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/50 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <div className="col-span-1 text-center">No</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-4">Subject & Comments</div>
        <div className="col-span-1 text-center">Views</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-center">Date</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* 리스트 본문 */}
      <div className="divide-y divide-gray-100">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <FreeBoardItem
              key={post.id}
              post={post}
              displayIndex={posts.length - index}
              onEdit={() => onEdit(post)}
              onDelete={() => onDelete(post.id)}
              onDetail={() => onDetail(post)}
            />
          ))
        ) : (
          <div className="py-32 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-300">No recent logs found</p>
          </div>
        )}
      </div>

      {/* 푸터: 이미지 하단의 '전체 투약 기록 로그 조회' 스타일 */}
      <div className="border-t border-gray-100 bg-gray-50/30 p-3">
        <button className="w-full rounded border border-dashed border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 transition-all hover:bg-white hover:shadow-sm">
          🔄 View Full Activity Log & Pagination
        </button>
      </div>
    </div>
  );
};

export default FreeBoardTable;
