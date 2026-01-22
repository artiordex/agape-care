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
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">병의원/계약의사 진료내역 리포트</h2>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">진료 유형</label>
            <select
              value={clinicType}
              onChange={(e) => setClinicType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="계약의사">계약의사</option>
              <option value="병원방문">병원방문</option>
              <option value="응급">응급</option>
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
              <span className="text-sm text-gray-600">총 진료 건수</span>
              <i className="ri-hospital-line text-blue-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">24건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">계약의사 진료</span>
              <i className="ri-stethoscope-line text-emerald-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-emerald-600">18건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">병원 방문</span>
              <i className="ri-car-line text-orange-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-orange-600">5건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">응급 진료</span>
              <i className="ri-alarm-warning-line text-red-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-red-600">1건</p>
          </div>
        </div>

        {/* 진료 내역 테이블 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">진료 내역</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">진료일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">진료 유형</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">진료기관/의사</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">진단명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">처방</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">첨부</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                  <td className="px-6 py-4 text-sm text-gray-600">101호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      계약의사
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">김의사</td>
                  <td className="px-6 py-4 text-sm text-gray-600">고혈압</td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      처방 연결 →
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <i className="ri-attachment-line"></i>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-14</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">최민수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">201호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      응급
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">○○병원 응급실</td>
                  <td className="px-6 py-4 text-sm text-gray-600">낙상으로 인한 타박상</td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      처방 연결 →
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <i className="ri-attachment-line"></i>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-13</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      병원방문
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">△△내과</td>
                  <td className="px-6 py-4 text-sm text-gray-600">당뇨병</td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      처방 연결 →
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <i className="ri-attachment-line"></i>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-12</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">박순자</td>
                  <td className="px-6 py-4 text-sm text-gray-600">103호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      계약의사
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">이의사</td>
                  <td className="px-6 py-4 text-sm text-gray-600">정기검진</td>
                  <td className="px-6 py-4 text-sm text-gray-600">-</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <i className="ri-attachment-line"></i>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-11</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">정미경</td>
                  <td className="px-6 py-4 text-sm text-gray-600">202호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      병원방문
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">□□정형외과</td>
                  <td className="px-6 py-4 text-sm text-gray-600">관절염</td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      처방 연결 →
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <i className="ri-attachment-line"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 진단명별 통계 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">진단명별 통계</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">고혈압</span>
                <span className="text-sm font-semibold text-gray-900">8건</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">당뇨병</span>
                <span className="text-sm font-semibold text-gray-900">6건</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">관절염</span>
                <span className="text-sm font-semibold text-gray-900">4건</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">치매</span>
                <span className="text-sm font-semibold text-gray-900">3건</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">폐렴</span>
                <span className="text-sm font-semibold text-gray-900">2건</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">낙상</span>
                <span className="text-sm font-semibold text-gray-900">1건</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">정기검진</span>
                <span className="text-sm font-semibold text-gray-900">5건</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">기타</span>
                <span className="text-sm font-semibold text-gray-900">3건</span>
              </div>
            </div>
          </div>
        </div>

        {/* 처방 연계 현황 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">처방 연계 현황</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">진료일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">진단명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">처방 약품</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">투약 시작일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                  <td className="px-6 py-4 text-sm text-gray-600">고혈압</td>
                  <td className="px-6 py-4 text-sm text-gray-600">아스피린 100mg</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-16</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      투약중
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-13</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">당뇨병</td>
                  <td className="px-6 py-4 text-sm text-gray-600">메트포르민 500mg</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-14</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      투약중
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-11</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">정미경</td>
                  <td className="px-6 py-4 text-sm text-gray-600">관절염</td>
                  <td className="px-6 py-4 text-sm text-gray-600">이부프로펜 200mg</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-12</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      투약중
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

export default ReportClinic;
