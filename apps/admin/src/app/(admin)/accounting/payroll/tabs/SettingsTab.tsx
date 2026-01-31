'use client';

import React from 'react';

interface Props {
  settings: any[];
}

/**
 * [TAB 2] 급여 설정 탭
 * 직원별 급여 체계(시급/월급), 수당 및 공제 옵션 관리
 */
export default function SettingsTab({ settings }: Props) {
  return (
    <div className="animate-in fade-in grid grid-cols-1 gap-4 text-[11px] duration-500 xl:grid-cols-2">
      {settings.map(setting => (
        <div key={setting.employeeId} className="flex flex-col border border-gray-300 bg-white shadow-sm">
          {/* 카드 헤더 - 직원 프로필 */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                <i className="ri-user-settings-line text-lg"></i>
              </div>
              <div>
                <h3 className="text-[13px] font-black text-gray-800">{setting.employeeName}</h3>
                <p className="text-[10px] font-bold text-[#1a5a96]">
                  {setting.position} · {setting.employeeId}
                </p>
              </div>
            </div>
            <button className="border border-gray-300 bg-white px-3 py-1 text-[10px] font-bold transition-colors hover:bg-gray-50">
              계약 정보 수정
            </button>
          </div>

          {/* 카드 바디 - 세부 설정 */}
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
            {/* 기본급 및 수당 설정 */}
            <div className="space-y-3">
              <div className="border-l-3 mb-2 flex items-center gap-2 border-[#1a5a96] pl-2">
                <span className="font-black uppercase text-gray-700">Wage & Allowances</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-gray-500">급여 체계</span>
                  <span
                    className={`rounded-sm px-2 py-0.5 text-[9px] font-bold ${
                      setting.employmentType === 'hourly'
                        ? 'border border-orange-200 bg-orange-50 text-orange-700'
                        : 'border border-blue-200 bg-blue-50 text-blue-700'
                    }`}
                  >
                    {setting.employmentType === 'hourly' ? '시급제' : '월급제'}
                  </span>
                </div>
                <SettingRow
                  label="기본 급여"
                  value={
                    setting.employmentType === 'hourly'
                      ? `${setting.hourlyWage.toLocaleString()}원/hr`
                      : `${setting.monthlyWage.toLocaleString()}원/월`
                  }
                  isBold
                />
                <SettingRow label="식대" value={`${setting.mealAllowance.toLocaleString()}원`} />
                <SettingRow label="교통비" value={`${setting.transportAllowance.toLocaleString()}원`} />
                <SettingRow
                  label="직책/위험수당"
                  value={`${(setting.positionAllowance + setting.riskAllowance).toLocaleString()}원`}
                />
              </div>
            </div>

            {/* 공제 및 보험 설정 */}
            <div className="space-y-3">
              <div className="border-l-3 mb-2 flex items-center gap-2 border-red-500 pl-2">
                <span className="font-black uppercase text-gray-700">Insurance & Tax</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <InsuranceBadge label="국민연금" active={setting.insurance.pension} />
                <InsuranceBadge label="건강보험" active={setting.insurance.health} />
                <InsuranceBadge label="고용보험" active={setting.insurance.employ} />
                <InsuranceBadge label="장기요양" active={setting.insurance.longTermCare} />
                <InsuranceBadge label="소득세" active={setting.tax.income} />
                <InsuranceBadge label="지방세" active={setting.tax.local} />
              </div>

              <div className="mt-4 rounded-sm border border-gray-200 bg-gray-50 p-2">
                <div className="mb-1 flex justify-between text-[9px]">
                  <span className="font-bold text-gray-400">연장수당 가산율</span>
                  <span className="font-black text-gray-700">+{setting.overtimeRate * 100}%</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="font-bold text-gray-400">야간/휴일 가산율</span>
                  <span className="font-black text-gray-700">+{setting.nightBonusRate * 100}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 푸터 - 이력 정보 */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 bg-gray-50/50 p-2 px-4 text-[9px] font-bold italic text-gray-400">
            <span>입사일: {setting.hireDate}</span>
            <span>최종 설정 변경: 2026-01-15 (Admin)</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** 내부 컴포넌트: 설정 행 */
function SettingRow({ label, value, isBold }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={`text-gray-800 ${isBold ? 'font-black' : 'font-medium'}`}>{value}</span>
    </div>
  );
}

/** 내부 컴포넌트: 보험 배지 */
function InsuranceBadge({ label, active }: any) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-sm border p-1.5 transition-colors ${
        active ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-100 opacity-50'
      }`}
    >
      <i className={`ri-checkbox-circle-fill text-[12px] ${active ? 'text-blue-500' : 'text-gray-300'}`}></i>
      <span className={`font-bold ${active ? 'text-gray-700' : 'text-gray-400'}`}>{label}</span>
    </div>
  );
}
