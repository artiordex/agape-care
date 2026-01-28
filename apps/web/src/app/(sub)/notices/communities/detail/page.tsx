'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const communityDetails = [
  {
    id: '1',
    title: '2026년 1월 프로그램 안내',
    category: '공지사항',
    date: '2026-01-10',
    author: '관리자',
    views: 102,
    image: '/img/communities/notice-1.jpg',
    content: `1월 프로그램은 인지활동, 여가활동, 건강관리 등 다양한 프로그램이 진행될 예정입니다.

어르신들의 참여를 독려하며 즐거운 시간이 되도록 최선을 다하겠습니다.`,
    tags: ['1월프로그램', '공지'],
    prevPost: { id: '0', title: '이전 글이 없습니다.' },
    nextPost: { id: '2', title: '신년맞이 특별 행사 개최' },
  },
  {
    id: '2',
    title: '신년맞이 특별 행사 개최',
    category: '활동소식',
    date: '2026-01-05',
    author: '홍길동 사회복지사',
    views: 87,
    image: '/img/communities/activity-1.jpg',
    content: `새해를 맞이하여 어르신들과 함께 작은 행사를 진행했습니다.

풍성한 이벤트와 프로그램으로 모두가 즐거운 시간을 보냈습니다.`,
    tags: ['행사', '신년'],
    prevPost: { id: '1', title: '2026년 1월 프로그램 안내' },
    nextPost: { id: '3', title: '1월 생신잔치 안내' },
  },
  {
    id: '3',
    title: '1월 생신잔치 안내',
    category: '이벤트',
    date: '2026-01-02',
    author: '관리자',
    views: 143,
    image: '/img/communities/event-1.jpg',
    content: `1월 생신을 맞으신 어르신들의 생신잔치가 진행될 예정입니다.

모두 함께 축하해 주시고 따뜻한 시간을 보낼 수 있도록 마련했습니다.`,
    tags: ['생신잔치', '1월'],
    prevPost: { id: '2', title: '신년맞이 특별 행사 개최' },
    nextPost: { id: '4', title: '겨울철 감기 예방 안내' },
  },
  {
    id: '4',
    title: '겨울철 감기 예방 안내',
    category: '공지사항',
    date: '2025-12-29',
    author: '간호팀',
    views: 210,
    image: '/img/communities/notice-2.jpg',
    content: `감기 예방을 위한 안내입니다.

손 씻기, 마스크 착용, 적정 실내온도 유지에 적극 협조 부탁드립니다.`,
    tags: ['감기예방', '공지'],
    prevPost: { id: '3', title: '1월 생신잔치 안내' },
    nextPost: null,
  },
];

export default function CommunityDetailPage() {
  const search = useSearchParams();
  const id = search.get('id') || '1';

  // 상세 정보 찾기
  const article = communityDetails.find(item => item.id === id) ?? communityDetails[0];

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
          <img
            src={article.image}
            className="h-[400px] w-full object-cover"
            onError={e => (e.currentTarget.src = '/placeholder-image.jpg')}
          />
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
        {article.prevPost && article.prevPost.id !== '0' && (
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
