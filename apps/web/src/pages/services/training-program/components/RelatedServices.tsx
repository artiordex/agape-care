export default function RelatedServices() {
  const services = [
    {
      icon: 'ri-brain-line',
      title: '치매 전문 프로그램',
      description: '전문적인 치매 케어와 인지 향상 프로그램',
      link: '/#cognitive-program',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: 'ri-music-2-line',
      title: '여가 활동 프로그램',
      description: '다양한 취미와 문화 활동으로 즐거운 시간',
      link: '/#leisure-program',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: 'ri-heart-add-line',
      title: '물리치료 / 재활 서비스',
      description: '전문 물리치료사의 체계적인 재활 치료',
      link: '/#rehab-service',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50'
    },
    {
      icon: 'ri-stethoscope-line',
      title: '의료지원 간호서비스',
      description: '24시간 전문 간호 인력의 건강 관리',
      link: '/#medical-service',
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-teal-50 to-amber-50 rounded-full text-[#5C8D5A] font-semibold text-sm mb-4">
            Related Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            관련 <span className="text-[#5C8D5A]">서비스</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            더 나은 케어를 위한 다양한 프로그램을 함께 확인해보세요
          </p>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#5C8D5A] hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${service.color} rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <i className={`${service.icon} text-3xl text-white`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5C8D5A] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-[#5C8D5A] font-semibold text-sm group-hover:gap-3 transition-all">
                <span>자세히 보기</span>
                <i className="ri-arrow-right-line text-lg"></i>
              </div>
            </a>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 text-center">
          <a
            href="/#services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-service-line text-xl"></i>
            <span>전체 서비스 보기</span>
            <i className="ri-arrow-right-line text-xl"></i>
          </a>
        </div>
      </div>
    </section>
  );
}