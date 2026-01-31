'use client';

import React from 'react';
import clsx from 'clsx';

/**
 * 노인장기요양보험 본인부담률 기준 데이터
 */
const BURDEN_RATE_TYPES = [
  { value: 'RATE_0', label: '0% (기초생활수급자)', rate: 0, desc: '국민기초생활보장 수급자 - 본인부담 면제' },
  { value: 'RATE_6', label: '6% (의료급여 수급권자)', rate: 6, desc: '의료급여 수급권자 (차상위계층)' },
  { value: 'RATE_9', label: '9% (보험료 하위 25%)', rate: 9, desc: '건강보험료 하위 25% 이하 감경 대상' },
  { value: 'RATE_15', label: '15% (보험료 하위 50%)', rate: 15, desc: '건강보험료 하위 50% 이하 감경 대상' },
  { value: 'RATE_20', label: '20% (일반)', rate: 20, desc: '일반 대상자 기본 본인부담률' },
];

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly resident: any;
  readonly formData: any;
  readonly setFormData: (data: any) => void;
  readonly onSave: () => void;
  readonly isEdit?: boolean;
}

/**
 * [Modal] 본인부담률 신규 등록 및 자격 변경 모달
 * 아가페 그린(#5C8D5A) 테마 및 가이드 카드 시스템 적용
 */
export default function BurdenRateModal({
  isOpen,
  onClose,
  resident,
  formData,
  setFormData,
  onSave,
  isEdit = false,
}: Props) {
  if (!isOpen || !resident) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in zoom-in-95 w-full max-w-2xl overflow-hidden rounded-xl border border-gray-300 bg-white shadow-2xl duration-200">
        {/* 1. 모달 헤더: 전문 관제 타이틀 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 bg-[#5C8D5A]"></div>
            <h3 className="text-[14px] font-black uppercase text-gray-900">
              {isEdit ? '본인부담 이력 수정' : '본인부담 자격 신규 등록'}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-900">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 2. 입력 본문: 고밀도 행정 서식 */}
        <div className="custom-scrollbar max-h-[75vh] space-y-8 overflow-y-auto p-8">
          {/* 수급자 정보 요약 카드 (안전 장치) */}
          <div className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5C8D5A] text-lg font-black text-white shadow-md shadow-emerald-100">
                {resident.name.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-black text-gray-900">{resident.name} 어르신</p>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-[#5C8D5A]">
                  <span>{resident.birth}</span>
                  <span className="h-2 w-[1px] bg-emerald-200"></span>
                  <span>입소일: {resident.admissionDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="mb-1 text-[9px] font-black uppercase leading-none tracking-widest text-gray-400">Status</p>
              <span className="rounded border border-emerald-200 bg-white px-2 py-1 text-[10px] font-black text-[#5C8D5A] shadow-sm">
                대상자 확인됨
              </span>
            </div>
          </div>

          {/* 적용 기간 설정 */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block flex items-center gap-1.5 text-[11px] font-black uppercase tracking-tighter text-gray-500">
                <i className="ri-calendar-event-line text-[#5C8D5A]"></i> 적용 시작일 *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full rounded border border-gray-300 px-4 py-2.5 font-mono text-[13px] font-bold text-gray-800 shadow-sm outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-tighter text-gray-500">
                적용 종료일 (선택)
              </label>
              <input
                type="date"
                value={formData.endDate || ''}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full rounded border border-gray-300 px-4 py-2.5 font-mono text-[13px] font-bold text-gray-400 shadow-sm outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </div>
          </div>

          {/* 부담률 종류 선택 그리드 */}
          <div>
            <label className="mb-3 block text-[11px] font-black uppercase tracking-tighter text-gray-500">
              본인부담 자격 구분 *
            </label>
            <div className="grid grid-cols-1 gap-3">
              {BURDEN_RATE_TYPES.map(type => (
                <button
                  key={type.value}
                  onClick={() =>
                    setFormData({ ...formData, rateType: type.value, rate: type.rate, rateName: type.label })
                  }
                  className={clsx(
                    'group relative flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all active:scale-[0.99]',
                    formData.rateType === type.value
                      ? 'border-[#5C8D5A] bg-emerald-50 shadow-md'
                      : 'border-gray-100 bg-white hover:border-[#5C8D5A]/30',
                  )}
                >
                  <div className="flex flex-col">
                    <span
                      className={clsx(
                        'text-[13px] font-black tracking-tight',
                        formData.rateType === type.value ? 'text-[#5C8D5A]' : 'text-gray-900',
                      )}
                    >
                      {type.label}
                    </span>
                    <span className="mt-0.5 text-[10px] font-bold text-gray-400">{type.desc}</span>
                  </div>
                  <div
                    className={clsx(
                      'font-mono text-xl font-black',
                      formData.rateType === type.value ? 'text-[#5C8D5A]' : 'text-gray-300 group-hover:text-gray-400',
                    )}
                  >
                    {type.rate}%
                  </div>
                  {formData.rateType === type.value && (
                    <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#5C8D5A] text-white shadow-sm ring-2 ring-white">
                      <i className="ri-check-line text-xs"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 변경 사유 입력 */}
          <div>
            <label className="mb-2 block text-[11px] font-black uppercase tracking-tighter text-gray-500">
              판정 및 변경 사유 *
            </label>
            <textarea
              value={formData.reason}
              onChange={e => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              placeholder="건강보험공단 판정 결과 또는 자격 변동 사유를 상세히 기록하세요."
              className="w-full resize-none rounded-xl border border-gray-300 p-4 text-[13px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
            <p className="mt-2 text-right text-[10px] font-bold uppercase text-gray-400">
              Agape-Care Audit Trail Enabled
            </p>
          </div>
        </div>

        {/* 3. 모달 푸터: 아가페 그린 메인 액션 */}
        <div className="flex justify-end gap-2.5 border-t border-gray-200 bg-[#f8fafc] px-6 py-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-[12px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900"
          >
            취소 (Cancel)
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-10 py-2.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
          >
            <i className="ri-save-3-line text-lg"></i>
            {isEdit ? '수정사항 반영' : '자격 정보 확정 등록'}
          </button>
        </div>
      </div>
    </div>
  );
}
