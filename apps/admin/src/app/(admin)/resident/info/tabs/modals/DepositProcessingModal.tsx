/**
 * Description : DepositProcessingModal.tsx - 📌 입금 처리 및 수납 관리 모달
 * 이미지(image_76c682.png)의 3단 레이아웃(정보/청구서선택/상세내역) 완벽 재현
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositProcessingModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  // 공통 스타일 클래스
  const sectionTitle = 'flex items-center gap-1 text-[#2E6A9E] font-black text-[13px] mb-2';
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[11px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1.5 text-[11px] text-gray-900 bg-white';
  const inputClass = 'w-full border border-gray-300 px-2 py-1 outline-none focus:border-[#57A5CE] text-[11px]';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-[1150px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
          <h2 className="text-lg font-black italic tracking-tight text-gray-800">입금처리</h2>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        <div className="flex h-[650px] gap-4 p-4">
          {/* --- 좌측 영역: 수급자/입금 정보 및 청구서 선택 --- */}
          <div className="flex flex-[1.2] flex-col gap-4 overflow-y-auto">
            {/* 1. 수급자 정보 */}
            <section>
              <div className={sectionTitle}>
                <i className="ri-play-fill"></i> 수급자 정보
              </div>
              <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
                <tbody>
                  <tr>
                    <th className={clsx(thClass, 'w-24')}>수급자명</th>
                    <td className={tdClass}>안웅기</td>
                    <th className={clsx(thClass, 'w-24')}>보호자</th>
                    <td className={tdClass}>조해민 (사회복지사) 010-8181-7881</td>
                  </tr>
                  <tr>
                    <th className={thClass}>생년월일</th>
                    <td colSpan={3} className={tdClass}>
                      1980.02.25 (남)
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 2. 입금 정보 */}
            <section>
              <div className={sectionTitle}>
                <i className="ri-play-fill"></i> 입금 정보
              </div>
              <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
                <tbody>
                  <tr>
                    <th className={thClass}>입금일</th>
                    <td className={tdClass}>
                      <input type="date" defaultValue="2026-02-06" className={inputClass} />
                    </td>
                    <th className={thClass}>입금액</th>
                    <td className={tdClass}>
                      <input
                        type="text"
                        defaultValue="1,248,000"
                        className={clsx(inputClass, 'text-right text-[13px] font-black')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className={thClass}>입금자명</th>
                    <td className={tdClass}>
                      <input type="text" defaultValue="안웅기" className={inputClass} />
                    </td>
                    <th className={thClass}>입금방법</th>
                    <td className={tdClass}>
                      <select className={inputClass}>
                        <option>계좌이체</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th className={thClass}>
                      조정액 <i className="ri-question-line text-[10px] text-gray-400"></i>
                    </th>
                    <td className={tdClass}>
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={thClass}>조정사유</th>
                    <td className={tdClass}>
                      <input type="text" className={inputClass} />
                    </td>
                  </tr>
                  <tr>
                    <th className={thClass}>입금비고</th>
                    <td className={tdClass}>
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={thClass}>처리자</th>
                    <td className={tdClass}>
                      <div className="flex items-center justify-between">
                        <span>최인경</span>
                        <button className="rounded bg-[#7A8B9A] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 3. 입금 적용 청구서 선택 */}
            <section className="flex-1">
              <div className={sectionTitle}>
                <i className="ri-play-fill"></i> 입금 적용 청구서 선택
              </div>
              <div className="border-t-2 border-[#57A5CE]">
                <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
                  <thead>
                    <tr className="bg-[#E8F1F8]">
                      <th className="w-10 border border-[#B8D1E0] py-1">선택</th>
                      <th className="w-12 border border-[#B8D1E0] text-[10px]">연번</th>
                      <th className="border border-[#B8D1E0] text-[10px]">청구년월</th>
                      <th className="border border-[#B8D1E0] text-[10px]">발행일</th>
                      <th className="border border-[#B8D1E0] text-[10px]">총액</th>
                      <th className="border border-[#B8D1E0] text-[10px]">당월 미납액</th>
                      <th className="border border-[#B8D1E0] text-[10px]">입금적용액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#DCF2D8]">
                      <td className="border border-[#B8D1E0] py-2 text-center">
                        <input type="checkbox" defaultChecked className="accent-[#E67E22]" />
                      </td>
                      <td className="border border-[#B8D1E0] text-center text-[11px]">1</td>
                      <td className="border border-[#B8D1E0] text-center text-[11px]">2026년 01월</td>
                      <td className="border border-[#B8D1E0] text-center text-[11px]">2026.01.01</td>
                      <td className="border border-[#B8D1E0] px-2 text-right text-[11px]">1,248,000 원</td>
                      <td className="border border-[#B8D1E0] px-2 text-right text-[11px] font-bold text-red-600">
                        1,248,000 원
                      </td>
                      <td className="border border-[#B8D1E0] px-2 text-right text-[11px] font-bold text-emerald-700">
                        1,248,000 원
                      </td>
                    </tr>
                    {/* 빈 행 처리 */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="h-8">
                        <td colSpan={7} className="border border-[#B8D1E0] bg-white"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* --- 우측 영역: 입금 적용 상세 내역 --- */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className={sectionTitle}>
                <i className="ri-play-fill"></i> 입금 적용 상세 내역
              </div>
              <button className="rounded border border-[#57A5CE] bg-[#E8F1F8] px-2 py-0.5 text-[10px] font-bold text-[#2E6A9E]">
                입금 상세 내역 수정
              </button>
            </div>
            <div className="flex-1 overflow-hidden border-t-2 border-[#57A5CE]">
              <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
                <thead>
                  <tr className="bg-[#E8F1F8] text-[10px]">
                    <th className="border border-[#B8D1E0] py-1">청구년월</th>
                    <th className="border border-[#B8D1E0]">청구항목</th>
                    <th className="border border-[#B8D1E0]">청구액</th>
                    <th className="border border-[#B8D1E0]">미납액</th>
                    <th className="border border-[#B8D1E0]">입금액(조정액)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: '식사재료비', bill: '231,000', unpaid: '231,000', pay: '231,000' },
                    { item: '간식비', bill: '102,000', unpaid: '102,000', pay: '102,000' },
                    { item: '이미용비', bill: '5,000', unpaid: '5,000', pay: '5,000' },
                    { item: '등급외/한도초과', bill: '910,000', unpaid: '910,000', pay: '910,000' },
                  ].map((row, i) => (
                    <tr key={i}>
                      {i === 0 && (
                        <td rowSpan={4} className={clsx(tdClass, 'text-center')}>
                          2026년 01월
                        </td>
                      )}
                      <td className={clsx(tdClass, 'text-center')}>{row.item}</td>
                      <td className={clsx(tdClass, 'px-2 text-right')}>{row.bill} 원</td>
                      <td className={clsx(tdClass, 'px-2 text-right')}>{row.unpaid} 원</td>
                      <td className={clsx(tdClass, 'px-2 text-right font-bold')}>{row.pay} 원</td>
                    </tr>
                  ))}
                  {/* 빈 행 채우기 */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <tr key={i} className="h-8">
                      <td colSpan={5} className="border border-[#B8D1E0] bg-white"></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="h-10 bg-[#E8F1F8] font-black">
                    <td colSpan={2} className="border border-[#B8D1E0] text-center">
                      합계
                    </td>
                    <td className="border border-[#B8D1E0] px-2 text-right">1,248,000 원</td>
                    <td className="border border-[#B8D1E0] px-2 text-right">1,248,000 원</td>
                    <td className="border border-[#B8D1E0] px-2 text-right text-[14px] italic text-gray-900">
                      1,248,000 원
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="flex justify-center gap-1.5 border-t border-gray-200 bg-[#F8FAFC] px-4 py-3">
          <button className="rounded-sm bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] px-16 py-2.5 text-[14px] font-black text-white shadow-md transition-all active:scale-95">
            저장
          </button>
          <button
            onClick={onClose}
            className="rounded-sm bg-[#7A8B9A] px-12 py-2.5 text-[14px] font-black text-white shadow-md"
          >
            창닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
