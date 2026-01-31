'use client';

import staffData from '@/data/staff.json';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * [페이지] 아가페 케어 통합 관리자 로그인
 * 고딕 서체, 한국어 전용 UI, 완전 직각형 디자인 적용
 */
export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const account = staffData.adminAccounts.find(s => s.username === username);

    if (account?.password === password) {
      localStorage.setItem('admin_auth', '1');
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_role', account.role);
      localStorage.setItem('admin_name', account.name);
      localStorage.setItem('admin_department', account.team);

      router.replace('/dashboard');
    } else {
      setError('인증 정보가 올바르지 않습니다. 보안 담당자에게 문의하십시오.');
      setIsLoading(false);
    }
  };

  return (
    /* font-sans: 시스템 고딕체 강제 적용 */
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-900 antialiased">
      {/* 좌측 - 브랜딩 영역 (아가페 그린 그라데이션) */}
      <div className="hidden w-1/2 border-r border-black/10 bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] shadow-2xl lg:flex lg:flex-col lg:justify-center lg:px-20">
        <div className="mb-12">
          {/* 완전 직각 로고 박스 */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-none border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
            <i className="ri-building-line text-5xl text-white"></i>
          </div>
          <h1 className="mb-4 text-5xl font-black leading-[1.1] tracking-tighter text-white">
            아가페 케어 <br /> 통합 관리 시스템
          </h1>
          <div className="mb-8 h-1.5 w-24 rounded-none bg-white"></div>
          <p className="text-xl font-bold leading-relaxed text-emerald-50 opacity-90">
            아가페 요양원 ERP 솔루션 <br />
          </p>
        </div>

        <div className="max-w-md space-y-4">
          <FeatureItem
            icon="ri-user-heart-line"
            title="인사/급여 통합 관리"
            desc="체계적인 직원 정보 및 근태/급여 자동화 엔진 기반"
          />
          <FeatureItem
            icon="ri-calendar-check-line"
            title="일정 정밀 관제"
            desc="시설 프로그램 및 투약 일정 실시간 모니터링 시스템"
          />
          <FeatureItem
            icon="ri-bar-chart-box-line"
            title="데이터 감사 시스템"
            desc="실시간 운영 데이터 분석 및 행정 리포트 생성 프로토콜"
          />
        </div>

        <div className="mt-16 text-[10px] font-black uppercase italic tracking-[0.4em] text-white/40">
          v1.2.1
        </div>
      </div>

      {/* 우측 - 로그인 폼 영역 */}
      <div className="flex w-full flex-col justify-center bg-white px-8 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-12 border-l-8 border-[#5C8D5A] pl-6">
            <h2 className="mb-2 text-4xl font-black tracking-tight text-gray-900">시스템 로그인</h2>
            <p className="text-[12px] font-black uppercase italic tracking-widest text-gray-400">
              권한이 부여된 관리자만 접속 가능합니다
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-5">
              {/* 아이디 입력 영역 */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-[11px] font-black uppercase italic tracking-widest text-gray-500"
                >
                  <span className="h-1.5 w-1.5 bg-[#5C8D5A]"></span>관리자 식별 아이디
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-gray-100 pl-4">
                    <i className="ri-user-line text-lg text-[#5C8D5A]"></i>
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="py-4.5 w-full rounded-none border-2 border-gray-200 bg-gray-50 pl-14 pr-4 text-sm font-bold text-gray-800 shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
                    placeholder="아이디를 입력하십시오"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* 비밀번호 입력 영역 */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-[11px] font-black uppercase italic tracking-widest text-gray-500"
                >
                  <span className="h-1.5 w-1.5 bg-[#5C8D5A]"></span>비밀번호
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-gray-100 pl-4">
                    <i className="ri-lock-line text-lg text-[#5C8D5A]"></i>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="py-4.5 w-full rounded-none border-2 border-gray-200 bg-gray-50 pl-14 pr-12 text-sm font-bold text-gray-800 shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
                    placeholder="비밀번호를 입력하십시오"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-[#5C8D5A]"
                    disabled={isLoading}
                  >
                    <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="animate-in fade-in slide-in-from-top-1 flex items-center gap-3 rounded-none border-l-4 border-red-600 bg-red-50 p-4 text-[13px] font-bold text-red-600">
                <i className="ri-error-warning-fill text-xl"></i>
                <span>{error}</span>
              </div>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-3 rounded-none bg-[#5C8D5A] py-5 text-[14px] font-black text-white shadow-2xl shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-[0.98] disabled:bg-gray-300"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-xl"></i>
                  <span>보안 노드 인증 중...</span>
                </>
              ) : (
                <>
                  <span className="tracking-[0.2em]">시스템 접속 시작</span>
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-2"></i>
                </>
              )}
            </button>
          </form>

          {/* 하단 유틸리티 영역 */}
          <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
            <button
              onClick={() => router.push('/')}
              className="text-[11px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-[#5C8D5A]"
            >
              <i className="ri-home-4-line mr-2"></i> 메인 홈페이지로 돌아가기
            </button>
            <div className="flex gap-4 text-[10px] font-black italic text-gray-300">
              <span>관리자 노드 v2.6</span>
              <span className="h-3 w-[1px] bg-gray-200"></span>
              <span>데이터 감사 활성화됨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** [내부 컴포넌트] 시스템 특징 아이템 (고딕 & 직각) */
function FeatureItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="group flex items-start gap-5 rounded-none border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-none border border-white/20 bg-white/20 transition-all group-hover:bg-[#5C8D5A]">
        <i className={`${icon} text-2xl text-white`}></i>
      </div>
      <div>
        <h3 className="mb-1 text-[13px] font-black text-white">{title}</h3>
        <p className="text-[11px] font-bold italic leading-relaxed text-emerald-100 opacity-60">{desc}</p>
      </div>
    </div>
  );
}
