'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 샘플 데이터 import
import boardData from '@/data/board.json';

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

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);

      // API URL이 없으면 샘플 데이터 사용
      if (!apiUrl) {
        const posts = boardData.posts;
        const currentPost = posts.find(p => p.id === postId);
        const currentIndex = posts.findIndex(p => p.id === postId);

        setPost(currentPost || null);
        setPrevPost(currentIndex > 0 ? posts[currentIndex - 1] || null : null);
        setNextPost(currentIndex < posts.length - 1 ? posts[currentIndex + 1] || null : null);
        setLoading(false);
        return;
      }

      // API 호출
      const response = await fetch(`${apiUrl}/board/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPost(data);

      // 이전글/다음글 조회
      const allPostsResponse = await fetch(`${apiUrl}/board/posts`);
      const allPosts = await allPostsResponse.json();
      const posts = Array.isArray(allPosts) ? allPosts : allPosts.posts || [];
      const currentIndex = posts.findIndex((p: Post) => p.id === postId);

      setPrevPost(currentIndex > 0 ? posts[currentIndex - 1] : null);
      setNextPost(currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null);
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
      // API 실패 시 샘플 데이터 사용
      const posts = boardData.posts;
      const currentPost = posts.find(p => p.id === postId);
      const currentIndex = posts.findIndex(p => p.id === postId);

      setPost(currentPost || null);
      setPrevPost(currentIndex > 0 ? posts[currentIndex - 1] || null : null);
      setNextPost(currentIndex < posts.length - 1 ? posts[currentIndex + 1] || null : null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="rounded-2xl bg-white p-12 shadow-lg">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <i className="ri-error-warning-line text-4xl text-gray-400" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">게시글을 찾을 수 없습니다</h2>
          <p className="mb-6 text-gray-600">요청하신 게시글이 삭제되었거나 존재하지 않습니다.</p>
          <Link
            href="/notices/board"
            className="inline-flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4A7548]"
          >
            <i className="ri-arrow-left-line" />목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title Section */}
        <div className="border-b-2 border-gray-900 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{post.title}</h1>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between border-b border-gray-200 py-4">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">작성자</span>
              <span>{post.writer_name}</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">작성일</span>
              <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">조회</span>
              <span>{post.view_count.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Attachments Section */}
        {post.image_urls && post.image_urls.length > 0 && (
          <div className="border-b border-gray-200 py-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 font-semibold text-gray-900">첨부파일</span>
              <div className="flex flex-col gap-2">
                {post.image_urls.map((url, index) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#5C8D5A] transition-colors hover:text-[#4A7548] hover:underline"
                  >
                    <i className="ri-image-line" />
                    <span>이미지 {index + 1}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <article className="border-b border-gray-200 py-12">
          {/* Images */}
          {post.image_urls && post.image_urls.length > 0 && (
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {post.image_urls.map((url, index) => (
                <div key={url} className="overflow-hidden rounded-lg border border-gray-200">
                  <img src={url} alt={`Image ${index + 1}`} className="h-auto w-full object-contain" />
                </div>
              ))}
            </div>
          )}

          {/* Text Content */}
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed text-gray-700">{post.content}</p>
          </div>
        </article>

        {/* Previous / Next Navigation */}
        <div className="border-b border-gray-200">
          {/* Previous */}
          <div className="flex items-center border-t border-gray-200 py-4 hover:bg-gray-50">
            <div className="w-24 flex-shrink-0 px-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <i className="ri-arrow-up-line" />
                이전글
              </span>
            </div>
            <div className="min-w-0 flex-1">
              {prevPost ? (
                <Link
                  href={`/notices/board/${prevPost.id}`}
                  className="block truncate text-sm text-gray-900 transition-colors hover:text-[#5C8D5A] hover:underline"
                >
                  {prevPost.title}
                </Link>
              ) : (
                <span className="text-sm text-gray-400">이전글이 없습니다</span>
              )}
            </div>
          </div>

          {/* Next */}
          <div className="flex items-center border-t border-gray-200 py-4 hover:bg-gray-50">
            <div className="w-24 flex-shrink-0 px-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <i className="ri-arrow-down-line" />
                다음글
              </span>
            </div>
            <div className="min-w-0 flex-1">
              {nextPost ? (
                <Link
                  href={`/notices/board/${nextPost.id}`}
                  className="block truncate text-sm text-gray-900 transition-colors hover:text-[#5C8D5A] hover:underline"
                >
                  {nextPost.title}
                </Link>
              ) : (
                <span className="text-sm text-gray-400">다음글이 없습니다</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => router.push('/notices/board')}
            className="flex items-center gap-2 rounded border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            <i className="ri-list-check" />
            목록
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            <i className="ri-printer-line" />
            인쇄
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 클립보드에 복사되었습니다.');
              }
            }}
            className="flex items-center gap-2 rounded bg-[#5C8D5A] px-6 py-3 font-semibold text-white transition-all hover:bg-[#4A7548]"
          >
            <i className="ri-share-line" />
            공유
          </button>
        </div>
      </div>
    </main>
  );
}
