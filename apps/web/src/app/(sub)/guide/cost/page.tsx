'use client';

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

import { motion } from 'framer-motion';

export default function CostPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.15 });

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
    { type: '국가유공자', discount: '본인부담금 감면', icon: 'ri-medal-line', color: 'bg-amber-50 text-amber-600' },
    { type: '다자녀 가구', discount: '본인부담금 감면', icon: 'ri-parent-line', color: 'bg-purple-50 text-purple-600' },
  ];

  const additionalCosts = [
    { item: '이미용비', cost: '10,000원', period: '월 1회' },
    { item: '간식비', cost: '30,000원', period: '월' },
    { item: '기저귀', cost: '50,000원', period: '월' },
    { item: '개인 의약품', cost: '실비', period: '필요시' },
    { item: '외출 동행', cost: '협의', period: '필요시' },
  ];

  return (
    <section className="min-h-screen bg-white pb-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 pb-20 pt-32">
        <div className="absolute inset-0 bg-[url('/images/hero-cost.jpg')] bg-cover bg-center opacity-10"/>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <i className="ri-money-dollar-circle-line text-xl text-[#5C8D5A]"/>
              <span className="text-sm font-semibold text-gray-700">비용안내</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">입소 비용 안내</h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              장기요양등급에 따른 투명한 이용 비용 안내와
              <br />
              감면 혜택·추가 비용까지 자세히 제공해드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 등급별 비용 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">장기요양등급별 비용 안내</h2>
            <p className="text-lg text-gray-600">2024년 기준 월 이용료 (본인부담금 15%)</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {costByGrade.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
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

      {/* 감면 혜택 */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">감면 혜택 안내</h2>
            <p className="text-lg text-gray-600">대상자에 따라 본인부담금 감면 혜택이 제공됩니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {discountInfo.map((d, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${d.color}`}>
                  <i className={`${d.icon} text-3xl`}/>
                </div>

                <h3 className="mb-2 text-lg font-bold text-gray-900">{d.type}</h3>
                <p className="text-sm text-gray-600">{d.discount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">비용 상담이 필요하신가요?</h2>
            <p className="mb-8 text-lg text-white/90">개인별 맞춤 비용 안내를 받아보세요</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="cursor-pointer whitespace-nowrap rounded-xl bg-white px-8 py-4 font-bold text-[#5C8D5A] shadow-lg hover:bg-gray-100"
              >
                <i className="ri-customer-service-2-line mr-2"/>
                비용 상담하기
              </Link>

              <Link
                href="/guide/admission"
                className="cursor-pointer whitespace-nowrap rounded-xl border-2 border-white bg-transparent px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#5C8D5A]"
              >
                <i className="ri-file-list-3-line mr-2"/>
                입소안내 보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
