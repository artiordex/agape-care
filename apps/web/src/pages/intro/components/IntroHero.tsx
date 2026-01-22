export default function IntroHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20korean%20elderly%20care%20center%20exterior%20warm%20welcoming%20building%20with%20garden%20peaceful%20atmosphere%20professional%20nursing%20home%20facility%20with%20bright%20windows%20natural%20sunlight%20trees%20and%20flowers%20clean%20architecture%20caring%20environment&width=1920&height=800&seq=intro-hero-bg&orientation=landscape"
          alt="요양센터 전경"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          센터소개
        </h1>
        <p className="text-xl sm:text-2xl text-white/95 mb-8 leading-relaxed drop-shadow-md">
          정원 29인 소규모 정원형 요양원으로<br />
          어르신 한 분 한 분을 가족처럼 세심하게 돌봅니다
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-check-line text-3xl text-[#5C8D5A]"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              노인장기요양보험 지정기관
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              보건복지부 인증 장기요양기관으로
              <br />
              안전하고 신뢰할 수 있는 서비스를 제공합니다
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-time-line text-3xl text-[#5C8D5A]"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              24시간 전문 인력 상주
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              요양보호사, 간호사, 사회복지사가
              <br />
              24시간 교대제로 어르신을 돌봅니다
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-3-line text-3xl text-[#5C8D5A]"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              소규모 맞춤형 케어
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              29인 소규모 정원으로
              <br />
              세심하고 개별화된 돌봄을 실천합니다
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-3xl text-white/80"></i>
      </div>
    </section>
  );
}