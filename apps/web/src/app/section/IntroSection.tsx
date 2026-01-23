import { motion } from 'framer-motion';

export default function IntroSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
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
                className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 rounded-2xl border-t-4 border-[#5C8D5A] bg-white p-8 shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="mb-1 text-5xl font-bold text-[#5C8D5A]">15+</div>
                    <div className="whitespace-nowrap text-sm font-medium text-gray-600">년의 전문 케어 경험</div>
                  </div>
                  <div className="h-16 w-px bg-gray-200" />
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                      <i className="ri-medal-line text-3xl text-[#5C8D5A]" />
                    </div>
                    <div className="whitespace-nowrap text-sm font-medium text-gray-600">
                      장기요양보험
                      <br />
                      지정기관
                    </div>
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
              <span className="mb-6 inline-block rounded-full bg-[#5C8D5A] px-6 py-2.5 text-base font-bold text-white shadow-md">
                해맑은요양센터
              </span>
              <h2 className="mb-8 text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
                우리 센터의
                <br />
                <span className="text-[#5C8D5A]">핵심 가치</span>
              </h2>
              <p className="mb-10 text-xl font-medium leading-relaxed text-gray-700">
                우리 센터는 어르신의 존엄한 삶을 지키며, 가족처럼 따뜻하고 안전하게 돌봅니다. 전문 인력과 체계적인
                프로그램으로 어르신의 건강한 일상을 함께 만들어갑니다.
              </p>
            </div>

            <div className="mb-10 space-y-5">
              <div className="group flex items-start gap-5 rounded-2xl border-2 border-[#5C8D5A]/20 bg-gradient-to-br from-white to-[#F5F3F0] p-7 transition-all hover:border-[#5C8D5A] hover:shadow-2xl">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] shadow-lg">
                  <i className="ri-heart-3-fill text-3xl text-white" />
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">가족 돌봄 철학</h3>
                  <p className="text-lg font-medium leading-relaxed text-gray-700">
                    가족을 대하듯 따뜻하고 정성스러운 마음으로 어르신을 모십니다.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-5 rounded-2xl border-2 border-[#5C8D5A]/20 bg-gradient-to-br from-white to-[#F5F3F0] p-7 transition-all hover:border-[#5C8D5A] hover:shadow-2xl">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] shadow-lg">
                  <i className="ri-shield-check-fill text-3xl text-white" />
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">안전과 신뢰</h3>
                  <p className="text-lg font-medium leading-relaxed text-gray-700">
                    24시간 전문 인력 상주와 철저한 안전관리 시스템으로 안심하실 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-5 rounded-2xl border-2 border-[#5C8D5A]/20 bg-gradient-to-br from-white to-[#F5F3F0] p-7 transition-all hover:border-[#5C8D5A] hover:shadow-2xl">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] shadow-lg">
                  <i className="ri-nurse-fill text-3xl text-white" />
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">전문 인력</h3>
                  <p className="text-lg font-medium leading-relaxed text-gray-700">
                    간호사, 요양보호사, 물리치료사 등 전문 자격을 갖춘 인력이 케어합니다.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/intro"
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#5C8D5A] to-[#4A7548] px-10 py-5 text-xl font-bold text-white shadow-xl transition-all hover:shadow-2xl"
            >
              <span>센터 소개 자세히 보기</span>
              <i className="ri-arrow-right-line text-2xl transition-transform group-hover:translate-x-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
