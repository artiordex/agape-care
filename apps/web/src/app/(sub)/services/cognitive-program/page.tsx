'use client';

import Link from 'next/link';

export default function CognitiveProgramPage() {
  const programs = [
    {
      icon: 'ri-brain-line',
      title: '인지자극훈련',
      description: '기억력, 주의력, 집중력 향상을 위한 체계적인 훈련 프로그램입니다',
      activities: ['숫자 기억하기', '사진 맞추기', '단어 연상 게임', '시간 개념 훈련'],
    },
    {
      icon: 'ri-puzzle-line',
      title: '퍼즐 및 보드게임',
      description: '손과 두뇌를 함께 사용하는 다양한 활동으로 인지 능력을 자극합니다',
      activities: ['직소 퍼즐', '오목·장기·바둑', '숫자 게임', '색칠하기'],
    },
    {
      icon: 'ri-chat-3-line',
      title: '언어활동 프로그램',
      description: '대화와 표현을 통해 언어 능력과 사회성을 동시에 향상시킵니다',
      activities: ['옛날이야기 나누기', '속담 맞추기', '노래 가사 따라 부르기', '일기 쓰기'],
    },
    {
      icon: 'ri-group-line',
      title: '그룹 인지활동',
      description: '소규모 그룹으로 진행되는 활동을 통해 사회성과 인지 기능을 함께 향상시킵니다',
      activities: ['그룹 토론', '공동 작품 만들기', '함께 요리하기', '계절 행사 준비'],
    },
  ];

  const features = [
    {
      icon: 'ri-user-heart-line',
      title: '개인 맞춤형 목표 설정',
      description: '어르신 개개인의 인지 수준과 관심사에 맞춘 맞춤형 프로그램을 제공합니다',
    },
    {
      icon: 'ri-team-line',
      title: '소규모 그룹 운영',
      description: '정원 29인 소규모 시설의 장점을 살려 4~6명 단위의 밀착 케어가 가능합니다',
    },
    {
      icon: 'ri-calendar-check-line',
      title: '주 5회 정기 운영',
      description: '월요일부터 금요일까지 매일 오전·오후 2회씩 체계적으로 진행됩니다',
    },
    {
      icon: 'ri-file-list-3-line',
      title: '활동 기록 관리',
      description: '모든 활동은 개별 기록지에 작성되어 보호자님께 정기적으로 공유됩니다',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50/30 to-amber-50/30">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#5C8D5A]/5 to-white pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Breadcrumb */}
            <div className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="transition-colors hover:text-[#5C8D5A]">
                홈
              </Link>
              <i className="ri-arrow-right-s-line"/>
              <span className="font-semibold text-[#5C8D5A]">인지관리프로그램</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-gray-800 sm:text-5xl">인지관리프로그램</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              사회복지사와 요양보호사가 협력하여 어르신의 기억력, 집중력, 판단력을 유지하고 향상시키기 위한 다양한 인지
              자극 활동을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="border-b border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              프로그램 구성
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">다양한 인지 활동 프로그램</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              어르신의 인지 수준에 맞춘 체계적이고 전문적인 프로그램을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {programs.map((program, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition-all duration-300 hover:border-[#5C8D5A]/30 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C8D5A]/10">
                  <i className={`${program.icon} text-3xl text-[#5C8D5A]`}/>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800">{program.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">{program.description}</p>
                <div className="space-y-2">
                  {program.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#5C8D5A]"/>
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              운영 방식
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">소규모 맞춤형 케어의 장점</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              정원 29인 소규모 시설이기에 가능한 세심하고 개별적인 인지 케어를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 text-center transition-all duration-300 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className={`${feature.icon} text-2xl text-[#5C8D5A]`}/>
                </div>
                <h3 className="mb-3 text-base font-bold text-gray-800">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#5C8D5A] to-[#4A7148] p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">인지관리프로그램 상담 문의</h2>
            <p className="mb-8 text-base opacity-90">어르신의 인지 상태에 맞는 맞춤형 프로그램을 안내해 드립니다</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#5C8D5A] hover:bg-gray-50"
              >
                <i className="ri-phone-line text-xl"/>
                전화 상담하기
              </a>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white hover:bg-white/20"
              >
                <i className="ri-mail-line text-xl"/>
                온라인 문의
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
