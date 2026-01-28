'use client';

export default function DailyLifePage() {
  const dailySchedule = [
    { time: '06:00', activity: '기상 및 세면', icon: 'ri-sun-line', description: '편안한 아침 맞이' },
    { time: '07:00', activity: '아침 식사', icon: 'ri-restaurant-line', description: '영양 균형 잡힌 식사' },
    { time: '08:00', activity: '건강 체크', icon: 'ri-heart-pulse-line', description: '혈압, 체온 측정' },
    { time: '09:00', activity: '오전 프로그램', icon: 'ri-calendar-check-line', description: '인지활동, 운동치료' },
    { time: '10:30', activity: '간식 시간', icon: 'ri-cake-3-line', description: '과일, 음료 제공' },
    { time: '11:00', activity: '개별 활동', icon: 'ri-user-smile-line', description: '독서, 산책, 휴식' },
    { time: '12:00', activity: '점심 식사', icon: 'ri-bowl-line', description: '맞춤형 영양 식단' },
    { time: '13:00', activity: '낮잠 및 휴식', icon: 'ri-zzz-line', description: '충분한 휴식 시간' },
    { time: '14:00', activity: '오후 프로그램', icon: 'ri-music-2-line', description: '음악치료, 미술활동' },
    { time: '15:30', activity: '간식 시간', icon: 'ri-cup-line', description: '차, 간식 제공' },
    { time: '16:00', activity: '여가 활동', icon: 'ri-tv-line', description: '영화감상, 레크리에이션' },
    { time: '18:00', activity: '저녁 식사', icon: 'ri-restaurant-2-line', description: '따뜻한 저녁 식사' },
    { time: '19:00', activity: '산책 및 자유시간', icon: 'ri-walk-line', description: '가벼운 산책' },
    { time: '20:00', activity: '취침 준비', icon: 'ri-moon-line', description: '세면 및 정리' },
    { time: '21:00', activity: '취침', icon: 'ri-hotel-bed-line', description: '편안한 밤 되세요' },
  ];

  const lifeRules = [
    {
      title: '식사 시간',
      icon: 'ri-restaurant-line',
      items: ['정해진 시간에 규칙적인 식사', '개인별 식이요법 준수', '식사 보조 서비스 제공'],
    },
    {
      title: '건강 관리',
      icon: 'ri-heart-pulse-line',
      items: ['매일 아침 건강 체크', '정기적인 의료진 진료', '복약 관리 및 지도'],
    },
    {
      title: '위생 관리',
      icon: 'ri-hand-sanitizer-line',
      items: ['개인 위생 관리 지원', '정기적인 목욕 서비스', '청결한 환경 유지'],
    },
    {
      title: '안전 수칙',
      icon: 'ri-shield-check-line',
      items: ['낙상 예방 안전 관리', '응급상황 대응 체계', '24시간 CCTV 모니터링'],
    },
    {
      title: '면회 규정',
      icon: 'ri-parent-line',
      items: ['평일 10:00 - 18:00', '주말 10:00 - 17:00', '사전 예약 권장'],
    },
    {
      title: '프로그램 참여',
      icon: 'ri-calendar-event-line',
      items: ['개인 상태에 맞는 프로그램', '자율적 참여 원칙', '가족 참여 프로그램 운영'],
    },
  ];

  const facilities = [
    {
      name: '1인실',
      image:
        'https://readdy.ai/api/search-image?query=Modern%20comfortable%20single%20occupancy%20nursing%20home%20bedroom...&width=600&height=400&seq=daily001&orientation=landscape',
      features: ['개인 화장실', '수납공간', '간호 콜벨'],
    },
    {
      name: '2인실',
      image:
        'https://readdy.ai/api/search-image?query=Bright%20and%20spacious%20double%20occupancy...&width=600&height=400&seq=daily002&orientation=landscape',
      features: ['공용 화장실', '개인 수납장', '간호 콜벨'],
    },
    {
      name: '식당',
      image:
        'https://readdy.ai/api/search-image?query=Bright%20and%20welcoming%20nursing%20home%20dining...&width=600&height=400&seq=daily003&orientation=landscape',
      features: ['단체 식사', '영양 식단', '식사 보조'],
    },
    {
      name: '프로그램실',
      image:
        'https://readdy.ai/api/search-image?query=Spacious%20nursing%20home%20activity%20room...&width=600&height=400&seq=daily004&orientation=landscape',
      features: ['다양한 활동', '그룹 프로그램', '여가 시설'],
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <i className="ri-calendar-line text-xl text-white"/>
            <span className="font-medium text-white">Daily Life</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-white">하루 일과 / 생활안내</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            규칙적이고 건강한 일상, 편안하고 안전한 생활을 제공합니다
          </p>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">하루 일과표</h2>
            <p className="text-lg text-gray-600">규칙적인 생활로 건강한 하루를 보냅니다</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dailySchedule.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600">
                    <i className={`${item.icon} text-2xl text-white`}/>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-sm font-bold text-teal-600">{item.time}</div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{item.activity}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life Rules */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">생활 규칙 및 안내</h2>
            <p className="text-lg text-gray-600">안전하고 쾌적한 생활을 위한 규칙입니다</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {lifeRules.map((rule, index) => (
              <div key={index} className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-amber-500">
                  <i className={`${rule.icon} text-3xl text-white`}/>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">{rule.title}</h3>
                <ul className="space-y-3">
                  {rule.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill mt-1 text-teal-600"/>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">생활 공간</h2>
            <p className="text-lg text-gray-600">편안하고 안전한 생활 환경을 제공합니다</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {facilities.map((facility, index) => (
              <div key={index} className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">{facility.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {facility.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gradient-to-br from-teal-50 to-amber-50 px-4 py-2 text-sm font-medium text-teal-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 p-12 text-center shadow-2xl">
            <i className="ri-home-heart-line mb-6 text-6xl text-white"/>
            <h2 className="mb-4 text-3xl font-bold text-white">편안하고 안전한 생활을 약속드립니다</h2>
            <p className="mb-8 text-xl text-white/90">
              규칙적인 일과와 체계적인 관리로
              <br />
              건강하고 행복한 매일을 만들어갑니다
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-teal-700 hover:bg-gray-50"
            >
              상담 신청하기
              <i className="ri-arrow-right-line"/>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
