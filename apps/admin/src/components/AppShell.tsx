'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import AdminHeader from '@/components/Header';
import AdminSidebar from '@/components/Sidebar';
import menuData from '@/data/menu.json';

interface AppShellProps {
  readonly children: React.ReactNode;
}

const flattenMenuItems = (menus: any[]): any[] => {
  const items: any[] = [];
  menus.forEach(menu => {
    items.push(menu);
    if (menu.children) {
      items.push(...menu.children);
    }
  });
  return items;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const allMenuItems = useMemo(() => flattenMenuItems(menuData.menus), []);

  // localStorage 우선 복원
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('active-menu');
    if (saved) setActiveMenu(saved);

    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);

  // pathname 기반 activeMenu 계산 (렌더 전)
  const currentActiveId = useMemo(() => {
    const item = allMenuItems.find(i => i.path === pathname);
    return item ? item.id : null;
  }, [pathname, allMenuItems]);

  // 계산된 activeMenu 적용 (렌더 후 즉시)
  useEffect(() => {
    if (!isClient) return;
    if (currentActiveId) {
      setActiveMenu(currentActiveId);
      localStorage.setItem('active-menu', currentActiveId);
    }
  }, [currentActiveId, isClient]);

  // localStorage 저장 (collapsed)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('sidebar-collapsed', String(collapsed));
    }
  }, [collapsed, isClient]);

  // 모바일 메뉴 body lock
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ESC close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    globalThis.addEventListener('keydown', onEsc);
    return () => globalThis.removeEventListener('keydown', onEsc);
  }, [isMobileMenuOpen]);

  const handleMenuClick = (menuId: string) => {
    // 특수 케이스: 로그아웃
    if (menuId === 'logout') {
      return handleLogout();
    }

    // 특수 케이스: 내 정보
    if (menuId === 'mypage') {
      setActiveMenu(menuId);
      if (isClient) {
        localStorage.setItem('active-menu', menuId);
      }
      router.push('/mypage');
      setIsMobileMenuOpen(false);
      return;
    }

    // 일반 메뉴 처리
    const menuItem = allMenuItems.find(item => item.id === menuId);
    if (!menuItem) {
      console.warn(`Menu item not found: ${menuId}`);
      return;
    }

    if (menuItem.path) {
      setActiveMenu(menuId);
      if (isClient) {
        localStorage.setItem('active-menu', menuId);
      }
      router.push(menuItem.path);
      setIsMobileMenuOpen(false);
    }
  };

  const handleToggleSidebar = () => setIsMobileMenuOpen(prev => !prev);
  const handleToggleCollapse = () => setCollapsed(prev => !prev);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('active-menu');
    localStorage.removeItem('sidebar-collapsed');
    localStorage.removeItem('sidebar-open-menus');
    router.push('/login');
  };

  return (
    <div
      className="grid h-screen overflow-hidden bg-gray-50 transition-all duration-300 ease-in-out"
      style={{
        gridTemplateColumns: collapsed ? '70px 1fr' : '260px 1fr',
      }}
    >
      {/* Sidebar (좌측 전체 높이) */}
      <aside className="row-span-2 overflow-hidden">
        <AdminSidebar
          activeMenu={activeMenu}
          onMenuClick={handleMenuClick}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={handleCloseMobileMenu}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      </aside>

      {/* Header (우측 상단) */}
      <header className="z-10 h-16 flex-shrink-0 border-b bg-white">
        <AdminHeader onLogout={handleLogout} onToggleSidebar={handleToggleSidebar} />
      </header>

      {/* Main (우측 하단) */}
      <main className="overflow-y-auto">
        <div className="min-h-full p-4 lg:p-6">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={handleCloseMobileMenu} aria-hidden="true" />}
    </div>
  );
}
