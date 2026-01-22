import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

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
    { time: '21:00', activity: '취침', icon: 'ri-hotel-bed-line', description: '편안한 밤 되세요' }
  ];

  const lifeRules = [
    {
      title: '식사 시간',
      icon: 'ri-restaurant-line',
      items: [
        '정해진 시간에 규칙적인 식사',
        '개인별 식이요법 준수',
        '식사 보조 서비스 제공'
      ]
    },
    {
      title: '건강 관리',
      icon: 'ri-heart-pulse-line',
      items: [
        '매일 아침 건강 체크',
        '정기적인 의료진 진료',
        '복약 관리 및 지도'
      ]
    },
    {
      title: '위생 관리',
      icon: 'ri-hand-sanitizer-line',
      items: [
        '개인 위생 관리 지원',
        '정기적인 목욕 서비스',
        '청결한 환경 유지'
      ]
    },
    {
      title: '안전 수칙',
      icon: 'ri-shield-check-line',
      items: [
        '낙상 예방 안전 관리',
        '응급상황 대응 체계',
        '24시간 CCTV 모니터링'
      ]
    },
    {
      title: '면회 규정',
      icon: 'ri-parent-line',
      items: [
        '평일 10:00 - 18:00',
        '주말 10:00 - 17:00',
        '사전 예약 권장'
      ]
    },
    {
      title: '프로그램 참여',
      icon: 'ri-calendar-event-line',
      items: [
        '개인 상태에 맞는 프로그램',
        '자율적 참여 원칙',
        '가족 참여 프로그램 운영'
      ]
    }
  ];

  const facilities = [
    {
      name: '1인실',
      image: 'https://readdy.ai/api/search-image?query=Modern%20comfortable%20single%20occupancy%20nursing%20home%20bedroom%20with%20hospital%20bed%2C%20wooden%20furniture%2C%20large%20window%20with%20natural%20light%2C%20clean%20white%20walls%2C%20personal%20storage%20space%2C%20cozy%20and%20peaceful%20atmosphere%2C%20warm%20lighting%2C%20elderly%20care%20facility%20interior%20design&width=600&height=400&seq=daily001&orientation=landscape',
      features: ['개인 화장실', '수납공간', '간호 콜벨']
    },
    {
      name: '2인실',
      image: 'https://readdy.ai/api/search-image?query=Bright%20and%20spacious%20double%20occupancy%20nursing%20home%20bedroom%20with%20two%20hospital%20beds%2C%20wooden%20furniture%2C%20large%20windows%2C%20clean%20white%20walls%2C%20personal%20storage%20for%20each%20resident%2C%20comfortable%20and%20homely%20atmosphere%2C%20natural%20lighting%2C%20elderly%20care%20facility%20interior&width=600&height=400&seq=daily002&orientation=landscape',
      features: ['공용 화장실', '개인 수납장', '간호 콜벨']
    },
    {
      name: '식당',
      image: 'https://readdy.ai/api/search-image?query=Bright%20and%20welcoming%20nursing%20home%20dining%20hall%20with%20wooden%20tables%20and%20comfortable%20chairs%2C%20large%20windows%20with%20natural%20light%2C%20clean%20and%20modern%20interior%2C%20elderly-friendly%20design%2C%20warm%20and%20inviting%20atmosphere%2C%20professional%20care%20facility%20dining%20room&width=600&height=400&seq=daily003&orientation=landscape',
      features: ['단체 식사', '영양 식단', '식사 보조']
    },
    {
      name: '프로그램실',
      image: 'https://readdy.ai/api/search-image?query=Spacious%20nursing%20home%20activity%20room%20with%20tables%20for%20group%20activities%2C%20comfortable%20seating%2C%20bright%20natural%20lighting%2C%20colorful%20decorations%2C%20exercise%20equipment%2C%20arts%20and%20crafts%20supplies%2C%20warm%20and%20engaging%20atmosphere%20for%20elderly%20programs&width=600&height=400&seq=daily004&orientation=landscape',
      features: ['다양한 활동', '그룹 프로그램', '여가 시설']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <i className="ri-calendar-line text-white text-xl"></i>
              <span className="text-white font-medium">Daily Life</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              하루 일과 / 생활안내
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              규칙적이고 건강한 일상, 편안하고 안전한 생활을 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">하루 일과표</h2>
            <p className="text-lg text-gray-600">규칙적인 생활로 건강한 하루를 보냅니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailySchedule.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex-shrink-0">
                    <i className={`${item.icon} text-2xl text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-teal-600 mb-1">{item.time}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.activity}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life Rules */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">생활 규칙 및 안내</h2>
            <p className="text-lg text-gray-600">안전하고 쾌적한 생활을 위한 규칙입니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lifeRules.map((rule, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-teal-500 to-amber-500 rounded-2xl mb-6">
                  <i className={`${rule.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{rule.title}</h3>
                <ul className="space-y-3">
                  {rule.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-teal-600 mt-1 flex-shrink-0"></i>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">생활 공간</h2>
            <p className="text-lg text-gray-600">편안하고 안전한 생활 환경을 제공합니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{facility.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {facility.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-br from-teal-50 to-amber-50 text-teal-700 rounded-full text-sm font-medium"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-12 text-center shadow-2xl">
            <i className="ri-home-heart-line text-6xl text-white mb-6"></i>
            <h2 className="text-3xl font-bold text-white mb-4">
              편안하고 안전한 생활을 약속드립니다
            </h2>
            <p className="text-xl text-white/90 mb-8">
              규칙적인 일과와 체계적인 관리로<br />
              건강하고 행복한 매일을 만들어갑니다
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 rounded-full font-bold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>상담 신청하기</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
