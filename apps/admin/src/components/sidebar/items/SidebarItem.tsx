'use client';

import clsx from 'clsx';
import SidebarGroup from './SidebarGroup';

interface MenuItem {
  id: string;
  name: string;
  icon: string;
  children?: any[];
}

interface SidebarItemProps {
  item: MenuItem;
  activeMenu: string;
  open: boolean;
  collapsed: boolean;
  onToggle: (id: string) => void;
  onMenuClick: (id: string) => void;
  onHover?: (label: string, e: React.MouseEvent) => void;
  onLeave?: () => void;
}

export default function SidebarItem({ item, activeMenu, open, collapsed, onToggle, onMenuClick, onHover, onLeave }: SidebarItemProps) {
  const hasChildren = !!item.children?.length;

  const isActive = activeMenu === item.id || item.children?.some((c: any) => c.id === activeMenu);

  return (
    <div>
      <button
        type="button"
        onClick={() => (hasChildren ? onToggle(item.id) : onMenuClick(item.id))}
        onMouseEnter={e => onHover?.(item.name, e)}
        onMouseLeave={onLeave}
        className={clsx(
          'flex w-full items-center transition',
          collapsed ? 'justify-center py-3' : 'justify-between px-4 py-3',
          isActive ? 'border-r-4 border-emerald-600 bg-emerald-50 text-emerald-600' : 'hover:bg-gray-50',
        )}
      >
        <div className={clsx('flex items-center', collapsed ? '' : 'gap-3')}>
          <i className={clsx(item.icon, 'text-xl')} />
          {!collapsed && <span>{item.name}</span>}
        </div>
        {!collapsed && hasChildren && <i className={`ri-arrow-${open ? 'down' : 'right'}-s-line`} />}
      </button>

      {hasChildren && open && !collapsed && (
        <div className="bg-gray-50">
          {item.children!.map(child =>
            child.isGroup ? (
              <SidebarGroup
                key={child.id}
                group={child}
                parentChildren={item.children!}
                open={open}
                activeMenu={activeMenu}
                onToggle={onToggle}
                onMenuClick={onMenuClick}
              />
            ) : (
              <button
                key={child.id}
                onClick={() => onMenuClick(child.id)}
                className={clsx(
                  'block w-full px-4 py-2.5 pl-12 text-left text-sm',
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
}
