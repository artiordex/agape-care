/**
 * Description : VisitRulesSection.tsx - 📌 면회 규정 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function VisitRulesSection() {
  const visitRules = [
    {
      title: '면회 시간',
      content: '평일 오전 10시 ~ 오후 6시',
      subContent: '주말 및 공휴일 사전 예약 필수',
      icon: 'ri-time-line',
    },
    {
      title: '면회 인원',
      content: '1회 최대 3명까지',
      subContent: '어르신 건강 상태에 따라 조정 가능',
      icon: 'ri-group-line',
    },
    {
      title: '면회 장소',
      content: '1층 면회실 또는 개인실',
      subContent: '날씨가 좋은 날은 정원 이용 가능',
      icon: 'ri-map-pin-line',
    },
    {
      title: '면회 예약',
      content: '주말 방문은 사전 예약 필수',
      subContent: '평일은 당일 방문 가능',
      icon: 'ri-calendar-check-line',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">면회 규정</h2>
        </motion.div>

        {/* 규정 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {visitRules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border-2 border-[#5C8D5A]/20 bg-white p-6 shadow-md transition-all hover:border-[#5C8D5A] hover:shadow-xl"
            >
              {/* 배경 그라데이션 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5C8D5A]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              {/* 아이콘 */}
              <div className="relative mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C8D5A] shadow-lg transition-transform group-hover:scale-110">
                  <i className={`${rule.icon} text-3xl text-white`} />
                </div>
              </div>

              {/* 내용 */}
              <div className="relative text-center">
                <h3 className="mb-3 text-lg font-bold text-gray-900">{rule.title}</h3>
                <p className="mb-2 text-base font-semibold text-[#5C8D5A]">{rule.content}</p>
                <p className="text-sm text-gray-500">{rule.subContent}</p>
              </div>

              {/* 하단 장식 라인 */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#5C8D5A] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* 안내 박스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 rounded-2xl border-2 border-[#5C8D5A]/20 bg-gradient-to-br from-[#5C8D5A]/5 to-white p-8 shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]">
              <i className="ri-information-line text-2xl text-white" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">면회 시간 안내</h4>
              <div className="space-y-2 text-gray-700">
                <p className="leading-relaxed">• 어르신의 건강과 휴식을 위해 면회 시간을 준수해주시기 바랍니다.</p>
                <p className="leading-relaxed">
                  • 주말 및 공휴일 면회는 반드시 <span className="font-semibold text-[#5C8D5A]">사전 예약</span>이
                  필요합니다.
                </p>
                <p className="leading-relaxed">
                  • 어르신의 식사 시간(오전 8시~9시, 오후 12시~1시, 오후 6시~7시)에는 면회를 자제해주세요.
                </p>
                <p className="leading-relaxed">• 특별한 사정이 있으신 경우 시설에 연락하여 상담하시기 바랍니다.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
