import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function CognitiveProgramPage() {
  const programs = [
    {
      icon: 'ri-brain-line',
      title: '인지자극훈련',
      description: '기억력, 주의력, 집중력 향상을 위한 체계적인 훈련 프로그램입니다',
      activities: ['숫자 기억하기', '사진 맞추기', '단어 연상 게임', '시간 개념 훈련']
    },
    {
      icon: 'ri-puzzle-line',
      title: '퍼즐 및 보드게임',
      description: '손과 두뇌를 함께 사용하는 다양한 활동으로 인지 능력을 자극합니다',
      activities: ['직소 퍼즐', '오목·장기·바둑', '숫자 게임', '색칠하기']
    },
    {
      icon: 'ri-chat-3-line',
      title: '언어활동 프로그램',
      description: '대화와 표현을 통해 언어 능력과 사회성을 동시에 향상시킵니다',
      activities: ['옛날이야기 나누기', '속담 맞추기', '노래 가사 따라 부르기', '일기 쓰기']
    },
    {
      icon: 'ri-group-line',
      title: '그룹 인지활동',
      description: '소규모 그룹으로 진행되는 활동을 통해 사회성과 인지 기능을 함께 향상시킵니다',
      activities: ['그룹 토론', '공동 작품 만들기', '함께 요리하기', '계절 행사 준비']
    }
  ];

  const features = [
    {
      icon: 'ri-user-heart-line',
      title: '개인 맞춤형 목표 설정',
      description: '어르신 개개인의 인지 수준과 관심사에 맞춘 맞춤형 프로그램을 제공합니다'
    },
    {
      icon: 'ri-team-line',
      title: '소규모 그룹 운영',
      description: '정원 29인 소규모 시설의 장점을 살려 4~6명 단위의 밀착 케어가 가능합니다'
    },
    {
      icon: 'ri-calendar-check-line',
      title: '주 5회 정기 운영',
      description: '월요일부터 금요일까지 매일 오전·오후 2회씩 체계적으로 진행됩니다'
    },
    {
      icon: 'ri-file-list-3-line',
      title: '활동 기록 관리',
      description: '모든 활동은 개별 기록지에 작성되어 보호자님께 정기적으로 공유됩니다'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-teal-50/30 to-amber-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-amber-500 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#5C8D5A]/5 to-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Link to="/" className="hover:text-[#5C8D5A] transition-colors">홈</Link>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="text-[#5C8D5A] font-semibold">인지관리프로그램</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  인지관리프로그램
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  사회복지사와 요양보호사가 협력하여 어르신의 기억력, 집중력, 판단력을 유지하고 향상시키기 위한 다양한 인지 자극 활동을 제공합니다. 소규모 정원형 요양원의 장점을 살려 개인별 맞춤형 프로그램으로 운영됩니다.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 프로그램 소개 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  프로그램 구성
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  다양한 인지 활동 프로그램
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  어르신의 인지 수준에 맞춘 체계적이고 전문적인 프로그램을 제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F8F6] rounded-2xl p-8 border border-gray-100 hover:border-[#5C8D5A]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#5C8D5A]/10 rounded-2xl flex items-center justify-center mb-6">
                      <i className={`${program.icon} text-3xl text-[#5C8D5A]`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2">
                      {program.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#5C8D5A] rounded-full"></div>
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 운영 특징 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
                  운영 방식
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  소규모 맞춤형 케어의 장점
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  정원 29인 소규모 시설이기에 가능한 세심하고 개별적인 인지 케어를 제공합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-[#5C8D5A] to-[#4A7148] rounded-3xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  인지관리프로그램 상담 문의
                </h2>
                <p className="text-base mb-8 opacity-90">
                  어르신의 인지 상태에 맞는 맞춤형 프로그램을 안내해 드립니다
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