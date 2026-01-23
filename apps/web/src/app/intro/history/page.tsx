'use client';

export default function HistoryPage() {
  const historyData = [
    {
      year: '2024',
      events: [
        {
          month: '03',
          title: '장기요양기관 평가 A등급 획득',
          description: '보건복지부 주관 장기요양기관 평가에서 최우수 등급 획득',
        },
        { month: '01', title: '신규 재활치료실 확장', description: '최신 재활 장비 도입 및 치료 공간 확대' },
      ],
    },
    {
      year: '2023',
      events: [
        {
          month: '11',
          title: '인지케어 프로그램 우수사례 선정',
          description: '지역 보건소 주관 우수 프로그램 사례로 선정',
        },
        { month: '06', title: '가족 만족도 조사 95% 달성', description: '입소자 가족 대상 만족도 조사에서 높은 평가' },
        { month: '03', title: '직원 전문교육 프로그램 시행', description: '요양보호사 및 간호사 대상 전문 교육 강화' },
      ],
    },
    {
      year: '2022',
      events: [
        { month: '09', title: '지역사회 봉사활동 우수기관 표창', description: '지역사회 공헌 활동으로 시장 표창 수상' },
        { month: '05', title: '시설 리모델링 완료', description: '쾌적한 생활환경 조성을 위한 전면 리모델링' },
        { month: '02', title: '영양관리 프로그램 도입', description: '개인별 맞춤 영양관리 시스템 구축' },
      ],
    },
    {
      year: '2021',
      events: [
        { month: '10', title: '의료기관 협력 네트워크 구축', description: '인근 종합병원과 의료 협력 체계 마련' },
        {
          month: '04',
          title: '코로나19 방역 우수기관 선정',
          description: '철저한 방역 관리로 감염병 예방 우수사례 인정',
        },
      ],
    },
    {
      year: '2020',
      events: [
        { month: '12', title: '정원 29인 확대', description: '시설 증축을 통한 입소 정원 확대' },
        { month: '07', title: '가족소통 플랫폼 오픈', description: '온라인 면회 및 소통 시스템 구축' },
      ],
    },
    {
      year: '2019',
      events: [
        { month: '11', title: '프로그램실 신설', description: '다양한 여가 및 재활 프로그램 운영 공간 마련' },
        { month: '03', title: '요양원 개원', description: '29인 규모 노인요양시설 정식 개원' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-700 pb-20 pt-32">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <i className="ri-time-line text-xl text-white"/>
              <span className="font-medium text-white">Our History</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white">연혁</h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90">
              어르신들의 행복한 노후를 위해 걸어온 우리의 발자취입니다
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 transform bg-gradient-to-b from-teal-500 to-amber-500 md:block"/>

            {/* Timeline Items */}
            <div className="space-y-16">
              {historyData.map((yearData, yearIndex) => (
                <div key={yearIndex} className="relative">
                  {/* Year Badge */}
                  <div className="mb-12 flex justify-center">
                    <div className="relative z-10 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-4 shadow-lg">
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
                          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                            <div className="mb-3 flex items-center gap-3">
                              {eventIndex % 2 === 0 ? (
                                <div className="flex items-center gap-3 md:ml-auto">
                                  <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-600">
                                    {event.month}월
                                  </span>
                                </div>
                              ) : (
                                <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-600">
                                  {event.month}월
                                </span>
                              )}
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">{event.title}</h3>
                            <p className="leading-relaxed text-gray-600">{event.description}</p>
                          </div>
                        </div>

                        {/* Center Dot */}
                        <div className="hidden flex-shrink-0 items-center justify-center md:flex">
                          <div className="relative z-10 h-4 w-4 rounded-full bg-gradient-to-br from-teal-500 to-amber-500 shadow-lg">
                            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-br from-teal-500 to-amber-500 opacity-75"/>
                          </div>
                        </div>

                        {/* Spacer */}
                        <div className="hidden flex-1 md:block"/>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-20 text-center">
            <div className="inline-block rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 p-8 shadow-lg">
              <i className="ri-heart-line mb-4 text-4xl text-teal-600"/>
              <p className="text-lg font-medium text-gray-700">
                앞으로도 어르신들의 건강하고 행복한 노후를 위해
                <br />
                최선을 다하겠습니다
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
