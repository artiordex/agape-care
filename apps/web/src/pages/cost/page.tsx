import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';

export default function CostPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  const costByGrade = [
    {
      grade: '1등급',
      monthlyFee: '1,850,000원',
      personalCost: '277,500원',
      mealCost: '180,000원',
      totalCost: '457,500원',
      description: '최중증 어르신',
      color: 'from-red-500 to-red-600'
    },
    {
      grade: '2등급',
      monthlyFee: '1,650,000원',
      personalCost: '247,500원',
      mealCost: '180,000원',
      totalCost: '427,500원',
      description: '중증 어르신',
      color: 'from-orange-500 to-orange-600'
    },
    {
      grade: '3등급',
      monthlyFee: '1,450,000원',
      personalCost: '217,500원',
      mealCost: '180,000원',
      totalCost: '397,500원',
      description: '중등도 어르신',
      color: 'from-amber-500 to-amber-600'
    },
    {
      grade: '4등급',
      monthlyFee: '1,250,000원',
      personalCost: '187,500원',
      mealCost: '180,000원',
      totalCost: '367,500원',
      description: '경증 어르신',
      color: 'from-green-500 to-green-600'
    },
    {
      grade: '5등급',
      monthlyFee: '1,050,000원',
      personalCost: '157,500원',
      mealCost: '180,000원',
      totalCost: '337,500원',
      description: '경증 어르신',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const discountInfo = [
    {
      type: '기초생활수급자',
      discount: '본인부담금 면제',
      icon: 'ri-shield-check-line',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      type: '의료급여 수급자',
      discount: '본인부담금 50% 감면',
      icon: 'ri-hospital-line',
      color: 'bg-green-50 text-green-600'
    },
    {
      type: '국가유공자',
      discount: '본인부담금 감면',
      icon: 'ri-medal-line',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      type: '다자녀 가구',
      discount: '본인부담금 감면',
      icon: 'ri-parent-line',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const additionalCosts = [
    { item: '이미용비', cost: '10,000원', period: '월 1회' },
    { item: '간식비', cost: '30,000원', period: '월' },
    { item: '기저귀', cost: '50,000원', period: '월' },
    { item: '개인 의약품', cost: '실비', period: '필요시' },
    { item: '외출 동행', cost: '협의', period: '필요시' }
  ];

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=modern%20financial%20planning%20consultation%20desk%20with%20calculator%20documents%20and%20warm%20professional%20atmosphere%20clean%20organized%20office%20space%20natural%20lighting%20comfortable%20setting%20for%20elderly%20care%20cost%20discussion&width=1920&height=600&seq=cost-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <i className="ri-money-dollar-circle-line text-[#5C8D5A] text-xl"></i>
              <span className="text-sm font-semibold text-gray-700">비용안내</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              입소 비용 안내
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              장기요양등급에 따른 투명한 비용 안내<br />
              감면 혜택 및 추가 비용까지 자세히 알려드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 등급별 비용 */}
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
              장기요양등급별 비용
            </h2>
            <p className="text-lg text-gray-600">
              2024년 기준 월 이용료 (본인부담금 15% 기준)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {costByGrade.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${item.color} px-6 py-8 text-white`}>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">{item.grade}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">월 급여비</span>
                    <span className="text-base font-semibold text-gray-900">{item.monthlyFee}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">본인부담금 (15%)</span>
                    <span className="text-base font-semibold text-[#5C8D5A]">{item.personalCost}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">식사비</span>
                    <span className="text-base font-semibold text-gray-900">{item.mealCost}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-gray-900">월 총 비용</span>
                    <span className="text-2xl font-bold text-[#5C8D5A]">{item.totalCost}</span>
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
                <h4 className="text-lg font-bold text-gray-900 mb-2">비용 안내</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-blue-600 mt-1"></i>
                    <span>본인부담금은 장기요양급여비의 15%입니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-blue-600 mt-1"></i>
                    <span>식사비는 별도로 부담하시며, 1일 3식 기준입니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-blue-600 mt-1"></i>
                    <span>비용은 정부 정책에 따라 변동될 수 있습니다</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 감면 혜택 */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              감면 혜택 안내
            </h2>
            <p className="text-lg text-gray-600">
              대상자에 따라 본인부담금 감면 혜택이 제공됩니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <i className={`${item.icon} text-3xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.type}</h3>
                <p className="text-sm text-gray-600">{item.discount}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-md border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <i className="ri-star-line text-2xl text-amber-600"></i>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">감면 신청 방법</h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  감면 혜택을 받으시려면 해당 증명서류를 제출하셔야 합니다. 
                  자세한 신청 방법은 국민건강보험공단 또는 시설로 문의해주세요.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:1577-1000"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#5C8D5A] text-white rounded-lg font-semibold hover:bg-[#4A7548] transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-phone-line"></i>
                    <span>건강보험공단 1577-1000</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#5C8D5A] text-[#5C8D5A] rounded-lg font-semibold hover:bg-[#5C8D5A] hover:text-white transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-customer-service-2-line"></i>
                    <span>시설 상담하기</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 추가 비용 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              추가 비용 안내
            </h2>
            <p className="text-lg text-gray-600">
              필요에 따라 발생할 수 있는 추가 비용입니다
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#5C8D5A] text-white">
                    <th className="px-6 py-4 text-left font-bold">항목</th>
                    <th className="px-6 py-4 text-center font-bold">비용</th>
                    <th className="px-6 py-4 text-center font-bold">주기</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {additionalCosts.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 transition-all">
                      <td className="px-6 py-4 font-semibold text-gray-900">{item.item}</td>
                      <td className="px-6 py-4 text-center text-[#5C8D5A] font-bold">{item.cost}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{item.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <i className="ri-alert-line text-xl text-amber-600"></i>
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">추가 비용 안내</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  위 비용은 선택 사항이며, 개인의 필요에 따라 발생합니다. 
                  모든 비용은 투명하게 고지되며, 사전 동의 후 청구됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 비용 계산 예시 */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              비용 계산 예시
            </h2>
            <p className="text-lg text-gray-600">
              실제 납부하시는 비용 예시입니다
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-line text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">3등급 어르신 (일반 가구)</h3>
                  <p className="text-sm text-gray-600">월 납부 비용 예시</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">본인부담금 (15%)</span>
                  <span className="text-lg font-semibold text-gray-900">217,500원</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">식사비</span>
                  <span className="text-lg font-semibold text-gray-900">180,000원</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">간식비</span>
                  <span className="text-lg font-semibold text-gray-900">30,000원</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">기저귀</span>
                  <span className="text-lg font-semibold text-gray-900">50,000원</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">이미용비</span>
                  <span className="text-lg font-semibold text-gray-900">10,000원</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-[#5C8D5A]">
                  <span className="text-xl font-bold text-gray-900">월 총 비용</span>
                  <span className="text-3xl font-bold text-[#5C8D5A]">487,500원</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              * 위 금액은 예시이며, 개인의 상황과 필요에 따라 달라질 수 있습니다.<br />
              정확한 비용은 상담을 통해 안내받으실 수 있습니다.
            </p>
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
              비용 상담이 필요하신가요?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              개인별 맞춤 비용 안내를 받아보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-[#5C8D5A] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg cursor-pointer whitespace-nowrap"
              >
                <i className="ri-customer-service-2-line mr-2"></i>
                비용 상담하기
              </a>
              <a
                href="/admission"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#5C8D5A] transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-file-list-3-line mr-2"></i>
                입소안내 보기
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}