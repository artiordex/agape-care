'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

/* ============================================
   데이터 정의
============================================ */

// 카테고리
const CATEGORIES = {
  income: [
    { value: 'subsidy', label: '정부보조금' },
    { value: 'benefit', label: '장기요양급여' },
    { value: 'self_pay', label: '본인부담금' },
  ],
  expense: [
    { value: 'personnel', label: '인건비' },
    { value: 'operation', label: '운영비' },
    { value: 'utility', label: '공과금' },
    { value: 'meal', label: '식자재비' },
  ],
};

// 결제방법
const PAYMENT_METHODS = [
  { value: 'transfer', label: '계좌이체' },
  { value: 'card', label: '카드' },
  { value: 'cash', label: '현금' },
];

// 월별 요약
const MONTHLY_SUMMARY: Record<string, any> = {
  '2026-01': {
    totalIncome: 35000000,
    totalExpense: 28500000,
    balance: 6500000,
    transactionCount: { income: 12, expense: 45 },
    incomeByCategory: {
      정부보조금: 15000000,
      장기요양급여: 15000000,
      본인부담금: 5000000,
    },
    expenseByCategory: {
      인건비: 18000000,
      운영비: 5000000,
      식자재비: 3500000,
      공과금: 2000000,
    },
  },
  '2025-12': {
    totalIncome: 33000000,
    totalExpense: 27000000,
    balance: 6000000,
    transactionCount: { income: 11, expense: 42 },
    incomeByCategory: {
      정부보조금: 14000000,
      장기요양급여: 14000000,
      본인부담금: 5000000,
    },
    expenseByCategory: {
      인건비: 17000000,
      운영비: 5000000,
      식자재비: 3000000,
      공과금: 2000000,
    },
  },
};

// 거래 내역
const TRANSACTIONS = [
  {
    id: 'T001',
    date: '2026-01-05',
    type: 'income',
    category: '정부보조금',
    description: '요양원 정부지원금 입금',
    amount: 15000000,
    paymentMethod: '계좌이체',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-05 14:30:00',
  },
  {
    id: 'T002',
    date: '2026-01-06',
    type: 'income',
    category: '장기요양급여',
    description: '1월 장기요양급여 지급',
    amount: 15000000,
    paymentMethod: '계좌이체',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-06 10:00:00',
  },
  {
    id: 'T003',
    date: '2026-01-10',
    type: 'income',
    category: '본인부담금',
    description: '입소자 본인부담금 납부',
    amount: 5000000,
    paymentMethod: '카드',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-10 15:20:00',
  },
  {
    id: 'T004',
    date: '2026-01-03',
    type: 'expense',
    category: '인건비',
    description: '직원 급여 지급',
    amount: 18000000,
    paymentMethod: '계좌이체',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-03 16:00:00',
  },
  {
    id: 'T005',
    date: '2026-01-07',
    type: 'expense',
    category: '운영비',
    description: '청소용품 구매',
    amount: 500000,
    paymentMethod: '현금',
    status: 'completed',
    memo: '',
    createdBy: '사무국장',
    createdAt: '2026-01-07 11:30:00',
  },
];

// 계정과목
const ACCOUNTS = [
  {
    id: '1',
    code: '101',
    name: '현금',
    accountClass: 'asset',
    accountType: 'current_asset',
    isActive: true,
    isDetail: true,
  },
  {
    id: '2',
    code: '102',
    name: '보통예금',
    accountClass: 'asset',
    accountType: 'current_asset',
    isActive: true,
    isDetail: true,
  },
  {
    id: '3',
    code: '111',
    name: '미수금',
    accountClass: 'asset',
    accountType: 'current_asset',
    isActive: true,
    isDetail: true,
  },
  {
    id: '4',
    code: '201',
    name: '비품',
    accountClass: 'asset',
    accountType: 'fixed_asset',
    isActive: true,
    isDetail: true,
  },
  {
    id: '5',
    code: '301',
    name: '미지급금',
    accountClass: 'liability',
    accountType: 'current_liability',
    isActive: true,
    isDetail: true,
  },
  {
    id: '6',
    code: '302',
    name: '예수금',
    accountClass: 'liability',
    accountType: 'current_liability',
    isActive: true,
    isDetail: true,
  },
  {
    id: '7',
    code: '401',
    name: '자본금',
    accountClass: 'equity',
    accountType: 'capital',
    isActive: true,
    isDetail: true,
  },
  {
    id: '8',
    code: '501',
    name: '장기요양급여수익',
    accountClass: 'revenue',
    accountType: 'operating_revenue',
    isActive: true,
    isDetail: true,
  },
  {
    id: '9',
    code: '502',
    name: '본인부담금수익',
    accountClass: 'revenue',
    accountType: 'operating_revenue',
    isActive: true,
    isDetail: true,
  },
  {
    id: '10',
    code: '601',
    name: '급여',
    accountClass: 'expense',
    accountType: 'personnel_expense',
    isActive: true,
    isDetail: true,
  },
  {
    id: '11',
    code: '604',
    name: '국민연금',
    accountClass: 'expense',
    accountType: 'personnel_expense',
    isActive: true,
    isDetail: true,
  },
  {
    id: '12',
    code: '611',
    name: '식자재비',
    accountClass: 'expense',
    accountType: 'operating_expense',
    isActive: true,
    isDetail: true,
  },
  {
    id: '13',
    code: '621',
    name: '전기료',
    accountClass: 'expense',
    accountType: 'utility_expense',
    isActive: true,
    isDetail: true,
  },
];

// 결산 데이터
const CLOSING_PERIODS = [
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
    status: 'closed',
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
    status: 'closed',
  },
];

const CHECKLIST_ITEMS = [
  { id: 1, label: '미승인 전표 확인', status: 'pass', count: 0 },
  { id: 2, label: '차대평형 검증', status: 'pass', count: 0 },
  { id: 3, label: '미연결 증빙 확인', status: 'warning', count: 2 },
  { id: 4, label: '미수금/미지급금 확인', status: 'pass', count: 0 },
  { id: 5, label: '계좌잔액 대사', status: 'pending', count: 1 },
];

const FINANCIAL_STATEMENTS = {
  incomeStatement: {
    revenue: {
      operatingRevenue: 29650000,
      nonOperatingRevenue: 0,
      total: 29650000,
    },
    expense: {
      personnelExpense: 17268342,
      operatingExpense: 5320000,
      utilityExpense: 2650000,
      administrativeExpense: 180000,
      total: 25418342,
    },
    netIncome: 4231658,
  },
  balanceSheet: {
    assets: {
      currentAssets: 35000000,
      fixedAssets: 150000000,
      total: 185000000,
    },
    liabilities: {
      currentLiabilities: 8500000,
      longTermLiabilities: 50000000,
      total: 58500000,
    },
    equity: {
      capital: 100000000,
      retainedEarnings: 26500000,
      total: 126500000,
    },
  },
};

/* ============================================
   메인 페이지 컴포넌트
============================================ */

export default function AccountingPage() {
  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'journal' | 'account' | 'closing' | 'transactions' | 'statistics'
  >('dashboard');

  // 거래 내역 필터
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // 모달
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  // 계정과목 필터
  const [filterClass, setFilterClass] = useState<'all' | 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'>(
    'all',
  );

  const summary = MONTHLY_SUMMARY[selectedMonth] || MONTHLY_SUMMARY['2026-01'];

  // 필터링된 거래 내역
  const filteredTransactions = TRANSACTIONS.filter(t => {
    const matchMonth = t.date.startsWith(selectedMonth);
    const matchType = filterType === 'all' || t.type === filterType;
    const matchCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchMonth && matchType && matchCategory;
  });

  // 카테고리별 통계
  const getCategoryStats = (type: 'income' | 'expense') => {
    const categories = type === 'income' ? summary.incomeByCategory : summary.expenseByCategory;
    const total = type === 'income' ? summary.totalIncome : summary.totalExpense;

    return Object.entries(categories)
      .map(([category, amount]) => ({
        category,
        amount: amount as number,
        percentage: (((amount as number) / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  // 엑셀 다운로드
  const handleExcelDownload = () => {
    const excelData = filteredTransactions.map(t => ({
      날짜: t.date,
      구분: t.type === 'income' ? '수입' : '지출',
      카테고리: t.category,
      내용: t.description,
      금액: t.amount,
      결제방법: t.paymentMethod,
      상태: t.status === 'completed' ? '완료' : '대기',
      메모: t.memo || '-',
      등록자: t.createdBy,
      등록일시: t.createdAt,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '회계내역');

    const summaryData = [
      { 항목: '총 수입', 금액: summary.totalIncome },
      { 항목: '총 지출', 금액: summary.totalExpense },
      { 항목: '수지차액', 금액: summary.balance },
    ];
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, '요약');

    XLSX.writeFile(wb, `회계내역_${selectedMonth}.xlsx`);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('이 거래 내역을 삭제하시겠습니까?')) {
      alert('거래 내역이 삭제되었습니다.');
    }
  };

  // 계정과목 통계
  const filteredAccounts = ACCOUNTS.filter(a => filterClass === 'all' || a.accountClass === filterClass);

  const accountStats = {
    total: ACCOUNTS.length,
    asset: ACCOUNTS.filter(a => a.accountClass === 'asset').length,
    liability: ACCOUNTS.filter(a => a.accountClass === 'liability').length,
    equity: ACCOUNTS.filter(a => a.accountClass === 'equity').length,
    revenue: ACCOUNTS.filter(a => a.accountClass === 'revenue').length,
    expense: ACCOUNTS.filter(a => a.accountClass === 'expense').length,
  };

  const classLabels: Record<string, string> = {
    asset: '자산',
    liability: '부채',
    equity: '자본',
    revenue: '수익',
    expense: '비용',
  };

  const classColors: Record<string, string> = {
    asset: 'bg-blue-100 text-blue-800',
    liability: 'bg-red-100 text-red-800',
    equity: 'bg-purple-100 text-purple-800',
    revenue: 'bg-green-100 text-green-800',
    expense: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-black">
      {/* 글로벌 헤더 */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-gray-900">
            <span className="rounded-xl bg-teal-600 p-2 text-white shadow-lg shadow-teal-100">
              <i className="ri-bank-line"></i>
            </span>
            통합 회계 ERP 시스템
          </h1>
          <p className="ml-1 mt-1 text-sm font-bold text-gray-700">복식부기 기반의 투명한 자산 및 손익 관리</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="rounded-xl border-2 border-gray-300 bg-white px-4 py-2 text-sm font-bold text-black shadow-sm outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleExcelDownload}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-emerald-700"
          >
            <i className="ri-file-excel-2-line"></i> 엑셀 출력
          </button>
        </div>
      </div>

      {/* 네비게이션 탭 */}
      <div className="no-scrollbar flex overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm">
        {[
          ['dashboard', 'ri-dashboard-3-line', '종합 현황'],
          ['journal', 'ri-file-list-3-line', '전표 관리'],
          ['account', 'ri-list-settings-line', '계정과목'],
          ['closing', 'ri-lock-password-line', '결산/마감'],
          ['transactions', 'ri-exchange-funds-line', '상세 내역'],
          ['statistics', 'ri-pie-chart-2-line', '통계 분석'],
        ].map(([key, icon, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-6 py-3 text-sm font-black transition-all ${
              activeTab === key
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-black hover:bg-gray-100 hover:text-teal-700'
            }`}
          >
            <i className={icon}></i> {label}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {/* 대시보드 */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* 요약 카드 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <SummaryCard
                title="총 수입"
                amount={summary.totalIncome}
                count={summary.transactionCount.income}
                color="blue"
                icon="ri-arrow-left-down-line"
              />
              <SummaryCard
                title="총 지출"
                amount={summary.totalExpense}
                count={summary.transactionCount.expense}
                color="red"
                icon="ri-arrow-right-up-line"
              />
              <SummaryCard
                title="수지차액"
                amount={summary.balance}
                percentage={((summary.balance / summary.totalIncome) * 100).toFixed(1)}
                color="teal"
                icon="ri-wallet-3-line"
              />
            </div>

            {/* 카테고리별 수입/지출 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CategoryCard
                title="카테고리별 수입"
                iconColor="text-blue-600"
                color="bg-blue-600"
                data={summary.incomeByCategory}
              />
              <CategoryCard
                title="카테고리별 지출"
                iconColor="text-red-600"
                color="bg-red-600"
                data={summary.expenseByCategory}
              />
            </div>

            {/* 최근 거래내역 */}
            <RecentTransactions setActiveTab={setActiveTab} />
          </div>
        )}

        {/* 전표 관리 */}
        {activeTab === 'journal' && (
          <div className="rounded-3xl border-2 border-gray-100 bg-white p-8 text-black shadow-sm">
            <h2 className="text-xl font-black">전표 관리</h2>
            <p className="mt-2 text-gray-500">전표 입력/조회 기능 준비 중…</p>
          </div>
        )}

        {/* 계정과목 */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">계정과목 관리</h2>
                <p className="mt-1 text-sm text-gray-600">회계 계정과목 설정 및 관리</p>
              </div>
              <button
                onClick={() => setShowAddAccountModal(true)}
                className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-white transition-all duration-300 hover:shadow-lg"
              >
                <i className="ri-add-line mr-2"></i>
                계정과목 추가
              </button>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-1 text-sm text-gray-600">전체</div>
                <div className="text-2xl font-bold text-gray-900">{accountStats.total}</div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="mb-1 text-sm text-blue-700">자산</div>
                <div className="text-2xl font-bold text-blue-600">{accountStats.asset}</div>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="mb-1 text-sm text-red-700">부채</div>
                <div className="text-2xl font-bold text-red-600">{accountStats.liability}</div>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <div className="mb-1 text-sm text-purple-700">자본</div>
                <div className="text-2xl font-bold text-purple-600">{accountStats.equity}</div>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="mb-1 text-sm text-green-700">수익</div>
                <div className="text-2xl font-bold text-green-600">{accountStats.revenue}</div>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <div className="mb-1 text-sm text-orange-700">비용</div>
                <div className="text-2xl font-bold text-orange-600">{accountStats.expense}</div>
              </div>
            </div>

            {/* 필터 */}
            <div className="flex gap-2">
              {(['all', 'asset', 'liability', 'equity', 'revenue', 'expense'] as const).map(cls => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors ${
                    filterClass === cls
                      ? cls === 'all'
                        ? 'bg-teal-600 text-white'
                        : cls === 'asset'
                          ? 'bg-blue-600 text-white'
                          : cls === 'liability'
                            ? 'bg-red-600 text-white'
                            : cls === 'equity'
                              ? 'bg-purple-600 text-white'
                              : cls === 'revenue'
                                ? 'bg-green-600 text-white'
                                : 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cls === 'all' ? '전체' : classLabels[cls]}
                </button>
              ))}
            </div>

            {/* 계정과목 테이블 */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        코드
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        계정명
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        분류
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        세부계정
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        상태
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredAccounts.map(account => (
                      <tr key={account.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="font-mono text-sm font-bold text-gray-900">{account.code}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{account.name}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${classColors[account.accountClass]}`}
                          >
                            {classLabels[account.accountClass]}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          {account.isDetail ? (
                            <span className="text-green-600">
                              <i className="ri-checkbox-circle-fill"></i>
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              <i className="ri-close-circle-fill"></i>
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          {account.isActive ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                              사용중
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                              미사용
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          <button className="mr-2 cursor-pointer text-blue-600 hover:text-blue-800" title="수정">
                            <i className="ri-edit-line text-lg"></i>
                          </button>
                          <button className="cursor-pointer text-red-600 hover:text-red-800" title="삭제">
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 결산/마감 */}
        {activeTab === 'closing' && <ClosingSection />}

        {/* 상세 내역 */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* 필터 */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors ${
                    filterType === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setFilterType('income')}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors ${
                    filterType === 'income' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  수입
                </button>
                <button
                  onClick={() => setFilterType('expense')}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors ${
                    filterType === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  지출
                </button>
              </div>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">전체 카테고리</option>
                {[...CATEGORIES.income, ...CATEGORIES.expense].map(cat => (
                  <option key={cat.value} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 거래 테이블 */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        날짜
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        구분
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        카테고리
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        내용
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        금액
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        결제방법
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        상태
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredTransactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">{transaction.date}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              transaction.type === 'income' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.type === 'income' ? '수입' : '지출'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">{transaction.category}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <div>{transaction.description}</div>
                          {transaction.memo && <div className="mt-1 text-xs text-gray-500">{transaction.memo}</div>}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                          <span
                            className={`font-semibold ${
                              transaction.type === 'income' ? 'text-blue-600' : 'text-red-600'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}
                            {transaction.amount.toLocaleString()}원
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                          {transaction.paymentMethod}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {transaction.status === 'completed' ? '완료' : '대기'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          <button className="mr-2 cursor-pointer text-blue-600 hover:text-blue-800" title="수정">
                            <i className="ri-edit-line text-lg"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="cursor-pointer text-red-600 hover:text-red-800"
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
          </div>
        )}

        {/* 통계 분석 */}
        {activeTab === 'statistics' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 월별 추이 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">월별 수입/지출 추이</h3>
              <div className="space-y-4">
                {Object.entries(MONTHLY_SUMMARY)
                  .reverse()
                  .map(([month, data]) => (
                    <div key={month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{month}</span>
                        <span
                          className={`text-sm font-semibold ${data.balance >= 0 ? 'text-teal-600' : 'text-red-600'}`}
                        >
                          {data.balance >= 0 ? '+' : '-'}
                          {Math.abs(data.balance).toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex h-8 gap-2">
                        <div
                          className="flex items-center justify-center rounded bg-blue-500 text-xs font-medium text-white"
                          style={{ width: `${(data.totalIncome / 35000000) * 100}%` }}
                          title={`수입: ${data.totalIncome.toLocaleString()}원`}
                        >
                          {data.totalIncome >= 10000000 && `${(data.totalIncome / 10000).toFixed(0)}만`}
                        </div>
                        <div
                          className="flex items-center justify-center rounded bg-red-500 text-xs font-medium text-white"
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
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">수입 구성비</h3>
              <div className="space-y-4">
                {getCategoryStats('income').map((stat, index) => (
                  <div key={stat.category} className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg font-bold text-white ${
                        index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-400' : 'bg-blue-300'
                      }`}
                    >
                      {stat.percentage}%
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{stat.category}</div>
                      <div className="text-xs text-gray-500">{stat.amount.toLocaleString()}원</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 지출 구성비 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">지출 구성비</h3>
              <div className="space-y-4">
                {getCategoryStats('expense').map((stat, index) => (
                  <div key={stat.category} className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg font-bold text-white ${
                        index === 0 ? 'bg-red-500' : index === 1 ? 'bg-red-400' : 'bg-red-300'
                      }`}
                    >
                      {stat.percentage}%
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{stat.category}</div>
                      <div className="text-xs text-gray-500">{stat.amount.toLocaleString()}원</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 결제 방법 통계 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">결제 방법별 통계</h3>
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
                    <div key={method} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                          <i className="ri-bank-card-line"></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{method}</div>
                          <div className="text-xs text-gray-500">{data.count}건</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{data.amount.toLocaleString()}원</div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 거래 등록 모달 */}
      {showAddModal && (
        <TransactionModal
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* 계정과목 추가 모달 */}
      {showAddAccountModal && <AccountModal onClose={() => setShowAddAccountModal(false)} />}
    </div>
  );
}

/* ============================================
   서브 컴포넌트
============================================ */

function SummaryCard({ title, amount, count, percentage, color, icon }: any) {
  const bg = {
    blue: 'from-blue-600 to-blue-700 shadow-blue-100',
    red: 'from-red-600 to-red-700 shadow-red-100',
    teal: 'from-teal-600 to-emerald-700 shadow-teal-100',
  }[color];

  return (
    <div className={`bg-gradient-to-br ${bg} relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-xl`}>
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-black uppercase opacity-80">{title}</span>
          <i className={`${icon} text-2xl`}></i>
        </div>

        <h4 className="mb-2 text-3xl font-black">{amount.toLocaleString()}원</h4>

        <p className="text-sm opacity-90">{count ? `${count}건 거래` : percentage ? `수익 대비 ${percentage}%` : ''}</p>
      </div>
    </div>
  );
}

function CategoryCard({ title, iconColor, color, data }: any) {
  return (
    <div className="rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-gray-900">
        <i className={`ri-donut-chart-line ${iconColor}`}></i> {title}
      </h3>

      <div className="space-y-4">
        {Object.entries(data).map(([cat, amt]: any) => (
          <ProgressRow
            key={cat}
            label={cat}
            amount={amt}
            total={Object.values(data).reduce((a: any, b: any) => a + b, 0)}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressRow({ label, amount, total, color }: any) {
  const percent = (amount / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-black">
        <span className="text-black">{label}</span>
        <span className="text-gray-900">
          {amount.toLocaleString()}원 ({percent.toFixed(1)}%)
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full ${color} transition-all`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function RecentTransactions({ setActiveTab }: any) {
  return (
    <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">최근 거래 내역</h3>

        <button
          onClick={() => setActiveTab('transactions')}
          className="cursor-pointer text-sm font-medium text-teal-600 hover:text-teal-800"
        >
          전체보기 <i className="ri-arrow-right-line ml-1"></i>
        </button>
      </div>

      <div className="space-y-3">
        {TRANSACTIONS.slice(0, 5).map(tx => (
          <div key={tx.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-4 hover:bg-gray-100">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  tx.type === 'income' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                }`}
              >
                <i className={tx.type === 'income' ? 'ri-arrow-down-circle-fill' : 'ri-arrow-up-circle-fill'}></i>
              </div>

              <div>
                <div className="font-medium text-gray-900">{tx.description}</div>
                <div className="text-sm text-gray-500">
                  {tx.date} · {tx.category} · {tx.paymentMethod}
                </div>
              </div>
            </div>

            <div className={`text-lg font-bold ${tx.type === 'income' ? 'text-blue-600' : 'text-red-600'}`}>
              {tx.type === 'income' ? '+' : '-'}
              {tx.amount.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionModal({ transactionType, setTransactionType, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 rounded-t-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">거래 등록</h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/20"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {/* 거래 구분 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">거래 구분</label>
            <div className="flex gap-4">
              <button
                onClick={() => setTransactionType('income')}
                className={`flex-1 cursor-pointer whitespace-nowrap rounded-lg px-4 py-3 font-medium transition-colors ${
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
                className={`flex-1 cursor-pointer whitespace-nowrap rounded-lg px-4 py-3 font-medium transition-colors ${
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
            <label className="mb-2 block text-sm font-medium text-gray-700">날짜</label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">카테고리</label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500">
              <option value="">선택하세요</option>
              {(transactionType === 'income' ? CATEGORIES.income : CATEGORIES.expense).map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* 내용 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">내용</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              placeholder="거래 내용을 입력하세요"
            />
          </div>

          {/* 금액 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">금액</label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              placeholder="0"
            />
          </div>

          {/* 결제방법 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">결제방법</label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500">
              {PAYMENT_METHODS.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          {/* 메모 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">메모</label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              rows={3}
              placeholder="추가 메모 (선택사항)"
            ></textarea>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                alert('거래가 등록되었습니다.');
                onClose();
              }}
              className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg"
            >
              등록하기
            </button>
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 rounded-t-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">계정과목 추가</h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/20"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">계정코드</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                placeholder="예: 701"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">계정명</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                placeholder="예: 광고선전비"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">대분류</label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500">
                <option value="">선택하세요</option>
                <option value="asset">자산</option>
                <option value="liability">부채</option>
                <option value="equity">자본</option>
                <option value="revenue">수익</option>
                <option value="expense">비용</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">중분류</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                placeholder="예: 판매비와관리비"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded text-teal-600" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">세부계정 (전표입력 가능)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded text-teal-600" />
              <span className="ml-2 text-sm text-gray-700">과세대상</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded text-teal-600" />
              <span className="ml-2 text-sm text-gray-700">예산통제 대상</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded text-teal-600" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">사용</span>
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">설명</label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              rows={3}
              placeholder="계정과목 설명 (선택사항)"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                alert('계정과목이 추가되었습니다.');
                onClose();
              }}
              className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg"
            >
              추가하기
            </button>
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClosingSection() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(1);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">결산 관리</h2>
          <p className="mt-1 text-sm text-gray-600">월마감/연마감 및 재무제표</p>
        </div>
        <div className="flex gap-3">
          <button className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white transition-all duration-300 hover:shadow-lg">
            <i className="ri-file-text-line mr-2"></i>
            재무제표 출력
          </button>
          <button className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-white transition-all duration-300 hover:shadow-lg">
            <i className="ri-lock-line mr-2"></i>
            월마감 실행
          </button>
        </div>
      </div>

      {/* 기간 선택 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">결산 기간:</label>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
          >
            <option value={2026}>2026년</option>
            <option value={2025}>2025년</option>
            <option value={2024}>2024년</option>
          </select>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 마감 전 체크리스트 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-gray-900">마감 전 체크리스트</h3>
        <div className="space-y-3">
          {CHECKLIST_ITEMS.map(item => (
            <div key={item.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                {item.status === 'pass' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <i className="ri-checkbox-circle-fill"></i>
                  </div>
                )}
                {item.status === 'warning' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <i className="ri-error-warning-fill"></i>
                  </div>
                )}
                {item.status === 'pending' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <i className="ri-time-line"></i>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.label}</div>
                  {item.count > 0 && <div className="mt-1 text-xs text-gray-500">{item.count}건 확인 필요</div>}
                </div>
              </div>
              {item.status !== 'pass' && (
                <button className="cursor-pointer whitespace-nowrap text-sm font-medium text-teal-600 hover:text-teal-800">
                  확인하기 <i className="ri-arrow-right-line ml-1"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 재무제표 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 손익계산서 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">손익계산서</h3>
            <span className="text-sm text-gray-600">
              {selectedYear}년 {selectedMonth}월
            </span>
          </div>

          <div className="space-y-4">
            {/* 수익 */}
            <div>
              <div className="mb-2 text-sm font-bold text-gray-900">수익</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">영업수익</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.incomeStatement.revenue.operatingRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">영업외수익</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.incomeStatement.revenue.nonOperatingRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm">
                  <span className="font-bold text-gray-900">수익 합계</span>
                  <span className="font-bold text-blue-600">
                    {FINANCIAL_STATEMENTS.incomeStatement.revenue.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 비용 */}
            <div>
              <div className="mb-2 text-sm font-bold text-gray-900">비용</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">인건비</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.incomeStatement.expense.personnelExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">운영비</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.incomeStatement.expense.operatingExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">공과금</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.incomeStatement.expense.utilityExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">관리비</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.incomeStatement.expense.administrativeExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm">
                  <span className="font-bold text-gray-900">비용 합계</span>
                  <span className="font-bold text-red-600">
                    {FINANCIAL_STATEMENTS.incomeStatement.expense.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 당기순이익 */}
            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">당기순이익</span>
                <span className="text-2xl font-bold text-teal-600">
                  {FINANCIAL_STATEMENTS.incomeStatement.netIncome.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 재무상태표 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">재무상태표</h3>
            <span className="text-sm text-gray-600">
              {selectedYear}년 {selectedMonth}월 말
            </span>
          </div>

          <div className="space-y-4">
            {/* 자산 */}
            <div>
              <div className="mb-2 text-sm font-bold text-gray-900">자산</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">유동자산</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.balanceSheet.assets.currentAssets.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">고정자산</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.balanceSheet.assets.fixedAssets.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm">
                  <span className="font-bold text-gray-900">자산 합계</span>
                  <span className="font-bold text-blue-600">
                    {FINANCIAL_STATEMENTS.balanceSheet.assets.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 부채 */}
            <div>
              <div className="mb-2 text-sm font-bold text-gray-900">부채</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">유동부채</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.balanceSheet.liabilities.currentLiabilities.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">장기부채</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.balanceSheet.liabilities.longTermLiabilities.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm">
                  <span className="font-bold text-gray-900">부채 합계</span>
                  <span className="font-bold text-red-600">
                    {FINANCIAL_STATEMENTS.balanceSheet.liabilities.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 자본 */}
            <div>
              <div className="mb-2 text-sm font-bold text-gray-900">자본</div>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">자본금</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.balanceSheet.equity.capital.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">이익잉여금</span>
                  <span className="font-medium text-gray-900">
                    {FINANCIAL_STATEMENTS.balanceSheet.equity.retainedEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm">
                  <span className="font-bold text-gray-900">자본 합계</span>
                  <span className="font-bold text-purple-600">
                    {FINANCIAL_STATEMENTS.balanceSheet.equity.total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 부채와 자본 합계 */}
            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">부채와 자본 합계</span>
                <span className="text-2xl font-bold text-teal-600">
                  {(
                    FINANCIAL_STATEMENTS.balanceSheet.liabilities.total + FINANCIAL_STATEMENTS.balanceSheet.equity.total
                  ).toLocaleString()}
                  원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 마감 이력 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-gray-900">마감 이력</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  회계연도
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  기간
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  유형
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  마감일
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  전표건수
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  차변합계
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  대변합계
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  마감자
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {CLOSING_PERIODS.map(period => (
                <tr key={period.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                    {period.fiscalYear}년
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-900">
                    {period.periodMonth}월
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">월마감</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">{period.closeDate}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-gray-900">
                    {period.journalCount}건
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium text-gray-900">
                    {period.totalDebit.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium text-gray-900">
                    {period.totalCredit.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">{period.closedBy}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
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
}
