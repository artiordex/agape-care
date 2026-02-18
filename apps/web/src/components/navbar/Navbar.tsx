/**
 * Description : Navbar.tsx - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import menu from '@/data/menu.json';
import MobileNavbar from '@/components/navbar/MobileNavbar';
import AllMenu from '@/components/navbar/AllMenu';

type SubMenuItem = {
  name: string;
  path: string;
  icon?: string;
  description?: string;
};

type AllMenuCategory = {
  title: string;
  items: { name: string; path: string }[];
};

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { introSubMenu, servicesSubMenu, facilitySubMenu, admissionSubMenu, noticeSubMenu, allMenuData } =
    menu as unknown as {
      introSubMenu: SubMenuItem[];
      servicesSubMenu: SubMenuItem[];
      facilitySubMenu: SubMenuItem[];
      admissionSubMenu: SubMenuItem[];
      noticeSubMenu: SubMenuItem[];
      allMenuData: AllMenuCategory[];
    };

  const desktopMenus = [
    { key: 'intro', label: '기관소개', items: introSubMenu },
    { key: 'services', label: '서비스안내', items: servicesSubMenu },
    { key: 'facility', label: '시설안내', items: facilitySubMenu, link: '/facility' },
    { key: 'admission', label: '이용안내', items: admissionSubMenu },
    { key: 'notice', label: '알림마당', items: noticeSubMenu },
  ];

  const closeAllDropdowns = () => setOpenDropdown(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeAllDropdowns();
  }, [pathname]);

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

  const isInSubmenu = (submenu: SubMenuItem[]) =>
    submenu.some(item => pathname === item.path || pathname.startsWith(item.path + '/'));

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm lg:bg-white/95 lg:backdrop-blur-sm'
        }`}
      >
        {/* 80% 폭 적용 */}
        <div className="mx-auto w-[90%] max-w-[1600px]">
          <div className="flex h-20 items-center justify-between">
            {/* 로고 */}
            <Link href="/" className="flex items-center gap-4" onClick={closeAllDropdowns}>
              <img src="/images/logo.png" alt="아가페 요양원 로고" className="h-12 w-auto" />
              <span className="text-2xl font-bold text-[#5C8D5A]">아가페 요양원</span>
            </Link>

            {/* 데스크탑 메뉴 (여백 확장) */}
            <div className="hidden items-center gap-7 lg:flex">
              {desktopMenus.map(menu => {
                const isOpen = openDropdown === menu.key;
                const isActive = isInSubmenu(menu.items);

                return (
                  <div key={menu.key}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(menu.key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {menu.link ? (
                      <Link
                        href={menu.link}
                        className={`text-[18px] font-semibold tracking-wide ${
                          isActive ? 'text-[#5C8D5A]' : 'text-gray-800 hover:text-[#5C8D5A]'
                        }`}
                      >
                        {menu.label}
                      </Link>
                    ) : (
                      <button
                        className={`text-[18px] font-semibold tracking-wide ${
                          isActive ? 'text-[#5C8D5A]' : 'text-gray-800 hover:text-[#5C8D5A]'
                        }`}
                      >
                        {menu.label}
                      </button>
                    )}

                    {/* 드롭다운 */}
                    <div
                      className={`absolute left-1/2 top-full mt-4 w-[260px] -translate-x-1/2 rounded-xl border bg-white shadow-xl transition-all duration-200 ${
                        isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <div className="space-y-2 p-4">
                        {menu.items.map(item => (
                          <Link
                            key={item.name}
                            href={item.path}
                            onClick={closeAllDropdowns}
                            className="flex items-start gap-3 rounded-lg p-3 hover:bg-teal-50"
                          >
                            {item.icon && (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
                                <i className={`${item.icon} text-xl text-[#5C8D5A]`} />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 상담신청 */}
              <Link
                href="/guide/contact"
                className="rounded-lg bg-[#5C8D5A] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#4A7548]"
              >
                상담신청
              </Link>

              {/* 전체메뉴 */}
              <button
                onClick={() => setIsAllMenuOpen(true)}
                className="flex items-center gap-2 rounded-lg border-2 border-[#5C8D5A] px-5 py-2.5 font-semibold text-[#5C8D5A] transition hover:bg-[#5C8D5A] hover:text-white"
              >
                <i className="ri-menu-line text-xl" />
                <span>전체메뉴</span>
              </button>
            </div>

            {/* 모바일 버튼 */}
            <button className="p-2 lg:hidden" onClick={() => setIsMobileMenuOpen(v => !v)}>
              <i className="ri-menu-line text-2xl text-gray-800" />
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <MobileNavbar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          introSubMenu={introSubMenu}
          servicesSubMenu={servicesSubMenu}
          facilitySubMenu={facilitySubMenu}
          admissionSubMenu={admissionSubMenu}
          noticeSubMenu={noticeSubMenu}
          onOpenAllMenu={() => setIsAllMenuOpen(true)}
        />
      </nav>

      {/* AllMenu 적용 */}
      {isAllMenuOpen && <AllMenu data={allMenuData} close={() => setIsAllMenuOpen(false)} />}
    </>
  );
}
