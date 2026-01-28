'use client';

import { motion } from 'framer-motion';

export default function IndividualCareSection() {
  const careServices = [
    {
      title: '일상생활 지원',
      icon: 'ri-hand-heart-line',
      services: [
        '식사 보조 및 영양 관리',
        '세면·목욕 등 위생 관리',
        '옷 갈아입기 지원',
        '이동 및 보행 보조',
        '화장실 이용 지원',
        '침상 정리 및 환경 관리',
      ],
      description: '어르신의 일상생활을 세심하게 돕습니다',
    },
    {
      title: '건강 관리',
      icon: 'ri-heart-pulse-line',
      services: [
        '혈압·체온·혈당 등 건강 체크',
        '복약 관리 및 투약 지도',
        '상처·욕창 관리',
        '정기 건강검진 지원',
        '응급 상황 대응',
      ],
      description: '24시간 건강 상태를 모니터링합니다',
    },
    {
      title: '인지 케어',
      icon: 'ri-brain-line',
      services: ['기억력 향상 프로그램', '인지 자극 활동', '회상 치료', '현실 지남력 훈련', '개별 맞춤 인지 활동'],
      description: '인지 기능 유지와 향상을 돕습니다',
    },
    {
      title: '정서 지원',
      icon: 'ri-emotion-happy-line',
      services: ['정서적 교감 및 대화', '우울감 예방 활동', '취미 활동 지원', '가족 소통 지원'],
      description: '정서적 안정과 심리적 행복을 돕습니다',
    },
    {
      title: '재활 지원',
      icon: 'ri-wheelchair-line',
      services: ['물리·운동 치료', '관절 운동 및 스트레칭', '보행 훈련', '근력 강화 운동'],
      description: '신체 기능 유지와 회복을 지원합니다',
    },
    {
      title: '영양 관리',
      icon: 'ri-restaurant-line',
      services: ['개인별 맞춤 식단 제공', '영양 상태 평가', '식이요법 관리', '연하곤란 맞춤 식단'],
      description: '건강한 식생활을 제공합니다',
    },
  ];

  const careLevels = [
    {
      level: '1등급',
      condition: '전면적 도움 필요',
      color: 'from-red-500 to-red-600',
      services: ['24시간 전담 케어', '전면 일상지원', '전문 간호 서비스'],
    },
    {
      level: '2등급',
      condition: '상당한 도움 필요',
      color: 'from-orange-500 to-orange-600',
      services: ['개별 케어 플랜', '건강 체크', '맞춤 재활 프로그램'],
    },
    {
      level: '3등급',
      condition: '부분적 도움 필요',
      color: 'from-amber-500 to-amber-600',
      services: ['부분 일상 지원', '건강 모니터링', '사회활동 지원'],
    },
    {
      level: '4–5등급',
      condition: '경증 도움 필요',
      color: 'from-teal-500 to-teal-600',
      services: ['예방 중심 건강 관리', '생활 자립 지원', '여가 프로그램'],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            개별 케어 서비스
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">어르신 상태에 맞춘 맞춤 케어</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            일상생활부터 건강, 인지, 정서, 재활, 영양까지 전 영역을 체계적으로 지원합니다.
          </p>
        </motion.div>

        {/* Care Services */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {careServices.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#F9F8F6] p-8 shadow-md"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600">
                  <i className={`${s.icon} text-3xl text-white`} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                  <p className="text-gray-600">{s.description}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {s.services.map(item => (
                  <li key={item} className="flex items-start gap-2 text-gray-700">
                    <i className="ri-check-line mt-1 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Care Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 mt-24 text-center"
        >
          <span className="inline-block rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            장기요양 등급별 케어
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">등급에 맞춘 체계적 케어 지원</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {careLevels.map(lv => (
            <div
              key={lv.level}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`bg-gradient-to-br p-6 text-center text-white ${lv.color}`}>
                <h3 className="mb-1 text-2xl font-bold">{lv.level}</h3>
                <p className="text-sm text-white/90">{lv.condition}</p>
              </div>

              <ul className="space-y-2 p-6">
                {lv.services.map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                    <i className="ri-check-line mt-1 text-teal-600" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
