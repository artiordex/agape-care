/**
 * Description : layout.tsx - 📌 알림마당 레이아웃
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import NoticeSidebar from '@/components/NoticeSidebar';
import 'remixicon/fonts/remixicon.css';

export default function NoticeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mx-auto max-w-[90%] py-10">
      <div className="flex flex-col gap-8 py-10 lg:flex-row">
        <NoticeSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
