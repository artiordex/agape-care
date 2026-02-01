/**
 * Description : EmployeeStatusSection.tsx - 📌 JSON 데이터 연동 및 자동 인원 합산 구현
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import employeeData from '@/data/employee.json'; //
import { motion } from 'framer-motion';

interface StaffRole {
  name: string;
  current: number;
  isSpecial?: boolean;
}

interface StaffGroup {
  title: string;
  roles: StaffRole[];
}

export default function EmployeeStatusSection() {
  /* JSON 데이터를 기반으로 각 직책별 인원수를 필터링하여 계산 */
  const staffGroups: Record<string, StaffGroup> = {
    management: {
      title: '기관운영지원팀',
      roles: [
        {
          name: '원장',
          current: employeeData.managementTeam.filter(m => m.position === '시설장').length, //
          isSpecial: true,
        },
        {
          name: '사무국장',
          current: employeeData.managementTeam.filter(m => m.position === '사무국장').length, //
          isSpecial: true,
        },
        {
          name: '사회복지사(과장)',
          current: employeeData.supportTeam.filter(s => s.position === '사회복지사').length, //
        },
        { name: '사무원(팀장)', current: 0 },
        { name: '시설관리(팀장)', current: 0 },
        { name: '위생원', current: 0 },
      ],
    },
    welfare: {
      title: '복지케어팀',
      roles: [
        { name: '사회복지사(부장)', current: 0 },
        { name: '사회복지사(선임)', current: 0 },
        { name: '사회복지사', current: 0 },
        { name: '요양보호사(팀장)', current: 0 },
        { name: '요양보호사(주임)', current: 0 },
        {
          name: '요양보호사',
          current: employeeData.careTeam.filter(c => c.position === '요양보호사').length, //
        },
      ],
    },
    nursing: {
      title: '간호재활팀',
      roles: [
        {
          name: '간호부장',
          current: employeeData.medicalTeam.filter(m => m.position.includes('간호')).length,
        },
        { name: '간호과장', current: 0 },
        { name: '간호조무사', current: 0 },
        {
          name: '작업치료사',
          current: employeeData.medicalTeam.filter(m => m.position === '물리치료사').length,
        },
      ],
    },
    nutrition: {
      title: '영양팀(급식위탁업체)',
      roles: [
        {
          name: '영양사',
          current: employeeData.medicalTeam.filter(m => m.position === '영양사').length,
        },
        { name: '조리사', current: 0 },
        { name: '조리원', current: 0 },
      ],
    },
  };

  // 총 인원 계산
  const totalCurrent = Object.values(staffGroups).reduce((total, group) => {
    const groupSum = group.roles.reduce((subTotal, role) => subTotal + role.current, 0);
    return total + groupSum;
  }, 0);

  return (
    <section className="bg-white py-20 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-6">
        {/* 섹션 타이틀 */}
        <div className="mb-12 flex items-center gap-3">
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">직원 현황</h2>
        </div>

        {/* 팀별 독립 테이블 리스트 */}
        <div className="space-y-1">
          {Object.entries(staffGroups).map(([key, group]) => {
            const specials = group.roles.filter(r => r.isSpecial);
            const regulars = group.roles.filter(r => !r.isSpecial);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden border-x border-t border-gray-200 first:rounded-t-lg last:rounded-b-lg last:border-b"
              >
                <table className="w-full table-fixed border-collapse">
                  <tbody>
                    {/* 행 1 & 2: 직책 헤더 영역 */}
                    <tr>
                      <td
                        rowSpan={2}
                        className="w-24 border-r border-gray-200 bg-[#F8F9FA] text-center text-sm font-bold text-gray-700"
                      >
                        직책
                        <br />
                        (직위)
                      </td>
                      {specials.map(s => (
                        <td
                          key={s.name}
                          rowSpan={2}
                          className="border-r border-gray-200 bg-[#5C8D5A] text-center text-base font-bold text-white"
                        >
                          {s.name}
                        </td>
                      ))}
                      <td
                        colSpan={regulars.length}
                        className="bg-[#5C8D5A] py-3 text-center text-base font-bold text-white"
                      >
                        {group.title}
                      </td>
                    </tr>
                    {/* 하위 상세 직책명 */}
                    <tr>
                      {regulars.map((role, idx) => (
                        <td
                          key={role.name}
                          className={`border-r border-t border-gray-200 bg-[#E6F0E5] py-3 text-center text-sm font-bold text-[#5C8D5A] ${idx === regulars.length - 1 ? 'border-r-0' : ''}`}
                        >
                          {role.name}
                        </td>
                      ))}
                    </tr>
                    {/* 행 3: 인원수 데이터 영역 */}
                    <tr className="border-t border-gray-200">
                      <td className="bg-[#F8F9FA] py-4 text-center text-sm font-bold text-gray-700">인원</td>
                      {group.roles.map((role, idx) => (
                        <td
                          key={role.name}
                          className={`border-r border-gray-200 py-4 text-center text-base font-semibold text-gray-800 ${idx === group.roles.length - 1 ? 'border-r-0' : ''}`}
                        >
                          {role.current}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            );
          })}

          {/* 총합계 섹션 */}
          <div className="flex overflow-hidden rounded-b-lg border border-gray-200 bg-[#F8F9FA]">
            <div className="w-24 flex-shrink-0 border-r border-gray-200 py-6 text-center text-sm font-bold text-gray-800">
              총인원
            </div>
            <div className="flex-grow py-6 text-center text-lg font-bold text-[#5C8D5A]">
              {totalCurrent}명 <span className="ml-2 text-sm font-normal text-gray-400">(급식위탁업체 포함)</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-right text-sm italic text-gray-400">
          * 위 현황은 실제 근무 인원 기준으로 작성되었습니다.
        </p>
      </div>
    </section>
  );
}
