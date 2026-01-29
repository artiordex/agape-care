'use client';

import { useEffect, useState } from 'react';

export interface SidebarUser {
  username: string;
  name: string;
  role: string;
  roleLevel: string;
  avatar: string;
  lastLogin: string;
}

const DEFAULT_AVATAR = '/images/admin-avatar.png';

export function useSidebarUser() {
  const [user, setUser] = useState<SidebarUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage는 클라이언트에서만 접근
    const username = localStorage.getItem('admin_username');
    const name = localStorage.getItem('admin_name');
    const role = localStorage.getItem('admin_role');
    const roleLevel = localStorage.getItem('admin_roleLevel');
    const avatar = localStorage.getItem('admin_avatar');

    if (!username || !name) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setUser({
      username,
      name,
      role: role ?? '',
      roleLevel: roleLevel ?? '',
      avatar: avatar || DEFAULT_AVATAR,
      lastLogin: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
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
