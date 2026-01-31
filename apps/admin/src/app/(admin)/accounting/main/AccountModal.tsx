'use client';

import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any; // 수정 시 전달받을 데이터
}

/**
 * 계정과목 등록 및 수정 모달
 * Agape-Care ERP 표준 문서 양식 스타일 적용
 */
export default function AccountModal({ onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      code: '',
      name: '',
      accountClass: 'asset',
      accountType: '',
      isDetail: true,
      isActive: true,
      description: '',
    },
  );

  const handleSubmit = () => {
    if (!formData.code || !formData.name) {
      alert('계정코드와 계정명은 필수 입력 항목입니다.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]">
      <div className="animate-in fade-in zoom-in flex w-full max-w-xl flex-col border border-gray-400 bg-white shadow-2xl duration-200">
        {/* 1. 모달 헤더 - Deep Blue 타이틀 바 */}
        <div className="flex items-center justify-between bg-[#1a5a96] px-4 py-2 text-white">
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <i className="ri-list-settings-line"></i>
            {initialData ? '계정과목 정보 수정' : '신규 계정과목 등록'}
          </h3>
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-white/20">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 2. 모달 컨텐츠 - 고밀도 입력 폼 */}
        <div className="space-y-4 bg-white p-5 text-[11px]">
          <section className="space-y-3">
            <div className="mb-2 flex items-center gap-2 border-l-4 border-blue-600 pl-2">
              <span className="text-[12px] font-black text-gray-800">계정 체계 설정</span>
            </div>

            <div className="grid grid-cols-2 border-t border-gray-300">
              {/* 계정 코드 */}
              <InputRow label="계정코드" required>
                <input
                  type="text"
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  placeholder="예: 101"
                  className="w-full border border-gray-300 p-1 font-mono font-bold outline-none focus:border-blue-500"
                />
              </InputRow>
              {/* 계정 과목명 */}
              <InputRow label="계정과목명" required>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="계정 명칭 입력"
                  className="w-full border border-gray-300 p-1 font-bold outline-none focus:border-blue-500"
                />
              </InputRow>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-300">
              {/* 대분류 선택 */}
              <InputRow label="계정 대분류">
                <select
                  value={formData.accountClass}
                  onChange={e => setFormData({ ...formData, accountClass: e.target.value })}
                  className="w-full cursor-pointer border border-gray-300 bg-white p-1 outline-none"
                >
                  <option value="asset">자산 (Asset)</option>
                  <option value="liability">부채 (Liability)</option>
                  <option value="equity">자본 (Equity)</option>
                  <option value="revenue">수익 (Revenue)</option>
                  <option value="expense">비용 (Expense)</option>
                </select>
              </InputRow>
              {/* 중분류 입력 */}
              <InputRow label="계정 중분류">
                <input
                  type="text"
                  value={formData.accountType}
                  onChange={e => setFormData({ ...formData, accountType: e.target.value })}
                  placeholder="예: 유동자산"
                  className="w-full border border-gray-300 p-1 outline-none focus:border-blue-500"
                />
              </InputRow>
            </div>
          </section>

          <section className="space-y-3">
            <div className="mb-2 flex items-center gap-2 border-l-4 border-blue-600 pl-2">
              <span className="text-[12px] font-black text-gray-800">옵션 및 상세설명</span>
            </div>

            {/* 설정 체크박스 영역 */}
            <div className="grid grid-cols-2 gap-4 border border-gray-200 bg-gray-50 p-3">
              <label className="group flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isDetail}
                  onChange={e => setFormData({ ...formData, isDetail: e.target.checked })}
                  className="h-3.5 w-3.5 accent-[#1a5a96]"
                />
                <span className="font-bold text-gray-700">세부계정 여부</span>
                <span className="text-[9px] font-normal text-gray-400">(전표입력 가능)</span>
              </label>
              <label className="group flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-3.5 w-3.5 accent-[#1a5a96]"
                />
                <span className="font-bold text-gray-700">사용 여부</span>
                <span className="text-[9px] font-normal text-gray-400">(조회 및 선택 활성화)</span>
              </label>
            </div>

            {/* 설명 입력 */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500">계정과목 설명</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="해당 계정의 사용 목적 및 특징을 기입하세요."
                className="w-full resize-none border border-gray-300 p-2 leading-normal outline-none focus:border-blue-500"
              />
            </div>
          </section>

          <p className="text-right text-[10px] text-gray-400">* 필수 항목(*) 미입력 시 계정과목이 저장되지 않습니다.</p>
        </div>

        {/* 3. 모달 푸터 - 하단 액션 버튼 */}
        <div className="flex justify-center gap-1.5 border-t border-gray-300 bg-gray-100 px-4 py-3">
          <button
            onClick={handleSubmit}
            className="bg-[#1a5a96] px-8 py-2 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-[#144675]"
          >
            데이터 저장
          </button>
          <button
            onClick={onClose}
            className="border border-gray-400 bg-white px-8 py-2 text-[11px] font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 레이아웃용 입력 행 컴포넌트
 */
function InputRow({ label, children, required }: any) {
  return (
    <div className="flex border-x border-b border-gray-200 last:border-b-0">
      <div className="flex w-24 shrink-0 items-center border-r border-gray-200 bg-blue-50 px-3 py-2 text-[10px] font-bold text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-center bg-white p-1.5">{children}</div>
    </div>
  );
}
