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

/** 메뉴 데이터를 평탄화하여 현재 페이지 명칭 추출 */
function flattenMenus(menus: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  const walk = (items: MenuItem[]) => {
    items.forEach(item => {
      result.push(item);
      if (item.children) walk(item.children);
    });
  };
  walk(menus);
  return result;
}

/**
 * [Main Header] 아가페케어 통합 관리 시스템 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 관제 인터페이스 적용
 */
export default function AdminHeader({ onLogout, onToggleSidebar }: AdminHeaderProps) {
  const pathname = usePathname();
  const flatMenus = flattenMenus(menuData.menus as MenuItem[]);
  const currentMenu = flatMenus.find(m => m.path === pathname);

  // 현재 페이지 타이틀 (기본값: 시스템 개요)
  const title = currentMenu?.name ?? '통합 관제 대시보드';

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-gray-300 bg-white font-sans antialiased shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* 1. 좌측 : 시스템 메뉴 및 현재 위치 */}
        <div className="flex items-center gap-5">
          {/* 모바일 사이드바 토글 버튼 (Agape-Standard) */}
          <button
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-500 transition-all hover:bg-gray-50 hover:text-[#5C8D5A] md:hidden"
            aria-label="메뉴 토글"
          >
            <i className="ri-menu-2-line text-xl" />
          </button>

          {/* 현재 페이지 섹션 인디케이터 */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-1.5 rounded-full bg-[#5C8D5A] shadow-sm shadow-emerald-100"></div>
            <div>
              <h1 className="text-[16px] font-black uppercase leading-none tracking-tight text-gray-900">{title}</h1>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-400">Agape-Care Administration System</p>
            </div>
          </div>
        </div>

        {/* 2. 우측 : 실시간 보안 상태 및 세션 제어 */}
        <div className="flex items-center gap-6">
          {/* 시스템 보안 및 권한 상태 (ERP 관제 스타일) */}
          <div className="hidden items-center gap-2 border-r border-gray-200 pr-6 sm:flex">
            {/* 보안 상태 배지 */}
            <div className="flex items-center gap-2 rounded-sm border border-emerald-100 bg-emerald-50 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-tight text-emerald-700">SSL 보안 연결</span>
            </div>

            {/* 권한 상태 배지 */}
            <div className="flex items-center gap-2 rounded-sm border border-emerald-100 bg-white px-3 py-1.5 shadow-sm">
              <i className="ri-shield-check-fill text-[13px] text-[#5C8D5A]"></i>
              <span className="text-[10px] font-black uppercase tracking-tight text-[#5C8D5A]">최고 관리자 권한</span>
            </div>
          </div>

          {/* 세션 관리: 로그아웃 액션 */}
          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="group flex items-center gap-2 text-[11px] font-black text-gray-400 transition-all hover:text-red-500"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 shadow-sm transition-all group-hover:border-red-100 group-hover:bg-red-50">
                <i className="ri-logout-box-r-line text-lg" />
              </div>
              <span className="hidden tracking-tighter sm:inline">세션 종료 (Logout)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
