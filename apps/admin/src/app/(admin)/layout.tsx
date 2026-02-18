/**
 * Description : layout.tsx - ?? home ???? UI ????
 * Author : Shiwoo Min
 * Date : 2026-01-29
 */
import AppShell from '@/components/AppShell';
import AuthInitializer from '@/components/AuthInitializer';

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // 인증 가드는 middleware.ts에서 처리 (httpOnly Cookie 기반)
  // AuthInitializer: 새로고침 시 Zustand 스토어 복원
  return (
    <>
      <AuthInitializer />
      <AppShell>{children}</AppShell>
    </>
  );
}
