import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#F5F3EE] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img
              src="https://public.readdy.ai/ai/img_res/48e38bd6-8359-445e-830a-806edba46b51.png"
              alt="요양센터 로고"
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              가족을 돌보는 마음으로
              <br />
              안전하고 따뜻하게 모십니다
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">빠른 메뉴</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/intro"
                  className="text-sm text-gray-600 hover:text-[#5C8D5A] transition-colors cursor-pointer"
                >
                  센터소개
                </Link>
              </li>
              <li>
                <Link
                  to="/facility"
                  className="text-sm text-gray-600 hover:text-[#5C8D5A] transition-colors cursor-pointer"
                >
                  시설안내
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">고객센터</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">
                <i className="ri-phone-line mr-2 text-[#5C8D5A]"></i>
                02-1234-5678
              </li>
              <li className="text-sm text-gray-600">
                <i className="ri-time-line mr-2 text-[#5C8D5A]"></i>
                평일 09:00 - 18:00
              </li>
              <li className="text-sm text-gray-600">
                <i className="ri-mail-line mr-2 text-[#5C8D5A]"></i>
                contact@nursingcare.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">오시는 길</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              서울특별시 강남구 테헤란로 123
              <br />
              요양센터빌딩 2층
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E1D8]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 요양센터. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-sm text-gray-500 hover:text-[#5C8D5A] transition-colors cursor-pointer"
              >
                개인정보처리방침
              </a>
              <a
                href="https://readdy.ai/?ref=logo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-[#5C8D5A] transition-colors cursor-pointer"
              >
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}