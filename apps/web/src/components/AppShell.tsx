'use client';

import type { ReactNode } from 'react';

import FloatingSidebar from '@/components/FloatingSidebar';
import Footer from '@/components/Footer';
import Navbar from '@/components/navbar/Navbar';

export default function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* 상단 네비게이션 */}
      <Navbar />

      {/* 본문 영역 */}
      <main className="min-h-screen bg-white pt-20">{children}</main>

      {/* 우측 고정 사이드바 */}
      <FloatingSidebar />

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
}
