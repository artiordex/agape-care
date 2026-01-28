'use client';

import Link from 'next/link';

const FloatingSidebar = () => (
  <>
    {/* Desktop - 고정 사이드바 */}
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 space-y-0 lg:block">
      {/* 입소안내 버튼 */}
      <Link
        href="/guide/admission"
        className="flex h-16 w-44 cursor-pointer items-center gap-3 rounded-t-xl bg-[#8AA107] px-4 text-base font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#6f8605]"
        aria-label="입소안내 바로가기"
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="
                M5 3 H16
                C17.1 3 18 3.9 18 5
                V19
                C18 20.1 17.1 21 16 21
                H5
                C3.9 21 3 20.1 3 19
                V5
                C3 3.9 3.9 3 5 3 Z
              "
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span>입소안내</span>
      </Link>

      {/* 상담문의 버튼 */}
      <a
        href="/guide/contact"
        className="flex h-16 w-44 cursor-pointer items-center gap-3 rounded-b-xl bg-[#E59A00] px-4 text-base font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#c98200]"
        aria-label="상담문의 바로가기"
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="
                M20.84 4.61
                C19.5 3.28 17.76 2.5 15.93 2.5
                C12.18 2.5 9.13 5.55 9.13 9.3
                C9.13 10.31 9.36 11.29 9.8 12.18
                L2.5 19.48
                L4.52 21.5
                L11.82 14.2
                C12.71 14.64 13.69 14.87 14.7 14.87
                C18.45 14.87 21.5 11.82 21.5 8.07
                C21.5 6.24 20.72 4.5 19.39 3.17
                L20.84 4.61 Z
              "
              fill="white"
            />
            <path
              d="
                M14.7 5.5
                C13.18 5.5 11.9 6.62 11.65 8.08
                H13.18
                C13.41 7.45 14.01 7 14.7 7
                C15.59 7 16.32 7.73 16.32 8.62
                C16.32 9.31 15.87 9.91 15.24 10.14
                V11.67
                C16.7 11.42 17.82 10.14 17.82 8.62
                C17.82 6.9 16.42 5.5 14.7 5.5 Z
              "
              fill="white"
            />
          </svg>
        </div>
        <span>상담문의</span>
      </a>
    </div>

    {/* Mobile */}
    <div className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden">
      <Link
        href="/#admission"
        className="flex h-14 w-1/2 cursor-pointer items-center justify-center gap-2 bg-[#8AA107] text-[15px] font-semibold text-white transition-colors duration-300 active:bg-[#6f8605]"
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="
                M5 3 H16
                C17.1 3 18 3.9 18 5
                V19
                C18 20.1 17.1 21 16 21
                H5
                C3.9 21 3 20.1 3 19
                V5
                C3 3.9 3.9 3 5 3 Z
              "
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span>입소안내</span>
      </Link>

      <a
        href="tel:02-1234-5678"
        className="flex h-14 w-1/2 cursor-pointer items-center justify-center gap-2 bg-[#E59A00] text-[15px] font-semibold text-white transition-colors duration-300 active:bg-[#c98200]"
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="
                M20.84 4.61
                C19.5 3.28 17.76 2.5 15.93 2.5
                C12.18 2.5 9.13 5.55 9.13 9.3
                C9.13 10.31 9.36 11.29 9.8 12.18
                L2.5 19.48
                L4.52 21.5
                L11.82 14.2
                C12.71 14.64 13.69 14.87 14.7 14.87
                C18.45 14.87 21.5 11.82 21.5 8.07
                C21.5 6.24 20.72 4.5 19.39 3.17
                L20.84 4.61 Z
              "
              fill="white"
            />
            <path
              d="
                M14.7 5.5
                C13.18 5.5 11.9 6.62 11.65 8.08
                H13.18
                C13.41 7.45 14.01 7 14.7 7
                C15.59 7 16.32 7.73 16.32 8.62
                C16.32 9.31 15.87 9.91 15.24 10.14
                V11.67
                C16.7 11.42 17.82 10.14 17.82 8.62
                C17.82 6.9 16.42 5.5 14.7 5.5 Z
              "
              fill="white"
            />
          </svg>
        </div>
        <span>상담문의</span>
      </a>
    </div>
  </>
);

export default FloatingSidebar;
