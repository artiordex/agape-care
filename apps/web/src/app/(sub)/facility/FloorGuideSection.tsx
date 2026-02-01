/**
 * Description : FloorGuideSection.tsx - 📌 층별 구조 안내 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import facilityData from '@/data/facility.json';
import { motion } from 'framer-motion';

export default function FloorGuideSection() {
  // JSON 데이터에서 floors 배열 추출
  const { floors } = facilityData;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 UI */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">층별 구조</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* JSON 데이터를 기반으로 층별 정보 렌더링 */}
          {floors.map((item, index) => (
            <motion.div
              key={item.floor}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-100 bg-[#F9F8F6] p-8 transition-all hover:shadow-lg"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className={`${item.icon} text-2xl text-[#5C8D5A]`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{item.floor}</h3>
              </div>
              <ul className="space-y-3">
                {item.areas.map((area: string) => (
                  <li key={area} className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="ri-check-line text-[#5C8D5A]" />
                    {area}
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
