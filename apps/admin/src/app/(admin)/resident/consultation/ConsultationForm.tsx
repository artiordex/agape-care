'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  readonly mode: 'create' | 'detail' | 'edit';
  readonly activeTab: 'consultation' | 'interview';
  readonly recipient: any;
  readonly formData: any;
  readonly setFormData: (data: any) => void;
  readonly onSave: () => void;
  readonly onCancel: () => void;
  readonly categories: any[];
  readonly methods: any[];
}

/**
 * [Component] 상담 및 면담 기록 통합 서식
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 행정 서식 적용
 */
export default function ConsultationForm({
  mode,
  activeTab,
  recipient,
  formData,
  setFormData,
  onSave,
  onCancel,
  categories,
  methods,
}: Props) {
  const isDetail = mode === 'detail';
  const title = activeTab === 'consultation' ? '상담일지' : '면담일지';

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* 1. 수급자 정보 요약 카드 (상단 고정) */}
      <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-100 bg-gray-50 text-2xl font-black text-gray-400 shadow-inner">
              {recipient?.recipientName?.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-gray-900">{recipient?.recipientName} 어르신</h3>
                <span className="rounded-sm border border-[#5C8D5A]/20 bg-[#5C8D5A]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#5C8D5A]">
                  {recipient?.roomNumber}호 / {recipient?.grade}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-bold uppercase italic tracking-tighter text-gray-400">
                {recipient?.gender} / 만 {recipient?.age}세 (입소일: {recipient?.admissionDate})
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] font-black text-gray-500 shadow-sm transition-colors hover:bg-gray-50"
          >
            {isDetail ? '목록으로 돌아가기' : '작성 취소'}
          </button>
        </div>
      </div>

      {/* 2. 메인 기록 서식 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-6 py-4">
          <div className="h-4 w-1 bg-[#5C8D5A]"></div>
          <h4 className="text-[14px] font-black uppercase text-gray-900">
            {title} {isDetail ? '상세 기록 조회' : '전문 기록 작성'}
          </h4>
        </div>

        <div className="space-y-8 p-8">
          {/* 기본 정보 그리드 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormItem label="상담 및 면담 일시" required={!isDetail}>
              <input
                type="datetime-local"
                disabled={isDetail}
                value={formData.occurredAt}
                onChange={e => setFormData({ ...formData, occurredAt: e.target.value })}
                className="w-full rounded border border-gray-300 px-4 py-2.5 font-mono text-[13px] font-bold text-gray-800 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A] disabled:bg-gray-50"
              />
            </FormItem>

            <FormItem label="상담 대상 구분" required={!isDetail}>
              <select
                disabled={isDetail}
                value={formData.targetType}
                onChange={e => setFormData({ ...formData, targetType: e.target.value })}
                className="w-full rounded border border-gray-300 px-4 py-2.5 text-[13px] font-bold text-gray-800 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A] disabled:bg-gray-50"
              >
                <option value="recipient">수급자 본인</option>
                <option value="guardian">보호자 및 대리인</option>
              </select>
            </FormItem>
          </div>

          {/* 보호자 정보 (조건부 노출) */}
          {formData.targetType === 'guardian' && (
            <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-orange-100 bg-orange-50/30 p-6">
              <div className="mb-4 flex items-center gap-2">
                <i className="ri-parent-line text-orange-500"></i>
                <h5 className="text-[11px] font-black uppercase tracking-widest text-orange-600">
                  인도 보호자 정보 기록
                </h5>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormItem label="보호자 성함" required={!isDetail}>
                  <input
                    type="text"
                    disabled={isDetail}
                    value={formData.guardianName}
                    onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[12px] font-bold outline-none focus:border-orange-400"
                  />
                </FormItem>
                <FormItem label="관계">
                  <input
                    type="text"
                    disabled={isDetail}
                    value={formData.guardianRelation}
                    onChange={e => setFormData({ ...formData, guardianRelation: e.target.value })}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[12px] font-bold outline-none focus:border-orange-400"
                  />
                </FormItem>
                <FormItem label="비상 연락처" required={!isDetail}>
                  <input
                    type="tel"
                    disabled={isDetail}
                    value={formData.guardianPhone}
                    onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-[12px] font-bold outline-none focus:border-orange-400"
                  />
                </FormItem>
              </div>
            </div>
          )}

          {/* 상담 분류 및 방법 그리드 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormItem label="상담 세부 구분" required={!isDetail}>
              <select
                disabled={isDetail}
                value={formData.categoryCode}
                onChange={e => setFormData({ ...formData, categoryCode: e.target.value })}
                className="w-full rounded border border-gray-300 px-4 py-2.5 text-[13px] font-bold text-gray-800 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A] disabled:bg-gray-50"
              >
                <option value="">분류를 선택하세요</option>
                {categories.map(cat => (
                  <option key={cat.code} value={cat.code}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </FormItem>

            <FormItem label="상담 수행 방법" required={!isDetail}>
              <select
                disabled={isDetail}
                value={formData.methodCode}
                onChange={e => setFormData({ ...formData, methodCode: e.target.value })}
                className="w-full rounded border border-gray-300 px-4 py-2.5 text-[13px] font-bold text-gray-800 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A] disabled:bg-gray-50"
              >
                <option value="">방법을 선택하세요</option>
                {methods.map(met => (
                  <option key={met.code} value={met.code}>
                    {met.name}
                  </option>
                ))}
              </select>
            </FormItem>
          </div>

          {/* 상담 내용 및 조치 내용 (메인 텍스트 영역) */}
          <div className="space-y-6">
            <FormItem label="상담 주요 내용 (양방향 소통 기록 필수)" required={!isDetail}>
              <textarea
                disabled={isDetail}
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                placeholder="일방향 공지가 아닌, 수급자/보호자와의 실제 대화 내용을 구체적으로 기록하세요."
                className="w-full resize-none rounded-xl border border-gray-300 p-5 text-[13px] font-medium leading-relaxed shadow-inner outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A] disabled:bg-[#f8fafc]"
              />
            </FormItem>

            <FormItem label="사후 조치 및 반영 결과">
              <textarea
                disabled={isDetail}
                value={formData.actionContent}
                onChange={e => setFormData({ ...formData, actionContent: e.target.value })}
                rows={4}
                placeholder="상담 결과에 따른 시설 내 조치 사항 또는 급여 제공 계획 반영 내용을 입력하세요."
                className="w-full resize-none rounded-xl border border-gray-300 p-5 text-[13px] font-medium leading-relaxed shadow-inner outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A] disabled:bg-[#f8fafc]"
              />
            </FormItem>
          </div>
        </div>

        {/* 3. 하단 액션 바 */}
        {!isDetail && (
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-[#f8fafc] px-8 py-5">
            <button
              onClick={onCancel}
              className="px-6 py-2.5 text-[12px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-10 py-2.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
            >
              <i className="ri-save-3-line text-lg"></i>
              전문 기록 저장 및 확정
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** 내부 서브 컴포넌트: 폼 아이템 레이아웃 */
function FormItem({ label, children, required }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1 text-[11px] font-black uppercase tracking-tighter text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
