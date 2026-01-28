'use client';

import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function HeroBreadcrumb({ items }: { readonly items: Crumb[] }) {
  return (
    <div className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-2 py-4 text-sm text-gray-600">
          {items.map((item, index) => (
            <span key={item.label} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-gray-800">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-gray-800">{item.label}</span>
              )}

              {index < items.length - 1 && <i className="ri-arrow-right-s-line text-gray-400" />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
