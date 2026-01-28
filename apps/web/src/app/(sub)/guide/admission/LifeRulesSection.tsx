'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function LifeRulesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const lifeRules = [
    { title: '기상 및 취침', time: '오전 7시 기상 / 오후 9시 취침', icon: 'ri-time-line' },
    { title: '식사 시간', time: '아침 8시 / 점심 12시 / 저녁 6시', icon: 'ri-restaurant-line' },
    { title: '면회 시간', time: '평일 오전 10시 ~ 오후 6시', icon: 'ri-parent-line' },
    { title: '외출 및 외박', time: '보호자 동의 후 가능', icon: 'ri-door-open-line' },
    { title: '프로그램 참여', time: '개인 상태에 맞춰 참여', icon: 'ri-calendar-check-line' },
    { title: '개인 위생', time: '주 2회 목욕 지원', icon: 'ri-water-flash-line' },
  ];

  return (
    <section id="rules" className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">생활 규칙</h2>
          <p className="text-lg text-gray-600">규칙적인 생활로 건강한 일상을 만들어갑니다</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lifeRules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-amber-50">
                  <i className={`${rule.icon} text-xl text-[#5C8D5A]`} />
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{rule.title}</h3>
                  <p className="text-sm text-gray-600">{rule.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
