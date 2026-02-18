/**
 * Description : ServiceEvaluationModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ServiceEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident?: any; // Replace with proper type if available
}

export default function ServiceEvaluationModal({ isOpen, onClose, resident }: ServiceEvaluationModalProps) {
  const [evalDate, setEvalDate] = useState('2026.02.18');
  const [author] = useState('최인경');

  // Common styles
  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] text-[12px] font-bold text-[#333] text-center px-1 py-1 whitespace-nowrap';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1 bg-white text-[12px] text-[#333]';
  const radioLabelClass = 'flex items-center gap-1 cursor-pointer select-none';
  const sectionTitleClass = 'flex items-center text-[13px] font-bold text-[#2E6A9E] mb-1';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-[90vh] w-full max-w-[1400px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-3">
              <h2 className="text-[18px] font-black text-[#333]">급여제공 결과평가</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                <i className="ri-close-line text-2xl font-bold"></i>
              </button>
            </div>

            {/* Top Info Table */}
            <div className="w-full border-t border-[#B8D1E0]">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <th className={thClass} style={{ width: '100px' }}>
                      수급자명
                    </th>
                    <td className={tdClass} style={{ width: '150px' }}>
                      {resident?.name || '20원'}
                    </td>
                    <th className={thClass} style={{ width: '100px' }}>
                      생년월일
                    </th>
                    <td className={tdClass} style={{ width: '150px' }}>
                      1930.01.02
                    </td>
                    <th className={thClass} style={{ width: '100px' }}>
                      성별
                    </th>
                    <td className={tdClass} style={{ width: '100px' }}>
                      남
                    </td>
                    <th className={thClass} style={{ width: '100px' }}>
                      입소일
                    </th>
                    <td className={tdClass}>2025.11.01</td>
                  </tr>
                  <tr>
                    <th className={thClass}>생활실</th>
                    <td className={tdClass}></td>
                    <th className={thClass}>
                      작성일(평가일) <span className="text-red-500">*</span>
                    </th>
                    <td className={tdClass}>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={evalDate}
                          onChange={e => setEvalDate(e.target.value)}
                          className="w-full text-center outline-none"
                        />
                        <i className="ri-calendar-line text-gray-400"></i>
                      </div>
                    </td>
                    <th className={thClass}>
                      작성자명 <span className="text-red-500">*</span>
                    </th>
                    <td className={tdClass}>
                      <div className="flex items-center gap-1">
                        <input type="text" value={author} readOnly className="w-full text-center outline-none" />
                        <button className="whitespace-nowrap rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">
                          선택
                        </button>
                      </div>
                    </td>
                    <th className={thClass}>퇴소일</th>
                    <td className={tdClass}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Main Content Split */}
            <div className="flex flex-1 gap-2 overflow-hidden p-2">
              {/* Left Column: Long Term Care Plan */}
              <div className="flex w-[45%] flex-col">
                <div className={sectionTitleClass}>
                  <i className="ri-checkbox-blank-fill mr-1 text-[10px] text-[#2E6A9E]"></i> 장기요양 급여제공계획
                </div>
                <div className="flex h-full flex-col border border-[#B8D1E0] bg-white">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={thClass}>필요영역</th>
                        <th className={thClass}>장기요양 세부목표</th>
                        <th className={thClass}>급여항목</th>
                        <th className={thClass}>장기요양 필요내용</th>
                        <th className={thClass}>세부제공내용</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="flex flex-1 items-center justify-center text-[12px] text-gray-500">
                    급여제공 계획이 없습니다.
                  </div>
                </div>
              </div>

              {/* Right Column: Evaluation & Checklist */}
              <div className="flex flex-1 flex-col gap-2">
                {/* Top Section: Goal/Opinion + Buttons */}
                <div className="flex gap-2">
                  {/* Goals & Opinion Table */}
                  <div className="flex-1">
                    <div className={sectionTitleClass}>
                      <i className="ri-checkbox-blank-fill mr-1 text-[10px] text-[#2E6A9E]"></i> 장기요양 급여제공계획
                      목표 및 종합의견
                    </div>
                    <table className="h-[150px] w-full border-collapse border border-[#B8D1E0]">
                      <tbody>
                        <tr className="h-1/2">
                          <th className={thClass} style={{ width: '80px' }}>
                            목표
                          </th>
                          <td className="border border-[#B8D1E0] p-0">
                            <textarea className="h-full w-full resize-none p-1 text-[12px] outline-none"></textarea>
                          </td>
                        </tr>
                        <tr className="h-1/2">
                          <th className={thClass}>종합의견</th>
                          <td className="border border-[#B8D1E0] p-0">
                            <textarea className="h-full w-full resize-none p-1 text-[12px] outline-none"></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Vertical Buttons */}
                  <div className="flex flex-col gap-1 pt-6">
                    <button className="w-[90px] rounded border border-[#B8D1E0] bg-white py-1.5 text-[12px] font-bold text-[#333] hover:bg-gray-50">
                      이전 자료 조회
                    </button>
                    <button className="w-[90px] rounded bg-[#2E8BCC] py-2 text-[12px] font-bold text-white shadow hover:bg-[#2070A8]">
                      저장
                    </button>
                    <button
                      onClick={onClose}
                      className="w-[90px] rounded bg-[#666666] py-2 text-[12px] font-bold text-white shadow hover:bg-[#555555]"
                    >
                      창닫기
                    </button>
                  </div>
                </div>

                {/* Checklist Section */}
                <div>
                  <div className="mb-1 flex items-center gap-1">
                    <i className="ri-checkbox-blank-fill text-[10px] text-[#2E6A9E]"></i>
                    <span className="text-[13px] font-bold text-[#2E6A9E]">급여제공결과평가 체크사항</span>
                    <span className="flex h-4 w-4 items-center justify-center bg-[#FF6B00] text-[10px] font-bold text-white">
                      <i className="ri-check-line"></i>
                    </span>
                  </div>

                  <div className="border border-[#B8D1E0]">
                    <table className="w-full border-collapse text-[12px]">
                      <tbody>
                        {/* Q1 */}
                        <tr>
                          <td
                            colSpan={2}
                            className="border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 font-bold text-[#333]"
                          >
                            <div className="flex items-center justify-between">
                              <span>1. 수급자의 기능상태에 맞는 급여제공계획으로 진행된 급여 서비스 선택</span>
                              <label className="flex items-center gap-1 font-normal text-gray-600">
                                <input type="checkbox" /> 전체선택
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="border-b border-[#B8D1E0] bg-white px-2 py-2">
                            <div className="flex flex-wrap gap-4">
                              <label className={radioLabelClass}>
                                <input type="checkbox" /> 신체활동지원
                              </label>
                              <label className={radioLabelClass}>
                                <input type="checkbox" /> 인지관리지원, 정서지원
                              </label>
                              <label className={radioLabelClass}>
                                <input type="checkbox" /> 건강관리·간호처치
                              </label>
                              <label className={radioLabelClass}>
                                <input type="checkbox" /> 기능회복훈련
                              </label>
                            </div>
                          </td>
                        </tr>

                        {/* Q2 */}
                        <tr>
                          <th className="border-b border-r border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-left font-bold text-[#333]">
                            2. 수급자의 욕구나 보호자의 욕구가 반영되었는지 여부
                          </th>
                          <td className="w-[30%] border-b border-[#B8D1E0] bg-white px-2 py-1">
                            <div className="flex gap-4">
                              <label className={radioLabelClass}>
                                <input type="radio" name="q2" /> 반영
                              </label>
                              <label className={radioLabelClass}>
                                <input type="radio" name="q2" /> 미반영
                              </label>
                            </div>
                          </td>
                        </tr>

                        {/* Q3 */}
                        <tr>
                          <th className="border-b border-r border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-left font-bold text-[#333]">
                            3. 급여제공계획 이후 어르신의 상태 변화 여부
                          </th>
                          <td className="border-b border-[#B8D1E0] bg-white px-2 py-1">
                            <div className="flex gap-4">
                              <label className={radioLabelClass}>
                                <input type="radio" name="q3" /> 상태변화
                              </label>
                              <label className={radioLabelClass}>
                                <input type="radio" name="q3" /> 기능유지
                              </label>
                            </div>
                          </td>
                        </tr>

                        {/* Q4 */}
                        <tr>
                          <th className="border-r border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-left font-bold text-[#333]">
                            4. 평가결과에 따라 급여제공계획서 재작성 필요 여부
                          </th>
                          <td className="bg-white px-2 py-1">
                            <div className="flex gap-4">
                              <label className={radioLabelClass}>
                                <input type="radio" name="q4" /> 30일 이내 재작성
                              </label>
                              <label className={radioLabelClass}>
                                <input type="radio" name="q4" /> 필요없음 (급여계획 유지)
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Overall Evaluation */}
                <div className="flex flex-1 flex-col">
                  <div className={sectionTitleClass}>
                    <i className="ri-checkbox-blank-fill mr-1 text-[10px] text-[#2E6A9E]"></i> 총평{' '}
                    <span className="ml-0.5 text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none border border-[#B8D1E0] p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
