/**
 * Description : NoticeSidebar.tsx - 📌 Agape-Care 알림마당 사이드바 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import menu from '@/data/menu.json';

export default function NoticeSidebar() {
  const pathname = usePathname();
  const noticeMenus = menu.noticeSubMenu;
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="w-full lg:w-72">
      <div
        className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ${
          isSticky ? 'lg:sticky lg:top-24' : ''
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-100 bg-gradient-to-br from-teal-50 to-amber-50 px-6 py-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <i className="ri-notification-3-line text-[#5C8D5A]" />알림마당
          </h2>
        </div>

        {/* Menu List */}
        <nav className="p-4" role="navigation" aria-label="알림마당 메뉴">
          <ul className="space-y-2">
            {noticeMenus.map(item => {
              const isActive = pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group flex cursor-pointer items-start gap-4 rounded-lg border px-4 py-3 transition-all ${
                      isActive
                        ? 'border-[#5C8D5A] bg-gradient-to-br from-teal-50 to-amber-50 shadow-sm'
                        : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {/* icon */}
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-xl transition-all ${
                        isActive ? 'bg-[#5C8D5A] text-white' : 'bg-gray-50 text-[#5C8D5A] group-hover:bg-teal-50'
                      }`}
                    >
                      <i className={item.icon} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div
                        className={`mb-1 text-sm font-semibold transition-colors ${
                          isActive ? 'text-[#5C8D5A]' : 'text-gray-900 group-hover:text-[#5C8D5A]'
                        }`}
                      >
                        {item.name}
                      </div>

                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Info */}
        <div className="border-t border-gray-100 bg-gray-50 p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-white p-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                <i className="ri-time-line text-lg text-[#5C8D5A]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">면회시간</div>
                <div className="text-sm font-semibold text-gray-900">평일 10:00-17:00</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white p-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                <i className="ri-phone-line text-lg text-[#5C8D5A]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">대표번호</div>
                <div className="text-sm font-semibold text-gray-900">02-1234-5678</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-gray-100 bg-white p-4">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium text-gray-700">궁금하신 사항이 있으신가요?</p>
            <Link
              href="/guide/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#5C8D5A] px-4 py-3 font-semibold text-white transition-all hover:bg-[#4A7548]"
            >
              <i className="ri-customer-service-line" />상담 신청하기
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
