'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { communityDetailMock } from '@/mocks/communityDetail';

export default function CommunityDetailPage() {
  const search = useSearchParams();
  const id = search.get('id') || '1';

  const article = communityDetailMock.find(item => item.id === id) ?? communityDetailMock[0];

  // article이 완전히 없는 경우 대비 (TypeScript 경고 제거 + 안정성 확보)
  if (!article) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-center text-gray-600">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-20">
      {/* Breadcrumb */}
      <div className="mb-12 border-b border-gray-100 bg-gray-50/80 py-4">
        <div className="flex gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-600">
            홈
          </Link>
          <i className="ri-arrow-right-s-line" />
          <Link href="/communities" className="hover:text-teal-600">
            알림마당
          </Link>
          <i className="ri-arrow-right-s-line" />
          <span>{article.title}</span>
        </div>
      </div>

      {/* Category */}
      <span
        className={`rounded-full px-4 py-1.5 text-sm font-medium ${
          article.category === '공지사항'
            ? 'bg-teal-50 text-teal-700'
            : article.category === '활동소식'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-blue-50 text-blue-700'
        }`}
      >
        {article.category}
      </span>

      {/* Title */}
      <h1 className="mb-6 mt-4 text-3xl font-bold text-gray-900 md:text-4xl">{article.title}</h1>

      {/* Meta */}
      <div className="mb-12 flex flex-wrap gap-6 border-b border-gray-200 pb-8 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <i className="ri-calendar-line" /> {article.date}
        </span>
        <span className="flex items-center gap-2">
          <i className="ri-user-line" /> {article.author}
        </span>
        <span className="flex items-center gap-2">
          <i className="ri-eye-line" /> 조회 {article.views}
        </span>
      </div>

      {/* Image */}
      {article.image && (
        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={article.image} className="h-[400px] w-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg text-gray-700">
        {article.content.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="mt-12 flex gap-2 border-t border-gray-200 pt-8">
          {article.tags.map((tag, i) => (
            <span key={i} className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div className="mt-16 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row">
        {article.prevPost && (
          <Link
            href={`/communities/detail?id=${article.prevPost.id}`}
            className="group flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-6 py-4 hover:bg-gray-100"
          >
            <i className="ri-arrow-left-line text-xl text-gray-400 group-hover:text-teal-600" />
            <div>
              <div className="text-xs text-gray-500">이전 글</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-teal-600">
                {article.prevPost.title}
              </div>
            </div>
          </Link>
        )}

        {article.nextPost && (
          <Link
            href={`/communities/detail?id=${article.nextPost.id}`}
            className="group flex flex-1 items-center justify-end gap-3 rounded-xl bg-gray-50 px-6 py-4 hover:bg-gray-100"
          >
            <div className="text-right">
              <div className="text-xs text-gray-500">다음 글</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-teal-600">
                {article.nextPost.title}
              </div>
            </div>
            <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-teal-600" />
          </Link>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-12 text-center">
        <Link
          href="/communities"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-white hover:bg-teal-700"
        >
          <i className="ri-list-check-2" />
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
