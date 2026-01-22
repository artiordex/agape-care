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
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">배설/비위관/도뇨관 관리 리포트</h2>

        {/* 필터 바 */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 (시작)</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 (종료)</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">수급자</label>
            <select
              value={selectedBeneficiary}
              onChange={(e) => setSelectedBeneficiary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="김영희">김영희</option>
              <option value="이철수">이철수</option>
              <option value="박순자">박순자</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">생활실</label>
            <select
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="1층">1층</option>
              <option value="2층">2층</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
            <i className="ri-search-line mr-2"></i>
            조회
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('pdf')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <i className="ri-file-pdf-line mr-2"></i>
              PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <i className="ri-file-excel-line mr-2"></i>
              엑셀
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <i className="ri-file-text-line mr-2"></i>
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">배변 평균</span>
              <i className="ri-file-list-line text-blue-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">2.3회/일</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">배뇨 평균</span>
              <i className="ri-file-list-line text-emerald-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">5.8회/일</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">비위관 관리</span>
              <i className="ri-syringe-line text-orange-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">3명</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">도뇨관 관리</span>
              <i className="ri-test-tube-line text-purple-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">2명</p>
          </div>
        </div>

        {/* 배설 기록 테이블 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">배설 기록</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">배변 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">배변 성상</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">배뇨 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">배뇨 성상</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이상 소견</th>
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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">비위관 관리 현황</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">삽입일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">최근 교체일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">다음 교체 예정일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">세척 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">문제 발생</th>
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
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      없음
                    </span>
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
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      막힘 의심
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 도뇨관 관리 테이블 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">도뇨관 관리 현황</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">유치일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">최근 교체일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">다음 교체 예정일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리 횟수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">문제 발생</th>
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
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      없음
                    </span>
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
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      감염 의심
                    </span>
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
