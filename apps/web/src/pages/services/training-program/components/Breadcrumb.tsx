import { Link } from 'react-router-dom';

export default function Breadcrumb() {
  return (
    <nav className="bg-gradient-to-br from-teal-50 to-amber-50 py-4 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="text-gray-600 hover:text-[#5C8D5A] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="ri-home-4-line"></i>
              <span>홈</span>
            </Link>
          </li>
          <li>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
          </li>
          <li>
            <span className="text-gray-600">서비스 안내</span>
          </li>
          <li>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
          </li>
          <li>
            <span className="text-[#5C8D5A] font-semibold">보육훈련 3단계 프로그램</span>
          </li>
        </ol>
      </div>
    </nav>
  );
}