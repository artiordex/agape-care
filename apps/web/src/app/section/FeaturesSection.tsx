export default function FeaturesSection() {
  const features = [
    {
      title: '전문 인력',
      description: '간호사, 요양보호사, 사회복지사, 물리치료사 등 전문 자격을 갖춘 인력이 365일 24시간 어르신을 케어합니다',
      icon: 'ri-shield-check-line',
      image: 'https://readdy.ai/api/search-image?query=professional%20elderly%20care%20team%20nurses%20and%20caregivers%20in%20modern%20nursing%20facility%20wearing%20medical%20uniforms%20warm%20compassionate%20healthcare%20workers%20korean%20elderly%20care%20professionals%20simple%20clean%20background&width=600&height=400&seq=feature-staff&orientation=landscape',
    },
    {
      title: '안전한 시설',
      description: '모든 복도와 출입구에 CCTV 설치, 미끄럼 방지 바닥, 화재감지 시스템, 비상벨 등 안전시설을 완비하였습니다',
      icon: 'ri-shield-star-line',
      image: 'https://readdy.ai/api/search-image?query=safe%20modern%20elderly%20care%20facility%20corridor%20with%20handrails%20emergency%20call%20buttons%20clean%20well-lit%20hallway%20nursing%20home%20safety%20features%20accessible%20design%20simple%20neutral%20background&width=600&height=400&seq=feature-safety&orientation=landscape',
    },
    {
      title: '체계적 프로그램',
      description: '인지활동, 물리치료, 작업치료, 음악·미술·원예 치료 등 다양한 프로그램을 통해 어르신의 건강을 관리합니다',
      icon: 'ri-calendar-check-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20people%20enjoying%20art%20therapy%20music%20therapy%20activities%20in%20bright%20nursing%20home%20activity%20room%20seniors%20painting%20and%20creating%20art%20warm%20cheerful%20atmosphere%20simple%20clean%20background&width=600&height=400&seq=feature-program&orientation=landscape',
    },
    {
      title: '영양 관리',
      description: '전문 영양사가 관리하는 균형 잡힌 식단과 개인별 맞춤 식사를 제공하여 어르신의 건강을 지킵니다',
      icon: 'ri-restaurant-2-line',
      image: 'https://readdy.ai/api/search-image?query=healthy%20nutritious%20meal%20for%20elderly%20care%20balanced%20korean%20food%20on%20clean%20white%20plate%20fresh%20vegetables%20proteins%20vitamins%20professional%20nursing%20home%20dining%20simple%20clean%20background&width=600&height=400&seq=feature-meal&orientation=landscape',
    },
    {
      title: '쾌적한 환경',
      description: '넓고 밝은 공간, 자연 채광, 야외 산책로 등 어르신이 편안하고 행복하게 생활할 수 있는 환경을 제공합니다',
      icon: 'ri-plant-line',
      image: 'https://readdy.ai/api/search-image?query=bright%20spacious%20elderly%20care%20room%20with%20natural%20sunlight%20large%20windows%20garden%20view%20modern%20comfortable%20nursing%20home%20interior%20soft%20beige%20tones%20peaceful%20atmosphere%20simple%20clean%20design&width=600&height=400&seq=feature-environment&orientation=landscape',
    },
    {
      title: '가족 같은 돌봄',
      description: '어르신 한 분 한 분을 가족처럼 따뜻하게 대하며, 보호자와의 소통을 통해 최선의 케어를 제공합니다',
      icon: 'ri-heart-3-line',
      image: 'https://readdy.ai/api/search-image?query=warm%20caring%20moment%20between%20elderly%20person%20and%20caregiver%20gentle%20companionship%20korean%20nursing%20home%20compassionate%20care%20smiling%20faces%20simple%20clean%20background&width=600&height=400&seq=feature-care&orientation=landscape',
    },
  ];

  return (
    <section className="py-24 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            왜 저희를 선택해야 하나요?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            전문성과 따뜻함을 갖춘 요양센터로 어르신과 보호자 모두가 신뢰할 수 있습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center">
                    <i className={`${feature.icon} text-2xl text-[#5C8D5A]`}/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
