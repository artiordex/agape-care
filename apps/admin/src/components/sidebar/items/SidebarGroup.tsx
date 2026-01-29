'use client';

import clsx from 'clsx';

interface SubMenuItem {
  id: string;
  name: string;
  parentGroup?: string;
}

interface SidebarGroupProps {
  group: SubMenuItem;
  parentChildren: SubMenuItem[];
  open: boolean;
  activeMenu: string;
  onToggle: (id: string) => void;
  onMenuClick: (id: string) => void;
}

export default function SidebarGroup({ group, parentChildren, open, activeMenu, onToggle, onMenuClick }: SidebarGroupProps) {
  const children = parentChildren.filter(c => c.parentGroup === group.id);
  const isActive = children.some(c => c.id === activeMenu);

  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(group.id)}
        className={clsx(
          'flex w-full items-center justify-between px-4 py-2.5 pl-12 text-sm font-semibold',
          isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-100',
        )}
      >
        <span className="flex items-center gap-2">
          <i className={`ri-folder-${open ? 'open-' : ''}line`} />
          {group.name}
        </span>
        <i className={`ri-arrow-${open ? 'down' : 'right'}-s-line`} />
      </button>

      {open && (
        <div className="ml-12 border-l-2 border-emerald-200">
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => onMenuClick(child.id)}
              className={clsx(
                'block w-full px-4 py-2.5 pl-6 text-left text-sm',
                activeMenu === child.id
                  ? 'border-l-4 border-emerald-600 bg-emerald-50 font-semibold text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              {child.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
