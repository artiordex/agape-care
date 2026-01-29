'use client';

import menuData from '@/data/menu.json';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import SidebarFooter from './SidebarFooter';
import { useSidebarUser } from './useSidebarUser';

/* Types */
interface MenuItem {
  id: string;
  name: string;
  icon: string;
  path?: string;
  children?: SubMenuItem[];
  isGroup?: boolean;
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

/* Group */
const SidebarGroup = ({
  group,
  parentChildren,
  openMenus,
  activeMenu,
  toggleMenu,
  onMenuClick,
}: {
  group: SubMenuItem;
  parentChildren: SubMenuItem[];
  openMenus: Record<string, boolean>;
  activeMenu: string;
  toggleMenu: (id: string) => void;
  onMenuClick: (id: string) => void;
}) => {
  const children = parentChildren.filter(c => c.parentGroup === group.id);
  const isOpen = openMenus[group.id];
  const isActive = children.some(c => c.id === activeMenu);

  return (
    <div>
      <button
        type="button"
        onClick={() => toggleMenu(group.id)}
        className={clsx(
          'flex w-full items-center justify-between px-4 py-2.5 pl-12 text-sm font-semibold',
          isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-100',
        )}
      >
        <span className="flex items-center gap-2">
          <i className="ri-folder-line" />
          {group.name}
        </span>
        <i className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line`} />
      </button>

      {isOpen && (
        <div className="ml-12 border-l">
          {children.map(child => (
            <button
              key={child.id}
              type="button"
              onClick={() => onMenuClick(child.id)}
              className={clsx(
                'block w-full px-4 py-2 pl-6 text-left text-sm',
                activeMenu === child.id ? 'bg-emerald-50 font-semibold text-emerald-600' : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              {child.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* Item */
const SidebarItem = ({
  item,
  activeMenu,
  openMenus,
  collapsed,
  toggleMenu,
  onMenuClick,
  onHover,
  onLeave,
}: {
  item: MenuItem;
  activeMenu: string;
  openMenus: Record<string, boolean>;
  collapsed: boolean;
  toggleMenu: (id: string) => void;
  onMenuClick: (id: string) => void;
  onHover: (e: React.MouseEvent, label: string) => void;
  onLeave: () => void;
}) => {
  const hasChildren = !!item.children?.length;
  const isOpen = openMenus[item.id] ?? false;
  const isActive = activeMenu === item.id || (hasChildren && item.children!.some(c => c.id === activeMenu));

  return (
    <div>
      <button
        type="button"
        onClick={() => (hasChildren ? toggleMenu(item.id) : onMenuClick(item.id))}
        onMouseEnter={e => collapsed && onHover(e, item.name)}
        onMouseLeave={onLeave}
        className={clsx(
          'flex w-full items-center transition-all',
          collapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-3',
          isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50',
        )}
      >
        <div className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
          <i className={clsx(item.icon, 'text-xl')} />
          {!collapsed && <span className="font-medium">{item.name}</span>}
        </div>

        {!collapsed && hasChildren && <i className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line`} />}
      </button>

      {hasChildren && isOpen && !collapsed && (
        <div className="bg-gray-50">
          {item.children!.map(child =>
            child.isGroup ? (
              <SidebarGroup
                key={child.id}
                group={child}
                parentChildren={item.children!}
                openMenus={openMenus}
                activeMenu={activeMenu}
                toggleMenu={toggleMenu}
                onMenuClick={onMenuClick}
              />
            ) : (
              <button
                key={child.id}
                type="button"
                onClick={() => onMenuClick(child.id)}
                className={clsx(
                  'block w-full px-4 py-2 pl-12 text-left text-sm',
                  activeMenu === child.id ? 'bg-emerald-50 font-medium text-emerald-600' : 'text-gray-600 hover:bg-gray-100',
                )}
              >
                {child.name}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

/* Sidebar */
export default function Sidebar({ activeMenu, collapsed, onToggleCollapse, onMenuClick }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { user } = useSidebarUser();

  /* 툴팁 상태 */
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updated: Record<string, boolean> = {};

    (menuData.menus as MenuItem[]).forEach(item => {
      if (item.children?.some(c => c.id === activeMenu)) {
        updated[item.id] = true;
      }
      item.children?.forEach(child => {
        if (child.parentGroup && child.id === activeMenu) {
          updated[item.id] = true;
          updated[child.parentGroup] = true;
        }
      });
    });

    setOpenMenus(prev => ({ ...prev, ...updated }));
  }, [activeMenu]);

  const toggleMenu = (id: string) => setOpenMenus(prev => ({ ...prev, [id]: !(prev[id] ?? false) }));

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
      <aside className={clsx('hidden h-screen flex-col border-r bg-white transition-all md:flex', collapsed ? 'w-[70px]' : 'w-[260px]')}>
        {/* 상단 */}
        <div className={clsx('flex h-16 items-center border-b', collapsed ? 'justify-center' : 'px-4')}>
          <button
            type="button"
            onClick={onToggleCollapse}
            onMouseEnter={e => handleMouseEnter(e, collapsed ? '사이드바 열기' : '사이드바 접기')}
            onMouseLeave={handleMouseLeave}
            className="flex items-center gap-3 hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <i className="ri-hospital-line text-xl" />
            </div>
            {!collapsed && <span className="text-lg font-bold">아가페 요양원</span>}
          </button>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuData.menus.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              activeMenu={activeMenu}
              openMenus={openMenus}
              collapsed={collapsed}
              toggleMenu={toggleMenu}
              onMenuClick={onMenuClick}
              onHover={handleMouseEnter}
              onLeave={handleMouseLeave}
            />
          ))}
        </nav>

        <SidebarFooter
          user={user}
          collapsed={collapsed}
          onMenuClick={onMenuClick}
          enableTooltip={true}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
        />
      </aside>

      {/* 툴팁 */}
      {collapsed && hoveredMenu && (
        <div
          className="pointer-events-none fixed z-[9999] whitespace-pre-line rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-xl"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: 'translateY(-50%)',
          }}
        >
          {hoveredMenu}
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 bg-gray-900" />
        </div>
      )}
    </>
  );
}
