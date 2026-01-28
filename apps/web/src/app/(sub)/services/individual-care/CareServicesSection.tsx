'use client';

export default function CareServicesSection() {
  const careServices = [
    {
      title: '일상생활 지원',
      icon: 'ri-hand-heart-line',
      image:
        'https://readdy.ai/api/search-image?query=Professional%20Korean%20caregiver%20gently%20helping%20elderly%20person%20with%20daily%20activities%20in%20bright%20nursing%20home%20room%2C%20warm%20and%20caring%20atmosphere%2C%20compassionate%20assistance%2C%20natural%20lighting%2C%20high%20quality%20care%20service%20photography&width=600&height=400&seq=care001&orientation=landscape',
      services: [
        '식사 보조 및 영양 관리',
        '세면, 목욕 등 위생 관리',
        '옷 갈아입기 지원',
        '이동 및 보행 보조',
        '화장실 이용 지원',
        '침상 정리 및 환경 관리',
      ],
      description: '어르신의 일상생활을 세심하게 돕습니다',
    },
    {
      title: '건강 관리',
      icon: 'ri-heart-pulse-line',
      image:
        'https://readdy.ai/api/search-image?query=Professional%20nurse%20checking%20vital%20signs%20of%20elderly%20patient%20in%20clean%20nursing%20home%20room%2C%20medical%20monitoring%20equipment%2C%20caring%20healthcare%20service%2C%20bright%20and%20safe%20environment%2C%20professional%20medical%20care%20photography&width=600&height=400&seq=care002&orientation=landscape',
      services: [
        '매일 혈압, 체온, 맥박 측정',
        '혈당 체크 및 관리',
        '복약 관리 및 지도',
        '상처 및 욕창 관리',
        '정기 건강 검진 지원',
        '응급상황 대응',
      ],
      description: '24시간 건강 상태를 모니터링합니다',
    },
    {
      title: '인지 케어',
      icon: 'ri-brain-line',
      image:
        'https://readdy.ai/api/search-image?query=Elderly%20person%20engaging%20in%20cognitive%20activities%20with%20caregiver%20in%20bright%20activity%20room%2C%20memory%20games%20and%20puzzles%20on%20table%2C%20warm%20and%20encouraging%20atmosphere%2C%20mental%20stimulation%20therapy%2C%20professional%20dementia%20care%20photography&width=600&height=400&seq=care003&orientation=landscape',
      services: [
        '기억력 향상 프로그램',
        '인지 자극 활동',
        '회상 치료',
        '현실 지남력 훈련',
        '개별 맞춤 인지 활동',
        '치매 예방 프로그램',
      ],
      description: '인지 기능 유지와 향상을 돕습니다',
    },
    {
      title: '정서 지원',
      icon: 'ri-emotion-happy-line',
      image:
        'https://readdy.ai/api/search-image?query=Caregiver%20having%20warm%20conversation%20with%20smiling%20elderly%20person%20in%20cozy%20nursing%20home%20lounge%2C%20emotional%20support%20and%20companionship%2C%20comfortable%20seating%20area%2C%20caring%20and%20friendly%20atmosphere%2C%20quality%20elderly%20care%20photography&width=600&height=400&seq=care004&orientation=landscape',
      services: [
        '정서적 교감 및 대화',
        '우울감 예방 활동',
        '취미 활동 지원',
        '사회적 교류 촉진',
        '가족 소통 지원',
        '심리 상담 서비스',
      ],
      description: '마음의 안정과 행복을 추구합니다',
    },
    {
      title: '재활 지원',
      icon: 'ri-wheelchair-line',
      image:
        'https://readdy.ai/api/search-image?query=Physical%20therapist%20assisting%20elderly%20person%20with%20rehabilitation%20exercises%20in%20modern%20therapy%20room%2C%20exercise%20equipment%2C%20professional%20rehabilitation%20service%2C%20encouraging%20atmosphere%2C%20quality%20physical%20therapy%20photography&width=600&height=400&seq=care005&orientation=landscape',
      services: [
        '물리치료 및 운동치료',
        '관절 운동 및 스트레칭',
        '보행 훈련',
        '근력 강화 운동',
        '낙상 예방 훈련',
        '일상생활 동작 훈련',
      ],
      description: '신체 기능 회복과 유지를 지원합니다',
    },
    {
      title: '영양 관리',
      icon: 'ri-restaurant-line',
      image:
        'https://readdy.ai/api/search-image?query=Nutritious%20and%20beautifully%20plated%20meal%20for%20elderly%20in%20nursing%20home%2C%20balanced%20diet%20with%20vegetables%20and%20protein%2C%20clean%20white%20plate%20on%20wooden%20table%2C%20healthy%20senior%20nutrition%2C%20professional%20food%20photography&width=600&height=400&seq=care006&orientation=landscape',
      services: [
        '개인별 맞춤 식단 제공',
        '영양 상태 평가',
        '식이요법 관리',
        '연하곤란 식단 제공',
        '수분 섭취 관리',
        '영양 보충제 관리',
      ],
      description: '건강한 식생활을 책임집니다',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">맞춤형 케어 서비스</h2>
          <p className="text-lg text-gray-600">개인별 상태에 맞는 전문적인 케어를 제공합니다</p>
        </div>

        <div className="space-y-16">
          {careServices.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col items-center gap-8 ${index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              <div className="flex-1">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl shadow-xl">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover object-top" />
                </div>
              </div>

              <div className="flex-1">
                <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-amber-500">
                      <i className={`${service.icon} text-3xl text-white`} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {service.services.map((item, idx) => (
                      <li key={item} className="flex items-start gap-3">
                        <i className="ri-checkbox-circle-fill mt-1 text-teal-600" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
