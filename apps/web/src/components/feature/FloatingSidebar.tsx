import { Link } from 'react-router-dom';

export default function FloatingSidebar() {
  return (
    <>
      {/* Desktop - 고정 사이드바 */}
      <div className="hidden lg:block fixed right-4 top-[40%] z-40 space-y-0">
        {/* 입소안내 버튼 */}
        <Link
          to="/#admission"
          className="flex items-center gap-3 w-44 h-16 bg-[#8AA107] hover:bg-[#9BB418] text-white font-semibold text-base rounded-t-xl shadow-lg transition-all duration-300 hover:scale-105 px-4 cursor-pointer"
          role="button"
          aria-label="입소안내 바로가기"
          tabIndex={0}
        >
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 11L12 14L22 4" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
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
          className="flex items-center gap-3 w-44 h-16 bg-[#E59A00] hover:bg-[#F3A500] text-white font-semibold text-base rounded-b-xl shadow-lg transition-all duration-300 hover:scale-105 px-4 cursor-pointer"
          role="button"
          aria-label="상담문의 바로가기"
          tabIndex={0}
        >
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20.84 4.61C19.5 3.28 17.76 2.5 15.93 2.5C12.18 2.5 9.13 5.55 9.13 9.3C9.13 10.31 9.36 11.29 9.8 12.18L2.5 19.48L4.52 21.5L11.82 14.2C12.71 14.64 13.69 14.87 14.7 14.87C18.45 14.87 21.5 11.82 21.5 8.07C21.5 6.24 20.72 4.5 19.39 3.17L20.84 4.61ZM14.7 13.37C11.96 13.37 9.63 11.04 9.63 8.3C9.63 5.56 11.96 3.23 14.7 3.23C17.44 3.23 19.77 5.56 19.77 8.3C19.77 11.04 17.44 13.37 14.7 13.37Z" 
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

        {/* 입소자 관리 */}
        <button
          className="w-full flex items-center transition-all duration-200 cursor-pointer px-4 py-3 gap-3 text-gray-700 hover:bg-gray-50"
          aria-label="입소자 관리"
          onClick={() => window.REACT_APP_NAVIGATE('/admin/dashboard?tab=resident')}
        >
          <div className="flex items-center justify-center">
            <i className="ri-user-heart-line text-xl flex-shrink-0 w-6"></i>
          </div>
          <span className="font-medium whitespace-nowrap">입소자 관리</span>
        </button>
      </div>

      {/* Mobile - 하단 고정 버튼 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex">
        {/* 입소안내 버튼 */}
        <Link
          to="/#admission"
          className="flex items-center justify-center gap-2 w-1/2 h-14 bg-[#8AA107] active:bg-[#9BB418] text-white font-semibold text-[15px] cursor-pointer"
          role="button"
          aria-label="입소안내 바로가기"
          tabIndex={0}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 11L12 14L22 4" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
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
          href="tel:02-1234-5678"
          className="flex items-center justify-center gap-2 w-1/2 h-14 bg-[#E59A00] active:bg-[#F3A500] text-white font-semibold text-[15px] cursor-pointer"
          role="button"
          aria-label="상담문의 전화걸기"
          tabIndex={0}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20.84 4.61C19.5 3.28 17.76 2.5 15.93 2.5C12.18 2.5 9.13 5.55 9.13 9.3C9.13 10.31 9.36 11.29 9.8 12.18L2.5 19.48L4.52 21.5L11.82 14.2C12.71 14.64 13.69 14.87 14.7 14.87C18.45 14.87 21.5 11.82 21.5 8.07C21.5 6.24 20.72 4.5 19.39 3.17L20.84 4.61ZM14.7 13.37C11.96 13.37 9.63 11.04 9.63 8.3C9.63 5.56 11.96 3.23 14.7 3.23C17.44 3.23 19.77 5.56 19.77 8.3C19.77 11.04 17.44 13.37 14.7 13.37Z" 
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
}