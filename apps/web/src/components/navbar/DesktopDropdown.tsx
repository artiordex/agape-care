import Link from 'next/link';

export default function DesktopDropdown({ visible, items, showMore = false }: any) {
  return (
    <div
      className={`absolute left-1/2 top-full mt-3 w-[260px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ${
        visible ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      }`}
    >
      <div className="p-4">
        <div className="flex flex-col gap-3">
          {items.map((item: any, i: number) => (
            <Link key={i} href={item.path} className="group flex items-start gap-3 rounded-lg p-3 hover:bg-teal-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
                <i className={`${item.icon} text-xl text-[#5C8D5A]`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#5C8D5A]">{item.name}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {showMore && (
          <div className="mt-3 border-t pt-3 text-center">
            <Link href="#services" className="text-sm font-semibold text-[#5C8D5A]">
              전체 서비스 보기 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
