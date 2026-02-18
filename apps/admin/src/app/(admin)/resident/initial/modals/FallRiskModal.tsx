/**
 * Description : FallRiskModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FallRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident: {
    name: string;
    admissionDate: string;
    // Add other fields if needed
  } | null;
}

// Table Row Configuration
// We map scores 4, 3, 2, 1, 0 to their respective labels for each category
const EVALUATION_ROWS = [
  {
    id: 'age',
    label: '연령',
    options: {
      3: '80세 이상',
      2: '70-79세',
      1: '60-69세',
      0: '해당없음',
    },
  },
  {
    id: 'mental',
    label: '정신상태',
    options: {
      4: '혼란스러움/방향감각장애',
      2: '때때로 혼란스러움\n/방향감각장애',
      0: '해당없음',
    },
  },
  {
    id: 'elimination',
    label: '배변',
    options: {
      4: '소변, 대변실금',
      3: '조절능력 있지만 도움 필요',
      1: '유치도뇨관/인공항문',
      0: '해당없음',
    },
  },
  {
    id: 'history',
    label: '낙상경험',
    options: {
      4: '이미 세번 이상 넘어짐',
      2: '이미 한번 또는 두번 넘어짐',
      0: '해당없음',
    },
  },
  {
    id: 'activity',
    label: '활동',
    options: {
      4: '전적으로 도움을 받음',
      3: '자리에서 일어나 앉기 도움',
      1: '자립/세면대 화장실이용',
      0: '해당없음',
    },
  },
  {
    id: 'balance',
    label: '걸음걸이 및 균형',
    options: {
      4: '불규칙/불안정, 서 있을 때와\n걸을 때 균형을 거의 유지 못함',
      3: '일어서기/걸을 때 기립성\n빈혈/혈액순환문제',
      2: '보행장애/보조도구나\n도움으로 걷기',
      0: '해당없음',
    },
  },
  {
    id: 'meds',
    label: '지난 7일간 약복용이나\n계획된 약물',
    options: {
      4: '3개 또는 그 이상의 약 복용',
      3: '두가지 약 복용',
      2: '한가지 약복용',
      0: '해당없음',
    },
  },
];

export default function FallRiskModal({ isOpen, onClose, resident }: FallRiskModalProps) {
  // Form State
  const [scores, setScores] = useState<Record<string, number | null>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [remarks, setRemarks] = useState('');

  // Header Info State
  const [assessmentReason, setAssessmentReason] = useState('신규');
  const [date, setDate] = useState('2026.02.18');
  const [author, setAuthor] = useState('최인경');

  // Calculate total score whenever scores change
  useEffect(() => {
    const sum = Object.values(scores).reduce<number>((acc, curr) => acc + (curr || 0), 0);
    setTotalScore(sum);
  }, [scores]);

  const handleScoreChange = (rowId: string, value: number) => {
    setScores(prev => ({ ...prev, [rowId]: value }));
  };

  // Helper styles
  const thClass = 'border border-[#B8D1E0] bg-[#F1F8FF] py-2 text-center text-[12px] font-bold text-[#333]';
  const tdClass = 'border border-[#B8D1E0] bg-white px-2 py-2 text-center text-[12px] text-[#333]';
  const radioLabelClass = 'flex items-center gap-1.5 cursor-pointer hover:opacity-80';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-[90vh] w-full max-w-[1200px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-3">
              <h2 className="text-[18px] font-black text-[#333]">낙상위험도 평가</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                <i className="ri-close-line text-2xl font-bold"></i>
              </button>
            </div>

            {/* Content & Side Actions Container */}
            <div className="flex flex-1 overflow-hidden">
              {/* Main Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5">
                {/* 1. Resident Info Header */}
                <table className="mb-6 w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '100px' }}>
                        수급자명
                      </th>
                      <td className={tdClass} style={{ width: '150px', textAlign: 'left', paddingLeft: '10px' }}>
                        {resident?.name || '20원'}
                      </td>
                      <th className={thClass} style={{ width: '80px' }}>
                        성별
                      </th>
                      <td className={tdClass} style={{ width: '100px', textAlign: 'left', paddingLeft: '10px' }}>
                        남
                      </td>
                      <th className={thClass} style={{ width: '100px' }}>
                        생년월일
                      </th>
                      <td className={tdClass} style={{ width: '200px', textAlign: 'left', paddingLeft: '10px' }}>
                        1930.01.02
                      </td>
                      <th className={thClass} style={{ width: '100px' }}>
                        입소일
                      </th>
                      <td className={tdClass} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        {resident?.admissionDate || '2025.11.01'}
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>조사사유</th>
                      <td className={tdClass} colSpan={3} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        <div className="flex gap-4">
                          {['신규', '재사정', '상태변화'].map(reason => (
                            <label key={reason} className={radioLabelClass}>
                              <input
                                type="radio"
                                name="assessmentReason"
                                checked={assessmentReason === reason}
                                onChange={() => setAssessmentReason(reason)}
                                className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500"
                              />
                              <span>{reason}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <th className={thClass}>
                        작성일<span className="ml-0.5 text-red-500">*</span>
                      </th>
                      <td className={tdClass} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-[100px] border border-gray-300 px-2 py-1 font-medium outline-none"
                          />
                          <i className="ri-calendar-line text-lg text-gray-500"></i>
                        </div>
                      </td>
                      <th className={thClass}>
                        작성자<span className="ml-0.5 text-red-500">*</span>
                      </th>
                      <td className={tdClass} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            className="w-[80px] border border-gray-300 px-2 py-1 font-medium outline-none"
                          />
                          <button className="rounded bg-[#5F7183] px-2 py-1 text-[11px] text-white hover:bg-[#4F6173]">
                            선택
                          </button>
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

                {/* 2. Assessment Table */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={thClass} style={{ width: '120px' }}>
                        구분
                      </th>
                      {[4, 3, 2, 1, 0].map(score => (
                        <th key={score} className={thClass} style={{ width: '14%' }}>
                          {score}점
                        </th>
                      ))}
                      <th className={thClass} style={{ width: '80px' }}>
                        점수
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {EVALUATION_ROWS.map(row => (
                      <tr key={row.id}>
                        <th className="whitespace-pre-wrap border border-[#B8D1E0] bg-[#F9FBFF] px-2 py-3 text-center text-[12px] font-bold text-[#333]">
                          {row.label}
                        </th>
                        {[4, 3, 2, 1, 0].map(score => {
                          const label = row.options[score as keyof typeof row.options];
                          return (
                            <td key={score} className={clsx(tdClass, 'text-left align-top hover:bg-gray-50')}>
                              {label && (
                                <label className="flex h-full min-h-[40px] w-full cursor-pointer items-start gap-2 p-1">
                                  <input
                                    type="radio"
                                    name={`score-${row.id}`}
                                    className="mt-0.5 h-4 w-4 shrink-0 border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={scores[row.id] === score}
                                    onChange={() => handleScoreChange(row.id, score)}
                                  />
                                  <span className="whitespace-pre-wrap break-words text-[12px] leading-tight">
                                    {label}
                                  </span>
                                </label>
                              )}
                            </td>
                          );
                        })}
                        <td className="border border-[#B8D1E0] bg-white text-center text-[12px] font-bold text-blue-600">
                          {scores[row.id] !== undefined && scores[row.id] !== null ? (
                            `${scores[row.id]}점`
                          ) : (
                            <span className="text-blue-500">✓평가필요</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* Total Score Row */}
                    <tr>
                      <th className="border border-[#B8D1E0] bg-[#F1F8FF] py-3 text-center text-[12px] font-bold text-[#333]">
                        합계점수
                      </th>
                      <td
                        colSpan={5}
                        className="border border-[#B8D1E0] bg-[#F9FAFB] px-4 py-3 text-center text-[12px] text-gray-600"
                      >
                        ※ Huhn의 낙상위험도 척도 :{' '}
                        <span className="font-bold text-red-600">4점이하 - 낙상위험 낮음</span> /{' '}
                        <span className="font-bold">5~10점 - 낙상위험 높음</span> /{' '}
                        <span className="font-bold text-blue-600">11점 이상 - 낙상위험 아주 높음</span>
                      </td>
                      <td className="border border-[#B8D1E0] bg-white text-center text-[16px] font-bold text-red-500">
                        {totalScore}점
                      </td>
                    </tr>
                    {/* Remarks Row */}
                    <tr>
                      <th className={thClass}>비고</th>
                      <td colSpan={6} className={tdClass}>
                        <input
                          type="text"
                          className="w-full border border-gray-300 px-2 py-1 outline-none focus:border-blue-400"
                          value={remarks}
                          onChange={e => setRemarks(e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right Side Actions */}
              <div className="flex w-[120px] flex-col gap-2 border-l border-gray-200 bg-white p-3 pt-5">
                <button className="w-full rounded border border-gray-300 bg-white py-2 text-[12px] font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                  이전 자료 조회
                </button>
                <button
                  className="w-full rounded bg-[#2E8BCC] py-3 text-[13px] font-bold text-white shadow-sm hover:bg-[#2070A8]"
                  onClick={() => {
                    // Handle save
                    onClose();
                  }}
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
