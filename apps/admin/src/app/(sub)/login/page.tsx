'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const ADMIN_ACCOUNTS = {
    admin: { password: '0000', role: 'super-admin', name: '최고관리자' },
    director: { password: '1111', role: 'director', name: '원장' },
    manager: { password: '2222', role: 'manager', name: '사무국장' },
    socialworker: { password: '3333', role: 'social-worker', name: '사회복지사' },
    nurse: { password: '1111', role: 'nurse', name: '간호조무사' },
    careworker: { password: '2222', role: 'care-worker', name: '요양보호사' },
    cook: { password: '3333', role: 'cook', name: '조리원' },
    accountant: { password: '0000', role: 'accountant', name: '회계담당' },
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (isAuth === '1') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = ADMIN_ACCOUNTS[username as keyof typeof ADMIN_ACCOUNTS];

    if (account && password === account.password) {
      localStorage.setItem('admin_auth', '1');
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_role', account.role);
      localStorage.setItem('admin_name', account.name);

      router.push('/admin/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit(e as any);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50 px-4">
      <div className={`w-full max-w-md transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
          {/* 로고 */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-amber-500">
              <i className="ri-shield-keyhole-line text-4xl text-white"></i>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">관리자 전용 페이지</h1>
            <p className="text-gray-600">아이디와 비밀번호를 입력하세요</p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">아이디</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-teal-500"
                placeholder="아이디 입력"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">비밀번호</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full rounded-lg border px-4 py-3 pr-12 focus:ring-2 focus:ring-teal-500"
                  placeholder="비밀번호 입력"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl`} />
                </button>
              </div>
              {error && (
                <div className="animate-fadeIn mt-2 flex items-center gap-2 text-sm text-red-600">
                  <i className="ri-error-warning-line"></i>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 py-3 font-bold text-white transition-all duration-300 hover:shadow-xl"
            >
              로그인
            </button>
          </form>

          {/* 홈으로 */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <i className="ri-arrow-left-line"></i> 홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
