/**
 * Description : SidebarFooter.tsx - 📌 관리자 애플리케이션의 사이드바 하단 사용자 프로필 및 시스템 관제 제어 영역 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import clsx from 'clsx';
import React from 'react';

/**
 * SidebarFooterProps 인터페이스
 * @property user - 현재 로그인한 사용자의 정보 객체 (이름, 역할, 등급, 접속로그, 아바타)
 * @property collapsed - 사이드바의 축소/확장 상태 여부 (기본값: false)
 * @property onMenuClick - 버튼 클릭 시 이동할 메뉴 ID 전달 (내 정보, 로그아웃 등)
 * @property onClose - (옵션) 모바일 환경 등에서 메뉴 클릭 후 사이드바를 닫을 때 사용
 * @property enableTooltip - 축소 모드 시 툴팁 표시 활성화 여부
 * @property onHover - 툴팁 노출을 위한 마우스 엔터 이벤트 핸들러
 * @property onLeave - 툴팁 제거를 위한 마우스 리브 이벤트 핸들러
 */
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
  readonly onShowTooltip?: (e: React.MouseEvent | React.FocusEvent, label: string) => void;
  readonly onHideTooltip?: () => void;
}

/**
 * [Sidebar Footer] 사용자 프로필 및 시스템 관제 제어 영역
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 레이아웃을 적용하여
 * 사이드바 하단에 고정되는 사용자 마스터 프로필 영역입니다.
 */
export default function SidebarFooter({
  user,
  collapsed = false,
  onMenuClick,
  onClose,
  enableTooltip = false,
  onShowTooltip,
  onHideTooltip,
}: SidebarFooterProps) {
  return (
    // 푸터 컨테이너
    <div className="border-t border-gray-200 bg-white antialiased">
      {/* 시스템 퀵 링크 섹션  */}
      <div className={clsx('py-2', collapsed ? 'px-0' : 'px-3')}>
        <button
          type="button"
          onClick={() => window.open('/', '_blank')} // 새 탭에서 홈페이지 열기
          onMouseEnter={e => enableTooltip && collapsed && onShowTooltip?.(e, '홈페이지 바로가기')}
          onMouseLeave={onHideTooltip}
          onFocus={e => enableTooltip && collapsed && onShowTooltip?.(e, '홈페이지 바로가기')}
          onBlur={onHideTooltip}
          className={clsx(
            'group flex w-full items-center rounded-md transition-all hover:bg-emerald-50',
            collapsed ? 'justify-center py-3' : 'gap-3 px-3 py-2',
          )}
        >
          {/* 홈 아이콘 */}
          <i className="ri-home-7-line text-xl text-gray-400 transition-colors group-hover:text-[#5C8D5A]" />
          {!collapsed && (
            <span className="text-[16px] font-bold tracking-tight text-gray-600 group-hover:text-[#5C8D5A]">홈페이지 바로가기</span>
          )}
        </button>
      </div>

      {/* 하단 사용자 마스터 프로필 섹션 */}
      {user && (
        <div className={clsx('border-t border-gray-200 bg-[#f8fafc] py-4', collapsed ? 'px-0' : 'px-4')}>
          {/* 사용자 정보 요약 레이아웃 */}
          <button
            type="button"
            className={clsx('flex w-full items-center text-left focus:outline-none', collapsed ? 'justify-center' : 'gap-3')}
            onMouseEnter={e =>
              enableTooltip &&
              collapsed &&
              onShowTooltip?.(e, `${user.name}\n${user.role}\n${user.roleLevel}\n마지막 접속: ${user.lastLogin}`)
            }
            onMouseLeave={onHideTooltip}
            onFocus={e =>
              enableTooltip &&
              collapsed &&
              onShowTooltip?.(e, `${user.name}\n${user.role}\n${user.roleLevel}\n마지막 접속: ${user.lastLogin}`)
            }
            onBlur={onHideTooltip}
          >
            {/* 아바타 이미지: 이중 테두리 및 그림자 효과로 입체감 부여 */}
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border-2 border-white bg-white shadow-md ring-1 ring-emerald-100">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>

            {/* 확장 모드 시 상세 정보 표시 (이름, 권한, 접속 시간) */}
            {!collapsed && (
              <div className="min-w-0 flex-1">
                {/* 사용자 성함 및 님(접미사) */}
                <div className="truncate text-[13px] font-black leading-none text-gray-900">
                  {user.name} <span className="ml-0.5 font-sans text-[12px] font-bold text-gray-400">님</span>
                </div>
                {/* 역할(Role) 및 등급(Level) 구분 레이아웃 */}
                <div className="mt-1.5 flex items-center gap-1.5 truncate text-[12px]">
                  <span className="uppercase tracking-tighter text-gray-500">{user.role}</span>
                  <span className="h-2 w-[1px] bg-gray-300"></span> {/* 구분선 */}
                  <span className="tracking-tighter text-[#5C8D5A]">{user.roleLevel}</span>
                </div>
                {/* 접속 정보 */}
                <div className="mt-1 text-[12px] tracking-tighter text-gray-500">접속정보: {user.lastLogin}</div>
              </div>
            )}
          </button>

          {/* 세션 제어 버튼 그룹 (확장 모드 전용) */}
          {!collapsed && (
            <div className="mt-4 flex gap-2">
              {/* 내 정보 수정 버튼 */}
              <button
                type="button"
                onClick={() => {
                  onMenuClick('mypage');
                  onClose?.();
                }}
                className="flex-1 rounded border border-gray-300 bg-white py-2 text-[12px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
              >
                내 정보
              </button>
              {/* 시스템 로그아웃 버튼 (붉은색 테두리 및 배경 적용으로 경고 의미 부여) */}
              <button
                type="button"
                onClick={() => {
                  onMenuClick('logout');
                  onClose?.();
                }}
                className="flex-1 rounded border border-red-100 bg-red-50 py-2 text-[12px] font-black text-red-600 shadow-sm transition-all hover:bg-red-100 active:scale-95"
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
