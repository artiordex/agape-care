/**
 * Description : DiscountSection.tsx - ?? DiscountSection UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function DiscountSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  /**
   * 장기요양보험법에 따른 법정 본인부담금 감경 대상자 중심 구성
   */
  const discountInfo = [
    {
      type: '기초생활수급자',
      discount: '본인부담금 면제 (0%)',
      description: '급여 비용 전액 국가 지원',
      icon: 'ri-shield-check-line',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      type: '의료급여 수급자',
      discount: '본인부담금 60% 감면',
      description: '본인부담율 8% 적용 대상',
      icon: 'ri-hospital-line',
      color: 'bg-green-50 text-green-600',
    },
    {
      type: '기타 감경 대상자',
      discount: '본인부담금 40% 감면',
      description: '본인부담율 12% 적용 대상',
      icon: 'ri-user-heart-line',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      type: '천재지변 등 사유',
      discount: '보험료 순위별 차등 감면',
      description: '소득 수준에 따른 감경 혜택',
      icon: 'ri-hand-coin-line',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto w-[90%] px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">감면 혜택 안내</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {discountInfo.map((d, index) => (
            <motion.div
              key={d.type}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${d.color}`}
              >
                <i className={`${d.icon} text-3xl`} />
              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">{d.type}</h3>
              <p className="mb-1 text-sm font-bold text-[#5C8D5A]">{d.discount}</p>
              <p className="text-xs leading-relaxed text-gray-500">{d.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
