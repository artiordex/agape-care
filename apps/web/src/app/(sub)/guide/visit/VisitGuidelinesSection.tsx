'use client';

import { motion } from 'framer-motion';

export default function VisitGuidelinesSection() {
  const visitGuidelines = [
    {
      title: '면회 전 준비사항',
      items: [
        '방문 전 시설에 연락하여 어르신 상태 확인',
        '감기 등 전염성 질환이 있는 경우 면회 자제',
        '방문자 명부 작성 (성명, 연락처)',
        '손 소독 및 마스크 착용',
      ],
      icon: 'ri-checkbox-circle-line',
    },
    {
      title: '면회 시 주의사항',
      items: [
        '큰 소리로 대화하지 않기',
        '다른 어르신들께 방해되지 않도록 주의',
        '음식물 반입 시 사전 확인 필수',
        '어르신의 컨디션을 고려한 면회 시간 조절',
      ],
      icon: 'ri-alert-line',
    },
    {
      title: '외출 및 외박',
      items: ['외출/외박 최소 1일 전 신청', '보호자 동의서 작성', '귀가 시간 및 연락처 남기기', '복용 중인 약 지참'],
      icon: 'ri-door-open-line',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">면회 가이드라인</h2>
          <p className="text-lg text-gray-600">편안하고 안전한 면회를 위한 안내사항입니다</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {visitGuidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-amber-50">
                <i className={`${guideline.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-4 text-xl font-bold text-gray-900">{guideline.title}</h3>

              <ul className="space-y-3">
                {guideline.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill mt-1 text-[#5C8D5A]" />
                    <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
