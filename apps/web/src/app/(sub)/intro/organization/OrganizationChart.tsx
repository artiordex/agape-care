/**
 * Description : OrganizationChart.tsx - 📌 조직구성도
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import employeeData from '@/data/employee.json';
import { motion } from 'framer-motion';

export default function OrganizationChart() {
  const organization = {
    director: employeeData.managementTeam.find(m => m.position === '시설장'),
    departments: [
      { name: '사무국', positions: employeeData.managementTeam.filter(m => m.position !== '시설장') },
      { name: '요양보호파트', positions: employeeData.careTeam.slice(0, 3) },
      {
        name: '간호·의료파트',
        positions: employeeData.medicalTeam.filter(m => m.position.includes('간호') || m.position.includes('물리치료')),
      },
      { name: '영양파트', positions: employeeData.medicalTeam.filter(m => m.position.includes('영양')) },
      { name: '사회복지파트', positions: employeeData.supportTeam },
    ],
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[90%] px-6">
        {/* 타이틀 영역: 좌측 정렬 (그린 바 스타일) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">조직 구성도</h2>
        </motion.div>

        {/* 조직도 트리 구조 컨테이너 */}
        <div className="relative">
          {/* 시설장 영역 */}
          <div className="mb-20 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 w-full max-w-[260px]"
            >
              <div className="rounded-xl border-2 border-[#5C8D5A] bg-white px-10 py-5 shadow-lg">
                <div className="text-center">
                  <span className="mb-2 inline-block rounded-full bg-[#5C8D5A]/10 px-3 py-1 text-xs font-bold text-[#5C8D5A]">
                    {organization.director?.position}
                  </span>
                  <p className="text-xl font-extrabold tracking-tight text-gray-900">{organization.director?.name}</p>
                </div>
              </div>
              {/* 시설장 하단 수직 연결선 */}
              <div className="absolute left-1/2 top-full h-20 w-0.5 -translate-x-1/2 bg-gray-200"></div>
            </motion.div>
          </div>

          {/* 부서 레이아웃 */}
          <div className="relative pt-10">
            {/* 수평 연결선 */}
            <div className="absolute -top-[1px] left-[9.25%] right-[9.25%] hidden h-0.5 bg-gray-200 md:block"></div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
              {organization.departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center"
                >
                  {/* 각 부서 수직 연결선 (수평선과 틈 없이 결합) */}
                  <div className="absolute -top-[41px] left-1/2 hidden h-[41px] w-0.5 -translate-x-1/2 bg-gray-200 md:block"></div>

                  {/* 부서 카드 (내부 텍스트는 깔끔하게 좌측 정렬 유지) */}
                  <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-transform hover:-translate-y-1">
                    <div className="bg-[#5C8D5A] px-4 py-3 text-left">
                      <h3 className="text-sm font-bold tracking-wide text-white">{dept.name}</h3>
                    </div>

                    <div className="space-y-4 p-5 text-left">
                      {dept.positions.map((person, idx) => (
                        <div key={`${person.name}-${person.position}`} className="group">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#5C8D5A]/60">
                            {person.position}
                          </p>
                          <p className="mt-0.5 text-[15px] font-bold text-gray-800 transition-colors group-hover:text-[#5C8D5A]">
                            {person.name}
                          </p>
                          {idx !== dept.positions.length - 1 && <div className="mt-4 h-px w-6 bg-gray-50" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
