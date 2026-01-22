import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function MedicalNursingPage() {
  const services = [
    {
      icon: 'ri-heart-pulse-line',
      title: '건강 상태 모니터링',
      description: '간호사·간호조무사가 매일 혈압, 혈당, 체온 등 활력징후를 체크하고 기록합니다',
      details: ['혈압·혈당 측정', '체온 체크', '맥박 및 호흡 확인', '이상 징후 즉시 보고']
    },
    {
      icon: 'ri-capsule-line',
      title: '투약 관리',
      description: '처방받은 약물을 정확한 시간에 안전하게 복용할 수 있도록 관리합니다',
      details: ['개인별 투약 일정 관리', '복약 확인 및 기록', '약물 부작용 모니터링', '처방 변경 사항 반영']
    },
    {
      icon: 'ri-hospital-line',
      title: '협력 의료기관 연계',
      description: '내과, 정형외과, 치과 등 협력 병원과의 긴밀한 연계로 신속한 진료를 지원합니다',
      details: ['정기 건강검진 연계', '외래 진료 동행', '입원 치료 지원', '전문의 자문']
    },
    {
      icon: 'ri-first-aid-kit-line',
      title: '응급 상황 대응',
      description: '낙상, 질식, 급성 질환 등 응급 상황 발생 시 즉각 대응하고 119와 연계합니다',
      details: ['응급처치 실시', '119 신속 연락', '보호자 즉시 통보', '병원 이송 동행']
    },
    {
      icon: 'ri-syringe-line',
      title: '기본 의료 처치',
      description: '상처 소독, 욕창 관리, 카테터 관리 등 기본적인 의료 처치를 제공합니다',
      details: ['상처 소독 및 드레싱', '욕창 예방 및 관리', '도뇨관·위관 관리', '흡인 및 산소 관리']
    },
    {
      icon: 'ri-stethoscope-line',
      title: '만성 질환 관리',
      description: '고혈압, 당뇨, 치매 등 만성 질환을 체계적으로 관리하고 악화를 예방합니다',
      details: ['혈압·혈당 정기 측정', '식이 조절 지원', '운동 요법 안내', '합병증 예방 교육']
    }
  ];

  const cooperationHospitals = [
    { type: '내과', service: '정기 건강검진, 만성질환 관리' },
    { type: '정형외과', service: '골절, 관절 질환 치료' },
    { type: '치과', service: '구강 검진, 치아 치료' },
    { type: '안과', service: '시력 검사, 백내장 진료' },
    { type: '이비인후과', service: '청력 검사, 이명 치료' },
    { type: '피부과', service: '욕창, 피부 질환 치료' }
  ];

  const nursingStandards = [
    {
      icon: 'ri-nurse-line',
      title: '법정 인력 기준 준수',
      description: '간호사 또는 간호조무사 1명 이상 상주하여 24시간 건강 관리를 제공합니다'
    },
    {
      icon: 'ri-time-line',
      title: '24시간 상주 체계',
      description: '낮과 밤 교대 근무로 언제든지 어르신의 건강 상태를 확인할 수 있습니다'
    },
    {
      icon: 'ri-file-text-line',
      title: '건강 기록 관리',
      description: '모든 건강 체크와 투약 내역은 개별 기록지에 작성되어 체계적으로 관리됩니다'
    },
    {
      icon: 'ri-parent-line',
      title: '보호자 정기 보고',
      description: '어르신의 건강 상태와 의료 서비스 내역을 보호자님께 정기적으로 공유합니다'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-cyan-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#5C8D5A]/5 to-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Link to="/" className="hover:text-[#5C8D5A] transition-colors">홈</Link>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="text-[#5C8D5A] font-semibold">의료지원·간호서비스</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  의료지원·간호서비스
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  정원 29인 소규모 요양원 법정 기준에 따라 간호사 또는 간호조무사가 상주하며, 어르신의 건강 상태를 24시간 모니터링하고 투약 관리, 응급 상황 대응, 협력 의료기관 연계 등 전문적인 의료지원 서비스를 제공합니다.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 서비스 목록 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  제공 서비스
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  전문적인 의료지원·간호 서비스
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  어르신의 건강을 지키는 체계적이고 안전한 의료 케어를 제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F8F6] rounded-2xl p-8 border border-gray-100 hover:border-[#5C8D5A]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-2xl flex items-center justify-center mb-6">
                      <i className={`${service.icon} text-3xl text-[#5C8D5A]`}></i>
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
                          <div className="w-1.5 h-1.5 bg-[#5C8D5A] rounded-full"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 협력 의료기관 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  의료 연계
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  협력 의료기관 네트워크
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  전문 의료기관과의 긴밀한 협력으로 신속하고 정확한 진료를 지원합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cooperationHospitals.map((hospital, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center">
                        <i className="ri-hospital-fill text-xl text-[#5C8D5A]"></i>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {hospital.type}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {hospital.service}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gradient-to-br from-[#5C8D5A]/10 to-[#7BA178]/10 rounded-3xl p-10 text-center">
                <i className="ri-ambulance-line text-5xl text-[#5C8D5A] mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  응급 의료 연계 시스템
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  응급 상황 발생 시 119 긴급 출동 요청과 동시에 협력 병원 응급실로 신속하게 이송되며, 간호 인력이 동행하여 어르신의 상태를 정확하게 전달합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 운영 기준 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  운영 기준
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  노인장기요양보험법 기준 준수
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  법정 기준을 철저히 준수하여 안전하고 전문적인 의료서비스를 제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {nursingStandards.map((standard, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F8F6] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${standard.icon} text-2xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-3">
                      {standard.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {standard.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 상담 CTA */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-[#5C8D5A] to-[#4A7148] rounded-3xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  의료지원·간호서비스 문의
                </h2>
                <p className="text-base mb-8 opacity-90">
                  어르신의 건강 상태에 맞는 의료 서비스를 안내해 드립니다
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