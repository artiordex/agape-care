'use client';

import { motion } from 'framer-motion';

export default function NutritionStandardsSection() {
  const nutritionStandards = [
    {
      icon: 'ri-user-heart-line',
      title: '영양사 관리',
      description: '영양사가 직접 고용되거나 위탁급식 영양사가 정기적으로 식단을 관리합니다',
    },
    {
      icon: 'ri-file-list-3-line',
      title: '식단표 사전 공개',
      description: '주간 식단표를 사전에 작성하여 보호자님께 공유하고 게시합니다',
    },
    {
      icon: 'ri-shield-star-line',
      title: '위생 안전 관리',
      description: '식품위생법과 급식 위생 기준을 철저히 준수하여 안전한 식사를 제공합니다',
    },
    {
      icon: 'ri-parent-line',
      title: '보호자 의견 반영',
      description: '어르신과 보호자님의 음식 선호도와 요청 사항을 적극 반영합니다',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#D4A574]/10 px-4 py-2 text-sm font-semibold text-[#8B6F47]">
            운영 기준
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">안전하고 체계적인 급식 관리</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            식품위생법과 급식 관리 기준을 철저히 준수하여 운영합니다
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {nutritionStandards.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#F9F8F6] p-6 text-center transition hover:shadow-xl"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A574]/10">
                <i className={`${s.icon} text-2xl text-[#8B6F47]`} />
              </div>

              <h3 className="mb-3 text-base font-bold text-gray-800">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
