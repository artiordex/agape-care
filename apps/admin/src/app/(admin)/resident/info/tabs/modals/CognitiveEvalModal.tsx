/**
 * Description : CognitiveEvalModal.tsx - 📌 CIST 인지기능 평가 (최종 수정본)
 * 모든 세부 항목 점수 산출 로직 및 스타일 에러 수정 완료
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function CognitiveEvalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // 모든 개별 항목 점수 상태
  const [scores, setScores] = useState<Record<string, number>>({});

  // --- [Style Definitions] ---
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1 text-center text-[11px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1 text-[11px] text-gray-900 bg-white';
  const scoreTd = 'border border-[#B8D1E0] text-center font-bold text-blue-600 bg-gray-50 w-16'; // 에러 해결을 위한 정의 추가
  const labelClass = 'flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors';

  // 영역별 점수 합산 로직
  const areaScores = useMemo(() => {
    const getSum = (keys: string[]) => keys.reduce((acc, k) => acc + (scores[k] || 0), 0);

    return {
      orientation: getSum(['year', 'month', 'day', 'dow', 'place']), // 지남력 (5점)
      attention: getSum(['digit1', 'digit2', 'backward']), // 주의력 (3점)
      visuospatial: getSum(['drawing']), // 시공간 (2점)
      executive: getSum(['visual1', 'visual2', 'verbal1', 'verbal2', 'fluency']), // 집행기능 (6점)
      memory: getSum(['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10']), // 기억력 (10점)
      language: getSum(['naming1', 'naming2', 'naming3', 'comprehension']), // 언어기능 (4점)
    };
  }, [scores]);

  const totalScore = Object.values(areaScores).reduce((a, b) => a + b, 0);

  const getJudgment = (score: number) => {
    if (score >= 24) return { label: '정상', color: 'text-emerald-600 bg-emerald-50' };
    if (score >= 15) return { label: '인지저하 의심', color: 'text-orange-600 bg-orange-50' };
    return { label: '치매 의심', color: 'text-red-600 bg-red-50' };
  };

  const renderRadio = (id: string, value: number) => (
    <label className={labelClass}>
      <input
        type="radio"
        name={id}
        checked={scores[id] === value}
        onChange={() => setScores(prev => ({ ...prev, [id]: value }))}
        className="h-3 w-3 accent-[#57A5CE]"
      />
      <span>{value}점</span>
    </label>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-h-[98vh] w-full max-w-[1300px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <h2 className="text-lg font-black italic text-gray-800">인지기능 평가 - CIST (치매선별검사)</h2>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        {/* 상단 수급자 요약 정보 */}
        <div className="border-b border-gray-200 bg-[#F8FAFC] p-3">
          <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
            <tbody>
              <tr>
                <th className={thClass}>수급자명</th>
                <td className={tdClass}>가나다</td>
                <th className={thClass}>성별</th>
                <td className={tdClass}>여</td>
                <th className={thClass}>생년월일</th>
                <td className={tdClass}>1945.01.01 (만 81세)</td>
                <th className={thClass}>인지평가 제외</th>
                <td className={tdClass}>
                  <input type="checkbox" className="h-3 w-3" />
                </td>
              </tr>
              <tr>
                <th className={thClass}>학력(교육년수)</th>
                <td className={tdClass}>
                  <select className="w-full border text-[10px]">
                    <option>무학(0년)</option>
                  </select>
                </td>
                <th className={thClass}>검사장소</th>
                <td className={tdClass}>체험시설요양원</td>
                <th className={thClass}>검사일</th>
                <td className={tdClass}>
                  <input type="date" defaultValue="2026-02-06" className="w-full border px-1" />
                </td>
                <th className={thClass}>작성자</th>
                <td className={tdClass}>
                  최인경 <button className="ml-1 rounded bg-[#7A8B9A] px-1 text-[10px] text-white">선택</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 메인 평가 그리드 */}
        <div className="custom-scrollbar flex gap-4 overflow-y-auto bg-white p-4">
          {/* 좌측 컬럼 */}
          <div className="flex-1 space-y-4">
            <table className="w-full border-collapse border border-[#B8D1E0]">
              <thead>
                <tr className="bg-[#E8F1F8]">
                  <th className="w-16 border border-[#B8D1E0] py-1 text-[11px]">영역</th>
                  <th className="border border-[#B8D1E0] text-[11px]">항목</th>
                  <th className="w-24 border border-[#B8D1E0] text-[11px]">점수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowSpan={5} className={thClass}>
                    지남력
                  </th>
                  <td className={tdClass}>시간 (년)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('year', 0)}
                      {renderRadio('year', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>시간 (월)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('month', 0)}
                      {renderRadio('month', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>시간 (일)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('day', 0)}
                      {renderRadio('day', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>시간 (요일)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('dow', 0)}
                      {renderRadio('dow', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>장소 (기관명 등)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('place', 0)}
                      {renderRadio('place', 1)}
                    </div>
                  </td>
                </tr>

                <tr>
                  <th className={thClass}>기억등록</th>
                  <td className={tdClass}>단어 3개 등록</td>
                  <td className={tdClass}>
                    <span className="text-[9px] text-gray-400">등록 완료</span>
                  </td>
                </tr>

                <tr>
                  <th rowSpan={3} className={thClass}>
                    주의력
                  </th>
                  <td className={tdClass}>숫자 바로 따라 말하기(1)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('digit1', 0)}
                      {renderRadio('digit1', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>숫자 바로 따라 말하기(2)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('digit2', 0)}
                      {renderRadio('digit2', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>거꾸로 말하기</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('backward', 0)}
                      {renderRadio('backward', 1)}
                    </div>
                  </td>
                </tr>

                <tr>
                  <th className={thClass}>시공간</th>
                  <td className={tdClass}>도형모사 (그림1)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('drawing', 0)}
                      {renderRadio('drawing', 1)}
                      {renderRadio('drawing', 2)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 우측 컬럼 */}
          <div className="flex-1 space-y-4">
            <table className="w-full border-collapse border border-[#B8D1E0]">
              <thead>
                <tr className="bg-[#E8F1F8]">
                  <th className="w-16 border border-[#B8D1E0] py-1 text-[11px]">영역</th>
                  <th className="border border-[#B8D1E0] text-[11px]">항목</th>
                  <th className="w-24 border border-[#B8D1E0] text-[11px]">점수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className={thClass}>기억회상</th>
                  <td className={tdClass}>
                    <div className="grid grid-cols-5 gap-1 py-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <label
                          key={i}
                          className="flex flex-col items-center rounded border border-gray-100 bg-gray-50 p-1"
                        >
                          <span className="text-[8px] text-gray-400">{i + 1}</span>
                          <input
                            type="checkbox"
                            checked={scores[`r${i + 1}`] === 1}
                            onChange={e => setScores(prev => ({ ...prev, [`r${i + 1}`]: e.target.checked ? 1 : 0 }))}
                            className="h-3 w-3"
                          />
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className={scoreTd}>{areaScores.memory}점</td>
                </tr>
                <tr>
                  <th rowSpan={2} className={thClass}>
                    언어기능
                  </th>
                  <td className={tdClass}>이름대기 (그림 3개)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('naming1', 0)}
                      {renderRadio('naming1', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>이해력 (예문)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('comprehension', 0)}
                      {renderRadio('comprehension', 1)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>집행기능</th>
                  <td className={tdClass}>언어유창성 (동물 이름)</td>
                  <td className={tdClass}>
                    <div className="flex gap-2">
                      {renderRadio('fluency', 0)}
                      {renderRadio('fluency', 1)}
                      {renderRadio('fluency', 2)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 판정 결과 요약 */}
            <div className="mt-4 rounded-sm border border-[#B8D1E0] bg-[#F8FAFC] p-3 shadow-inner">
              <p className="mb-2 text-[10px] font-black uppercase text-gray-500">Evaluation Result Summary</p>
              <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
                <thead>
                  <tr className="bg-[#E8F1F8] text-[9px] text-[#2E6A9E]">
                    <th>지남력</th>
                    <th>주의력</th>
                    <th>시공간</th>
                    <th>집행</th>
                    <th>기억</th>
                    <th>언어</th>
                    <th>총점</th>
                    <th>판정</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-[11px] font-bold">
                  <tr>
                    <td className="border border-[#B8D1E0] py-1.5 text-center">{areaScores.orientation}/5</td>
                    <td className="border border-[#B8D1E0] py-1.5 text-center">{areaScores.attention}/3</td>
                    <td className="border border-[#B8D1E0] py-1.5 text-center">{areaScores.visuospatial}/2</td>
                    <td className="border border-[#B8D1E0] py-1.5 text-center">{areaScores.executive}/6</td>
                    <td className="border border-[#B8D1E0] py-1.5 text-center">{areaScores.memory}/10</td>
                    <td className="border border-[#B8D1E0] py-1.5 text-center">{areaScores.language}/4</td>
                    <td className="border border-[#B8D1E0] py-1.5 text-center text-red-600">{totalScore}/30</td>
                    <td className={clsx('border border-[#B8D1E0] py-1.5 text-center', getJudgment(totalScore).color)}>
                      {getJudgment(totalScore).label}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <textarea
              className="h-20 w-full border border-[#B8D1E0] p-2 text-xs outline-none focus:border-[#57A5CE]"
              placeholder="비고 및 관찰 내용을 입력하세요."
            />
          </div>

          {/* 우측 액션 바 */}
          <div className="flex w-32 shrink-0 flex-col gap-2">
            <button className="rounded border border-gray-300 bg-white py-2.5 text-[11px] font-bold text-gray-700 shadow-sm hover:bg-gray-50">
              이전 자료 조회
            </button>
            <button className="rounded bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] py-5 text-[14px] font-black text-white shadow-lg active:scale-95">
              저장하기
            </button>
            <button className="rounded border border-emerald-200 bg-emerald-50 py-3 text-[11px] font-bold text-emerald-700">
              K-MMSE 가이드
            </button>
            <button
              onClick={onClose}
              className="mt-auto rounded bg-[#666] py-3 text-[11px] font-bold text-white shadow-md"
            >
              창 닫기
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
