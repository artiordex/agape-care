'use client';

import menuData from '@/data/menu.json';
import clsx from 'clsx';
import { useEffect, useLayoutEffect, useState } from 'react';

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

interface AdminSidebarProps {
  activeMenu: string;
  onMenuClick: (menuId: string) => void;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface SidebarGroupProps {
  group: SubMenuItem;
  parentChildren: SubMenuItem[];
  openMenus: { [key: string]: boolean };
  activeMenu: string;
  toggleMenu: (id: string) => void;
  onMenuClick: (id: string) => void;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ group, parentChildren, openMenus, activeMenu, toggleMenu, onMenuClick }) => {
  const groupId = group.id;
  const isGroupOpen = openMenus[groupId];
  const groupChildren = parentChildren.filter(c => c.parentGroup === groupId);
  const isGroupActive = groupChildren.some(gc => gc.id === activeMenu);

  return (
    <div key={group.id}>
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          toggleMenu(groupId);
        }}
        className={clsx(
          'flex w-full cursor-pointer items-center justify-between px-4 py-2.5 pl-12 text-left text-sm font-semibold transition-colors',
          isGroupActive ? 'bg-emerald-50/50 text-emerald-600' : 'text-gray-700 hover:bg-gray-100',
        )}
      >
        <span className="flex items-center gap-2">
          <i className={`ri-folder-${isGroupOpen ? 'open-' : ''}line text-base`}></i>
          {group.name}
        </span>
        <i className={`ri-arrow-${isGroupOpen ? 'down' : 'right'}-s-line text-xs transition-transform duration-200`}></i>
      </button>
      {isGroupOpen && (
        <div className="ml-12 border-l-2 border-emerald-200 bg-white">
          {groupChildren.map(groupChild => (
            <button
              key={groupChild.id}
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onMenuClick(groupChild.id);
              }}
              className={clsx(
                'w-full cursor-pointer px-4 py-2.5 pl-6 text-left text-sm transition-all duration-200',
                activeMenu === groupChild.id
                  ? 'border-l-4 border-emerald-600 bg-emerald-50 font-semibold text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600',
              )}
            >
              {groupChild.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarItemProps {
  item: MenuItem;
  activeMenu: string;
  openMenus: { [key: string]: boolean };
  collapsed: boolean;
  toggleMenu: (id: string) => void;
  onMenuClick: (id: string) => void;
  handleMouseEnter: (e: React.MouseEvent, label: string) => void;
  handleMouseLeave: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  activeMenu,
  openMenus,
  collapsed,
  toggleMenu,
  onMenuClick,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openMenus[item.id];

  const isActive =
    activeMenu === item.id ||
    (hasChildren &&
      item.children!.some(child => {
        if (child.isGroup) {
          const groupChildren = item.children!.filter(c => c.parentGroup === child.id);
          return groupChildren.some(gc => gc.id === activeMenu);
        }
        return child.id === activeMenu;
      }));

  return (
    <div key={item.id} className="relative">
      {/* 메인 메뉴 */}
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (hasChildren) {
            toggleMenu(item.id);
          } else {
            onMenuClick(item.id);
          }
        }}
        onMouseEnter={e => handleMouseEnter(e, item.name)}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          'flex w-full cursor-pointer items-center transition-all duration-200',
          collapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-3',
          isActive ? 'border-r-4 border-emerald-600 bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50',
        )}
        aria-label={item.name}
      >
        <div className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
          <i className={clsx(item.icon, 'flex-shrink-0 text-xl', isActive && 'text-emerald-600')}></i>
          {!collapsed && <span className={clsx('font-medium transition-all duration-200', isActive && 'font-semibold')}>{item.name}</span>}
        </div>

        {!collapsed && hasChildren && (
          <i className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line text-gray-400 transition-transform duration-200`}></i>
        )}
      </button>

      {/* 서브메뉴 */}
      {hasChildren && isOpen && !collapsed && (
        <div className="bg-gray-50">
          {item.children!.map(child => {
            // 그룹 메뉴
            if (child.isGroup) {
              return (
                <SidebarGroup
                  key={child.id}
                  group={child}
                  parentChildren={item.children!}
                  openMenus={openMenus}
                  activeMenu={activeMenu}
                  toggleMenu={toggleMenu}
                  onMenuClick={onMenuClick}
                />
              );
            }

            // 일반 서브메뉴
            if (!child.parentGroup) {
              return (
                <button
                  key={child.id}
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onMenuClick(child.id);
                  }}
                  className={clsx(
                    'w-full cursor-pointer px-4 py-2.5 pl-12 text-left text-sm transition-colors',
                    activeMenu === child.id ? 'bg-emerald-50 font-medium text-emerald-600' : 'text-gray-600 hover:bg-gray-100',
                  )}
                >
                  {child.name}
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  onMenuClick,
  activeMenu,
  isMobileMenuOpen = false,
  onCloseMobileMenu,
  collapsed,
  onToggleCollapse,
}) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isClient, setIsClient] = useState(false);

  // 툴팁 상태
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // 로그인 사용자 정보
  const [userInfo] = useState({
    name: '김시설장',
    role: '시설장',
    roleLevel: '관리자 권한',
    lastLogin: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    avatar: '/images/admin-avatar.png',
  });

  // 클라이언트 마운트 후 localStorage에서 복원 (collapsed 제외)
  useEffect(() => {
    setIsClient(true);
    const savedOpenMenus = localStorage.getItem('sidebar-open-menus');
    if (savedOpenMenus) {
      setOpenMenus(JSON.parse(savedOpenMenus));
    }
  }, []);

  // localStorage에 열림 상태 저장
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('sidebar-open-menus', JSON.stringify(openMenus));
    }
  }, [openMenus, isClient]);

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일 아닐 때만 collapsed 상태 적용
  const effectiveCollapsed = isMobile ? false : collapsed;

  // activeMenu 기반으로 상위 메뉴/그룹 자동 열기
  useLayoutEffect(() => {
    if (!activeMenu) return;

    const calculateOpenMenus = (currentOpenMenus: { [key: string]: boolean }) => {
      const updated = { ...currentOpenMenus };

      menuData.menus.forEach((item: any) => {
        if (!item.children || item.children.length === 0) return;

        // 일반 서브메뉴 처리
        if (item.children.some((c: any) => c.id === activeMenu)) {
          updated[item.id] = true;
        }

        // 그룹 서브메뉴 처리
        const hasActiveGroupChild = item.children.some((child: any) => {
          if (!child.isGroup) return false;
          const groupChildren = item.children!.filter((gc: any) => gc.parentGroup === child.id);
          return groupChildren.some((gc: any) => gc.id === activeMenu);
        });

        if (hasActiveGroupChild) {
          item.children.forEach((child: any) => {
            if (child.isGroup) {
              const groupChildren = item.children!.filter((gc: any) => gc.parentGroup === child.id);
              if (groupChildren.some((gc: any) => gc.id === activeMenu)) {
                updated[item.id] = true;
                updated[child.id] = true;
              }
            }
          });
        }
      });
      return updated;
    };

    setOpenMenus(prev => calculateOpenMenus(prev));
  }, [activeMenu]);

  // 축소/확장 토글
  const toggleSidebar = () => {
    onToggleCollapse();
  };

  // 메뉴 토글
  const toggleMenu = (menuId: string) => {
    if (effectiveCollapsed) return;
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // 툴팁 표시
  const handleMouseEnter = (e: React.MouseEvent, label: string) => {
    if (!effectiveCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <>
      {/* 사이드바 컨테이너 */}
      <aside
        className={clsx(
          'flex h-screen flex-col overflow-hidden border-r border-gray-200 bg-white transition-all duration-300 ease-in-out',
          'fixed bottom-0 left-0 top-0 z-50 w-[80vw] max-w-[360px]',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          'md:relative md:flex-shrink-0 md:translate-x-0',
          effectiveCollapsed ? 'md:w-[70px]' : 'md:w-[260px]',
        )}
        role="dialog"
        aria-modal={isMobileMenuOpen ? 'true' : undefined}
        aria-label="사이드바 메뉴"
      >
        {/* 모바일 전용 닫기 버튼 */}
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
              onCloseMobileMenu?.();
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            aria-label="메뉴 닫기"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 데스크톱 전용 햄버거 버튼 */}
        <div
          className={clsx('hidden h-16 items-center border-b border-gray-200 md:flex', effectiveCollapsed ? 'justify-center px-0' : 'px-4')}
        >
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleSidebar();
            }}
            onMouseEnter={e => handleMouseEnter(e, effectiveCollapsed ? '사이드바 확장' : '사이드바 축소')}
            onMouseLeave={handleMouseLeave}
            aria-label={effectiveCollapsed ? '사이드바 확장' : '사이드바 축소'}
            className={clsx(
              'flex cursor-pointer items-center transition-opacity hover:opacity-80',
              effectiveCollapsed ? 'justify-center' : 'gap-3',
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
              <i className="ri-hospital-line text-xl text-white"></i>
            </div>
            {!effectiveCollapsed && <span className="text-lg font-bold text-gray-900">아가페 요양원</span>}
          </button>
        </div>

        {/* 메뉴 영역 */}
        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <nav className="flex-1 overflow-y-auto py-2">
            {/* 모바일 전용: 출퇴근처리 메뉴 */}
            {isMobile && (
              <div className="mb-2 px-2">
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = '/mobile/attendance';
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-4 text-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
                    <i className="ri-time-line text-2xl"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-base font-bold">출퇴근처리</div>
                    <div className="text-xs opacity-90">출근/퇴근 기록</div>
                  </div>
                  <i className="ri-arrow-right-s-line text-xl"></i>
                </button>
              </div>
            )}

            {menuData.menus.map((item: any) => (
              <SidebarItem
                key={item.id}
                item={item as MenuItem}
                activeMenu={activeMenu}
                openMenus={openMenus}
                collapsed={effectiveCollapsed}
                toggleMenu={toggleMenu}
                onMenuClick={onMenuClick}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            ))}
          </nav>

          {/* 홈페이지 바로가기 */}
          <div className="flex-shrink-0 border-t border-gray-200">
            <div className={clsx('bg-white', effectiveCollapsed ? 'p-0' : 'p-2')}>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('/', '_blank');
                }}
                onMouseEnter={e => handleMouseEnter(e, '홈페이지 바로가기')}
                onMouseLeave={handleMouseLeave}
                className={clsx(
                  'flex w-full cursor-pointer items-center rounded-lg text-gray-700 transition-all duration-200 hover:bg-gray-50',
                  effectiveCollapsed ? 'justify-center px-0 py-3' : 'justify-start gap-3 px-4 py-3',
                )}
                aria-label="홈페이지 바로가기"
              >
                <i className="ri-home-line flex-shrink-0 text-xl"></i>
                {!effectiveCollapsed && <span className="font-medium">홈페이지 바로가기</span>}
              </button>
            </div>
          </div>
        </div>

        {/* 하단: 로그인 정보 */}
        <div className={clsx('border-t border-gray-200 py-4', effectiveCollapsed ? 'px-0' : 'px-4')}>
          <div
            className={clsx('group relative flex cursor-pointer items-center', effectiveCollapsed ? 'justify-center' : 'gap-3')}
            onMouseEnter={e => {
              if (effectiveCollapsed) {
                handleMouseEnter(e, `${userInfo.name}\n${userInfo.role}\n${userInfo.roleLevel}\n마지막 로그인 ${userInfo.lastLogin}`);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-md">
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="h-full w-full object-cover"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = '<i class="ri-user-line text-xl text-white"></i>';
                  }
                }}
              />
            </div>

            {!effectiveCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-gray-900">{userInfo.name}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>{userInfo.role}</span>
                  <span>•</span>
                  <span className="text-emerald-600">{userInfo.roleLevel}</span>
                </div>
                <div className="mt-0.5 text-xs text-gray-400">마지막 로그인 {userInfo.lastLogin}</div>
              </div>
            )}
          </div>

          {!effectiveCollapsed && (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onMenuClick('mypage');
                }}
                className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                내 정보
              </button>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onMenuClick('logout');
                }}
                className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 툴팁 */}
      {effectiveCollapsed && hoveredMenu && (
        <div
          className="pointer-events-none fixed z-[9999] whitespace-pre-line rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-xl"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translateY(-50%)',
            animation: 'tooltipFadeIn 0.15s ease-out forwards',
          }}
        >
          {hoveredMenu}
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 transform bg-gray-900"></div>
        </div>
      )}

      {/* 스타일 */}
      <style>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        nav::-webkit-scrollbar {
          width: 6px;
        }

        nav::-webkit-scrollbar-track {
          background: transparent;
        }

        nav::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        nav::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
