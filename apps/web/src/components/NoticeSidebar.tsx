'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import menu from '@/data/menu.json';

export default function NoticeSidebar() {
  const pathname = usePathname();
  const noticeMenus = menu.noticeSubMenu;

  return (
    <aside className="sticky top-24 w-full overflow-hidden rounded-xl border border-gray-200 bg-white lg:w-72">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-6 py-5">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
          <i className="ri-notification-3-line text-teal-600" />알림마당
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
                      ? 'border-teal-600 bg-teal-50 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                  } `}
                >
                  {/* icon */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border text-xl transition-all ${
                      isActive
                        ? 'border-teal-600 bg-teal-600 text-white'
                        : 'border-gray-200 bg-gray-50 text-teal-600 group-hover:border-teal-500 group-hover:text-teal-600'
                    } `}
                  >
                    <i className={item.icon} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`mb-1 text-sm font-semibold transition-colors ${isActive ? 'text-teal-700' : 'text-gray-900 group-hover:text-teal-700'} `}
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

      {/* CTA */}
      <div className="border-t border-gray-100 bg-gray-50 p-6">
        <div className="text-center">
          <p className="mb-3 text-sm text-gray-700">궁금하신 사항이 있으신가요?</p>
          <a
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white transition-all hover:bg-teal-700"
          >
            <i className="ri-phone-line" />상담 신청하기
          </a>
        </div>
      </div>
    </aside>
  );
}
