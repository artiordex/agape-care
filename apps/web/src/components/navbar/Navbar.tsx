'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import menu from '@/data/menu.json';

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIntroDropdownOpen, setIsIntroDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isFacilityDropdownOpen, setIsFacilityDropdownOpen] = useState(false);
  const [isAdmissionDropdownOpen, setIsAdmissionDropdownOpen] = useState(false);
  const [isNoticeDropdownOpen, setIsNoticeDropdownOpen] = useState(false);
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);

  // 모바일 메뉴 아코디언 상태
  const [mobileIntroOpen, setMobileIntroOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileFacilityOpen, setMobileFacilityOpen] = useState(false);
  const [mobileAdmissionOpen, setMobileAdmissionOpen] = useState(false);
  const [mobileNoticeOpen, setMobileNoticeOpen] = useState(false);

  const introDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const facilityDropdownRef = useRef<HTMLDivElement>(null);
  const admissionDropdownRef = useRef<HTMLDivElement>(null);
  const noticeDropdownRef = useRef<HTMLDivElement>(null);

  const introTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const facilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const admissionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const noticeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // menu.json 데이터 구조 분해
  const { introSubMenu, servicesSubMenu, facilitySubMenu, admissionSubMenu, noticeSubMenu, allMenuData } = menu as any;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (introDropdownRef.current && !introDropdownRef.current.contains(event.target as Node)) {
        setIsIntroDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (facilityDropdownRef.current && !facilityDropdownRef.current.contains(event.target as Node)) {
        setIsFacilityDropdownOpen(false);
      }
      if (admissionDropdownRef.current && !admissionDropdownRef.current.contains(event.target as Node)) {
        setIsAdmissionDropdownOpen(false);
      }
      if (noticeDropdownRef.current && !noticeDropdownRef.current.contains(event.target as Node)) {
        setIsNoticeDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsIntroDropdownOpen(false);
        setIsServicesDropdownOpen(false);
        setIsFacilityDropdownOpen(false);
        setIsAdmissionDropdownOpen(false);
        setIsNoticeDropdownOpen(false);
        setIsAllMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // 전체 메뉴 또는 모바일 메뉴 오픈 시 스크롤 방지
  useEffect(() => {
    if (isAllMenuOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAllMenuOpen, isMobileMenuOpen]);

  // 모바일 메뉴가 닫힐 때 아코디언도 초기화
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileIntroOpen(false);
      setMobileServicesOpen(false);
      setMobileFacilityOpen(false);
      setMobileAdmissionOpen(false);
      setMobileNoticeOpen(false);
    }
  }, [isMobileMenuOpen]);

  const handleIntroMouseEnter = () => {
    if (introTimeoutRef.current) {
      clearTimeout(introTimeoutRef.current);
    }
    setIsIntroDropdownOpen(true);
  };

  const handleIntroMouseLeave = () => {
    introTimeoutRef.current = setTimeout(() => {
      setIsIntroDropdownOpen(false);
    }, 300);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 300);
  };

  const handleFacilityMouseEnter = () => {
    if (facilityTimeoutRef.current) {
      clearTimeout(facilityTimeoutRef.current);
    }
    setIsFacilityDropdownOpen(true);
  };

  const handleFacilityMouseLeave = () => {
    facilityTimeoutRef.current = setTimeout(() => {
      setIsFacilityDropdownOpen(false);
    }, 300);
  };

  const handleAdmissionMouseEnter = () => {
    if (admissionTimeoutRef.current) {
      clearTimeout(admissionTimeoutRef.current);
    }
    setIsAdmissionDropdownOpen(true);
  };

  const handleAdmissionMouseLeave = () => {
    admissionTimeoutRef.current = setTimeout(() => {
      setIsAdmissionDropdownOpen(false);
    }, 300);
  };

  const handleNoticeMouseEnter = () => {
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current);
    }
    setIsNoticeDropdownOpen(true);
  };

  const handleNoticeMouseLeave = () => {
    noticeTimeoutRef.current = setTimeout(() => {
      setIsNoticeDropdownOpen(false);
    }, 300);
  };

  const isActive = (path: string) => pathname === path;

  // 서브메뉴에 속하는지 확인하는 함수
  const isInSubmenu = (submenu: any[]) => {
    return submenu.some((item: any) => pathname === item.path || pathname.startsWith(item.path + '/'));
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/95 shadow-sm backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex cursor-pointer items-center gap-3">
              {/* 로고 이미지 */}
              <img
                src="/images/logo.png"
                alt="아가페 요양원 로고"
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />

              {/* 텍스트 로고 (더 크게!) */}
              <span className="text-2xl font-bold tracking-tight text-[#5C8D5A] transition-colors group-hover:text-[#4A6F47]">
                아가페 요양원
              </span>
            </Link>

            {/* 데스크탑 메뉴 */}
            <div className="hidden items-center gap-8 lg:flex">
              {/* 기관소개 */}
              <div
                ref={introDropdownRef}
                className="relative"
                onMouseEnter={handleIntroMouseEnter}
                onMouseLeave={handleIntroMouseLeave}
                onFocus={handleIntroMouseEnter}
                onBlur={handleIntroMouseLeave}
                role="group"
              >
                <button
                  className={`whitespace-nowrap text-[17px] font-semibold transition-colors ${
                    isInSubmenu(introSubMenu) ? 'text-[#5C8D5A]' : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  기관소개
                </button>

                <div
                  className={`absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-300 ${
                    isIntroDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {introSubMenu.map((item: any) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="group flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50"
                          onClick={() => setIsIntroDropdownOpen(false)}
                        >
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-50 to-amber-50 transition-transform group-hover:scale-110">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`} />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 서비스안내 */}
              <div
                ref={servicesDropdownRef}
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                onFocus={handleServicesMouseEnter}
                onBlur={handleServicesMouseLeave}
                role="group"
              >
                <button
                  className={`cursor-pointer whitespace-nowrap text-[17px] font-semibold transition-colors ${
                    isInSubmenu(servicesSubMenu) ? 'text-[#5C8D5A]' : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  서비스안내
                </button>

                <div
                  className={`absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-300 ${
                    isServicesDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {servicesSubMenu.map((item: any) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="group flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-50 to-amber-50 transition-transform group-hover:scale-110">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`} />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 시설안내 */}
              <div
                ref={facilityDropdownRef}
                className="relative"
                onMouseEnter={handleFacilityMouseEnter}
                onMouseLeave={handleFacilityMouseLeave}
                onFocus={handleFacilityMouseEnter}
                onBlur={handleFacilityMouseLeave}
                role="group"
              >
                <Link
                  href="/facility"
                  className={`whitespace-nowrap text-[17px] font-semibold transition-colors ${
                    isInSubmenu(facilitySubMenu) ? 'text-[#5C8D5A]' : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  시설안내
                </Link>

                <div
                  className={`absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-300 ${
                    isFacilityDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {facilitySubMenu.map((item: any) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="group flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50"
                          onClick={() => setIsFacilityDropdownOpen(false)}
                        >
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-50 to-amber-50 transition-transform group-hover:scale-110">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`} />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 이용안내 */}
              <div
                ref={admissionDropdownRef}
                className="relative"
                onMouseEnter={handleAdmissionMouseEnter}
                onMouseLeave={handleAdmissionMouseLeave}
                onFocus={handleAdmissionMouseEnter}
                onBlur={handleAdmissionMouseLeave}
                role="group"
              >
                <button
                  className={`cursor-pointer whitespace-nowrap text-[17px] font-semibold transition-colors ${
                    isInSubmenu(admissionSubMenu) ? 'text-[#5C8D5A]' : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  이용안내
                </button>

                <div
                  className={`absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-300 ${
                    isAdmissionDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {admissionSubMenu.map((item: any) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="group flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50"
                          onClick={() => setIsAdmissionDropdownOpen(false)}
                        >
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-50 to-amber-50 transition-transform group-hover:scale-110">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`} />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 알림마당 */}
              <div
                ref={noticeDropdownRef}
                className="relative"
                onMouseEnter={handleNoticeMouseEnter}
                onMouseLeave={handleNoticeMouseLeave}
                onFocus={handleNoticeMouseEnter}
                onBlur={handleNoticeMouseLeave}
                role="group"
              >
                <button
                  className={`whitespace-nowrap text-[17px] font-semibold transition-colors ${
                    isInSubmenu(noticeSubMenu) ? 'text-[#5C8D5A]' : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  알림마당
                </button>

                <div
                  className={`absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-300 ${
                    isNoticeDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {noticeSubMenu.map((item: any) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="group flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50"
                          onClick={() => setIsNoticeDropdownOpen(false)}
                        >
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-50 to-amber-50 transition-transform group-hover:scale-110">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`} />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/guide/contact"
                className="cursor-pointer whitespace-nowrap rounded-lg bg-[#5C8D5A] px-6 py-3 font-semibold text-white transition-all hover:bg-[#4A7548]"
              >
                상담신청
              </Link>

              {/* 전체메뉴 버튼 */}
              <button
                onClick={() => setIsAllMenuOpen(true)}
                className="flex items-center gap-2 whitespace-nowrap rounded-lg border-2 border-[#5C8D5A] px-4 py-2.5 font-semibold text-[#5C8D5A] transition-all hover:bg-[#5C8D5A] hover:text-white"
                aria-label="전체메뉴 열기"
              >
                <i className="ri-menu-line text-xl" />
                <span>전체메뉴</span>
              </button>
            </div>

            {/* 모바일 햄버거 버튼 */}
            <button
              className="p-2 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <i className="ri-menu-line text-2xl text-gray-800" />
            </button>
          </div>
        </div>

        {/* 모바일 전체 오버레이 메뉴 */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
            {/* 모바일 메뉴 헤더 */}
            <div className="flex h-20 flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/images/logo.png" alt="요양센터 로고" className="h-12 w-auto" />
              </Link>
              <button className="p-2" onClick={() => setIsMobileMenuOpen(false)} aria-label="메뉴 닫기">
                <i className="ri-close-line text-3xl text-gray-800" />
              </button>
            </div>

            {/* 모바일 메뉴 콘텐츠 */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
              {/* Mobile 센터소개 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileIntroOpen(!mobileIntroOpen)}
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-lg font-semibold text-gray-800 hover:text-[#5C8D5A]"
                  aria-expanded={mobileIntroOpen}
                  aria-label="센터소개 메뉴 토글"
                >
                  <span>센터소개</span>
                  <i
                    className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                      mobileIntroOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileIntroOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileIntroOpen}
                >
                  <div className="space-y-3 border-l-2 border-[#5C8D5A]/30 pl-4 pt-2">
                    {introSubMenu.map((item: any) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 hover:text-[#5C8D5A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile 서비스안내 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-lg font-semibold text-gray-800 hover:text-[#5C8D5A]"
                  aria-expanded={mobileServicesOpen}
                  aria-label="서비스안내 메뉴 토글"
                >
                  <span>서비스안내</span>
                  <i
                    className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileServicesOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileServicesOpen}
                >
                  <div className="space-y-3 border-l-2 border-[#5C8D5A]/30 pl-4 pt-2">
                    {servicesSubMenu.map((item: any) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 hover:text-[#5C8D5A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile 시설안내 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileFacilityOpen(!mobileFacilityOpen)}
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-lg font-semibold text-gray-800 hover:text-[#5C8D5A]"
                  aria-expanded={mobileFacilityOpen}
                  aria-label="시설안내 메뉴 토글"
                >
                  <span>시설안내</span>
                  <i
                    className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                      mobileFacilityOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileFacilityOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileFacilityOpen}
                >
                  <div className="space-y-3 border-l-2 border-[#5C8D5A]/30 pl-4 pt-2">
                    {facilitySubMenu.map((item: any) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 hover:text-[#5C8D5A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile 이용안내 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileAdmissionOpen(!mobileAdmissionOpen)}
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-lg font-semibold text-gray-800 hover:text-[#5C8D5A]"
                  aria-expanded={mobileAdmissionOpen}
                  aria-label="이용안내 메뉴 토글"
                >
                  <span>이용안내</span>
                  <i
                    className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                      mobileAdmissionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileAdmissionOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileAdmissionOpen}
                >
                  <div className="space-y-3 border-l-2 border-[#5C8D5A]/30 pl-4 pt-2">
                    {admissionSubMenu.map((item: any) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 hover:text-[#5C8D5A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile 알림마당 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileNoticeOpen(!mobileNoticeOpen)}
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-lg font-semibold text-gray-800 hover:text-[#5C8D5A]"
                  aria-expanded={mobileNoticeOpen}
                  aria-label="알림마당 메뉴 토글"
                >
                  <span>알림마당</span>
                  <i
                    className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                      mobileNoticeOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileNoticeOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileNoticeOpen}
                >
                  <div className="space-y-3 border-l-2 border-[#5C8D5A]/30 pl-4 pt-2">
                    {noticeSubMenu.map((item: any) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 hover:text-[#5C8D5A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* 하단 버튼 영역 */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <Link
                  href="#contact"
                  className="block cursor-pointer rounded-xl bg-[#5C8D5A] px-6 py-4 text-center text-lg font-semibold text-white transition-all hover:bg-[#4A7548]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  상담신청
                </Link>

                {/* Mobile 전체메뉴 */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAllMenuOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#5C8D5A] px-6 py-4 text-lg font-semibold text-[#5C8D5A] transition-all hover:bg-[#5C8D5A] hover:text-white"
                >
                  <i className="ri-menu-line text-xl" />
                  <span>전체메뉴</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 전체메뉴 점보 네비게이션 박스 */}
      {isAllMenuOpen && (
        <>
          {/* 오버레이 배경 */}
          <div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsAllMenuOpen(false)}
            style={{
              animation: 'fadeIn 0.3s ease-out',
            }}
          />

          {/* 전체메뉴 박스 */}
          <div
            className="fixed left-1/2 top-1/2 z-[70] max-h-[85vh] w-[95%] max-w-[1400px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-2xl"
            style={{
              animation: 'slideUp 0.35s ease-out',
            }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsAllMenuOpen(false)}
              className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              aria-label="전체메뉴 닫기"
            >
              <i className="ri-close-line text-2xl text-gray-700" />
            </button>

            {/* 메뉴 그리드 - Desktop */}
            <div className="hidden gap-8 p-12 md:grid md:grid-cols-5">
              {allMenuData.map((category: any) => (
                <div key={category.title} className="space-y-4">
                  <h3 className="border-b-2 border-[#5C8D5A] pb-3 text-lg font-bold text-gray-900">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item: any) => (
                      <li key={item.name}>
                        <Link
                          href={item.path}
                          onClick={() => setIsAllMenuOpen(false)}
                          className="block cursor-pointer rounded-lg px-3 py-2 text-[15px] text-gray-700 transition-all hover:bg-[#f8f5e7] hover:text-[#5C8D5A]"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 메뉴 아코디언 - Mobile */}
            <div className="space-y-4 p-6 md:hidden">
              {allMenuData.map((category: any) => (
                <details key={category.title} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-gradient-to-br from-teal-50 to-amber-50 px-4 py-3">
                    <h3 className="text-base font-bold text-gray-900">{category.title}</h3>
                    <i className="ri-arrow-down-s-line text-xl text-gray-600 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
                    {category.items.map((item: any) => (
                      <li key={item.name}>
                        <Link
                          href={item.path}
                          onClick={() => setIsAllMenuOpen(false)}
                          className="block cursor-pointer py-2 text-sm text-gray-700 hover:text-[#5C8D5A]"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
