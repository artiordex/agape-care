'use client';

import { motion } from 'framer-motion';

export default function ContactTypeSection() {
  const consultTypes = [
    {
      title: '입소 상담',
      desc: '입소 절차, 필요서류, 비용 등을 안내해드립니다.',
      icon: 'ri-home-heart-line',
      color: 'from-teal-500 to-teal-600',
    },
    {
      title: '방문 상담',
      desc: '시설 방문 예약 및 현장 상담이 가능합니다.',
      icon: 'ri-map-pin-line',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: '전화 상담',
      desc: '바로 상담원과 연결되어 빠르게 안내받을 수 있습니다.',
      icon: 'ri-phone-line',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">상담 종류 안내</h2>
          <p className="text-lg text-gray-600">필요하신 상담 형태를 선택해 신청하실 수 있습니다</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {consultTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg hover:shadow-xl"
            >
              <div
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${type.color}`}
              >
                <i className={`${type.icon} text-3xl text-white`} />
              </div>

              <h3 className="mb-3 text-center text-xl font-bold text-gray-900">{type.title}</h3>
              <p className="text-center text-gray-600">{type.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
