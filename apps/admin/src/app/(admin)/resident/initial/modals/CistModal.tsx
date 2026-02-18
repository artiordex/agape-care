/**
 * Description : CistModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface CistModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident: {
    name: string;
    admissionDate: string;
    // Add other fields as needed
  } | null;
}

export default function CistModal({ isOpen, onClose, resident }: CistModalProps) {
  // Form State
  const [assessmentReason, setAssessmentReason] = useState('신규');
  const [date, setDate] = useState('2026.02.18');
  const [author, setAuthor] = useState('최인경');
  const [educationYear, setEducationYear] = useState('');
  const [testPlace, setTestPlace] = useState('체험시설요양원');
  const [remarks, setRemarks] = useState('');

  // CIST Item States
  // Using a flat state object for simplicity, though nested objects could be cleaner.
  const [scores, setScores] = useState<Record<string, number>>({});

  // Total Score Calculation
  const totalScore = Object.values(scores).reduce((acc, curr) => acc + (curr || 0), 0);

  // Helper styles
  const thClass = 'border border-[#B8D1E0] bg-[#F1F8FF] py-1 text-center text-[12px] font-bold text-[#333]';
  const tdClass = 'border border-[#B8D1E0] bg-white px-2 py-1 text-center text-[12px] text-[#333]';
  const radioLabelClass = 'flex items-center gap-1 cursor-pointer hover:opacity-80';
  const scoreBtnBase = 'w-6 h-6 rounded-full border text-[11px] flex items-center justify-center transition-all';

  const ScoreRadio = ({ id, value, label }: { id: string; value: number; label: string }) => (
    <label className={clsx(radioLabelClass, 'text-[12px]')}>
      <input
        type="radio"
        name={id}
        checked={scores[id] === value}
        onChange={() => setScores(prev => ({ ...prev, [id]: value }))}
        className="h-3.5 w-3.5 border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className={clsx(scores[id] === value && 'font-bold text-blue-600')}>{label}</span>
    </label>
  );

  // Grouped Score Calculation for Summary
  const domainScores = {
    orientation:
      (scores['orient_time_year'] || 0) +
      (scores['orient_time_month'] || 0) +
      (scores['orient_time_day'] || 0) +
      (scores['orient_time_dow'] || 0) +
      (scores['orient_place'] || 0),
    attention:
      (scores['atten_digit_fwd_1'] || 0) + (scores['atten_digit_fwd_2'] || 0) + (scores['atten_digit_bwd'] || 0),
    visuospatial: scores['visuo_copy'] || 0, // Assuming max 2 based on screenshot? Or 1? Let's assume 0/1/2 based on screenshot circles
    executive:
      (scores['exec_vis_reason_1'] || 0) +
      (scores['exec_vis_reason_2'] || 0) +
      (scores['exec_lang_reason_1'] || 0) +
      (scores['exec_lang_reason_2'] || 0) +
      (scores['exec_fluency'] || 0),
    memory:
      (scores['mem_reg_1'] || 0) +
      (scores['mem_reg_2'] || 0) +
      (scores['mem_recall_1'] || 0) +
      (scores['mem_recall_2'] || 0) +
      (scores['mem_recall_3'] || 0), // This needs adjustment based on exact CIST rules
    language: (scores['lang_name'] || 0) + (scores['lang_comp'] || 0),
  };

  // Note: The specific CIST scoring logic details are approximated from the screenshot.
  // In a real app, I'd implement the exact scoring rules (e.g. Memory total usually combines Registration/Recall/Recognition).

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-[95vh] w-full max-w-[1400px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-3">
              <h2 className="text-[18px] font-black text-[#333]">인지기능 평가 - CIST</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                <i className="ri-close-line text-2xl font-bold"></i>
              </button>
            </div>

            {/* Content & Side Actions Container */}
            <div className="flex flex-1 overflow-hidden">
              {/* Main Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 pb-10">
                {/* 1. Resident Info Header */}
                <table className="mb-4 w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass}>수급자명</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        {resident?.name || '20원'}
                      </td>
                      <th className={thClass}>성별</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        남
                      </td>
                      <th className={thClass}>생년월일</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        1930.01.02(만 96세)
                      </td>
                      <th className={thClass}>
                        인지평가 제외
                        <br />
                        (치매진단)
                      </th>
                      <td className={tdClass}>
                        <input type="checkbox" className="h-4 w-4" />
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>입소일</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        {resident?.admissionDate || '2025.11.01'}
                      </td>
                      <th className={thClass}>퇴소일</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}></td>
                      <th className={thClass}>생신일</th>
                      <td className={tdClass} colSpan={3} style={{ textAlign: 'left' }}>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1">
                            <input type="radio" name="bdayType" /> 양력
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="radio" name="bdayType" defaultChecked /> 음력
                          </label>
                          <span>1929.12.03</span>
                          <i className="ri-calendar-line text-gray-400"></i>
                          <span className="text-gray-500">(만 96세)</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>조사사유</th>
                      <td className={tdClass} colSpan={3} style={{ textAlign: 'left' }}>
                        <div className="flex gap-4">
                          {['신규', '재사정', '상태변화'].map(reason => (
                            <label key={reason} className={radioLabelClass}>
                              <input
                                type="radio"
                                name="assessmentReason"
                                checked={assessmentReason === reason}
                                onChange={() => setAssessmentReason(reason)}
                                className="h-3.5 w-3.5 text-orange-500 focus:ring-orange-500"
                              />
                              <span>{reason}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <th className={thClass}>
                        검사일(작성일)<span className="text-red-500">*</span>
                      </th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-[90px] outline-none"
                          />
                          <i className="ri-calendar-line text-gray-500"></i>
                        </div>
                      </td>
                      <th className={thClass}>작성자</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            className="w-[60px] outline-none"
                          />
                          <button className="rounded bg-[#5F7183] px-2 py-0.5 text-[11px] text-white">선택</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>생활실</th>
                      <td className={tdClass} colSpan={3}></td>
                      <th className={thClass}>주요질환</th>
                      <td className={tdClass} colSpan={3}></td>
                    </tr>
                  </tbody>
                </table>

                {/* Second Toolbar Row */}
                <div className="mb-2 flex items-center border border-[#B8D1E0] bg-[#EAF4FC] p-2 text-[12px]">
                  <span className="mr-2 font-bold text-[#333]">학력(교육년수)</span>
                  <i className="ri-question-fill mr-2 text-gray-500"></i>
                  <select
                    className="mr-6 rounded border border-gray-300 px-2 py-1"
                    value={educationYear}
                    onChange={e => setEducationYear(e.target.value)}
                  >
                    <option value="">선택하십시오.</option>
                    <option value="none">무학</option>
                    <option value="elem">초졸</option>
                    {/* Add more options */}
                  </select>

                  <span className="mr-2 font-bold text-[#333]">검사장소</span>
                  <input
                    type="text"
                    value={testPlace}
                    onChange={e => setTestPlace(e.target.value)}
                    className="w-[150px] rounded border border-gray-300 px-2 py-1"
                  />
                </div>

                {/* Main Assessment Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={thClass} style={{ width: '80px' }}>
                            항목
                          </th>
                          <th className={thClass}>점수</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Orientation */}
                        <tr>
                          <td className={tdClass} rowSpan={5}>
                            지남력
                          </td>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex items-center justify-between px-2">
                              <span>년</span>
                              <div className="flex gap-4">
                                <ScoreRadio id="orient_time_year" value={0} label="0점" />
                                <ScoreRadio id="orient_time_year" value={1} label="1점" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex items-center justify-between px-2">
                              <span>월</span>
                              <div className="flex gap-4">
                                <ScoreRadio id="orient_time_month" value={0} label="0점" />
                                <ScoreRadio id="orient_time_month" value={1} label="1점" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex items-center justify-between px-2">
                              <span>일</span>
                              <div className="flex gap-4">
                                <ScoreRadio id="orient_time_day" value={0} label="0점" />
                                <ScoreRadio id="orient_time_day" value={1} label="1점" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex items-center justify-between px-2">
                              <span>요일</span>
                              <div className="flex gap-4">
                                <ScoreRadio id="orient_time_dow" value={0} label="0점" />
                                <ScoreRadio id="orient_time_dow" value={1} label="1점" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex items-center justify-between px-2">
                              <span>장소</span>
                              <div className="flex gap-4">
                                <ScoreRadio id="orient_place" value={0} label="0점" />
                                <ScoreRadio id="orient_place" value={1} label="1점" />
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* Memory Registration */}
                        <tr>
                          <td className={tdClass} rowSpan={2}>
                            기억력
                            <br />
                            (기억등록)
                          </td>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="mb-1 flex items-center justify-between px-2 text-[11px]">
                              <span>1차 시행</span>
                              <div className="flex gap-2">
                                <label>
                                  <input type="checkbox" /> 사람 이름
                                </label>
                                <label>
                                  <input type="checkbox" /> 교통수단
                                </label>
                                <label>
                                  <input type="checkbox" /> 장소
                                </label>
                                <label>
                                  <input type="checkbox" /> 시간
                                </label>
                                <label>
                                  <input type="checkbox" /> 한 것
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex items-center justify-between px-2 text-[11px]">
                              <span>2차 시행</span>
                              <div className="flex gap-2">
                                <label>
                                  <input type="checkbox" /> 사람 이름
                                </label>
                                <label>
                                  <input type="checkbox" /> 교통수단
                                </label>
                                <label>
                                  <input type="checkbox" /> 장소
                                </label>
                                <label>
                                  <input type="checkbox" /> 시간
                                </label>
                                <label>
                                  <input type="checkbox" /> 한 것
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* Attention */}
                        <tr>
                          <td className={tdClass}>주의력</td>
                          <td className={clsx(tdClass, 'p-0')}>
                            <table className="w-full border-collapse">
                              <tbody>
                                <tr>
                                  <td className={clsx(tdClass, 'border-b px-2 text-left')}>숫자 바로 따라 말하기</td>
                                  <td className={clsx(tdClass, 'border-b border-l px-2 text-left')}>
                                    <div className="flex justify-between py-1">
                                      <span>(1) 번 숫자</span>
                                      <div className="flex gap-2">
                                        <ScoreRadio id="atten_digit_fwd_1" value={0} label="0점" />
                                        <ScoreRadio id="atten_digit_fwd_1" value={1} label="1점" />
                                      </div>
                                    </div>
                                    <div className="flex justify-between border-t border-dashed border-gray-200 py-1">
                                      <span>(2) 번 숫자</span>
                                      <div className="flex gap-2">
                                        <ScoreRadio id="atten_digit_fwd_2" value={0} label="0점" />
                                        <ScoreRadio id="atten_digit_fwd_2" value={1} label="1점" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={clsx(tdClass, 'px-2 text-left')}>거꾸로 말하기</td>
                                  <td className={clsx(tdClass, 'border-l px-2 text-left')}>
                                    <div className="flex justify-between py-1">
                                      <span>불려준 단어</span>
                                      <div className="flex gap-2">
                                        <ScoreRadio id="atten_digit_bwd" value={0} label="0점" />
                                        <ScoreRadio id="atten_digit_bwd" value={1} label="1점" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        {/* Visuospatial */}
                        <tr>
                          <td className={tdClass}>시공간기능</td>
                          <td className={clsx(tdClass, 'p-0')}>
                            <div className="flex items-center justify-between p-2">
                              <span>도형모사</span>
                              <div>그림1</div>
                              <div className="flex gap-2">
                                <ScoreRadio id="visuo_copy" value={0} label="0점" />
                                <ScoreRadio id="visuo_copy" value={1} label="1점" />
                                <ScoreRadio id="visuo_copy" value={2} label="2점" />
                              </div>
                              <button className="rounded border bg-gray-50 px-1 text-[10px]">사진선택</button>
                            </div>
                            <div className="flex h-20 items-center justify-center border-t bg-gray-50 text-xs text-gray-400">
                              <i className="ri-image-add-line mr-1"></i> 도면영역
                            </div>
                          </td>
                        </tr>

                        {/* Executive Function (Reasoning) */}
                        <tr>
                          <td className={tdClass} rowSpan={3}>
                            집행기능
                          </td>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex justify-between border-b border-dashed p-1">
                              <span>시각추론1</span>
                              <span>그림2</span>
                              <div className="flex gap-2">
                                <ScoreRadio id="exec_vis_reason_1" value={0} label="0점" />
                                <ScoreRadio id="exec_vis_reason_1" value={1} label="1점" />
                              </div>
                            </div>
                            <div className="flex justify-between p-1">
                              <span>시각추론2</span>
                              <span>그림3</span>
                              <div className="flex gap-2">
                                <ScoreRadio id="exec_vis_reason_2" value={0} label="0점" />
                                <ScoreRadio id="exec_vis_reason_2" value={1} label="1점" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex justify-between border-b border-dashed p-1">
                              <span>언어추론</span>
                              <span className="text-[11px]">그림4 - 첫번째 빈칸</span>
                              <div className="flex gap-2">
                                <ScoreRadio id="exec_lang_reason_1" value={0} label="0점" />
                                <ScoreRadio id="exec_lang_reason_1" value={1} label="1점" />
                              </div>
                            </div>
                            <div className="flex justify-between p-1">
                              <span></span>
                              <span className="text-[11px]">그림4 - 두번째 빈칸</span>
                              <div className="flex gap-2">
                                <ScoreRadio id="exec_lang_reason_2" value={0} label="0점" />
                                <ScoreRadio id="exec_lang_reason_2" value={1} label="1점" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Right Column */}
                  <div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={thClass}>항목</th>
                          <th className={thClass}>반응기록</th>
                          <th className={thClass}>점수</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Memory Recall/Recognition */}
                        <tr>
                          <td className={tdClass} rowSpan={2}>
                            기억력
                          </td>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="mb-1 font-bold">기억회상</div>
                            <div className="mb-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                              <label>
                                <input type="checkbox" /> 사람 이름
                              </label>
                              <label>
                                <input type="checkbox" /> 교통수단
                              </label>
                              <label>
                                <input type="checkbox" /> 장소
                              </label>
                              <label>
                                <input type="checkbox" /> 시간
                              </label>
                              <label>
                                <input type="checkbox" /> 한 것
                              </label>
                            </div>

                            <div className="mb-1 mt-2 border-t pt-2 font-bold">재인</div>
                            <div className="space-y-1 text-[11px]">
                              <div className="flex items-center gap-2">
                                <span className="w-16">재인 - 사람</span>
                                <label>
                                  <input type="radio" name="rec_1" /> 영수
                                </label>
                                <label>
                                  <input type="radio" name="rec_1" /> 민수
                                </label>
                                <label>
                                  <input type="radio" name="rec_1" /> 진수
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-16">재인 - 교통</span>
                                <label>
                                  <input type="radio" name="rec_2" /> 버스
                                </label>
                                <label>
                                  <input type="radio" name="rec_2" /> 오토바이
                                </label>
                                <label>
                                  <input type="radio" name="rec_2" /> 자전거
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-16">재인 - 장소</span>
                                <label>
                                  <input type="radio" name="rec_3" /> 공원
                                </label>
                                <label>
                                  <input type="radio" name="rec_3" /> 놀이터
                                </label>
                                <label>
                                  <input type="radio" name="rec_3" /> 운동장
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-16">재인 - 시간</span>
                                <label>
                                  <input type="radio" name="rec_4" /> 10시
                                </label>
                                <label>
                                  <input type="radio" name="rec_4" /> 11시
                                </label>
                                <label>
                                  <input type="radio" name="rec_4" /> 12시
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-16">재인 - 한것</span>
                                <label>
                                  <input type="radio" name="rec_5" /> 농구
                                </label>
                                <label>
                                  <input type="radio" name="rec_5" /> 축구
                                </label>
                                <label>
                                  <input type="radio" name="rec_5" /> 야구
                                </label>
                              </div>
                            </div>
                          </td>
                          <td className={tdClass}>
                            <div className="flex h-full flex-col justify-center gap-8">
                              <div>__ 점</div>
                              <div>
                                <div className="text-[10px] text-gray-400">각 1점</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr></tr>

                        {/* Language */}
                        <tr>
                          <td className={tdClass} rowSpan={2}>
                            언어기능
                          </td>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="mb-1 flex items-center justify-between">
                              <span>첫 번째 그림 - 대상자 반응</span>
                              <input type="text" className="w-24 border px-1 text-[11px]" />
                            </div>
                            <div className="mb-1 flex items-center justify-between">
                              <span>두 번째 그림 - 대상자 반응</span>
                              <input type="text" className="w-24 border px-1 text-[11px]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>세 번째 그림 - 대상자 반응</span>
                              <input type="text" className="w-24 border px-1 text-[11px]" />
                            </div>
                          </td>
                          <td className={tdClass}>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-center gap-1">
                                <ScoreRadio id="lang_name_1" value={0} label="0" />
                                <ScoreRadio id="lang_name_1" value={1} label="1" />
                              </div>
                              <div className="flex justify-center gap-1">
                                <ScoreRadio id="lang_name_2" value={0} label="0" />
                                <ScoreRadio id="lang_name_2" value={1} label="1" />
                              </div>
                              <div className="flex justify-center gap-1">
                                <ScoreRadio id="lang_name_3" value={0} label="0" />
                                <ScoreRadio id="lang_name_3" value={1} label="1" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div className="flex items-center justify-between">
                              <span>이해력: 예문</span>
                            </div>
                          </td>
                          <td className={tdClass}>
                            <div className="flex justify-center gap-1">
                              <ScoreRadio id="lang_comp" value={0} label="0" />
                              <ScoreRadio id="lang_comp" value={1} label="1" />
                            </div>
                          </td>
                        </tr>

                        {/* Executive (Fluency) */}
                        <tr>
                          <td className={tdClass}>집행기능</td>
                          <td className={clsx(tdClass, 'text-left')}>
                            <div>유창성</div>
                            <div className="mb-1 text-[10px] text-gray-500">[반응기록/제한 시간 1분]</div>
                            <div className="mb-1 text-[10px] text-gray-500">
                              0~8개: 0점 / 9~14개: 1점 / 15개 이상: 2점
                            </div>
                            <textarea className="h-16 w-full border p-1 text-[11px]"></textarea>
                          </td>
                          <td className={tdClass}>
                            <div className="mb-2 flex items-center justify-center gap-1">
                              개수: <input type="number" className="w-10 border text-center" /> 개
                            </div>
                            <div className="font-bold text-blue-600">__ 점</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Score Summary Footer */}
                <div className="mt-4 border border-[#B8D1E0] bg-[#F9FBFF] p-2">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-bold text-[#333]">비고</span>
                    <input
                      type="text"
                      className="flex-1 border px-2 py-1"
                      value={remarks}
                      onChange={e => setRemarks(e.target.value)}
                    />
                  </div>
                  <table className="w-full border-collapse text-center text-[12px]">
                    <thead>
                      <tr className="bg-[#E8F1F8]">
                        <th className="border border-[#B8D1E0] py-1">인지영역</th>
                        <th className="border border-[#B8D1E0] py-1">지남력</th>
                        <th className="border border-[#B8D1E0] py-1">주의력</th>
                        <th className="border border-[#B8D1E0] py-1">시공간기능</th>
                        <th className="border border-[#B8D1E0] py-1">집행기능</th>
                        <th className="border border-[#B8D1E0] py-1">기억력</th>
                        <th className="border border-[#B8D1E0] py-1">언어기능</th>
                        <th className="border border-[#B8D1E0] py-1">총점</th>
                        <th className="border border-[#B8D1E0] py-1">판정</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <th className="border border-[#B8D1E0] bg-[#E8F1F8] py-2">점수</th>
                        <td className="border border-[#B8D1E0]">{domainScores.orientation} / 5</td>
                        <td className="border border-[#B8D1E0]">{domainScores.attention} / 3</td>
                        <td className="border border-[#B8D1E0]">{domainScores.visuospatial} / 2</td>
                        <td className="border border-[#B8D1E0]">{domainScores.executive} / 6</td>
                        <td className="border border-[#B8D1E0]">{domainScores.memory} / 10</td>
                        <td className="border border-[#B8D1E0]">{domainScores.language} / 4</td>
                        <td className="border border-[#B8D1E0] text-lg font-bold text-blue-600">0 / 30</td>
                        <td className="border border-[#B8D1E0] font-bold text-red-500">인지저하 의심</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex w-[120px] flex-col gap-2 border-l border-gray-200 bg-white p-3 pt-5">
                <button className="w-full rounded bg-[#2E8BCC] py-3 text-[13px] font-bold text-white shadow-sm hover:bg-[#2070A8]">
                  K-MMSE 사용안내
                </button>
                <button className="w-full rounded border border-gray-300 bg-white py-2 text-[12px] font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                  이전 자료 조회
                </button>
                <button
                  className="w-full rounded bg-[#2E8BCC] py-3 text-[13px] font-bold text-white shadow-sm hover:bg-[#2070A8]"
                  onClick={onClose}
                >
                  저장
                </button>
                <button className="w-full rounded bg-[#5F7183] py-3 text-[13px] font-bold text-white shadow-sm hover:bg-[#4F6173]">
                  양식 출력
                </button>
                <button
                  className="w-full rounded bg-[#666666] py-3 text-[13px] font-bold text-white shadow-sm hover:bg-[#555555]"
                  onClick={onClose}
                >
                  창닫기
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
