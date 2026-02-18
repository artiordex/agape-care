/**
 * Description : page.tsx - ?? notices/notice/[id] ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function NoticeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const noticeId = id as string;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  // Single Notice Query
  const { data: noticeResult, isLoading } = useQuery({
    queryKey: ['webpage-notice', noticeId],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/notices/notice/${noticeId}`);
      const body = await res.json();
      return { status: res.status, body };
    },
    enabled: !!noticeId,
  });

  // All Notices for Prev/Next navigation
  const { data: allNoticesResult } = api.webpage.getNotices.useQuery(['webpage-notices-nav'], {
    query: { isActive: true },
  });

  const notice = useMemo(() => {
    if (noticeResult?.status !== 200 || !noticeResult.body?.data) return null;
    const n = noticeResult.body.data;
    const date = n.createdAt
      ? new Date(n.createdAt).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, '')
      : '';

    return {
      ...n,
      date,
      views: n.viewCount || 0,
    };
  }, [noticeResult]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="mx-auto max-w-7xl py-20 text-center">
        <div className="rounded border border-gray-200 bg-white p-12 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <i className="ri-error-warning-line text-4xl text-gray-400" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">공지사항을 찾을 수 없습니다</h2>
          {noticeResult && noticeResult.status !== 200 && noticeResult.status !== 404 && (
            <p className="mb-2 font-bold text-red-500">API Error: {noticeResult.status}</p>
          )}

          <p className="mb-6 text-gray-600">요청하신 게시글이 삭제되었거나 존재하지 않습니다.</p>
          <Link
            href="/notices/notice"
            className="inline-flex items-center gap-2 rounded bg-[#5C8D5A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4A7548]"
          >
            <i className="ri-arrow-left-line" /> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const allNotices =
    allNoticesResult?.status === 200 && Array.isArray(allNoticesResult.body?.data) ? allNoticesResult.body.data : [];
  const currentIndex = allNotices.findIndex((n: any) => n && n.id === noticeId);
  const prev = currentIndex > 0 ? allNotices[currentIndex - 1] : null;
  const next = currentIndex !== -1 && currentIndex < allNotices.length - 1 ? allNotices[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-1200 container mx-auto px-4">
        <div className="border border-gray-200 bg-white shadow-sm">
          {/* Title Section */}
          <div className="border-b-2 border-[#5C8D5A]/30 bg-[#5C8D5A]/5 px-6 py-6 md:px-8">
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded border px-3 py-1 text-sm font-semibold ${
                  notice.category === 'URGENT'
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : notice.category === 'EVENT'
                      ? 'border-blue-200 bg-blue-50 text-blue-600'
                      : 'border-[#5C8D5A]/20 bg-[#5C8D5A]/10 text-[#5C8D5A]'
                }`}
              >
                {notice.category === 'URGENT' && <i className="ri-alert-line" />}
                {notice.category === 'EVENT' && <i className="ri-calendar-event-line" />}
                {notice.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{notice.title}</h1>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 md:px-8">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <i className="ri-calendar-line text-base text-[#5C8D5A]" />
                <span className="font-semibold text-gray-900">작성일</span>
                <span>{notice.date}</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <i className="ri-eye-line text-base text-[#5C8D5A]" />
                <span className="font-semibold text-gray-900">조회</span>
                <span>{(notice.views || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <article className="border-b border-gray-200 px-6 py-12 md:px-8">
            <div
              className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#5C8D5A] prose-a:no-underline hover:prose-a:underline prose-strong:font-bold prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 max-w-none"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
          </article>

          {/* Previous / Next Navigation */}
          <div className="border-b border-gray-200">
            {/* Previous */}
            <div className="flex items-center border-t border-gray-200 px-6 py-4 transition-colors hover:bg-[#5C8D5A]/5 md:px-8">
              <div className="w-24 flex-shrink-0">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <i className="ri-arrow-up-line text-[#5C8D5A]" /> 이전글
                </span>
              </div>
              <div className="min-w-0 flex-1">
                {prev ? (
                  <Link
                    href={`/notices/notice/${prev.id}`}
                    className="block truncate text-sm text-gray-900 transition-colors hover:text-[#5C8D5A] hover:underline"
                  >
                    {prev.title}
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400">이전글이 없습니다</span>
                )}
              </div>
            </div>

            {/* Next */}
            <div className="flex items-center border-t border-gray-200 px-6 py-4 transition-colors hover:bg-[#5C8D5A]/5 md:px-8">
              <div className="w-24 flex-shrink-0">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <i className="ri-arrow-down-line text-[#5C8D5A]" /> 다음글
                </span>
              </div>
              <div className="min-w-0 flex-1">
                {next ? (
                  <Link
                    href={`/notices/notice/${next.id}`}
                    className="block truncate text-sm text-gray-900 transition-colors hover:text-[#5C8D5A] hover:underline"
                  >
                    {next.title}
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400">다음글이 없습니다</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-[#5C8D5A]/5 px-6 py-6 md:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => router.push('/notices/notice')}
                className="flex items-center gap-2 rounded border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                <i className="ri-list-check" /> 목록
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                <i className="ri-printer-line" /> 인쇄
              </button>
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.share) {
                    navigator.share({
                      title: notice?.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('링크가 클립보드에 복사되었습니다.');
                  }
                }}
                className="flex items-center gap-2 rounded bg-[#5C8D5A] px-6 py-3 font-semibold text-white transition-all hover:bg-[#4A7548]"
              >
                <i className="ri-share-line" /> 공유
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
