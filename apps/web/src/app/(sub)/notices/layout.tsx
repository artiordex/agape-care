'use client';

import NoticeSidebar from '@/components/NoticeSidebar';

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 pt-20">
      <div className="flex flex-col gap-8 lg:flex-row">
        <NoticeSidebar />

        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
