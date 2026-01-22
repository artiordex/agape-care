import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';

export default function CorporationPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  const corporationInfo = [
    { label: '법인명', value: '사회복지법인 OO복지재단', icon: 'ri-building-line' },
    { label: '대표자', value: '홍길동', icon: 'ri-user-line' },
    { label: '설립일', value: '2010년 3월 15일', icon: 'ri-calendar-line' },
    { label: '사업자등록번호', value: '123-45-67890', icon: 'ri-file-text-line' },
    { label: '주소', value: '서울특별시 강남구 테헤란로 123', icon: 'ri-map-pin-line' },
    { label: '연락처', value: '02-1234-5678', icon: 'ri-phone-line' }
  ];

  const facilities = [
    {
      name: 'OO요양원',
      type: '노인요양시설',
      capacity: '29인',
      location: '서울 강남구',
      established: '2015년',
      icon: 'ri-home-heart-line'
    }
  ];

  const operationStatus = [
    {
      title: '입소 현황',
      value: '27명',
      total: '29명',
      percentage: 93,
      icon: 'ri-user-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '직원 현황',
      value: '15명',
      total: '정규직 12명, 비정규직 3명',
      percentage: 100,
      icon: 'ri-team-line',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '프로그램 운영',
      value: '8개',
      total: '주 5일 운영',
      percentage: 100,
      icon: 'ri-calendar-check-line',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: '만족도',
      value: '4.8점',
      total: '5점 만점',
      percentage: 96,
      icon: 'ri-star-line',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const announcements = [
    {
      title: '2024년 정기 후원금 사용 내역 공개',
      date: '2024.01.15',
      category: '재정',
      icon: 'ri-money-dollar-circle-line'
    },
    {
      title: '2023년 운영 실적 보고',
      date: '2024.01.10',
      category: '운영',
      icon: 'ri-file-chart-line'
    },
    {
      title: '시설 안전점검 결과 공지',
      date: '2024.01.05',
      category: '안전',
      icon: 'ri-shield-check-line'
    },
    {
      title: '직원 채용 공고',
      date: '2023.12.28',
      category: '채용',
      icon: 'ri-user-add-line'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=professional%20corporate%20office%20building%20exterior%20with%20modern%20architecture%20clean%20design%20representing%20social%20welfare%20foundation%20headquarters%20with%20blue%20sky%20and%20green%20landscaping%20trustworthy%20atmosphere&width=1920&height=600&seq=corporation-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <i className="ri-government-line text-[#5C8D5A] text-xl"></i>
              <span className="text-sm font-semibold text-gray-700">운영법인</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              운영법인 소개
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              투명하고 신뢰할 수 있는 운영으로<br />
              어르신들의 행복한 노후를 책임집니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 법인 정보 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              법인 기본 정보
            </h2>
            <p className="text-lg text-gray-600">
              사회복지법인으로서 투명한 운영을 실천합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporationInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <i className={`${info.icon} text-2xl text-[#5C8D5A]`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">{info.label}</div>
                    <div className="text-base font-bold text-gray-900">{info.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <i className="ri-information-line text-2xl text-blue-600"></i>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">법인 소개</h4>
                <p className="text-gray-600 leading-relaxed">
                  사회복지법인 OO복지재단은 2010년 설립 이래 어르신들의 건강하고 행복한 노후를 위해 
                  최선을 다하고 있습니다. 전문적인 요양 서비스와 다양한 프로그램을 통해 
                  어르신들의 삶의 질 향상에 기여하고 있으며, 투명한 운영과 지속적인 개선으로 
                  신뢰받는 사회복지법인으로 성장하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 운영 시설 */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              운영 시설
            </h2>
            <p className="text-lg text-gray-600">
              법인이 운영하는 요양시설입니다
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <i className={`${facility.icon} text-4xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{facility.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <i className="ri-building-line text-[#5C8D5A]"></i>
                          <div>
                            <div className="text-xs text-gray-500">시설 유형</div>
                            <div className="text-sm font-semibold text-gray-900">{facility.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <i className="ri-user-line text-[#5C8D5A]"></i>
                          <div>
                            <div className="text-xs text-gray-500">정원</div>
                            <div className="text-sm font-semibold text-gray-900">{facility.capacity}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <i className="ri-map-pin-line text-[#5C8D5A]"></i>
                          <div>
                            <div className="text-xs text-gray-500">위치</div>
                            <div className="text-sm font-semibold text-gray-900">{facility.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <i className="ri-calendar-line text-[#5C8D5A]"></i>
                          <div>
                            <div className="text-xs text-gray-500">설립</div>
                            <div className="text-sm font-semibold text-gray-900">{facility.established}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 운영 현황 */}
      <section id="status" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              운영 현황
            </h2>
            <p className="text-lg text-gray-600">
              2024년 1월 기준 운영 현황입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operationStatus.map((status, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${status.color} px-6 py-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{status.title}</h3>
                    <i className={`${status.icon} text-3xl`}></i>
                  </div>
                  <div className="text-4xl font-bold mb-2">{status.value}</div>
                  <div className="text-sm opacity-90">{status.total}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-teal-50 to-amber-50">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${status.color}`}
                        style={{ width: `${status.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{status.percentage}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 고지사항 */}
      <section id="notice" className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              고지사항
            </h2>
            <p className="text-lg text-gray-600">
              법인 운영과 관련된 중요 공지사항입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 flex items-center justify-center flex-shrink-0">
                    <i className={`${announcement.icon} text-2xl text-[#5C8D5A]`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#5C8D5A] text-white text-xs font-bold rounded-full">
                        {announcement.category}
                      </span>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 hover:text-[#5C8D5A] transition-colors">
                      {announcement.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/notice"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#5C8D5A] text-[#5C8D5A] rounded-xl font-bold hover:bg-[#5C8D5A] hover:text-white transition-all cursor-pointer"
            >
              <span>전체 공지사항 보기</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </section>

      {/* 투명 경영 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              투명 경영 실천
            </h2>
            <p className="text-lg text-gray-600">
              신뢰받는 법인이 되기 위해 노력합니다
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5C8D5A] flex items-center justify-center flex-shrink-0">
                  <i className="ri-checkbox-circle-line text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">재정 투명성</h4>
                  <p className="text-gray-600 leading-relaxed">
                    모든 후원금과 운영비는 투명하게 공개되며, 정기적으로 회계 감사를 받습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5C8D5A] flex items-center justify-center flex-shrink-0">
                  <i className="ri-checkbox-circle-line text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">운영 공개</h4>
                  <p className="text-gray-600 leading-relaxed">
                    시설 운영 현황과 프로그램 실적을 정기적으로 공개하여 신뢰를 구축합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5C8D5A] flex items-center justify-center flex-shrink-0">
                  <i className="ri-checkbox-circle-line text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">품질 관리</h4>
                  <p className="text-gray-600 leading-relaxed">
                    정기적인 서비스 평가와 만족도 조사를 통해 지속적으로 서비스 품질을 개선합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5C8D5A] flex items-center justify-center flex-shrink-0">
                  <i className="ri-checkbox-circle-line text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">소통 강화</h4>
                  <p className="text-gray-600 leading-relaxed">
                    가족 간담회와 정기 상담을 통해 어르신과 가족의 의견을 적극 반영합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#5C8D5A] to-[#4A7548]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              더 자세한 정보가 필요하신가요?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              언제든지 문의해주시면 친절하게 안내해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-[#5C8D5A] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg cursor-pointer whitespace-nowrap"
              >
                <i className="ri-customer-service-2-line mr-2"></i>
                문의하기
              </a>
              <a
                href="/intro"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#5C8D5A] transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-building-line mr-2"></i>
                시설안내 보기
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}