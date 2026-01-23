'use client';

import Link from 'next/link';

export default function AllMenu({ data, close }: any) {
  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" onClick={close} />

      {/* box */}
      <div className="fixed left-1/2 top-1/2 z-[80] max-h-[85vh] w-[90%] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-10 shadow-xl">
        <button onClick={close} className="absolute right-6 top-6 rounded-full bg-gray-100 p-2">
          <i className="ri-close-line text-2xl"/>
        </button>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-5">
          {data.map((cat: any, i: number) => (
            <div key={i}>
              <h3 className="mb-4 border-b-2 border-[#5C8D5A] pb-2 text-lg font-bold">{cat.title}</h3>

              <ul className="space-y-2">
                {cat.items.map((item: any, j: number) => (
                  <li key={j}>
                    <Link href={item.path} onClick={close} className="block rounded px-2 py-2 hover:bg-teal-50">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
