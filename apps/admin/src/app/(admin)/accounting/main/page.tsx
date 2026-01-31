'use client';

import React, { useState, useMemo } from 'react';

// 공통 컴포넌트 Import
import AccountingHeader from './AccountingHeader';
import AccountingStats from './AccountingStats';
import AccountingTabs, { type AccountingTabType } from './AccountingTabs';
import TransactionModal from './TransactionModal';
import AccountModal from './AccountModal';

// 탭 컨텐츠 Import
import DashboardTab from './tabs/DashboardTab';
import JournalTab from './tabs/JournalTab';
import AccountTab from './tabs/AccountTab';
import ClosingTab from './tabs/ClosingTab';
import TransactionTab from './tabs/TransactionTab';
import StatisticsTab from './tabs/StatisticsTab';

// 가상 데이터 (실제 환경에서는 API Contract를 통해 백엔드와 통신)
const MOCK_ACCOUNTS = [
  { id: '1', code: '101', name: '현금', accountClass: 'asset', accountType: '유동자산', isActive: true },
  { id: '2', code: '102', name: '보통예금', accountClass: 'asset', accountType: '유동자산', isActive: true },
  { id: '8', code: '501', name: '장기요양급여수익', accountClass: 'revenue', accountType: '영업수익', isActive: true },
  { id: '10', code: '601', name: '급여', accountClass: 'expense', accountType: '인건비', isActive: true },
  { id: '12', code: '611', name: '식자재비', accountClass: 'expense', accountType: '운영비', isActive: true },
];

const MOCK_TRANSACTIONS = [
  {
    id: 'T001',
    date: '2026-01-30',
    type: 'income',
    category: '장기요양급여',
    description: '1월분 공단부담금 입금',
    amount: 25000000,
    paymentMethod: '계좌이체',
    createdBy: '사무국장',
    status: 'completed',
  },
  {
    id: 'T002',
    date: '2026-01-30',
    type: 'expense',
    category: '인건비',
    description: '직원 급여 및 수당 지급',
    amount: 18500000,
    paymentMethod: '계좌이체',
    createdBy: '사무국장',
    status: 'completed',
  },
  {
    id: 'T003',
    date: '2026-01-29',
    type: 'expense',
    category: '운영비',
    description: '식자재(청과물) 대금 결제',
    amount: 1250000,
    paymentMethod: '카드',
    createdBy: '사무국장',
    status: 'completed',
  },
];

const MOCK_SUMMARY = {
  totalIncome: 35000000,
  totalExpense: 28500000,
  balance: 6500000,
  transactionCount: { income: 12, expense: 45 },
  incomeByCategory: { 정부보조금: 15000000, 장기요양급여: 15000000, 본인부담금: 5000000 },
  expenseByCategory: { 인건비: 18000000, 운영비: 5000000, 식자재비: 3500000, 공과금: 2000000 },
};

export default function AccountingPage() {
  // --- [1] 전역 상태 관리 ---
  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [activeTab, setActiveTab] = useState<AccountingTabType>('dashboard');

  // 모달 상태
  const [modalState, setModalState] = useState<{
    type: 'transaction' | 'account' | null;
    txType?: 'income' | 'expense';
  }>({ type: null });

  // --- [2] 액션 핸들러 ---
  const handleExcelDownload = () => alert(`${selectedMonth} 회계 데이터를 엑셀로 추출합니다.`);
  const handleSaveTransaction = (data: any) => {
    console.log('거래 저장:', data);
    setModalState({ type: null });
  };
  const handleSaveAccount = (data: any) => {
    console.log('계정 저장:', data);
    setModalState({ type: null });
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 1. 최상단 헤더 (기간 선택 및 엑셀) */}
      <AccountingHeader
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onExcelDownload={handleExcelDownload}
      />

      {/* 내부 스크롤 영역 컨테이너 */}
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
        {/* 2. 요약 대시보드 위젯 */}
        <AccountingStats summary={MOCK_SUMMARY} />

        {/* 3. 메인 기능 영역 (탭 + 컨텐츠) */}
        <div className="flex flex-1 flex-col overflow-hidden border border-gray-300 bg-white shadow-sm">
          {/* 탭 네비게이션 */}
          <AccountingTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 탭 별 컨텐츠 (독립 스크롤 처리) */}
          <section className="flex-1 overflow-y-auto bg-gray-50/30 p-3">
            {activeTab === 'dashboard' && (
              <DashboardTab summary={MOCK_SUMMARY} transactions={MOCK_TRANSACTIONS} onNavigate={setActiveTab} />
            )}
            {activeTab === 'journal' && <JournalTab />}
            {activeTab === 'account' && (
              <AccountTab accounts={MOCK_ACCOUNTS} onAddAccount={() => setModalState({ type: 'account' })} />
            )}
            {activeTab === 'closing' && <ClosingTab />}
            {activeTab === 'transactions' && (
              <TransactionTab
                transactions={MOCK_TRANSACTIONS}
                onDelete={id => confirm(`거래 ID: ${id}를 삭제하시겠습니까?`)}
              />
            )}
            {activeTab === 'statistics' && (
              <StatisticsTab monthlySummary={{ '2026-01': MOCK_SUMMARY, '2025-12': MOCK_SUMMARY }} />
            )}
          </section>

          {/* 하단 퀵 액션 버튼 (전역) */}
          <div className="flex justify-end gap-2 border-t border-gray-200 bg-white p-2 px-4">
            <button
              onClick={() => setModalState({ type: 'transaction', txType: 'income' })}
              className="flex items-center gap-1 bg-[#1a5a96] px-4 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-[#144675]"
            >
              <i className="ri-add-circle-line"></i> 수입 등록
            </button>
            <button
              onClick={() => setModalState({ type: 'transaction', txType: 'expense' })}
              className="flex items-center gap-1 bg-[#c23e3e] px-4 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-[#a13232]"
            >
              <i className="ri-indeterminate-circle-line"></i> 지출 등록
            </button>
          </div>
        </div>
      </div>

      {/* --- [4] 모달 레이어 --- */}
      {modalState.type === 'transaction' && (
        <TransactionModal
          type={modalState.txType as 'income' | 'expense'}
          onClose={() => setModalState({ type: null })}
          onSave={handleSaveTransaction}
        />
      )}

      {modalState.type === 'account' && (
        <AccountModal onClose={() => setModalState({ type: null })} onSave={handleSaveAccount} />
      )}
    </main>
  );
}
