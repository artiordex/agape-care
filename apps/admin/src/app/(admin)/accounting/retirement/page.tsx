/**
 * Description : page.tsx - 퇴직적립금 관리 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';

// 가상 데이터
const MOCK_RETIREMENT_DATA = [
  {
    id: 1,
    name: '김철수',
    position: '요양보호사',
    hireDate: '2023-03-01',
    serviceYears: '2.9년',
    avgWage: 2350000,
    estimatedPay: 6815000,
    currentBalance: 6100000,
    accumulationRate: 89.5,
  },
  {
    id: 2,
    name: '이영희',
    position: '간호사',
    hireDate: '2022-11-10',
    serviceYears: '3.3년',
    avgWage: 3100000,
    estimatedPay: 10230000,
    currentBalance: 9800000,
    accumulationRate: 95.8,
  },
  {
    id: 3,
    name: '박지민',
    position: '사회복지사',
    hireDate: '2024-01-15',
    serviceYears: '2.1년',
    avgWage: 2750000,
    estimatedPay: 5775000,
    currentBalance: 5200000,
    accumulationRate: 90.0,
  },
  {
    id: 4,
    name: '최현우',
    position: '요양보호사',
    hireDate: '2021-05-20',
    serviceYears: '4.7년',
    avgWage: 2400000,
    estimatedPay: 11280000,
    currentBalance: 11280000,
    accumulationRate: 100.0,
  },
  {
    id: 5,
    name: '정다은',
    position: '상담원',
    hireDate: '2025-06-01',
    serviceYears: '0.7년',
    avgWage: 2500000,
    estimatedPay: 0,
    currentBalance: 1200000,
    accumulationRate: 0,
  },
];

export default function RetirementManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = useMemo(() => {
    const totalEstimated = MOCK_RETIREMENT_DATA.reduce((acc, curr) => acc + curr.estimatedPay, 0);
    const totalBalance = MOCK_RETIREMENT_DATA.reduce((acc, curr) => acc + curr.currentBalance, 0);
    const avgAccumulation =
      MOCK_RETIREMENT_DATA.filter(d => d.accumulationRate > 0).reduce((acc, curr) => acc + curr.accumulationRate, 0) /
      (MOCK_RETIREMENT_DATA.length - 1);
    return { totalEstimated, totalBalance, avgAccumulation, count: MOCK_RETIREMENT_DATA.length };
  }, []);

  const filteredData = MOCK_RETIREMENT_DATA.filter(
    item => item.name.includes(searchTerm) || item.position.includes(searchTerm),
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans text-gray-800 antialiased">
      {/* 1. 헤더 */}
      <header className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md">
            <i className="ri-safe-2-line text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight text-gray-900">퇴직적립금 관리</h1>
            <p className="text-[11px] font-bold uppercase text-[#5C8D5A]">Retirement Fund Management</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-1.5 text-[11px] font-bold text-gray-600 transition-all hover:bg-gray-50">
            <i className="ri-history-line"></i>변동 이력조회
          </button>
          <button className="flex items-center gap-1.5 bg-[#5C8D5A] px-5 py-1.5 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548]">
            <i className="ri-add-line"></i>적립금 수동입력
          </button>
        </div>
      </header>

      {/* 2. 대시보드 요약 */}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
        <div className="flex flex-col rounded border border-gray-200 bg-white p-3 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500">지정 직원</span>
          <span className="text-xl font-black text-gray-900">
            {stats.count} <small className="text-[12px] font-normal">명</small>
          </span>
        </div>
        <div className="flex flex-col rounded border border-orange-100 bg-orange-50 p-3 shadow-sm">
          <span className="text-[11px] font-bold text-orange-600">퇴직추계액 합계 (1년↑)</span>
          <span className="text-xl font-black text-orange-700">
            {stats.totalEstimated.toLocaleString()} <small className="text-[12px] font-normal">원</small>
          </span>
        </div>
        <div className="flex flex-col rounded border border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-3 shadow-sm">
          <span className="text-[11px] font-bold text-[#5C8D5A]">현재 적립잔액</span>
          <span className="text-xl font-black text-[#5C8D5A]">
            {stats.totalBalance.toLocaleString()} <small className="text-[12px] font-normal">원</small>
          </span>
        </div>
        <div className="flex flex-col rounded border border-blue-100 bg-blue-50 p-3 shadow-sm">
          <span className="text-[11px] font-bold text-blue-600">평균 적립률</span>
          <span className="text-xl font-black text-blue-700">
            {stats.avgAccumulation.toFixed(1)} <small className="text-[12px] font-normal">%</small>
          </span>
        </div>
      </div>

      {/* 3. 메인 콘텐츠 */}
      <div className="flex-1 overflow-hidden p-4 pt-0">
        <div className="flex h-full flex-col overflow-hidden border border-gray-300 bg-white shadow-sm">
          {/* 검색 및 필터 */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
            <div className="flex items-center gap-2">
              <i className="ri-search-line text-gray-400"></i>
              <input
                type="text"
                placeholder="성명 또는 직위 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-64 bg-transparent text-[12px] font-medium outline-none placeholder:text-gray-300"
              />
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
              <span className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div> 적립완료
              </span>
              <span className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-orange-400"></div> 적립부족
              </span>
              <span className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gray-300"></div> 1년 미만
              </span>
            </div>
          </div>

          {/* 테이블 리스트 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-left text-[12px]">
              <thead className="sticky top-0 z-10 bg-gray-100 font-black text-gray-600 shadow-sm">
                <tr>
                  <th className="border-b border-gray-200 px-4 py-2">직원정보</th>
                  <th className="border-b border-gray-200 px-4 py-2">입사일</th>
                  <th className="border-b border-gray-200 px-4 py-2">근속연수</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right">평균임금 (3M)</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right">퇴직추계액</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right">현재 적립금</th>
                  <th className="w-40 border-b border-gray-200 px-4 py-2 text-center">적립 현황</th>
                  <th className="w-24 border-b border-gray-200 px-4 py-2 text-center">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map(item => (
                  <tr key={item.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-black text-gray-900">{item.name}</div>
                      <div className="text-[11px] font-medium text-gray-400">{item.position}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.hireDate}</td>
                    <td className="px-4 py-3 font-bold text-gray-600">{item.serviceYears}</td>
                    <td className="px-4 py-3 text-right font-medium">{item.avgWage.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-black text-gray-900">
                      {item.estimatedPay.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-black text-[#5C8D5A]">
                      {item.currentBalance.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={clsx(
                              'h-full rounded-full transition-all',
                              item.accumulationRate >= 100 ? 'bg-emerald-500' : 'bg-orange-400',
                            )}
                            style={{ width: `${item.accumulationRate}%` }}
                          ></div>
                        </div>
                        <span className="w-8 text-[10px] font-black text-gray-500">{item.accumulationRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={clsx(
                          'rounded-full px-2 py-0.5 text-[10px] font-black',
                          item.estimatedPay === 0
                            ? 'bg-gray-100 text-gray-400'
                            : item.accumulationRate >= 100
                              ? 'border border-emerald-200 bg-emerald-50 text-emerald-600'
                              : 'border border-orange-200 bg-orange-50 text-orange-600',
                        )}
                      >
                        {item.estimatedPay === 0 ? '1년 미만' : item.accumulationRate >= 100 ? '적립완료' : '적립부족'}
                      </span>
                    </td>
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
