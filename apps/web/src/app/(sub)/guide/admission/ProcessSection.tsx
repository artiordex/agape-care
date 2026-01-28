'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ProcessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const processSteps = [
    {
      step: '01',
      title: '상담 신청',
      description: '전화 또는 방문 상담을 통해 입소 가능 여부를 확인합니다',
      icon: 'ri-phone-line',
      color: 'from-teal-500 to-teal-600',
    },
    {
      step: '02',
      title: '서류 준비',
      description: '입소에 필요한 서류를 준비하고 제출합니다',
      icon: 'ri-file-list-3-line',
      color: 'from-amber-500 to-amber-600',
    },
    {
      step: '03',
      title: '계약 체결',
      description: '입소 계약서 작성 및 비용 안내를 받습니다',
      icon: 'ri-file-text-line',
      color: 'from-green-500 to-green-600',
    },
    {
      step: '04',
      title: '입소 완료',
      description: '입소일에 맞춰 시설에 입소하여 생활을 시작합니다',
      icon: 'ri-home-heart-line',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <section id="process" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">입소 절차</h2>
          <p className="text-lg text-gray-600">4단계로 간편하게 입소하실 수 있습니다</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-xl">
                <div
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.color} mx-auto mb-6 flex items-center justify-center`}
                >
                  <i className={`${step.icon} text-3xl text-white`}></i>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-sm font-bold text-gray-400">STEP {step.step}</div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>

              {index < processSteps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                  <i className="ri-arrow-right-line text-3xl text-gray-300"></i>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
