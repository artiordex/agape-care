/**
 * Description : (admin)/layout.tsx - 📌 아가페 요양원 관리자 Main Layout
 * Author : Shiwoo Min
 * Date : 2026-01-29
 */
export const dynamic = 'force-dynamic';
import QueryProvider from '@/providers/query-provider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agape Care 요양원 관리자 대시보드',
  description: 'Agape Care 요양원 관리자 대시보드',
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* Remix Icon CDN */}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
