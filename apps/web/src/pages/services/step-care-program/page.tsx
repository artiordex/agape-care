import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function StepCareProgramPage() {
  const stages = [
    {
      stage: '1단계',
      title: '적응 케어',
      period: '입소 후 1개월',
      color: 'from-[#A8D5BA] to-[#7BA178]',
      icon: 'ri-heart-add-line',
      description: '새로운 환경에 편안하게 적응할 수 있도록 집중적으로 돌봅니다',
      goals: [
        '요양원 환경과 생활 규칙 익히기',
        '다른 어르신들과 친밀감 형성',
        '개인별 건강 상태 상세 파악',
        '기본 생활 리듬 확립'
      ],
      activities: [
        { icon: 'ri-user-smile-line', title: '1:1 환영 면담', desc: '입소 첫날 개별 면담으로 불안감 해소' },
        { icon: 'ri-home-heart-line', title: '시설 안내 투어', desc: '식당, 프로그램실 등 주요 공간 소개' },
        { icon: 'ri-group-line', title: '소규모 그룹 활동', desc: '2~3명 소그룹으로 천천히 적응' },
        { icon: 'ri-calendar-check-line', title: '일과 적응 지원', desc: '식사, 휴식 시간 등 규칙적인 생활 안내' }
      ]
    },
    {
      stage: '2단계',
      title: '기능 유지 케어',
      period: '적응기 이후 안정기',
      color: 'from-[#7BA178] to-[#5C8D5A]',
      icon: 'ri-shield-star-line',
      description: '신체·인지 기능을 유지하고 일상생활 능력을 지속적으로 관리합니다',
      goals: [
        '현재 신체 기능 유지 및 개선',
        '인지 능력 저하 예방',
        '사회성 유지 및 관계 형성',
        '정서적 안정과 삶의 질 향상'
      ],
      activities: [
        { icon: 'ri-brain-line', title: '인지관리 프로그램', desc: '주 5회 정기 인지자극 활동' },
        { icon: 'ri-walk-line', title: '신체활동 프로그램', desc: '보행 훈련, 관절 운동, 근력 강화' },
        { icon: 'ri-music-2-line', title: '여가활동 프로그램', desc: '음악, 미술, 원예 등 다양한 활동' },
        { icon: 'ri-heart-pulse-line', title: '건강 모니터링', desc: '매일 혈압·혈당 체크 및 건강 관리' }
      ]
    },
    {
      stage: '3단계',
      title: '심화 케어',
      period: '집중 관리가 필요한 시기',
      color: 'from-[#5C8D5A] to-[#4A7148]',
      icon: 'ri-service-line',
      description: '건강 상태 변화나 특별한 돌봄이 필요한 경우 맞춤형 집중 케어를 제공합니다',
      goals: [
        '질병·부상 회복 지원',
        '신체 기능 저하 최소화',
        '24시간 집중 건강 관리',
        '보호자와 긴밀한 소통'
      ],
      activities: [
        { icon: 'ri-nurse-line', title: '집중 간호 관리', desc: '간호사의 밀착 건강 관리' },
        { icon: 'ri-hospital-line', title: '의료기관 연계', desc: '협력 병원과 신속한 진료 연계' },
        { icon: 'ri-wheelchair-line', title: '재활치료 강화', desc: '개인별 맞춤 재활 프로그램 운영' },
        { icon: 'ri-parent-line', title: '보호자 정기 보고', desc: '주 1~2회 건강 상태 상세 보고' }
      ]
    }
  ];

  const benefits = [
    {
      icon: 'ri-user-heart-line',
      title: '개인 맞춤 케어',
      description: '어르신 한 분 한 분의 상태와 필요에 맞춘 개별 케어 플랜을 수립합니다'
    },
    {
      icon: 'ri-time-line',
      title: '단계별 점진적 관리',
      description: '적응기→유지기→심화기로 이어지는 체계적인 단계별 케어를 제공합니다'
    },
    {
      icon: 'ri-team-line',
      title: '다학제 협력 케어',
      description: '간호사, 요양보호사, 사회복지사가 협력하여 종합적인 케어를 제공합니다'
    },
    {
      icon: 'ri-file-list-3-line',
      title: '기록 기반 관리',
      description: '모든 케어 과정은 기록되어 지속적으로 모니터링되고 개선됩니다'
    }
  ];

  const carePlan = [
    {
      title: '초기 평가',
      description: '입소 후 1주일 이내 종합 평가 실시',
      items: ['신체 기능 평가', '인지 기능 평가', '영양 상태 평가', '심리·정서 평가']
    },
    {
      title: '케어 플랜 수립',
      description: '평가 결과를 바탕으로 개인별 케어 계획 작성',
      items: ['단기 목표 설정', '장기 목표 설정', '프로그램 일정 수립', '가족 의견 반영']
    },
    {
      title: '정기 재평가',
      description: '3개월마다 재평가하여 케어 플랜 조정',
      items: ['변화 모니터링', '목표 달성도 확인', '케어 플랜 수정', '보호자 상담']
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#A8D5BA]/10 to-white pt-32 pb-20">
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
                  <span className="text-[#5C8D5A] font-semibold">단계별 맞춤 케어</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  단계별 맞춤 케어 프로그램
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  정원 29인 소규모 요양원의 장점을 살려, 입소 적응기부터 안정기, 그리고 집중 관리가 필요한 시기까지 어르신의 상태 변화에 맞춘 3단계 맞춤 케어를 제공합니다. 개인별 케어 플랜을 수립하고 지속적으로 모니터링하여 최적의 돌봄을 실현합니다.
                </p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 3단계 케어 프로그램 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#A8D5BA]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  3단계 케어
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  상태별 단계적 맞춤 케어
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  입소 적응부터 일상 유지, 집중 관리까지 각 단계에 필요한 케어를 제공합니다
                </p>
              </motion.div>

              <div className="space-y-12">
                {stages.map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className={`bg-gradient-to-br ${stage.color} rounded-3xl p-8 md:p-12 text-white mb-8`}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                          <i className={`${stage.icon} text-4xl text-white`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full mb-3">
                            {stage.stage}
                          </div>
                          <h3 className="text-3xl font-bold mb-2">{stage.title}</h3>
                          <p className="text-lg opacity-90">{stage.period}</p>
                        </div>
                      </div>
                      <p className="text-lg leading-relaxed opacity-95 mb-8">
                        {stage.description}
                      </p>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <i className="ri-target-line"></i>
                          케어 목표
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {stage.goals.map((goal, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <i className="ri-check-double-line text-xl flex-shrink-0 mt-0.5"></i>
                              <span className="text-sm">{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {stage.activities.map((activity, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-[#F9F8F6] rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-[#A8D5BA] to-[#7BA178] rounded-xl flex items-center justify-center mb-4">
                            <i className={`${activity.icon} text-2xl text-white`}></i>
                          </div>
                          <h4 className="text-base font-bold text-gray-800 mb-2">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {activity.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 케어 플랜 프로세스 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#A8D5BA]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  케어 플랜
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  개인별 케어 플랜 수립 과정
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  체계적인 평가와 계획 수립으로 최적의 맞춤 케어를 제공합니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {carePlan.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#A8D5BA] to-[#7BA178] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <span className="text-3xl font-bold text-white">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 text-center">
                      {plan.description}
                    </p>
                    <div className="space-y-3">
                      {plan.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#7BA178] rounded-full flex-shrink-0"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 프로그램 특징 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#A8D5BA]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  프로그램 특징
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  단계별 맞춤 케어의 장점
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  소규모 정원의 강점을 살린 체계적이고 세심한 케어를 제공합니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#F9F8F6] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#A8D5BA]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${benefit.icon} text-2xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
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
                className="bg-gradient-to-br from-[#A8D5BA] to-[#7BA178] rounded-3xl p-12 text-center text-white"
              >
                <h2 className="text-3xl font-bold mb-4">
                  단계별 맞춤 케어 상담
                </h2>
                <p className="text-base mb-8 opacity-90">
                  어르신의 상태에 맞는 최적의 케어 플랜을 안내해 드립니다
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