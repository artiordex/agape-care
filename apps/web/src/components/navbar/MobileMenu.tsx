'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu({ close, openAll, menus }: any) {
  const [open, setOpen] = useState({
    intro: false,
    services: false,
    facility: false,
    admission: false,
    notice: false,
  });

  const toggle = (key: string) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-white lg:hidden">
      {/* header */}
      <div className="flex h-20 items-center justify-between border-b px-5">
        <Link href="/" onClick={close}>
          <img src="https://public.readdy.ai/ai/img_res/48e38bd6-8359-445e-830a-806edba46b51.png" className="h-12" />
        </Link>
        <button onClick={close}>
          <i className="ri-close-line text-3xl"/>
        </button>
      </div>

      <div className="space-y-6 px-6 py-6">
        {/* categories */}
        {Object.entries(menus).map(([key, items]: any) => (
          <div key={key}>
            <button
              onClick={() => toggle(key)}
              className="flex w-full items-center justify-between py-3 text-lg font-semibold"
            >
              <span>
                {
                  {
                    introSubMenu: '센터소개',
                    servicesSubMenu: '서비스안내',
                    facilitySubMenu: '시설안내',
                    admissionSubMenu: '이용안내',
                    noticeSubMenu: '알림마당',
                  }[key]
                }
              </span>
              <i className={`ri-arrow-down-s-line text-2xl transition ${open[key] ? 'rotate-180' : ''}`} />
            </button>

            {/* items */}
            {open[key] && (
              <div className="space-y-2 border-l border-gray-300 pl-4 pt-2">
                {items.map((item: any, i: number) => (
                  <Link key={i} href={item.path} onClick={close} className="flex items-center gap-2 py-3 text-gray-700">
                    <i className={`${item.icon} text-xl`} />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* bottom buttons */}
        <div className="space-y-4 border-t pt-6">
          <Link
            href="#contact"
            className="block rounded-lg bg-[#5C8D5A] py-3 text-center text-lg font-semibold text-white"
            onClick={close}
          >
            상담신청
          </Link>

          <button
            onClick={() => {
              close();
              openAll();
            }}
            className="w-full rounded-lg border-2 border-[#5C8D5A] py-3 text-lg font-semibold text-[#5C8D5A]"
          >
            전체메뉴
          </button>
        </div>
      </div>
    </div>
  );
}
