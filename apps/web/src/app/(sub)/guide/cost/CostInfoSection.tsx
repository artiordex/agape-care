/**
 * Description : CostInfoSection.tsx - ?? CostInfoSection UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function CostInfoSection() {
  // 1일당 비용 데이터
  const dailyCostData = [
    { grade: '1등급', public: '93,070', normal: '18,610', reduce12: '11,160', reduce8: '7,440' },
    { grade: '2등급', public: '86,340', normal: '17,260', reduce12: '10,360', reduce8: '6,900' },
    { grade: '3~5등급', public: '81,540', normal: '16,300', reduce12: '9,780', reduce8: '6,520' },
  ];

  // 월 30일 기준 본인부담금 계산 데이터
  const monthlyCostData = [
    {
      type: '일반 (20%)',
      data: [
        { grade: '1등급', salary: '558,420', nonSalary: '360,000', total: '918,420' },
        { grade: '2등급', salary: '518,040', nonSalary: '360,000', total: '878,040' },
        { grade: '3~5등급', salary: '489,240', nonSalary: '360,000', total: '849,240' },
      ],
    },
    {
      type: '감경, 의료 (12%)',
      data: [
        { grade: '1등급', salary: '335,050', nonSalary: '360,000', total: '695,050' },
        { grade: '2등급', salary: '310,820', nonSalary: '360,000', total: '670,820' },
        { grade: '3~5등급', salary: '293,540', nonSalary: '360,000', total: '653,540' },
      ],
    },
    {
      type: '감경 (8%)',
      data: [
        { grade: '1등급', salary: '223,360', nonSalary: '360,000', total: '583,360' },
        { grade: '2등급', salary: '207,210', nonSalary: '360,000', total: '567,210' },
        { grade: '3~5등급', salary: '195,690', nonSalary: '360,000', total: '555,690' },
      ],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-[90%] px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">비용 안내</h2>
        </motion.div>

        {/* 1일당 비용 테이블 */}
        <div className="mb-16">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5C8D5A] text-xs text-white">
              1
            </span>1일당 이용 비용 (수가)
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[800px] border-collapse text-center text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th rowSpan={2} className="border-r border-gray-200 py-4 font-bold text-gray-700">
                    등급
                  </th>
                  <th rowSpan={2} className="border-r border-gray-200 font-bold text-gray-700">
                    공단수가
                  </th>
                  <th colSpan={3} className="py-2 font-bold text-gray-700">
                    본인부담금
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs">
                  <th className="border-r border-gray-200 py-2 text-gray-600">일반(20%)</th>
                  <th className="border-r border-gray-200 text-gray-600">감경·의료(12%)</th>
                  <th className="text-gray-600">감경(8%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dailyCostData.map(item => (
                  <tr key={item.grade} className="transition-colors hover:bg-gray-50/50">
                    <td className="border-r border-gray-200 bg-gray-50/30 py-4 font-bold text-gray-800">
                      {item.grade}
                    </td>
                    <td className="border-r border-gray-200 font-medium text-gray-700">{item.public}</td>
                    <td className="border-r border-gray-200 font-semibold text-[#5C8D5A]">{item.normal}</td>
                    <td className="border-r border-gray-200 text-gray-700">{item.reduce12}</td>
                    <td className="text-gray-700">{item.reduce8}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 본인부담금 계산 (30일 기준) */}
        <div className="mb-12">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5C8D5A] text-xs text-white">
              2
            </span>본인부담금 상세 계산 (월 30일 기준)
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[900px] border-collapse text-center text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="border-r border-gray-200 py-4 font-bold text-gray-700">구분</th>
                  <th className="border-r border-gray-200 font-bold text-gray-700">등급</th>
                  <th className="border-r border-gray-200 font-bold text-gray-700">급여 (본인부담금)</th>
                  <th className="border-r border-gray-200 font-bold text-gray-700">비급여 (식사/간식)</th>
                  <th className="font-bold text-gray-700">월 총 부담금</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {monthlyCostData.map((group, groupIdx) =>
                  group.data.map((item, itemIdx) => (
                    <tr key={`${groupIdx}-${itemIdx}`} className="transition-colors hover:bg-gray-50/50">
                      {itemIdx === 0 && (
                        <td rowSpan={3} className="border-r border-gray-200 bg-gray-50/30 font-bold text-gray-800">
                          {group.type}
                        </td>
                      )}
                      <td className="border-r border-gray-200 py-4 font-medium text-gray-700">{item.grade}</td>
                      <td className="border-r border-gray-200 text-gray-700">{item.salary}</td>
                      {itemIdx === 0 && (
                        <td rowSpan={3} className="border-r border-gray-200 text-gray-600">
                          {item.nonSalary}
                        </td>
                      )}
                      <td className="bg-green-50/20 font-bold text-[#5C8D5A]">{item.total}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 text-center"
        >
          <div className="flex flex-col items-center justify-center gap-4 text-sm md:flex-row md:gap-8 md:text-base">
            <div className="rounded-full border border-gray-200 bg-white px-8 py-3 font-bold text-gray-700 shadow-sm">
              급여 본인부담금
            </div>
            <i className="ri-add-line text-2xl text-gray-400" />
            <div className="rounded-full border border-gray-200 bg-white px-8 py-3 font-bold text-gray-700 shadow-sm">
              비급여 (식사/간식)
            </div>
            <i className="ri-equal-line text-2xl text-gray-400" />
            <div className="rounded-full bg-[#5C8D5A] px-10 py-4 font-bold text-white shadow-md">
              최종 이용자 부담금
            </div>
          </div>
        </motion.div>

        <div className="space-y-1 text-sm text-gray-500">
          <p>※ 장기요양 4등급, 5등급(치매특별등급) 어르신이 시설급여를 이용하는 경우에는 3등급 수가를 적용합니다.</p>
          <p>
            ※ 비급여 항목(식사/간식비)은 1일 12,000원(식사 3회 10,500원 + 간식 1,500원) 기준으로 30일 계산된 금액입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
