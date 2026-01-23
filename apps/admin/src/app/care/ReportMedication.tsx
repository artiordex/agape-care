import React, { useState } from 'react';

const ReportMedication: React.FC = () => {
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateeTo] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('전체');
  const [medicationType, setMedicationType] = useState('전체');

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`${format.toUpperCase()} 다운로드 준비 중입니다.`);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">투약제공 리포트</h2>

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
              onChange={(e) => setDateeTo(e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">약품 분류</label>
            <select
              value={medicationType}
              onChange={(e) => setMedicationType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="혈압약">혈압약</option>
              <option value="당뇨약">당뇨약</option>
              <option value="진통제">진통제</option>
              <option value="기타">기타</option>
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
              <span className="text-sm text-gray-600">총 처방</span>
              <i className="ri-medicine-bottle-line text-blue-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">156건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">복용완료</span>
              <i className="ri-check-line text-emerald-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-emerald-600">148건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">미복용</span>
              <i className="ri-close-line text-red-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-red-600">8건</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">복용률</span>
              <i className="ri-percent-line text-purple-500 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-purple-600">94.9%</p>
          </div>
        </div>

        {/* 수급자별 투약 현황 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">수급자별 투약 현황</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">처방수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">복용완료</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">미복용</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">복용률</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이상반응</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                  <td className="px-6 py-4 text-sm text-gray-600">101호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">30건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">30건</td>
                  <td className="px-6 py-4 text-sm text-gray-600">0건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">100%</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      없음
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">42건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">38건</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">4건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">90.5%</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      1건
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">박순자</td>
                  <td className="px-6 py-4 text-sm text-gray-600">103호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">28건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">27건</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">1건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">96.4%</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      없음
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">최민수</td>
                  <td className="px-6 py-4 text-sm text-gray-600">201호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">35건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">33건</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">2건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">94.3%</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      없음
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">정미경</td>
                  <td className="px-6 py-4 text-sm text-gray-600">202호</td>
                  <td className="px-6 py-4 text-sm text-gray-600">21건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">20건</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">1건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">95.2%</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      1건
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 약품별 투약 통계 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">약품별 투약 통계</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">약품명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">분류</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">처방 수급자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">총 투약 건수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">복용완료</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">미복용</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">복용률</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">아스피린 100mg</td>
                  <td className="px-6 py-4 text-sm text-gray-600">혈압약</td>
                  <td className="px-6 py-4 text-sm text-gray-600">3명</td>
                  <td className="px-6 py-4 text-sm text-gray-600">45건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600">45건</td>
                  <td className="px-6 py-4 text-sm text-gray-600">0건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">100%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">메트포르민 500mg</td>
                  <td className="px-6 py-4 text-sm text-gray-600">당뇨약</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2명</td>
                  <td className="px-6 py-4 text-sm text-gray-600">60건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600">56건</td>
                  <td className="px-6 py-4 text-sm text-red-600">4건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">93.3%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">이부프로펜 200mg</td>
                  <td className="px-6 py-4 text-sm text-gray-600">진통제</td>
                  <td className="px-6 py-4 text-sm text-gray-600">4명</td>
                  <td className="px-6 py-4 text-sm text-gray-600">36건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600">34건</td>
                  <td className="px-6 py-4 text-sm text-red-600">2건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">94.4%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">아리셉트 5mg</td>
                  <td className="px-6 py-4 text-sm text-gray-600">치매약</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2명</td>
                  <td className="px-6 py-4 text-sm text-gray-600">30건</td>
                  <td className="px-6 py-4 text-sm text-emerald-600">29건</td>
                  <td className="px-6 py-4 text-sm text-red-600">1건</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">96.7%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 미복용 사유 분석 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">미복용 사유 분석</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">거부</span>
                <span className="text-sm font-semibold text-gray-900">4건 (50%)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">구토</span>
                <span className="text-sm font-semibold text-gray-900">2건 (25%)</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">수면중</span>
                <span className="text-sm font-semibold text-gray-900">1건 (12.5%)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-sm text-gray-700">기타</span>
                <span className="text-sm font-semibold text-gray-900">1건 (12.5%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 이상반응 기록 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">이상반응 기록</h3>
          <div className="space-y-3">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="ri-alert-line text-orange-600 text-xl"></i>
                  <span className="font-semibold text-orange-900">이상반응</span>
                </div>
                <span className="text-sm text-orange-600">2024-01-13</span>
              </div>
              <p className="text-sm text-orange-800 mb-1">
                <strong>정미경 (202호)</strong> - 아리셉트 5mg
              </p>
              <p className="text-sm text-orange-700">
                투약 후 30분 뒤 구토 증상 발생, 의사 상담 진행
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
                <strong>이철수 (102호)</strong> - 이부프로펜 200mg
              </p>
              <p className="text-sm text-orange-700">
                신규 약물 투여 후 피부 발진 발생, 약물 중단 및 관찰 중
              </p>
            </div>
          </div>
        </div>

        {/* 시간대별 투약 현황 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">시간대별 투약 현황</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">아침</div>
              <div className="text-2xl font-bold text-blue-700 mb-1">52건</div>
              <div className="text-xs text-blue-600">복용률: 96.2%</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="text-sm text-emerald-600 mb-1">점심</div>
              <div className="text-2xl font-bold text-emerald-700 mb-1">38건</div>
              <div className="text-xs text-emerald-600">복용률: 94.7%</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-orange-600 mb-1">저녁</div>
              <div className="text-2xl font-bold text-orange-700 mb-1">48건</div>
              <div className="text-xs text-orange-600">복용률: 93.8%</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600 mb-1">취침</div>
              <div className="text-2xl font-bold text-purple-700 mb-1">18건</div>
              <div className="text-xs text-purple-600">복용률: 94.4%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMedication;
