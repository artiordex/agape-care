import React, { useState } from 'react';

// 결산 관리 컴포넌트
const ClosingManagement: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(1);

  // Mock 데이터
  const closingPeriods = [
    {
      id: '1',
      fiscalYear: 2026,
      periodMonth: 1,
      periodType: 'month',
      closeDate: '2026-02-05',
      closedAt: '2026-02-05 18:00:00',
      closedBy: '사무국장',
      totalDebit: 45000000,
      totalCredit: 45000000,
      journalCount: 18,
      status: 'closed'
    },
    {
      id: '2',
      fiscalYear: 2025,
      periodMonth: 12,
      periodType: 'month',
      closeDate: '2026-01-05',
      closedAt: '2026-01-05 17:30:00',
      closedBy: '사무국장',
      totalDebit: 48000000,
      totalCredit: 48000000,
      journalCount: 21,
      status: 'closed'
    }
  ];

  // 마감 전 체크리스트
  const checklistItems = [
    { id: 1, label: '미승인 전표 확인', status: 'pass', count: 0 },
    { id: 2, label: '차대평형 검증', status: 'pass', count: 0 },
    { id: 3, label: '미연결 증빙 확인', status: 'warning', count: 2 },
    { id: 4, label: '미수금/미지급금 확인', status: 'pass', count: 0 },
    { id: 5, label: '계좌잔액 대사', status: 'pending', count: 1 }
  ];

  // 재무제표 데이터
  const financialStatements = {
    incomeStatement: {
      revenue: {
        operatingRevenue: 29650000,
        nonOperatingRevenue: 0,
        total: 29650000
      },
      expense: {
        personnelExpense: 17268342,
        operatingExpense: 5320000,
        utilityExpense: 2650000,
        administrativeExpense: 180000,
        total: 25418342
      },
      netIncome: 4231658
    },
    balanceSheet: {
      assets: {
        currentAssets: 35000000,
        fixedAssets: 150000000,
        total: 185000000
      },
      liabilities: {
        currentLiabilities: 8500000,
        longTermLiabilities: 50000000,
        total: 58500000
      },
      equity: {
        capital: 100000000,
        retainedEarnings: 26500000,
        total: 126500000
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">결산 관리</h2>
          <p className="text-sm text-gray-600 mt-1">월마감/연마감 및 재무제표</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer">
            <i className="ri-file-text-line mr-2"></i>
            재무제표 출력
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer">
            <i className="ri-lock-line mr-2"></i>
            월마감 실행
          </button>
        </div>
      </div>

      {/* 기간 선택 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">결산 기간:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value={2026}>2026년</option>
            <option value={2025}>2025년</option>
            <option value={2024}>2024년</option>
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>{month}월</option>
            ))}
          </select>
        </div>
      </div>

      {/* 마감 전 체크리스트 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">마감 전 체크리스트</h3>
        <div className="space-y-3">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {item.status === 'pass' && (
                  <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                    <i className="ri-checkbox-circle-fill"></i>
                  </div>
                )}
                {item.status === 'warning' && (
                  <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full">
                    <i className="ri-error-warning-fill"></i>
                  </div>
                )}
                {item.status === 'pending' && (
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full">
                    <i className="ri-time-line"></i>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.label}</div>
                  {item.count > 0 && (
                    <div className="text-xs text-gray-500 mt-1">{item.count}건 확인 필요</div>
                  )}
                </div>
              </div>
              {item.status !== 'pass' && (
                <button className="text-teal-600 hover:text-teal-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                  확인하기 <i className="ri-arrow-right-line ml-1"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 재무제표 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 손익계산서 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">손익계산서</h3>
            <span className="text-sm text-gray-600">{selectedYear}년 {selectedMonth}월</span>
          </div>

          <div className="space-y-4">
            {/* 수익 */}
            <div>
              <div className="text-sm font-bold text-gray-900 mb-2">수익</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">영업수익</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.incomeStatement.revenue.operatingRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">영업외수익</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.incomeStatement.revenue.nonOperatingRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">수익 합계</span>
                  <span className="font-bold text-blue-600">
                    {financialStatements.incomeStatement.revenue.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 비용 */}
            <div>
              <div className="text-sm font-bold text-gray-900 mb-2">비용</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">인건비</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.incomeStatement.expense.personnelExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">운영비</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.incomeStatement.expense.operatingExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">공과금</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.incomeStatement.expense.utilityExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">관리비</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.incomeStatement.expense.administrativeExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">비용 합계</span>
                  <span className="font-bold text-red-600">
                    {financialStatements.incomeStatement.expense.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 당기순이익 */}
            <div className="pt-4 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">당기순이익</span>
                <span className="text-2xl font-bold text-teal-600">
                  {financialStatements.incomeStatement.netIncome.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 재무상태표 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">재무상태표</h3>
            <span className="text-sm text-gray-600">{selectedYear}년 {selectedMonth}월 말</span>
          </div>

          <div className="space-y-4">
            {/* 자산 */}
            <div>
              <div className="text-sm font-bold text-gray-900 mb-2">자산</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">유동자산</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.balanceSheet.assets.currentAssets.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">고정자산</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.balanceSheet.assets.fixedAssets.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">자산 합계</span>
                  <span className="font-bold text-blue-600">
                    {financialStatements.balanceSheet.assets.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 부채 */}
            <div>
              <div className="text-sm font-bold text-gray-900 mb-2">부채</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">유동부채</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.balanceSheet.liabilities.currentLiabilities.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">장기부채</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.balanceSheet.liabilities.longTermLiabilities.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">부채 합계</span>
                  <span className="font-bold text-red-600">
                    {financialStatements.balanceSheet.liabilities.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 자본 */}
            <div>
              <div className="text-sm font-bold text-gray-900 mb-2">자본</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">자본금</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.balanceSheet.equity.capital.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">이익잉여금</span>
                  <span className="font-medium text-gray-900">
                    {financialStatements.balanceSheet.equity.retainedEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">자본 합계</span>
                  <span className="font-bold text-purple-600">
                    {financialStatements.balanceSheet.equity.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 부채와 자본 합계 */}
            <div className="pt-4 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">부채와 자본 합계</span>
                <span className="text-2xl font-bold text-teal-600">
                  {(financialStatements.balanceSheet.liabilities.total + financialStatements.balanceSheet.equity.total).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 마감 이력 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">마감 이력</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회계연도</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">기간</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마감일</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">전표건수</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">차변합계</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">대변합계</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마감자</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {closingPeriods.map((period) => (
                <tr key={period.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {period.fiscalYear}년
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    {period.periodMonth}월
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      월마감
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {period.closeDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {period.journalCount}건
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {period.totalDebit.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {period.totalCredit.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {period.closedBy}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      마감완료
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClosingManagement;
