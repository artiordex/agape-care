'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import type { Medication } from './MedicationListTable';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: Partial<Medication>) => void;
  readonly medication?: Medication | null;
}

/**
 * [Modal] 약품 정보 등록 및 수정 폼
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 데이터 엔트리 레이아웃 적용
 */
export default function MedicationFormModal({ isOpen, onClose, onSave, medication }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    dosage: '',
    unit: 'mg',
    stock: 0,
    minStock: 0,
    expiryDate: '',
    manufacturer: '',
    notes: '',
  });

  useEffect(() => {
    if (medication) {
      setFormData({ ...medication });
    } else {
      setFormData({
        name: '',
        type: '',
        dosage: '',
        unit: 'mg',
        stock: 0,
        minStock: 0,
        expiryDate: '',
        manufacturer: '',
        notes: '',
      });
    }
  }, [medication, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('약품명을 입력하세요.');
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
        {/* 헤더: 아가페 그린 포인트 */}
        <div className="flex items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <i className="ri-capsule-line text-xl opacity-80"></i>
            <h2 className="text-sm font-black uppercase tracking-widest">
              {medication ? 'Medication Data Revision' : 'New Medication Entry'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 폼 내용: 고밀도 그리드 레이아웃 */}
        <form onSubmit={handleSubmit} className="space-y-5 p-7">
          <div className="space-y-4">
            <FormInput
              label="약품 명칭 (Medication Name)"
              required
              placeholder="예: 아스피린 100mg"
              value={formData.name}
              onChange={v => setFormData({ ...formData, name: v })}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="종류 (Category)"
                required
                placeholder="예: 혈압약"
                value={formData.type}
                onChange={v => setFormData({ ...formData, type: v })}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase italic tracking-tighter text-gray-400">
                  규격 및 단위
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="용량"
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
                    value={formData.dosage}
                    onChange={e => setFormData({ ...formData, dosage: e.target.value })}
                  />
                  <select
                    className="w-20 rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-[12px] font-black text-[#5C8D5A]"
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                  >
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="정">정</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
              <FormInput
                label="현재 재고량"
                type="number"
                value={formData.stock}
                onChange={v => setFormData({ ...formData, stock: Number(v) })}
                isMono
              />
              <FormInput
                label="안전 재고 (Alert)"
                type="number"
                value={formData.minStock}
                onChange={v => setFormData({ ...formData, minStock: Number(v) })}
                isMono
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="유효기간 (EXP)"
                type="date"
                value={formData.expiryDate}
                onChange={v => setFormData({ ...formData, expiryDate: v })}
                isMono
              />
              <FormInput
                label="제조/공급사"
                placeholder="Agape Pharma"
                value={formData.manufacturer}
                onChange={v => setFormData({ ...formData, manufacturer: v })}
              />
            </div>

            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-[10px] font-black uppercase italic tracking-tighter text-gray-400">
                복용 지침 및 비고 (Operational Notes)
              </label>
              <textarea
                rows={3}
                placeholder="식후 30분, 분쇄 주의 등 필수 정보를 입력하세요."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium shadow-inner outline-none focus:border-[#5C8D5A]"
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          {/* 하단 액션: 아가페 그린 적용 */}
          <div className="mt-4 flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#5C8D5A] py-3.5 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
            >
              {medication ? '데이터 업데이트 완료' : '신규 약품 마스터 등록'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-24 rounded-xl border border-gray-200 bg-white py-3.5 text-[13px] font-bold text-gray-400 hover:bg-gray-50"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** [Sub] 모달 전용 입력 필드 */
function FormInput({ label, required, isMono, ...props }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase italic tracking-tighter text-gray-400">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={clsx(
          'w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-emerald-50',
          isMono && 'font-mono',
        )}
      />
    </div>
  );
}
