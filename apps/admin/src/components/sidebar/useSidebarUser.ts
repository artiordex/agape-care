'use client';

import { useEffect, useState } from 'react';

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
 * 로컬 스토리지로부터 보안 세션 및 사용자 정보를 동기화
 */
export function useSidebarUser() {
  const [user, setUser] = useState<SidebarUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 클라이언트 측 로컬 스토리지 데이터 접근
    const username = localStorage.getItem('admin_username');
    const name = localStorage.getItem('admin_name');
    const role = localStorage.getItem('admin_role');
    const roleLevel = localStorage.getItem('admin_roleLevel');
    const avatar = localStorage.getItem('admin_avatar');

    // 필수 정보 누락 시 인증 실패 처리
    if (!username || !name) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // 아가페케어 표준 사용자 객체 생성
    setUser({
      username,
      name,
      role: role ?? '지정 안 됨',
      roleLevel: roleLevel ?? '일반 권한',
      avatar: avatar || DEFAULT_AVATAR,
      // 국문 환경에 최적화된 마지막 접속 시간 형식 (오후 01:48)
      lastLogin: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    });

    setIsLoading(false);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
