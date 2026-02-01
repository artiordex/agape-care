/**
 * Description : SafetyFeatureSection.tsx - 📌 안전시설 안내 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import facilityData from '@/data/facility.json';
import { motion } from 'framer-motion';

export default function SafetyFeatureSection() {
  // JSON 데이터에서 안전 시설 및 CCTV 정보 추출
  const { safetyFeatures, cctvInfo } = facilityData;

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 UI 적용 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">안전 시설 및 시스템</h2>
        </motion.div>

        {/* 안전 시설 카드 그리드 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {safetyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className={`${feature.icon} text-3xl text-[#5C8D5A]`} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 하단 CCTV 운영 안내 정보 박스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-information-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">CCTV 운영 안내</h3>
              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                저희 요양센터는 어르신의 안전을 위해 공용 공간에 CCTV를 설치하여 운영하고 있습니다. CCTV 촬영 구역 및
                개인정보 보호에 관한 자세한 내용은 시설 내 안내문을 참고해 주시기 바랍니다.
              </p>
              <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">· 설치 위치:</strong> {cctvInfo.location}
                </p>
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">· 촬영 시간:</strong> {cctvInfo.time}
                </p>
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">· 보관 기간:</strong> {cctvInfo.retention}
                </p>
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">· 관리 책임자:</strong> {cctvInfo.manager}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
