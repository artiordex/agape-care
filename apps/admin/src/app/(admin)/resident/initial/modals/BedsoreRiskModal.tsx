/**
 * Description : BedsoreRiskModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BedsoreRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident: {
    name: string;
    admissionDate: string;
    // Add other fields if needed
  } | null;
}

const EVALUATION_ROWS = [
  {
    id: 'sensory',
    label: '감각인지\n정도',
    options: {
      1: {
        title: '1. 감각 완전 제한됨 (완전히 못 느낌)',
        desc: '의식수준이 떨어지거나 진정/안정제 복용 투여 등으로 통증 자극에 반응이 없다(통증자극에 대해 신음하거나 주먹을 쥔다거나 할 수 없음). 신체 대부분에서 통증을 느끼지 못한다.',
      },
      2: {
        title: '2. 감각 매우 제한됨',
        desc: '통증 자극에만 반응(신음하거나 불안정한 양상으로 통증이 있음을 나타냄) 또는 신체의 1/2 이상에 통증이나 불편감을 느끼지 못한다.',
      },
      3: {
        title: '3. 감각 약간 제한됨',
        desc: '말로 지시하면 반응하지만 체위 변경을 해달라고 하거나 불편하다고 항상 말할 수 있는 것은 아니다. 또는 사지에 통증이나 불편감을 느끼지 못한다.',
      },
      4: {
        title: '4. 감각 손상 없음',
        desc: '말로 지시하면 반응을 보이며 통증이나 불편감을 느끼고 말로 표현할 수 있다.',
      },
    },
  },
  {
    id: 'moisture',
    label: '습기여부',
    options: {
      1: { title: '1. 항상 젖어 있음', desc: '피부가 땀, 소변으로 항상 축축하다.' },
      2: {
        title: '2. 자주 젖어 있음',
        desc: '늘 축축한 것은 아니지만 자주 축축해져 8시간에 한 번은 린넨을 갈아주어야 한다.',
      },
      3: { title: '3. 가끔 젖어 있음', desc: '가끔 축축하다. 하루에 한번 정도 린넨 교환이 필요하다.' },
      4: { title: '4. 거의 젖어있지 않음', desc: '피부는 보통 건조하며 린넨은 평상시대로만 교환 해 주면 된다.' },
    },
  },
  {
    id: 'activity',
    label: '활동상태',
    options: {
      1: { title: '1. 항상 침대에만 누워 있음', desc: '도움 없이는 몸은 물론 손, 발을 조금도 움직이지 못한다.' },
      2: {
        title: '2. 의자에 앉아 있을 수 있음',
        desc: '걸을 수 없거나 걷는 능력이 상당히 제한되어 있다. 체중 부하를 할 수 없어 의자나 휠체어로 이동시 도움을 필요로 한다.',
      },
      3: {
        title: '3. 가끔 걸을 수 있음',
        desc: '낮 동안에 도움을 받거나 도움 없이 매우 짧은 거리를 걸을 수 있다. 그러나 대부분의 시간은 침상 이나 의자에서 보낸다.',
      },
      4: { title: '4. 자주 걸을 수 있음', desc: '적어도 하루에 두 번 방밖을 걷고, 방안은 적어도 2시간 마다 걷는다.' },
    },
  },
  {
    id: 'mobility',
    label: '움직임',
    options: {
      1: {
        title: '1. 완전히 못 움직임(스스로 움직일 수 없음)',
        desc: '도움 없이는 신체나 사지를 전혀 움직이지 못한다.',
      },
      2: {
        title: '2. 매우 제한됨',
        desc: '신체나 사지의 체위를 가끔 조금 변경시킬 수 있지만 자주하거나 많이 변경시키지 못한다.',
      },
      3: { title: '3. 약간 제한됨', desc: '조금이기는 하지만 혼자서 신체나 사지의 체위를 자주 변경시킨다.' },
      4: { title: '4. 제한 없음', desc: '도움 없이도 체위를 자주 변경시킨다.' },
    },
  },
  {
    id: 'nutrition',
    label: '영양상태',
    options: {
      1: {
        title: '1. 매우나쁨',
        desc: '제공된 음식의 1/3 이하를 섭취한다. 단백질(고기나 유제품)을 하루에 2회 섭취량이하를 먹는다. 수분을 잘 섭취 안한다. 유동성 영양보충액도 섭취 하지 않는다. 또는 5일 이상 동안 금식상태이거나 유동식으로 유지한다.',
      },
      2: {
        title: '2. 부족함',
        desc: '제공된 음식의 1/2를 먹는다. 단백질(고기나 유제품)은 하루에 약 3회 섭취량을 먹는다. 가끔 영양보충 식이를 섭취한다. 또는 유동식이나 위관영양을 적정량 미만으로 투여 받는다.',
      },
      3: {
        title: '3. 적당함',
        desc: '식사의 반 이상을 먹는다. 단백질(고기나 유제품) 을 하루에 4회 섭취량을 먹는다. 가끔 식사를 거부 하지만 보통 영양보충식이는 섭취한다. 또는 위관 영양이나 TPN으로 대부분의 영양요구량이 충족 된다.',
      },
      4: {
        title: '4. 양호함',
        desc: '대부분의 식사를 섭취하며 절대 거절하는 일이 없다. 단백질(고기나 유제품)을 하루에 4회 섭취량 이상을 먹으며 가끔 식간에도 먹는다. 영양보충식이 는 필요로 되지 않는다.',
      },
    },
  },
  {
    id: 'friction',
    label: '마찰력과\n응전력',
    options: {
      1: {
        title: '1. 문제 있음',
        desc: '움직이는데 중정도 이상의 많은 도움을 필요로 한다. 린넨으로 끌어당기지 않고 완전히 들어 올리는 것은 불가능하다. 자주 침대나 의자에서 미끄러져 내려가 다시 제 위치로 옮기는데 많은 도움이 필요 된다. 관절구축이나 강직, 움직임 등으로 항상 마찰 이 생긴다.',
      },
      2: {
        title: '2. 잠재적으로 문제있음',
        desc: '자유로이 움직이나 약간의 도움을 필요로 한다. 움직이는 동안 의자억제대나 린넨 또는 다른 장비에 의해 마찰이 생길 수 있다. 의자나 침대에서 대부분 좋은 체위를 유지하고 있지만 가끔은 미끄러져 내려 온다.',
      },
      3: {
        title: '3. 문제없음',
        desc: '침대나 의자에서 자유로이 움직이며 움직일 때 스스로 자신을 들어 올릴 수 있을 정도로 충분한 근력이 있다. 침대나 의자에 누워 있을 때 항상 좋은 체위를 유지한다.',
      },
      4: null, // No 4 points for this category
    },
  },
];

export default function BedsoreRiskModal({ isOpen, onClose, resident }: BedsoreRiskModalProps) {
  // Form State
  const [scores, setScores] = useState<Record<string, number | null>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [remarks, setRemarks] = useState('');

  // Header Info State
  const [assessmentReason, setAssessmentReason] = useState('신규');
  const [date, setDate] = useState('2026.02.18');
  const [author, setAuthor] = useState('최인경');
  const [positionChange, setPositionChange] = useState(false);
  const [room, setRoom] = useState('');
  const [disease, setDisease] = useState('');

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
            className="flex h-[95vh] w-full max-w-[1400px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-3">
              <h2 className="text-[18px] font-black text-[#333]">욕창위험도 평가</h2>
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
                      <td className={tdClass} style={{ textAlign: 'left', paddingLeft: '10px' }}>
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
                      <td className={tdClass} colSpan={1} style={{ textAlign: 'left', paddingLeft: '10px' }}>
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
                      <th className={thClass} style={{ width: '100px' }}>
                        퇴소일
                      </th>
                      <td className={tdClass}></td>
                    </tr>
                    <tr>
                      <th className={thClass}>체위변경</th>
                      <td className={tdClass} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        <input
                          type="checkbox"
                          checked={positionChange}
                          onChange={e => setPositionChange(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </td>
                      <th className={thClass}>생활실</th>
                      <td className={tdClass} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        <input
                          type="text"
                          value={room}
                          onChange={e => setRoom(e.target.value)}
                          className="w-full border-none outline-none"
                        />
                      </td>
                      <th className={thClass}>주요질환</th>
                      <td className={tdClass} colSpan={3} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        <input
                          type="text"
                          value={disease}
                          onChange={e => setDisease(e.target.value)}
                          className="w-full border-none outline-none"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* 2. Assessment Table */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={thClass} style={{ width: '100px' }}>
                        구분
                      </th>
                      {[1, 2, 3, 4].map(score => (
                        <th key={score} className={thClass} style={{ width: '20%' }}>
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
                        {[1, 2, 3, 4].map(score => {
                          // @ts-ignore
                          const data = row.options[score];
                          if (!data) {
                            return <td key={score} className={clsx(tdClass, 'bg-gray-50')}></td>;
                          }
                          return (
                            <td key={score} className={clsx(tdClass, 'h-[80px] text-left align-top hover:bg-gray-50')}>
                              <label className="flex h-full w-full cursor-pointer items-start gap-2 p-1">
                                <input
                                  type="radio"
                                  name={`score-${row.id}`}
                                  className="mt-0.5 h-4 w-4 shrink-0 border-gray-300 text-blue-600 focus:ring-blue-500"
                                  checked={scores[row.id] === score}
                                  onChange={() => handleScoreChange(row.id, score)}
                                />
                                <div className="flex flex-col">
                                  <span className="mb-1 text-[12px] font-bold leading-tight">{data.title}</span>
                                  <span className="text-[11px] leading-tight text-gray-600">{data.desc}</span>
                                </div>
                              </label>
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
                        colSpan={4}
                        className="border border-[#B8D1E0] bg-[#F9FAFB] px-4 py-3 text-center text-[12px] text-gray-600"
                      >
                        ※ 해석: (Braden , 2001) - 19~23 위험없음 / 15~18 약간의 위험 있음 / 13~14 중간 정도의 위험 있음
                        / 10~12 위험이 높음 / 9 이하 위험이 매우 높음
                      </td>
                      <td className="border border-[#B8D1E0] bg-white text-center text-[16px] font-bold text-red-500">
                        {totalScore}점
                      </td>
                    </tr>
                    {/* Remarks Row */}
                    <tr>
                      <th className={thClass}>비고</th>
                      <td colSpan={5} className={tdClass}>
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
