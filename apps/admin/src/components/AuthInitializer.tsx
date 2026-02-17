'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 페이지 새로고침 시 httpOnly Cookie의 토큰으로 Zustand 스토어를 복원하는 컴포넌트
 * (admin)/layout.tsx에 포함되어 인증된 페이지 진입 시마다 실행됨
 */
export default function AuthInitializer() {
  const { setAuth, clearAuth, setInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        // 401 등 오류 시 clearAuth (middleware가 리디렉션 처리하지만 안전망)
        clearAuth();
        return null;
      })
      .then(data => {
        if (data?.success && data?.data) {
          setAuth(
            {
              id: data.data.id,
              email: data.data.email,
              name: data.data.name,
              isAdmin: data.data.isAdmin,
              roleId: data.data.roleId ?? null,
              departmentId: data.data.departmentId ?? null,
            },
            data.accessToken,
          );
        }
        setInitialized();
      })
      .catch(() => {
        clearAuth();
        setInitialized();
      });
  }, [setAuth, clearAuth, setInitialized, router]);

  return null;
}
