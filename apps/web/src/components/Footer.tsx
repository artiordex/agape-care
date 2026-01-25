'use client';

import Link from 'next/link';

const Footer = () => (
  <footer className="border-t border-[#E5E1D8] bg-[#F5F3EE]">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="https://public.readdy.ai/ai/img_res/48e38bd6-8359-445e-830a-806edba46b51.png"
            alt="요양센터 로고"
            className="mb-4 h-12 w-auto"
          />
          <p className="text-sm leading-relaxed text-gray-600">
            가족을 돌보는 마음으로
            <br />
            안전하고 따뜻하게 모십니다
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-gray-800">빠른 메뉴</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/intro"
                className="cursor-pointer text-sm text-gray-600 transition-colors hover:text-[#5C8D5A]"
              >
                센터소개
              </Link>
            </li>
            <li>
              <Link
                href="/facility"
                className="cursor-pointer text-sm text-gray-600 transition-colors hover:text-[#5C8D5A]"
              >
                시설안내
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-gray-800">고객센터</h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600">
              <i className="ri-phone-line mr-2 text-[#5C8D5A]" />
              02-1234-5678
            </li>
            <li className="text-sm text-gray-600">
              <i className="ri-time-line mr-2 text-[#5C8D5A]" />
              평일 09:00 - 18:00
            </li>
            <li className="text-sm text-gray-600">
              <i className="ri-mail-line mr-2 text-[#5C8D5A]" />
              contact@nursingcare.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-gray-800">오시는 길</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            서울특별시 강남구 테헤란로 123
            <br />
            요양센터빌딩 2층
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-[#E5E1D8] pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">© 2026 아가페 요양원. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="cursor-pointer text-sm text-gray-500 transition-colors hover:text-[#5C8D5A]"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
