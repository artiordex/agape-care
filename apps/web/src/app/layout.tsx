/**
 * Description : layout.tsx - 📌 Agape-Care 메인 레이아웃
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import type { Metadata, Viewport } from 'next';
import AppShell from '@/components/AppShell';
import QueryProvider from '@/providers/query-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Agape Care 요양원',
  description: '따뜻한 케어, 안전한 요양 서비스',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
