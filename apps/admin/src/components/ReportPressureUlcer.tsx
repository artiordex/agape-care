import React, { useState } from 'react';

const ReportPressureUlcer: React.FC = () => {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">욕창간호 제공 리포트</h2>

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
              <span className="text-sm text-gray-600">위험군 수급자</span>
              <i className="ri-alert-line text-orange-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">4명</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">욕창 발생</span>
              <i className="ri-error-warning-line text-red-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-red-600">2건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">호전</span>
              <i className="ri-arrow-up-line text-emerald-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-emerald-600">1건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">악화</span>
              <i className="ri-arrow-down-line text-red-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-red-600">0건</p>
          </div>
        </div>

        {/* 위험군 추이 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">위험군 추이</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이전 위험도</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">현재 위험도</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Braden 점수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">변화</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">최근 평가일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                  <td className="px-6 py-4 text-sm text-gray-600">101호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      중위험
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      저위험
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">16점</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-emerald-600 text-sm">
                      <i className="ri-arrow-up-line mr-1"></i>
                      호전
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-15</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      고위험
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      고위험
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">10점</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-gray-600 text-sm">
                      <i className="ri-subtract-line mr-1"></i>
                      유지
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-14</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">박순자</td>
                  <td className="px-6 py-4 text-sm text-gray-600">103호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      저위험
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      저위험
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">18점</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-gray-600 text-sm">
                      <i className="ri-subtract-line mr-1"></i>
                      유지
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-13</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">최민수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">201호</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      중위험
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      고위험
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">11점</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-red-600 text-sm">
                      <i className="ri-arrow-down-line mr-1"></i>
                      악화
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 욕창 발생 및 경과 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">욕창 발생 및 경과</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">발생 부위</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">단계</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">발생일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">사진</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">천골부</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      2단계
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-10</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      호전중
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      <i className="ri-image-line mr-1"></i>
                      보기
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">최민수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">201호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">좌측 둔부</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      3단계
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">2024-01-08</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                      관찰중
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      <i className="ri-image-line mr-1"></i>
                      보기
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 조치 항목 수행률 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">조치 항목 수행률</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">체위변경 (2시간마다)</span>
                <span className="text-sm font-semibold text-gray-900">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">피부 관찰 (1일 2회)</span>
                <span className="text-sm font-semibold text-gray-900">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">드레싱 교체</span>
                <span className="text-sm font-semibold text-gray-900">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">압력분산 매트리스 사용</span>
                <span className="text-sm font-semibold text-gray-900">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">영양 상태 모니터링</span>
                <span className="text-sm font-semibold text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 드레싱 기록 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">드레싱 기록</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">부위</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">처치내용</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">사용 드레싱</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">담당자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">천골부</td>
                  <td className="px-6 py-4 text-sm text-gray-600">세척 후 드레싱 교체</td>
                  <td className="px-6 py-4 text-sm text-gray-600">하이드로콜로이드</td>
                  <td className="px-6 py-4 text-sm text-gray-600">박간호사</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">최민수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">좌측 둔부</td>
                  <td className="px-6 py-4 text-sm text-gray-600">괴사조직 제거 후 드레싱</td>
                  <td className="px-6 py-4 text-sm text-gray-600">폼 드레싱</td>
                  <td className="px-6 py-4 text-sm text-gray-600">김간호사</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">2024-01-14</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">천골부</td>
                  <td className="px-6 py-4 text-sm text-gray-600">상태 관찰 및 드레싱 교체</td>
                  <td className="px-6 py-4 text-sm text-gray-600">하이드로콜로이드</td>
                  <td className="px-6 py-4 text-sm text-gray-600">박간호사</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPressureUlcer;
