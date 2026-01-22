import { useState } from 'react';
import * as XLSX from 'xlsx';
import { accountingCategories, accountingTransactions, monthlySummary, paymentMethods } from '../../../../../src/mocks/accounting';

// 새로운 ERP 컴포넌트 import
import AccountManagement from './AccountManagement';
import ClosingManagement from './ClosingManagement';
import JournalManagement from './JournalManagement';
import PartnerManagement from './PartnerManagement';

export default function AccountingManagement() {
  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journal' | 'account' | 'partner' | 'closing' | 'transactions' | 'statistics'>('dashboard');
  const [quickJournalType, setQuickJournalType] = useState<string | null>(null);

  // 필터 상태 추가
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // 모달 상태 추가
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  // 현재 월 데이터
  const currentSummary = monthlySummary[selectedMonth as keyof typeof monthlySummary] || monthlySummary['2026-01'];

  // 필터링된 거래 내역
  const filteredTransactions = accountingTransactions.filter(t => {
    const matchMonth = t.date.startsWith(selectedMonth);
    const matchType = filterType === 'all' || t.type === filterType;
    const matchCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchMonth && matchType && matchCategory;
  });

  // 카테고리별 통계 계산
  const getCategoryStats = (type: 'income' | 'expense') => {
    const categories = type === 'income' ? currentSummary.incomeByCategory : currentSummary.expenseByCategory;
    const total = type === 'income' ? currentSummary.totalIncome : currentSummary.totalExpense;

    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / total * 100).toFixed(1)
    })).sort((a, b) => b.amount - a.amount);
  };

  // 엑셀 다운로드
  const handleExcelDownload = () => {
    const excelData = filteredTransactions.map(t => ({
      '날짜': t.date,
      '구분': t.type === 'income' ? '수입' : '지출',
      '카테고리': t.category,
      '세부분류': t.subCategory || '-',
      '내용': t.description,
      '금액': t.amount,
      '결제방법': t.paymentMethod,
      '상태': t.status === 'completed' ? '완료' : '대기',
      '메모': t.memo || '-',
      '등록자': t.createdBy,
      '등록일시': t.createdAt
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '회계내역');

    // 요약 시트 추가
    const summaryData = [
      { '항목': '총 수입', '금액': currentSummary.totalIncome },
      { '항목': '총 지출', '금액': currentSummary.totalExpense },
      { '항목': '수지차액', '금액': currentSummary.balance }
    ];
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, '요약');

    XLSX.writeFile(wb, `회계내역_${selectedMonth}.xlsx`);
  };

  // 거래 추가
  const handleAddTransaction = () => {
    setShowAddModal(true);
  };

  // 거래 삭제
  const handleDeleteTransaction = (id: string) => {
    if (confirm('이 거래 내역을 삭제하시겠습니까?')) {
      alert('거래 내역이 삭제되었습니다.');
    }
  };

  // ERP 탭 렌더링
  if (activeTab === 'journal') {
    return <JournalManagement />;
  }

  if (activeTab === 'account') {
    return <AccountManagement />;
  }

  if (activeTab === 'partner') {
    return <PartnerManagement />;
  }

  if (activeTab === 'closing') {
    return <ClosingManagement />;
  }

  const handleQuickJournal = (type: string) => {
    setQuickJournalType(type);
    setActiveTab('journal');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">회계 관리</h2>
          <p className="text-sm text-gray-600 mt-1">ERP 수준의 복식부기 회계 시스템</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExcelDownload}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-file-excel-line mr-2"></i>
            엑셀 다운로드
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>
            전표 입력
          </button>
        </div>
      </div>

      {/* 월 선택 */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">기준월:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* 탭 네비게이션 - ERP 메뉴 추가 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'dashboard'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-dashboard-line mr-2"></i>
            대시보드
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'journal'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-file-list-3-line mr-2"></i>
            전표 관리
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'account'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-list-check mr-2"></i>
            계정과목
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'partner'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-building-line mr-2"></i>
            거래처
          </button>
          <button
            onClick={() => setActiveTab('closing')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'closing'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-lock-line mr-2"></i>
            결산
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'transactions'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-file-list-3-line mr-2"></i>
            거래 내역
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'statistics'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-bar-chart-box-line mr-2"></i>
            통계 분석
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {activeTab === 'dashboard' && (
            <div className="p-6 space-y-6">
              {/* 요약 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg">
                      <i className="ri-arrow-down-circle-line text-2xl"></i>
                    </div>
                    <span className="text-sm opacity-90">총 수입</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {currentSummary.totalIncome.toLocaleString()}원
                  </div>
                  <div className="text-sm opacity-90">
                    {currentSummary.transactionCount.income}건
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg">
                      <i className="ri-arrow-up-circle-line text-2xl"></i>
                    </div>
                    <span className="text-sm opacity-90">총 지출</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {currentSummary.totalExpense.toLocaleString()}원
                  </div>
                  <div className="text-sm opacity-90">
                    {currentSummary.transactionCount.expense}건
                  </div>
                </div>

                <div className={`bg-gradient-to-br ${
                  currentSummary.balance >= 0
                    ? 'from-teal-500 to-emerald-600'
                    : 'from-orange-500 to-red-600'
                } rounded-xl p-6 text-white shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg">
                      <i className="ri-wallet-3-line text-2xl"></i>
                    </div>
                    <span className="text-sm opacity-90">수지차액</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {currentSummary.balance >= 0 ? '+' : '-'}
                    {Math.abs(currentSummary.balance).toLocaleString()}원
                  </div>
                  <div className="text-sm opacity-90">
                    {((currentSummary.balance / currentSummary.totalIncome) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* 카테고리별 수입/지출 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 수입 카테고리 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mr-3">
                      <i className="ri-funds-line"></i>
                    </div>
                    카테고리별 수입
                  </h3>
                  <div className="space-y-3">
                    {getCategoryStats('income').map((stat) => (
                      <div key={stat.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-sm text-gray-700">{stat.category}</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {stat.amount.toLocaleString()}원
                          </div>
                          <div className="text-xs text-gray-500">{stat.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 지출 카테고리 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg mr-3">
                      <i className="ri-shopping-cart-line"></i>
                    </div>
                    카테고리별 지출
                  </h3>
                  <div className="space-y-3">
                    {getCategoryStats('expense').map((stat) => (
                      <div key={stat.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-sm text-gray-700">{stat.category}</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {stat.amount.toLocaleString()}원
                          </div>
                          <div className="text-xs text-gray-500">{stat.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 최근 거래 내역 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">최근 거래 내역</h3>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className="text-teal-600 hover:text-teal-800 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    전체보기 <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </div>
                <div className="space-y-3">
                  {filteredTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          transaction.type === 'income'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          <i className={`${
                            transaction.type === 'income'
                              ? 'ri-arrow-down-circle-fill'
                              : 'ri-arrow-up-circle-fill'
                          } text-xl`}></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">
                            {transaction.date} · {transaction.category} · {transaction.paymentMethod}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        transaction.type === 'income' ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount.toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="p-6">
              {/* 필터 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      filterType === 'all'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setFilterType('income')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      filterType === 'income'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    수입
                  </button>
                  <button
                    onClick={() => setFilterType('expense')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      filterType === 'expense'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    지출
                  </button>
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="all">전체 카테고리</option>
                  {[...accountingCategories.income, ...accountingCategories.expense].map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* 거래 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">구분</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">내용</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">결제방법</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'income'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'income' ? '수입' : '지출'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <div>{transaction.description}</div>
                          {transaction.memo && (
                            <div className="text-xs text-gray-500 mt-1">{transaction.memo}</div>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                          <span className={`font-semibold ${
                            transaction.type === 'income' ? 'text-blue-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}
                            {transaction.amount.toLocaleString()}원
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                          {transaction.paymentMethod}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status === 'completed' ? '완료' : '대기'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 mr-2 cursor-pointer"
                            title="수정"
                          >
                            <i className="ri-edit-line text-lg"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="삭제"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 월별 추이 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">월별 수입/지출 추이</h3>
                  <div className="space-y-4">
                    {Object.entries(monthlySummary).reverse().map(([month, data]) => (
                      <div key={month} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{month}</span>
                          <span className={`text-sm font-semibold ${
                            data.balance >= 0 ? 'text-teal-600' : 'text-red-600'
                          }`}>
                            {data.balance >= 0 ? '+' : '-'}
                            {Math.abs(data.balance).toLocaleString()}원
                          </span>
                        </div>
                        <div className="flex gap-2 h-8">
                          <div
                            className="bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(data.totalIncome / 35000000) * 100}%` }}
                            title={`수입: ${data.totalIncome.toLocaleString()}원`}
                          >
                            {data.totalIncome >= 10000000 && `${(data.totalIncome / 10000).toFixed(0)}만`}
                          </div>
                          <div
                            className="bg-red-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(data.totalExpense / 35000000) * 100}%` }}
                            title={`지출: ${data.totalExpense.toLocaleString()}원`}
                          >
                            {data.totalExpense >= 10000000 && `${(data.totalExpense / 10000).toFixed(0)}만`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 수입 구성비 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">수입 구성비</h3>
                  <div className="space-y-4">
                    {getCategoryStats('income').map((stat, index) => (
                      <div key={stat.category} className="flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold ${
                          index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-400' : 'bg-blue-300'
                        }`}>
                          {stat.percentage}%
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{stat.category}</div>
                          <div className="text-xs text-gray-500">{stat.amount.toLocaleString()}원</div>
                        </div>
                        <div className="w-20 h-20 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="3"
                              strokeDasharray={`${parseFloat(stat.percentage)} ${100 - parseFloat(stat.percentage)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 지출 구성비 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">지출 구성비</h3>
                  <div className="space-y-4">
                    {getCategoryStats('expense').map((stat, index) => (
                      <div key={stat.category} className="flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold ${
                          index === 0 ? 'bg-red-500' : index === 1 ? 'bg-red-400' : 'bg-red-300'
                        }`}>
                          {stat.percentage}%
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{stat.category}</div>
                          <div className="text-xs text-gray-500">{stat.amount.toLocaleString()}원</div>
                        </div>
                        <div className="w-20 h-20 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="3"
                              strokeDasharray={`${parseFloat(stat.percentage)} ${100 - parseFloat(stat.percentage)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 결제 방법 통계 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">결제 방법별 통계</h3>
                  <div className="space-y-3">
                    {(() => {
                      const paymentStats = filteredTransactions.reduce((acc: any, t) => {
                        if (!acc[t.paymentMethod]) {
                          acc[t.paymentMethod] = { count: 0, amount: 0 };
                        }
                        acc[t.paymentMethod].count += 1;
                        acc[t.paymentMethod].amount += t.amount;
                        return acc;
                      }, {});

                      return Object.entries(paymentStats).map(([method, data]: [string, any]) => (
                        <div key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-teal-100 text-teal-600 rounded-lg">
                              <i className="ri-bank-card-line"></i>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{method}</div>
                              <div className="text-xs text-gray-500">{data.count}건</div>
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {data.amount.toLocaleString()}원
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 거래 등록 모달 */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">거래 등록</h2>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* 거래 구분 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">거래 구분</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setTransactionType('income')}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          transactionType === 'income'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <i className="ri-arrow-down-circle-line mr-2"></i>
                        수입
                      </button>
                      <button
                        onClick={() => setTransactionType('expense')}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          transactionType === 'expense'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <i className="ri-arrow-up-circle-line mr-2"></i>
                        지출
                      </button>
                    </div>
                  </div>

                  {/* 날짜 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* 카테고리 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">선택하세요</option>
                      {(transactionType === 'income' ? accountingCategories.income : accountingCategories.expense).map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* 내용 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="거래 내용을 입력하세요"
                    />
                  </div>

                  {/* 금액 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">금액</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="0"
                    />
                  </div>

                  {/* 결제방법 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">결제방법</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      {paymentMethods.map((method) => (
                        <option key={method.value} value={method.value}>{method.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* 메모 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      rows={3}
                      placeholder="추가 메모 (선택사항)"
                    ></textarea>
                  </div>

                  {/* 버튼 */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        alert('거래가 등록되었습니다.');
                        setShowAddModal(false);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium whitespace-nowrap cursor-pointer"
                    >
                      등록하기
                    </button>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
