/**
 * Description : MobileNavbar.tsx - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type SubMenuItem = {
  name: string;
  path: string;
  icon?: string;
};

type MenuSection = {
  key: string;
  title: string;
  items: SubMenuItem[];
};

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;

  introSubMenu: SubMenuItem[];
  servicesSubMenu: SubMenuItem[];
  facilitySubMenu: SubMenuItem[];
  admissionSubMenu: SubMenuItem[];
  noticeSubMenu: SubMenuItem[];

  onOpenAllMenu: () => void;
}

export default function MobileNavbar({
  isOpen,
  onClose,
  introSubMenu,
  servicesSubMenu,
  facilitySubMenu,
  admissionSubMenu,
  noticeSubMenu,
  onOpenAllMenu,
}: MobileNavbarProps) {
  // 아코디언 상태를 객체 하나로 관리
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 모바일 닫히면 아코디언 초기화
  useEffect(() => {
    if (!isOpen) {
      setOpenSections({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 모바일 메뉴 섹션 정의
  const menuSections: MenuSection[] = [
    { key: 'intro', title: '센터소개', items: introSubMenu },
    { key: 'services', title: '서비스안내', items: servicesSubMenu },
    { key: 'facility', title: '시설안내', items: facilitySubMenu },
    { key: 'admission', title: '이용안내', items: admissionSubMenu },
    { key: 'notice', title: '알림마당', items: noticeSubMenu },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
      {/* 모바일 헤더 */}
      <div className="flex h-20 flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-4" onClick={onClose}>
          <img src="/images/logo.png" alt="아가페 요양원 로고" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-[#5C8D5A]">아가페 요양원</span>
        </Link>

        <button className="p-2" onClick={onClose} aria-label="메뉴 닫기">
          <i className="ri-close-line text-3xl text-gray-800" />
        </button>
      </div>

      {/* 모바일 메뉴 콘텐츠 */}
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
        {menuSections.map(section => {
          const isOpenSection = openSections[section.key];

          return (
            <div key={section.key} className="space-y-3">
              {/* 상위 버튼 */}
              <button
                onClick={() => toggleSection(section.key)}
                className="flex w-full items-center justify-between py-3 text-lg font-semibold text-gray-800 hover:text-[#5C8D5A]"
              >
                <span>{section.title}</span>
                <i
                  className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                    isOpenSection ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* 아코디언 영역 */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpenSection ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 border-l-2 border-[#5C8D5A]/30 pl-4 pt-2">
                  {section.items.map(item => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 hover:text-[#5C8D5A]"
                    >
                      {item.icon && <i className={`${item.icon} text-xl`} />}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* 하단 버튼 영역 */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <Link
            href="#contact"
            onClick={onClose}
            className="block rounded-xl bg-[#5C8D5A] px-6 py-4 text-center text-lg font-semibold text-white transition-all hover:bg-[#4A7548]"
          >
            상담신청
          </Link>

          <button
            onClick={() => {
              onClose();
              onOpenAllMenu();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#5C8D5A] px-6 py-4 text-lg font-semibold text-[#5C8D5A] transition-all hover:bg-[#5C8D5A] hover:text-white"
          >
            <i className="ri-menu-line text-xl" />
            <span>전체메뉴</span>
          </button>
        </div>
      </div>
    </div>
  );
}
