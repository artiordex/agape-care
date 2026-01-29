'use client';

import React, { useState } from 'react';

const ReportElimination: React.FC = () => {
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('전체');
  const [roomFilter, setRoomFilter] = useState('전체');

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`${format.toUpperCase()} 다운로드 준비 중입니다.`);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="border-b border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">배설/비위관/도뇨관 관리 리포트</h2>

        {/* 필터 바 */}
        <div className="mb-4 grid grid-cols-4 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">기간 (시작)</label>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">기간 (종료)</label>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">수급자</label>
            <select
              value={selectedBeneficiary}
              onChange={e => setSelectedBeneficiary(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="김영희">김영희</option>
              <option value="이철수">이철수</option>
              <option value="박순자">박순자</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">생활실</label>
            <select
              value={roomFilter}
              onChange={e => setRoomFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="1층">1층</option>
              <option value="2층">2층</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
            <i className="ri-search-line mr-2"></i>
            조회
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('pdf')}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              <i className="ri-file-pdf-line mr-2"></i>
              PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <i className="ri-file-excel-line mr-2"></i>
              엑셀
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <i className="ri-file-text-line mr-2"></i>
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">배변 평균</span>
              <i className="ri-file-list-line text-xl text-blue-500"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">2.3회/일</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">배뇨 평균</span>
              <i className="ri-file-list-line text-xl text-emerald-500"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">5.8회/일</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">비위관 관리</span>
              <i className="ri-syringe-line text-xl text-orange-500"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">3명</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">도뇨관 관리</span>
              <i className="ri-test-tube-line text-xl text-purple-500"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">2명</p>
          </div>
        </div>

        {/* 배설 기록 테이블 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">배설 기록</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">배변 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">배변 성상</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">배뇨 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">배뇨 성상</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">이상 소견</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                  <td className="px-6 py-4 text-sm text-gray-600">101호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2회</td>
                  <td className="px-6 py-4 text-sm text-gray-600">정상</td>
                  <td className="px-6 py-4 text-sm text-gray-600">6회</td>
                  <td className="px-6 py-4 text-sm text-gray-600">정상</td>
                  <td className="px-6 py-4 text-sm text-gray-600">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">1회</td>
                  <td className="px-6 py-4 text-sm text-red-600">변비</td>
                  <td className="px-6 py-4 text-sm text-gray-600">5회</td>
                  <td className="px-6 py-4 text-sm text-gray-600">정상</td>
                  <td className="px-6 py-4 text-sm text-red-600">변비 증상</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">박순자</td>
                  <td className="px-6 py-4 text-sm text-gray-600">103호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">3회</td>
                  <td className="px-6 py-4 text-sm text-red-600">설사</td>
                  <td className="px-6 py-4 text-sm text-gray-600">7회</td>
                  <td className="px-6 py-4 text-sm text-gray-600">정상</td>
                  <td className="px-6 py-4 text-sm text-red-600">설사 증상</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 비위관 관리 테이블 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">비위관 관리 현황</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">삽입일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">최근 교체일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">다음 교체 예정일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">세척 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">문제 발생</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">최민수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">201호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-01</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-10</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-20</td>
                  <td className="px-6 py-4 text-sm text-gray-600">3회/일</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">없음</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">정미경</td>
                  <td className="px-6 py-4 text-sm text-gray-600">202호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2023-12-15</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-05</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-15</td>
                  <td className="px-6 py-4 text-sm text-gray-600">3회/일</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">막힘 의심</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 도뇨관 관리 테이블 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">도뇨관 관리 현황</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">유치일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">최근 교체일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">다음 교체 예정일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">관리 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">문제 발생</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                  <td className="px-6 py-4 text-sm text-gray-600">101호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-01</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-08</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-15</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2회/일</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">없음</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2023-12-20</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-03</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-10</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2회/일</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">감염 의심</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportElimination;
