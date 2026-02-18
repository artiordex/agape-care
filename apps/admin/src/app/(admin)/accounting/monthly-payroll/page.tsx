/**
 * Description : page.tsx - ?? accounting/monthly-payroll ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useMemo, useState } from 'react';

// 가상 데이터
const MOCK_MONTHLY_PAYROLL = [
  {
    id: 1,
    name: '김철수',
    position: '요양보호사',
    department: '케어1팀',
    basePay: 2112000,
    foodAllowance: 100000,
    transportAllowance: 50000,
    totalPay: 2262000,
    deduction: 245000,
    netPay: 2017000,
  },
  {
    id: 2,
    name: '이영희',
    position: '간호사',
    department: '의료지원팀',
    basePay: 2800000,
    foodAllowance: 120000,
    transportAllowance: 60000,
    totalPay: 2980000,
    deduction: 320000,
    netPay: 2660000,
  },
  {
    id: 3,
    name: '박지민',
    position: '사회복지사',
    department: '운영기획팀',
    basePay: 2500000,
    foodAllowance: 100000,
    transportAllowance: 50000,
    totalPay: 2650000,
    deduction: 280000,
    netPay: 2370000,
  },
  {
    id: 4,
    name: '최현우',
    position: '요양보호사',
    department: '케어2팀',
    basePay: 2112000,
    foodAllowance: 100000,
    transportAllowance: 50000,
    totalPay: 2262000,
    deduction: 245000,
    netPay: 2017000,
  },
  {
    id: 5,
    name: '정다은',
    position: '상담원',
    department: '고객지원팀',
    basePay: 2300000,
    foodAllowance: 100000,
    transportAllowance: 50000,
    totalPay: 2450000,
    deduction: 260000,
    netPay: 2190000,
  },
];

export default function MonthlyPayrollPage() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = useMemo(() => {
    const totalPay = MOCK_MONTHLY_PAYROLL.reduce((acc, curr) => acc + curr.totalPay, 0);
    const totalNetPay = MOCK_MONTHLY_PAYROLL.reduce((acc, curr) => acc + curr.netPay, 0);
    const totalDeduction = MOCK_MONTHLY_PAYROLL.reduce((acc, curr) => acc + curr.deduction, 0);
    return { totalPay, totalNetPay, totalDeduction, count: MOCK_MONTHLY_PAYROLL.length };
  }, []);

  const filteredData = MOCK_MONTHLY_PAYROLL.filter(
    item => item.name.includes(searchTerm) || item.department.includes(searchTerm),
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans text-gray-800 antialiased">
      {/* 1. 헤더 */}
      <header className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md">
            <i className="ri-file-list-3-line text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight text-gray-900">월별 급여대장</h1>
            <p className="text-[11px] font-bold uppercase text-[#5C8D5A]">Monthly Payroll Register</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option value="2026">2026년</option>
            <option value="2025">2025년</option>
          </select>
          <select
            className="border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-1.5 text-[11px] font-bold text-gray-600 transition-all hover:bg-gray-50">
            <i className="ri-printer-line"></i>대장 출력
          </button>
          <button className="flex items-center gap-1.5 bg-[#5C8D5A] px-5 py-1.5 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548]">
            <i className="ri-file-excel-2-line"></i>엑셀 다운로드
          </button>
        </div>
      </header>

      {/* 2. 주석 및 통계 요약 */}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
        <div className="flex flex-col rounded border border-gray-200 bg-white p-3 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500">지정 인원</span>
          <span className="text-xl font-black text-gray-900">
            {stats.count} <small className="text-[12px] font-normal">명</small>
          </span>
        </div>
        <div className="flex flex-col rounded border border-emerald-100 bg-emerald-50 p-3 shadow-sm">
          <span className="text-[11px] font-bold text-emerald-600">지급 합계</span>
          <span className="text-xl font-black text-emerald-700">
            {stats.totalPay.toLocaleString()} <small className="text-[12px] font-normal">원</small>
          </span>
        </div>
        <div className="flex flex-col rounded border border-red-100 bg-red-50 p-3 shadow-sm">
          <span className="text-[11px] font-bold text-red-600">공제 합계</span>
          <span className="text-xl font-black text-red-700">
            {stats.totalDeduction.toLocaleString()} <small className="text-[12px] font-normal">원</small>
          </span>
        </div>
        <div className="flex flex-col rounded border border-blue-100 bg-blue-50 p-3 shadow-sm">
          <span className="text-[11px] font-bold text-blue-600">실지급액 합계</span>
          <span className="text-xl font-black text-blue-700">
            {stats.totalNetPay.toLocaleString()} <small className="text-[12px] font-normal">원</small>
          </span>
        </div>
      </div>

      {/* 3. 데이터 보드 */}
      <div className="flex-1 overflow-hidden p-4 pt-0">
        <div className="flex h-full flex-col overflow-hidden border border-gray-300 bg-white shadow-sm">
          {/* 검색바 */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
            <div className="flex items-center gap-2">
              <i className="ri-search-line text-gray-400"></i>
              <input
                type="text"
                placeholder="직원명 또는 부서 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-64 bg-transparent text-[12px] font-medium outline-none placeholder:text-gray-300"
              />
            </div>
            <div className="text-[10px] font-bold text-gray-400">
              STATUS: SYNCED | LAST UPDATED: {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* 테이블 테이블 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-left text-[12px]">
              <thead className="sticky top-0 z-10 bg-gray-100 font-black text-gray-600 shadow-sm">
                <tr>
                  <th className="border-b border-gray-200 px-4 py-2">성명</th>
                  <th className="border-b border-gray-200 px-4 py-2">직위</th>
                  <th className="border-b border-gray-200 px-4 py-2">부서</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right">기본급</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right">식대</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right">교통비</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right text-[#5C8D5A]">지급총액</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right text-red-500">공제합계</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right font-black text-blue-600">차인지급액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map(item => (
                  <tr key={item.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-bold text-gray-900">{item.name}</td>
                    <td className="px-4 py-2.5 text-gray-600">{item.position}</td>
                    <td className="px-4 py-2.5 text-gray-600">{item.department}</td>
                    <td className="px-4 py-2.5 text-right">{item.basePay.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">{item.foodAllowance.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">{item.transportAllowance.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-emerald-700">
                      {item.totalPay.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-red-500">
                      {item.deduction.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right font-black text-blue-600">{item.netPay.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
