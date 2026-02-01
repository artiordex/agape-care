/**
 * Description : AdmissionTargetSection.tsx - 📌 입소 대상 안내 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function AdmissionTargetSection() {
  return (
    <section id="target" className="bg-white py-20">
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 UI */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">입소 대상 안내</h2>
        </motion.div>

        {/* 입소 대상 상세 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm md:p-12"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* 왼쪽: 주요 대상 설명 */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-bold text-[#5C8D5A]">
                <i className="ri-user-heart-line" />
                <span>주요 입소 대상</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                어르신의 평안한 노후를 위해 <br />
                <span className="text-[#5C8D5A]">최적화된 케어</span>를 제공합니다.
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                장기요양 등급을 받으신 어르신 중 <br className="hidden md:block" />
                시설 입소가 필요하신 분들을 정성껏 모십니다.
              </p>
            </div>

            {/* 오른쪽: 상세 요건 리스트 */}
            <div className="rounded-xl bg-[#F9F8F6] p-8">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <i className="ri-check-line text-xl text-[#5C8D5A]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">연령 및 등급 기준</h4>
                    <p className="mt-1 text-gray-600">65세 이상의 노인 또는 65세 미만으로서 노인성 질병을 가진 분</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <i className="ri-check-line text-xl text-[#5C8D5A]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">상세 등급 안내</h4>
                    <p className="mt-1 text-gray-600">
                      장기요양등급 1·2·3등급, 4·5(치매특별)등급 대상자 중{' '}
                      <span className="font-bold text-gray-900">시설급여</span> 판정을 받으신 분
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 하단 안내 문구 */}
          <div className="mt-12 border-t border-gray-100 pt-8 text-center">
            <p className="text-sm text-gray-500">
              <i className="ri-information-line mr-1 text-amber-500" />등급이 없으신 경우, 국민건강보험공단을 통한 등급 신청 절차부터 친절히 안내해 드립니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
