/**
 * Description : BenefitChangeModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface BenefitChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident?: any;
}

export default function BenefitChangeModal({ isOpen, onClose, resident }: BenefitChangeModalProps) {
  const [writeDate, setWriteDate] = useState('2026.02.18');
  const [author] = useState('최인경');
  const [selectedType, setSelectedType] = useState<string>(''); // For radio buttons

  // Styles
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] text-[12px] font-bold text-[#333] text-center px-1 py-1';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1 bg-white text-[12px] text-[#333]';
  const radioLabelClass = 'flex items-center gap-1 cursor-pointer select-none text-[12px] text-[#333] mb-1';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-[80vh] w-full max-w-[1000px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-3">
              <h2 className="text-[18px] font-black text-[#333]">급여제공 변경, 반영</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                <i className="ri-close-line text-2xl font-bold"></i>
              </button>
            </div>

            <div className="flex flex-1 gap-4 overflow-hidden p-4">
              {/* Left Column: List */}
              <div className="flex w-[350px] flex-col border border-[#B8D1E0] bg-[#F9FBFF]">
                {/* 2026 Header */}
                <div className="border-b border-[#B8D1E0] bg-[#D0E2EF] py-2 text-center text-[14px] font-bold text-[#333]">
                  2026년
                </div>
                {/* Table Header */}
                <div className="flex border-b border-[#B8D1E0] bg-white text-[12px] font-bold text-[#333]">
                  <div className="w-[40px] border-r border-[#B8D1E0] py-1 text-center">연번</div>
                  <div className="w-[80px] border-r border-[#B8D1E0] py-1 text-center">작성일</div>
                  <div className="flex-1 border-r border-[#B8D1E0] py-1 text-center">변경, 반영구분</div>
                  <div className="w-[60px] py-1 text-center">작성자</div>
                </div>
                {/* Empty State / List */}
                <div className="flex-1 overflow-y-auto bg-white">
                  <div className="mt-4 text-center text-[12px] text-gray-500">급여제공 변경, 반영 기록이 없습니다.</div>
                </div>
                {/* Footer Button */}
                <div className="border-t border-[#B8D1E0] p-2 text-center">
                  <button className="w-full rounded bg-[#788CA0] py-2 text-[12px] font-bold text-white hover:bg-[#687C90]">
                    급여제공 변경, 반영 전체 출력
                  </button>
                </div>
              </div>

              {/* Right Column: Detail Form */}
              <div className="flex flex-1 flex-col">
                {/* Resident Info Bar */}
                <div className="mb-2 flex border border-[#B8D1E0]">
                  <div className="flex w-full">
                    <div className="flex w-[80px] items-center justify-center bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold text-[#333]">
                      수급자명
                    </div>
                    <div className="flex w-[100px] items-center border-r border-[#B8D1E0] bg-white px-2 py-1 text-[12px] text-[#333]">
                      {resident?.name || '20원'}
                    </div>
                    <div className="flex w-[60px] items-center justify-center bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold text-[#333]">
                      성별
                    </div>
                    <div className="flex w-[60px] items-center border-r border-[#B8D1E0] bg-white px-2 py-1 text-[12px] text-[#333]">
                      남
                    </div>
                    <div className="flex w-[80px] items-center justify-center bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold text-[#333]">
                      생년월일
                    </div>
                    <div className="flex flex-1 items-center bg-white px-2 py-1 text-[12px] text-[#333]">
                      1930.01.02
                    </div>
                  </div>
                </div>

                {/* Section Header & New Button */}
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center text-[13px] font-bold text-[#2E6A9E]">
                    <i className="ri-checkbox-blank-fill mr-1 text-[10px]"></i> 급여제공 변경, 반영 정보
                  </div>
                  <button className="rounded bg-[#55C2C3] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#45B2B3]">
                    급여제공 변경, 반영 신규작성
                  </button>
                </div>

                {/* Form Table */}
                <div className="border-t border-[#B8D1E0]">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <th className={thClass} style={{ width: '120px' }}>
                          작성일 <span className="text-red-500">*</span>
                        </th>
                        <td className={tdClass}>
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={writeDate}
                              onChange={e => setWriteDate(e.target.value)}
                              className="w-[100px] border border-[#D1D1D1] px-1 py-0.5 text-center text-[12px] outline-none"
                            />
                            <i className="ri-calendar-line text-gray-500"></i>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass} style={{ height: '140px' }}>
                          변경, 반영구분
                        </th>
                        <td className={tdClass}>
                          <div className="flex flex-col gap-1 p-1">
                            {[
                              '기능상태 변화',
                              '욕구사정',
                              '급여결과평가',
                              '보호자회의',
                              '상담관리',
                              '사례관리',
                              '기타',
                            ].map(type => (
                              <label key={type} className={radioLabelClass}>
                                <input
                                  type="radio"
                                  name="changeType"
                                  value={type}
                                  checked={selectedType === type}
                                  onChange={e => setSelectedType(e.target.value)}
                                  className="mr-1"
                                />
                                {type}
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass}>급여구분</th>
                        <td className={tdClass}>
                          <div className="flex flex-col gap-1">
                            <select className="w-full border border-[#D1D1D1] bg-gray-50 px-1 py-1 text-[12px] text-gray-400 outline-none">
                              <option>급여구분선택</option>
                            </select>
                            <input
                              type="text"
                              placeholder="기타 급여구분 입력"
                              className="w-full border border-[#D1D1D1] px-1 py-1 text-[12px] outline-none placeholder:text-gray-300"
                              disabled
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass}>급여내용</th>
                        <td className={tdClass}>
                          <input
                            type="text"
                            placeholder="급여내용 입력"
                            className="w-full border border-[#D1D1D1] px-1 py-1 text-[12px] outline-none placeholder:text-gray-300"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass} style={{ height: '100px' }}>
                          변경, 반영 사유 <span className="text-red-500">*</span>
                        </th>
                        <td className={tdClass}>
                          <textarea className="h-full w-full resize-none border border-[#D1D1D1] p-1 text-[12px] outline-none"></textarea>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass}>
                          작성자 <span className="text-red-500">*</span>
                        </th>
                        <td className={tdClass}>
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={author}
                              readOnly
                              className="w-[100px] border border-[#D1D1D1] px-1 py-0.5 text-center text-[12px] outline-none"
                            />
                            <button className="rounded bg-[#5F7183] px-2 py-0.5 text-[11px] text-white hover:bg-[#4E5D6C]">
                              선택
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-center gap-2">
                  <button className="w-[100px] rounded bg-[#2E8BCC] py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#206FA2]">
                    저장
                  </button>
                  <button
                    onClick={onClose}
                    className="w-[100px] rounded bg-[#666666] py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#555555]"
                  >
                    창닫기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
