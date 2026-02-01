/**
 * Description : PhilosophySection.tsx - 📌 운영 철학
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function PhilosophySection() {
  const philosophies = [
    {
      title: '정성을 다하는 돌봄',
      desc: '내 부모님을 모시는 마음으로, 일상의 작은 순간까지 정성을 다해 어르신의 편안한 노후를 지원합니다.',
      icon: 'ri-service-line',
    },
    {
      title: '마음이 통하는 소통',
      desc: '어르신, 보호자, 그리고 지역사회와 끊임없이 소통하며 신뢰를 쌓고 함께 행복을 나누는 공간을 만듭니다.',
      icon: 'ri-chat-smile-3-line',
    },
    {
      title: '신뢰 기반의 전문성',
      desc: '체계적인 안전 시스템과 전문 인력의 맞춤 케어를 통해 어르신의 건강과 안전을 최우선으로 생각합니다.',
      icon: 'ri-medal-line',
    },
  ];

  return (
    <section id="philosophy" className="bg-gray-50 py-24 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-4">
        {/* 섹션 타이틀: 좌측 그린 바 스타일 유지 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">운영 철학</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* 좌측: 철학 메시지 영역 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="mb-6 text-3xl font-bold leading-tight text-gray-900">
              어르신의 <span className="text-[#5C8D5A]">행복한 일상</span>이<br />
              우리의 진정한 보람입니다
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              단순한 보호를 넘어, 어르신 한 분 한 분의 삶의 궤적을 존중하고 따뜻한 온기를 나누는 공동체가 되고자 합니다.
              우리는 정직과 신뢰를 바탕으로 최상의 케어 서비스를 약속드립니다.
            </p>

            <div className="rounded-2xl border border-[#5C8D5A]/10 bg-[#5C8D5A]/5 p-8">
              <p className="text-lg font-bold italic text-[#5C8D5A]">"따뜻한 손길로 어르신의 내일을 잇습니다"</p>
            </div>
          </motion.div>

          {/* 우측: 3대 핵심 철학 카드 리스트 */}
          <div className="space-y-6">
            {philosophies.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#5C8D5A] text-2xl text-white">
                  <i className={item.icon} />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
