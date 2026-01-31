'use client';

import React from 'react';

interface Props {
  summary: any;
  transactions: any[];
  onNavigate: (tab: string) => void;
}

/**
 * [1] 종합 현황 탭
 * 시각적 분석과 최근 거래 내역을 결합한 대시보드
 */
export default function DashboardTab({ summary, transactions, onNavigate }: Props) {
  return (
    <div className="animate-in fade-in space-y-3 duration-500">
      {/* 상단: 카테고리별 수지 분석 (2컬럼 레이아웃) */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <AnalysisCard
          title="수입 카테고리 분석"
          data={summary.incomeByCategory}
          total={summary.totalIncome}
          accentColor="bg-[#1a5a96]"
          type="income"
        />
        <AnalysisCard
          title="지출 카테고리 분석"
          data={summary.expenseByCategory}
          total={summary.totalExpense}
          accentColor="bg-red-600"
          type="expense"
        />
      </div>

      {/* 하단: 최근 전표 내역 (고밀도 테이블) */}
      <div className="border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-300 bg-[#eef3f8] px-3 py-2">
          <h3 className="flex items-center gap-1 text-[11px] font-black text-gray-700">
            <i className="ri-list-check-2 text-blue-600"></i> 최근 등록 전표 내역
          </h3>
          <button
            onClick={() => onNavigate('transactions')}
            className="text-[10px] font-bold text-[#1a5a96] hover:underline"
          >
            전체 내역 보기 <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
              <tr>
                <th className="w-24 p-2 text-center">일자</th>
                <th className="w-20 p-2 text-center">구분</th>
                <th className="p-2 text-left">계정과목(카테고리)</th>
                <th className="p-2 text-left">적요(내용)</th>
                <th className="w-32 p-2 text-right">금액</th>
                <th className="w-20 p-2 text-center">결제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.slice(0, 6).map(tx => (
                <tr key={tx.id} className="transition-colors hover:bg-blue-50">
                  <td className="p-2 text-center text-gray-500">{tx.date}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`rounded-sm px-2 py-0.5 text-[10px] font-bold ${
                        tx.type === 'income' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {tx.type === 'income' ? '수입' : '지출'}
                    </span>
                  </td>
                  <td className="p-2 font-bold text-gray-700">{tx.category}</td>
                  <td className="max-w-[200px] truncate p-2 text-gray-600">{tx.description}</td>
                  <td
                    className={`p-2 text-right font-black ${tx.type === 'income' ? 'text-blue-600' : 'text-red-600'}`}
                  >
                    {tx.amount.toLocaleString()}원
                  </td>
                  <td className="p-2 text-center text-gray-400">{tx.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/**
 * 분석 카드 내부 컴포넌트
 */
function AnalysisCard({ title, data, total, accentColor, type }: any) {
  return (
    <div className="border border-gray-300 bg-white p-4 shadow-sm">
      <h4 className="mb-4 flex items-center gap-1 text-[11px] font-black text-gray-800">
        <i className={`ri-pie-chart-2-fill ${type === 'income' ? 'text-blue-600' : 'text-red-600'}`}></i>
        {title}
      </h4>
      <div className="space-y-3">
        {Object.entries(data).map(([label, value]: [string, any]) => {
          const percentage = ((value / total) * 100).toFixed(1);
          return (
            <div key={label} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-600">{label}</span>
                <span className="text-gray-900">
                  {value.toLocaleString()}원 ({percentage}%)
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full ${accentColor} transition-all duration-1000`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
