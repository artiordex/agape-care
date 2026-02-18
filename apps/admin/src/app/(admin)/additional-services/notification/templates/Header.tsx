/**
 * Description : Header.tsx - ?? Header UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly onCreate: () => void;
}

/**
 * [Header] 알림 템플릿 관리 헤더
 */
export default function Header({ onCreate }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-layout-masonry-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">알림 템플릿 관리</h1>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[12px] font-bold text-[#5C8D5A]">카카오 알림톡 및 문자 템플릿 설정</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              NOTIFICATION TEMPLATE SETTINGS
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCreate}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-sm"></i>새 템플릿 등록
        </button>
      </div>
    </div>
  );
}
