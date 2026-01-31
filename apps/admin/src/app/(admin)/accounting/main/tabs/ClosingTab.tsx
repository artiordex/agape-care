'use client';

import React, { useState } from 'react';

/**
 * [4] 결산/마감 탭
 * 마감 체크리스트 및 재무제표 요약 UI
 */
export default function ClosingTab() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(1);

  // 마감 체크리스트 데이터
  const checklist = [
    { id: 1, label: '미승인 전표 존재 여부', status: 'pass', desc: '모든 전표가 승인되었습니다.' },
    { id: 2, label: '차대평형 검증 (대차대조)', status: 'pass', desc: '합계잔액시산표의 차대 금액이 일치합니다.' },
    {
      id: 3,
      label: '현금/예금 잔액 대사',
      status: 'warning',
      desc: '장부와 실제 계좌 잔액에 1,250원 차이가 있습니다.',
      count: 1,
    },
    {
      id: 4,
      label: '미결제/미수금 항목 확인',
      status: 'pending',
      desc: '지출결의서 2건이 증빙 미첨부 상태입니다.',
      count: 2,
    },
  ];

  return (
    <div className="animate-in fade-in space-y-3 text-[11px] duration-500">
      {/* 1. 마감 컨트롤 바 */}
      <div className="flex items-center justify-between border border-gray-300 bg-white p-2 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-gray-700">
            <i className="ri-calendar-check-line text-blue-600"></i> 결산대상:
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="ml-1 border border-gray-300 bg-gray-50 p-1 outline-none"
            >
              <option value={2026}>2026년</option>
              <option value={2025}>2025년</option>
            </select>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(Number(e.target.value))}
              className="border border-gray-300 bg-gray-50 p-1 outline-none"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>
          </div>
          <div className="mx-1 h-4 w-[1px] bg-gray-300"></div>
          <span className="flex items-center gap-1 font-bold text-orange-600">
            <i className="ri-error-warning-line"></i> 현재 마감 대기 중
          </span>
        </div>
        <div className="flex gap-1">
          <button className="border border-gray-400 bg-white px-4 py-1 font-bold text-gray-700 hover:bg-gray-50">
            시산표 조회
          </button>
          <button className="bg-[#1a5a96] px-5 py-1 font-bold text-white shadow-sm hover:bg-[#144675]">
            월마감 실행
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* 2. 마감 전 체크리스트 (Left Column) */}
        <div className="space-y-3 lg:col-span-1">
          <div className="h-full overflow-hidden border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-gray-300 bg-[#eef3f8] p-2 font-black text-gray-700">
              마감 전 필수 체크리스트
            </div>
            <div className="space-y-2 p-2">
              {checklist.map(item => (
                <div
                  key={item.id}
                  className="border border-gray-200 bg-gray-50 p-2 transition-colors hover:border-blue-300"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-bold text-gray-800">{item.label}</span>
                    {item.status === 'pass' ? (
                      <i className="ri-checkbox-circle-fill text-sm text-emerald-500"></i>
                    ) : item.status === 'warning' ? (
                      <i className="ri-error-warning-fill animate-pulse text-sm text-orange-500"></i>
                    ) : (
                      <i className="ri-time-fill text-sm text-gray-400"></i>
                    )}
                  </div>
                  <p className="text-[10px] leading-tight text-gray-500">{item.desc}</p>
                </div>
              ))}
              <div className="pt-2">
                <button className="w-full border-2 border-dashed border-gray-300 py-1.5 font-bold text-gray-400 transition-all hover:bg-white hover:text-blue-500">
                  데이터 검증 다시 실행
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 재무제표 요약 (Right Column, 2 Spans) */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:col-span-2">
          <FinancialStatementCard title="손익계산서 (Summary)" type="P&L" date="2026.01.01 ~ 01.31" />
          <FinancialStatementCard title="재무상태표 (Summary)" type="BS" date="2026.01.31 현재" />
        </div>
      </div>

      {/* 4. 마감 이력 (Bottom) */}
      <div className="border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center gap-1 border-b border-gray-300 bg-gray-50 p-2 font-bold text-gray-600">
          <i className="ri-history-line"></i> 최근 마감 이력
        </div>
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-200 bg-gray-50/50">
            <tr className="font-normal text-gray-400">
              <th className="w-24 p-2 text-center">회기연도</th>
              <th className="w-24 p-2 text-center">대상월</th>
              <th className="p-2 text-center">마감일시</th>
              <th className="p-2 text-center">마감자</th>
              <th className="p-2 text-right">차변총액</th>
              <th className="p-2 text-right">대변총액</th>
              <th className="w-24 p-2 text-center">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="p-2 text-center font-bold">2025년</td>
              <td className="p-2 text-center">12월</td>
              <td className="p-2 text-center text-gray-500">2026-01-05 17:30</td>
              <td className="p-2 text-center">사무국장</td>
              <td className="p-2 text-right font-mono">48,000,000</td>
              <td className="p-2 text-right font-mono">48,000,000</td>
              <td className="p-2 text-center">
                <span className="rounded-sm border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
                  마감완료
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * 재무제표 요약 카드 (내부 컴포넌트)
 */
function FinancialStatementCard({ title, type, date }: any) {
  return (
    <div className="flex flex-col border border-gray-300 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-3">
        <div>
          <h4 className="flex items-center gap-1 font-black text-gray-800">
            <i className={`ri-file-chart-fill ${type === 'P&L' ? 'text-blue-600' : 'text-purple-600'}`}></i>
            {title}
          </h4>
          <p className="mt-0.5 text-[9px] text-gray-400">{date}</p>
        </div>
        <button className="text-[10px] font-bold text-blue-600 hover:underline">상세보기</button>
      </div>
      <div className="flex-1 space-y-2 p-3">
        {/* 가상 데이터 행 */}
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600">{type === 'P&L' ? '총수익' : '자산총계'}</span>
          <span className="font-bold text-gray-900">35,000,000</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600">{type === 'P&L' ? '총비용' : '부채총계'}</span>
          <span className="font-bold text-red-500">28,500,000</span>
        </div>
        <div className="flex justify-between bg-blue-50/30 px-1 pt-1 font-black text-blue-800">
          <span>{type === 'P&L' ? '당기순이익' : '자본총계'}</span>
          <span>{type === 'P&L' ? '6,500,000' : '6,500,000'}</span>
        </div>
        <div className="mt-4 border-t-2 border-dotted border-gray-200 pt-2">
          <p className="text-center text-[9px] italic text-gray-400">
            * 상기 수치는 전표 승인 기준 가결산 데이터입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
