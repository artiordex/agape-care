/**
 * Description : useSidebarMenus.ts - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import menuData from '@/data/menu.json';
import { useEffect, useState } from 'react';

/** 메뉴 아이템 인터페이스 */
export interface MenuItem {
  id: string;
  name: string;
  icon: string;
  path?: string;
  children?: SubMenuItem[];
}

/** 서브 메뉴 아이템 인터페이스 */
export interface SubMenuItem {
  id: string;
  name: string;
  path: string;
  isGroup?: boolean;
  parentGroup?: string;
}

/**
 * [Hook] 사이드바 메뉴 아코디언 및 활성 상태 관리
 * @param activeMenu - 현재 활성화된 메뉴 ID
 */
export function useSidebarMenus(activeMenu: string) {
  // openMenus: 현재 펼쳐져 있는 대메뉴들의 상태
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  /**
   * [Side Effect] 현재 경로에 맞춰 부모 메뉴 자동 확장
   * activeMenu가 변경될 때마다 해당 메뉴를 포함하는 상위 메뉴를 찾아 열어줍니다.
   */
  useEffect(() => {
    const updated: Record<string, boolean> = {};
    (menuData.menus as MenuItem[]).forEach(item => {
      // 자식 메뉴 중에 현재 활성화된 메뉴가 있는지 확인
      if (item.children?.some(c => c.id === activeMenu)) {
        updated[item.id] = true;
      }
    });
    setOpenMenus(prev => ({ ...prev, ...updated }));
  }, [activeMenu]);

  // 대메뉴 아코디언 토글 핸들러
  const toggleMenu = (id: string) => setOpenMenus(prev => ({ ...prev, [id]: !(prev[id] ?? false) }));

  return {
    menus: menuData.menus as MenuItem[],
    openMenus,
    toggleMenu,
  };
}
