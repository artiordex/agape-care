import { Link, useLocation } from 'react-router-dom';

export default function NoticeSidebar() {
  const location = useLocation();

  const noticeMenus = [
    {
      name: '공지사항',
      description: '센터의 주요 공지사항',
      icon: 'ri-megaphone-line',
      path: '/communities'
    },
    {
      name: '자유게시판',
      description: '보호자 소통 공간',
      icon: 'ri-chat-3-line',
      path: '/board'
    },
    {
      name: '갤러리',
      description: '활동 사진 모음',
      icon: 'ri-image-line',
      path: '/gallery'
    },
    {
      name: '식단표',
      description: '주간 영양 식단',
      icon: 'ri-restaurant-line',
      path: '/meal-plan'
    },
    {
      name: '프로그램 일정표',
      description: '월간 활동 일정',
      icon: 'ri-calendar-event-line',
      path: '/program-schedule'
    }
  ];

  return (
    <aside className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
      <div className="bg-gradient-to-br from-teal-500 to-emerald-500 px-6 py-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <i className="ri-notification-3-line"></i>
          알림마당
        </h2>
      </div>

      <nav className="p-4" role="navigation" aria-label="알림마당 메뉴">
        <ul className="space-y-2">
          {noticeMenus.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            
            return (
              <li key={index}>
                <Link
                  to={menu.path}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-br from-teal-50 to-emerald-50 border-l-4 border-teal-600 shadow-sm'
                      : 'hover:bg-gray-50 hover:shadow-sm border-l-4 border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600 group-hover:scale-110'
                  }`}>
                    <i className={`${menu.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold mb-1 transition-colors ${
                      isActive ? 'text-teal-600' : 'text-gray-900 group-hover:text-teal-600'
                    }`}>
                      {menu.name}
                    </div>
                    <div className="text-xs text-gray-500 leading-relaxed">
                      {menu.description}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-700 mb-3">
            궁금하신 사항이 있으신가요?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all cursor-pointer"
          >
            <i className="ri-phone-line"></i>
            <span>상담 신청하기</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
