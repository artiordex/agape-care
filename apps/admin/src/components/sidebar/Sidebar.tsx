/**
 * Description : Sidebar.tsx - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import SidebarFooter from './SidebarFooter';
import { useSidebarMenus } from './hooks/useSidebarMenus';

/**
 * SidebarProps: 사이드바 제어를 위한 부모 컴포넌트 전달 속성
 */
interface SidebarProps {
  readonly activeMenu: string; // 현재 활성화된(선택된) 메뉴 ID
  readonly collapsed: boolean; // 사이드바 축소 상태 여부
  readonly onToggleCollapse: () => void; // 사이드바 너비 조절 함수
  readonly onMenuClick: (menuId: string) => void; // 메뉴 클릭 시 페이지 이동 처리 함수
}

/**
 * [Sidebar Component] 아가페케어 시스템 통합 내비게이션
 * * 주요 기능:
 * 1. 아코디언 내비게이션: 하위 메뉴가 있는 경우 클릭 시 펼침/닫힘 지원
 * 2. 상태 동기화: 현재 접속 중인 경로(activeMenu)에 맞춰 부모 메뉴 자동 확장
 * 3. 축소 모드(Collapsed): 아이콘만 표시되는 모드에서 호버 시 유동 툴팁 제공
 * 4. 시각적 피드백: 아가페 그린(#5C8D5A) 테마를 활용한 활성 상태 강조
 */
export default function AdminSidebar({ activeMenu, collapsed, onToggleCollapse, onMenuClick }: SidebarProps) {
  // 메뉴 상태 관리 훅 사용
  const { menus, openMenus, toggleMenu } = useSidebarMenus(activeMenu);

  /* 툴팁 상태 관리 (사이드바가 축소되었을 때 아이콘 옆에 뜨는 설명창) */
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null); // 현재 호버 중인 메뉴 이름
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 }); // 툴팁의 좌표

  /**
   * [Event Handler] 툴팁 표시 로직
   * 사이드바가 축소된 모드(collapsed)에서만 작동하며, 호버한 버튼의 위치를 계산해 툴팁 위치를 지정합니다.
   */
  const handleShowTooltip = (e: React.MouseEvent | React.FocusEvent, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2, // 수직 중앙 정렬
      left: rect.right + 12, // 버튼 오른쪽에서 12px 띄움
    });
    setHoveredMenu(label);
  };

  const handleHideTooltip = () => setHoveredMenu(null);

  return (
    <>
      {/* 메인 사이드바 본체 */}
      <aside
        className={clsx(
          'hidden h-screen flex-col border-r border-gray-300 bg-white antialiased transition-all md:flex',
          collapsed ? 'w-[70px]' : 'w-[260px]', // 축소 시 70px, 확장 시 260px 너비
        )}
      >
        {/* 1. 상단 로고 및 토글 영역 */}
        <div className={clsx('flex h-16 items-center border-b border-gray-200', collapsed ? 'justify-center' : 'px-4')}>
          <button
            type="button"
            onClick={onToggleCollapse}
            onMouseEnter={e => collapsed && handleShowTooltip(e, '메뉴 펼치기')}
            onMouseLeave={handleHideTooltip}
            onFocus={e => collapsed && handleShowTooltip(e, '메뉴 펼치기')}
            onBlur={handleHideTooltip}
            className="flex items-center gap-3 transition-opacity hover:opacity-80 focus:outline-none"
          >
            {/* 로고 아이콘 박스: 브랜드 컬러 적용 */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5C8D5A] text-white shadow-md shadow-emerald-100">
              <i className="ri-heart-3-line text-xl" />
            </div>
            {/* 확장 모드에서만 로고 텍스트 노출 */}
            {!collapsed && (
              <div className="text-left">
                <span className="block text-[16px] font-black uppercase leading-none tracking-tighter text-gray-900">아가페케어</span>
                <span className="mt-1 block text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">Admin Console</span>
              </div>
            )}
          </button>
        </div>

        {/* 2. 메인 내비게이션 영역: 스크롤 가능 구역 */}
        <nav className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden py-4">
          {menus.map(item => {
            const hasChildren = !!item.children?.length; // 자식 메뉴 존재 여부
            const isOpen = openMenus[item.id] ?? false; // 현재 메뉴가 열려있는지 여부
            // 자신 혹은 자식 메뉴가 현재 선택된 상태인지 확인
            const isActive = activeMenu === item.id || (hasChildren && item.children!.some((c: any) => c.id === activeMenu));

            return (
              <div key={item.id} className="mb-0.5">
                {/* 상위 메뉴 항목 버튼 */}
                <button
                  type="button"
                  onClick={() => (hasChildren ? toggleMenu(item.id) : onMenuClick(item.id))}
                  onMouseEnter={e => collapsed && handleShowTooltip(e, item.name)}
                  onMouseLeave={handleHideTooltip}
                  onFocus={e => collapsed && handleShowTooltip(e, item.name)}
                  onBlur={handleHideTooltip}
                  className={clsx(
                    'flex w-full items-center transition-all focus:outline-none',
                    collapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-2.5',
                    isActive ? 'bg-emerald-50/50 text-[#5C8D5A]' : 'text-gray-600 hover:bg-gray-50',
                  )}
                >
                  <div className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
                    {/* 메뉴 아이콘: 활성화 시 색상 변경 */}
                    <i className={clsx(item.icon, 'text-xl', isActive ? 'text-[#5C8D5A]' : 'text-gray-400')} />
                    {!collapsed && (
                      <span className={clsx('text-[16px] tracking-tight', isActive ? 'font-black' : 'font-bold')}>{item.name}</span>
                    )}
                  </div>
                  {/* 확장 모드이며 자식이 있는 경우 화살표 아이콘 표시 */}
                  {!collapsed && hasChildren && (
                    <i
                      className={clsx(
                        `ri-arrow-${isOpen ? 'down' : 'right'}-s-line text-gray-300 transition-transform duration-200`,
                        isOpen && 'text-[#5C8D5A]',
                      )}
                    />
                  )}
                </button>

                {/* 하위 메뉴 리스트 (아코디언 애니메이션) */}
                {!collapsed && hasChildren && isOpen && (
                  <div className="animate-in slide-in-from-top-1 mb-2 ml-6 border-l-2 border-emerald-100 bg-gray-50/30 duration-200">
                    {item.children!.map((child: any) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onMenuClick(child.id)}
                        className={clsx(
                          'block w-full py-2.5 pl-6 pr-6 text-left text-[16px] transition-colors',
                          activeMenu === child.id
                            ? 'bg-emerald-50/30 font-black text-[#5C8D5A]' // 현재 선택된 서브메뉴
                            : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900',
                        )}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 3. 사이드바 하단 (사용자 정보 카드 영역) */}
        <SidebarFooter
          collapsed={collapsed}
          onMenuClick={onMenuClick}
          enableTooltip={true}
          onShowTooltip={handleShowTooltip}
          onHideTooltip={handleHideTooltip}
        />
      </aside>

      {/* --- [Global Floating Tooltip] 사이드바 축소 모드에서 메뉴명 표시 --- */}
      {collapsed && hoveredMenu && (
        <div
          className="pointer-events-none fixed z-[9999] whitespace-pre rounded border border-gray-700 bg-gray-900 px-3 py-2 text-[11px] font-black text-white shadow-2xl"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: 'translateY(-50%)', // Y축 기준 중앙 정렬
          }}
        >
          {hoveredMenu}
          {/* 툴팁 좌측의 뾰족한 화살표 부분 */}
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 border-b border-l border-gray-700 bg-gray-900" />
        </div>
      )}
    </>
  );
}
