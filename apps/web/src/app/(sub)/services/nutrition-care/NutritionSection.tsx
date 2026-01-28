'use client';

import { motion } from 'framer-motion';

export default function NutritionSection() {
  const nutritionServices = [
    {
      icon: 'ri-restaurant-2-line',
      title: '1일 3식 + 간식 제공',
      description: '아침, 점심, 저녁 식사와 오전·오후 간식을 영양 균형에 맞춰 제공합니다',
      details: ['아침 07:30', '점심 12:00', '저녁 18:00', '간식 10:00 / 15:00'],
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '질환별 맞춤 식단',
      description: '당뇨, 고혈압, 신장질환 등 개인의 질환에 맞춘 특별 식단을 제공합니다',
      details: ['당뇨식 (저당식)', '저염식 (고혈압)', '저단백식 (신장질환)', '저지방식 (고지혈증)'],
    },
    {
      icon: 'ri-tooth-line',
      title: '저작 상태별 식사',
      description: '어르신의 씹고 삼키는 능력에 따라 식사 형태를 조절하여 제공합니다',
      details: ['일반식', '부드러운 식사', '다진 식사', '유동식'],
    },
    {
      icon: 'ri-user-star-line',
      title: '영양사 관리 체계',
      description: '영양사가 직접 식단을 구성하거나 위탁급식 영양사가 정기적으로 관리합니다',
      details: ['주간 식단 작성', '영양 상담', '식사 모니터링', '개인별 영양 평가'],
    },
    {
      icon: 'ri-shield-check-line',
      title: 'HACCP 식자재 사용',
      description: '위생 안전이 검증된 HACCP 인증 식자재만을 사용하여 안전한 식사를 제공합니다',
      details: ['신선한 식자재', '위생 검증 완료', '매일 식재료 점검', '냉장·냉동 관리'],
    },
    {
      icon: 'ri-calendar-line',
      title: '계절별 식단 운영',
      description: '계절에 맞는 제철 식재료를 활용하여 영양과 맛을 동시에 챙깁니다',
      details: ['봄 제철 식단', '여름 보양 식단', '가을 건강 식단', '겨울 따뜻한 식단'],
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#D4A574]/10 px-4 py-2 text-sm font-semibold text-[#8B6F47]">
            영양 서비스
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">맞춤형 영양 관리 서비스</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            어르신의 건강을 위한 안전하고 균형 잡힌 식단을 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {nutritionServices.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:border-[#D4A574]/30 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4A574]/10">
                <i className={`${item.icon} text-3xl text-[#8B6F47]`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="mb-6 text-sm text-gray-600">{item.description}</p>

              <div className="space-y-2">
                {item.details.map(d => (
                  <div key={d} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                    {d}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
