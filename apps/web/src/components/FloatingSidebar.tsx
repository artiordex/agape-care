'use client';

import Link from 'next/link';

const FloatingSidebar = () => (
  <>
    {/* Desktop - 고정 사이드바 */}
    <div className="fixed right-4 top-[40%] z-40 hidden space-y-0 lg:block">
      {/* 입소안내 버튼 */}
      <Link
        href="/#admission"
        className="flex h-16 w-44 cursor-pointer items-center gap-3 rounded-t-xl bg-[#8AA107] px-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#9BB418]"
        aria-label="입소안내 바로가기"
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
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
        href="#contact"
        className="flex h-16 w-44 cursor-pointer items-center gap-3 rounded-b-xl bg-[#E59A00] px-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#F3A500]"
        aria-label="상담문의 바로가기"
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.84 4.61C19.5 3.28 17.76 2.5 15.93 2.5C12.18 2.5 9.13 5.55 9.13 9.3C9.13 10.31 9.36 11.29 9.8 12.18L2.5 19.48L4.52 21.5L11.82 14.2C12.71 14.64 13.69 14.87 14.7 14.87C18.45 14.87 21.5 11.82 21.5 8.07C21.5 6.24 20.72 4.5 19.39 3.17L20.84 4.61Z"
              fill="white"
            />
            <path
              d="M14.7 5.5C13.18 5.5 11.9 6.62 11.65 8.08H13.18C13.41 7.45 14.01 7 14.7 7C15.59 7 16.32 7.73 16.32 8.62C16.32 9.31 15.87 9.91 15.24 10.14V11.67C16.7 11.42 17.82 10.14 17.82 8.62C17.82 6.9 16.42 5.5 14.7 5.5Z"
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
        className="flex h-14 w-1/2 cursor-pointer items-center justify-center gap-2 bg-[#8AA107] text-[15px] font-semibold text-white active:bg-[#9BB418]"
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
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
        className="flex h-14 w-1/2 cursor-pointer items-center justify-center gap-2 bg-[#E59A00] text-[15px] font-semibold text-white active:bg-[#F3A500]"
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.84 4.61C19.5 3.28 17.76 2.5 15.93 2.5C12.18 2.5 9.13 5.55 9.13 9.3C9.13 10.31 9.36 11.29 9.8 12.18L2.5 19.48L4.52 21.5L11.82 14.2C12.71 14.64 13.69 14.87 14.7 14.87C18.45 14.87 21.5 11.82 21.5 8.07C21.5 6.24 20.72 4.5 19.39 3.17L20.84 4.61Z"
              fill="white"
            />
            <path
              d="M14.7 5.5C13.18 5.5 11.9 6.62 11.65 8.08H13.18C13.41 7.45 14.01 7 14.7 7C15.59 7 16.32 7.73 16.32 8.62C16.32 9.31 15.87 9.91 15.24 10.14V11.67C16.7 11.42 17.82 10.14 17.82 8.62C17.82 6.9 16.42 5.5 14.7 5.5Z"
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
