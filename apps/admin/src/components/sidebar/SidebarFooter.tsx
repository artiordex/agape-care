'use client';

import clsx from 'clsx';
import React from 'react';

interface SidebarFooterProps {
  readonly user: {
    name: string;
    role: string;
    roleLevel: string;
    lastLogin: string;
    avatar: string;
  } | null;
  readonly collapsed?: boolean;
  readonly onMenuClick: (id: string) => void;
  readonly onClose?: () => void;
  readonly enableTooltip?: boolean;
  readonly onHover?: (e: React.MouseEvent, label: string) => void;
  readonly onLeave?: () => void;
}

/**
 * [Sidebar Footer] 사용자 프로필 및 시스템 관제 제어 영역
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 레이아웃 적용
 */
export default function SidebarFooter({
  user,
  collapsed = false,
  onMenuClick,
  onClose,
  enableTooltip = false,
  onHover,
  onLeave,
}: SidebarFooterProps) {
  return (
    <div className="border-t border-gray-200 bg-white font-sans antialiased">
      {/* 1. 시스템 퀵 링크 섹션 (홈페이지 바로가기) */}
      <div className={clsx('py-2', collapsed ? 'px-0' : 'px-3')}>
        <button
          type="button"
          onClick={() => window.open('/', '_blank')}
          onMouseEnter={e => enableTooltip && collapsed && onHover?.(e, '홈페이지 바로가기')}
          onMouseLeave={onLeave}
          className={clsx(
            'group flex w-full items-center rounded-md transition-all hover:bg-emerald-50',
            collapsed ? 'justify-center py-3' : 'gap-3 px-3 py-2',
          )}
        >
          <i className="ri-home-7-line text-xl text-gray-400 transition-colors group-hover:text-[#5C8D5A]" />
          {!collapsed && (
            <span className="text-[12px] font-bold tracking-tight text-gray-600 group-hover:text-[#5C8D5A]">홈페이지 바로가기</span>
          )}
        </button>
      </div>

      {/* 2. 하단 사용자 마스터 프로필 섹션 */}
      {user && (
        <div className={clsx('border-t border-gray-200 bg-[#f8fafc] py-4', collapsed ? 'px-0' : 'px-4')}>
          <div
            className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3')}
            onMouseEnter={e =>
              enableTooltip && collapsed && onHover?.(e, `${user.name}\n${user.role}\n${user.roleLevel}\n마지막 접속: ${user.lastLogin}`)
            }
            onMouseLeave={onLeave}
          >
            {/* 아바타 이미지: 아가페 테마 보더 및 섀도우 적용 */}
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border-2 border-white bg-white shadow-md ring-1 ring-emerald-100">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>

            {!collapsed && (
              <div className="min-w-0 flex-1">
                {/* 사용자 성함 및 역할 위계 */}
                <div className="truncate text-[13px] font-black leading-none text-gray-900">
                  {user.name} <span className="ml-0.5 font-sans text-[10px] font-bold text-gray-400">님</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 truncate text-[10px] font-bold">
                  <span className="uppercase tracking-tighter text-gray-500">{user.role}</span>
                  <span className="h-2 w-[1px] bg-gray-300"></span>
                  <span className="font-black uppercase tracking-tighter text-[#5C8D5A]">{user.roleLevel}</span>
                </div>
                {/* 마지막 접속 시간 (이탤릭 고딕) */}
                <div className="mt-1 text-[9px] font-bold italic tracking-tighter text-gray-300">Access: {user.lastLogin}</div>
              </div>
            )}
          </div>

          {/* 세션 제어 버튼 그룹: PC 레이아웃 전용 */}
          {!collapsed && (
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onMenuClick('mypage');
                  onClose?.();
                }}
                className="flex-1 rounded border border-gray-300 bg-white py-2 text-[10px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
              >
                내 정보 (Profile)
              </button>
              <button
                type="button"
                onClick={() => {
                  onMenuClick('logout');
                  onClose?.();
                }}
                className="flex-1 rounded border border-red-100 bg-red-50 py-2 text-[10px] font-black text-red-600 shadow-sm transition-all hover:bg-red-100 active:scale-95"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
