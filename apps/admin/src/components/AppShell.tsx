'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import AdminHeader from '@/components/Header';
import MobileSidebar from '@/components/sidebar/MobileSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
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
  const [isMobile, setIsMobile] = useState(false);

  const allMenuItems = useMemo(() => flattenMenuItems(menuData.menus), []);

  /* client mount */
  useEffect(() => {
    setIsClient(true);

    const saved = localStorage.getItem('active-menu');
    if (saved) setActiveMenu(saved);

    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedCollapsed) setCollapsed(savedCollapsed === 'true');
  }, []);

  /* mobile detect */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* pathname → activeMenu */
  const currentActiveId = useMemo(() => {
    const item = allMenuItems.find(i => i.path === pathname);
    return item ? item.id : null;
  }, [pathname, allMenuItems]);

  useEffect(() => {
    if (!isClient || !currentActiveId) return;
    setActiveMenu(currentActiveId);
    localStorage.setItem('active-menu', currentActiveId);
  }, [currentActiveId, isClient]);

  /* persist collapsed */
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('sidebar-collapsed', String(collapsed));
    }
  }, [collapsed, isClient]);

  /* mobile body lock */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  /* ESC close */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isMobileMenuOpen]);

  /* menu handler */
  const handleMenuClick = (menuId: string) => {
    if (menuId === 'logout') return handleLogout();

    if (menuId === 'mypage') {
      setActiveMenu(menuId);
      localStorage.setItem('active-menu', menuId);
      router.push('/mypage');
      setIsMobileMenuOpen(false);
      return;
    }

    const menuItem = allMenuItems.find(item => item.id === menuId);
    if (!menuItem?.path) return;

    setActiveMenu(menuId);
    localStorage.setItem('active-menu', menuId);
    router.push(menuItem.path);
    setIsMobileMenuOpen(false);
  };

  /* handlers */
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

  /* render */
  return (
    <>
      {/* Mobile Sidebar (레이아웃 밖) */}
      {isMobile && (
        <MobileSidebar activeMenu={activeMenu} onMenuClick={handleMenuClick} isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={handleCloseMobileMenu} aria-hidden="true" />
      )}

      {/* Desktop Grid Style */}
      <style jsx>{`
        @media (min-width: 768px) {
          .app-shell-grid {
            display: grid;
            grid-template-columns: ${collapsed ? '70px 1fr' : '260px 1fr'};
          }
        }
      `}</style>

      {/* App Layout */}
      <div className="app-shell-grid flex h-screen flex-col bg-gray-50">
        {/* Desktop Sidebar ONLY */}
        <aside className="hidden md:row-span-2 md:block">
          <Sidebar activeMenu={activeMenu} onMenuClick={handleMenuClick} collapsed={collapsed} onToggleCollapse={handleToggleCollapse} />
        </aside>

        {/* Header */}
        <header className="z-10 h-16 flex-shrink-0 border-b bg-white">
          <AdminHeader onLogout={handleLogout} onToggleSidebar={handleToggleSidebar} />
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </>
  );
}
