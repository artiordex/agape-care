'use client';

import React from 'react';
import clsx from 'clsx';
import { ScheduleRule } from '../schedule.type';

interface Props {
  readonly rules: ScheduleRule;
  readonly onChange: (rules: ScheduleRule) => void;
}

/**
 * [컴포넌트] 근무 배정 알고리즘 규칙 설정 패널
 * 아가페 그린(#5C8D5A) 테마 및 직각형 고밀도 레이아웃 적용
 */
export default function AutoScheduleSettings({ rules, onChange }: Props) {
  // 입력 값 변경 핸들러 (객체 구조 보존)
  const updatePatterns = (key: keyof ScheduleRule['workPatterns'], value: number) => {
    onChange({
      ...rules,
      workPatterns: { ...rules.workPatterns, [key]: value },
    });
  };

  const updateConsecutive = (key: keyof ScheduleRule['consecutiveWork'], value: number) => {
    onChange({
      ...rules,
      consecutiveWork: { ...rules.consecutiveWork, [key]: value },
    });
  };

  const updateWeekend = (key: keyof ScheduleRule['weekendHoliday'], value: any) => {
    onChange({
      ...rules,
      weekendHoliday: { ...rules.weekendHoliday, [key]: value },
    });
  };

  return (
    <div className="space-y-8 font-sans text-gray-900 antialiased">
      {/* 1. 기본 근무 패턴 비율 설정 */}
      <div className="space-y-4">
        <RuleSectionHeader title="기본 근무 패턴 비중 프로토콜" icon="ri-pie-chart-line" />
        <div className="grid grid-cols-1 gap-6 border border-gray-100 bg-gray-50 p-6 shadow-inner md:grid-cols-3">
          <RangeInput
            label="주간 근무 목표 비중 (%)"
            value={rules.workPatterns.dayShiftRatio}
            min={0}
            max={100}
            onChange={v => updatePatterns('dayShiftRatio', v)}
          />
          <RangeInput
            label="야간 근무 목표 비중 (%)"
            value={rules.workPatterns.nightShiftRatio}
            min={0}
            max={100}
            onChange={v => updatePatterns('nightShiftRatio', v)}
          />
          <RangeInput
            label="휴무 발생 목표 비중 (%)"
            value={rules.workPatterns.offDayRatio}
            min={0}
            max={100}
            onChange={v => updatePatterns('offDayRatio', v)}
          />
        </div>
      </div>

      {/* 2. 연속 근무 및 휴식 제한 규칙 */}
      <div className="space-y-4">
        <RuleSectionHeader title="연속 근무 및 법적 제약 조건" icon="ri-timer-flash-line" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NumberInput
            label="최대 연속 근무일수"
            unit="일"
            value={rules.consecutiveWork.maxConsecutiveDays}
            onChange={v => updateConsecutive('maxConsecutiveDays', v)}
          />
          <NumberInput
            label="최소 보장 휴무일수"
            unit="일"
            value={rules.consecutiveWork.minOffDays}
            onChange={v => updateConsecutive('minOffDays', v)}
          />
          <NumberInput
            label="야간 근무 후 필수 휴무"
            unit="일"
            value={rules.consecutiveWork.offDaysAfterNight}
            onChange={v => updateConsecutive('offDaysAfterNight', v)}
          />
        </div>
      </div>

      {/* 3. 주말 운영 규칙 */}
      <div className="space-y-4">
        <RuleSectionHeader title="주말 및 공휴일 가동 정책" icon="ri-calendar-check-line" />
        <div className="rounded-none border border-gray-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h5 className="text-[14px] font-black text-gray-900">주말 최소 가동 인력 설정</h5>
              <p className="mt-1 text-[11px] font-bold text-gray-400">
                토요일/일요일 운영 시 배정되어야 하는 최소 필수 인력 수입니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={rules.weekendHoliday.weekendStaffCount}
                onChange={e => updateWeekend('weekendStaffCount', Number(e.target.value))}
                className="w-24 rounded-none border-2 border-gray-100 bg-gray-50 p-2 text-center font-mono text-[15px] font-black text-[#5C8D5A] outline-none focus:border-[#5C8D5A]"
              />
              <span className="text-[12px] font-black uppercase text-gray-500">명 배정</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 알고리즘 상태 안내 */}
      <div className="flex items-start gap-3 border-l-4 border-[#5C8D5A] bg-emerald-50 p-4">
        <i className="ri-shield-check-fill text-lg text-[#5C8D5A]"></i>
        <div>
          <p className="text-[12px] font-black text-[#5C8D5A]">지능형 배치 엔진 가동 준비 완료</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#5C8D5A]/70">
            위 설정값은 하드 제약 조건(Hard Constraints)으로 작용하며, 시스템이 최적해를 찾는 기준이 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

/** [내부 서브 컴포넌트] 규칙 섹션 헤더 */
function RuleSectionHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
      <i className={clsx(icon, 'text-lg text-[#5C8D5A]')}></i>
      <h4 className="text-[11px] font-black uppercase italic tracking-widest text-gray-400">{title}</h4>
    </div>
  );
}

/** [내부 서브 컴포넌트] 숫자 입력 필드 */
function NumberInput({ label, value, unit, onChange }: any) {
  return (
    <div className="flex flex-col gap-2 rounded-none border border-gray-200 bg-white p-4 transition-all hover:border-[#5C8D5A]">
      <label className="text-[10px] font-black uppercase tracking-tighter text-gray-400">{label}</label>
      <div className="flex items-center justify-between">
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full bg-transparent font-mono text-[18px] font-black text-gray-900 outline-none"
        />
        <span className="text-[11px] font-black italic text-gray-300">{unit}</span>
      </div>
    </div>
  );
}

/** [내부 서브 컴포넌트] 슬라이더 입력 필드 */
function RangeInput({ label, value, min, max, onChange }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-black text-gray-600">{label}</label>
        <span className="font-mono text-[13px] font-black text-[#5C8D5A]">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-none bg-gray-200 accent-[#5C8D5A]"
      />
    </div>
  );
}
