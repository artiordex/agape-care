/**
 * Description : FacilityStatusSection.tsx - ?? FacilityStatusSection UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import facilityData from '@/data/facility.json';
import { motion } from 'framer-motion';

export default function FacilityStatusSection() {
  const { generalInfo, roomStatus, facilityStatus } = facilityData;

  // 하단 InfoBox에 표시할 주요 데이터 추출
  const summaryFields = new Set(['대지면적', '건물면적', '건물구조', '개원일']);
  const summaryData = generalInfo.filter(info => summaryFields.has(info.category));

  return (
    <section className="bg-gray-50/50 py-20 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-4">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">시설현황</h2>
        </motion.div>

        {/* 시설현황 테이블 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] table-fixed border-collapse text-center">
              <thead>
                <tr className="bg-[#F8F9FA]">
                  <th scope="col" rowSpan={2} className="w-24 border border-gray-200 text-sm font-bold text-gray-700">
                    구분
                  </th>
                  <th
                    scope="colgroup"
                    colSpan={4}
                    className="border border-gray-200 py-3 text-sm font-bold text-gray-700"
                  >
                    침실
                  </th>
                  <th scope="col" rowSpan={2} className="border border-gray-200 text-sm font-bold text-gray-700">
                    특양실
                  </th>
                  <th scope="col" rowSpan={2} className="border border-gray-200 text-sm font-bold text-gray-700">
                    사무실
                  </th>
                  <th scope="col" rowSpan={2} className="border border-gray-200 text-sm font-bold text-gray-700">
                    요양보호사실
                  </th>
                  <th scope="col" rowSpan={2} className="border border-gray-200 text-sm font-bold text-gray-700">
                    자원봉사자실
                  </th>
                </tr>
                <tr className="bg-[#F8F9FA]">
                  <th scope="col" className="border border-gray-200 py-3 text-xs font-bold text-gray-500">
                    1인실
                  </th>
                  <th scope="col" className="border border-gray-200 py-3 text-xs font-bold text-gray-500">
                    2인실
                  </th>
                  <th scope="col" className="border border-gray-200 py-3 text-xs font-bold text-gray-500">
                    3인실
                  </th>
                  <th scope="col" className="border border-gray-200 py-3 text-xs font-bold text-gray-500">
                    4인실
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="border border-gray-200 bg-[#F8F9FA] py-5 text-sm font-bold text-gray-700">
                    실수
                  </th>
                  {/* [에러 해결] JSON의 한글 키값과 일치하도록 수정 */}
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus.bedrooms['1인실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus.bedrooms['2인실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus.bedrooms['3인실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus.bedrooms['4인실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus['특양실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus['사무실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus['요양보호사실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {roomStatus['자원봉사자실']}
                  </td>
                </tr>

                <tr className="h-1 bg-[#5C8D5A]">
                  <td colSpan={9}></td>
                </tr>

                <tr className="bg-[#F8F9FA]">
                  <th scope="col" className="border border-gray-200 py-4 text-sm font-bold text-gray-700">
                    구분
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    의료재활실
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    물리치료실
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    프로그램실
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    식당 및 조리실
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    재난대비시설
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    화장실
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    목욕실
                  </th>
                  <th scope="col" className="border border-gray-200 text-sm font-bold text-gray-700">
                    세탁장 및 건조장
                  </th>
                </tr>
                <tr>
                  <th scope="row" className="border border-gray-200 bg-[#F8F9FA] py-5 text-sm font-bold text-gray-700">
                    실수
                  </th>
                  {/* [에러 해결] facilityStatus의 한글 키값과 일치하도록 수정 */}
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['의료재활실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['물리치료실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['프로그램실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['식당 및 조리실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['재난대비시설']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['화장실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['목욕실']}
                  </td>
                  <td className="border border-gray-200 text-base font-semibold text-gray-800">
                    {facilityStatus['세탁장 및 건조장']}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 하단 InfoBox */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryData.map(item => (
            <InfoBox key={item.category} label={item.category} value={item.content} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoBox({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <span className="text-sm font-bold text-[#5C8D5A]">{label}</span>
      <span className="text-base font-medium text-gray-800">{value}</span>
    </div>
  );
}
