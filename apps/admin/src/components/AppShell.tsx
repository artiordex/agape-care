'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import AdminHeader from '@/components/Header';
import AdminSidebar from '@/components/Sidebar';
import menuData from '@/data/menu.json';

interface AppShellProps {
  children: React.ReactNode;
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
  const [isClient, setIsClient] = useState(false);

  const allMenuItems = useMemo(() => flattenMenuItems(menuData.menus), []);

  // localStorage 우선 복원
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('active-menu');
    if (saved) setActiveMenu(saved);
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
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
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
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('active-menu');
    localStorage.removeItem('sidebar-collapsed');
    localStorage.removeItem('sidebar-open-menus');
    router.push('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={handleCloseMobileMenu}
      />

      {isMobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={handleCloseMobileMenu} aria-hidden="true" />}

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onLogout={handleLogout} onToggleSidebar={handleToggleSidebar} />

        <main className="flex-1 overflow-y-auto pt-16">
          <div className="h-full p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
