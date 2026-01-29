'use client';

import React, { useState } from 'react';

const ReportClinic: React.FC = () => {
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('전체');
  const [clinicType, setClinicType] = useState('전체');

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`${format.toUpperCase()} 다운로드 준비 중입니다.`);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="border-b border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">병의원/계약의사 진료내역 리포트</h2>

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
            <label className="mb-1 block text-sm font-medium text-gray-700">진료 유형</label>
            <select
              value={clinicType}
              onChange={e => setClinicType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="계약의사">계약의사</option>
              <option value="병원방문">병원방문</option>
              <option value="응급">응급</option>
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
          </div>
        </div>
      </div>

      {/* --- 컨텐츠 --- */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">총 진료 건수</span>
              <i className="ri-hospital-line text-xl text-blue-500"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">24건</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">계약의사 진료</span>
              <i className="ri-stethoscope-line text-xl text-emerald-500"></i>
            </div>
            <p className="text-2xl font-bold text-emerald-600">18건</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">병원 방문</span>
              <i className="ri-car-line text-xl text-orange-500"></i>
            </div>
            <p className="text-2xl font-bold text-orange-600">5건</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">응급 진료</span>
              <i className="ri-alarm-warning-line text-xl text-red-500"></i>
            </div>
            <p className="text-2xl font-bold text-red-600">1건</p>
          </div>
        </div>

        {/* 진료 내역 테이블 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">진료 내역</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">진료일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">진료 유형</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">진료기관/의사</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">진단명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">처방</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">첨부</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {/* 샘플 데이터 */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2024-01-15</td>
                  <td className="px-6 py-4 font-medium">김영희</td>
                  <td className="px-6 py-4 text-gray-600">101호</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">계약의사</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">김의사</td>
                  <td className="px-6 py-4 text-gray-600">고혈압</td>
                  <td className="cursor-pointer px-6 py-4 text-sm font-medium text-emerald-600">처방 연결 →</td>
                  <td className="cursor-pointer px-6 py-4 text-blue-600">
                    <i className="ri-attachment-line"></i>
                  </td>
                </tr>
                {/* 더 많은 데이터 생략 */}
              </tbody>
            </table>
          </div>
        </div>

        {/* 진단명별 통계 */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">진단명별 통계</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <StatRow label="고혈압" value="8건" />
              <StatRow label="당뇨병" value="6건" />
              <StatRow label="관절염" value="4건" />
              <StatRow label="치매" value="3건" />
            </div>

            <div>
              <StatRow label="폐렴" value="2건" />
              <StatRow label="낙상" value="1건" />
              <StatRow label="정기검진" value="5건" />
              <StatRow label="기타" value="3건" />
            </div>
          </div>
        </div>

        {/* 처방 연계 현황 */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">처방 연계 현황</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">진료일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">진단명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">처방 약품</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">투약 시작일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">상태</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">2024-01-15</td>
                  <td className="px-6 py-4">김영희</td>
                  <td className="px-6 py-4">고혈압</td>
                  <td className="px-6 py-4">아스피린 100mg</td>
                  <td className="px-6 py-4">2024-01-16</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">투약중</span>
                  </td>
                </tr>

                {/* 생략 */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportClinic;

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-lg bg-gray-50 p-3">
      <span className="text-sm text-gray-700">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}
