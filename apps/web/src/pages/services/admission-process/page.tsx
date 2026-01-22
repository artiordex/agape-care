import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function AdmissionProcessPage() {
  const steps = [
    {
      step: '1단계',
      title: '장기요양등급 신청',
      icon: 'ri-file-text-line',
      description: '국민건강보험공단에 장기요양등급 인정 신청을 합니다',
      details: [
        '신청 자격: 만 65세 이상 또는 노인성 질환자',
        '신청 장소: 가까운 국민건강보험공단 지사',
        '신청 방법: 방문, 우편, 팩스, 인터넷',
        '준비 서류: 신청서, 의사소견서(해당 시)'
      ]
    },
    {
      step: '2단계',
      title: '방문 조사 및 등급 판정',
      icon: 'ri-clipboard-line',
      description: '공단 직원이 가정을 방문하여 조사하고 등급심사위원회에서 등급을 결정합니다',
      details: [
        '방문 조사: 신청 후 약 2주 이내',
        '조사 내용: 신체 기능, 인지 기능, 행동 변화',
        '등급 판정: 조사 후 약 2주 이내 결과 통보',
        '등급 구분: 1~5등급, 인지지원등급'
      ]
    },
    {
      step: '3단계',
      title: '요양원 상담 및 방문',
      icon: 'ri-customer-service-2-line',
      description: '등급 결정 후 요양원에 연락하여 상담을 진행하고 시설을 방문합니다',
      details: [
        '전화 상담: 02-1234-5678',
        '시설 방문: 사전 예약 필수',
        '상담 내용: 어르신 상태, 제공 서비스, 비용',
        '시설 둘러보기: 침실, 식당, 프로그램실 등'
      ]
    },
    {
      step: '4단계',
      title: '입소 계약 및 서류 제출',
      icon: 'ri-file-edit-line',
      description: '입소가 결정되면 계약서를 작성하고 필요한 서류를 제출합니다',
      details: [
        '입소 계약서 작성',
        '필수 서류 제출 (아래 목록 참조)',
        '건강검진 결과 제출',
        '비용 납부 안내'
      ]
    },
    {
      step: '5단계',
      title: '입소 준비 및 입소',
      icon: 'ri-home-heart-line',
      description: '입소일을 정하고 개인 물품을 준비하여 입소합니다',
      details: [
        '입소일 결정',
        '개인 물품 준비 (의류, 세면도구 등)',
        '입소 당일 보호자 동행',
        '적응 기간 안내 (약 1개월)'
      ]
    }
  ];

  const requiredDocuments = [
    { icon: 'ri-file-list-3-line', title: '장기요양인정서', description: '공단에서 발급받은 등급 인정서 사본' },
    { icon: 'ri-parent-line', title: '신분증 사본', description: '어르신과 보호자 신분증 사본' },
    { icon: 'ri-hospital-line', title: '건강검진 결과서', description: '입소 전 3개월 이내 건강검진 결과' },
    { icon: 'ri-file-user-line', title: '주민등록등본', description: '주민등록등본 1부' },
    { icon: 'ri-medicine-bottle-line', title: '복용 약 리스트', description: '현재 복용 중인 약 목록 및 처방전' },
    { icon: 'ri-shield-check-line', title: '보험증권 (선택)', description: '가입한 보험이 있는 경우 증권 사본' }
  ];

  const costInfo = [
    {
      grade: '1등급',
      monthlyCost: '약 60만원',
      selfPay: '본인부담금 20%',
      description: '최중증 상태, 공단 급여 80% 지원'
    },
    {
      grade: '2등급',
      monthlyCost: '약 55만원',
      selfPay: '본인부담금 20%',
      description: '중증 상태, 공단 급여 80% 지원'
    },
    {
      grade: '3등급',
      monthlyCost: '약 50만원',
      selfPay: '본인부담금 20%',
      description: '중등도 상태, 공단 급여 80% 지원'
    },
    {
      grade: '4등급',
      monthlyCost: '약 45만원',
      selfPay: '본인부담금 20%',
      description: '경증 상태, 공단 급여 80% 지원'
    },
    {
      grade: '5등급',
      monthlyCost: '약 40만원',
      selfPay: '본인부담금 20%',
      description: '경미한 상태, 공단 급여 80% 지원'
    }
  ];

  const personalItems = [
    { category: '의류', items: ['속옷 5~7벌', '일상복 5~7벌', '외출복 2~3벌', '양말 7켤레', '실내화'] },
    { category: '세면도구', items: ['칫솔, 치약', '비누, 샴푸', '수건 3~5장', '로션, 크림'] },
    { category: '침구류', items: ['베개 (선택)', '담요 (선택)', '※ 침대와 이불은 시설에서 제공'] },
    { category: '기타', items: ['안경, 보청기', '틀니 보관함', '개인 컵', '사진 (선택)']}
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-amber-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#7BA178]/10 to-white pt-32 pb-20">
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
                  <span className="text-[#5C8D5A] font-semibold">입소절차안내</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  입소절차안내
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  정원 29인 요양원 입소를 위한 전체 절차와 필요한 서류, 비용 안내를 상세히 안내해 드립니다. 장기요양등급 1~5등급 수급자께서 입소 가능하며, 상담부터 입소까지 보호자님을 세심하게 도와드립니다.
                </p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 입소 절차 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#7BA178]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  입소 절차
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  5단계 입소 절차
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  장기요양등급 신청부터 입소까지 전체 과정을 안내합니다
                </p>
              </motion.div>

              <div className="space-y-8">
                {steps.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#F9F8F6] rounded-2xl p-8 border border-gray-100 hover:border-[#7BA178]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#7BA178] to-[#5C8D5A] rounded-2xl flex items-center justify-center">
                          <i className={`${item.icon} text-3xl text-white`}></i>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-[#7BA178]/10 text-[#5C8D5A] text-sm font-bold rounded-full">
                            {item.step}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-base text-gray-600 mb-6">
                          {item.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <i className="ri-check-line text-[#7BA178] text-lg flex-shrink-0 mt-0.5"></i>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 필요 서류 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#7BA178]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  필요 서류
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  입소 시 제출 서류
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  입소 계약 시 아래 서류를 준비해 주시기 바랍니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requiredDocuments.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#7BA178]/10 rounded-xl flex items-center justify-center mb-4">
                      <i className={`${doc.icon} text-2xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {doc.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 비용 안내 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#7BA178]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  비용 안내
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  등급별 입소 비용
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  장기요양등급에 따른 월 이용 비용 안내입니다 (2025년 기준 예시)
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {costInfo.map((cost, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#F9F8F6] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="inline-block px-4 py-2 bg-[#7BA178]/10 text-[#5C8D5A] font-bold text-lg rounded-full mb-4">
                      {cost.grade}
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {cost.monthlyCost}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {cost.selfPay}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {cost.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#7BA178]/10 to-[#5C8D5A]/10 rounded-3xl p-10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <i className="ri-information-line text-3xl text-[#5C8D5A] flex-shrink-0"></i>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      비용 안내 사항
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#5C8D5A]">•</span>
                        <span>위 금액은 2025년 기준 예시이며, 실제 비용은 요양원과 상담 시 정확히 안내됩니다</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#5C8D5A]">•</span>
                        <span>기초생활수급자, 차상위계층은 본인부담금 감경 혜택이 있습니다</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#5C8D5A]">•</span>
                        <span>식비, 이미용비 등 비급여 항목은 별도 비용이 발생할 수 있습니다</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#5C8D5A]">•</span>
                        <span>상세한 비용 문의는 전화 또는 방문 상담을 통해 안내받으실 수 있습니다</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 준비물 안내 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#7BA178]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  준비물
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  입소 시 준비물
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  편안한 요양 생활을 위해 아래 물품을 준비해 주세요
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {personalItems.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-[#7BA178]">
                      {category.category}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                          <i className="ri-check-line text-[#7BA178] text-lg flex-shrink-0 mt-0.5"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 상담 CTA */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#7BA178] to-[#5C8D5A] rounded-3xl p-12 text-center text-white"
              >
                <h2 className="text-3xl font-bold mb-4">
                  입소 상담 신청
                </h2>
                <p className="text-base mb-8 opacity-90">
                  입소 절차와 비용에 대해 자세히 안내해 드립니다
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:02-1234-5678"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#5C8D5A] px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-phone-line text-xl"></i>
                    전화 상담하기
                  </a>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all whitespace-nowrap border-2 border-white/30 cursor-pointer"
                  >
                    <i className="ri-calendar-check-line text-xl"></i>
                    방문 예약하기
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