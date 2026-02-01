/**
 * Description : LifeRuleSection.tsx - 📌 생활 규칙 안내
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function LifeRulesSection() {
  const lifeRules = [
    { title: '기상 및 취침', time: '오전 7시 기상 / 오후 9시 취침', icon: 'ri-time-line' },
    { title: '식사 시간', time: '아침 8시 / 점심 12시 / 저녁 6시', icon: 'ri-restaurant-line' },
    { title: '면회 시간', time: '평일 오전 10시 ~ 오후 6시', icon: 'ri-parent-line' },
    { title: '외출 및 외박', time: '보호자 동의 후 가능', icon: 'ri-door-open-line' },
    { title: '프로그램 참여', time: '개인 상태에 맞춰 참여', icon: 'ri-calendar-check-line' },
    { title: '개인 위생', time: '주 2회 목욕 지원', icon: 'ri-water-flash-line' },
  ];

  return (
    <section id="rules" className="bg-gradient-to-br from-gray-50 to-[#F9F8F6] py-20">
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">생활 규칙</h2>
        </motion.div>

        {/* 규칙 리스트 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lifeRules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              /* 회색 테두리 적용 */
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* 포인트 아이콘 박스 */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#5C8D5A]/10 transition-colors duration-300 group-hover:bg-[#5C8D5A]">
                  <i
                    className={`${rule.icon} text-xl text-[#5C8D5A] transition-colors duration-300 group-hover:text-white`}
                  />
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{rule.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{rule.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
