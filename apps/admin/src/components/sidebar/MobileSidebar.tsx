/**
 * Description : MobileSidebar.tsx - 📌 관리자 애플리케이션의 모바일 사이드바 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarFooter from './SidebarFooter';
import { useSidebarMenus } from './hooks/useSidebarMenus';
import { useSidebarUser } from './hooks/useSidebarUser';

/* 인터페이스 정의 */

interface MobileSidebarProps {
  readonly activeMenu: string; // 현재 활성화된 메뉴 ID
  readonly isOpen: boolean; // 모바일 사이드바 열림 상태
  readonly onClose: () => void; // 사이드바 닫기 함수
  readonly onMenuClick: (menuId: string) => void; // 메뉴 클릭 핸들러
}

/**
 * [Mobile Sidebar] 모바일 전용 통합 내비게이션 시스템
 * 아가페 그린(#5C8D5A) 테마를 바탕으로, 모바일 기기의 터치 친화적인 UX와
 * 부드러운 애니메이션 효과를 제공하는 사이드바 컴포넌트입니다.
 */
export default function MobileSidebar({ activeMenu, isOpen, onClose, onMenuClick }: MobileSidebarProps) {
  // 메뉴 상태 관리 훅 사용
  const { menus, openMenus, toggleMenu } = useSidebarMenus(activeMenu);

  // useSidebarUser 훅을 사용하여 로컬 스토리지 기반의 실시간 사용자 데이터 확보
  const { user } = useSidebarUser();

  return (
    /**
     * AnimatePresence: 컴포넌트가 DOM에서 제거될 때(exit) 애니메이션을 보장함
     */
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] font-sans antialiased md:hidden">
          {/* 배경 마스크 (Overlay)
              - 배경을 어둡게 처리하고 클릭 시 사이드바를 닫음
              - backdrop-blur-sm: 세련된 반투명 블러 효과 적용
          */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 사이드바 본체 (Drawer)
              - spring transition: 물리 법칙이 적용된 듯한 탄성 있는 움직임 구현
              - w-[85vw]: 모바일 화면 너비의 85%를 차지하도록 설정
          */}
          <motion.aside
            initial={{ x: '-100%' }} // 왼쪽 밖에서 시작
            animate={{ x: 0 }} // 안으로 들어옴
            exit={{ x: '-100%' }} // 다시 나감
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 left-0 flex w-[85vw] max-w-[320px] flex-col border-r border-gray-200 bg-white shadow-2xl"
          >
            {/* [상단 영역] 로고 및 닫기 제어 */}
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
              {/* 닫기 버튼: 터치 영역 확보를 위해 h-8 w-8 이상으로 설정 */}
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm hover:text-gray-900"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* [메뉴 영역] 내비게이션 및 퀵 액션 */}
            <nav className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden p-4">
              {/* 퀵 액션 카드: 현장 직원을 위한 최우선 순위 기능 (근태관리)
                  - active:scale-[0.97]: 터치 시 눌리는 피드백 제공
              */}
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
                    <p className="text-[14px] font-black leading-tight tracking-tight">근태 및 출퇴근</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest opacity-60">Mobile Check-In</p>
                  </div>
                  <i className="ri-arrow-right-s-line ml-auto text-xl opacity-40 transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>

              {/* 시스템 메뉴 리스트: 대메뉴 및 소메뉴 아코디언 */}
              <ul className="space-y-1.5">
                {menus.map(item => {
                  const hasChildren = !!item.children?.length;
                  const isOpen = openMenus[item.id] ?? false;
                  const isActive = activeMenu === item.id || (hasChildren && item.children!.some((c: any) => c.id === activeMenu));

                  return (
                    <li key={item.id}>
                      {/* 상위 메뉴 버튼: 하위 메뉴 유무에 따라 토글 또는 이동 수행 */}
                      <button
                        onClick={() => (hasChildren ? toggleMenu(item.id) : (onMenuClick(item.id), onClose()))}
                        className={clsx(
                          'flex w-full items-center justify-between rounded-lg px-4 py-3.5 transition-all',
                          isActive ? 'bg-emerald-50 text-[#5C8D5A] ring-1 ring-emerald-100' : 'text-gray-600 active:bg-gray-50',
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <i className={clsx(item.icon, 'text-xl', isActive ? 'text-[#5C8D5A]' : 'text-gray-400')} />
                          <span className={clsx('text-[16px] tracking-tight', isActive ? 'font-black' : 'font-bold')}>{item.name}</span>
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

                      {/* 하위 메뉴 리스트: 수직 가이드라인을 통한 시각적 계층 표현 */}
                      {hasChildren && isOpen && (
                        <ul className="animate-in slide-in-from-top-1 ml-6 mt-1 space-y-1 border-l-2 border-emerald-100 pl-6">
                          {item.children.map((child: any) => (
                            <li key={child.id}>
                              <button
                                onClick={() => {
                                  onMenuClick(child.id);
                                  onClose(); // 이동 후 사이드바 닫기
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

            {/* [푸터 영역] 사이드바 하단 사용자 세션 관리 버튼 (Hook에서 가져온 user 전달) */}
            <SidebarFooter user={user} onMenuClick={onMenuClick} onClose={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
