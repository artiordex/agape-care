'use client';

export default function IndividualCarePage() {
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

  const careLevels = [
    {
      level: '1등급',
      condition: '완전 자립 불가',
      color: 'from-red-500 to-red-600',
      services: ['24시간 전담 케어', '전면적 일상생활 지원', '집중 건강 모니터링', '전문 간호 서비스'],
    },
    {
      level: '2등급',
      condition: '상당 부분 도움 필요',
      color: 'from-orange-500 to-orange-600',
      services: ['일상생활 전반 지원', '정기 건강 체크', '맞춤형 재활 프로그램', '영양 관리'],
    },
    {
      level: '3등급',
      condition: '부분적 도움 필요',
      color: 'from-amber-500 to-amber-600',
      services: ['필요 시 생활 지원', '건강 상태 모니터링', '재활 운동 지원', '사회 활동 참여'],
    },
    {
      level: '4-5등급',
      condition: '경증 도움 필요',
      color: 'from-teal-500 to-teal-600',
      services: ['자립 생활 지원', '예방적 건강 관리', '여가 프로그램 참여', '사회성 유지 활동'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-700 pb-20 pt-40">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <i className="ri-user-heart-line text-xl text-white"/>
            <span className="font-medium text-white">Individual Care</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-white">개별 케어 서비스</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            어르신 한 분 한 분의 상태와 필요에 맞춘 맞춤형 케어를 제공합니다
          </p>
        </div>
      </section>

      {/* Care Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">맞춤형 케어 서비스</h2>
            <p className="text-lg text-gray-600">개인별 상태에 맞는 전문적인 케어를 제공합니다</p>
          </div>

          <div className="space-y-16">
            {careServices.map((service, index) => (
              <div
                key={index}
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
                        <li key={idx} className="flex items-start gap-3">
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

      {/* Care Levels */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">등급별 맞춤 케어</h2>
            <p className="text-lg text-gray-600">장기요양등급에 따른 차별화된 케어 서비스</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {careLevels.map((level, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-br p-6 text-center ${level.color}`}>
                  <h3 className="mb-2 text-2xl font-bold text-white">{level.level}</h3>
                  <p className="text-sm text-white/90">{level.condition}</p>
                </div>

                <div className="p-6">
                  <ul className="space-y-3">
                    {level.services.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="ri-check-line mt-1 text-teal-600"/>
                        <span className="text-sm text-gray-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Philosophy */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">우리의 케어 철학</h2>
            <p className="text-lg text-gray-600">어르신 중심의 전인적 케어를 실천합니다</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600">
                <i className="ri-user-heart-line text-4xl text-white"/>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">개인 맞춤형</h3>
              <p className="text-gray-600">
                어르신 한 분 한 분의 상태와 필요에 맞춘 개별화된 케어 계획을 수립하고 실행합니다
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600">
                <i className="ri-team-line text-4xl text-white"/>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">전문 팀 케어</h3>
              <p className="text-gray-600">
                간호사, 물리치료사, 요양보호사 등 전문 인력이 팀을 이루어 통합적 케어를 제공합니다
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-amber-500">
                <i className="ri-heart-3-line text-4xl text-white"/>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">가족 같은 돌봄</h3>
              <p className="text-gray-600">전문성과 함께 따뜻한 마음으로 어르신을 가족처럼 정성껏 모십니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 p-12 text-center shadow-2xl">
            <i className="ri-hand-heart-line mb-6 text-6xl text-white" />

            <h2 className="mb-4 text-3xl font-bold text-white">최상의 케어 서비스를 약속드립니다</h2>

            <p className="mb-8 text-xl text-white/90">
              어르신의 건강과 행복을 위해
              <br />
              전문적이고 세심한 케어를 제공합니다
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-teal-700 hover:bg-gray-50"
            >
              상담 신청하기
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
