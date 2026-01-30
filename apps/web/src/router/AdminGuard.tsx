import { getSecurityState } from '@/lib/security-demo';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminGuard() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 확인
    if (typeof window !== 'undefined') {
      const { ssoConnected } = getSecurityState();
      setAuthorized(ssoConnected);
    }
  }, []);

  if (authorized === null) {
    return null; // 또는 로딩 스피너
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
