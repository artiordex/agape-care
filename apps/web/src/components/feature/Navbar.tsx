import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIntroDropdownOpen, setIsIntroDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isFacilityDropdownOpen, setIsFacilityDropdownOpen] = useState(false);
  const [isAdmissionDropdownOpen, setIsAdmissionDropdownOpen] = useState(false);
  const [isNoticeDropdownOpen, setIsNoticeDropdownOpen] = useState(false);
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);
  
  // 모바일 메뉴 아코디언 상태
  const [mobileIntroOpen, setMobileIntroOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileFacilityOpen, setMobileFacilityOpen] = useState(false);
  const [mobileAdmissionOpen, setMobileAdmissionOpen] = useState(false);
  const [mobileNoticeOpen, setMobileNoticeOpen] = useState(false);
  
  const introDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const facilityDropdownRef = useRef<HTMLDivElement>(null);
  const admissionDropdownRef = useRef<HTMLDivElement>(null);
  const noticeDropdownRef = useRef<HTMLDivElement>(null);
  
  const introTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const facilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const admissionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const noticeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const location = useLocation();

  // 센터소개 서브메뉴
  const introSubMenu = [
    {
      name: '인사말',
      path: '/intro',
      icon: 'ri-message-3-line',
      description: '센터장 인사말'
    },
    {
      name: '연혁',
      path: '/intro/history',
      icon: 'ri-time-line',
      description: '우리의 발자취'
    },
    {
      name: '직원소개',
      path: '/intro/staff',
      icon: 'ri-team-line',
      description: '전문 케어팀'
    },
    {
      name: '오시는 길',
      path: '#location',
      icon: 'ri-map-pin-line',
      description: '찾아오시는 길'
    }
  ];

  // 서비스안내 서브메뉴
  const servicesSubMenu = [
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
      name: '보육훈련 3단계 프로그램',
      description: '단계별 맞춤 케어',
      icon: 'ri-shield-star-line',
      path: '/services/training-program'
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
      name: '하루 일과 / 생활안내',
      description: '규칙적인 일상 생활',
      icon: 'ri-calendar-line',
      path: '/services/daily-life'
    },
    {
      name: '개별 케어 서비스',
      description: '맞춤형 개인 케어',
      icon: 'ri-user-heart-line',
      path: '/services/individual-care'
    }
  ];

  // 시설안내 서브메뉴
  const facilitySubMenu = [
    {
      name: '시설안내',
      path: '/facility',
      icon: 'ri-building-line',
      description: '시설 전체 안내'
    }
  ];

  // 이용안내 서브메뉴
  const admissionSubMenu = [
    {
      name: '입소안내',
      path: '#admission',
      icon: 'ri-door-open-line',
      description: '입소 절차 안내'
    },
    {
      name: '입소 비용 안내',
      path: '/cost',
      icon: 'ri-money-dollar-circle-line',
      description: '등급별 비용 안내'
    },
    {
      name: '면회 안내',
      path: '/visit',
      icon: 'ri-parent-line',
      description: '면회 시간 및 예약'
    },
    {
      name: '상담신청',
      path: '#contact',
      icon: 'ri-customer-service-line',
      description: '입소 상담 신청'
    }
  ];

  // 알림마당 서브메뉴
  const noticeSubMenu = [
    {
      name: '공지사항',
      path: '/communities?category=공지사항',
      icon: 'ri-megaphone-line',
      description: '중요 공지사항'
    },
    {
      name: '게시판',
      path: '/communities',
      icon: 'ri-article-line',
      description: '다양한 소식'
    },
    {
      name: '갤러리',
      path: '/communities?category=갤러리',
      icon: 'ri-image-line',
      description: '활동 사진'
    },
    {
      name: '식단표',
      path: '/communities?category=식단표',
      icon: 'ri-restaurant-line',
      description: '주간 식단'
    },
    {
      name: '프로그램 일정표',
      path: '/communities?category=프로그램',
      icon: 'ri-calendar-check-line',
      description: '월간 일정'
    }
  ];

  // All Menu 데이터 구조
  const allMenuData = [
    {
      title: '센터소개',
      items: [
        { name: '인사말', path: '/intro' },
        { name: '연혁', path: '/intro/history' },
        { name: '직원소개', path: '/intro/staff' },
        { name: '오시는 길', path: '#location' }
      ]
    },
    {
      title: '서비스안내',
      items: [
        { name: '인지관리프로그램', path: '/services/cognitive-program' },
        { name: '여가활동 프로그램', path: '/services/leisure-program' },
        { name: '의료지원간호서비스', path: '/services/medical-nursing' },
        { name: '재활치료서비스', path: '/services/rehabilitation' },
        { name: '보육훈련 3단계 프로그램', path: '/services/training-program' },
        { name: '영양관리', path: '/services/nutrition-care' },
        { name: '입소절차안내', path: '/services/admission-process' },
        { name: '하루 일과 / 생활안내', path: '/services/daily-life' },
        { name: '개별 케어 서비스', path: '/services/individual-care' }
      ]
    },
    {
      title: '시설안내',
      items: [
        { name: '시설안내', path: '/facility' }
      ]
    },
    {
      title: '이용안내',
      items: [
        { name: '입소안내', path: '#admission' },
        { name: '입소 비용 안내', path: '/cost' },
        { name: '면회 안내', path: '/visit' },
        { name: '상담신청', path: '#contact' }
      ]
    },
    {
      title: '알림마당',
      items: [
        { name: '공지사항', path: '/communities?category=공지사항' },
        { name: '게시판', path: '/communities' },
        { name: '갤러리', path: '/communities?category=갤러리' },
        { name: '식단표', path: '/communities?category=식단표' },
        { name: '프로그램 일정표', path: '/communities?category=프로그램' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (introDropdownRef.current && !introDropdownRef.current.contains(event.target as Node)) {
        setIsIntroDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (facilityDropdownRef.current && !facilityDropdownRef.current.contains(event.target as Node)) {
        setIsFacilityDropdownOpen(false);
      }
      if (admissionDropdownRef.current && !admissionDropdownRef.current.contains(event.target as Node)) {
        setIsAdmissionDropdownOpen(false);
      }
      if (noticeDropdownRef.current && !noticeDropdownRef.current.contains(event.target as Node)) {
        setIsNoticeDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsIntroDropdownOpen(false);
        setIsServicesDropdownOpen(false);
        setIsFacilityDropdownOpen(false);
        setIsAdmissionDropdownOpen(false);
        setIsNoticeDropdownOpen(false);
        setIsAllMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // 전체 메뉴 오픈 시 스크롤 방지
  useEffect(() => {
    if (isAllMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAllMenuOpen]);

  // 모바일 메뉴가 닫힐 때 아코디언도 초기화
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileIntroOpen(false);
      setMobileServicesOpen(false);
      setMobileFacilityOpen(false);
      setMobileAdmissionOpen(false);
      setMobileNoticeOpen(false);
    }
  }, [isMobileMenuOpen]);

  const handleIntroMouseEnter = () => {
    if (introTimeoutRef.current) {
      clearTimeout(introTimeoutRef.current);
    }
    setIsIntroDropdownOpen(true);
  };

  const handleIntroMouseLeave = () => {
    introTimeoutRef.current = setTimeout(() => {
      setIsIntroDropdownOpen(false);
    }, 300);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 300);
  };

  const handleFacilityMouseEnter = () => {
    if (facilityTimeoutRef.current) {
      clearTimeout(facilityTimeoutRef.current);
    }
    setIsFacilityDropdownOpen(true);
  };

  const handleFacilityMouseLeave = () => {
    facilityTimeoutRef.current = setTimeout(() => {
      setIsFacilityDropdownOpen(false);
    }, 300);
  };

  const handleAdmissionMouseEnter = () => {
    if (admissionTimeoutRef.current) {
      clearTimeout(admissionTimeoutRef.current);
    }
    setIsAdmissionDropdownOpen(true);
  };

  const handleAdmissionMouseLeave = () => {
    admissionTimeoutRef.current = setTimeout(() => {
      setIsAdmissionDropdownOpen(false);
    }, 300);
  };

  const handleNoticeMouseEnter = () => {
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current);
    }
    setIsNoticeDropdownOpen(true);
  };

  const handleNoticeMouseLeave = () => {
    noticeTimeoutRef.current = setTimeout(() => {
      setIsNoticeDropdownOpen(false);
    }, 300);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://public.readdy.ai/ai/img_res/48e38bd6-8359-445e-830a-806edba46b51.png"
                alt="요양센터 로고"
                className="h-12 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {/* 센터소개 */}
              <div 
                ref={introDropdownRef}
                className="relative"
                onMouseEnter={handleIntroMouseEnter}
                onMouseLeave={handleIntroMouseLeave}
              >
                <Link
                  to="/intro"
                  className={`text-[17px] font-semibold transition-colors whitespace-nowrap ${
                    isActive('/intro')
                      ? 'text-[#5C8D5A]'
                      : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  센터소개
                </Link>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
                    isIntroDropdownOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-3 invisible'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {introSubMenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 transition-all duration-200 group cursor-pointer"
                          onClick={() => setIsIntroDropdownOpen(false)}
                        >
                          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#5C8D5A] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 서비스안내 */}
              <div 
                ref={servicesDropdownRef}
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <a
                  href="/services/training-program"
                  className={`text-[17px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  서비스안내
                </a>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
                    isServicesDropdownOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-3 invisible'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {servicesSubMenu.map((item, index) => (
                        <a
                          key={index}
                          href={item.path}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 transition-all duration-200 group cursor-pointer"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#5C8D5A] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a
                        href="#services"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-[#5C8D5A] hover:text-[#4A7548] transition-colors cursor-pointer"
                        onClick={() => setIsServicesDropdownOpen(false)}
                      >
                        <span>전체 서비스 보기</span>
                        <i className="ri-arrow-right-line"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 시설안내 */}
              <div 
                ref={facilityDropdownRef}
                className="relative"
                onMouseEnter={handleFacilityMouseEnter}
                onMouseLeave={handleFacilityMouseLeave}
              >
                <Link
                  to="/facility"
                  className={`text-[17px] font-semibold transition-colors whitespace-nowrap ${
                    isActive('/facility')
                      ? 'text-[#5C8D5A]'
                      : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  시설안내
                </Link>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
                    isFacilityDropdownOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-3 invisible'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {facilitySubMenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 transition-all duration-200 group cursor-pointer"
                          onClick={() => setIsFacilityDropdownOpen(false)}
                        >
                          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#5C8D5A] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 이용안내 */}
              <div 
                ref={admissionDropdownRef}
                className="relative"
                onMouseEnter={handleAdmissionMouseEnter}
                onMouseLeave={handleAdmissionMouseLeave}
              >
                <a
                  href="#admission"
                  className={`text-[17px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  이용안내
                </a>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
                    isAdmissionDropdownOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-3 invisible'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {admissionSubMenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 transition-all duration-200 group cursor-pointer"
                          onClick={() => setIsAdmissionDropdownOpen(false)}
                        >
                          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#5C8D5A] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 알림마당 */}
              <div 
                ref={noticeDropdownRef}
                className="relative"
                onMouseEnter={handleNoticeMouseEnter}
                onMouseLeave={handleNoticeMouseLeave}
              >
                <Link
                  to="/communities"
                  className={`text-[17px] font-semibold transition-colors whitespace-nowrap ${
                    isActive('/communities')
                      ? 'text-[#5C8D5A]'
                      : 'text-gray-800 hover:text-[#5C8D5A]'
                  }`}
                >
                  알림마당
                </Link>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
                    isNoticeDropdownOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-3 invisible'
                  }`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {noticeSubMenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 transition-all duration-200 group cursor-pointer"
                          onClick={() => setIsNoticeDropdownOpen(false)}
                        >
                          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className={`${item.icon} text-2xl text-[#5C8D5A]`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#5C8D5A] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        to="/communities"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-[#5C8D5A] hover:text-[#4A7548] transition-colors cursor-pointer"
                        onClick={() => setIsNoticeDropdownOpen(false)}
                      >
                        <span>전체 알림마당 보기</span>
                        <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className={`px-6 py-3 bg-[#5C8D5A] text-white rounded-lg font-semibold hover:bg-[#4A7548] transition-all whitespace-nowrap cursor-pointer`}
              >
                상담신청
              </a>

              {/* 전체메뉴 버튼 */}
              <button
                onClick={() => setIsAllMenuOpen(true)}
                className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-lg font-semibold transition-all whitespace-nowrap border-[#5C8D5A] text-[#5C8D5A] hover:bg-[#5C8D5A] hover:text-white`}
                aria-label="전체메뉴 열기"
              >
                <i className="ri-menu-line text-xl"></i>
                <span>전체메뉴</span>
              </button>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <i
                className="ri-menu-line text-2xl text-gray-800"
              ></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-[60] overflow-y-auto">
            {/* 모바일 메뉴 헤더 */}
            <div className="flex justify-between items-center h-20 px-4 border-b border-gray-200">
              <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src="https://public.readdy.ai/ai/img_res/48e38bd6-8359-445e-830a-806edba46b51.png"
                  alt="요양센터 로고"
                  className="h-12 w-auto"
                />
              </Link>
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="메뉴 닫기"
              >
                <i className="ri-close-line text-3xl text-gray-800"></i>
              </button>
            </div>

            {/* 모바일 메뉴 콘텐츠 */}
            <div className="px-6 py-8 space-y-6">
              {/* Mobile 센터소개 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileIntroOpen(!mobileIntroOpen)}
                  className="w-full flex items-center justify-between text-lg font-semibold text-gray-800 hover:text-[#5C8D5A] py-3 cursor-pointer"
                  aria-expanded={mobileIntroOpen}
                  aria-label="센터소개 메뉴 토글"
                >
                  <span>센터소개</span>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                    mobileIntroOpen ? 'rotate-180' : ''
                  }`}></i>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileIntroOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileIntroOpen}
                >
                  <div className="pl-4 space-y-3 border-l-2 border-[#5C8D5A]/30 pt-2">
                    {introSubMenu.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center gap-3 py-3 px-4 text-base text-gray-700 hover:text-[#5C8D5A] hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 rounded-lg cursor-pointer transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`}></i>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Mobile 서비스안내 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between text-lg font-semibold text-gray-800 hover:text-[#5C8D5A] py-3 cursor-pointer"
                  aria-expanded={mobileServicesOpen}
                  aria-label="서비스안내 메뉴 토글"
                >
                  <span>서비스안내</span>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                    mobileServicesOpen ? 'rotate-180' : ''
                  }`}></i>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileServicesOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileServicesOpen}
                >
                  <div className="pl-4 space-y-3 border-l-2 border-[#5C8D5A]/30 pt-2">
                    {servicesSubMenu.map((item, index) => (
                      <a
                        key={index}
                        href={item.path}
                        className="flex items-center gap-3 py-3 px-4 text-base text-gray-700 hover:text-[#5C8D5A] hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 rounded-lg cursor-pointer transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`}></i>
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile 시설안내 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileFacilityOpen(!mobileFacilityOpen)}
                  className="w-full flex items-center justify-between text-lg font-semibold text-gray-800 hover:text-[#5C8D5A] py-3 cursor-pointer"
                  aria-expanded={mobileFacilityOpen}
                  aria-label="시설안내 메뉴 토글"
                >
                  <span>시설안내</span>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                    mobileFacilityOpen ? 'rotate-180' : ''
                  }`}></i>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileFacilityOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileFacilityOpen}
                >
                  <div className="pl-4 space-y-3 border-l-2 border-[#5C8D5A]/30 pt-2">
                    {facilitySubMenu.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center gap-3 py-3 px-4 text-base text-gray-700 hover:text-[#5C8D5A] hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 rounded-lg cursor-pointer transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`}></i>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile 이용안내 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileAdmissionOpen(!mobileAdmissionOpen)}
                  className="w-full flex items-center justify-between text-lg font-semibold text-gray-800 hover:text-[#5C8D5A] py-3 cursor-pointer"
                  aria-expanded={mobileAdmissionOpen}
                  aria-label="이용안내 메뉴 토글"
                >
                  <span>이용안내</span>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                    mobileAdmissionOpen ? 'rotate-180' : ''
                  }`}></i>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileAdmissionOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileAdmissionOpen}
                >
                  <div className="pl-4 space-y-3 border-l-2 border-[#5C8D5A]/30 pt-2">
                    {admissionSubMenu.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center gap-3 py-3 px-4 text-base text-gray-700 hover:text-[#5C8D5A] hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 rounded-lg cursor-pointer transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`}></i>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Mobile 알림마당 */}
              <div className="space-y-3">
                <button
                  onClick={() => setMobileNoticeOpen(!mobileNoticeOpen)}
                  className="w-full flex items-center justify-between text-lg font-semibold text-gray-800 hover:text-[#5C8D5A] py-3 cursor-pointer"
                  aria-expanded={mobileNoticeOpen}
                  aria-label="알림마당 메뉴 토글"
                >
                  <span>알림마당</span>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                    mobileNoticeOpen ? 'rotate-180' : ''
                  }`}></i>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileNoticeOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!mobileNoticeOpen}
                >
                  <div className="pl-4 space-y-3 border-l-2 border-[#5C8D5A]/30 pt-2">
                    {noticeSubMenu.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center gap-3 py-3 px-4 text-base text-gray-700 hover:text-[#5C8D5A] hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 rounded-lg cursor-pointer transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} text-xl`}></i>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 하단 버튼 영역 */}
              <div className="pt-6 space-y-4 border-t border-gray-200">
                <a
                  href="#contact"
                  className="block text-center px-6 py-4 bg-[#5C8D5A] text-white rounded-xl font-semibold hover:bg-[#4A7548] transition-all cursor-pointer text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  상담신청
                </a>

                {/* Mobile 전체메뉴 */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAllMenuOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#5C8D5A] text-[#5C8D5A] rounded-xl font-semibold hover:bg-[#5C8D5A] hover:text-white transition-all text-lg"
                >
                  <i className="ri-menu-line text-xl"></i>
                  <span>전체메뉴</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 전체메뉴 점보 네비게이션 박스 */}
      {isAllMenuOpen && (
        <>
          {/* 오버레이 배경 */}
          <div 
            className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 backdrop-blur-sm"
            onClick={() => setIsAllMenuOpen(false)}
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
          />
          
          {/* 전체메뉴 박스 */}
          <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[95%] max-w-[1400px] max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            style={{
              animation: 'slideUp 0.35s ease-out'
            }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsAllMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
              aria-label="전체메뉴 닫기"
            >
              <i className="ri-close-line text-2xl text-gray-700"></i>
            </button>

            {/* 메뉴 그리드 - Desktop */}
            <div className="hidden md:grid md:grid-cols-5 gap-8 p-12">
              {allMenuData.map((category, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 pb-3 border-b-2 border-[#5C8D5A]">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          to={item.path}
                          onClick={() => setIsAllMenuOpen(false)}
                          className="block text-[15px] text-gray-700 hover:text-[#5C8D5A] hover:bg-[#f8f5e7] px-3 py-2 rounded-lg transition-all cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 메뉴 아코디언 - Mobile */}
            <div className="md:hidden p-6 space-y-4">
              {allMenuData.map((category, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between px-4 py-3 bg-gradient-to-br from-teal-50 to-amber-50 rounded-lg cursor-pointer list-none">
                    <h3 className="text-base font-bold text-gray-900">
                      {category.title}
                    </h3>
                    <i className="ri-arrow-down-s-line text-xl text-gray-600 group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          to={item.path}
                          onClick={() => setIsAllMenuOpen(false)}
                          className="block text-sm text-gray-700 hover:text-[#5C8D5A] py-2 cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
