/**
 * Description : (admin)/layout.tsx - 📌 아가페 요양원 관리자 Layout
 * Author : Shiwoo Min
 * Date : 2026-01-29
 */
'use client';

import AppShell from '@/components/AppShell';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  // 관리자 인증 가드
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (isAuth !== '1') {
      router.replace('/login');
    }
  }, [router]);

  return <AppShell>{children}</AppShell>;
}
