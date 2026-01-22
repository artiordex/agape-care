import { Link, useLocation } from 'react-router-dom';

export default function ServiceSidebar() {
  const location = useLocation();

  const services = [
    {
      name: '인지관리프로그램',
      description: '기억력 향상 프로그램',
      icon: 'ri-brain-line',
      path: '/services/cognitive-program'
    },
    {
      name: '여가활동 프로그램',
      description: '즐거운 여가 활동',
      icon: 'ri-music-2-line',
      path: '/services/leisure-program'
    },
    {
      name: '의료지원간호서비스',
      description: '24시간 의료 지원',
      icon: 'ri-heart-pulse-line',
      path: '/services/medical-nursing'
    },
    {
      name: '재활치료서비스',
      description: '체계적인 재활 치료',
      icon: 'ri-wheelchair-line',
      path: '/services/rehabilitation'
    },
    {
      name: '단계별 맞춤 케어',
      description: '개인별 단계 케어',
      icon: 'ri-shield-star-line',
      path: '/services/step-care-program'
    },
    {
      name: '영양관리',
      description: '맞춤형 영양 식단',
      icon: 'ri-restaurant-line',
      path: '/services/nutrition-care'
    },
    {
      name: '입소절차안내',
      description: '입소 절차 상세 안내',
      icon: 'ri-file-list-3-line',
      path: '/services/admission-process'
    },
    {
      name: '가족소통·상담지원',
      description: '가족과 함께하는 케어',
      icon: 'ri-parent-line',
      path: '/services/family-support'
    }
  ];

  return (
    <aside className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
      <div className="bg-gradient-to-br from-teal-500 to-amber-500 px-6 py-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <i className="ri-service-line"></i>
          서비스안내
        </h2>
      </div>

      <nav className="p-4" role="navigation" aria-label="서비스 메뉴">
        <ul className="space-y-2">
          {services.map((service, index) => {
            const isActive = location.pathname === service.path;
            
            return (
              <li key={index}>
                <Link
                  to={service.path}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-br from-teal-50 to-amber-50 border-l-4 border-[#5C8D5A] shadow-sm'
                      : 'hover:bg-gray-50 hover:shadow-sm border-l-4 border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#5C8D5A] text-white'
                      : 'bg-gradient-to-br from-teal-50 to-amber-50 text-[#5C8D5A] group-hover:scale-110'
                  }`}>
                    <i className={`${service.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold mb-1 transition-colors ${
                      isActive ? 'text-[#5C8D5A]' : 'text-gray-900 group-hover:text-[#5C8D5A]'
                    }`}>
                      {service.name}
                    </div>
                    <div className="text-xs text-gray-500 leading-relaxed">
                      {service.description}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 bg-gradient-to-br from-teal-50 to-amber-50 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-700 mb-3">
            서비스에 대해 궁금하신가요?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#5C8D5A] text-white rounded-lg font-semibold hover:bg-[#4A7548] transition-all cursor-pointer"
          >
            <i className="ri-phone-line"></i>
            <span>상담 신청하기</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
