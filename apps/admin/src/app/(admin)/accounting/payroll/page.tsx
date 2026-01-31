'use client';

import { useMemo, useState } from 'react';

// 공통 컴포넌트 Import
import PayrollHeader from './PayrollHeader';
import PayrollStats from './PayrollStats';
import PayrollTabs, { type PayrollTabType } from './PayrollTabs';
import PayslipModal from './PayslipModal';

// 탭 컨텐츠 Import
import CalculationTab from './tabs/CalculationTab';
import HistoryTab from './tabs/HistoryTab';
import SettingsTab from './tabs/SettingsTab';

// ===============================
// [MOCK DATA] 시스템 가상 데이터
// ===============================
const MOCK_SETTINGS = [
  {
    employeeId: 'EMP001',
    employeeName: '김철수',
    position: '요양보호사',
    hireDate: '2023-03-01',
    employmentType: 'hourly',
    hourlyWage: 12000,
    monthlyWage: 0,
    mealAllowance: 100000,
    transportAllowance: 50000,
    positionAllowance: 30000,
    riskAllowance: 20000,
    longevityAllowance: 50000,
    overtimeRate: 0.5,
    nightBonusRate: 0.3,
    insurance: { pension: true, health: true, longTermCare: true, employ: true },
    tax: { income: true, local: true },
  },
  {
    employeeId: 'EMP002',
    employeeName: '이영희',
    position: '간호사',
    hireDate: '2022-11-10',
    employmentType: 'monthly',
    hourlyWage: 0,
    monthlyWage: 2800000,
    mealAllowance: 120000,
    transportAllowance: 60000,
    positionAllowance: 50000,
    riskAllowance: 30000,
    longevityAllowance: 80000,
    overtimeRate: 0.5,
    nightBonusRate: 0.3,
    insurance: { pension: true, health: true, longTermCare: true, employ: true },
    tax: { income: true, local: true },
  },
];

const MOCK_RESULTS = [
  {
    employeeId: 'EMP001',
    employeeName: '김철수',
    position: '요양보호사',
    month: '2026-01',
    workDays: 22,
    totalWorkHours: 176,
    basePay: 2112000,
    overtimePay: 96000,
    nightPay: 0,
    holidayPay: 0,
    weeklyAllowance: 240000,
    mealAllowance: 100000,
    transportAllowance: 50000,
    positionAllowance: 30000,
    riskAllowance: 20000,
    longevityAllowance: 50000,
    totalPay: 2732000,
    pension: 122000,
    health: 96800,
    longTermCare: 12500,
    employ: 24500,
    incomeTax: 40900,
    localTax: 4090,
    totalDeduction: 297790,
    netPay: 2434210,
    status: 'calculated',
  },
  {
    employeeId: 'EMP002',
    employeeName: '이영희',
    position: '간호사',
    month: '2026-01',
    workDays: 20,
    totalWorkHours: 160,
    basePay: 2800000,
    overtimePay: 120000,
    nightPay: 40000,
    holidayPay: 0,
    weeklyAllowance: 0,
    mealAllowance: 120000,
    transportAllowance: 60000,
    positionAllowance: 50000,
    riskAllowance: 30000,
    longevityAllowance: 80000,
    totalPay: 3300000,
    pension: 148500,
    health: 110000,
    longTermCare: 14000,
    employ: 29700,
    incomeTax: 49500,
    localTax: 4950,
    totalDeduction: 352650,
    netPay: 2947350,
    status: 'paid',
  },
];

const MOCK_HISTORY = [
  {
    id: 'HIS001',
    month: '2025-12',
    paymentDate: '2025-12-31',
    totalEmployees: 2,
    totalPay: 6032000,
    totalDeduction: 580000,
    totalNetPay: 5452000,
    status: 'completed',
    createdBy: '관리자',
    createdAt: '2025-12-31 14:20',
    reflectedToAccounting: true,
  },
];

// ===============================
// [MAIN PAGE] 급여 관리 페이지
// ===============================
export default function PayrollPage() {
  // --- [1] 상태 관리 ---
  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [activeTab, setActiveTab] = useState<PayrollTabType>('calculation');
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);

  // --- [2] 통계 데이터 계산 ---
  const stats = useMemo(() => {
    const results = MOCK_RESULTS.filter(r => r.month === selectedMonth);
    return {
      totalPay: results.reduce((sum, r) => sum + r.totalPay, 0),
      totalDeduction: results.reduce((sum, r) => sum + r.totalDeduction, 0),
      netPay: results.reduce((sum, r) => sum + r.netPay, 0),
      employeeCount: results.length,
    };
  }, [selectedMonth]);

  // --- [3] 액션 핸들러 ---
  const handleExcelExport = () => alert(`${selectedMonth} 급여 데이터를 엑셀로 추출합니다.`);
  const handleAccountingSync = () => {
    if (confirm('현재 계산된 급여 내역을 회계 시스템의 [인건비] 항목으로 반영하시겠습니까?')) {
      alert('회계 시스템 연동 완료: 전표번호 20260130-PY01');
    }
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 1. 통합 헤더 */}
      <PayrollHeader
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onExcelDownload={handleExcelExport}
        onReflectToAccounting={handleAccountingSync}
      />

      {/* 2. 내부 레이아웃 영역 */}
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
        {/* 상단 통계 위젯 */}
        <PayrollStats stats={stats} />

        {/* 메인 시스템 보드 */}
        <div className="flex flex-1 flex-col overflow-hidden border border-gray-300 bg-white shadow-sm">
          {/* 탭 네비게이션 */}
          <PayrollTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 탭 컨텐츠 영역 (독립 스크롤) */}
          <section className="flex-1 overflow-y-auto bg-gray-50/20 p-3">
            {activeTab === 'calculation' && (
              <CalculationTab
                results={MOCK_RESULTS.filter(r => r.month === selectedMonth)}
                onViewPayslip={setSelectedPayslip}
                onDownloadPdf={r => alert(`${r.employeeName} 명세서 PDF 생성 중...`)}
              />
            )}
            {activeTab === 'settings' && <SettingsTab settings={MOCK_SETTINGS} />}
            {activeTab === 'history' && <HistoryTab history={MOCK_HISTORY} />}
          </section>

          {/* 시스템 하단 헬퍼 */}
          <footer className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-1.5 text-[10px] font-bold text-gray-400">
            <div className="flex gap-4">
              <span>● SYSTEM: ONLINE</span>
              <span>● DATABASE: SYNCED</span>
            </div>
            <div className="uppercase tracking-widest text-[#1a5a96]">Agape-Care Payroll Module v2.0</div>
          </footer>
        </div>
      </div>

      {/* 3. 명세서 모달 레이어 */}
      {selectedPayslip && (
        <PayslipModal
          data={selectedPayslip}
          onClose={() => setSelectedPayslip(null)}
          onDownloadPdf={r => alert(`${r.employeeName} 정식 명세서 출력 중...`)}
        />
      )}
    </main>
  );
}
