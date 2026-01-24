'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

// ===============================
// 하드코딩 더미 데이터
// ===============================
const payrollSettings = [
  {
    employeeId: 'EMP001',
    employeeName: '김철수',
    position: '요양보호사',
    hireDate: '2023-03-01',
    employmentType: 'hourly', // 시급제
    hourlyWage: 12000,
    monthlyWage: 0,
    mealAllowance: 100000,
    transportAllowance: 50000,
    positionAllowance: 30000,
    riskAllowance: 20000,
    longevityAllowance: 50000,
    overtimeRate: 0.5,
    nightBonusRate: 0.3,
    holidayRate: 0.5,
    weeklyAllowance: true,
    insurance: {
      pension: true,
      health: true,
      longTermCare: true,
      employ: true,
    },
    tax: {
      income: true,
      local: true,
    },
  },
  {
    employeeId: 'EMP002',
    employeeName: '이영희',
    position: '간호사',
    hireDate: '2022-11-10',
    employmentType: 'monthly', // 월급제
    hourlyWage: 0,
    monthlyWage: 2800000,
    mealAllowance: 120000,
    transportAllowance: 60000,
    positionAllowance: 50000,
    riskAllowance: 30000,
    longevityAllowance: 80000,
    overtimeRate: 0.5,
    nightBonusRate: 0.3,
    holidayRate: 0.5,
    weeklyAllowance: false,
    insurance: {
      pension: true,
      health: true,
      longTermCare: true,
      employ: true,
    },
    tax: {
      income: true,
      local: true,
    },
  },
];

const monthlyPayrollResults = [
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

const payrollHistory = [
  {
    id: 'HIS001',
    month: '2025-12',
    paymentDate: '2025-12-31',
    paymentMethod: '이체',
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
// 본격적인 컴포넌트 시작
// ===============================
const PayrollManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'calculation' | 'history'>('calculation');

  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
  const [showPayslipModal, setShowPayslipModal] = useState(false);

  // 급여명세서 보기
  const handleViewPayslip = (result: any) => {
    setSelectedPayslip(result);
    setShowPayslipModal(true);
  };

  // PDF 다운로드
  const handleDownloadPayslip = (result: any) => {
    alert(`${result.employeeName} 급여명세서 PDF 다운로드는 추후 구현 예정입니다.`);
  };

  // 엑셀 다운로드
  const handleExcelDownload = () => {
    const results = monthlyPayrollResults.filter(r => r.month === selectedMonth);

    const excelData = results.map(r => ({
      직원명: r.employeeName,
      직종: r.position,
      근무일수: r.workDays,
      총근무시간: r.totalWorkHours,
      기본급: r.basePay,
      연장수당: r.overtimePay,
      야간수당: r.nightPay,
      휴일수당: r.holidayPay,
      주휴수당: r.weeklyAllowance,
      식대: r.mealAllowance,
      교통비: r.transportAllowance,
      직책수당: r.positionAllowance,
      위험수당: r.riskAllowance,
      근속수당: r.longevityAllowance,
      총지급액: r.totalPay,
      국민연금: r.pension,
      건강보험: r.health,
      장기요양: r.longTermCare,
      고용보험: r.employ,
      소득세: r.incomeTax,
      지방세: r.localTax,
      공제합계: r.totalDeduction,
      실지급액: r.netPay,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '급여내역');

    XLSX.writeFile(wb, `급여내역_${selectedMonth}.xlsx`);
  };

  // 회계 반영
  const handleReflectToAccounting = () => {
    if (confirm('급여 내역을 회계 시스템에 반영할까요?\n인건비 지출 항목이 자동 생성됩니다.')) {
      alert('회계 시스템에 반영되었습니다.');
    }
  };

  const results = monthlyPayrollResults.filter(r => r.month === selectedMonth);

  const totalPayroll = results.reduce((sum, r) => sum + r.netPay, 0);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">급여 관리</h2>
          <p className="mt-1 text-sm text-gray-600">직원 급여 계산 및 관리</p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleExcelDownload} className="rounded-lg bg-green-500 px-4 py-2 text-white">
            엑셀 다운로드
          </button>

          <button onClick={handleReflectToAccounting} className="rounded-lg bg-blue-500 px-4 py-2 text-white">
            회계 반영
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('calculation')}
            className={`px-6 py-4 ${
              activeTab === 'calculation' ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-600'
            }`}
          >
            급여 계산
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-4 ${
              activeTab === 'settings' ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-600'
            }`}
          >
            급여 설정
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-4 ${
              activeTab === 'history' ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-600'
            }`}
          >
            지급 이력
          </button>
        </div>

        {/* ============================
            TAB 1 : 급여 계산
        ============================ */}
        {activeTab === 'calculation' && (
          <div className="p-6">
            {/* 월 선택 */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label>기준월</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  className="rounded-lg border px-3 py-2"
                />
              </div>

              <div className="flex gap-6 rounded-lg bg-teal-50 px-6 py-3">
                <div>
                  <div className="text-sm text-gray-600">총 인원</div>
                  <div className="text-2xl font-bold text-teal-600">{results.length}명</div>
                </div>

                <div className="w-px bg-gray-300" />

                <div>
                  <div className="text-sm text-gray-600">총 실지급액</div>
                  <div className="text-2xl font-bold text-teal-600">{totalPayroll.toLocaleString()}원</div>
                </div>
              </div>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">직원명</th>
                    <th className="px-4 py-2">직종</th>
                    <th className="px-4 py-2">근무일수</th>
                    <th className="px-4 py-2">근무시간</th>
                    <th className="px-4 py-2 text-right">기본급</th>
                    <th className="px-4 py-2 text-right">총지급액</th>
                    <th className="px-4 py-2 text-right">실지급액</th>
                    <th className="px-4 py-2">상태</th>
                    <th className="px-4 py-2">관리</th>
                  </tr>
                </thead>

                <tbody>
                  {results.map(result => (
                    <tr key={result.employeeId} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{result.employeeName}</td>
                      <td className="px-4 py-3">{result.position}</td>
                      <td className="px-4 py-3 text-center">{result.workDays}일</td>
                      <td className="px-4 py-3 text-center">{result.totalWorkHours}시간</td>
                      <td className="px-4 py-3 text-right">{result.basePay.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">{result.totalPay.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-teal-600">{result.netPay.toLocaleString()}</td>

                      <td className="px-4 py-3 text-center">
                        {result.status === 'paid' ? (
                          <span className="font-semibold text-green-600">지급완료</span>
                        ) : (
                          <span className="font-semibold text-blue-600">계산완료</span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleViewPayslip(result)} className="mr-2 text-teal-600">
                          보기
                        </button>

                        <button onClick={() => handleDownloadPayslip(result)} className="text-blue-600">
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================
            TAB 2 : 급여 설정
        ============================ */}
        {activeTab === 'settings' && (
          <div className="space-y-4 p-6">
            {payrollSettings.map(setting => (
              <div key={setting.employeeId} className="rounded-xl border bg-gray-50 p-6">
                <h3 className="mb-2 text-lg font-bold">
                  {setting.employeeName} ({setting.position})
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                  <div>
                    <p className="text-gray-500">기본급</p>
                    <p className="font-semibold">
                      {setting.employmentType === 'hourly'
                        ? `${setting.hourlyWage.toLocaleString()}원 / 시간`
                        : `${setting.monthlyWage.toLocaleString()}원 / 월`}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">식대</p>
                    <p className="font-semibold">{setting.mealAllowance.toLocaleString()}원</p>
                  </div>

                  <div>
                    <p className="text-gray-500">교통비</p>
                    <p className="font-semibold">{setting.transportAllowance.toLocaleString()}원</p>
                  </div>

                  <div>
                    <p className="text-gray-500">직책수당</p>
                    <p className="font-semibold">{setting.positionAllowance.toLocaleString()}원</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================
            TAB 3 : 지급 이력
        ============================ */}
        {activeTab === 'history' && (
          <div className="space-y-4 p-6">
            {payrollHistory.map(history => (
              <div key={history.id} className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{history.month} 급여</h3>
                    <p className="text-sm text-gray-600">지급일: {history.paymentDate}</p>
                  </div>

                  <div>
                    {history.status === 'completed' ? (
                      <span className="rounded-lg bg-green-100 px-4 py-2 text-green-700">지급완료</span>
                    ) : (
                      <span className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800">대기중</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="rounded-lg bg-gray-50 p-4">총 인원: {history.totalEmployees}</div>
                  <div className="rounded-lg bg-blue-50 p-4 text-blue-700">
                    총 지급액: {history.totalPay.toLocaleString()}원
                  </div>
                  <div className="rounded-lg bg-red-50 p-4 text-red-700">
                    공제액: {history.totalDeduction.toLocaleString()}원
                  </div>
                  <div className="rounded-lg bg-teal-50 p-4 text-teal-700">
                    실지급: {history.totalNetPay.toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =============================
          PAYSLIP MODAL
      ============================= */}
      {showPayslipModal && selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">급여명세서</h2>

            <p>
              직원명: <b>{selectedPayslip.employeeName}</b>
            </p>
            <p>직종: {selectedPayslip.position}</p>
            <p>지급월: {selectedPayslip.month}</p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleDownloadPayslip(selectedPayslip)}
                className="flex-1 rounded-lg bg-blue-500 py-3 text-white"
              >
                PDF 다운로드
              </button>

              <button onClick={() => setShowPayslipModal(false)} className="flex-1 rounded-lg bg-gray-300 py-3">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollManagement;
