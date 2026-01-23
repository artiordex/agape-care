
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { monthlyPayrollResults, payrollHistory, payrollSettings } from '../../../../../src/mocks/payroll';

const PayrollManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'calculation' | 'history'>('calculation');
  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);

  // 급여 계산 함수
  const calculatePayroll = (employeeId: string, month: string) => {
    const setting = payrollSettings.find(s => s.employeeId === employeeId);
    if (!setting) return null;

    // 근무 기록에서 실제 근무시간 가져오기 (Mock)
    const workRecord = {
      regularHours: 176,
      overtimeHours: 16,
      nightHours: 0,
      holidayHours: 0,
      workDays: 22
    };

    let basePay = 0;
    let overtimePay = 0;
    let nightPay = 0;
    let holidayPay = 0;
    let weeklyAllowance = 0;

    if (setting.employmentType === 'hourly') {
      // 시급제
      basePay = workRecord.regularHours * setting.hourlyWage;
      overtimePay = workRecord.overtimeHours * setting.hourlyWage * (1 + setting.overtimeRate);
      nightPay = workRecord.nightHours * setting.hourlyWage * (1 + setting.nightBonusRate);
      holidayPay = workRecord.holidayHours * setting.hourlyWage * (1 + setting.holidayRate);

      // 주휴수당 (주 15시간 이상 근무 시)
      if (setting.weeklyAllowance && workRecord.regularHours >= 60) {
        const weeklyWorkHours = workRecord.regularHours / 4;
        weeklyAllowance = (weeklyWorkHours / 5) * setting.hourlyWage * 4;
      }
    } else {
      // 월급제
      basePay = setting.monthlyWage;

      // 통상시급 계산 (월급 ÷ 209시간)
      const hourlyRate = setting.monthlyWage / 209;
      overtimePay = workRecord.overtimeHours * hourlyRate * (1 + setting.overtimeRate);
      nightPay = workRecord.nightHours * hourlyRate * (1 + setting.nightBonusRate);
      holidayPay = workRecord.holidayHours * hourlyRate * (1 + setting.holidayRate);
    }

    const totalPay = basePay + overtimePay + nightPay + holidayPay + weeklyAllowance +
                     setting.mealAllowance + setting.transportAllowance +
                     setting.positionAllowance + setting.riskAllowance + setting.longevityAllowance;

    // 4대보험 계산
    const pension = setting.insurance.pension ? Math.floor(totalPay * 0.045) : 0;
    const health = setting.insurance.health ? Math.floor(totalPay * 0.03545) : 0;
    const longTermCare = setting.insurance.longTermCare ? Math.floor(health * 0.1295) : 0;
    const employ = setting.insurance.employ ? Math.floor(totalPay * 0.009) : 0;

    // 소득세 간이 계산 (실제로는 간이세액표 사용)
    const incomeTax = setting.tax.income ? Math.floor(totalPay * 0.015) : 0;
    const localTax = setting.tax.local ? Math.floor(incomeTax * 0.1) : 0;

    const totalDeduction = pension + health + longTermCare + employ + incomeTax + localTax;
    const netPay = totalPay - totalDeduction;

    return {
      basePay,
      overtimePay,
      nightPay,
      holidayPay,
      weeklyAllowance,
      totalPay,
      pension,
      health,
      longTermCare,
      employ,
      incomeTax,
      localTax,
      totalDeduction,
      netPay
    };
  };

  // 급여명세서 보기
  const handleViewPayslip = (result: any) => {
    setSelectedPayslip(result);
    setShowPayslipModal(true);
  };

  // 급여명세서 PDF 다운로드
  const handleDownloadPayslip = (result: any) => {
    alert(`${result.employeeName}님의 급여명세서 PDF 다운로드 기능은 구현 예정입니다.`);
  };

  // 엑셀 다운로드
  const handleExcelDownload = () => {
    const results = monthlyPayrollResults.filter(r => r.month === selectedMonth);

    const excelData = results.map(r => ({
      '직원명': r.employeeName,
      '직종': r.position,
      '근무일수': r.workDays,
      '총근무시간': r.totalWorkHours,
      '기본급': r.basePay,
      '연장수당': r.overtimePay,
      '야간수당': r.nightPay,
      '휴일수당': r.holidayPay,
      '주휴수당': r.weeklyAllowance,
      '식대': r.mealAllowance,
      '교통비': r.transportAllowance,
      '직책수당': r.positionAllowance,
      '위험수당': r.riskAllowance,
      '근속수당': r.longevityAllowance,
      '총지급액': r.totalPay,
      '국민연금': r.pension,
      '건강보험': r.health,
      '장기요양': r.longTermCare,
      '고용보험': r.employ,
      '소득세': r.incomeTax,
      '지방세': r.localTax,
      '공제합계': r.totalDeduction,
      '실지급액': r.netPay
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '급여내역');
    XLSX.writeFile(wb, `급여내역_${selectedMonth}.xlsx`);
  };

  // 회계 반영
  const handleReflectToAccounting = () => {
    if (confirm('급여 내역을 회계 시스템에 반영하시겠습니까?\\n인건비 지출 항목이 자동으로 생성됩니다.')) {
      alert('회계 시스템에 반영되었습니다!\\n회계 관리 메뉴에서 확인할 수 있습니다.');
    }
  };

  const results = monthlyPayrollResults.filter(r => r.month === selectedMonth);
  const totalPayroll = results.reduce((sum, r) => sum + r.netPay, 0);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">급여 관리</h2>
          <p className="text-sm text-gray-600 mt-1">직원 급여 계산 및 관리</p>
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
            onClick={handleReflectToAccounting}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-exchange-line mr-2"></i>
            회계 반영
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('calculation')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'calculation'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-calculator-line mr-2"></i>
            급여 계산
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'settings'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-settings-3-line mr-2"></i>
            급여 설정
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'history'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-history-line mr-2"></i>
            지급 이력
          </button>
        </div>

        {/* 급여 계산 탭 */}
        {activeTab === 'calculation' && (
          <div className="p-6">
            {/* 월 선택 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">기준월:</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="flex items-center gap-6 bg-gradient-to-r from-teal-50 to-emerald-50 px-6 py-3 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">총 인원</div>
                  <div className="text-2xl font-bold text-teal-600">{results.length}명</div>
                </div>
                <div className="w-px h-10 bg-gray-300"></div>
                <div>
                  <div className="text-sm text-gray-600">총 실지급액</div>
                  <div className="text-2xl font-bold text-teal-600">
                    {totalPayroll.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>

            {/* 급여 계산 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">직원명</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">직종</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">근무일수</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">근무시간</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">기본급</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">수당</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">총지급액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">공제액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">실지급액</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result) => {
                    const allowances = result.overtimePay + result.nightPay + result.holidayPay +
                                     result.weeklyAllowance + result.mealAllowance +
                                     result.transportAllowance + result.positionAllowance +
                                     result.riskAllowance + result.longevityAllowance;

                    return (
                      <tr key={result.employeeId} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full font-semibold mr-3">
                              {result.employeeName.charAt(0)}
                            </div>
                            <div className="text-sm font-medium text-gray-900">{result.employeeName}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{result.position}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-900">{result.workDays}일</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-900">{result.totalWorkHours}시간</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                          {result.basePay.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-blue-600">
                          +{allowances.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                          {result.totalPay.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-red-600">
                          -{result.totalDeduction.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-bold text-teal-600">
                          {result.netPay.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            result.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : result.status === 'calculated'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {result.status === 'paid' ? '지급완료' : result.status === 'calculated' ? '계산완료' : '대기중'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleViewPayslip(result)}
                            className="text-teal-600 hover:text-teal-800 mr-2 cursor-pointer"
                            title="명세서 보기"
                          >
                            <i className="ri-eye-line text-lg"></i>
                          </button>
                          <button
                            onClick={() => handleDownloadPayslip(result)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="PDF 다운로드"
                          >
                            <i className="ri-download-line text-lg"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 급여 설정 탭 */}
        {activeTab === 'settings' && (
          <div className="p-6">
            <div className="space-y-4">
              {payrollSettings.map((setting) => (
                <div key={setting.employeeId} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full font-bold text-lg">
                        {setting.employeeName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{setting.employeeName}</h3>
                        <p className="text-sm text-gray-600">{setting.position} · 입사일: {setting.hireDate}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      setting.employmentType === 'hourly'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {setting.employmentType === 'hourly' ? '시급제' : '월급제'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">기본급</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {setting.employmentType === 'hourly'
                          ? `${setting.hourlyWage.toLocaleString()}원/시간`
                          : `${setting.monthlyWage.toLocaleString()}원/월`}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">식대</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {setting.mealAllowance.toLocaleString()}원
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">교통비</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {setting.transportAllowance.toLocaleString()}원
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">직책수당</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {setting.positionAllowance.toLocaleString()}원
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">위험수당</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {setting.riskAllowance.toLocaleString()}원
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">연장수당율</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {(setting.overtimeRate * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">야간수당율</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {(setting.nightBonusRate * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">휴일수당율</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {(setting.holidayRate * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex gap-4 text-xs text-gray-600">
                      <span>
                        <i className={`ri-checkbox-${setting.insurance.pension ? 'circle' : 'blank-circle'}-line mr-1`}></i>
                        국민연금
                      </span>
                      <span>
                        <i className={`ri-checkbox-${setting.insurance.health ? 'circle' : 'blank-circle'}-line mr-1`}></i>
                        건강보험
                      </span>
                      <span>
                        <i className={`ri-checkbox-${setting.insurance.employ ? 'circle' : 'blank-circle'}-line mr-1`}></i>
                        고용보험
                      </span>
                      <span>
                        <i className={`ri-checkbox-${setting.weeklyAllowance ? 'circle' : 'blank-circle'}-line mr-1`}></i>
                        주휴수당
                      </span>
                    </div>
                    <button className="text-teal-600 hover:text-teal-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                      <i className="ri-edit-line mr-1"></i>
                      수정
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 지급 이력 탭 */}
        {activeTab === 'history' && (
          <div className="p-6">
            <div className="space-y-4">
              {payrollHistory.map((history) => (
                <div key={history.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-lg">
                        <i className="ri-money-dollar-circle-line text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{history.month} 급여</h3>
                        <p className="text-sm text-gray-600">
                          지급일: {history.paymentDate} · 지급방법: {history.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      history.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {history.status === 'completed' ? '지급완료' : '대기중'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">총 인원</div>
                      <div className="text-xl font-bold text-gray-900">{history.totalEmployees}명</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-xs text-blue-600 mb-1">총 지급액</div>
                      <div className="text-xl font-bold text-blue-600">
                        {history.totalPay.toLocaleString()}원
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="text-xs text-red-600 mb-1">총 공제액</div>
                      <div className="text-xl font-bold text-red-600">
                        {history.totalDeduction.toLocaleString()}원
                      </div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-4">
                      <div className="text-xs text-teal-600 mb-1">실지급액</div>
                      <div className="text-xl font-bold text-teal-600">
                        {history.totalNetPay.toLocaleString()}원
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        <i className="ri-user-line mr-1"></i>
                        처리자: {history.createdBy}
                      </span>
                      <span>
                        <i className="ri-time-line mr-1"></i>
                        {history.createdAt}
                      </span>
                      {history.reflectedToAccounting && (
                        <span className="text-teal-600">
                          <i className="ri-checkbox-circle-line mr-1"></i>
                          회계반영 완료
                        </span>
                      )}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                      <i className="ri-file-list-line mr-1"></i>
                      상세보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 급여명세서 모달 */}
      {showPayslipModal && selectedPayslip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">급여명세서</h2>
                <button
                  onClick={() => setShowPayslipModal(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">직원명</div>
                    <div className="text-lg font-bold text-gray-900">{selectedPayslip.employeeName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">직종</div>
                    <div className="text-lg font-bold text-gray-900">{selectedPayslip.position}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">지급월</div>
                    <div className="text-lg font-bold text-gray-900">{selectedPayslip.month}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">근무일수</div>
                    <div className="text-lg font-bold text-gray-900">{selectedPayslip.workDays}일</div>
                  </div>
                </div>
              </div>

              {/* 지급 내역 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">지급 내역</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">기본급</span>
                    <span className="font-semibold text-gray-900">{selectedPayslip.basePay.toLocaleString()}원</span>
                  </div>
                  {selectedPayslip.overtimePay > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">연장근로수당</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.overtimePay.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.nightPay > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">야간근로수당</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.nightPay.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.holidayPay > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">휴일근로수당</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.holidayPay.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.weeklyAllowance > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">주휴수당</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.weeklyAllowance.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.mealAllowance > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">식대</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.mealAllowance.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.transportAllowance > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">교통비</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.transportAllowance.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.positionAllowance > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">직책수당</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.positionAllowance.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.riskAllowance > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">위험수당</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.riskAllowance.toLocaleString()}원</span>
                    </div>
                  )}
                  {selectedPayslip.longevityAllowance > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">근속수당</span>
                      <span className="font-semibold text-gray-900">{selectedPayslip.longevityAllowance.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg mt-2">
                    <span className="font-bold text-blue-900">총 지급액</span>
                    <span className="font-bold text-blue-600 text-lg">{selectedPayslip.totalPay.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {/* 공제 내역 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">공제 내역</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">국민연금 (4.5%)</span>
                    <span className="font-semibold text-red-600">-{selectedPayslip.pension.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">건강보험 (3.545%)</span>
                    <span className="font-semibold text-red-600">-{selectedPayslip.health.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">장기요양 (0.4591%)</span>
                    <span className="font-semibold text-red-600">-{selectedPayslip.longTermCare.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">고용보험 (0.9%)</span>
                    <span className="font-semibold text-red-600">-{selectedPayslip.employ.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">소득세</span>
                    <span className="font-semibold text-red-600">-{selectedPayslip.incomeTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">지방소득세</span>
                    <span className="font-semibold text-red-600">-{selectedPayslip.localTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between py-3 bg-red-50 px-4 rounded-lg mt-2">
                    <span className="font-bold text-red-900">총 공제액</span>
                    <span className="font-bold text-red-600 text-lg">-{selectedPayslip.totalDeduction.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {/* 실지급액 */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 border-2 border-teal-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">실지급액</span>
                  <span className="text-3xl font-bold text-teal-600">{selectedPayslip.netPay.toLocaleString()}원</span>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownloadPayslip(selectedPayslip)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line mr-2"></i>
                  PDF 다운로드
                </button>
                <button
                  onClick={() => setShowPayslipModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollManagement;
