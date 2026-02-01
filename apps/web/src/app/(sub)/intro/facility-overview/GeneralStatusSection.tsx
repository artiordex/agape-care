/**
 * Description : GeneralStatusSection.tsx - 📌 일반현황 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';
import facilityData from '@/data/facility.json'; //

export default function GeneralStatusSection() {
  // JSON에서 일반현황 리스트 추출
  const { generalInfo } = facilityData;

  // 우측 카드를 위한 특정 데이터 찾기 (정원, 시설 유형 등)
  const capacity = generalInfo.find(item => item.category === '정원')?.content ?? '29명';
  const facilityType = generalInfo.find(item => item.category === '시설 유형')?.content ?? '소규모 정원형';

  return (
    <section className="border-t border-gray-100 bg-gray-50/50 py-20 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-4">
        {/* 섹션 타이틀: 아가페 그린 바 스타일 유지 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">일반현황</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* 좌측: 일반현황 테이블 (2개 컬럼 차지) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2"
          >
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 text-sm font-bold text-gray-900">구분</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-900">내용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {generalInfo.map(item => (
                  <tr key={item.category} className="group transition-colors hover:bg-[#5C8D5A]/5">
                    <td className="w-1/3 bg-gray-50/30 px-6 py-4 text-sm font-semibold text-[#5C8D5A]">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 group-hover:text-gray-900">{item.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* 우측: 시설 특징 요약 카드 (JSON 데이터 기반 동적 텍스트 반영) */}
          <div className="flex flex-col gap-4">
            <FeatureCard
              icon="ri-home-heart-line"
              title={facilityType}
              desc="가족 같은 따뜻한 분위기에서 어르신을 모십니다."
            />
            <FeatureCard
              icon="ri-user-heart-line"
              title={`정원 ${capacity}`}
              desc="한 분 한 분께 집중하는 맞춤형 개별 케어를 제공합니다."
            />
            <FeatureCard
              icon="ri-team-line"
              title="전문 인력 상주"
              desc="체계적인 시스템으로 안전하고 신뢰할 수 있는 환경을 만듭니다."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 요약 카드 컴포넌트 */
function FeatureCard({ icon, title, desc }: Readonly<{ icon: string; title: string; desc: string }>) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl border border-[#5C8D5A]/10 bg-white p-6 shadow-sm transition-all hover:border-[#5C8D5A]/30 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#5C8D5A]/10">
        <i className={`${icon} text-2xl text-[#5C8D5A]`}></i>
      </div>
      <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
    </motion.div>
  );
}
