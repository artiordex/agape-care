'use client';

import clsx from 'clsx';

interface SidebarFooterProps {
  user: {
    name: string;
    role: string;
    roleLevel: string;
    lastLogin: string;
    avatar: string;
  } | null;
  collapsed?: boolean; // 데스크톱 전용
  onMenuClick: (id: string) => void;
  onClose?: () => void; // 모바일에서만 사용
  enableTooltip?: boolean; // 데스크톱 collapsed 시
  onHover?: (e: React.MouseEvent, label: string) => void;
  onLeave?: () => void;
}

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
    <>
      {/* 홈페이지 바로가기 */}
      <div className={clsx('border-t', collapsed ? 'px-0 py-2' : 'px-4 py-3')}>
        <button
          type="button"
          onClick={() => window.open('/', '_blank')}
          onMouseEnter={e => enableTooltip && collapsed && onHover?.(e, '홈페이지 바로가기')}
          onMouseLeave={onLeave}
          className={clsx(
            'flex w-full items-center rounded-lg text-gray-700 hover:bg-gray-50',
            collapsed ? 'justify-center py-3' : 'gap-3 px-3 py-2.5',
          )}
        >
          <i className="ri-home-line text-xl" />
          {!collapsed && <span className="text-sm font-medium">홈페이지 바로가기</span>}
        </button>
      </div>

      {/* 하단 사용자 */}
      {user && (
        <div className={clsx('border-t py-4', collapsed ? 'px-0' : 'px-4')}>
          <div
            className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3')}
            onMouseEnter={e =>
              enableTooltip && collapsed && onHover?.(e, `${user.name}\n${user.role}\n${user.roleLevel}\n마지막 로그인 ${user.lastLogin}`)
            }
            onMouseLeave={onLeave}
          >
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>

            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500">
                  {user.role} · <span className="text-emerald-600">{user.roleLevel}</span>
                </div>
                <div className="mt-0.5 text-xs text-gray-400">마지막 로그인 {user.lastLogin}</div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onMenuClick('mypage');
                  onClose?.();
                }}
                className="flex-1 rounded-lg bg-gray-50 px-3 py-2 text-xs hover:bg-gray-100"
              >
                내 정보
              </button>
              <button
                type="button"
                onClick={() => {
                  onMenuClick('logout');
                  onClose?.();
                }}
                className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
