/**
 * Description : AllMenu.tsx - 📌 Agape-Care 전체 메뉴 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import Link from 'next/link';

interface AllMenuProps {
  data: {
    title: string;
    items: { name: string; path: string }[];
  }[];
  close: () => void;
}

export default function AllMenu({ data, close }: AllMenuProps) {
  return (
    <div className="fixed inset-0 z-[70]">
      {/* overlay */}
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 h-full w-full cursor-default border-none bg-black/40 outline-none backdrop-blur-sm"
        onClick={close}
      />

      {/* box */}
      <div className="absolute left-1/2 top-1/2 z-[80] max-h-[85vh] w-[90%] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-10 shadow-xl">
        <button
          onClick={close}
          className="absolute right-6 top-6 rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
        >
          <i className="ri-close-line text-2xl" />
        </button>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-5">
          {data.map(cat => (
            <div key={cat.title}>
              <h3 className="mb-4 border-b-2 border-[#5C8D5A] pb-2 text-lg font-bold">
                {cat.title}
              </h3>

              <ul className="space-y-2">
                {cat.items.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      onClick={close}
                      className="block rounded px-2 py-2 transition hover:bg-teal-50 hover:text-[#5C8D5A]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
