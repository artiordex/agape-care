'use client';

import { motion } from 'framer-motion';

export default function CostInfoSection() {
  const costInfo = [
    {
      grade: '1등급',
      monthlyCost: '약 60만원',
      selfPay: '본인부담금 20%',
      description: '최중증 상태, 공단 급여 80% 지원',
    },
    {
      grade: '2등급',
      monthlyCost: '약 55만원',
      selfPay: '본인부담금 20%',
      description: '중증 상태, 공단 급여 80% 지원',
    },
    {
      grade: '3등급',
      monthlyCost: '약 50만원',
      selfPay: '본인부담금 20%',
      description: '중등도 상태, 공단 급여 80% 지원',
    },
    {
      grade: '4등급',
      monthlyCost: '약 45만원',
      selfPay: '본인부담금 20%',
      description: '경증 상태, 공단 급여 80% 지원',
    },
    {
      grade: '5등급',
      monthlyCost: '약 40만원',
      selfPay: '본인부담금 20%',
      description: '경미한 상태, 공단 급여 80% 지원',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            비용 안내
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">등급별 입소 비용</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">2025년 기준 월 비용 예시입니다</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {costInfo.map((cost, index) => (
            <motion.div
              key={cost.grade}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl bg-[#F9F8F6] p-6 text-center hover:shadow-xl"
            >
              <div className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-lg font-bold text-[#5C8D5A]">
                {cost.grade}
              </div>

              <div className="mb-2 text-3xl font-bold text-gray-800">{cost.monthlyCost}</div>
              <div className="mb-4 text-sm text-gray-600">{cost.selfPay}</div>
              <p className="text-sm leading-relaxed text-gray-500">{cost.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
