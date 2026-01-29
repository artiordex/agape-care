'use client';

import { useLayoutEffect, useState } from 'react';
import menuData from '@/data/menu.json';

export function useSidebarMenus(activeMenu: string) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useLayoutEffect(() => {
    if (!activeMenu) return;

    const next: Record<string, boolean> = {};

    menuData.menus.forEach((item: any) => {
      if (!item.children) return;

      // 일반 서브메뉴
      if (item.children.some((c: any) => c.id === activeMenu)) {
        next[item.id] = true;
      }

      // 그룹 서브메뉴
      item.children.forEach((child: any) => {
        if (!child.isGroup) return;

        const groupChildren = item.children.filter((gc: any) => gc.parentGroup === child.id);

        if (groupChildren.some((gc: any) => gc.id === activeMenu)) {
          next[item.id] = true;
          next[child.id] = true;
        }
      });
    });

    setOpenMenus(prev => ({ ...prev, ...next }));
  }, [activeMenu]);

  const toggleMenu = (id: string, disabled = false) => {
    if (disabled) return;
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return { openMenus, setOpenMenus, toggleMenu };
}
