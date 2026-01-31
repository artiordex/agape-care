'use client';

import React from 'react';

/**
 * 장기요양보험 청구 내역 테이블
 * 고밀도 그리드 및 상태별 배지 시스템 적용
 */
export default function ClaimTableView({ data, onStatusChange, onEdit, onDelete }: any) {
  // 상태별 색상 매핑 (ERP 표준 컬러)
  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      작성중: 'bg-gray-100 text-gray-600 border-gray-300',
      청구완료: 'bg-blue-50 text-blue-700 border-blue-200',
      승인완료: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      반려: 'bg-red-50 text-red-700 border-red-200',
    };
    return styles[status] || 'bg-gray-50 text-gray-500 border-gray-200';
  };

  return (
    <div className="w-full overflow-hidden border border-gray-300 bg-white shadow-sm">
      <div className="max-h-[600px] overflow-x-auto overflow-y-auto">
        <table className="w-full border-collapse text-[11px]">
          <thead className="sticky top-0 z-10 border-b border-gray-300 bg-[#eef3f8]">
            <tr className="text-gray-600">
              <th className="w-12 border-r border-gray-300 p-2 text-center">No</th>
              <th className="w-32 border-r border-gray-300 p-2 text-left font-bold text-blue-900">수급자명</th>
              <th className="w-20 border-r border-gray-300 p-2 text-center">등급</th>
              <th className="w-16 border-r border-gray-300 p-2 text-center">급여일수</th>
              <th className="w-32 border-r border-gray-300 p-2 text-right">총 급여비용</th>
              <th className="w-32 border-r border-gray-300 p-2 text-right">본인부담금</th>
              <th className="w-32 border-r border-gray-300 bg-emerald-50 p-2 text-right text-emerald-800">
                공단부담금
              </th>
              <th className="w-24 border-r border-gray-300 p-2 text-center">상태</th>
              <th className="w-20 p-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={9} className="bg-gray-50 p-10 text-center italic text-gray-400">
                  조회된 청구 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              data.map((claim: any, index: number) => (
                <tr key={claim.id} className="group transition-colors hover:bg-blue-50/50">
                  <td className="border-r border-gray-200 p-1.5 text-center font-mono text-gray-400">{index + 1}</td>
                  <td className="border-r border-gray-200 p-1.5 font-black text-[#1a5a96]">{claim.residentName}</td>
                  <td className="border-r border-gray-200 p-1.5 text-center">
                    <span className="rounded-sm border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                      {claim.grade}
                    </span>
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-center text-gray-600">{claim.serviceDays}일</td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono font-bold text-gray-700">
                    {claim.serviceAmount.toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-right font-mono text-purple-600">
                    {claim.copayment.toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200 bg-emerald-50/30 p-1.5 text-right font-mono font-black text-emerald-600">
                    {claim.insuranceAmount.toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200 p-1.5 text-center">
                    <select
                      value={claim.status}
                      onChange={e => onStatusChange(claim.id, e.target.value)}
                      className={`cursor-pointer rounded-sm border px-2 py-0.5 text-[10px] font-black outline-none transition-all ${getStatusStyle(claim.status)}`}
                    >
                      <option value="작성중">작성중</option>
                      <option value="청구완료">청구완료</option>
                      <option value="승인완료">승인완료</option>
                      <option value="반려">반려</option>
                    </select>
                  </td>
                  <td className="p-1.5 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => onEdit(claim)} className="font-bold text-blue-600 hover:underline">
                        수정
                      </button>
                      <button
                        onClick={() => onDelete(claim.id)}
                        className="text-red-300 transition-colors hover:text-red-600"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {/* 테이블 합계 푸터 */}
          <tfoot className="sticky bottom-0 z-10 border-t-2 border-gray-300 bg-gray-100 font-black">
            <tr>
              <td colSpan={4} className="border-r border-gray-200 p-2 text-center text-[10px] uppercase text-gray-500">
                Total Summary
              </td>
              <td className="border-r border-gray-200 p-2 text-right font-mono text-gray-700">
                {data.reduce((s: any, c: any) => s + c.serviceAmount, 0).toLocaleString()}
              </td>
              <td className="border-r border-gray-200 p-2 text-right font-mono text-purple-600">
                {data.reduce((s: any, c: any) => s + c.copayment, 0).toLocaleString()}
              </td>
              <td className="border-r border-gray-200 bg-emerald-100/50 p-2 text-right font-mono text-emerald-700">
                {data.reduce((s: any, c: any) => s + c.insuranceAmount, 0).toLocaleString()}
              </td>
              <td colSpan={2} className="bg-white"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
