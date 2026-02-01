/**
 * Description : LongTermCareSection.tsx - 📌 원형 배경 제거 및 굵은 화살표 디자인 적용
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function LongTermCareSection() {
  // 신청의 종류 테이블 데이터
  const applicationTypes = [
    {
      type: '인정신청',
      reason: '장기요양인정신청을 처음하는 경우',
      time: '신청자격을 가진 자가 급여를 받고자 할 때',
      documents: '인정신청서, 의사소견서',
    },
    {
      type: '갱신신청',
      reason: '유효기간 종료 후 계속해서 급여를 받고자 할 때',
      time: '유효기간 종료 90일 전부터 30일 전까지',
      documents: '갱신신청서, 의사소견서',
    },
    {
      type: '등급변경신청',
      reason: '급여 이용 중 신체·정신적 상태의 변화가 있는 경우',
      time: '변경 사유 발생 시',
      documents: '등급변경신청서, 의사소견서',
    },
    {
      type: '급여종류변경',
      reason: '재가↔시설 간 급여 종류를 변경하고자 할 때',
      time: '변경 사유 발생 시',
      documents: '종류변경신청서, 사실확인서(필요시)',
    },
  ];

  return (
    <section className="bg-white py-24 font-['Pretendard']">
      <div className="mx-auto w-[90%] px-4">
        {/* 1. 장기요양인정 및 이용 절차 */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex items-center gap-3"
          >
            <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">장기요양인정 및 이용 절차</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { title: '신청 및 방문조사', sub: '국민건강보험공단' },
              { title: '등급 판정', sub: '등급판정위원회' },
              { title: '인정서 및 계획서 송부', sub: '국민건강보험공단' },
              { title: '급여계약 및 이용', sub: '장기요양기관(시설)' },
            ].map((step, idx) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center rounded-xl border border-gray-200 bg-[#F9F8F6] p-6 text-center shadow-sm"
              >
                <span className="mb-2 text-[10px] font-bold text-[#5C8D5A]">STEP 0{idx + 1}</span>
                <h4 className="mb-1 text-sm font-bold text-gray-900">{step.title}</h4>
                <p className="text-xs text-gray-500">{step.sub}</p>

                {/* [수정] 동그라미 배경 제거 및 굵은 화살표 아이콘 적용 */}
                {idx < 3 && (
                  <div className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <i className="ri-arrow-right-wide-line text-4xl font-black text-[#5C8D5A]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. 신청 안내 및 제출 서류 */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <i className="ri-information-fill text-[#5C8D5A]" /> 신청 자격 및 방법
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-2 font-bold text-gray-800">신청 자격</p>
                <p>65세 이상의 노인 및 65세 미만으로 노인성 질병(치매, 뇌혈관성질환, 파킨슨 등)을 가진 자</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-2 font-bold text-gray-800">신청 방법</p>
                <p>전국 국민건강보험공단 지사(운영센터) 방문, 우편, 팩스 또는 인터넷 홈페이지 접수</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <i className="ri-file-list-3-fill text-[#5C8D5A]" /> 제출 서류
            </h3>
            <ul className="space-y-3">
              {[
                { t: '장기요양인정신청서', d: '공단 지사 방문 또는 홈페이지 다운로드' },
                { t: '의사소견서', d: '신청서와 함께 제출 (65세 이상은 판정 전까지 가능)' },
              ].map((doc, i) => (
                <li key={doc.t} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                  <i className="ri-checkbox-circle-fill mt-1 text-[#5C8D5A]" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{doc.t}</p>
                    <p className="mt-1 text-xs text-gray-500">{doc.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. 신청의 종류 테이블 */}
        <div>
          <h3 className="mb-8 flex items-center gap-2 text-xl font-bold text-gray-900">
            <i className="ri-list-settings-fill text-[#5C8D5A]" /> 신청의 종류 상세 안내
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-700">
                <tr>
                  <th className="border-r border-gray-200 px-6 py-4 font-bold">종류</th>
                  <th className="border-r border-gray-200 px-6 font-bold">신청 사유</th>
                  <th className="border-r border-gray-200 px-6 font-bold">신청 시기</th>
                  <th className="px-6 font-bold">제출 서류</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-600">
                {applicationTypes.map((item, idx) => (
                  <tr key={item.type} className="transition-colors hover:bg-gray-50/50">
                    <td className="border-r border-gray-200 bg-gray-50/30 px-6 py-5 text-center font-bold text-gray-800">
                      {item.type}
                    </td>
                    <td className="border-r border-gray-200 px-6 leading-relaxed">{item.reason}</td>
                    <td className="border-r border-gray-200 px-6 leading-relaxed">{item.time}</td>
                    <td className="px-6 font-medium text-[#5C8D5A]">{item.documents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
