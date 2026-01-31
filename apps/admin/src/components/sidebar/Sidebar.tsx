'use client';

import menuData from '@/data/menu.json';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import SidebarFooter from './SidebarFooter';
import { useSidebarUser } from './useSidebarUser';

/* 타입 정의: ERP 메뉴 구조 최적화 */
interface MenuItem {
  id: string;
  name: string;
  icon: string;
  path?: string;
  children?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  name: string;
  path: string;
  isGroup?: boolean;
  parentGroup?: string;
}

interface SidebarProps {
  readonly activeMenu: string;
  readonly collapsed: boolean;
  readonly onToggleCollapse: () => void;
  readonly onMenuClick: (menuId: string) => void;
}

/**
 * [Sidebar] 아가페케어 시스템 통합 내비게이션
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 고밀도 ERP 인터페이스 적용
 */
export default function AdminSidebar({ activeMenu, collapsed, onToggleCollapse, onMenuClick }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { user } = useSidebarUser();

  /* 툴팁 상태 관리 (축소 모드 전용) */
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  /* 현재 경로 기준 메뉴 아코디언 자동 확장 */
  useEffect(() => {
    const updated: Record<string, boolean> = {};
    (menuData.menus as MenuItem[]).forEach(item => {
      if (item.children?.some(c => c.id === activeMenu)) {
        updated[item.id] = true;
      }
    });
    setOpenMenus(prev => ({ ...prev, ...updated }));
  }, [activeMenu]);

  const toggleMenu = (id: string) => setOpenMenus(prev => ({ ...prev, [id]: !(prev[id] ?? false) }));

  /* 마우스 호버 시 툴팁 위치 계산 */
  const handleMouseEnter = (e: React.MouseEvent, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => setHoveredMenu(null);

  return (
    <>
      <aside
        className={clsx(
          'hidden h-screen flex-col border-r border-gray-300 bg-white font-sans antialiased transition-all md:flex',
          collapsed ? 'w-[70px]' : 'w-[260px]',
        )}
      >
        {/* 1. 상단 로고 영역: 아가페 그린 테마 적용 */}
        <div className={clsx('flex h-16 items-center border-b border-gray-200', collapsed ? 'justify-center' : 'px-4')}>
          <button
            type="button"
            onClick={onToggleCollapse}
            onMouseEnter={e => collapsed && handleMouseEnter(e, '메뉴 펼치기')}
            onMouseLeave={handleMouseLeave}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            {/* 메인 로고 아이콘 (#5C8D5A) */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5C8D5A] text-white shadow-md shadow-emerald-100">
              <i className="ri-heart-3-line text-xl" />
            </div>
            {!collapsed && (
              <div className="text-left">
                <span className="block text-[14px] font-black uppercase leading-none tracking-tighter text-gray-900">아가페케어</span>
                <span className="mt-1 block text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">Admin Console</span>
              </div>
            )}
          </button>
        </div>

        {/* 2. 메인 내비게이션 리스트 */}
        <nav className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden py-4">
          {menuData.menus.map((item: any) => {
            const hasChildren = !!item.children?.length;
            const isOpen = openMenus[item.id] ?? false;
            const isActive = activeMenu === item.id || (hasChildren && item.children!.some((c: any) => c.id === activeMenu));

            return (
              <div key={item.id} className="mb-0.5">
                {/* 상위 메뉴 버튼 */}
                <button
                  type="button"
                  onClick={() => (hasChildren ? toggleMenu(item.id) : onMenuClick(item.id))}
                  onMouseEnter={e => collapsed && handleMouseEnter(e, item.name)}
                  onMouseLeave={handleMouseLeave}
                  className={clsx(
                    'flex w-full items-center transition-all',
                    collapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-2.5',
                    isActive ? 'bg-emerald-50/50 text-[#5C8D5A]' : 'text-gray-600 hover:bg-gray-50',
                  )}
                >
                  <div className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
                    <i className={clsx(item.icon, 'text-xl', isActive ? 'text-[#5C8D5A]' : 'text-gray-400')} />
                    {!collapsed && (
                      <span className={clsx('text-[13px] tracking-tight', isActive ? 'font-black' : 'font-bold')}>{item.name}</span>
                    )}
                  </div>
                  {!collapsed && hasChildren && (
                    <i
                      className={clsx(
                        `ri-arrow-${isOpen ? 'down' : 'right'}-s-line text-gray-300 transition-transform duration-200`,
                        isOpen && 'text-[#5C8D5A]',
                      )}
                    />
                  )}
                </button>

                {/* 서브메뉴 아코디언 (그린 가이드라인 적용) */}
                {!collapsed && hasChildren && isOpen && (
                  <div className="animate-in slide-in-from-top-1 mb-2 ml-6 border-l-2 border-emerald-100 bg-gray-50/30 duration-200">
                    {item.children!.map((child: any) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onMenuClick(child.id)}
                        className={clsx(
                          'block w-full py-2.5 pl-6 pr-4 text-left text-[12px] transition-colors',
                          activeMenu === child.id
                            ? 'bg-emerald-50/30 font-black text-[#5C8D5A]'
                            : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900',
                        )}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 3. 사이드바 푸터 (사용자 정보 카드 연동) */}
        <SidebarFooter
          user={user}
          collapsed={collapsed}
          onMenuClick={onMenuClick}
          enableTooltip={true}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
        />
      </aside>

      {/* 축소 모드 전용 유동 툴팁 */}
      {collapsed && hoveredMenu && (
        <div
          className="pointer-events-none fixed z-[9999] whitespace-pre rounded border border-gray-700 bg-gray-900 px-3 py-2 text-[11px] font-black text-white shadow-2xl"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: 'translateY(-50%)',
          }}
        >
          {hoveredMenu}
          {/* 툴팁 화살표 */}
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 border-b border-l border-gray-700 bg-gray-900" />
        </div>
      )}
    </>
  );
}
