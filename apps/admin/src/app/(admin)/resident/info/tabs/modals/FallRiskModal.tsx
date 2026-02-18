/**
 * Description : FallRiskModal.tsx - ?? ?? UI ????
 * 이미지 데이터(생활실, 주요질환) 및 실시간 점수 산출 로직 통합
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface AssessmentItem {
  id: string;
  category: string;
  options: { score: number; label: string }[];
}

// Huhn의 낙상위험도 평가 항목 데이터 정의
const ASSESSMENT_DATA: AssessmentItem[] = [
  {
    id: 'age',
    category: '연령',
    options: [
      { score: 3, label: '80세 이상' },
      { score: 2, label: '70-79세' },
      { score: 1, label: '60-69세' },
      { score: 0, label: '해당없음' },
    ],
  },
  {
    id: 'mental',
    category: '정신상태',
    options: [
      { score: 4, label: '혼란스러움/방향감각장애' },
      { score: 2, label: '때때로 혼란스러움' },
      { score: 0, label: '해당없음' },
    ],
  },
  {
    id: 'toileting',
    category: '배변',
    options: [
      { score: 4, label: '소변, 대변실금' },
      { score: 3, label: '조절능력 있지만 도움 필요' },
      { score: 1, label: '유치도뇨관/인공항문' },
      { score: 0, label: '해당없음' },
    ],
  },
  {
    id: 'history',
    category: '낙상경험',
    options: [
      { score: 4, label: '이미 세번 이상 넘어짐' },
      { score: 2, label: '이미 한번 또는 두번 넘어짐' },
      { score: 0, label: '해당없음' },
    ],
  },
  {
    id: 'activity',
    category: '활동',
    options: [
      { score: 4, label: '전적으로 도움을 받음' },
      { score: 3, label: '자리에서 일어나 앉기 도움' },
      { score: 1, label: '자립/세면대 화장실이용' },
      { score: 0, label: '해당없음' },
    ],
  },
  {
    id: 'gait',
    category: '걸음걸이 및 균형',
    options: [
      { score: 4, label: '불규칙/불안정' },
      { score: 3, label: '일어서기/걸을 때 기립성 빈혈' },
      { score: 2, label: '보행장애/보조도구나 도움' },
      { score: 0, label: '해당없음' },
    ],
  },
  {
    id: 'medication',
    category: '약물 복용',
    options: [
      { score: 4, label: '3개 또는 그 이상의 약 복용' },
      { score: 3, label: '두가지 약 복용' },
      { score: 2, label: '한가지 약 복용' },
      { score: 0, label: '해당없음' },
    ],
  },
];

export default function FallRiskModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // 각 항목별 선택된 점수 상태 관리
  const [scores, setScores] = useState<Record<string, number | null>>({});

  // 실시간 합계 점수 계산
  const totalScore = useMemo(() => {
    return Object.values(scores).reduce((acc: number, cur) => acc + (cur || 0), 0);
  }, [scores]);

  // 점수에 따른 위험도 판정 로직
  const getRiskLevel = (score: number) => {
    if (score >= 11) return { label: '낙상위험 아주 높음', color: 'text-red-700 bg-red-100' };
    if (score >= 5) return { label: '낙상위험 높음', color: 'text-red-600 bg-red-50' };
    return { label: '낙상위험 낮음', color: 'text-blue-600 bg-blue-50' };
  };

  if (!isOpen) return null;

  // 공통 스타일 클래스
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-2 text-center text-[12px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900';
  const tdClickClass =
    'border border-[#B8D1E0] px-3 py-2 text-[11px] text-gray-900 bg-white hover:bg-emerald-50 transition-colors cursor-pointer';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-[1150px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 1. 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <h2 className="text-lg font-black text-gray-800">낙상위험도 평가</h2>
          <button onClick={onClose} className="text-gray-500 transition-all hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        {/* 2. 수급자 정보 요약 상단 바 (이미지 데이터 100% 재현) */}
        <div className="bg-[#F8FAFC] p-3">
          <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
            <tbody>
              {/* Row 1 */}
              <tr>
                <th className={thClass}>수급자명</th>
                <td className={tdClass}>가나다</td>
                <th className={thClass}>성별</th>
                <td className={tdClass}>여</td>
                <th className={thClass}>생년월일</th>
                <td className={tdClass}>1945.01.01</td>
                <th className={thClass}>입소일</th>
                <td className={tdClass}>2026.01.23</td>
              </tr>
              {/* Row 2 */}
              <tr>
                <th className={thClass}>조사사유</th>
                <td colSpan={3} className={tdClass}>
                  <div className="flex gap-4">
                    <label className="flex cursor-pointer items-center gap-1">
                      <input type="radio" name="reason" defaultChecked className="accent-[#57A5CE]" /> 재사정
                    </label>
                    <label className="flex cursor-pointer items-center gap-1">
                      <input type="radio" name="reason" className="accent-[#57A5CE]" /> 상태변화
                    </label>
                  </div>
                </td>
                <th className={thClass}>작성일</th>
                <td className={tdClass}>
                  <input
                    type="date"
                    defaultValue="2026-02-06"
                    className="border border-gray-300 px-1 font-mono outline-none"
                  />
                </td>
                <th className={thClass}>작성자</th>
                <td className={tdClass}>
                  <div className="flex items-center justify-between">
                    <span>최인경</span>
                    <button className="rounded bg-[#7A8B9A] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                      선택
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <th className={thClass}>생활실</th>
                <td className={tdClass}>너와나</td>
                <th className={thClass}>주요질환</th>
                <td colSpan={5} className={clsx(tdClass, 'font-medium text-blue-700')}>
                  관절염, 약간의 인지저하, 당뇨있음
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. 메인 평가 영역 */}
        <div className="flex gap-4 bg-white p-4">
          <div className="flex-1 overflow-auto">
            <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
              <thead>
                <tr className="bg-[#E8F1F8]">
                  <th className="w-24 border border-[#B8D1E0] py-2 text-[12px]">구분</th>
                  {[4, 3, 2, 1, 0].map(s => (
                    <th key={s} className="border border-[#B8D1E0] py-2 text-[12px]">
                      {s}점
                    </th>
                  ))}
                  <th className="w-16 border border-[#B8D1E0] py-2 text-[12px] text-[#2E6A9E]">점수</th>
                </tr>
              </thead>
              <tbody>
                {ASSESSMENT_DATA.map(item => (
                  <tr key={item.id}>
                    <th className={thClass}>{item.category}</th>
                    {[4, 3, 2, 1, 0].map(score => {
                      const option = item.options.find(o => o.score === score);
                      return (
                        <td
                          key={score}
                          className={tdClickClass}
                          onClick={() => setScores(prev => ({ ...prev, [item.id]: score }))}
                        >
                          {option && (
                            <label className="flex h-full w-full cursor-pointer items-center gap-2">
                              <input
                                type="radio"
                                name={item.id}
                                checked={scores[item.id] === score}
                                onChange={() => {}}
                                className="accent-[#57A5CE]"
                              />
                              <span className={clsx(scores[item.id] === score && 'font-bold text-[#2E6A9E]')}>
                                {option.label}
                              </span>
                            </label>
                          )}
                        </td>
                      );
                    })}
                    <td className="border border-[#B8D1E0] bg-gray-50 text-center font-black text-blue-600">
                      {scores[item.id] !== undefined && scores[item.id] !== null ? `${scores[item.id]}점` : '평가필요'}
                    </td>
                  </tr>
                ))}

                {/* 합계 점수 바 */}
                <tr className="bg-[#FEFCE8]">
                  <th className={thClass}>합계점수</th>
                  <td colSpan={5} className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-600">
                        ※ Huhn의 낙상위험도 : <span className="text-blue-600">4점이하(낮음)</span> / 5~10점(높음) /{' '}
                        <span className="text-red-600">11점이상(아주 높음)</span>
                      </span>
                      <span
                        className={clsx(
                          'rounded-full px-3 py-1 text-[12px] font-black shadow-sm',
                          getRiskLevel(totalScore).color,
                        )}
                      >
                        {getRiskLevel(totalScore).label}
                      </span>
                    </div>
                  </td>
                  <td className="border border-[#B8D1E0] text-center text-xl font-black text-red-600">
                    {totalScore}점
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 비고란 */}
            <div className="mt-3 flex items-center border border-[#B8D1E0]">
              <span className={clsx(thClass, 'border-none')}>비고</span>
              <input
                type="text"
                className="flex-1 bg-white p-2 text-sm outline-none"
                placeholder="추가 특이사항을 입력하세요."
              />
            </div>
          </div>

          {/* 4. 우측 사이드 액션 바 */}
          <div className="flex w-28 shrink-0 flex-col gap-2">
            <button className="rounded border border-gray-300 bg-white py-2.5 text-[12px] font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50">
              이전 자료 조회
            </button>
            <button className="rounded bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] py-5 text-[14px] font-black text-white shadow-lg transition-transform active:scale-95">
              저장
            </button>
            <button className="rounded bg-[#7A8B9A] py-3 text-[12px] font-bold text-white shadow-md hover:bg-[#647481]">
              양식 출력
            </button>
            <button
              onClick={onClose}
              className="rounded bg-[#666] py-3 text-[12px] font-bold text-white shadow-md hover:bg-[#555]"
            >
              창 닫기
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
