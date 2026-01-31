'use client';

import React, { useState, useEffect } from 'react';

/**
 * 장기요양보험 청구 상세 입력/수정 모달
 * [Document Style] 청구 명세서 양식 적용
 */
export default function ClaimModal({ claim, residents, selectedMonth, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    month: claim?.month || selectedMonth,
    residentId: claim?.residentId || '',
    residentName: claim?.residentName || '',
    grade: claim?.grade || '',
    serviceDays: claim?.serviceDays || 30,
    serviceAmount: claim?.serviceAmount || 0,
    copayment: claim?.copayment || 0,
    insuranceAmount: claim?.insuranceAmount || 0,
    notes: claim?.notes || '',
  });

  // 자동 계산 로직: 공단부담금 = 총액 - 본인부담금
  useEffect(() => {
    const insurance = formData.serviceAmount - formData.copayment;
    setFormData(prev => ({ ...prev, insuranceAmount: insurance }));
  }, [formData.serviceAmount, formData.copayment]);

  const handleResidentChange = (residentId: string) => {
    const resident = residents.find((r: any) => r.id === residentId);
    if (resident) {
      setFormData({
        ...formData,
        residentId: resident.id,
        residentName: resident.name,
        grade: resident.grade || '미정',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 text-[11px] backdrop-blur-[1px]">
      <div className="animate-in fade-in zoom-in flex w-full max-w-2xl flex-col border border-gray-400 bg-white shadow-2xl duration-200">
        {/* 1. 모달 헤더 - 명세서 타이틀 바 */}
        <div className="flex items-center justify-between bg-[#1a5a96] px-4 py-2 text-white">
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <i className="ri-file-list-3-line"></i>
            장기요양급여 청구 명세서 {claim ? '(수정)' : '(신규)'}
          </h3>
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-white/20">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 2. 모달 컨텐츠 - 문서 서식 스타일 */}
        <div className="max-h-[80vh] space-y-5 overflow-y-auto bg-white p-6">
          {/* 수급자 정보 섹션 */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-l-4 border-blue-600 pl-2">
              <span className="text-[12px] font-black tracking-tight text-gray-800">대상자 인적사항</span>
            </div>
            <div className="grid grid-cols-2 border-t border-gray-300">
              <InputRow label="수급자 선택" required>
                <select
                  value={formData.residentId}
                  onChange={e => handleResidentChange(e.target.value)}
                  className="w-full border border-gray-300 p-1 font-bold outline-none focus:border-blue-500"
                >
                  <option value="">대상자를 선택하세요</option>
                  {residents.map((r: any) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.bedNumber}호)
                    </option>
                  ))}
                </select>
              </InputRow>
              <InputRow label="청구대상월">
                <input
                  type="month"
                  value={formData.month}
                  onChange={e => setFormData({ ...formData, month: e.target.value })}
                  className="w-full border border-gray-300 p-1 font-mono outline-none"
                />
              </InputRow>
            </div>
            <div className="grid grid-cols-2 border-b border-gray-300">
              <InputRow label="장기요양등급">
                <input
                  type="text"
                  value={formData.grade}
                  readOnly
                  className="w-full bg-gray-50 p-1 font-bold text-gray-500 outline-none"
                />
              </InputRow>
              <InputRow label="급여일수" required>
                <input
                  type="number"
                  value={formData.serviceDays}
                  onChange={e => setFormData({ ...formData, serviceDays: Number(e.target.value) })}
                  className="w-full border border-gray-300 p-1 text-right font-mono outline-none focus:bg-yellow-50"
                />
              </InputRow>
            </div>
          </section>

          {/* 금액 산출 섹션 */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-l-4 border-blue-600 pl-2">
              <span className="text-[12px] font-black tracking-tight text-gray-800">급여비용 산출 내역</span>
            </div>
            <div className="grid grid-cols-1 space-y-4 border-y border-gray-300 bg-gray-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-gray-600">A. 총 급여비용 합계</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.serviceAmount}
                    onChange={e => setFormData({ ...formData, serviceAmount: Number(e.target.value) })}
                    className="w-40 border-b border-gray-400 bg-transparent text-right font-mono text-lg font-black outline-none focus:border-blue-600"
                  />
                  <span className="font-bold text-gray-400">원</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-gray-600">B. 본인부담금 (수급자 부담)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.copayment}
                    onChange={e => setFormData({ ...formData, copayment: Number(e.target.value) })}
                    className="w-40 border-b border-gray-400 bg-transparent text-right font-mono font-bold text-[#1a5a96] outline-none focus:border-blue-600"
                  />
                  <span className="font-bold text-gray-400">원</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-2 border-dotted border-gray-300 pt-3">
                <span className="text-[10px] font-black uppercase text-emerald-700">C. 공단부담금 (최종 청구액)</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-black text-emerald-600">
                    {formData.insuranceAmount.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-emerald-600/50">원</span>
                </div>
              </div>
            </div>
          </section>

          {/* 비고 섹션 */}
          <section>
            <div className="mb-2 flex items-center gap-2 border-l-4 border-blue-600 pl-2">
              <span className="text-[12px] font-black tracking-tight text-gray-800">특이사항 및 비고</span>
            </div>
            <textarea
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="청구와 관련된 특이사항(외박, 입원 등)을 기입하세요."
              className="h-20 w-full resize-none border border-gray-300 p-2 leading-relaxed text-gray-600 outline-none focus:border-blue-500"
            />
          </section>

          <p className="text-right text-[10px] font-medium italic text-gray-400">
            * 상기 금액은 보건복지부 고시 장기요양급여 수가를 기준으로 산출되었습니다.
          </p>
        </div>

        {/* 3. 모달 푸터 - 액션 버튼 */}
        <div className="flex justify-center gap-1.5 border-t border-gray-300 bg-gray-100 px-4 py-4">
          <button
            onClick={() => onSave(formData)}
            className="bg-[#1a5a96] px-10 py-2 text-[11px] font-bold text-white shadow-md transition-all hover:bg-[#144675] active:scale-95"
          >
            명세서 저장
          </button>
          <button
            onClick={onClose}
            className="border border-gray-400 bg-white px-10 py-2 text-[11px] font-bold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 문서 스타일 입력 행 컴포넌트
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
