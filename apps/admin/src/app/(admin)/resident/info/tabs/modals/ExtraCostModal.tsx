/**
 * Description : ExtraCostModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly residentName?: string;
}

export default function ExtraCostModal({ isOpen, onClose, residentName = '가나다' }: Props) {
  const [billingStatus, setBillingStatus] = useState<'yes' | 'no'>('yes');

  if (!isOpen) return null;

  // 공통 스타일 클래스
  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-2 text-center text-[12px] font-bold text-gray-700 w-[120px]';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900 bg-white';
  const inputClass = 'border border-gray-300 px-2 py-1 outline-none focus:border-[#57A5CE] text-[12px]';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-[850px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 1. 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
          <h2 className="text-lg font-black tracking-tight text-gray-800">기타 비용</h2>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {/* 2. 메인 입력 폼 (이미지 image_76498b.png 구조 재현) */}
          <div className="border border-[#2E6A9E] p-[1px]">
            <table className="w-full table-fixed border-collapse">
              <tbody>
                <tr>
                  <th className={thClass}>청구년월</th>
                  <td className={tdClass}>2026년 02월</td>
                  <th className={thClass}>청구서 생성여부</th>
                  <td className={tdClass}>생성전</td>
                </tr>
                <tr>
                  <th className={thClass}>
                    발생일 <span className="text-red-500">*</span>
                  </th>
                  <td className={tdClass}>
                    <div className="flex items-center gap-1">
                      <input type="date" defaultValue="2026-02-06" className={clsx(inputClass, 'font-mono')} />
                    </div>
                  </td>
                  <th className={thClass}>
                    비용처리자 <span className="text-red-500">*</span>
                  </th>
                  <td className={tdClass}>
                    <div className="flex items-center justify-between">
                      <span>최인경</span>
                      <button className="rounded bg-[#7A8B9A] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                        선택
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>
                    비용발생 항목 <span className="text-red-500">*</span>
                  </th>
                  <td className={tdClass}>
                    <div className="flex gap-1">
                      <input type="text" className={clsx(inputClass, 'flex-1')} />
                      <button className="whitespace-nowrap rounded bg-[#7A8B9A] px-2 py-0.5 text-[11px] font-bold text-white">
                        비용항목 불러오기
                      </button>
                    </div>
                  </td>
                  <th className={thClass}>
                    금액 <span className="text-red-500">*</span>
                  </th>
                  <td className={tdClass}>
                    <div className="flex items-center gap-1">
                      <input type="text" defaultValue="0" className={clsx(inputClass, 'w-full text-right font-bold')} />
                      <span className="font-bold">원</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>상세내용</th>
                  <td className={tdClass}>
                    <input type="text" className={clsx(inputClass, 'w-full')} />
                  </td>
                  <th className={thClass}>
                    본인부담금 청구여부 <i className="ri-question-line text-gray-400"></i>
                  </th>
                  <td className={tdClass}>
                    <div className="flex gap-4">
                      <label className="flex cursor-pointer items-center gap-1">
                        <input
                          type="radio"
                          name="billing"
                          checked={billingStatus === 'yes'}
                          onChange={() => setBillingStatus('yes')}
                          className="accent-[#E67E22]"
                        />
                        <span className={clsx(billingStatus === 'yes' && 'font-bold text-[#E67E22]')}>청구함</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-1">
                        <input
                          type="radio"
                          name="billing"
                          checked={billingStatus === 'no'}
                          onChange={() => setBillingStatus('no')}
                          className="accent-[#E67E22]"
                        />
                        <span>청구안함</span>
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. 영수증 첨부 섹션 */}
          <div className="flex overflow-hidden rounded-sm border border-[#57A5CE]">
            <div className="flex w-[140px] flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-3">
              <span className="flex items-center gap-1 text-[12px] font-bold text-gray-700">
                영수증첨부 <i className="ri-question-line text-gray-400"></i>
              </span>
              <button className="mt-2 rounded bg-[#7A8B9A] px-3 py-1 text-[11px] font-bold text-white">자료선택</button>
              <span className="mt-1 text-[9px] text-gray-400">(최대 10MB x 10개)</span>
              <span className="text-[9px] font-bold text-red-500">※ 사진만 첨부가능</span>
            </div>
            <div className="m-2 flex flex-1 flex-col items-center justify-center rounded-sm border-2 border-dashed border-gray-100 bg-white p-6">
              <div className="flex flex-col items-center gap-2 opacity-40">
                <i className="ri-drag-drop-line text-4xl"></i>
                <p className="text-center text-[12px]">
                  첨부할 파일을 여기에 끌어다 놓거나
                  <br />
                  자료선택 버튼을 이용해 선택할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 4. 하단 안내 문구 */}
          <div className="rounded-sm border border-gray-200 bg-[#F1F5F9] px-4 py-2">
            <p className="text-center text-[11px] leading-relaxed text-gray-500">
              ※ 영수증을 첨부할 경우 청구서를 조회한 보호자가 첨부한 영수증을 확인할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 5. 모달 푸터 버튼 */}
        <div className="flex justify-center gap-1.5 border-t border-gray-200 bg-[#F8FAFC] px-4 py-3">
          <button className="rounded-sm bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] px-14 py-2.5 text-[14px] font-black text-white shadow-md transition-all active:scale-95">
            저장
          </button>
          <button
            onClick={onClose}
            className="rounded-sm bg-[#666] px-12 py-2.5 text-[14px] font-black text-white shadow-md hover:bg-[#555]"
          >
            창닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
