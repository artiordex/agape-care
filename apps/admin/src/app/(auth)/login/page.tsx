'use client';

import staffData from '@/data/staff.json';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 이미 로그인된 경우만 이동
  useEffect(() => {
    // const isAuth = localStorage.getItem('admin_auth');
    // if (isAuth === '1') {
    //   router.replace('/dashboard');
    // }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const account = staffData.staff.find(s => s.username === username);

    if (account?.password === password) {
      localStorage.setItem('admin_auth', '1');
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_role', account.role);
      localStorage.setItem('admin_name', account.name);
      localStorage.setItem('admin_department', account.department);

      // 로그인 성공 후 대시보드로
      router.replace('/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 좌측 - 브랜딩 영역 */}
      <div className="hidden w-1/2 bg-gradient-to-br from-teal-600 to-teal-800 lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div className="mb-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <i className="ri-building-line text-4xl text-white"></i>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white">요양원 관리 시스템</h1>
          <p className="text-lg text-teal-100">전문 ERP 솔루션으로 효율적인 시설 운영을 지원합니다</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
              <i className="ri-user-heart-line text-xl text-white"></i>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">입소자 관리</h3>
              <p className="text-sm text-teal-100">체계적인 입소자 정보 및 케어 기록 관리</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
              <i className="ri-calendar-check-line text-xl text-white"></i>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">일정 관리</h3>
              <p className="text-sm text-teal-100">프로그램 및 투약 일정 통합 관리</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
              <i className="ri-bar-chart-box-line text-xl text-white"></i>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">통계 및 리포트</h3>
              <p className="text-sm text-teal-100">실시간 데이터 분석 및 보고서 생성</p>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 - 로그인 폼 */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* 로고 (모바일용) */}
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600">
              <i className="ri-building-line text-2xl text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">요양원 관리 시스템</h1>
          </div>

          {/* 헤더 */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">로그인</h2>
            <p className="text-gray-600">관리자 계정으로 로그인하세요</p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 아이디 */}
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-gray-700">
                아이디
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <i className="ri-user-line text-gray-400"></i>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder="아이디를 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                비밀번호
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <i className="ri-lock-line text-gray-400"></i>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-12 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder="비밀번호를 입력하세요"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl`}></i>
                </button>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                <i className="ri-error-warning-line"></i>
                <span>{error}</span>
              </div>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-3 font-semibold text-white transition-colors hover:bg-teal-700 disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>로그인 중...</span>
                </>
              ) : (
                <>
                  <span>로그인</span>
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>
          </form>

          {/* 하단 링크 */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={() => router.push('/')}
              className="flex w-full items-center justify-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              <i className="ri-home-line"></i>
              <span>홈페이지로 돌아가기</span>
            </button>
          </div>

          {/* 테스트 계정 안내 */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-2 text-xs font-semibold text-gray-700">테스트 계정</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>• 관리자: admin / 0000</p>
              <p>• 원장: director / 1111</p>
              <p>• 사무국장: manager / 2222</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
