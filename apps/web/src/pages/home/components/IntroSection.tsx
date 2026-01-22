import { motion } from 'framer-motion';

export default function IntroSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽 이미지 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=warm%20elderly%20care%20facility%20with%20comfortable%20living%20room%20modern%20furniture%20natural%20sunlight%20peaceful%20atmosphere%20professional%20nursing%20home%20interior%20bright%20and%20welcoming%20space&width=800&height=600&seq=intro-section-main&orientation=landscape"
                alt="요양센터 내부"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#5C8D5A]">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#5C8D5A] mb-1">15+</div>
                    <div className="text-sm text-gray-600 font-medium whitespace-nowrap">년의 전문 케어 경험</div>
                  </div>
                  <div className="w-px h-16 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <i className="ri-medal-line text-3xl text-[#5C8D5A]"></i>
                    </div>
                    <div className="text-sm text-gray-600 font-medium whitespace-nowrap">장기요양보험<br/>지정기관</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 오른쪽 콘텐츠 영역 - 가시성 개선 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <div className="mb-8">
              <span className="inline-block px-6 py-2.5 bg-[#5C8D5A] text-white rounded-full text-base font-bold mb-6 shadow-md">
                해맑은요양센터
              </span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
                우리 센터의<br/>
                <span className="text-[#5C8D5A]">핵심 가치</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-10 font-medium">
                우리 센터는 어르신의 존엄한 삶을 지키며, 가족처럼 따뜻하고 안전하게 돌봅니다. 
                전문 인력과 체계적인 프로그램으로 어르신의 건강한 일상을 함께 만들어갑니다.
              </p>
            </div>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-5 p-7 bg-gradient-to-br from-white to-[#F5F3F0] rounded-2xl border-2 border-[#5C8D5A]/20 hover:border-[#5C8D5A] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <i className="ri-heart-3-fill text-3xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">가족 돌봄 철학</h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    가족을 대하듯 따뜻하고 정성스러운 마음으로 어르신을 모십니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-7 bg-gradient-to-br from-white to-[#F5F3F0] rounded-2xl border-2 border-[#5C8D5A]/20 hover:border-[#5C8D5A] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <i className="ri-shield-check-fill text-3xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">안전과 신뢰</h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    24시간 전문 인력 상주와 철저한 안전관리 시스템으로 안심하실 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-7 bg-gradient-to-br from-white to-[#F5F3F0] rounded-2xl border-2 border-[#5C8D5A]/20 hover:border-[#5C8D5A] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <i className="ri-nurse-fill text-3xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">전문 인력</h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    간호사, 요양보호사, 물리치료사 등 전문 자격을 갖춘 인력이 케어합니다.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/intro"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#5C8D5A] to-[#4A7548] text-white rounded-xl hover:shadow-2xl transition-all font-bold text-xl shadow-xl whitespace-nowrap group"
            >
              <span>센터 소개 자세히 보기</span>
              <i className="ri-arrow-right-line text-2xl group-hover:translate-x-2 transition-transform"></i>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
