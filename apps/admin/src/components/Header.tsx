'use client';

import menuData from '@/data/menu.json';
import { usePathname } from 'next/navigation';

interface AdminHeaderProps {
  readonly onLogout: () => void;
  readonly onToggleSidebar: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  path?: string;
  children?: MenuItem[];
}

/** menu.json 전체를 평탄화 */
function flattenMenus(menus: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];

  const walk = (items: MenuItem[]) => {
    items.forEach(item => {
      result.push(item);
      if (item.children) {
        walk(item.children);
      }
    });
  };

  walk(menus);
  return result;
}

export default function AdminHeader({ onLogout, onToggleSidebar }: AdminHeaderProps) {
  const pathname = usePathname();

  const flatMenus = flattenMenus(menuData.menus);

  const currentMenu = flatMenus.find(m => m.path === pathname);

  const title = currentMenu?.name ?? '';

  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* 좌측 */}
        <div className="flex items-center gap-4">
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <i className="ri-menu-line text-2xl" />
          </button>

          {/* 페이지 타이틀 */}
          {title && <h1 className="text-xl font-semibold leading-snug text-gray-900">{title}</h1>}
        </div>

        {/* 우측 */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg bg-green-50 px-4 py-2 sm:flex">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-700">관리자 모드</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <i className="ri-logout-box-line" />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </div>
    </header>
  );
}
