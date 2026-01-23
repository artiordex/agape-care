'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import menu from '@/data/menu.json';

export default function NoticeSidebar() {
  const pathname = usePathname();

  // 공통 메뉴 데이터에서 알림마당 메뉴만 가져오기
  const noticeMenus = menu.noticeSubMenu;

  return (
    <aside className="sticky top-24 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm lg:w-80">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 to-emerald-500 px-6 py-5">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <i className="ri-notification-3-line" />
          알림마당
        </h2>
      </div>

      {/* Menu List */}
      <nav className="p-4" role="navigation" aria-label="알림마당 메뉴">
        <ul className="space-y-2">
          {noticeMenus.map((menu, index) => {
            const isActive = pathname === menu.path;

            return (
              <li key={index}>
                <Link
                  href={menu.path}
                  className={`group flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-all duration-300 ${
                    isActive
                      ? 'border-l-4 border-teal-600 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-sm'
                      : 'border-l-4 border-transparent hover:bg-gray-50 hover:shadow-sm'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* icon */}
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition-all ${
                      isActive
                        ? 'bg-teal-600 text-white'
                        : 'bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600 group-hover:scale-110'
                    }`}
                  >
                    <i className={`${menu.icon} text-2xl`} />
                  </div>

                  {/* text */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`mb-1 text-sm font-semibold transition-colors ${
                        isActive ? 'text-teal-600' : 'text-gray-900 group-hover:text-teal-600'
                      }`}
                    >
                      {menu.name}
                    </div>

                    <div className="text-xs leading-relaxed text-gray-500">{menu.description}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* CTA */}
      <div className="border-t border-gray-100 bg-gradient-to-br from-teal-50 to-emerald-50 p-6">
        <div className="text-center">
          <p className="mb-3 text-sm text-gray-700">궁금하신 사항이 있으신가요?</p>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white transition-all hover:bg-teal-700"
          >
            <i className="ri-phone-line" />
            상담 신청하기
          </a>
        </div>
      </div>
    </aside>
  );
}
