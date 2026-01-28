'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function VisitRulesSection() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });

  const visitRules = [
    {
      title: '면회 시간',
      content: '평일 오전 10시 ~ 오후 6시',
      icon: 'ri-time-line',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '주말 면회',
      content: '사전 예약 필수',
      icon: 'ri-calendar-check-line',
      color: 'from-green-500 to-green-600',
    },
    {
      title: '면회 인원',
      content: '1회 최대 3명까지',
      icon: 'ri-group-line',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: '면회 장소',
      content: '1층 면회실 또는 개인실',
      icon: 'ri-map-pin-line',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: 30 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">면회 규정</h2>
          <p className="text-lg text-gray-600">원활한 면회를 위한 기본 규정입니다</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {visitRules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-xl"
            >
              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${rule.color} mx-auto mb-6 flex items-center justify-center`}
              >
                <i className={`${rule.icon} text-3xl text-white`} />
              </div>

              <div className="text-center">
                <h3 className="mb-3 text-lg font-bold text-gray-900">{rule.title}</h3>
                <p className="text-sm text-gray-600">{rule.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
              <i className="ri-information-line text-2xl text-blue-600" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">면회 시간 안내</h4>
              <p className="leading-relaxed text-gray-600">
                어르신의 건강과 휴식을 위해 면회 시간을 준수해주시기 바랍니다. 주말 및 공휴일 면회는 반드시 사전 예약이
                필요합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
