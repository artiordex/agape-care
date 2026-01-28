'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

export default function StepCareProgramPage() {
  const stages = [
    {
      stage: '1단계',
      title: '적응 케어',
      period: '입소 후 1개월',
      color: 'from-[#A8D5BA] to-[#7BA178]',
      icon: 'ri-heart-add-line',
      description: '새로운 환경에 편안하게 적응할 수 있도록 집중적으로 돌봅니다',
      goals: [
        '요양원 환경과 생활 규칙 익히기',
        '다른 어르신들과 친밀감 형성',
        '개인별 건강 상태 상세 파악',
        '기본 생활 리듬 확립',
      ],
      activities: [
        { icon: 'ri-user-smile-line', title: '1:1 환영 면담', desc: '입소 첫날 개별 면담으로 불안감 해소' },
        { icon: 'ri-home-heart-line', title: '시설 안내 투어', desc: '식당·프로그램실 등 주요 공간 소개' },
        { icon: 'ri-group-line', title: '소규모 그룹 활동', desc: '2~3명의 그룹에서 천천히 적응' },
        { icon: 'ri-calendar-check-line', title: '일과 적응 지원', desc: '식사·휴식 등 규칙적 생활 안내' },
      ],
    },
    {
      stage: '2단계',
      title: '기능 유지 케어',
      period: '적응기 이후 안정기',
      color: 'from-[#7BA178] to-[#5C8D5A]',
      icon: 'ri-shield-star-line',
      description: '신체·인지 기능을 유지하고 일상생활 능력을 지속적으로 관리합니다',
      goals: [
        '현재 신체 기능 유지 및 개선',
        '인지 능력 저하 예방',
        '사회성 유지 및 관계 형성',
        '정서적 안정과 삶의 질 향상',
      ],
      activities: [
        { icon: 'ri-brain-line', title: '인지관리 프로그램', desc: '주 5회 정기 인지자극 활동' },
        { icon: 'ri-walk-line', title: '신체활동 프로그램', desc: '보행·관절 운동·근력 강화' },
        { icon: 'ri-music-2-line', title: '여가활동 프로그램', desc: '음악·미술·원예 활동 참여' },
        { icon: 'ri-heart-pulse-line', title: '건강 모니터링', desc: '혈압‧혈당 체크 및 건강 관리' },
      ],
    },
    {
      stage: '3단계',
      title: '심화 케어',
      period: '집중 관리가 필요한 시기',
      color: 'from-[#5C8D5A] to-[#4A7148]',
      icon: 'ri-service-line',
      description: '건강 상태 변화나 특별한 돌봄이 필요한 경우 맞춤형 집중 케어를 제공합니다',
      goals: ['질병·부상 회복 지원', '신체 기능 저하 최소화', '24시간 집중 건강 관리', '보호자와 긴밀한 소통'],
      activities: [
        { icon: 'ri-nurse-line', title: '집중 간호 관리', desc: '간호사의 밀착 건강 관리' },
        { icon: 'ri-hospital-line', title: '의료기관 연계', desc: '협력 병원과 신속한 진료 연계' },
        { icon: 'ri-wheelchair-line', title: '재활치료 강화', desc: '개별 맞춤 재활 프로그램 운영' },
        { icon: 'ri-parent-line', title: '보호자 정기 보고', desc: '주 1~2회 건강 상태 상세 보고' },
      ],
    },
  ];

  const benefits = [
    {
      icon: 'ri-user-heart-line',
      title: '개인 맞춤 케어',
      description: '어르신 한 분 한 분의 상태와 필요에 맞춘 개별 케어 플랜을 수립합니다',
    },
    {
      icon: 'ri-time-line',
      title: '단계별 점진적 관리',
      description: '적응기 → 유지기 → 심화기로 이어지는 체계적인 단계별 케어를 제공합니다',
    },
    {
      icon: 'ri-team-line',
      title: '다학제 협력 케어',
      description: '간호사·요양보호사·사회복지사가 협력하여 종합적인 케어를 제공합니다',
    },
    {
      icon: 'ri-file-list-3-line',
      title: '기록 기반 관리',
      description: '모든 케어 과정은 기록되어 지속적으로 모니터링되고 개선됩니다',
    },
  ];

  const carePlan = [
    {
      title: '초기 평가',
      description: '입소 후 1주일 이내 종합 평가 실시',
      items: ['신체 기능 평가', '인지 기능 평가', '영양 상태 평가', '심리·정서 평가'],
    },
    {
      title: '케어 플랜 수립',
      description: '평가 결과를 바탕으로 개인별 케어 계획 작성',
      items: ['단기 목표 설정', '장기 목표 설정', '프로그램 일정 수립', '가족 의견 반영'],
    },
    {
      title: '정기 재평가',
      description: '3개월마다 재평가하여 케어 플랜 조정',
      items: ['변화 모니터링', '목표 달성도 확인', '케어 플랜 수정', '보호자 상담'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/30">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 pb-20 pt-40 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 text-sm text-white/80">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <i className="ri-arrow-right-s-line"/>
              <span className="font-semibold">단계별 맞춤 케어</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">단계별 맞춤 케어 프로그램</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
              입소 적응기부터 안정기, 그리고 집중 관리가 필요한 시기까지 3단계 맞춤 케어를 제공합니다. 상태 변화에 따른
              계획 수립과 지속적 모니터링으로 최적의 케어를 실현합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3단계 케어 */}
      <section className="border-b border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-[#A8D5BA]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              3단계 케어
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">상태별 단계적 맞춤 케어</h2>
            <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600">
              입소 적응부터 일상 유지, 집중 관리까지 필요한 케어를 제공합니다
            </p>
          </motion.div>

          <div className="space-y-12">
            {stages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`rounded-3xl bg-gradient-to-br ${stage.color} mb-8 p-8 text-white md:p-12`}>
                  <div className="mb-6 flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <i className={`${stage.icon} text-4xl text-white`} />
                    </div>

                    <div className="flex-1">
                      <div className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-bold">
                        {stage.stage}
                      </div>
                      <h3 className="text-3xl font-bold">{stage.title}</h3>
                      <p className="text-lg opacity-90">{stage.period}</p>
                    </div>
                  </div>

                  <p className="mb-8 text-lg leading-relaxed opacity-95">{stage.description}</p>

                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    <h4 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <i className="ri-target-line"/> 케어 목표
                    </h4>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {stage.goals.map((goal, gIdx) => (
                        <div key={gIdx} className="flex items-start gap-2">
                          <i className="ri-check-double-line mt-0.5 text-xl" />
                          <span className="text-sm">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* activities */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {stage.activities.map((ac, acIdx) => (
                    <motion.div
                      key={acIdx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: acIdx * 0.1 }}
                      viewport={{ once: true }}
                      className="rounded-2xl bg-[#F9F8F6] p-6 transition hover:shadow-xl"
                    >
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#A8D5BA] to-[#7BA178]">
                        <i className={`${ac.icon} text-2xl text-white`} />
                      </div>

                      <h4 className="mb-2 font-bold text-gray-800">{ac.title}</h4>
                      <p className="text-sm leading-relaxed text-gray-600">{ac.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 케어 플랜 */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-[#A8D5BA]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              케어 플랜
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">개인별 케어 플랜 수립 과정</h2>
            <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600">
              평가 → 계획 → 모니터링의 체계적인 프로세스를 거쳐 최적의 케어를 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {carePlan.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-8 transition hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8D5BA] to-[#7BA178]">
                  <span className="text-3xl font-bold text-white">{idx + 1}</span>
                </div>

                <h3 className="mb-3 text-center text-xl font-bold text-gray-800">{p.title}</h3>
                <p className="mb-6 text-center text-sm text-gray-600">{p.description}</p>

                <div className="space-y-2">
                  {p.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex gap-2 text-sm text-gray-700">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#7BA178]" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 특징 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-[#A8D5BA]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              프로그램 특징
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">단계별 맞춤 케어의 장점</h2>
            <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600">
              소규모 정원의 강점을 살린 체계적·개별화된 케어가 가능합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#F9F8F6] p-6 text-center transition hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#A8D5BA]/10">
                  <i className={`${b.icon} text-2xl text-[#5C8D5A]`}/>
                </div>

                <h3 className="mb-3 text-base font-bold text-gray-800">{b.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-[#A8D5BA] to-[#7BA178] p-12 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold">단계별 맞춤 케어 상담</h2>
            <p className="mb-8 text-base opacity-90">어르신 상태에 꼭 맞는 케어 플랜을 안내해드립니다</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:02-1234-5678"
                className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#5C8D5A] hover:bg-gray-50"
              >
                <i className="ri-phone-line text-xl"/>
                전화 상담하기
              </a>

              <Link
                href="/#contact"
                className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white hover:bg-white/20"
              >
                <i className="ri-mail-line text-xl"/>
                온라인 문의
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
