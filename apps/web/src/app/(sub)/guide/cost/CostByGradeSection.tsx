/**
 * Description : CostByGradeSection.tsx - 📌 2026년 기준 등급별 비용 안내 (너비 90%)
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CostByGradeSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  /**
   * 2026년 시설급여 기준 데이터 (본인부담 20% 기준)
   * 월 급여 본인부담금은 1일 수가 * 30일 * 20%로 계산됨
   * 비급여(식사+간식)는 1일 12,000원 * 30일 = 360,000원 고정
   */
  const costByGrade = [
    {
      grade: '1등급',
      monthlyFee: '2,792,100원', // 93,070 * 30일
      personalCost: '558,420원', // 18,610 * 30일
      mealCost: '360,000원',
      totalCost: '918,420원',
      description: '일상생활 전폭적 도움 필요',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      grade: '2등급',
      monthlyFee: '2,590,200원', // 86,340 * 30일
      personalCost: '518,040원', // 17,260 * 30일
      mealCost: '360,000원',
      totalCost: '878,040원',
      description: '일상생활 상당 부분 도움 필요',
      color: 'from-teal-500 to-teal-600',
    },
    {
      grade: '3~5등급',
      monthlyFee: '2,446,200원', // 81,540 * 30일
      personalCost: '489,240원', // 16,300 * 30일
      mealCost: '360,000원',
      totalCost: '849,240원',
      description: '일상생활 부분적/인지적 도움 필요',
      color: 'from-[#5C8D5A] to-[#476d45]',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 UI */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">등급별 비용 안내</h2>
        </motion.div>

        {/* 카드 그리드 레이아웃 (3개 카드로 구성) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {costByGrade.map((item, index) => (
            <motion.div
              key={item.grade}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl"
            >
              {/* 카드 상단 헤더 */}
              <div className={`bg-gradient-to-br ${item.color} px-6 py-8 text-center text-white`}>
                <h3 className="mb-2 text-3xl font-bold">{item.grade}</h3>
                <p className="text-sm font-medium opacity-90">{item.description}</p>
              </div>

              {/* 카드 상세 비용 목록 */}
              <div className="space-y-4 p-8">
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">월 총 급여비용</span>
                  <span className="font-semibold text-gray-900">{item.monthlyFee}</span>
                </div>

                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#5C8D5A] text-gray-500">본인부담금 (20%)</span>
                    <span className="text-[10px] italic text-gray-400">공단 지원금 제외 금액</span>
                  </div>
                  <span className="self-end font-bold text-[#5C8D5A]">{item.personalCost}</span>
                </div>

                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="text-sm font-medium text-gray-500">비급여 (식사·간식)</span>
                  <span className="font-semibold text-gray-900">{item.mealCost}</span>
                </div>

                {/* 최종 합계 */}
                <div className="mt-6 flex flex-col items-end pt-2">
                  <span className="mb-1 text-xs text-gray-400">월 예상 보호자 부담금</span>
                  <span className="text-2xl font-black text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                    {item.totalCost}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 유의사항 */}
        <div className="mt-12 text-right text-sm text-gray-400">
          <p>※ 30일 기준 계산 방식이며, 실제 입소 일수와 서비스 이용 항목에 따라 달라질 수 있습니다.</p>
          <p>※ 장기요양 4, 5등급 어르신이 시설급여를 이용할 경우 3등급 수가가 적용됩니다.</p>
        </div>
      </div>
    </section>
  );
}
