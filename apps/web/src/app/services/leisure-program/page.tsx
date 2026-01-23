'use client';

import Link from 'next/link';

export default function LeisureProgramPage() {
  const programs = [
    {
      icon: 'ri-music-2-line',
      title: '음악 프로그램',
      description: '추억의 노래를 함께 부르고 악기를 연주하며 정서적 안정을 찾습니다',
      activities: ['노래교실', '악기 연주', '음악 감상', '리듬 따라하기'],
      frequency: '주 3회',
    },
    {
      icon: 'ri-palette-line',
      title: '미술 활동',
      description: '그림 그리기, 색칠하기 등 창작 활동으로 표현력을 높입니다',
      activities: ['수채화 그리기', '색칠 공부', '만들기 활동', '계절 작품 만들기'],
      frequency: '주 2회',
    },
    {
      icon: 'ri-plant-line',
      title: '원예 활동',
      description: '식물을 가꾸며 자연과 교감하고 성취감을 느낍니다',
      activities: ['화분 가꾸기', '채소 키우기', '꽃꽂이', '텃밭 관리'],
      frequency: '주 2회',
    },
    {
      icon: 'ri-movie-2-line',
      title: '영상 프로그램',
      description: '영화, 다큐멘터리를 관람하며 여가 시간을 즐깁니다',
      activities: ['영화 감상', '옛날 드라마 보기', '자연 다큐', '음악 방송'],
      frequency: '주 2회',
    },
    {
      icon: 'ri-book-open-line',
      title: '독서 및 회상 활동',
      description: '책 읽기와 이야기 나누기로 추억을 회상하고 소통합니다',
      activities: ['책 읽어주기', '옛날이야기', '신문 읽기', '시 낭송'],
      frequency: '주 3회',
    },
    {
      icon: 'ri-gamepad-line',
      title: '레크리에이션',
      description: '즐거운 게임과 놀이로 웃음과 활력을 되찾습니다',
      activities: ['풍선 배구', '공 굴리기', '윷놀이', '민속 놀이'],
      frequency: '주 2회',
    },
  ];

  const seasonalEvents = [
    { month: '봄', event: '봄맞이 나들이, 꽃구경' },
    { month: '여름', event: '여름 음악회, 수박 파티' },
    { month: '가을', event: '추석 행사, 단풍 나들이' },
    { month: '겨울', event: '송년회, 윷놀이 대회' },
  ];

  const features = [
    {
      icon: 'ri-heart-line',
      title: '정서 안정',
      description: '즐거운 활동을 통해 우울감을 해소하고 정서적 안정을 찾습니다',
    },
    {
      icon: 'ri-group-2-line',
      title: '사회성 향상',
      description: '함께하는 활동으로 어르신 간 교류와 소통이 활발해집니다',
    },
    {
      icon: 'ri-creative-commons-by-line',
      title: '자율적 선택',
      description: '관심사와 선호도에 따라 원하는 프로그램을 자유롭게 선택할 수 있습니다',
    },
    {
      icon: 'ri-cake-3-line',
      title: '생신 및 기념일',
      description: '매월 생신 어르신을 위한 특별한 생신잔치를 준비합니다',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-orange-50/30">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 pb-24 pt-40 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="hover:underline">
              홈
            </Link>
            <i className="ri-arrow-right-s-line text-white"/>
            <span className="font-semibold">여가활동 프로그램</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">여가활동 프로그램</h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
            어르신의 정서적 안정과 사회성 향상을 위한 다양한 여가 프로그램을 제공합니다. 음악, 미술, 원예, 영화 감상,
            레크리에이션 등 취향과 관심사에 맞는 활동을 자유롭게 선택하실 수 있으며, 소규모 그룹으로 운영되어 참여도와
            만족도가 높습니다.
          </p>
        </div>
      </section>

      {/* Program List */}
      <section className="border-b border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              다양한 프로그램
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">즐거운 일상을 만드는 여가 활동</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              주 5일 다양한 프로그램이 매일 오전·오후 2회씩 운영됩니다
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:border-[#7BA178]/30 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7BA178]/10">
                  <i className={`${p.icon} text-3xl text-[#5C8D5A]`} />
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
                  <span className="rounded-full bg-[#5C8D5A]/10 px-3 py-1 text-xs font-semibold text-[#5C8D5A]">
                    {p.frequency}
                  </span>
                </div>

                <p className="mb-6 text-sm text-gray-600">{p.description}</p>

                <div className="space-y-2">
                  {p.activities.map((a, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#7BA178]" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Events */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              특별 프로그램
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">계절별 행사 및 생신잔치</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              사계절 특별한 행사와 매월 생신 어르신을 위한 따뜻한 축하 모임을 진행합니다
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {seasonalEvents.map((e, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 text-center transition hover:shadow-xl">
                <div className="mb-3 text-3xl font-bold text-[#5C8D5A]">{e.month}</div>
                <p className="text-sm leading-relaxed text-gray-700">{e.event}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#5C8D5A]/10 to-[#7BA178]/10 p-10 text-center">
            <i className="ri-cake-3-line mb-4 text-5xl text-[#5C8D5A]" />
            <h3 className="mb-3 text-2xl font-bold text-gray-800">매월 생신잔치</h3>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
              매월 생신을 맞으신 어르신을 위해 케이크와 함께하는 특별한 축하 시간을 준비합니다. 전 입소자가 함께 모여
              축하 노래를 부르고 따뜻한 마음을 전합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl bg-[#F9F8F6] p-6 text-center transition hover:shadow-xl">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7BA178]/10">
                  <i className={`${f.icon} text-2xl text-[#5C8D5A]`} />
                </div>
                <h3 className="mb-3 text-base font-bold text-gray-800">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-gradient-to-br from-[#7BA178] to-[#5C8D5A] p-12 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-bold">여가활동 프로그램 문의</h2>
            <p className="mb-8 text-base opacity-90">어르신께 맞는 여가 프로그램을 안내해 드립니다</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#5C8D5A] hover:bg-gray-50"
              >
                <i className="ri-phone-line text-xl" />
                전화 상담하기
              </a>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-white hover:bg-white/20"
              >
                <i className="ri-mail-line text-xl" />
                온라인 문의
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
