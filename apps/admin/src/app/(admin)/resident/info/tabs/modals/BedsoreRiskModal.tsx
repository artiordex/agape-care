/**
 * Description : BedsoreRiskModal.tsx - ?? ?? UI ????
 * 이미지 데이터 및 실시간 점수 산출 로직 통합
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface BradenItem {
  id: string;
  category: string;
  options: { score: number; label: string; description: string }[];
}

// Braden Scale 평가 항목 데이터 정의 (이미지 내용 기반)
const BRADEN_DATA: BradenItem[] = [
  {
    id: 'sensory',
    category: '감각인지 정도',
    options: [
      {
        score: 1,
        label: '1. 감각 완전 제한됨',
        description: '의식수준이 떨어지거나 진정/안정제 복용 등으로 통증 자극에 반응이 없음.',
      },
      {
        score: 2,
        label: '2. 감각 매우 제한됨',
        description: '통증 자극에만 반응함. 신체의 1/2 이상에 통증이나 불편감을 느끼지 못함.',
      },
      {
        score: 3,
        label: '3. 감각 약간 제한됨',
        description: '말로 지시하면 반응하지만, 체위 변경을 해달라고 하거나 불편하다고 항상 말할 수는 없음.',
      },
      {
        score: 4,
        label: '4. 감각 손상 없음',
        description: '말로 지시하면 반응을 보이며 통증이나 불편감을 느끼고 표현할 수 있음.',
      },
    ],
  },
  {
    id: 'moisture',
    category: '습기여부',
    options: [
      { score: 1, label: '1. 항상 젖어 있음', description: '피부가 땀, 소변으로 항상 축축하다.' },
      {
        score: 2,
        label: '2. 자주 젖어 있음',
        description: '늘 축축한 것은 아니지만 자주 축축해져 8시간에 한 번은 린넨을 갈아주어야 한다.',
      },
      { score: 3, label: '3. 가끔 젖어 있음', description: '가끔 축축하다. 하루에 한번 정도 린넨 교환이 필요하다.' },
      {
        score: 4,
        label: '4. 거의 젖어 있지 않음',
        description: '피부는 보통 건조하며 린넨은 평상시대로만 교환해 주면 된다.',
      },
    ],
  },
  {
    id: 'activity',
    category: '활동상태',
    options: [
      {
        score: 1,
        label: '1. 항상 침대에만 누워 있음',
        description: '도움 없이는 몸은 물론 손, 발을 조금도 움직이지 못한다.',
      },
      {
        score: 2,
        label: '2. 의자에 앉아 있을 수 있음',
        description:
          '걸을 수 없거나 걷는 능력이 상당히 제한되어 있다. 체중 부하를 할 수 없어 의자나 휠체어로 이동 시 도움이 필요하다.',
      },
      {
        score: 3,
        label: '3. 가끔 걸을 수 있음',
        description: '낮 동안에 도움을 받거나 도움 없이 매우 짧은 거리를 걸을 수 있다.',
      },
      {
        score: 4,
        label: '4. 자주 걸을 수 있음',
        description: '적어도 하루에 두 번 방 밖을 걷고, 방안은 적어도 2시간 마다 걷는다.',
      },
    ],
  },
  {
    id: 'mobility',
    category: '움직임',
    options: [
      { score: 1, label: '1. 완전히 못 움직임', description: '도움 없이는 신체나 사지를 전혀 움직이지 못한다.' },
      {
        score: 2,
        label: '2. 매우 제한됨',
        description: '신체나 사지의 체위를 가끔 조금 변경시킬 수 있지만 자주하거나 많이 변경시키지 못한다.',
      },
      {
        score: 3,
        label: '3. 약간 제한됨',
        description: '조금이기는 하지만 혼자서 신체나 사지의 체위를 자주 변경시킨다.',
      },
      { score: 4, label: '4. 제한 없음', description: '도움 없이도 체위를 자주 변경시킨다.' },
    ],
  },
  {
    id: 'nutrition',
    category: '영양상태',
    options: [
      {
        score: 1,
        label: '1. 매우나쁨',
        description: '제공된 음식의 1/3 이하를 섭취한다. 단백질을 하루에 2회 이하 섭취한다.',
      },
      { score: 2, label: '2. 부족함', description: '제공된 음식의 1/2을 먹는다. 단백질을 하루에 약 3회 섭취한다.' },
      { score: 3, label: '3. 적당함', description: '식사의 반 이상을 먹는다. 단백질을 하루에 4회 섭취한다.' },
      {
        score: 4,
        label: '4. 양호함',
        description: '대부분의 식사를 섭취하며 절대 거절하는 일이 없다. 영양보충식이 필요로 되지 않는다.',
      },
    ],
  },
  {
    id: 'friction',
    category: '마찰력과 응전력',
    options: [
      {
        score: 1,
        label: '1. 문제 있음',
        description:
          '움직이는데 중등도 이상의 많은 도움을 필요로 한다. 자주 침대나 의자에서 미끄러져 내려가 다시 제 위치로 옮기는데 많은 도움이 필요하다.',
      },
      {
        score: 2,
        label: '2. 잠정적으로 문제있음',
        description:
          '자유로이 움직이나 약간의 도움을 필요로 한다. 의자나 침대에서 대부분 좋은 체위를 유지하고 있지만 가끔은 미끄러져 내려온다.',
      },
      {
        score: 3,
        label: '3. 문제없음',
        description:
          '침대나 의자에서 자유로이 움직이며 움직일 때 스스로 자신을 들어 올릴 수 있을 정도로 충분한 근력이 있다.',
      },
    ],
  },
];

export default function BedsoreRiskModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [scores, setScores] = useState<Record<string, number | null>>({});

  const totalScore = useMemo(() => {
    return Object.values(scores).reduce((acc: number, cur) => acc + (cur || 0), 0);
  }, [scores]);

  const getRiskLevel = (score: number) => {
    if (score === 0) return { label: '평가 필요', color: 'text-gray-400 bg-gray-50' };
    if (score <= 9) return { label: '위험이 매우 높음', color: 'text-red-700 bg-red-100' };
    if (score <= 12) return { label: '위험이 높음', color: 'text-red-600 bg-red-50' };
    if (score <= 14) return { label: '중간 정도의 위험 있음', color: 'text-orange-600 bg-orange-50' };
    if (score <= 18) return { label: '약간의 위험 있음', color: 'text-blue-600 bg-blue-50' };
    return { label: '위험 없음', color: 'text-emerald-600 bg-emerald-50' };
  };

  if (!isOpen) return null;

  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-2 text-center text-[12px] font-bold text-gray-700';
  const tdClass =
    'border border-[#B8D1E0] px-3 py-2 text-[11px] text-gray-900 bg-white hover:bg-emerald-50 transition-colors cursor-pointer align-top';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-[1200px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <h2 className="text-lg font-black italic text-gray-800">욕창위험도 평가</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        {/* 상단 요약 바 */}
        <div className="bg-[#F8FAFC] p-3">
          <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
            <tbody>
              <tr>
                <th className={thClass}>수급자명</th>
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">가나다</td>
                <th className={thClass}>성별</th>
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">여</td>
                <th className={thClass}>생년월일</th>
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">1945.01.01</td>
                <th className={thClass}>입소일</th>
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">2026.01.23</td>
              </tr>
              <tr>
                <th className={thClass}>조사사유</th>
                <td colSpan={3} className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">
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
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">
                  <input type="date" defaultValue="2026-02-06" className="border px-1 outline-none" />
                </td>
                <th className={thClass}>작성자</th>
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">
                  최인경 <button className="ml-1 rounded bg-[#7A8B9A] px-2 py-0.5 text-[11px] text-white">선택</button>
                </td>
              </tr>
              <tr>
                <th className={thClass}>체위변경 ?</th>
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">
                  <input type="checkbox" className="h-4 w-4" />
                </td>
                <th className={thClass}>생활실</th>
                <td className="border border-[#B8D1E0] px-3 py-1.5 text-[12px]">너와나</td>
                <th className={thClass}>주요질환</th>
                <td colSpan={3} className="border border-[#B8D1E0] px-3 py-1.5 text-[12px] font-bold text-blue-700">
                  관절염, 약간의 인지저하, 당뇨있음
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 메인 평가 테이블 */}
        <div className="flex gap-4 overflow-hidden bg-white p-4">
          <div className="flex-1 overflow-auto">
            <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
              <thead>
                <tr className="bg-[#E8F1F8]">
                  <th className="w-28 border border-[#B8D1E0] py-2 text-[12px]">구분</th>
                  {[1, 2, 3, 4].map(s => (
                    <th key={s} className="border border-[#B8D1E0] py-2 text-[12px]">
                      {s}점
                    </th>
                  ))}
                  <th className="w-20 border border-[#B8D1E0] py-2 text-[12px] text-[#2E6A9E]">점수</th>
                </tr>
              </thead>
              <tbody>
                {BRADEN_DATA.map(item => (
                  <tr key={item.id}>
                    <th className={thClass}>{item.category}</th>
                    {[1, 2, 3, 4].map(score => {
                      const option = item.options.find(o => o.score === score);
                      const isSelected = scores[item.id] === score;
                      return (
                        <td
                          key={score}
                          className={clsx(tdClass, isSelected && 'bg-emerald-50')}
                          onClick={() => setScores(prev => ({ ...prev, [item.id]: score }))}
                        >
                          {option ? (
                            <div className="flex flex-col gap-1">
                              <label className="flex cursor-pointer items-start gap-2">
                                <input
                                  type="radio"
                                  checked={isSelected}
                                  onChange={() => {}}
                                  className="mt-1 accent-[#57A5CE]"
                                />
                                <span className={clsx('font-bold', isSelected ? 'text-[#2E6A9E]' : 'text-gray-700')}>
                                  {option.label}
                                </span>
                              </label>
                              <p className="pl-5 text-[10px] leading-tight text-gray-500">{option.description}</p>
                            </div>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="border border-[#B8D1E0] bg-gray-50 text-center font-black text-blue-600">
                      {scores[item.id] ? `${scores[item.id]}점` : '평가필요'}
                    </td>
                  </tr>
                ))}

                {/* 합계 점수 행 */}
                <tr className="bg-[#FEFCE8]">
                  <th className={thClass}>합계점수</th>
                  <td colSpan={4} className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-gray-500">
                        ※ 해석: (Braden, 2001) - 19~23 위험없음 / 15~18 약간 위험 / 13~14 중간 위험 / 10~12 위험 높음 /
                        9 이하 매우 높음
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

            <div className="mt-2 flex items-center border border-[#B8D1E0]">
              <span className={clsx(thClass, 'w-28 border-none')}>비고</span>
              <input
                type="text"
                className="flex-1 bg-white p-2 text-sm outline-none"
                placeholder="특이사항을 입력하세요."
              />
            </div>
          </div>

          {/* 우측 액션 바 */}
          <div className="flex w-32 shrink-0 flex-col gap-2">
            <button className="rounded border border-gray-300 bg-white py-2.5 text-[12px] font-bold text-gray-700 shadow-sm hover:bg-gray-50">
              이전 자료 조회
            </button>
            <button className="rounded bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] py-5 text-[14px] font-black text-white shadow-lg active:scale-95">
              저장
            </button>
            <button className="rounded bg-[#7A8B9A] py-3 text-[12px] font-bold text-white shadow-md">양식 출력</button>
            <button onClick={onClose} className="rounded bg-[#666] py-3 text-[12px] font-bold text-white shadow-md">
              창 닫기
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
