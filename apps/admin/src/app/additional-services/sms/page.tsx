'use client';

import { useEffect, useState } from 'react';

interface PageProps {
  title?: string;
  description?: string;
}

export default function Page({ title = '페이지 제목', description = '페이지 설명' }: PageProps) {
  const [loading, setLoading] = useState(true);

  // 간단한 로딩 시뮬레이션 (API 연동 대비)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="p-10 text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="animate-fadeIn space-y-6">
      {/* 페이지 헤더 */}
      <header>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="mt-1 text-gray-500">{description}</p>
      </header>

      {/* 콘텐츠 영역 */}
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="text-gray-700">이 영역에 본문 콘텐츠를 작성하세요.</p>
      </section>
    </div>
  );
}
