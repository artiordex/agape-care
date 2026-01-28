'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StepCareProgramSection() {
  const stages = [
    {
      stage: '1단계',
      title: '적응 케어',
      period: '입소 초기 1개월',
      color: 'from-[#A8D5BA] to-[#7BA178]',
      description: '새로운 환경에 안정적으로 적응하도록 돕는 초기 집중 케어 단계입니다.',
      goals: ['생활 패턴 파악 및 안정화', '타 어르신들과 자연스러운 적응', '기초 건강 상태 세부 확인'],
    },
    {
      stage: '2단계',
      title: '기능 유지 케어',
      period: '안정기 이후',
      color: 'from-[#7BA178] to-[#5C8D5A]',
      description: '신체·인지 기능을 유지하고 일상을 건강하게 보내도록 돕는 케어 단계입니다.',
      goals: ['신체 기능 유지 및 보행·관절 운동', '인지저하 예방 및 기억력 유지', '사회적 상호작용 확대'],
    },
    {
      stage: '3단계',
      title: '심화 케어',
      period: '집중 관리 필요 시기',
      color: 'from-[#5C8D5A] to-[#4A7148]',
      description: '건강 변화에 따라 보다 세밀하고 지속적인 집중 케어가 필요한 단계입니다.',
      goals: ['24시간 건강 모니터링', '의료기관 연계 강화', '개별 재활 및 회복 중심 케어'],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/30 py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#A8D5BA]/20 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            단계별 케어
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">어르신 상태에 맞춘 단계별 맞춤 케어</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            입소 초기에 적응을 돕고, 안정기에는 기능을 유지하며, 필요 시 집중 케어까지 제공하는 체계적인 프로그램입니다.
          </p>
        </motion.div>

        {/* Stage Cards */}
        <div className="space-y-12">
          {stages.map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`rounded-3xl bg-gradient-to-br ${s.color} p-8 text-white md:p-12`}
            >
              <div className="mb-6">
                <div className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-bold">{s.stage}</div>
                <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
                <p className="text-white/80">{s.period}</p>
              </div>

              <p className="mb-6 text-lg leading-relaxed text-white/95">{s.description}</p>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <i className="ri-check-line text-xl" />주요 목표
                </h4>

                <ul className="space-y-2">
                  {s.goals.map((g, idx) => (
                    <li key={g} className="flex items-start gap-2 text-sm">
                      <i className="ri-arrow-right-s-line text-white" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/#contact"
            className="rounded-full bg-[#5C8D5A] px-10 py-4 font-semibold text-white shadow-md hover:bg-[#4b7448]"
          >
            단계별 케어 상담 문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
