/**
 * Description : Breadcrumb.tsx - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { readonly items: Crumb[] }) {
  return (
    <div className="mx-auto max-w-[90%] px-4 py-5">
      <div className="flex items-center gap-2 py-4 text-sm text-gray-600">
        {items.map((item, index) => (
          <span key={item.label} className="flex items-center gap-2">
            {/* 첫 번째 뎁스만 링크 */}
            {index === 0 && item.href ? (
              <Link href={item.href} className="transition hover:text-gray-800">
                {item.label}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? 'font-semibold text-gray-800' : 'text-gray-700'}>
                {item.label}
              </span>
            )}

            {index < items.length - 1 && <i className="ri-arrow-right-s-line text-gray-400" />}
          </span>
        ))}
      </div>
    </div>
  );
}
