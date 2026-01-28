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

interface BoardMobileListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export default function BoardMobileList({ posts, onPostClick }: BoardMobileListProps) {
  return (
    <div className="space-y-3 md:hidden">
      {posts.map(post => (
        <div
          key={post.id}
          onClick={() => onPostClick(post)}
          className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 flex-1 text-base font-semibold text-gray-900">{post.title}</h3>
            {post.image_urls && post.image_urls.length > 0 && (
              <i className="ri-image-line flex-shrink-0 text-gray-400" />
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{post.writer_name}</span>
            <span className="h-3 w-px bg-gray-300" />
            <span>
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                month: '2-digit',
                day: '2-digit',
              })}
            </span>
            <span className="h-3 w-px bg-gray-300" />
            <span>조회 {post.view_count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
