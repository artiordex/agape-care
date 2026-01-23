export default function SafetyFeatures() {
  const safetyFeatures = [
    {
      icon: 'ri-video-line',
      title: 'CCTV 24시간 모니터링',
      description: '모든 복도와 출입구에 CCTV를 설치하여 어르신의 안전을 지킵니다',
    },
    {
      icon: 'ri-footprint-line',
      title: '미끄럼 방지 바닥',
      description: '낙상 사고를 예방하기 위한 미끄럼 방지 바닥재를 사용합니다',
    },
    {
      icon: 'ri-alarm-warning-line',
      title: '화재감지 시스템',
      description: '최신 화재감지 및 스프링클러 시스템으로 화재에 대비합니다',
    },
    {
      icon: 'ri-notification-3-line',
      title: '비상벨 설치',
      description: '각 객실과 화장실에 비상벨을 설치하여 신속한 대응이 가능합니다',
    },
    {
      icon: 'ri-hand-heart-line',
      title: '손잡이 설치',
      description: '복도와 화장실에 안전 손잡이를 설치하여 이동을 돕습니다',
    },
    {
      icon: 'ri-door-lock-line',
      title: '출입 통제 시스템',
      description: '무단 외출을 방지하기 위한 출입 통제 시스템을 운영합니다',
    },
  ];

  return (
    <section className="py-20 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            안전시설 안내
          </h2>
          <p className="text-base text-gray-600">
            어르신과 보호자가 안심할 수 있는 안전 시스템을 갖추고 있습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safetyFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-3xl text-[#5C8D5A]`}/>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line text-2xl text-[#5C8D5A]"/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                CCTV 운영 안내
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                저희 요양센터는 어르신의 안전을 위해 공용 공간에 CCTV를 설치하여
                운영하고 있습니다. CCTV 촬영 구역 및 개인정보 보호에 관한 자세한
                내용은 시설 내 안내문을 참고해 주시기 바랍니다.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>· 설치 위치:</strong> 복도, 출입구, 공용 공간
                </p>
                <p className="text-sm text-gray-600">
                  <strong>· 촬영 시간:</strong> 24시간
                </p>
                <p className="text-sm text-gray-600">
                  <strong>· 보관 기간:</strong> 30일
                </p>
                <p className="text-sm text-gray-600">
                  <strong>· 관리 책임자:</strong> 시설장 김미영
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
