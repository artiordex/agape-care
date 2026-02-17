/**
 * Description : useSidebarUser.ts - 📌 관리자 애플리케이션의 사용자 정보 관리 훅
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { useAuthStore } from '@/stores/auth.store';

/** 사용자 데이터 인터페이스 */
export interface SidebarUser {
  username: string;
  name: string;
  role: string;
  roleLevel: string;
  avatar: string;
  lastLogin: string;
}

// 아가페케어 기본 아바타 경로
const DEFAULT_AVATAR = '/images/admin-avatar.png';

/**
 * [Hook] 사이드바 사용자 상태 관리
 * Zustand Auth 스토어로부터 로그인한 사용자 정보를 동기화
 */
export function useSidebarUser() {
  const { user, isInitialized } = useAuthStore();

  // user가 없으면 null 반환 (초기화 여부로 로딩 상태 판단)
  const sidebarUser: SidebarUser | null = user
    ? {
        username: user.email,
        name: user.name,
        role: user.isAdmin ? '관리자' : '직원',
        roleLevel: user.isAdmin ? '관리자 권한' : '일반 권한',
        avatar: DEFAULT_AVATAR,
        // 국문 환경에 최적화된 마지막 접속 시간 형식 (오후 01:48)
        lastLogin: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      }
    : null;

  return {
    user: sidebarUser,
    isLoading: !isInitialized,
    isAuthenticated: !!sidebarUser,
  };
}
