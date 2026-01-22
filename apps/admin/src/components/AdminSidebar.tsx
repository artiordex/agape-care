import { useState, useEffect } from 'react';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  path?: string;
  children?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  isGroup?: boolean;
  parentGroup?: string;
}

interface AdminSidebarProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

// 권한 기반 메뉴 접근 규칙
const MENU_PERMISSIONS = {
  dashboard: ['superAdmin', 'director', 'manager', 'accountant', 'nurse', 'caregiver', 'viewer'],
  resident: ['superAdmin', 'director', 'manager', 'nurse', 'caregiver'],
  care: ['superAdmin', 'director', 'manager', 'nurse', 'caregiver'],
  staff: ['superAdmin', 'director', 'manager'],
  accounting: ['superAdmin', 'director', 'manager', 'accountant'],
  content: ['superAdmin', 'director', 'manager'],
  settings: ['superAdmin', 'director']
};

// 메뉴 데이터 구조
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    icon: 'ri-dashboard-line',
    label: '대시보드',
    path: 'dashboard'
  },
  {
    id: 'beneficiary',
    icon: 'ri-user-heart-line',
    label: '수급자 관리',
    children: [
      { id: 'beneficiary-list', label: '수급자 목록', path: 'beneficiary-list' },
      { id: 'beneficiary-new', label: '수급자 신규등록', path: 'beneficiary-new' },
      { id: 'outing-management', label: '외출/외박 관리', path: 'outing-management' },
      { id: 'billing-copay', label: '청구/본인부담금', path: 'billing-copay' },
      { id: 'consultation-management', label: '상담일지/면담일지', path: 'consultation-management' }
    ]
  },
  {
    id: 'care',
    icon: 'ri-heart-pulse-line',
    label: '요양 관리',
    children: [
      { id: 'daily-care', label: '일일 케어 기록', path: 'daily-care' },
      { id: 'care-records', label: '케어 기록 조회', path: 'care-records' },
      { id: 'medication', label: '투약 관리', path: 'medication' },
      { id: 'needs-assessment', label: '욕구사정 평가', path: 'needs-assessment' }
    ]
  },
  {
    id: 'operations',
    icon: 'ri-settings-4-line',
    label: '운영관리',
    children: [
      { id: 'vehicle-management', label: '차량관리', path: 'vehicle-management' },
      { id: 'asset-management', label: '비품관리', path: 'asset-management' },
      { id: 'cctv-device', label: 'CCTV 설치·운영 관리', path: 'cctv-device' },
      { id: 'cctv-weekly-check', label: 'CCTV 주간 점검대장', path: 'cctv-weekly-check' },
      { id: 'cctv-room-consent', label: 'CCTV 침실 촬영 동의서', path: 'cctv-room-consent' },
      { id: 'cctv-view-log', label: 'CCTV 영상정보 열람대장', path: 'cctv-view-log' },
      { id: 'transport-service', label: '교통관리', path: 'transport-service' },
      { id: 'special-room', label: '특별침실 사용기록', path: 'special-room' },
      { id: 'grievance', label: '고충처리 관리', path: 'grievance' }
    ]
  },
  {
    id: 'staff',
    icon: 'ri-team-line',
    label: '직원 관리',
    children: [
      { id: 'staff-list', label: '직원 목록', path: 'staff-list' },
      { id: 'attendance', label: '출퇴근 기록 관리', path: 'attendance' },
      { id: 'work-schedule', label: '근무일정 관리', path: 'work-schedule' },
      { id: 'staff-work-status', label: '근무현황 조회', path: 'staff-work-status' }
    ]
  },
  {
    id: 'accounting',
    icon: 'ri-money-dollar-circle-line',
    label: '회계/청구',
    children: [
      { id: 'accounting', label: '회계 관리', path: 'accounting' },
      { id: 'insurance-claim', label: '급여 청구', path: 'insurance-claim' },
      { id: 'payroll', label: '급여 관리', path: 'payroll' }
    ]
  },
  {
    id: 'content',
    icon: 'ri-file-text-line',
    label: '콘텐츠 관리',
    children: [
      { id: 'notice', label: '공지사항 관리', path: 'notice' },
      { id: 'free-board', label: '자유게시판 관리', path: 'free-board' },
      { id: 'gallery', label: '갤러리 관리', path: 'gallery' },
      { id: 'meal-plan', label: '식단표 관리', path: 'meal-plan' },
      { id: 'program', label: '프로그램 관리', path: 'program' },
      { id: 'board-management', label: '게시판 관리', path: 'board-management', isGroup: true },
      { id: 'program-album', label: '프로그램 참여앨범', path: 'program-album', parentGroup: 'board-management' },
      { id: 'consultation-requests', label: '상담신청', path: 'consultation-requests', parentGroup: 'board-management' },
      { id: 'popup-management', label: '팝업관리', path: 'popup-management', parentGroup: 'board-management' },
      { id: 'website-editor', label: '홈페이지편집', path: 'website-editor', isGroup: true },
      { id: 'basic-info', label: '기본 정보', path: 'basic-info', parentGroup: 'website-editor' },
      { id: 'design-info', label: '디자인 정보', path: 'design-info', parentGroup: 'website-editor' },
      { id: 'menu-settings', label: '메뉴사용 설정', path: 'menu-settings', parentGroup: 'website-editor' },
      { id: 'intro-editor', label: '기관 소개', path: 'intro-editor', parentGroup: 'website-editor' },
      { id: 'service-editor', label: '서비스 안내', path: 'service-editor', parentGroup: 'website-editor' },
      { id: 'cost-consultation', label: '비용 및 상담 신청', path: 'cost-consultation', parentGroup: 'website-editor' },
      { id: 'donation-volunteer', label: '후원 및 자원봉사', path: 'donation-volunteer', parentGroup: 'website-editor' }
    ]
  },
  {
    id: 'additional-services',
    icon: 'ri-service-line',
    label: '부가서비스',
    children: [
      { id: 'sms-service', label: '문자메시지 발송', path: 'sms-service' },
      { id: 'notification-management', label: '알림 관리', path: 'notification-management', isGroup: true },
      { id: 'notification-dashboard', label: '알림 대시보드', path: 'notification-dashboard', parentGroup: 'notification-management' },
      { id: 'notification-send', label: '발송 작성/즉시발송', path: 'notification-send', parentGroup: 'notification-management' },
      { id: 'notification-scheduled', label: '예약 발송 관리', path: 'notification-scheduled', parentGroup: 'notification-management' },
      { id: 'notification-templates', label: '템플릿 관리', path: 'notification-templates', parentGroup: 'notification-management' },
      { id: 'notification-recipients', label: '대상자/수신자 그룹', path: 'notification-recipients', parentGroup: 'notification-management' },
      { id: 'notification-logs', label: '발송 로그/이력 조회', path: 'notification-logs', parentGroup: 'notification-management' },
      { id: 'notification-settings', label: '채널 연동 설정', path: 'notification-settings', parentGroup: 'notification-management' }
    ]
  },
  {
    id: 'settings',
    icon: 'ri-settings-3-line',
    label: '시스템 설정',
    children: [
      { id: 'rbac', label: '권한 관리', path: 'rbac' },
      { id: 'facility-info', label: '시설 정보 관리', path: 'facility-info' },
      { id: 'site-settings', label: '사이트 설정', path: 'site-settings' }
    ]
  }
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  onMenuClick, 
  activeMenu, 
  isMobileMenuOpen = false,
  onCloseMobileMenu 
}) => {
  const navigate = window.REACT_APP_NAVIGATE;
  
  // 축소/확장 상태 (localStorage에서 복원) - 데스크톱 전용
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  // 메뉴 열림 상태 (localStorage에서 복원)
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem('sidebar-open-menus');
    return saved ? JSON.parse(saved) : {};
  });

  // 툴팁 상태
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // 로그인 사용자 정보
  const [userInfo] = useState({
    name: '김시설장',
    role: '시설장',
    roleLevel: '관리자 권한',
    lastLogin: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    avatar: 'https://readdy.ai/api/search-image?query=professional%20korean%20senior%20care%20facility%20director%20portrait%20clean%20white%20background%20confident%20friendly%20healthcare%20administrator&width=80&height=80&seq=admin-prof-001&orientation=squarish'
  });

  // localStorage에 열림 상태 저장
  useEffect(() => {
    localStorage.setItem('sidebar-open-menus', JSON.stringify(openMenus));
  }, [openMenus]);

  // localStorage 저장
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  // 축소/확장 토글 (데스크톱 전용)
  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  // 메뉴 토글
  const toggleMenu = (menuId: string) => {
    if (collapsed) return; // 축소 모드에서는 아코디언 비활성화
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // 툴팁 표시
  const handleMouseEnter = (e: React.MouseEvent, label: string) => {
    if (!collapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 12
    });
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  // 메뉴 아이템 렌더링
  const renderMenuItem = (item: MenuItem) => {
    const isActive = activeMenu === item.id || (item.children && item.children.some(child => {
      if ((child as any).isGroup) {
        // 그룹의 자식 중 하나가 active인지 확인
        const groupChildren = item.children!.filter(c => (c as any).parentGroup === child.id);
        return groupChildren.some(gc => gc.id === activeMenu);
      }
      return child.id === activeMenu;
    }));
    const isOpen = openMenus[item.id];
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="relative">
        {/* 메인 메뉴 */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (hasChildren) {
              toggleMenu(item.id);
            } else {
              onMenuClick(item.path || item.id);
            }
          }}
          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
          onMouseLeave={handleMouseLeave}
          className={`
            w-full flex items-center transition-all duration-200 cursor-pointer
            ${collapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-3'}
            ${isActive ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600' : 'text-gray-700 hover:bg-gray-50'}
          `}
          aria-label={item.label}
        >
          {/* 아이콘 + 라벨 */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <i className={`${item.icon} text-xl flex-shrink-0 ${isActive ? 'text-emerald-600' : ''}`}></i>
            {!collapsed && (
              <span className={`font-medium transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            )}
          </div>

          {/* 화살표 (서브메뉴 있을 때만) */}
          {!collapsed && hasChildren && (
            <i className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line text-gray-400 transition-transform duration-200`}></i>
          )}
        </button>

        {/* 서브메뉴 */}
        {hasChildren && isOpen && !collapsed && (
          <div className="bg-gray-50">
            {item.children!.map(child => {
              // 그룹 메뉴인 경우
              if ((child as any).isGroup) {
                const groupId = child.id;
                const isGroupOpen = openMenus[groupId];
                const groupChildren = item.children!.filter(c => (c as any).parentGroup === groupId);
                const isGroupActive = groupChildren.some(gc => gc.id === activeMenu);
                
                return (
                  <div key={child.id}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMenu(groupId);
                      }}
                      className={`
                        w-full px-4 py-2.5 pl-12 text-left text-sm font-semibold transition-colors cursor-pointer flex items-center justify-between
                        ${isGroupActive ? 'text-emerald-600 bg-emerald-50/50' : 'text-gray-700 hover:bg-gray-100'}
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <i className={`ri-folder-${isGroupOpen ? 'open' : ''}line text-base`}></i>
                        {child.label}
                      </span>
                      <i className={`ri-arrow-${isGroupOpen ? 'down' : 'right'}-s-line text-xs transition-transform duration-200`}></i>
                    </button>
                    {isGroupOpen && (
                      <div className="bg-white border-l-2 border-emerald-200 ml-12">
                        {groupChildren.map(groupChild => (
                          <button
                            key={groupChild.id}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onMenuClick(groupChild.id);
                            }}
                            className={`
                              w-full px-4 py-2.5 pl-6 text-left text-sm transition-all duration-200 cursor-pointer
                              ${activeMenu === groupChild.id 
                                ? 'text-emerald-600 font-semibold bg-emerald-50 border-l-4 border-emerald-600' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'}
                            `}
                          >
                            {groupChild.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              // 그룹의 자식이 아닌 일반 메뉴만 표시
              if (!(child as any).parentGroup) {
                return (
                  <button
                    key={child.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onMenuClick(child.id);
                    }}
                    className={`
                      w-full px-4 py-2.5 pl-12 text-left text-sm transition-colors cursor-pointer
                      ${activeMenu === child.id ? 'text-emerald-600 font-medium bg-emerald-50' : 'text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    {child.label}
                  </button>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    );
  };

  // 모바일 여부 체크
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* 사이드바 컨테이너 */}
      <aside
        className={`
          bg-white border-r border-gray-200 flex flex-col h-screen
          transition-all duration-300 ease-in-out overflow-hidden
          ${
            // 모바일: 드로어 방식
            'md:relative md:flex-shrink-0 ' +
            'fixed top-0 left-0 bottom-0 z-50 ' +
            (isMobileMenuOpen 
              ? 'translate-x-0 w-[80vw] max-w-[360px]' 
              : '-translate-x-full w-[80vw] max-w-[360px]'
            ) +
            ' md:translate-x-0 ' +
            // 데스크톱: 기존 접기/펼치기
            (collapsed ? 'md:w-[70px]' : 'md:w-[260px]')
          }
        `}
        role="dialog"
        aria-modal={isMobileMenuOpen ? "true" : undefined}
        aria-label="사이드바 메뉴"
      >
        {/* 모바일 전용 닫기 버튼 */}
        <div className="md:hidden border-b border-gray-200 py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <i className="ri-hospital-line text-xl text-white"></i>
            </div>
            <span className="text-lg font-bold text-gray-900">실버타운</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCloseMobileMenu?.();
            }}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
            aria-label="메뉴 닫기"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 데스크톱 전용 햄버거 버튼 */}
        <div className={`hidden md:block border-b border-gray-200 py-4 ${collapsed ? 'px-0' : 'px-4'}`}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSidebar();
            }}
            aria-label={collapsed ? '사이드바 확장' : '사이드바 축소'}
            title={collapsed ? '사이드바 확장' : '사이드바 축소'}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer
              bg-gray-100 hover:bg-gray-200 text-gray-700
              ${collapsed ? 'mx-auto' : 'w-full justify-center'}
            `}
          >
            <i className={`ri-menu-${collapsed ? 'unfold' : 'fold'}-line text-xl`}></i>
            {!collapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                접기
              </span>
            )}
          </button>
        </div>

        {/* 데스크톱 전용 로고 영역 */}
        <div className={`hidden md:block border-b border-gray-200 py-4 ${collapsed ? 'px-0' : 'px-4'}`}>
          <div 
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSidebar();
            }}
            role="button"
            aria-label="사이드바 접기/펴기"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSidebar();
              }
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
              <i className="ri-hospital-line text-xl text-white"></i>
            </div>
            {!collapsed && (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                  실버타운
                </span>
                <i className="ri-arrow-left-s-line text-gray-400 text-sm"></i>
              </div>
            )}
          </div>
        </div>

        {/* 메뉴 영역 - space-between으로 상단/하단 분리 */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* 상단 메뉴 - 스크롤 가능 */}
          <nav className="flex-1 overflow-y-auto py-2">
            {/* 모바일 전용: 출퇴근처리 메뉴 (최상단) */}
            {isMobile && (
              <div className="mb-2 px-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate?.('/mobile/attendance');
                    onCloseMobileMenu?.();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-2xl"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-base">출퇴근처리</div>
                    <div className="text-xs opacity-90">출근/퇴근 기록</div>
                  </div>
                  <i className="ri-arrow-right-s-line text-xl"></i>
                </button>
              </div>
            )}

            {MENU_ITEMS.map(item => renderMenuItem(item))}
          </nav>

          {/* 하단 Box: 홈페이지 바로가기 - 고정 */}
          <div className="flex-shrink-0 border-t border-gray-200">
            <div className={`bg-white ${collapsed ? 'p-0' : 'p-4'}`}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('/', '_blank');
                }}
                onMouseEnter={(e) => handleMouseEnter(e, '홈페이지 바로가기')}
                onMouseLeave={handleMouseLeave}
                className={`
                  w-full flex items-center transition-all duration-200 cursor-pointer
                  ${collapsed ? 'justify-center px-0 py-3' : 'justify-start gap-3 px-4 py-3'}
                  text-gray-700 hover:bg-gray-50
                  rounded-lg
                `}
                aria-label="홈페이지 바로가기"
              >
                <i className="ri-home-line text-xl flex-shrink-0"></i>
                {!collapsed && (
                  <span className="font-medium">
                    홈페이지 바로가기
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 하단: 로그인 정보 */}
        <div className={`border-t border-gray-200 py-4 ${collapsed ? 'px-0' : 'px-4'}`}>
          <div
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} group relative cursor-pointer`}
            onMouseEnter={(e) => {
              if (collapsed) {
                handleMouseEnter(e, `${userInfo.name}\n${userInfo.role}\n${userInfo.roleLevel}\n마지막 로그인 ${userInfo.lastLogin}`);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* 프로필 이미지 */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = '<i class="ri-user-line text-xl text-white"></i>';
                  }
                }}
              />
            </div>

            {/* 사용자 정보 (확장 모드) */}
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">{userInfo.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>{userInfo.role}</span>
                  <span>•</span>
                  <span className="text-emerald-600">{userInfo.roleLevel}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  마지막 로그인 {userInfo.lastLogin}
                </div>
              </div>
            )}
          </div>

          {/* 내 정보 / 로그아웃 버튼 (확장 모드) */}
          {!collapsed && (
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate?.('/admin/my-page');
                }}
                className="flex-1 px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                내 정보
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  localStorage.removeItem('admin_auth');
                  window.location.href = '/admin/login';
                }}
                className="flex-1 px-3 py-2 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 툴팁 (축소 모드 전용) */}
      {collapsed && hoveredMenu && (
        <div
          className="fixed z-[9999] bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl pointer-events-none whitespace-pre-line"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translateY(-50%)',
            animation: 'tooltipFadeIn 0.15s ease-out forwards'
          }}
        >
          {hoveredMenu}
          {/* 삼각형 화살표 */}
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-gray-900 transform -translate-x-1 -translate-y-1/2 rotate-45"></div>
        </div>
      )}

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        /* 스크롤바 스타일링 */
        nav::-webkit-scrollbar {
          width: 6px;
        }

        nav::-webkit-scrollbar-track {
          background: transparent;
        }

        nav::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        nav::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;