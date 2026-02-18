/**
 * Description : ConsultationModal.tsx - ?? ?? UI ????
 * 이미지(image_74f0a5.png)의 입력 양식과 가이드 텍스트 완벽 반영
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700 w-[110px]';
  const tdClass = 'border border-[#B8D1E0] px-3 py-1.5 text-[12px] text-gray-900 bg-white';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-[850px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
          <h2 className="text-lg font-black text-gray-800">상담일지 신규작성</h2>
          <button onClick={onClose} className="text-gray-500 transition-colors hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        <div className="max-h-[85vh] overflow-y-auto p-4">
          {/* 1. 수급자 정보 요약 */}
          <div className="mb-4">
            <div className="mb-1 flex items-center gap-1 text-[13px] font-black text-[#2E6A9E]">
              <i className="ri-play-fill"></i> 수급자 정보
            </div>
            <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
              <tbody>
                <tr>
                  <th className={thClass}>수급자명</th>
                  <td className={tdClass}>가나다</td>
                  <th className={thClass}>성별/나이</th>
                  <td className={tdClass}>여 / 만 81세</td>
                  <th className={thClass}>생활실</th>
                  <td className={tdClass}>너와나</td>
                  <th className={thClass}>입소일</th>
                  <td className={tdClass}>2026.01.23</td>
                </tr>
                <tr>
                  <th className={thClass}>주요질환</th>
                  <td colSpan={7} className={clsx(tdClass, 'font-bold text-blue-700')}>
                    관절염, 약간의 인지저하, 당뇨있음
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. 상담일지 본문 */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[13px] font-black text-[#2E6A9E]">
                <i className="ri-play-fill"></i> 상담일지
              </div>
              <button className="rounded border border-[#57A5CE] bg-[#E8F1F8] px-2 py-0.5 text-[11px] font-bold text-[#2E6A9E] shadow-sm">
                이전 상담일지 불러오기
              </button>
            </div>
            <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
              <tbody>
                <tr>
                  <th className={thClass}>
                    상담일시 <span className="text-red-500">*</span>
                  </th>
                  <td colSpan={3} className={tdClass}>
                    <div className="flex items-center gap-1">
                      <input type="date" defaultValue="2026-02-06" className="border px-1 font-mono outline-none" />
                      <input type="text" className="w-8 border px-1 text-center outline-none" /> :{' '}
                      <input type="text" className="w-8 border px-1 text-center outline-none" /> ~
                      <input type="text" className="w-8 border px-1 text-center outline-none" /> :{' '}
                      <input type="text" className="w-8 border px-1 text-center outline-none" />
                      <label className="ml-2 flex items-center gap-1 text-[11px] text-gray-500">
                        <input type="checkbox" /> 상담불가
                      </label>
                    </div>
                  </td>
                  <th className={thClass}>상담구분</th>
                  <td className={tdClass}>
                    <select className="w-full border outline-none">
                      <option>-상담구분-</option>
                    </select>
                  </td>
                  <th className={thClass}>
                    상담직원명 <span className="text-red-500">*</span>
                  </th>
                  <td className={tdClass}>
                    <div className="flex items-center justify-between">
                      <span>최인경</span>
                      <button className="rounded bg-[#7A8B9A] px-1.5 text-[10px] text-white">선택</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>
                    상담대상자명(관계) <span className="text-red-500">*</span>
                    <br />
                    <span className="text-[10px] font-normal text-gray-400">(수급자/보호자)</span>
                  </th>
                  <td colSpan={3} className={tdClass}>
                    <div className="flex gap-1">
                      <input type="text" defaultValue="123" className="w-24 border px-2 outline-none" />
                      <input type="text" placeholder="관계" className="w-20 border px-2 outline-none" />
                      <button className="rounded bg-[#57A5CE] px-2 py-0.5 text-[11px] font-bold text-white">
                        상담대상자 선택
                      </button>
                    </div>
                  </td>
                  <th className={thClass}>
                    상담방법 <span className="text-red-500">*</span>
                  </th>
                  <td colSpan={3} className={tdClass}>
                    <select className="w-full border outline-none">
                      <option>-상담방법-</option>
                    </select>
                  </td>
                </tr>
                {/* 상담내용 Area */}
                <tr>
                  <th className={clsx(thClass, 'h-48')}>
                    상담내용 <span className="text-red-500">*</span>
                    <button className="mt-2 block w-full rounded border border-[#57A5CE] bg-[#E8F1F8] py-1 text-[10px] font-bold text-[#2E6A9E]">
                      급여제공
                      <br />
                      특이사항 조회
                    </button>
                  </th>
                  <td colSpan={7} className="p-0">
                    <div className="relative h-full">
                      <textarea
                        className="h-48 w-full resize-none p-3 text-[12px] leading-relaxed outline-none placeholder:text-gray-300"
                        placeholder="※ SNS 등에 공지·안내만 하는 일방향 소통은 인정되지 않으며, 양방향 소통이 이루어진 경우만 인정함..."
                      />
                    </div>
                  </td>
                </tr>
                {/* 조치내용 Area */}
                <tr>
                  <th className={thClass}>조치내용</th>
                  <td colSpan={7} className="p-0">
                    <textarea className="h-24 w-full resize-none p-3 text-[12px] outline-none" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. 자료첨부 섹션 (image_74f0a5.png 하단) */}
          <div className="group flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-[#B8D1E0] bg-white p-6 transition-colors hover:border-[#57A5CE]">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="mb-1 text-[11px] font-bold text-gray-400">자료첨부</span>
                <button className="rounded bg-[#7A8B9A] px-3 py-1 text-[11px] font-bold text-white">자료선택</button>
                <span className="mt-1 text-[9px] text-gray-400">(최대 10MB x 10개)</span>
              </div>
              <div className="h-12 w-[1px] bg-gray-200"></div>
              <p className="text-[12px] font-medium text-gray-400">
                첨부할 파일을 여기에 끌어다 놓거나 자료선택 버튼을 이용해 선택할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="flex justify-center gap-1.5 border-t border-gray-200 bg-[#F8FAFC] px-4 py-3">
          <button className="rounded-sm bg-[#57A5CE] px-10 py-2 text-[13px] font-black text-white shadow-md hover:bg-[#468db3]">
            저장
          </button>
          <button
            onClick={onClose}
            className="rounded-sm bg-[#666] px-10 py-2 text-[13px] font-black text-white shadow-md"
          >
            창닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
