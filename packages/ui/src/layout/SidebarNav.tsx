/**
 * Description : SidebarNav.tsx - 📌 ConnectWon UI 사이드바 내비게이션 React 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-19
 */
import type { ReactNode } from 'react';
import React from 'react';
import type { SidebarItem, SidebarNavProps } from '../ui-types.js';

const renderIcon = (icon?: ReactNode | string, collapsed?: boolean) => {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return <i className={`${icon} flex h-5 w-5 items-center justify-center ${collapsed ? 'mx-auto' : 'mr-3'}`} />;
  }
  return icon;
};

const isActive = (currentPath: string, href: string, exact?: boolean) => {
  return exact ? currentPath === href : currentPath.startsWith(href);
};

export default function SidebarNav({
  items,
  extraItems = [],
  isCollapsed = false,
  currentPath,
  className,
  topOffsetClass = 'top-20',
  heightClass = 'h-[calc(100vh-5rem)]',
  LinkComponent,
  onNavigate,
}: SidebarNavProps) {
  const ItemLink =
    LinkComponent ??
    (({ href, className, children }) => (
      <a
        href={href}
        className={className}
        onClick={e => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate(href);
          }
        }}
      >
        {children}
      </a>
    ));

  const Item = (item: SidebarItem) => {
    const active = isActive(currentPath, item.href, item.exact);
    return (
      <ItemLink
        href={item.href}
        className={`group relative flex cursor-pointer items-center rounded-lg px-3 py-3 transition-all duration-200 ${active ? 'border-r-2 border-blue-600 bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
        aria-current={active ? 'page' : undefined}
      >
        {renderIcon(item.icon, isCollapsed)}
        {!isCollapsed && <span className="whitespace-nowrap font-medium">{item.label}</span>}

        {/* 툴팁: 접힘 상태에서만 */}
        {isCollapsed && (
          <div className="pointer-events-none absolute left-16 z-50 ml-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {item.label}
            <div className="absolute left-0 top-1/2 h-0 w-0 -translate-x-1 -translate-y-1/2 border-b-2 border-r-4 border-t-2 border-b-transparent border-r-gray-800 border-t-transparent" />
          </div>
        )}
      </ItemLink>
    );
  };

  return (
    <aside
      className={`fixed left-0 ${topOffsetClass} ${heightClass} z-40 border-r border-gray-200 bg-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className ?? ''}`}
      aria-label="사이드바 내비게이션"
    >
      <div className="p-4">
        <nav className="space-y-2">
          {items.map(it => (
            <Item key={it.href} {...it} />
          ))}
        </nav>

        {/* 구분선 */}
        {extraItems.length > 0 && <div className="my-6 border-t border-gray-200" />}

        {/* 추가 메뉴 */}
        {extraItems.length > 0 && (
          <nav className="space-y-2">
            {extraItems.map(it => (
              <Item key={it.href} {...it} />
            ))}
          </nav>
        )}
      </div>

      {/* 하단 사용자 카드 슬롯 등 필요하면 추후 props로 추가 가능 */}
    </aside>
  );
}
