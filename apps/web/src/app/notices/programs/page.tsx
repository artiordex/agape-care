'use client';

import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

import NoticeSidebar from '@/components/NoticeSidebar';

export default function ProgramsPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  const weeklyPrograms = [
    {
      day: '월요일',
      morning: '인지활동 프로그램',
      afternoon: '음악치료',
      icon: 'ri-music-2-line',
      color: 'from-blue-500 to-blue-600',
    },
    {
      day: '화요일',
      morning: '물리치료',
      afternoon: '미술활동',
      icon: 'ri-palette-line',
      color: 'from-green-500 to-green-600',
    },
    {
      day: '수요일',
      morning: '작업치료',
      afternoon: '원예활동',
      icon: 'ri-plant-line',
      color: 'from-teal-500 to-teal-600',
    },
    {
      day: '목요일',
      morning: '인지활동 프로그램',
      afternoon: '레크리에이션',
      icon: 'ri-game-line',
      color: 'from-amber-500 to-amber-600',
    },
    {
      day: '금요일',
      morning: '물리치료',
      afternoon: '영화감상',
      icon: 'ri-movie-line',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const programCategories = [
    {
      title: '인지활동 프로그램',
      description: '기억력과 인지능력 향상을 위한 다양한 활동',
      programs: ['회상요법', '퍼즐 맞추기', '숫자 게임', '단어 찾기', '색칠하기'],
      icon: 'ri-brain-line',
      image:
        'https://readdy.ai/api/search-image?query=elderly%20people%20doing%20cognitive%20activities&width=800&height=600&seq=c1',
    },
    {
      title: '물리치료',
      description: '신체 기능 유지 및 향상을 위한 재활 운동',
      programs: ['관절 운동', '근력 강화', '보행 훈련', '균형 운동', '스트레칭'],
      icon: 'ri-wheelchair-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20physical%20therapy&width=800&height=600&seq=c2',
    },
    {
      title: '작업치료',
      description: '일상생활 능력 향상을 위한 실용적 활동',
      programs: ['손 기능 훈련', '일상생활 동작', '소근육 운동', '도구 사용 훈련', '자조 활동'],
      icon: 'ri-hand-heart-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20occupational%20therapy&width=800&height=600&seq=c3',
    },
    {
      title: '음악치료',
      description: '정서 안정과 즐거움을 위한 음악 활동',
      programs: ['노래 부르기', '악기 연주', '음악 감상', '리듬 활동', '음악 회상'],
      icon: 'ri-music-2-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20music%20therapy&width=800&height=600&seq=c4',
    },
    {
      title: '미술활동',
      description: '창의력과 표현력을 키우는 예술 활동',
      programs: ['그림 그리기', '만들기', '색칠하기', '점토 공예', '콜라주'],
      icon: 'ri-palette-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20art%20therapy&width=800&height=600&seq=c5',
    },
    {
      title: '원예활동',
      description: '자연과 함께하는 힐링 프로그램',
      programs: ['화분 가꾸기', '씨앗 심기', '물주기', '꽃꽂이', '텃밭 가꾸기'],
      icon: 'ri-plant-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20gardening&width=800&height=600&seq=c6',
    },
    {
      title: '레크리에이션',
      description: '즐거운 여가 활동과 사회적 교류',
      programs: ['게임 활동', '체조', '댄스', '노래방', '생일 파티'],
      icon: 'ri-game-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20recreation&width=800&height=600&seq=c7',
    },
    {
      title: '영화감상',
      description: '추억의 영화와 함께하는 문화 활동',
      programs: ['옛날 영화', '다큐', '음악 영상', '드라마', '공연 영상'],
      icon: 'ri-movie-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20movie%20watching&width=800&height=600&seq=c8',
    },
  ];

  const specialPrograms = [
    {
      title: '생신 잔치',
      description: '매월 생신을 맞으신 어르신을 위한 특별한 행사',
      frequency: '매월 1회',
      icon: 'ri-cake-3-line',
      color: 'bg-pink-50 text-pink-600',
    },
    {
      title: '명절 행사',
      description: '명절맞이 특별 행사 및 전통문화 체험',
      frequency: '명절마다',
      icon: 'ri-gift-line',
      color: 'bg-red-50 text-red-600',
    },
    {
      title: '야외 나들이',
      description: '계절에 맞는 야외 활동 및 문화 체험',
      frequency: '분기별 1회',
      icon: 'ri-bus-line',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: '가족 참여 행사',
      description: '가족과 함께하는 정서적 교류 프로그램',
      frequency: '분기별 1회',
      icon: 'ri-parent-line',
      color: 'bg-blue-50 text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 pb-20 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage:
              "url('https://readdy.ai/api/search-image?query=elderly%20care%20programs%20hero&width=1920&height=600')",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow">
              <i className="ri-calendar-check-line text-xl text-[#5C8D5A]" />
              <span className="text-sm font-semibold text-gray-700">프로그램 안내</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">월간 프로그램 일정</h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
              어르신들의 건강하고 즐거운 생활을 위한
              <br />
              다양한 프로그램을 매일 진행합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-20">
        {/* LEFT SIDEBAR */}
        <NoticeSidebar />

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          {/* WEEKLY PROGRAMS */}
          <section className="mb-24">
            <motion.div
              ref={ref1}
              initial={{ opacity: 0, y: 30 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">주간 프로그램 일정</h2>
              <p className="text-lg text-gray-600">매주 규칙적으로 진행되는 프로그램입니다</p>
            </motion.div>

            {/* WEEKLY CARDS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {weeklyPrograms.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow hover:shadow-xl"
                >
                  <div className={`bg-gradient-to-br px-6 py-6 text-white ${p.color}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{p.day}</h3>
                      <i className={`${p.icon} text-2xl`} />
                    </div>
                  </div>

                  <div className="space-y-4 p-6">
                    <div>
                      <p className="mb-1 text-xs text-gray-500">오전 (10:00-11:30)</p>
                      <p className="text-sm font-semibold text-gray-900">{p.morning}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="mb-1 text-xs text-gray-500">오후 (14:00-15:30)</p>
                      <p className="text-sm font-semibold text-gray-900">{p.afternoon}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <i className="ri-information-line text-2xl text-blue-600" />
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900">프로그램 참여 안내</h4>
                  <p className="leading-relaxed text-gray-600">
                    모든 프로그램은 어르신의 건강 상태와 의사를 고려하여 참여 가능합니다. 맞춤 프로그램을 제공하며,
                    참여가 어려우신 경우 개별 활동을 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PROGRAM DETAILS */}
          <section className="mb-24">
            <motion.div
              ref={ref2}
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">프로그램 상세 안내</h2>
              <p className="text-lg text-gray-600">각 프로그램의 세부 내용을 확인하세요</p>
            </motion.div>

            <div className="space-y-10">
              {programCategories.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
                    </div>

                    <div className="p-8">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-amber-50">
                          <i className={`${c.icon} text-3xl text-[#5C8D5A]`} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{c.title}</h3>
                      </div>

                      <p className="mb-6 text-gray-600">{c.description}</p>

                      <div>
                        <p className="mb-2 text-sm font-bold text-gray-900">주요 활동</p>
                        <div className="flex flex-wrap gap-2">
                          {c.programs.map((p, idx) => (
                            <span
                              key={idx}
                              className="rounded-lg bg-gradient-to-br from-teal-50 to-amber-50 px-4 py-2 text-sm font-medium text-gray-700"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SPECIAL PROGRAMS */}
          <section className="pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">특별 프로그램</h2>
              <p className="text-lg text-gray-600">특별한 날을 더욱 의미있게 만드는 행사들입니다</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {specialPrograms.map((sp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 p-8 shadow hover:shadow-lg"
                >
                  <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${sp.color}`}>
                    <i className={`${sp.icon} text-3xl`} />
                  </div>

                  <div className="text-center">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{sp.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">{sp.description}</p>

                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                      <i className="ri-calendar-line text-[#5C8D5A]" />
                      <span className="text-sm font-semibold text-gray-700">{sp.frequency}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
