'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function DiscountSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const discountInfo = [
    {
      type: '기초생활수급자',
      discount: '본인부담금 면제',
      icon: 'ri-shield-check-line',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      type: '의료급여 수급자',
      discount: '본인부담금 50% 감면',
      icon: 'ri-hospital-line',
      color: 'bg-green-50 text-green-600',
    },
    {
      type: '국가유공자',
      discount: '본인부담금 감면',
      icon: 'ri-medal-line',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      type: '다자녀 가구',
      discount: '본인부담금 감면',
      icon: 'ri-parent-line',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">감면 혜택 안내</h2>
          <p className="text-lg text-gray-600">대상자에 따라 본인부담금 감면 혜택이 제공됩니다</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {discountInfo.map((d, index) => (
            <motion.div
              key={d.type}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${d.color}`}>
                <i className={`${d.icon} text-3xl`} />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">{d.type}</h3>
              <p className="text-sm text-gray-600">{d.discount}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
