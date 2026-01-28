'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CostByGradeSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const costByGrade = [
    {
      grade: '1등급',
      monthlyFee: '1,850,000원',
      personalCost: '277,500원',
      mealCost: '180,000원',
      totalCost: '457,500원',
      description: '최중증 어르신',
      color: 'from-red-500 to-red-600',
    },
    {
      grade: '2등급',
      monthlyFee: '1,650,000원',
      personalCost: '247,500원',
      mealCost: '180,000원',
      totalCost: '427,500원',
      description: '중증 어르신',
      color: 'from-orange-500 to-orange-600',
    },
    {
      grade: '3등급',
      monthlyFee: '1,450,000원',
      personalCost: '217,500원',
      mealCost: '180,000원',
      totalCost: '397,500원',
      description: '중등도 어르신',
      color: 'from-amber-500 to-amber-600',
    },
    {
      grade: '4등급',
      monthlyFee: '1,250,000원',
      personalCost: '187,500원',
      mealCost: '180,000원',
      totalCost: '367,500원',
      description: '경증 어르신',
      color: 'from-green-500 to-green-600',
    },
    {
      grade: '5등급',
      monthlyFee: '1,050,000원',
      personalCost: '157,500원',
      mealCost: '180,000원',
      totalCost: '337,500원',
      description: '경증 어르신',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">장기요양등급별 비용 안내</h2>
          <p className="text-lg text-gray-600">2024년 기준 월 이용료 (본인부담금 15%)</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {costByGrade.map((item, index) => (
            <motion.div
              key={item.grade}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl"
            >
              <div className={`bg-gradient-to-br ${item.color} px-6 py-8 text-white`}>
                <h3 className="mb-2 text-center text-3xl font-bold">{item.grade}</h3>
                <p className="text-center text-sm opacity-90">{item.description}</p>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex justify-between border-b pb-3">
                  <span className="text-sm text-gray-600">월 급여비</span>
                  <span className="font-semibold text-gray-900">{item.monthlyFee}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-sm text-gray-600">본인부담금 (15%)</span>
                  <span className="font-semibold text-[#5C8D5A]">{item.personalCost}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-sm text-gray-600">식사비</span>
                  <span className="font-semibold text-gray-900">{item.mealCost}</span>
                </div>

                <div className="flex justify-between pt-2">
                  <span className="text-base font-bold text-gray-900">월 총 비용</span>
                  <span className="text-2xl font-bold text-[#5C8D5A]">{item.totalCost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
