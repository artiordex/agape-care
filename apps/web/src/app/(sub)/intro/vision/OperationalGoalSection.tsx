/**
 * Description : OperationalGoalSection.tsx - 📌 운영 목표 및 방향성 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function OperationalGoalSection() {
  const goals = [
    {
      title: '서비스 품질 향상',
      desc: '정기적인 직원 교육과 최신 케어 기법 학습을 통해 어르신께 더 나은 환경을 제공합니다.',
      icon: 'ri-line-chart-line',
    },
    {
      title: '의료기관 협력 강화',
      desc: '협력 의료기관과의 긴밀한 네트워크를 통해 신속하고 정확한 의료 서비스를 지원합니다.',
      icon: 'ri-hospital-line',
    },
    {
      title: '프로그램 개별화',
      desc: '어르신의 관심사와 기능 수준에 맞춘 맞춤형 활동을 통해 즐거운 일상을 선사합니다.',
      icon: 'ri-user-settings-line',
    },
    {
      title: '투명한 운영과 신뢰',
      desc: '보호자님과의 실시간 정보 공유와 소통을 통해 투명하고 믿을 수 있는 운영을 실천합니다.',
      icon: 'ri-eye-line',
    },
    {
      title: '지역사회 연계 활동',
      desc: '지역 주민과 교류하며 어르신께서 사회적 관계를 유지하고 의미 있는 활동에 참여하도록 돕습니다.',
      icon: 'ri-group-line',
    },
  ];

  return (
    <section id="goals" className="bg-white py-24 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-4">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">운영 목표 및 방향성</h2>
        </motion.div>

        {/* 핵심 가치 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-3xl bg-[#F9F8F6] p-8 md:p-12"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#5C8D5A]">
                <i className="ri-star-fill" /> 소규모 정원형의 강점
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                정원 29인 시설의 장점을 극대화하여, 대규모 시설에서 놓치기 쉬운{' '}
                <strong className="text-gray-900">어르신 한 분 한 분의 성격과 선호도</strong>를 모두 기억하고 세심하게
                케어합니다.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 5대 운영 방향 리스트 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-[#5C8D5A]/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5C8D5A]/10 text-2xl text-[#5C8D5A]">
                <i className={goal.icon} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">{goal.title}</h4>
              <p className="text-sm leading-relaxed text-gray-500">{goal.desc}</p>
            </motion.div>
          ))}

          {/* 마무리 강조 메시지 박스 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-[#5C8D5A] to-[#4a7248] p-8 text-white"
          >
            <p className="mb-2 text-sm font-medium opacity-80">Our Promise</p>
            <h4 className="text-xl font-bold leading-tight">
              어르신의 내일이 <br />
              오늘보다 더 즐겁도록
            </h4>
            <div className="mt-4 h-1 w-12 rounded-full bg-white/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
