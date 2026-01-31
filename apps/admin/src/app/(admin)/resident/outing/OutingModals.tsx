'use client';

import React from 'react';
import clsx from 'clsx';

/**
 * [Modal 1] 외출·외박 신규 작성 모달
 * 아가페 그린(#5C8D5A) 테마 및 격자형 입력 서식 적용
 */
export function AddOutingModal({ isOpen, onClose, resident, formData, setFormData, onAdd }: any) {
  if (!isOpen || !resident) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in zoom-in-95 w-full max-w-2xl overflow-hidden rounded-xl border border-gray-300 bg-white shadow-2xl duration-200">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 bg-[#5C8D5A]"></div>
            <h3 className="text-[14px] font-black uppercase text-gray-900">외출·외박 신규 기록 작성</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-900">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 입력 폼 본문 */}
        <div className="custom-scrollbar max-h-[75vh] space-y-6 overflow-y-auto p-6">
          {/* 선택된 어르신 정보 요약 */}
          <div className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A] text-sm font-black text-white">
                {resident.name.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-black text-gray-900">{resident.name} 어르신</p>
                <p className="text-[10px] font-bold uppercase text-[#5C8D5A]">
                  {resident.room} / {resident.grade}
                </p>
              </div>
            </div>
            <span className="rounded border border-emerald-200 bg-white px-2 py-1 text-[10px] font-black text-emerald-700">
              대상자 확정
            </span>
          </div>

          {/* 1. 구분 및 일정 설정 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1.5 block text-[11px] font-black uppercase tracking-tighter text-gray-500">
                발생 구분 *
              </label>
              <div className="flex gap-2">
                {['외출', '외박', '병원외래'].map((type: any) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, type })}
                    className={clsx(
                      'flex-1 rounded border py-2 text-[12px] font-black transition-all active:scale-95',
                      formData.type === type
                        ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white shadow-md'
                        : 'border-gray-300 bg-white text-gray-500 hover:border-[#5C8D5A]',
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <InputGroup
              label="출발 일자 *"
              type="date"
              value={formData.departureDate}
              onChange={(v: any) => setFormData({ ...formData, departureDate: v })}
            />
            <InputGroup
              label="출발 시간 *"
              type="time"
              value={formData.departureTime}
              onChange={(v: any) => setFormData({ ...formData, departureTime: v })}
            />
            <InputGroup
              label="복귀 예정 일자"
              type="date"
              value={formData.expectedReturnDate}
              onChange={(v: any) => setFormData({ ...formData, expectedReturnDate: v })}
            />
            <InputGroup
              label="복귀 예정 시간"
              type="time"
              value={formData.expectedReturnTime}
              onChange={(v: any) => setFormData({ ...formData, expectedReturnTime: v })}
            />
          </div>

          {/* 2. 목적지 및 상세 정보 */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <SelectGroup
              label="행선지 *"
              value={formData.destination}
              onChange={(v: any) => setFormData({ ...formData, destination: v })}
              options={['자택', '병원', '친지', '기타']}
            />
            <InputGroup
              label="방문 목적 *"
              placeholder="진료, 가족행사 등"
              value={formData.purpose}
              onChange={(v: any) => setFormData({ ...formData, purpose: v })}
            />
            {formData.type === '병원외래' && (
              <div className="animate-in fade-in slide-in-from-top-1 col-span-2">
                <InputGroup
                  label="병원 명칭"
                  placeholder="정확한 병원명을 입력하세요"
                  value={formData.hospital}
                  onChange={(v: any) => setFormData({ ...formData, hospital: v })}
                />
              </div>
            )}
          </div>

          {/* 3. 인도 보호자 정보 */}
          <div className="space-y-4 rounded-xl border border-gray-200 bg-[#f8fafc] p-5">
            <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <i className="ri-parent-line text-[#5C8D5A]"></i> 인도 보호자 정보
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="보호자 성함"
                value={formData.guardianName}
                onChange={(v: any) => setFormData({ ...formData, guardianName: v })}
              />
              <SelectGroup
                label="관계"
                value={formData.guardianRelation}
                onChange={(v: any) => setFormData({ ...formData, guardianRelation: v })}
                options={['자녀', '배우자', '형제', '기타']}
              />
              <div className="col-span-2">
                <InputGroup
                  label="긴급 연락처"
                  placeholder="010-0000-0000"
                  value={formData.guardianPhone}
                  onChange={(v: any) => setFormData({ ...formData, guardianPhone: v })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-black uppercase text-gray-500">특이사항 및 간호 일지</label>
            <textarea
              className="h-24 w-full resize-none rounded border border-gray-300 p-3 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              placeholder="투약 관리, 이동 보조 시 주의사항 등을 기록하세요."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </div>

        {/* 모달 푸터 액션 */}
        <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-[12px] font-black uppercase text-gray-400 transition-colors hover:text-gray-900"
          >
            취소
          </button>
          <button
            onClick={onAdd}
            className="rounded-md bg-[#5C8D5A] px-8 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
          >
            외출·외박 기록 확정
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * [Modal 2] 복귀 처리 모달
 */
export function ReturnOutingModal({ isOpen, onClose, record, formData, setFormData, onConfirm }: any) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in slide-in-from-bottom-4 w-full max-w-md rounded-xl border border-gray-300 bg-white shadow-2xl duration-300">
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-[#5C8D5A]">
            <i className="ri-check-double-line text-3xl"></i>
          </div>
          <h3 className="text-xl font-black leading-tight text-gray-900">어르신이 복귀하셨습니까?</h3>
          <p className="mt-2 text-[13px] font-bold text-gray-400">
            {record.residentName} 어르신의 복귀 시각을 기록하고
            <br />
            외출 상태를 해제합니다.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <InputGroup
              label="실제 복귀 일자"
              type="date"
              value={formData.returnDate}
              onChange={(v: any) => setFormData({ ...formData, returnDate: v })}
            />
            <InputGroup
              label="실제 복귀 시간"
              type="time"
              value={formData.returnTime}
              onChange={(v: any) => setFormData({ ...formData, returnTime: v })}
            />
          </div>
        </div>
        <div className="flex border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 border-r py-4 text-[13px] font-black text-gray-400 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-4 text-[13px] font-black text-[#5C8D5A] transition-colors hover:bg-emerald-50"
          >
            복귀 처리 완료
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= 공통 서식 컴포넌트 ================= */

function InputGroup({ label, type = 'text', value, onChange, placeholder }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-black uppercase tracking-tighter text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-[12px] font-bold text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
      />
    </div>
  );
}

function SelectGroup({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-black uppercase tracking-tighter text-gray-500">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
      >
        <option value="">선택하세요</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
