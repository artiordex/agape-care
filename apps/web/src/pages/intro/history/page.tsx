import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

export default function HistoryPage() {
  const historyData = [
    {
      year: '2024',
      events: [
        { month: '03', title: '장기요양기관 평가 A등급 획득', description: '보건복지부 주관 장기요양기관 평가에서 최우수 등급 획득' },
        { month: '01', title: '신규 재활치료실 확장', description: '최신 재활 장비 도입 및 치료 공간 확대' }
      ]
    },
    {
      year: '2023',
      events: [
        { month: '11', title: '인지케어 프로그램 우수사례 선정', description: '지역 보건소 주관 우수 프로그램 사례로 선정' },
        { month: '06', title: '가족 만족도 조사 95% 달성', description: '입소자 가족 대상 만족도 조사에서 높은 평가' },
        { month: '03', title: '직원 전문교육 프로그램 시행', description: '요양보호사 및 간호사 대상 전문 교육 강화' }
      ]
    },
    {
      year: '2022',
      events: [
        { month: '09', title: '지역사회 봉사활동 우수기관 표창', description: '지역사회 공헌 활동으로 시장 표창 수상' },
        { month: '05', title: '시설 리모델링 완료', description: '쾌적한 생활환경 조성을 위한 전면 리모델링' },
        { month: '02', title: '영양관리 프로그램 도입', description: '개인별 맞춤 영양관리 시스템 구축' }
      ]
    },
    {
      year: '2021',
      events: [
        { month: '10', title: '의료기관 협력 네트워크 구축', description: '인근 종합병원과 의료 협력 체계 마련' },
        { month: '04', title: '코로나19 방역 우수기관 선정', description: '철저한 방역 관리로 감염병 예방 우수사례 인정' }
      ]
    },
    {
      year: '2020',
      events: [
        { month: '12', title: '정원 29인 확대', description: '시설 증축을 통한 입소 정원 확대' },
        { month: '07', title: '가족소통 플랫폼 오픈', description: '온라인 면회 및 소통 시스템 구축' }
      ]
    },
    {
      year: '2019',
      events: [
        { month: '11', title: '프로그램실 신설', description: '다양한 여가 및 재활 프로그램 운영 공간 마련' },
        { month: '03', title: '요양원 개원', description: '29인 규모 노인요양시설 정식 개원' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <i className="ri-time-line text-white text-xl"></i>
              <span className="text-white font-medium">Our History</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              연혁
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              어르신들의 행복한 노후를 위해 걸어온 우리의 발자취입니다
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-amber-500 transform -translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {historyData.map((yearData, yearIndex) => (
                <div key={yearIndex} className="relative">
                  {/* Year Badge */}
                  <div className="flex justify-center mb-12">
                    <div className="relative z-10 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full shadow-lg">
                      <span className="text-3xl font-bold text-white">{yearData.year}</span>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="space-y-8">
                    {yearData.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`flex items-center gap-8 ${
                          eventIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                      >
                        {/* Content Card */}
                        <div className={`flex-1 ${eventIndex % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-3">
                              {eventIndex % 2 === 0 ? (
                                <>
                                  <div className="md:ml-auto flex items-center gap-3">
                                    <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                                      {event.month}월
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                                  {event.month}월
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        {/* Center Dot */}
                        <div className="hidden md:flex items-center justify-center flex-shrink-0">
                          <div className="w-4 h-4 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full shadow-lg relative z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full animate-ping opacity-75"></div>
                          </div>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1 hidden md:block"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8 shadow-lg">
              <i className="ri-heart-line text-4xl text-teal-600 mb-4"></i>
              <p className="text-lg text-gray-700 font-medium">
                앞으로도 어르신들의 건강하고 행복한 노후를 위해<br />
                최선을 다하겠습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
