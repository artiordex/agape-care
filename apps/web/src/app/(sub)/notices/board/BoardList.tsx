/**
 * Description : BoardTable.tsx - 📌 게시판 테이블 (데스크톱)
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

interface Post {
  id: string;
  title: string;
  writer_name: string;
  content: string;
  view_count: number;
  image_urls: string[];
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
}

interface BoardTableProps {
  posts: Post[];
  totalPosts: number;
  startIndex: number;
  onPostClick: (post: Post) => void;
}

export default function BoardTable({ posts, totalPosts, startIndex, onPostClick }: BoardTableProps) {
  return (
    <div className="hidden overflow-hidden border border-gray-200 bg-white shadow-sm md:block">
      <table className="w-full">
        <thead className="border-b-2 border-[#5C8D5A]/30 bg-[#5C8D5A]/5">
          <tr>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700" style={{ width: '80px' }}>
              번호
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">제목</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700" style={{ width: '120px' }}>
              작성자
            </th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700" style={{ width: '120px' }}>
              작성일
            </th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700" style={{ width: '80px' }}>
              조회
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post, index) => (
            <tr
              key={post.id}
              onClick={() => onPostClick(post)}
              className="cursor-pointer transition-colors hover:bg-[#5C8D5A]/5"
            >
              <td className="px-6 py-4 text-center text-sm text-gray-600">{totalPosts - (startIndex + index)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="line-clamp-1 text-sm font-semibold text-gray-900 hover:text-[#5C8D5A] hover:underline">
                    {post.title}
                  </span>
                  {post.image_urls && post.image_urls.length > 0 && (
                    <i className="ri-image-line flex-shrink-0 text-[#5C8D5A]" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-600">{post.writer_name}</td>
              <td className="px-6 py-4 text-center text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-500">{post.view_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
