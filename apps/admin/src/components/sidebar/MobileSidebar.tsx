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

/**
 * [Mobile Sidebar] 모바일 전용 통합 내비게이션 시스템
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 고밀도 인터페이스 적용
 */
export default function MobileSidebar({ activeMenu, isOpen, onClose, onMenuClick }: MobileSidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  /** 현재 활성화된 메뉴의 부모 아코디언을 자동으로 확장 */
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

  // 시스템 마스터 사용자 데이터
  const user = {
    name: '김시설장',
    role: '시설장',
    roleLevel: '마스터 권한',
    lastLogin: '오후 06:40',
    avatar: '/images/admin-avatar.png',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] font-sans antialiased md:hidden">
          {/* 1. 배경 마스크: 블러 효과가 적용된 암전 처리 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 2. 사이드바 본체: 아가페 전용 스프링 애니메이션 적용 */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 left-0 flex w-[85vw] max-w-[320px] flex-col border-r border-gray-200 bg-white shadow-2xl"
          >
            {/* 상단 헤더: 브랜드 로고 및 닫기 버튼 */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5C8D5A] text-white shadow-lg shadow-emerald-100">
                  <i className="ri-heart-3-line text-xl"></i>
                </div>
                <div>
                  <h2 className="text-[15px] font-black uppercase leading-none tracking-tight text-gray-900">아가페케어</h2>
                  <p className="mt-1.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">Mobile Control Node</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm hover:text-gray-900"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* 메뉴 리스트 영역: 고밀도 스크롤 뷰 */}
            <nav className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden p-4">
              {/* 퀵 액션 카드: 출퇴근 처리 (모바일 최우선 순위) */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    onClose();
                    location.href = '/mobile/attendance';
                  }}
                  className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl bg-[#5C8D5A] p-5 text-white shadow-xl shadow-emerald-100 transition-all active:scale-[0.97]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/10">
                    <i className="ri-time-line text-2xl" />
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-black leading-tight tracking-tight">실시간 근태 및 출퇴근</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest opacity-60">Mobile Check-In</p>
                  </div>
                  <i className="ri-arrow-right-s-line ml-auto text-xl opacity-40 transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>

              {/* 시스템 메뉴 리스트 */}
              <ul className="space-y-1.5">
                {menuData.menus.map((item: any) => {
                  const hasChildren = !!item.children?.length;
                  const isOpen = openMenus[item.id] ?? false;
                  const isActive = activeMenu === item.id || (hasChildren && item.children!.some((c: any) => c.id === activeMenu));

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => (hasChildren ? toggleMenu(item.id) : (onMenuClick(item.id), onClose()))}
                        className={clsx(
                          'flex w-full items-center justify-between rounded-lg px-4 py-3.5 transition-all',
                          isActive ? 'bg-emerald-50 text-[#5C8D5A] ring-1 ring-emerald-100' : 'text-gray-600 active:bg-gray-50',
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <i className={clsx(item.icon, 'text-xl', isActive ? 'text-[#5C8D5A]' : 'text-gray-400')} />
                          <span className={clsx('text-[14px] tracking-tight', isActive ? 'font-black' : 'font-bold')}>{item.name}</span>
                        </div>
                        {hasChildren && (
                          <i
                            className={clsx(
                              `ri-arrow-${isOpen ? 'down' : 'right'}-s-line text-gray-300 transition-transform`,
                              isOpen && 'text-[#5C8D5A]',
                            )}
                          />
                        )}
                      </button>

                      {/* 하위 메뉴 리스트 (아코디언 및 가이드 라인) */}
                      {hasChildren && isOpen && (
                        <ul className="animate-in slide-in-from-top-1 ml-6 mt-1 space-y-1 border-l-2 border-emerald-100 pl-6">
                          {item.children.map((child: any) => (
                            <li key={child.id}>
                              <button
                                onClick={() => {
                                  onMenuClick(child.id);
                                  onClose();
                                }}
                                className={clsx(
                                  'block w-full py-3 text-left text-[13px] transition-colors',
                                  activeMenu === child.id ? 'font-black text-[#5C8D5A]' : 'text-gray-500 active:text-gray-900',
                                )}
                              >
                                {child.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* 통합 사용자 푸터 (세션 관리 기능 포함) */}
            <SidebarFooter user={user} onMenuClick={onMenuClick} onClose={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
