/**
 * Description : page.tsx - 📌 공지사항 상세 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { notices } from '@/data/announce.json';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NoticeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const noticeId = Number(id);
  const [viewCount, setViewCount] = useState(0);

  const notice = notices.find(n => n.id === noticeId);

  /* 조회수 증가 로직 (localStorage 기반) */
  useEffect(() => {
    if (!notice) return;

    const storageKey = `notice_view_${noticeId}`;
    const hasViewed = localStorage.getItem(storageKey);

    if (hasViewed) {
      setViewCount(notice.views);
    } else {
      localStorage.setItem(storageKey, 'true');
      setViewCount(notice.views + 1);
    }
  }, [noticeId, notice]);

  if (!notice) {
    return (
      <div className="mx-auto max-w-5xl py-20 text-center">
        <div className="rounded border border-gray-200 bg-white p-12 shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <i className="ri-error-warning-line text-4xl text-gray-400" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">공지사항을 찾을 수 없습니다</h2>
          <p className="mb-6 text-gray-600">요청하신 게시글이 삭제되었거나 존재하지 않습니다.</p>
          <Link
            href="/notices/announcements"
            className="inline-flex items-center gap-2 rounded bg-[#5C8D5A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4A7548]"
          >
            <i className="ri-arrow-left-line" /> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = notices.findIndex(n => n.id === noticeId);
  const prev = currentIndex > 0 ? notices[currentIndex - 1] : null;
  const next = currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="border border-gray-200 bg-white shadow-sm">
          {/* Title Section */}
          <div className="border-b-2 border-[#5C8D5A]/30 bg-[#5C8D5A]/5 px-6 py-6 md:px-8">
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded border px-3 py-1 text-sm font-semibold ${
                  notice.category === '중요'
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : notice.category === '행사'
                      ? 'border-blue-200 bg-blue-50 text-blue-600'
                      : 'border-[#5C8D5A]/20 bg-[#5C8D5A]/10 text-[#5C8D5A]'
                }`}
              >
                {notice.category === '중요' && <i className="ri-alert-line" />}
                {notice.category === '행사' && <i className="ri-calendar-event-line" />}
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
                <span>{viewCount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="border-b border-gray-200 px-6 py-4 md:px-8">
            <div className="flex items-start gap-3">
              <i className="ri-attachment-line mt-1 text-lg text-[#5C8D5A]" />
              <div className="flex-1">
                <span className="font-semibold text-gray-900">첨부파일</span>
                <div className="mt-2 flex flex-col gap-2">
                  {notice.attachments && notice.attachments.length > 0 ? (
                    notice.attachments.map((file: any) => (
                      <a
                        key={file.url}
                        href={file.url}
                        download
                        className="flex items-center gap-2 text-sm text-[#5C8D5A] transition-colors hover:text-[#4A7548] hover:underline"
                      >
                        <i className="ri-file-text-line" />
                        <span>{file.name}</span>
                        <span className="text-gray-400">({file.size})</span>
                      </a>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">첨부파일이 없습니다</span>
                  )}
                </div>
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
                    href={`/notices/announcements/${prev.id}`}
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
                    href={`/notices/announcements/${next.id}`}
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
                onClick={() => router.push('/notices/announcements')}
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
                  if (navigator.share) {
                    navigator.share({
                      title: notice.title,
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
