'use client';

import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

export default function CorporationPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  const corporationInfo = [
    { label: '법인명', value: '사회복지법인 OO복지재단', icon: 'ri-building-line' },
    { label: '대표자', value: '홍길동', icon: 'ri-user-line' },
    { label: '설립일', value: '2010년 3월 15일', icon: 'ri-calendar-line' },
    { label: '사업자등록번호', value: '123-45-67890', icon: 'ri-file-text-line' },
    { label: '주소', value: '서울특별시 강남구 테헤란로 123', icon: 'ri-map-pin-line' },
    { label: '연락처', value: '02-1234-5678', icon: 'ri-phone-line' },
  ];

  const facilities = [
    {
      name: 'OO요양원',
      type: '노인요양시설',
      capacity: '29인',
      location: '서울 강남구',
      established: '2015년',
      icon: 'ri-home-heart-line',
    },
  ];

  const operationStatus = [
    {
      title: '입소 현황',
      value: '27명',
      total: '29명',
      percentage: 93,
      icon: 'ri-user-line',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '직원 현황',
      value: '15명',
      total: '정규직 12명, 비정규직 3명',
      percentage: 100,
      icon: 'ri-team-line',
      color: 'from-green-500 to-green-600',
    },
    {
      title: '프로그램 운영',
      value: '8개',
      total: '주 5일 운영',
      percentage: 100,
      icon: 'ri-calendar-check-line',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: '만족도',
      value: '4.8점',
      total: '5점 만점',
      percentage: 96,
      icon: 'ri-star-line',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  const announcements = [
    {
      title: '2024년 정기 후원금 사용 내역 공개',
      date: '2024.01.15',
      category: '재정',
      icon: 'ri-money-dollar-circle-line',
    },
    { title: '2023년 운영 실적 보고', date: '2024.01.10', category: '운영', icon: 'ri-file-chart-line' },
    { title: '시설 안전점검 결과 공지', date: '2024.01.05', category: '안전', icon: 'ri-shield-check-line' },
    { title: '직원 채용 공고', date: '2023.12.28', category: '채용', icon: 'ri-user-add-line' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 pb-20 pt-32">
        <div className="absolute inset-0 bg-[url('/images/hero-corporation.jpg')] bg-cover bg-center opacity-10" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <i className="ri-government-line text-xl text-[#5C8D5A]" />
              <span className="text-sm font-semibold text-gray-700">운영법인</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">운영법인 소개</h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              투명하고 신뢰할 수 있는 운영으로
              <br />
              어르신들의 행복한 노후를 책임집니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 법인 정보 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">법인 기본 정보</h2>
            <p className="text-lg text-gray-600">사회복지법인으로서 투명한 운영을 실천합니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {corporationInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 shadow-md hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                    <i className={`${info.icon} text-2xl text-[#5C8D5A]`} />
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">{info.label}</div>
                    <div className="font-bold text-gray-900">{info.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 운영 시설 */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">운영 시설</h2>
            <p className="text-lg text-gray-600">법인이 운영하는 요양시설입니다</p>
          </motion.div>

          <div className="mx-auto mt-10 max-w-3xl">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl"
              >
                <div className="flex gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600">
                    <i className={`${facility.icon} text-4xl text-white`} />
                  </div>

                  <div className="flex-1 text-left">
                    <h3 className="mb-4 text-2xl font-bold text-gray-900">{facility.name}</h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex gap-2">
                        <i className="ri-building-line text-[#5C8D5A]" />
                        <div>
                          <div className="text-xs text-gray-500">시설 유형</div>
                          <div className="font-semibold">{facility.type}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <i className="ri-user-line text-[#5C8D5A]" />
                        <div>
                          <div className="text-xs text-gray-500">정원</div>
                          <div className="font-semibold">{facility.capacity}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <i className="ri-map-pin-line text-[#5C8D5A]" />
                        <div>
                          <div className="text-xs text-gray-500">위치</div>
                          <div className="font-semibold">{facility.location}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <i className="ri-calendar-line text-[#5C8D5A]" />
                        <div>
                          <div className="text-xs text-gray-500">설립</div>
                          <div className="font-semibold">{facility.established}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 운영 현황 */}
      <section id="status" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">운영 현황</h2>
            <p className="text-lg text-gray-600">2024년 기준 운영 현황입니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {operationStatus.map((status, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl"
              >
                <div className={`bg-gradient-to-br ${status.color} px-6 py-8 text-white`}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">{status.title}</h3>
                    <i className={`${status.icon} text-3xl`} />
                  </div>

                  <div className="mb-2 text-4xl font-bold">{status.value}</div>
                  <div className="text-sm opacity-90">{status.total}</div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-amber-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                      <div
                        className={`h-full bg-gradient-to-r ${status.color}`}
                        style={{ width: `${status.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{status.percentage}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 공지사항 */}
      <section id="notice" className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">고지사항</h2>
            <p className="text-lg text-gray-600">법인 운영과 관련된 중요 공지사항입니다</p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {announcements.map((n, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="cursor-pointer rounded-xl bg-white p-6 shadow-md hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-amber-50">
                    <i className={`${n.icon} text-2xl text-[#5C8D5A]`} />
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-[#5C8D5A] px-3 py-1 text-xs font-bold text-white">
                        {n.category}
                      </span>
                      <span className="text-sm text-gray-500">{n.date}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 transition hover:text-[#5C8D5A]">{n.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/notice"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#5C8D5A] bg-white px-8 py-4 font-bold text-[#5C8D5A] transition hover:bg-[#5C8D5A] hover:text-white"
            >
              전체 공지사항 보기
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="mb-6 text-3xl font-bold text-white">더 자세한 정보가 필요하신가요?</h2>
            <p className="mb-8 text-lg text-white/90">언제든지 문의해주시면 친절하게 안내해드립니다</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="rounded-xl bg-white px-8 py-4 font-bold text-[#5C8D5A] shadow-lg transition hover:bg-gray-100"
              >
                <i className="ri-customer-service-2-line mr-2" />
                문의하기
              </a>

              <a
                href="/intro"
                className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition hover:bg-white hover:text-[#5C8D5A]"
              >
                <i className="ri-building-line mr-2" />
                시설안내 보기
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
