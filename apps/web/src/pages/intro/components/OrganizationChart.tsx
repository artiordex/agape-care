export default function OrganizationChart() {
  return (
    <section className="py-20 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            기관의 가치와 목표
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            소규모 정원형 시설의 강점을 바탕으로 더 나은 미래를 만들어갑니다
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* 핵심 가치 */}
          <div className="bg-white rounded-2xl p-10 mb-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              <i className="ri-star-line text-[#5C8D5A] mr-2"></i>
              우리의 핵심 가치
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-heart-line text-3xl text-[#5C8D5A]"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">개별 맞춤 케어</h4>
                <p className="text-sm text-gray-600">
                  어르신 한 분 한 분의 특성과 필요에 맞춘 세심한 돌봄
                </p>
              </div>

              <div className="text-center p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-home-heart-line text-3xl text-[#5C8D5A]"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">가족 같은 환경</h4>
                <p className="text-sm text-gray-600">
                  소규모 정원으로 가능한 따뜻하고 친밀한 분위기
                </p>
              </div>

              <div className="text-center p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-star-line text-3xl text-[#5C8D5A]"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">전문성과 신뢰</h4>
                <p className="text-sm text-gray-600">
                  법적 기준을 준수하는 체계적이고 전문적인 운영
                </p>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed text-center">
              저희는 정원 29인 소규모 정원형 시설의 장점을 최대한 활용하여, 대규모 시설에서는 제공하기 어려운 개별화된 케어와 가족 같은 접근을 실현하고 있습니다. 어르신 한 분 한 분의 이름과 성격, 선호도를 모두 기억하며, 마치 우리 가족을 돌보듯 세심하게 관심을 기울이고 있습니다.
            </p>
          </div>

          {/* 장기적 목표 */}
          <div className="bg-white rounded-2xl p-10 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              <i className="ri-compass-3-line text-[#5C8D5A] mr-2"></i>
              장기적 목표 및 운영 방향성
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-10 h-10 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">지속적인 서비스 품질 향상</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    정기적인 직원 교육과 시설 개선을 통해 어르신께 더 나은 환경과 서비스를 제공하기 위해 끊임없이 노력하고 있습니다. 최신 요양 트렌드와 케어 기법을 지속적으로 학습하여 전문성을 높여가고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-10 h-10 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">의료기관과의 협력 강화</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    협력 의료기관과의 네트워크를 확대하고 긴밀한 협력 체계를 구축하여, 어르신께서 필요한 의료 서비스를 신속하고 정확하게 받으실 수 있도록 하고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-10 h-10 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">프로그램 다양화 및 개별화</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    어르신의 다양한 관심사와 기능 수준에 맞춘 프로그램을 지속적으로 개발하고, 개별화된 활동 계획을 통해 어르신께서 의미 있고 즐거운 시간을 보내실 수 있도록 하고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-10 h-10 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">투명한 운영과 신뢰 구축</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    보호자님과의 지속적인 소통과 정보 공유를 통해 투명한 운영을 실천하고, 신뢰를 바탕으로 한 장기적인 파트너십을 구축해 나가고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-10 h-10 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">지역사회와의 연계 활동</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    지역사회와의 교류를 통해 어르신께서 사회적 관계를 유지하시고, 지역 주민의 일원으로서 의미 있는 활동에 참여하실 수 있도록 지원하고 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-[#5C8D5A]/10 to-[#5C8D5A]/5 rounded-xl border-l-4 border-[#5C8D5A]">
              <p className="text-base text-gray-700 leading-relaxed">
                저희는 어르신의 행복과 보호자의 안심을 최우선으로 생각하며, 소규모 정원형 요양원의 장점을 최대한 살려 더욱 발전하는 요양원이 되도록 노력하겠습니다. 어르신께서 존엄하고 행복한 노후를 보내실 수 있도록, 그리고 보호자님께서 믿고 맡기실 수 있는 곳이 되도록 끊임없이 발전해 나가겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}