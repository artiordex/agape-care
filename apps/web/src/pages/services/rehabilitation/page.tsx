import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function RehabilitationPage() {
  const programs = [
    {
      icon: 'ri-walk-line',
      title: '보행 훈련',
      description: '안전하게 걷는 능력을 회복하고 유지하기 위한 체계적인 보행 훈련을 제공합니다',
      activities: ['평행봉 보행 연습', '워커 보행 훈련', '계단 오르내리기', '균형 감각 훈련']
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '관절 운동 치료',
      description: '관절의 유연성과 가동 범위를 유지하고 개선하는 운동을 진행합니다',
      activities: ['어깨·팔 관절 운동', '무릎·다리 관절 운동', '손·손가락 관절 운동', '척추 유연성 운동']
    },
    {
      icon: 'ri-body-scan-line',
      title: '근력 강화 운동',
      description: '일상생활에 필요한 기본 근력을 유지하고 향상시키는 프로그램입니다',
      activities: ['밴드 운동', '아령 운동', '의자 스쿼트', '복근·등근육 강화']
    },
    {
      icon: 'ri-hand-heart-line',
      title: '손·손가락 기능 회복',
      description: '일상 동작에 필요한 손의 미세 운동 능력을 회복하고 유지합니다',
      activities: ['손가락 구부리기', '작은 물건 집기', '퍼즐 맞추기', '점토 만들기']
    },
    {
      icon: 'ri-stretch-line',
      title: '스트레칭 프로그램',
      description: '근육의 긴장을 완화하고 유연성을 높이는 스트레칭 활동을 진행합니다',
      activities: ['전신 스트레칭', '목·어깨 이완', '허리·골반 스트레칭', '종아리·발목 운동']
    },
    {
      icon: 'ri-mental-health-line',
      title: '낙상 예방 훈련',
      description: '균형 감각과 근력을 강화하여 낙상 위험을 줄이는 예방 프로그램입니다',
      activities: ['균형잡기 훈련', '반응 속도 훈련', '안전한 일어서기', '낙상 대처법 교육']
    }
  ];

  const operationMethods = [
    {
      icon: 'ri-home-heart-line',
      title: '자체 운영',
      description: '시설 내 재활치료실을 갖추고 전문 물리치료사가 상주하여 직접 재활 프로그램을 운영합니다'
    },
    {
      icon: 'ri-user-star-line',
      title: '방문 치료',
      description: '외부 협력 물리치료사가 정기적으로 방문하여 개인별 맞춤 재활 치료를 제공합니다'
    },
    {
      icon: 'ri-links-line',
      title: '의료기관 연계',
      description: '협력 병원 및 재활 전문 기관과 연계하여 필요한 경우 전문 재활 치료를 지원합니다'
    }
  ];

  const benefits = [
    {
      icon: 'ri-shield-check-line',
      title: '낙상 위험 감소',
      description: '균형 감각과 근력 향상으로 낙상 사고를 예방합니다'
    },
    {
      icon: 'ri-user-smile-line',
      title: '일상 기능 회복',
      description: '스스로 움직이고 활동하는 능력을 회복하여 삶의 질이 향상됩니다'
    },
    {
      icon: 'ri-heart-add-line',
      title: '만성 통증 완화',
      description: '관절과 근육의 통증을 완화하고 신체 기능을 개선합니다'
    },
    {
      icon: 'ri-emotion-happy-line',
      title: '심리적 안정',
      description: '신체 활동을 통해 우울감이 감소하고 정서적 안정을 찾습니다'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-indigo-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#96B493]/5 to-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Link to="/" className="hover:text-[#5C8D5A] transition-colors">홈</Link>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="text-[#5C8D5A] font-semibold">재활치료 서비스</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  재활치료 서비스
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  정원 29인 요양원에서는 자체 물리치료실 운영 또는 외부 전문 물리치료사와의 협력을 통해 어르신의 신체 기능 회복과 유지를 돕는 재활 프로그램을 제공합니다. 보행 훈련, 관절 운동, 근력 강화, 낙상 예방 등 개인의 상태에 맞춘 체계적인 재활 치료가 진행됩니다.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 재활 프로그램 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#96B493]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  재활 프로그램
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  체계적인 재활 치료 프로그램
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  어르신의 신체 상태와 목표에 맞춘 맞춤형 재활 프로그램을 제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F8F6] rounded-2xl p-8 border border-gray-100 hover:border-[#96B493]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#96B493]/10 rounded-2xl flex items-center justify-center mb-6">
                      <i className={`${program.icon} text-3xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2">
                      {program.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#96B493] rounded-full"></div>
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 운영 방식 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#96B493]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  운영 방식
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  다양한 재활 치료 운영 체계
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  시설 여건에 따라 자체 운영, 방문 치료, 의료기관 연계 등 적합한 방식으로 재활 서비스를 제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {operationMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#96B493]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className={`${method.icon} text-3xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#5C8D5A]/10 to-[#96B493]/10 rounded-3xl p-10 text-center">
                <i className="ri-time-line text-5xl text-[#5C8D5A] mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  개인별 맞춤 일정 운영
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  어르신의 건강 상태와 재활 목표에 따라 주 2~3회 또는 매일 진행되는 개인별 맞춤 재활 일정을 수립하며, 모든 치료 내용은 기록되어 보호자님께 정기적으로 공유됩니다.
                </p>
              </div>
            </div>
          </section>

          {/* 재활 치료 효과 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#96B493]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  기대 효과
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  재활 치료를 통한 긍정적 변화
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  체계적인 재활 치료로 어르신의 신체 기능과 삶의 질이 향상됩니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F8F6] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#96B493]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${benefit.icon} text-2xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 상담 CTA */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-[#96B493] to-[#5C8D5A] rounded-3xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  재활치료 서비스 문의
                </h2>
                <p className="text-base mb-8 opacity-90">
                  어르신께 적합한 재활 프로그램을 안내해 드립니다
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
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}