import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function LeisureProgramPage() {
  const programs = [
    {
      icon: 'ri-music-2-line',
      title: '음악 프로그램',
      description: '추억의 노래를 함께 부르고 악기를 연주하며 정서적 안정을 찾습니다',
      activities: ['노래교실', '악기 연주', '음악 감상', '리듬 따라하기'],
      frequency: '주 3회'
    },
    {
      icon: 'ri-palette-line',
      title: '미술 활동',
      description: '그림 그리기, 색칠하기 등 창작 활동으로 표현력을 높입니다',
      activities: ['수채화 그리기', '색칠 공부', '만들기 활동', '계절 작품 만들기'],
      frequency: '주 2회'
    },
    {
      icon: 'ri-plant-line',
      title: '원예 활동',
      description: '식물을 가꾸며 자연과 교감하고 성취감을 느낍니다',
      activities: ['화분 가꾸기', '채소 키우기', '꽃꽂이', '텃밭 관리'],
      frequency: '주 2회'
    },
    {
      icon: 'ri-movie-2-line',
      title: '영상 프로그램',
      description: '영화, 다큐멘터리를 관람하며 여가 시간을 즐깁니다',
      activities: ['영화 감상', '옛날 드라마 보기', '자연 다큐', '음악 방송'],
      frequency: '주 2회'
    },
    {
      icon: 'ri-book-open-line',
      title: '독서 및 회상 활동',
      description: '책 읽기와 이야기 나누기로 추억을 회상하고 소통합니다',
      activities: ['책 읽어주기', '옛날이야기', '신문 읽기', '시 낭송'],
      frequency: '주 3회'
    },
    {
      icon: 'ri-gamepad-line',
      title: '레크리에이션',
      description: '즐거운 게임과 놀이로 웃음과 활력을 되찾습니다',
      activities: ['풍선 배구', '공 굴리기', '윷놀이', '민속 놀이'],
      frequency: '주 2회'
    }
  ];

  const seasonalEvents = [
    { month: '봄', event: '봄맞이 나들이, 꽃구경' },
    { month: '여름', event: '여름 음악회, 수박 파티' },
    { month: '가을', event: '추석 행사, 단풍 나들이' },
    { month: '겨울', event: '송년회, 윷놀이 대회' }
  ];

  const features = [
    {
      icon: 'ri-heart-line',
      title: '정서 안정',
      description: '즐거운 활동을 통해 우울감을 해소하고 정서적 안정을 찾습니다'
    },
    {
      icon: 'ri-group-2-line',
      title: '사회성 향상',
      description: '함께하는 활동으로 어르신 간 교류와 소통이 활발해집니다'
    },
    {
      icon: 'ri-creative-commons-by-line',
      title: '자율적 선택',
      description: '관심사와 선호도에 따라 원하는 프로그램을 자유롭게 선택할 수 있습니다'
    },
    {
      icon: 'ri-cake-3-line',
      title: '생신 및 기념일',
      description: '매월 생신 어르신을 위한 특별한 생신잔치를 준비합니다'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-orange-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#7BA178]/5 to-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Link to="/" className="hover:text-[#5C8D5A] transition-colors">홈</Link>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="text-[#5C8D5A] font-semibold">여가활동 프로그램</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  여가활동 프로그램
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  어르신의 정서적 안정과 사회성 향상을 위한 다양한 여가 프로그램을 제공합니다. 음악, 미술, 원예, 영화 감상, 레크리에이션 등 취향과 관심사에 맞는 활동을 자유롭게 선택하실 수 있으며, 소규모 그룹으로 운영되어 참여도와 만족도가 높습니다.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 프로그램 목록 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#7BA178]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  다양한 프로그램
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  즐거운 일상을 만드는 여가 활동
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  주 5일 다양한 프로그램이 매일 오전·오후 2회씩 운영됩니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F8F6] rounded-2xl p-8 border border-gray-100 hover:border-[#7BA178]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#7BA178]/10 rounded-2xl flex items-center justify-center mb-6">
                      <i className={`${program.icon} text-3xl text-[#5C8D5A]`}></i>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {program.title}
                      </h3>
                      <span className="text-xs bg-[#5C8D5A]/10 text-[#5C8D5A] px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                        {program.frequency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2">
                      {program.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#7BA178] rounded-full"></div>
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 계절 행사 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#7BA178]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  특별 프로그램
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  계절별 행사 및 생신잔치
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  사계절 특별한 행사와 매월 생신 어르신을 위한 따뜻한 축하 모임을 진행합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {seasonalEvents.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-[#5C8D5A] mb-3">
                      {item.month}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#5C8D5A]/10 to-[#7BA178]/10 rounded-3xl p-10 text-center">
                <i className="ri-cake-3-line text-5xl text-[#5C8D5A] mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  매월 생신잔치
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  매월 생신을 맞으신 어르신을 위해 케이크와 함께하는 특별한 축하 시간을 준비합니다. 전 입소자가 함께 모여 축하 노래를 부르고 따뜻한 마음을 전합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 운영 특징 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F8F6] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#7BA178]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${feature.icon} text-2xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 상담 CTA */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-[#7BA178] to-[#5C8D5A] rounded-3xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  여가활동 프로그램 문의
                </h2>
                <p className="text-base mb-8 opacity-90">
                  어르신께 맞는 여가 프로그램을 안내해 드립니다
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:02-1234-5678"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#5C8D5A] px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-phone-line text-xl"></i>
                    전화 상담하기
                  </a>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all whitespace-nowrap border-2 border-white/30 cursor-pointer"
                  >
                    <i className="ri-mail-line text-xl"></i>
                    온라인 문의
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}