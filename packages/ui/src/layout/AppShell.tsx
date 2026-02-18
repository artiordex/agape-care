/**
 * Description : AppShell.tsx - ?? AppShell UI ????
 * Author : Shiwoo Min
 * Date : 2025-09-19
 */
import React from 'react';
import type { AppShellProps } from '../ui-types.js';

/**
 * variant별 화면 구분:
 * - default : 일반 사용자 페이지 (흰 배경, 사이드바 없음)
 * - admin   : 관리자 페이지 (파란 헤더 + 사이드바 있음, 회색 배경)
 * - auth    : 로그인/회원가입 전용 (중앙 정렬, 폭 제한)
 * - minimal : 불필요한 영역 없는 가장 단순한 레이아웃
 */
const DefaultHeader: React.FC<{ variant: string }> = ({ variant }) => {
  const variantStyles = {
    default: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
    admin: 'bg-blue-600 dark:bg-blue-800 text-white shadow-sm',
    auth: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
    minimal: 'bg-transparent',
  };

  return (
    <header
      className={`flex h-16 shrink-0 items-center justify-between px-4 ${variantStyles[variant as keyof typeof variantStyles]}`}
    >
      {/* 좌측: 로고 + 네비게이션 */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <nav className="hidden items-center space-x-1 md:flex">{/* 메뉴 자리 */}</nav>
      </div>

      {/* 우측: 액션 버튼 */}
      <div className="flex items-center space-x-3">
        {variant === 'admin' && <div className="flex items-center space-x-2">{/* 관리자 전용 액션 */}</div>}
      </div>
    </header>
  );
};

// admin 전용 기본 Sidebar
const DefaultSidebar: React.FC<{ variant: string }> = ({ variant }) => {
  if (variant !== 'admin') return null; // 관리자가 아니면 사이드바 없음

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-full flex-col">
        {/* 사이드바 헤더 */}
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="h-8 w-full rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* 사이드바 네비게이션 */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>
        </nav>

        {/* 사이드바 푸터 */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </aside>
  );
};

// web 전용 기본 Footer
const DefaultFooter: React.FC<{ variant: string }> = ({ variant }) => {
  const variantStyles = {
    default: 'bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700',
    admin: 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700',
    auth: 'bg-transparent',
    minimal: 'bg-transparent',
  };

  return (
    <footer className={`shrink-0 px-4 py-6 ${variantStyles[variant as keyof typeof variantStyles]}`}>
      <div className="mx-auto max-w-7xl text-center">
        <div className="mx-auto h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </footer>
  );
};

// Main AppShell
export const AppShell: React.FC<AppShellProps> = ({
  children,
  variant = 'default',
  showHeader = true,
  showFooter = true,
  showSidebar,
  className,
  headerSlot,
  sidebarSlot,
  footerSlot,
}) => {
  // 사이드바 표시 여부: admin만 기본 true
  const shouldShowSidebar = showSidebar ?? variant === 'admin';

  // variant별 전체 레이아웃 스타일
  const layoutStyles = {
    default: 'min-h-screen bg-white dark:bg-gray-900 flex flex-col',
    admin: 'min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col',
    auth: 'min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center',
    minimal: 'min-h-screen flex flex-col',
  };

  // variant별 메인 콘텐츠 스타일
  const mainStyles = {
    default: 'flex-1 overflow-auto',
    admin: 'flex-1 overflow-auto p-6',
    auth: 'w-full max-w-md px-4',
    minimal: 'flex-1 overflow-auto',
  };

  // auth 레이아웃 (로그인/회원가입 화면)
  if (variant === 'auth') {
    return (
      <div className={`${layoutStyles.auth} ${className || ''}`}>
        {showHeader && (headerSlot || <DefaultHeader variant={variant} />)}
        <main className={`flex flex-1 items-center justify-center p-4 ${mainStyles.auth}`}>{children}</main>
        {showFooter && (footerSlot || <DefaultFooter variant={variant} />)}
      </div>
    );
  }

  // default / admin / minimal
  return (
    <div className={`${layoutStyles[variant]} ${className || ''}`}>
      {/* Header */}
      {showHeader && (headerSlot || <DefaultHeader variant={variant} />)}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar → admin 전용 */}
        {shouldShowSidebar && (sidebarSlot || <DefaultSidebar variant={variant} />)}
        {/* Main Content */}
        <main className={`${mainStyles[variant]} w-full`}>{children}</main>
      </div>
      {/* Footer */}
      {showFooter && (footerSlot || <DefaultFooter variant={variant} />)}
    </div>
  );
};

export default AppShell;
