import React, { useState } from 'react';

const ReportNursing: React.FC = () => {
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('전체');

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`${format.toUpperCase()} 다운로드 준비 중입니다.`);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">통합 간호제공 리포트</h2>

        {/* 필터 바 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
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
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">총 간호기록</span>
              <i className="ri-file-list-line text-blue-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">156건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">이상반응</span>
              <i className="ri-alert-line text-orange-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-orange-600">3건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">응급상황</span>
              <i className="ri-alarm-warning-line text-red-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-red-600">1건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">평균 바이탈 측정</span>
              <i className="ri-heart-pulse-line text-emerald-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">2.3회/일</p>
          </div>
        </div>

        {/* 바이탈 요약 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">바이탈 요약 (기간 평균)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">혈압 (평균)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">맥박 (평균)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">체온 (평균)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">혈당 (평균)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이상치</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                  <td className="px-6 py-4 text-sm text-gray-600">101호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">125/80</td>
                  <td className="px-6 py-4 text-sm text-gray-600">72</td>
                  <td className="px-6 py-4 text-sm text-gray-600">36.5°C</td>
                  <td className="px-6 py-4 text-sm text-gray-600">105</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      정상
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">155/95</td>
                  <td className="px-6 py-4 text-sm text-gray-600">78</td>
                  <td className="px-6 py-4 text-sm text-gray-600">36.7°C</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">180</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      고혈압/고혈당
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">박순자</td>
                  <td className="px-6 py-4 text-sm text-gray-600">103호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">118/75</td>
                  <td className="px-6 py-4 text-sm text-gray-600">68</td>
                  <td className="px-6 py-4 text-sm text-gray-600">36.4°C</td>
                  <td className="px-6 py-4 text-sm text-gray-600">98</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      정상
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 이상반응/응급 발생 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">이상반응 및 응급상황</h3>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
                  <span className="font-semibold text-red-900">응급상황</span>
                </div>
                <span className="text-sm text-red-600">2024-01-14</span>
              </div>
              <p className="text-sm text-red-800 mb-1">
                <strong>최민수 (201호)</strong> - 낙상 발생
              </p>
              <p className="text-sm text-red-700">
                화장실 이동 중 낙상, 119 연락 및 병원 이송
              </p>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="ri-alert-line text-orange-600 text-xl"></i>
                  <span className="font-semibold text-orange-900">이상반응</span>
                </div>
                <span className="text-sm text-orange-600">2024-01-13</span>
              </div>
              <p className="text-sm text-orange-800 mb-1">
                <strong>정미경 (202호)</strong> - 투약 후 구토
              </p>
              <p className="text-sm text-orange-700">
                아침 투약 후 30분 뒤 구토 증상, 의사 상담 진행
              </p>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="ri-alert-line text-orange-600 text-xl"></i>
                  <span className="font-semibold text-orange-900">이상반응</span>
                </div>
                <span className="text-sm text-orange-600">2024-01-12</span>
              </div>
              <p className="text-sm text-orange-800 mb-1">
                <strong>이철수 (102호)</strong> - 피부 발진
              </p>
              <p className="text-sm text-orange-700">
                신규 약물 투여 후 피부 발진 발생, 약물 중단 및 관찰 중
              </p>
            </div>
          </div>
        </div>

        {/* 간호기록 주요 키워드 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">간호기록 주요 키워드</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">증상/문제</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">통증</span>
                  <span className="text-sm font-medium text-gray-900">12건</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">낙상위험</span>
                  <span className="text-sm font-medium text-gray-900">8건</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">욕창위험</span>
                  <span className="text-sm font-medium text-gray-900">6건</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">탈수</span>
                  <span className="text-sm font-medium text-gray-900">4건</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">중재/처치</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">체위변경</span>
                  <span className="text-sm font-medium text-gray-900">45건</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">피부관찰</span>
                  <span className="text-sm font-medium text-gray-900">38건</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">수분섭취 독려</span>
                  <span className="text-sm font-medium text-gray-900">22건</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">통증관리</span>
                  <span className="text-sm font-medium text-gray-900">15건</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportNursing;
