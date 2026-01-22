import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';

export default function NoticePage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });

  const notices = [
    {
      id: 1,
      category: '중요',
      title: '2024년 설날 연휴 운영 안내',
      date: '2024.01.15',
      views: 245,
      isNew: true,
      isPinned: true
    },
    {
      id: 2,
      category: '공지',
      title: '면회 시간 변경 안내',
      date: '2024.01.10',
      views: 189,
      isNew: true,
      isPinned: true
    },
    {
      id: 3,
      category: '행사',
      title: '1월 생신 잔치 안내',
      date: '2024.01.08',
      views: 156,
      isNew: true,
      isPinned: false
    },
    {
      id: 4,
      category: '공지',
      title: '독감 예방접종 실시 안내',
      date: '2024.01.05',
      views: 203,
      isNew: false,
      isPinned: false
    },
    {
      id: 5,
      category: '행사',
      title: '신년 음악회 개최 안내',
      date: '2024.01.03',
      views: 178,
      isNew: false,
      isPinned: false
    },
    {
      id: 6,
      category: '공지',
      title: '겨울철 난방 및 실내 온도 관리 안내',
      date: '2023.12.28',
      views: 142,
      isNew: false,
      isPinned: false
    },
    {
      id: 7,
      category: '행사',
      title: '크리스마스 특별 행사 결과 보고',
      date: '2023.12.26',
      views: 198,
      isNew: false,
      isPinned: false
    },
    {
      id: 8,
      category: '공지',
      title: '연말연시 면회 예약 안내',
      date: '2023.12.20',
      views: 167,
      isNew: false,
      isPinned: false
    },
    {
      id: 9,
      category: '행사',
      title: '12월 생신 잔치 안내',
      date: '2023.12.15',
      views: 134,
      isNew: false,
      isPinned: false
    },
    {
      id: 10,
      category: '공지',
      title: '겨울철 건강관리 안내',
      date: '2023.12.10',
      views: 156,
      isNew: false,
      isPinned: false
    }
  ];

  const quickLinks = [
    {
      title: '입소 상담',
      description: '입소 절차 및 비용 상담',
      icon: 'ri-customer-service-2-line',
      link: '#contact',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '면회 예약',
      description: '면회 일정 예약하기',
      icon: 'ri-calendar-check-line',
      link: '/visit',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '프로그램 일정',
      description: '월간 프로그램 확인',
      icon: 'ri-calendar-line',
      link: '/programs',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: '식단표',
      description: '주간 식단 확인',
      icon: 'ri-restaurant-line',
      link: '/meal-plan',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=modern%20notice%20board%20information%20desk%20in%20bright%20elderly%20care%20facility%20with%20organized%20announcements%20and%20comfortable%20reading%20area%20clean%20professional%20interior%20design%20with%20natural%20lighting&width=1920&height=600&seq=notice-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <i className="ri-megaphone-line text-[#5C8D5A] text-xl"></i>
              <span className="text-sm font-semibold text-gray-700">공지사항</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              공지사항
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              시설 운영 및 행사에 관한 중요한 소식을<br />
              빠르고 정확하게 전해드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 공지사항 목록 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 공지사항 목록 */}
            <div className="lg:col-span-2">
              <motion.div
                ref={ref1}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl shadow-lg overflow-hidden">
                  {/* 테이블 헤더 */}
                  <div className="bg-[#5C8D5A] px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 text-white font-bold text-sm">
                      <div className="col-span-1 text-center">번호</div>
                      <div className="col-span-2 text-center">구분</div>
                      <div className="col-span-6">제목</div>
                      <div className="col-span-2 text-center">작성일</div>
                      <div className="col-span-1 text-center">조회</div>
                    </div>
                  </div>

                  {/* 테이블 바디 */}
                  <div className="bg-white">
                    {notices.map((notice, index) => (
                      <div
                        key={notice.id}
                        className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 transition-all cursor-pointer"
                      >
                        <div className="col-span-1 text-center">
                          {notice.isPinned ? (
                            <i className="ri-pushpin-fill text-[#5C8D5A]"></i>
                          ) : (
                            <span className="text-sm text-gray-600">{notices.length - index}</span>
                          )}
                        </div>
                        <div className="col-span-2 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              notice.category === '중요'
                                ? 'bg-red-100 text-red-600'
                                : notice.category === '행사'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {notice.category}
                          </span>
                        </div>
                        <div className="col-span-6">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 hover:text-[#5C8D5A] transition-colors">
                              {notice.title}
                            </span>
                            {notice.isNew && (
                              <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                                N
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2 text-center text-sm text-gray-600">
                          {notice.date}
                        </div>
                        <div className="col-span-1 text-center text-sm text-gray-600">
                          {notice.views}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 페이지네이션 */}
                  <div className="bg-white px-6 py-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <i className="ri-arrow-left-s-line text-gray-600"></i>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center bg-[#5C8D5A] text-white rounded-lg font-bold">
                        1
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 font-semibold">
                        2
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 font-semibold">
                        3
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <i className="ri-arrow-right-s-line text-gray-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 검색 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-6 shadow-md"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">공지사항 검색</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all text-sm"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#5C8D5A] text-white rounded-lg hover:bg-[#4A7548] transition-colors">
                    <i className="ri-search-line"></i>
                  </button>
                </div>
              </motion.div>

              {/* 빠른 링크 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">빠른 메뉴</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className="flex items-center gap-4 p-4 bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <i className={`${link.icon} text-xl text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">{link.title}</div>
                        <div className="text-xs text-gray-600">{link.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* 연락처 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] rounded-2xl p-6 shadow-md text-white"
              >
                <h3 className="text-lg font-bold mb-4">문의하기</h3>
                <div className="space-y-3">
                  <a
                    href="tel:02-1234-5678"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <i className="ri-phone-line text-xl"></i>
                    <div>
                      <div className="text-xs opacity-80">전화 문의</div>
                      <div className="text-sm font-bold">02-1234-5678</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <i className="ri-time-line text-xl"></i>
                    <div>
                      <div className="text-xs opacity-80">운영 시간</div>
                      <div className="text-sm font-bold">평일 09:00 - 18:00</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              더 궁금하신 사항이 있으신가요?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              언제든지 편하게 문의해주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-[#5C8D5A] text-white rounded-xl font-bold hover:bg-[#4A7548] transition-all shadow-lg cursor-pointer whitespace-nowrap"
              >
                <i className="ri-customer-service-2-line mr-2"></i>
                상담 신청하기
              </a>
              <a
                href="/visit"
                className="px-8 py-4 bg-white border-2 border-[#5C8D5A] text-[#5C8D5A] rounded-xl font-bold hover:bg-[#5C8D5A] hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-calendar-check-line mr-2"></i>
                면회 예약하기
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}