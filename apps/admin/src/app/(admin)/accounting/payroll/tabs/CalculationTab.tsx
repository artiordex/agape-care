'use client';

import React from 'react';

interface Props {
  results: any[];
  onViewPayslip: (result: any) => void;
  onDownloadPdf: (result: any) => void;
}

/**
 * [TAB 1] 급여 계산 및 검토 탭
 * 수당/공제 항목이 포함된 고밀도 수평 스크롤 테이블
 */
export default function CalculationTab({ results, onViewPayslip, onDownloadPdf }: Props) {
  return (
    <div className="animate-in fade-in space-y-3 text-[11px] duration-500">
      {/* 1. 테이블 컨테이너 (수평 스크롤 지원) */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <div className="max-h-[600px] overflow-x-auto overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20">
              {/* 상단 그룹 헤더 */}
              <tr className="border-b border-gray-300 bg-[#eef3f8] font-bold uppercase tracking-tighter text-gray-500">
                <th colSpan={4} className="border-r border-gray-300 p-1">
                  기본 정보
                </th>
                <th colSpan={5} className="border-r border-gray-300 bg-blue-50/50 p-1 text-blue-700">
                  지급 내역 (Earnings)
                </th>
                <th colSpan={5} className="border-r border-gray-300 bg-red-50/50 p-1 text-red-700">
                  공제 내역 (Deductions)
                </th>
                <th colSpan={3} className="bg-emerald-50 p-1 text-emerald-800">
                  최종 정산
                </th>
              </tr>
              {/* 상세 컬럼 헤더 */}
              <tr className="border-b border-gray-300 bg-gray-50 text-gray-600">
                <th className="sticky left-0 z-30 w-12 border-r border-gray-300 bg-gray-50 p-2">No</th>
                <th className="sticky left-12 z-30 w-24 border-r border-gray-300 bg-gray-50 p-2 text-left text-blue-900">
                  성명
                </th>
                <th className="w-20 border-r border-gray-300 p-2">직종</th>
                <th className="w-16 border-r border-gray-300 p-2">근무일</th>

                {/* 지급 그룹 */}
                <th className="w-28 border-r border-gray-200 bg-blue-50/20 p-2 text-right">기본급</th>
                <th className="w-24 border-r border-gray-200 bg-blue-50/20 p-2 text-right">연장/야간</th>
                <th className="w-24 border-r border-gray-200 bg-blue-50/20 p-2 text-right">주휴수당</th>
                <th className="w-24 border-r border-gray-200 bg-blue-50/20 p-2 text-right">기타수당</th>
                <th className="w-28 border-r border-gray-300 bg-blue-100/30 p-2 text-right text-blue-800">지급합계</th>

                {/* 공제 그룹 */}
                <th className="w-24 border-r border-gray-200 bg-red-50/20 p-2 text-right">4대보험</th>
                <th className="w-20 border-r border-gray-200 bg-red-50/20 p-2 text-right">소득세</th>
                <th className="w-20 border-r border-gray-200 bg-red-50/20 p-2 text-right">지방세</th>
                <th className="w-24 border-r border-gray-200 bg-red-50/20 p-2 text-right">기타공제</th>
                <th className="w-28 border-r border-gray-300 bg-red-100/30 p-2 text-right text-red-800">공제합계</th>

                {/* 결과 그룹 */}
                <th className="w-32 border-r border-gray-300 bg-emerald-50 p-2 text-right font-black">실지급액</th>
                <th className="w-16 border-r border-gray-300 p-2 text-center">상태</th>
                <th className="w-24 p-2 text-center">관리</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {results.map((r, idx) => (
                <tr key={r.employeeId} className="transition-colors hover:bg-blue-50/30">
                  <td className="sticky left-0 border-r border-gray-200 bg-white p-1.5 text-center font-mono text-gray-400 group-hover:bg-blue-50/30">
                    {idx + 1}
                  </td>
                  <td className="sticky left-12 border-r border-gray-200 bg-white p-1.5 font-black text-gray-800 group-hover:bg-blue-50/30">
                    {r.employeeName}
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-center text-gray-500">{r.position}</td>
                  <td className="border-r border-gray-200 p-1.5 text-center">{r.workDays}일</td>

                  {/* 지급 데이터 */}
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">{r.basePay.toLocaleString()}</td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">
                    {(r.overtimePay + r.nightPay).toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">
                    {r.weeklyAllowance.toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">
                    {(r.mealAllowance + r.transportAllowance + r.positionAllowance).toLocaleString()}
                  </td>
                  <td className="border-r border-gray-300 bg-blue-50/30 p-1.5 text-right font-mono font-bold text-blue-700">
                    {r.totalPay.toLocaleString()}
                  </td>

                  {/* 공제 데이터 */}
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">
                    {(r.pension + r.health + r.longTermCare + r.employ).toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">
                    {r.incomeTax.toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">{r.localTax.toLocaleString()}</td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono">0</td>
                  <td className="border-r border-gray-300 bg-red-50/30 p-1.5 text-right font-mono font-bold text-red-600">
                    {r.totalDeduction.toLocaleString()}
                  </td>

                  {/* 결과 데이터 */}
                  <td className="border-r border-gray-300 bg-emerald-50/30 p-1.5 text-right font-mono font-black text-emerald-700">
                    {r.netPay.toLocaleString()}
                  </td>
                  <td className="border-r border-gray-300 p-1.5 text-center">
                    <span
                      className={`rounded-sm border px-2 py-0.5 text-[9px] font-bold ${
                        r.status === 'paid'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-blue-200 bg-blue-50 text-blue-700'
                      }`}
                    >
                      {r.status === 'paid' ? '지급완료' : '계산완료'}
                    </span>
                  </td>
                  <td className="space-x-1 p-1.5 text-center">
                    <button
                      onClick={() => onViewPayslip(r)}
                      className="text-gray-400 transition-colors hover:text-[#1a5a96]"
                    >
                      <i className="ri-file-search-line"></i>
                    </button>
                    <button
                      onClick={() => onDownloadPdf(r)}
                      className="text-gray-400 transition-colors hover:text-emerald-600"
                    >
                      <i className="ri-file-pdf-line"></i>
                    </button>
                    <button className="text-gray-300 hover:text-red-500">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* 테이블 합계 푸터 */}
            <tfoot className="sticky bottom-0 z-20 border-t-2 border-gray-300 bg-gray-100 font-black">
              <tr className="divide-x divide-gray-200">
                <td colSpan={4} className="p-2 text-center text-[10px] uppercase text-gray-500">
                  Monthly Total
                </td>
                <td colSpan={4} className="bg-white"></td>
                <td className="bg-blue-50/50 p-2 text-right text-blue-700">
                  {results.reduce((s, r) => s + r.totalPay, 0).toLocaleString()}
                </td>
                <td colSpan={4} className="bg-white"></td>
                <td className="bg-red-50/50 p-2 text-right text-red-600">
                  {results.reduce((s, r) => s + r.totalDeduction, 0).toLocaleString()}
                </td>
                <td className="bg-emerald-100/50 p-2 text-right text-emerald-800">
                  {results.reduce((s, r) => s + r.netPay, 0).toLocaleString()}
                </td>
                <td colSpan={2} className="bg-white"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 도움말 가이드 */}
      <div className="border-l-4 border-[#1a5a96] bg-blue-50 p-2 text-[10px] text-gray-600">
        <p>
          💡 **정산 팁**: 수당 항목(Blue)은 과세/비과세 여부에 따라 소득세에 영향을 줍니다. 공제 항목(Red) 중 4대보험
          요율은 매년 보건복지부 고시 기준에 따라 자동 업데이트됩니다.
        </p>
      </div>
    </div>
  );
}
