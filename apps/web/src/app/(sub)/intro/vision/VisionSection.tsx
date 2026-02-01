/**
 * Description : VisionSection.tsx - 📌 기관의 가치와 목표 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function VisionSection() {
  const visions = [
    {
      title: '신뢰',
      subtitle: '신뢰받는 따뜻한 공간',
      desc: '맞춤형 돌봄 서비스를 통해 어르신과 보호자 모두가 안심하고 의지할 수 있는 환경을 조성합니다.',
      icon: 'ri-shake-hands-line',
    },
    {
      title: '존중',
      subtitle: '서로가 행복한 공간',
      desc: '상호 인권 존중을 바탕으로 어르신의 존엄성을 지키며, 모두가 미소 짓는 공동체를 만듭니다.',
      icon: 'ri-heart-3-line',
    },
    {
      title: '성장',
      subtitle: '성장하는 이음 공동체',
      desc: '함께 배우고, 웃고, 성장하며 지역사회와 어르신의 삶을 잇는 가교 역할을 수행합니다.',
      icon: 'ri-seedling-line',
    },
  ];

  return (
    <section id="vision" className="bg-white py-24 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-4">
        {/* 섹션 타이틀: 요청하신 좌측 그린 바 스타일로 변경 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">기관의 가치와 목표</h2>
        </motion.div>

        {/* 미션 영역 (가로형 강조 카드) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16 overflow-hidden rounded-3xl bg-[#5C8D5A] p-8 text-center text-white md:p-12"
        >
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-bold tracking-widest">
              MISSION
            </span>
            <h3 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">"어르신들의 노후가 행복한 공동체 실현"</h3>
          </div>
          {/* 배경 데코 아이콘 */}
          <i className="ri-double-quotes-l absolute -bottom-4 -left-4 text-9xl text-white/5" />
          <i className="ri-heart-fill absolute -right-10 -top-10 text-[200px] text-white/5" />
        </motion.div>

        {/* 비전 영역 (3그리드 카드) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {visions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl border border-gray-100 bg-gray-50/50 p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-[#5C8D5A]/5"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#5C8D5A] text-2xl text-white transition-transform group-hover:scale-110">
                <i className={item.icon} />
              </div>

              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C8D5A]">Vision {index + 1}</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
              <p className="mt-1 text-sm font-semibold text-[#5C8D5A]">{item.subtitle}</p>

              <p className="mt-4 text-sm leading-relaxed text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
