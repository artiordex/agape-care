import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function NutritionCarePage() {
  const nutritionServices = [
    {
      icon: 'ri-restaurant-2-line',
      title: '1일 3식 + 간식 제공',
      description: '아침, 점심, 저녁 식사와 오전·오후 간식을 영양 균형에 맞춰 제공합니다',
      details: ['아침 07:30', '점심 12:00', '저녁 18:00', '간식 10:00 / 15:00']
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '질환별 맞춤 식단',
      description: '당뇨, 고혈압, 신장질환 등 개인의 질환에 맞춘 특별 식단을 제공합니다',
      details: ['당뇨식 (저당식)', '저염식 (고혈압)', '저단백식 (신장질환)', '저지방식 (고지혈증)']
    },
    {
      icon: 'ri-tooth-line',
      title: '저작 상태별 식사',
      description: '어르신의 씹고 삼키는 능력에 따라 식사 형태를 조절하여 제공합니다',
      details: ['일반식', '부드러운 식사', '다진 식사', '유동식']
    },
    {
      icon: 'ri-user-star-line',
      title: '영양사 관리 체계',
      description: '영양사가 직접 식단을 구성하거나 위탁급식 영양사가 정기적으로 관리합니다',
      details: ['주간 식단 작성', '영양 상담', '식사 모니터링', '개인별 영양 평가']
    },
    {
      icon: 'ri-shield-check-line',
      title: 'HACCP 식자재 사용',
      description: '위생 안전이 검증된 HACCP 인증 식자재만을 사용하여 안전한 식사를 제공합니다',
      details: ['신선한 식자재', '위생 검증 완료', '매일 식재료 점검', '냉장·냉동 관리']
    },
    {
      icon: 'ri-calendar-line',
      title: '계절별 식단 운영',
      description: '계절에 맞는 제철 식재료를 활용하여 영양과 맛을 동시에 챙깁니다',
      details: ['봄 제철 식단', '여름 보양 식단', '가을 건강 식단', '겨울 따뜻한 식단']
    }
  ];

  const weeklyMenu = [
    { day: '월요일', breakfast: '흰죽, 계란찜, 김치', lunch: '쌀밥, 된장찌개, 생선구이, 나물', dinner: '쌀밥, 미역국, 두부조림, 김치' },
    { day: '화요일', breakfast: '토스트, 우유, 과일', lunch: '쌀밥, 육개장, 불고기, 샐러드', dinner: '쌀밥, 콩나물국, 계란말이, 김치' },
    { day: '수요일', breakfast: '흰죽, 멸치볶음, 김치', lunch: '쌀밥, 김치찌개, 제육볶음, 나물', dinner: '쌀밥, 북어국, 두부조림, 김치' },
    { day: '목요일', breakfast: '시리얼, 우유, 바나나', lunch: '쌀밥, 갈비탕, 잡채, 김치', dinner: '쌀밥, 된장국, 생선조림, 나물' },
    { day: '금요일', breakfast: '흰죽, 계란찜, 김치', lunch: '쌀밥, 순두부찌개, 삼겹살, 상추', dinner: '쌀밥, 미역국, 함박스테이크, 샐러드' }
  ];

  const nutritionStandards = [
    {
      icon: 'ri-user-heart-line',
      title: '영양사 관리',
      description: '영양사가 직접 고용되거나 위탁급식 영양사가 정기적으로 식단을 관리합니다'
    },
    {
      icon: 'ri-file-list-3-line',
      title: '식단표 사전 공개',
      description: '주간 식단표를 사전에 작성하여 보호자님께 공유하고 게시합니다'
    },
    {
      icon: 'ri-shield-star-line',
      title: '위생 안전 관리',
      description: '식품위생법과 급식 위생 기준을 철저히 준수하여 안전한 식사를 제공합니다'
    },
    {
      icon: 'ri-parent-line',
      title: '보호자 의견 반영',
      description: '어르신과 보호자님의 음식 선호도와 요청 사항을 적극 반영합니다'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-lime-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-green-500 via-lime-500 to-yellow-400 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#E8D5B5]/20 to-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Link to="/" className="hover:text-[#5C8D5A] transition-colors">홈</Link>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="text-[#5C8D5A] font-semibold">영양관리</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  영양관리
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  정원 29인 요양원에서는 영양사가 직접 관리하거나 위탁급식 체계를 통해 어르신의 건강 상태와 질환에 맞춘 맞춤형 식단을 제공합니다. 1일 3식과 간식, 저작 상태별 식사, HACCP 인증 식자재 사용으로 안전하고 건강한 식사를 책임집니다.
                </p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 영양 서비스 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#D4A574]/10 text-[#8B6F47] text-sm font-semibold rounded-full mb-4">
                  영양 서비스
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  맞춤형 영양 관리 서비스
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  어르신의 건강을 생각한 안전하고 영양가 높은 식사를 제공합니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nutritionServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#F9F8F6] rounded-2xl p-8 border border-gray-100 hover:border-[#D4A574]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#D4A574]/10 rounded-2xl flex items-center justify-center mb-6">
                      <i className={`${service.icon} text-3xl text-[#8B6F47]`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#D4A574] rounded-full"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 주간 식단표 예시 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#D4A574]/10 text-[#8B6F47] text-sm font-semibold rounded-full mb-4">
                  식단표 예시
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  주간 식단표
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  영양 균형을 고려한 일주일 식단 예시입니다 (실제 식단은 매주 변경됩니다)
                </p>
              </motion.div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#D4A574] to-[#C4976B]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">요일</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">아침</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">점심</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">저녁</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {weeklyMenu.map((menu, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="hover:bg-[#F9F8F6] transition-colors"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-800">{menu.day}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{menu.breakfast}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{menu.lunch}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{menu.dinner}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-gray-500 mb-4">
                  ※ 실제 식단은 계절, 식자재 수급 상황, 어르신 선호도에 따라 변경될 수 있습니다
                </p>
                <a
                  href="/communities?category=식단표"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B6F47] hover:text-[#6B5437] transition-colors cursor-pointer"
                >
                  <span>이번 주 식단표 보기</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </motion.div>
            </div>
          </section>

          {/* 운영 기준 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#D4A574]/10 text-[#8B6F47] text-sm font-semibold rounded-full mb-4">
                  운영 기준
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  안전하고 체계적인 급식 관리
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  식품위생법과 급식 관리 기준을 철저히 준수하여 운영합니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {nutritionStandards.map((standard, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#F9F8F6] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#D4A574]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${standard.icon} text-2xl text-[#8B6F47]`}></i>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-3">
                      {standard.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {standard.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 상담 CTA */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#D4A574] to-[#B8936A] rounded-3xl p-12 text-center text-white"
              >
                <h2 className="text-3xl font-bold mb-4">
                  영양관리 서비스 문의
                </h2>
                <p className="text-base mb-8 opacity-90">
                  어르신에게 맞는 식단과 영양 관리를 안내해 드립니다
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:02-1234-5678"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#8B6F47] px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-phone-line text-xl"></i>
                    전화 상담하기
                  </a>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all whitespace-nowrap border-2 border-white/30 cursor-pointer"
                  >
                    <i className="ri-mail-line text-xl"></i>
                    온라인 문의
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}