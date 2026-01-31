'use client';

import React from 'react';

interface Props {
  history: any[];
}

/**
 * [TAB 3] 지급 이력 탭
 * 과거 급여 집행 기록 및 회계 시스템 연동 상태 확인
 */
export default function HistoryTab({ history }: Props) {
  return (
    <div className="animate-in fade-in space-y-4 text-[11px] duration-500">
      {/* 1. 이력 요약 통계 (과거 추이 파악용) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="flex items-center justify-between border border-gray-300 bg-white p-3 shadow-sm">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Total Executed</p>
            <p className="text-lg font-black text-gray-800">
              {history.length}건 <span className="text-[10px] font-normal text-gray-400">의 집행 기록</span>
            </p>
          </div>
          <i className="ri-history-line text-2xl text-gray-100"></i>
        </div>
        <div className="flex items-center justify-between border border-gray-300 bg-white p-3 shadow-sm">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Avg. Monthly Pay</p>
            <p className="text-lg font-black text-[#1a5a96]">
              5,452,000 <span className="text-[10px] font-normal text-gray-400">원</span>
            </p>
          </div>
          <i className="ri-funds-line text-2xl text-gray-100"></i>
        </div>
        <div className="flex items-center justify-between border border-emerald-200 bg-emerald-50 p-3 shadow-sm">
          <div>
            <p className="text-[10px] font-black uppercase text-emerald-600">Accounting Sync</p>
            <p className="text-lg font-black text-emerald-700">
              100% <span className="text-[10px] font-normal text-emerald-400">연동 완료</span>
            </p>
          </div>
          <i className="ri-shield-check-line text-2xl text-emerald-100"></i>
        </div>
      </div>

      {/* 2. 지급 이력 고밀도 테이블 */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-300 bg-[#eef3f8] text-gray-600">
            <tr>
              <th className="w-20 border-r border-gray-300 p-2">지급월</th>
              <th className="w-24 border-r border-gray-300 p-2">지급일자</th>
              <th className="w-16 border-r border-gray-300 p-2">인원</th>
              <th className="w-32 border-r border-gray-300 p-2 text-right">총 지급액</th>
              <th className="w-28 border-r border-gray-300 p-2 text-right text-red-600">공제 합계</th>
              <th className="w-32 border-r border-gray-300 bg-emerald-50/30 p-2 text-right text-emerald-700">
                실지급 총액
              </th>
              <th className="w-20 border-r border-gray-300 p-2">회계반영</th>
              <th className="w-20 border-r border-gray-300 p-2">상태</th>
              <th className="w-24 p-2">작성자</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {history.map(item => (
              <tr key={item.id} className="transition-colors hover:bg-blue-50/50">
                <td className="border-r border-gray-200 bg-gray-50/30 p-2 text-center font-black text-[#1a5a96]">
                  {item.month}
                </td>
                <td className="border-r border-gray-200 p-2 text-center font-mono text-gray-500">{item.paymentDate}</td>
                <td className="border-r border-gray-200 p-2 text-center font-bold">{item.totalEmployees}명</td>
                <td className="border-r border-gray-200 p-2 text-right font-mono text-gray-600">
                  {item.totalPay.toLocaleString()}
                </td>
                <td className="border-r border-gray-200 p-2 text-right font-mono text-red-500">
                  {item.totalDeduction.toLocaleString()}
                </td>
                <td className="border-r border-gray-200 bg-emerald-50/20 p-2 text-right font-mono font-black text-emerald-700">
                  {item.totalNetPay.toLocaleString()}
                </td>
                <td className="border-r border-gray-200 p-2 text-center">
                  {item.reflectedToAccounting ? (
                    <span className="flex items-center justify-center gap-1 font-bold text-blue-600">
                      <i className="ri-checkbox-circle-fill"></i> 완료
                    </span>
                  ) : (
                    <span className="text-gray-300">미반영</span>
                  )}
                </td>
                <td className="border-r border-gray-200 p-2 text-center">
                  <span className="rounded-sm bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white">
                    집행완료
                  </span>
                </td>
                <td className="p-2 text-center text-gray-400">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-600">{item.createdBy}</span>
                    <span className="text-[9px] opacity-70">{item.createdAt.split(' ')[0]}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. 이력 관리 안내 */}
      <div className="flex items-center gap-2 px-2 text-[10px] font-bold text-gray-400">
        <i className="ri-information-line text-blue-500"></i>
        <p>
          확정된 급여 이력은 수정이 불가능하며, 오지급 발생 시 다음 달 정산에 소급 반영하거나 취소 전표를 발행해야
          합니다.
        </p>
      </div>
    </div>
  );
}
