'use client';

import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  type: 'income' | 'expense';
}

/**
 * 수입/지출 거래 등록 모달
 * Agape-Care ERP 표준: 결의서 양식 스타일 적용
 */
export default function TransactionModal({ onClose, onSave, type }: Props) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: 0,
    paymentMethod: '계좌이체',
    accountNumber: '',
    memo: '',
    hasEvidence: false,
  });

  const isIncome = type === 'income';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]">
      <div className="animate-in fade-in zoom-in flex w-full max-w-2xl flex-col border border-gray-400 bg-white shadow-2xl duration-200">
        {/* 1. 모달 헤더 - 결의서 타이틀 바 */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 text-white ${isIncome ? 'bg-[#1a5a96]' : 'bg-[#c23e3e]'}`}
        >
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <i className={isIncome ? 'ri-arrow-down-circle-line' : 'ri-arrow-up-circle-line'}></i>
            {isIncome ? '수입 결의서 등록' : '지출 결의서 등록'}
            <span className="ml-2 text-[10px] font-normal opacity-80">| No. 20260130-TEMP</span>
          </h3>
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-white/20">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 2. 모달 컨텐츠 - 고밀도 문서 스타일 폼 */}
        <div className="space-y-6 bg-white p-6 text-[11px]">
          {/* 기본 정보 섹션 */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-300 pb-1.5">
              <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-2">
                <span className="text-[12px] font-black text-gray-800">거래 기본 정보</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400">* 항목은 필수 입력 사항입니다.</span>
            </div>

            <div className="grid grid-cols-2 border-t border-gray-300">
              <InputRow label="거래일자" required>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-gray-300 p-1 font-bold outline-none focus:border-blue-500"
                />
              </InputRow>
              <InputRow label="계정과목" required>
                <div className="flex w-full gap-1">
                  <input
                    type="text"
                    placeholder="계정 선택"
                    className="flex-1 border border-gray-300 bg-gray-50 p-1 outline-none"
                    readOnly
                  />
                  <button className="bg-gray-700 px-2 py-1 font-bold text-white transition-colors hover:bg-black">
                    조회
                  </button>
                </div>
              </InputRow>
            </div>

            <div className="grid grid-cols-2">
              <InputRow label="결제방법">
                <select
                  value={formData.paymentMethod}
                  onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full cursor-pointer border border-gray-300 bg-white p-1 font-bold outline-none"
                >
                  <option value="계좌이체">계좌이체</option>
                  <option value="카드">법인카드</option>
                  <option value="현금">현금(영수증)</option>
                </select>
              </InputRow>
              <InputRow label="거래금액" required>
                <div className="flex w-full items-center gap-1">
                  <input
                    type="number"
                    placeholder="0"
                    className={`flex-1 border border-gray-300 p-1 text-right font-mono text-[13px] font-black outline-none focus:bg-yellow-50 ${isIncome ? 'text-blue-700' : 'text-red-600'}`}
                  />
                  <span className="font-bold text-gray-500">원</span>
                </div>
              </InputRow>
            </div>

            <div className="grid grid-cols-1 border-b border-gray-300">
              <InputRow label="적요 (내용)" required>
                <input
                  type="text"
                  placeholder="거래 목적 및 상세 내용을 입력하세요."
                  className="w-full border border-gray-300 p-1 font-bold outline-none focus:border-blue-500"
                />
              </InputRow>
            </div>
          </section>

          {/* 증빙 및 메모 섹션 */}
          <section className="space-y-3">
            <div className="mb-2 flex items-center gap-2 border-l-4 border-blue-600 pl-2">
              <span className="text-[12px] font-black text-gray-800">증빙 자료 및 부가 정보</span>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* 영수증 업로드 영역 */}
              <div className="group col-span-4 flex min-h-[100px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50 p-4 transition-all hover:border-[#1a5a96]">
                <i className="ri-image-add-line text-2xl text-gray-300 group-hover:text-[#1a5a96]"></i>
                <p className="mt-2 text-[9px] font-bold text-gray-400 group-hover:text-[#1a5a96]">영수증/증빙 첨부</p>
              </div>

              {/* 추가 메모 */}
              <div className="col-span-8">
                <textarea
                  rows={5}
                  placeholder="추가적인 관리 메모나 특이사항을 기입하세요."
                  className="w-full resize-none border border-gray-300 p-2 text-[10px] leading-normal outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          <div className="border-l-2 border-blue-400 bg-blue-50 p-2 text-[10px] text-gray-500">
            <p>※ 등록된 전표는 [전표 관리] 메뉴에서 승인 처리 후 최종 장부에 반영됩니다.</p>
          </div>
        </div>

        {/* 3. 모달 푸터 */}
        <div className="flex justify-center gap-1.5 border-t border-gray-300 bg-gray-100 px-4 py-4">
          <button
            onClick={() => onSave(formData)}
            className={`px-12 py-2 text-[11px] font-bold text-white shadow-md transition-all active:scale-95 ${isIncome ? 'bg-[#1a5a96] hover:bg-[#144675]' : 'bg-[#c23e3e] hover:bg-[#a13232]'}`}
          >
            결의서 저장 및 승인요청
          </button>
          <button
            onClick={onClose}
            className="border border-gray-400 bg-white px-8 py-2 text-[11px] font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 레이아웃용 입력 행 컴포넌트 (AccountModal과 공유 가능)
 */
function InputRow({ label, children, required }: any) {
  return (
    <div className="flex border-x border-b border-gray-200 last:border-b-0">
      <div className="flex w-24 shrink-0 items-center border-r border-gray-200 bg-[#f8fafc] px-3 py-2 text-[10px] font-bold text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-center bg-white p-1.5">{children}</div>
    </div>
  );
}
