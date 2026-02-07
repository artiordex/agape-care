/**
 * Description : DocumentUploadModal.tsx - 📂 서류 업로드(수급자 관리기록) 모달
 * 이미지(image_811cfc.png)의 입력 항목과 버튼 스타일 완벽 반영
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentUploadModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-2 text-center text-[12px] font-bold text-gray-700 w-[110px]';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900 bg-white';
  const inputClass = 'w-full border border-gray-300 px-2 py-1 outline-none focus:border-[#57A5CE] text-[12px]';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-[800px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <h2 className="text-lg font-black tracking-tight text-gray-800">수급자 관리기록 신규등록</h2>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {/* 입력 테이블 (image_811cfc.png 구조) */}
          <div className="border border-[#2E6A9E] p-[1px]">
            <table className="w-full table-fixed border-collapse">
              <tbody>
                <tr>
                  <th className={thClass}>
                    등록일 <span className="text-red-500">*</span>
                  </th>
                  <td className={tdClass}>
                    <input type="date" defaultValue="2026-02-06" className={clsx(inputClass, 'w-40 font-mono')} />
                  </td>
                  <th className={thClass}>
                    작성자 <span className="text-red-500">*</span>
                  </th>
                  <td className={tdClass}>
                    <div className="flex items-center justify-between gap-2">
                      <input type="text" defaultValue="최인경" className={inputClass} />
                      <button className="shrink-0 rounded-[2px] bg-[#7A8B9A] px-2 py-0.5 text-[11px] font-bold text-white">
                        선택
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>
                    제목 <span className="text-red-500">*</span>
                  </th>
                  <td colSpan={3} className={tdClass}>
                    <input type="text" className={inputClass} />
                  </td>
                </tr>
                <tr>
                  <th className={clsx(thClass, 'h-40')}>내용</th>
                  <td colSpan={3} className={tdClass}>
                    <textarea className="h-40 w-full resize-none border border-gray-100 p-2 outline-none" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 자료첨부 섹션 */}
          <div className="flex h-[120px] overflow-hidden rounded-sm border border-[#57A5CE]">
            <div className="flex w-[130px] shrink-0 flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-3">
              <span className="text-[12px] font-bold text-gray-700">자료첨부</span>
              <button className="mt-2 rounded-[2px] bg-[#7A8B9A] px-3 py-1 text-[11px] font-bold text-white">
                자료선택
              </button>
              <span className="mt-1 text-center text-[9px] text-gray-400">(최대 10MB x 10개)</span>
            </div>
            <div className="m-2 flex flex-1 flex-col items-center justify-center rounded-sm border-2 border-dashed border-gray-100 bg-white p-4 text-gray-400">
              <div className="flex flex-col items-center gap-1 opacity-40">
                <i className="ri-drag-drop-line text-3xl"></i>
                <p className="text-center text-[11px]">
                  첨부할 파일을 여기에 끌어다 놓거나
                  <br />
                  자료선택 버튼을 이용해 선택할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 모달 푸터 버튼 (저장/삭제/창닫기 3버튼 구조) */}
        <div className="flex justify-center gap-1.5 border-t border-gray-200 bg-[#F8FAFC] px-4 py-3">
          <button className="rounded-[3px] bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] px-12 py-2 text-[14px] font-black text-white shadow-md transition-all hover:brightness-105 active:scale-95">
            저장
          </button>
          <button className="rounded-[3px] bg-[#C06C6C] px-12 py-2 text-[14px] font-black text-white shadow-md transition-all hover:bg-[#a35252]">
            삭제
          </button>
          <button
            onClick={onClose}
            className="rounded-[3px] bg-[#7A8B9A] px-12 py-2 text-[14px] font-black text-white shadow-sm transition-all hover:bg-[#647481] active:scale-[0.98]"
          >
            창닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
