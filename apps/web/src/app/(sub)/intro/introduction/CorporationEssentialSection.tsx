'use client';

import { motion } from 'framer-motion';

export default function CorporationEssentialSection() {
  /* 필수 데이터만 남김 */
  const corporationInfo = [
    { label: '법인명', value: '사회복지법인 OO복지재단', icon: 'ri-building-line' },
    { label: '대표자', value: '홍길동', icon: 'ri-user-line' },
    { label: '설립일', value: '2010년 3월 15일', icon: 'ri-calendar-line' },
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
      title: '입소 정원',
      value: '29명',
      icon: 'ri-user-line',
    },
    {
      title: '현재 입소자',
      value: '27명',
      icon: 'ri-user-heart-line',
    },
    {
      title: '직원 수',
      value: '15명',
      icon: 'ri-team-line',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* 법인 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900">운영 법인 기본 정보</h2>
          <p className="text-gray-600">본 요양원을 운영하는 법인의 필수 정보입니다.</p>
        </motion.div>

        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {corporationInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 shadow-md"
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

        {/* 운영 시설 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900">운영 시설</h2>
          <p className="text-gray-600">법인이 운영 중인 요양원 시설 현황입니다.</p>
        </motion.div>

        <div className="mx-auto mb-20 max-w-3xl">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <div className="flex gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600">
                  <i className={`${facility.icon} text-4xl text-white`} />
                </div>

                <div className="flex-1 text-left">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">{facility.name}</h3>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">시설 유형</div>
                      <div className="font-semibold">{facility.type}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">정원</div>
                      <div className="font-semibold">{facility.capacity}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">위치</div>
                      <div className="font-semibold">{facility.location}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">설립</div>
                      <div className="font-semibold">{facility.established}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 운영 현황 (최소 정보만) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900">운영 현황</h2>
          <p className="text-gray-600">현재 요양원의 기본 운영 현황입니다.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {operationStatus.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="rounded-xl bg-white p-8 text-center shadow-md"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
                  <i className={`${item.icon} text-3xl text-[#5C8D5A]`} />
                </div>
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
              <div className="text-2xl font-extrabold text-[#5C8D5A]">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
