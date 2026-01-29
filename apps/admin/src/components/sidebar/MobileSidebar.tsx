'use client';

import menuData from '@/data/menu.json';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SidebarFooter from './SidebarFooter';

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

interface MobileSidebarProps {
  readonly activeMenu: string;
  readonly isOpen: boolean;
  readonly onClose: () => void;
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
          isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700',
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
  toggleMenu,
  onMenuClick,
}: {
  item: MenuItem;
  activeMenu: string;
  openMenus: Record<string, boolean>;
  toggleMenu: (id: string) => void;
  onMenuClick: (id: string) => void;
}) => {
  const hasChildren = !!item.children?.length;
  const isOpen = openMenus[item.id] ?? false;
  const isActive = activeMenu === item.id || (hasChildren && item.children!.some(c => c.id === activeMenu));

  return (
    <div>
      <button
        type="button"
        onClick={() => (hasChildren ? toggleMenu(item.id) : onMenuClick(item.id))}
        className={clsx(
          'flex w-full items-center justify-between px-4 py-3',
          isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700',
        )}
      >
        <div className="flex items-center gap-3">
          <i className={clsx(item.icon, 'text-xl')} />
          <span className="font-medium">{item.name}</span>
        </div>
        {hasChildren && <i className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line`} />}
      </button>

      {hasChildren && isOpen && (
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

/* Mobile Sidebar */
export default function MobileSidebar({ activeMenu, isOpen, onClose, onMenuClick }: MobileSidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  /* 모바일 판별 */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* activeMenu 기준 자동 열기 */
  useEffect(() => {
    const updated: Record<string, boolean> = {};
    (menuData.menus as MenuItem[]).forEach(item => {
      if (item.children?.some(c => c.id === activeMenu)) {
        updated[item.id] = true;
      }
      item.children?.forEach(c => {
        if (c.parentGroup && c.id === activeMenu) {
          updated[item.id] = true;
          updated[c.parentGroup] = true;
        }
      });
    });
    setOpenMenus(prev => ({ ...prev, ...updated }));
  }, [activeMenu]);

  const toggleMenu = (id: string) => setOpenMenus(prev => ({ ...prev, [id]: !(prev[id] ?? false) }));

  const user = {
    name: '김시설장',
    role: '시설장',
    roleLevel: '관리자 권한',
    lastLogin: '오후 01:48',
    avatar: '/images/admin-avatar.png',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default border-none bg-black/40 outline-none"
            onClick={onClose}
            aria-label="Close sidebar"
          />

          {/* sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 left-0 flex w-[80vw] max-w-[360px] flex-col bg-white shadow-xl"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 md:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
                  <i className="ri-hospital-line text-xl text-white"></i>
                </div>
                <span className="text-lg font-bold text-gray-900">아가페 요양원</span>
              </div>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                aria-label="메뉴 닫기"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* 메뉴 */}
            <nav className="flex-1 overflow-y-auto py-2">
              {isMobile && (
                <div className="mb-2 px-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      location.href = '/mobile/attendance';
                    }}
                    className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-4 text-white shadow-md"
                  >
                    <i className="ri-time-line text-2xl" />
                    <div className="flex-1 text-left">
                      <div className="text-base font-bold">출퇴근처리</div>
                      <div className="text-xs opacity-90">출근 / 퇴근 기록</div>
                    </div>
                  </button>
                </div>
              )}

              {menuData.menus.map(item => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  activeMenu={activeMenu}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                  onMenuClick={id => {
                    onMenuClick(id);
                    onClose();
                  }}
                />
              ))}
            </nav>

            <SidebarFooter user={user} onMenuClick={onMenuClick} onClose={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
