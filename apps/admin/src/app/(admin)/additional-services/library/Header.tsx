/**
 * Description : Header.tsx - ?? Header UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly onUpload: () => void;
}

/**
 * [Header] 자료실 헤더
 */
export default function Header({ onUpload }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-folder-open-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">시스템 자료실</h1>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[12px] font-bold text-[#5C8D5A]">운영 서식 및 업무 관련 자료 공용 관리</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">CENTRAL DOCUMENT LIBRARY</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onUpload}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-upload-2-line text-sm"></i>새 자료 업로드
        </button>
      </div>
    </div>
  );
}
