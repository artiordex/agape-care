/**
 * Description : NeedsAssessmentModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface NeedsAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident: {
    name: string;
    admissionDate: string;
    // Add other fields as needed
  } | null;
}

// Tab Configuration
const TABS = [
  { id: 1, label: '1. 영양상태\n2. 구강상태', activeIds: [1, 2] },
  { id: 2, label: '3. 질병상태', activeIds: [3] },
  { id: 3, label: '4. 신체상태\n5. 인지상태', activeIds: [4, 5] },
  { id: 4, label: '6. 의사소통\n7. 가족 및\n환경상태', activeIds: [6, 7] },
  { id: 5, label: '8. 자원이용 욕구\n9. 재활상태', activeIds: [8, 9] },
  { id: 6, label: '10. 주관적 욕구\n11. 총평', activeIds: [10, 11] },
];

export default function NeedsAssessmentModal({ isOpen, onClose, resident }: NeedsAssessmentModalProps) {
  // Form State
  const [assessmentReason, setAssessmentReason] = useState('신규');
  const [date, setDate] = useState('2026.02.18');
  const [author, setAuthor] = useState('최인경');
  const [activeTabId, setActiveTabId] = useState(1);

  // Helper styles
  const thClass = 'border border-[#B8D1E0] bg-[#F1F8FF] py-1 text-center text-[12px] font-bold text-[#333]';
  const tdClass = 'border border-[#B8D1E0] bg-white px-2 py-1 text-[12px] text-[#333]';
  const inputClass = 'border border-gray-300 px-2 py-1 outline-none text-[12px] w-full';
  const radioLabelClass = 'flex items-center gap-1 cursor-pointer hover:opacity-80';
  const sectionTitleClass = 'font-bold text-[13px] text-[#333] mb-2 flex items-center gap-2';

  // Render Content based on Active Tab
  const renderTabContent = () => {
    switch (activeTabId) {
      case 1:
        return (
          <div className="flex h-full gap-4">
            {/* Left Column: 1. Nutrition & Elimination */}
            <div className="flex h-full flex-1 flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>1. 영양상태</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <table className="w-full border-collapse">
                  <tbody>
                    {/* Group: Nutrition */}
                    <tr>
                      <th className={clsx(thClass, 'text-[#333]')} rowSpan={3} style={{ width: '40px' }}>
                        영양
                      </th>
                      <th className={thClass} style={{ width: '90px' }}>
                        영양상태
                      </th>
                      <td className={tdClass}>
                        <div className="flex gap-4">
                          <label className={radioLabelClass}>
                            <input type="radio" name="nut_status" /> 양호
                            <i className="ri-question-fill text-gray-500"></i>
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="nut_status" /> 적당
                            <i className="ri-question-fill text-gray-500"></i>
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="nut_status" /> 부족
                            <i className="ri-question-fill text-gray-500"></i>
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="nut_status" /> 매우 나쁨
                            <i className="ri-question-fill text-gray-500"></i>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>식사형태</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 일반식
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 다진식
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 죽식
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 미음
                          </label>
                        </div>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 유동식(경관식)
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 연하식
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 갈은식
                          </label>
                        </div>
                        <div className="mb-1 flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          <input type="text" className={inputClass} style={{ width: 'auto', flex: 1 }} />
                          <span>)</span>
                        </div>
                        <div className="mb-1 hidden items-center gap-2">
                          <span className="text-[11px] font-bold text-[#555]">식사제공 시 식사종류 기본값</span>
                          <i className="ri-question-fill text-gray-500"></i>
                        </div>
                        <div className="mb-1 mt-2 flex items-center gap-2 border-t border-dotted border-gray-300 pt-1">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> <span className="text-blue-600">치료식이</span>
                          </label>
                          <span className="text-[11px] text-gray-400">
                            ( <input type="checkbox" /> 당뇨식 <input type="checkbox" /> 저염식{' '}
                            <input type="checkbox" /> 고단백식{' '}
                            <span className="rounded bg-blue-100 px-1 text-blue-800">체중조절식</span> )
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>식사시 문제점</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 양호
                          </label>
                        </div>
                        <div className="mb-1 flex gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 저작곤란
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 소화불량
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 오심 · 구토
                          </label>
                        </div>
                        <div className="mb-1 flex gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 가끔 사레걸림
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 자주 사레걸림
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 연하곤란
                          </label>
                        </div>
                        <div className="mb-1 flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 경관영양
                          </label>
                          <span className="rounded bg-red-100 px-1 text-[10px] text-red-600">비위관관리</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          <input type="text" className={inputClass} style={{ width: 'auto', flex: 1 }} />
                          <span>)</span>
                        </div>
                      </td>
                    </tr>

                    {/* Group: Elimination Patterns */}
                    <tr>
                      <th className={clsx(thClass, 'text-[#333]')} rowSpan={4}>
                        배설 양상
                      </th>
                      <th className={thClass}>
                        기피식품 <span className="text-red-500">*</span>
                      </th>
                      <td className={tdClass}>
                        <div className="mb-1 flex gap-4">
                          <label className="flex items-center gap-1">
                            <input type="radio" name="avoid_food" /> 없음
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="radio" name="avoid_food" /> 있음
                          </label>
                          <input
                            type="text"
                            className={inputClass}
                            placeholder="(종교, 건강(알레르기,소화), 비선호"
                            style={{ width: 'auto', flex: 1 }}
                          />
                          <span>)</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>소변상태</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 양호
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 요실금
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 배뇨곤란
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 유치도뇨관
                          </label>
                          <span className="rounded bg-red-100 px-1 text-[10px] text-red-600">도뇨관관리</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 방광루
                          </label>
                          <span className="rounded bg-red-100 px-1 text-[10px] text-red-600">도뇨관관리</span>
                          <label className="ml-2 flex items-center gap-1">
                            <input type="checkbox" /> 요루
                          </label>
                          <span className="rounded bg-red-100 px-1 text-[10px] text-red-600">도뇨관관리</span>
                          <label className="ml-2 flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          <input type="text" className={inputClass} style={{ width: '60px' }} />
                          <span>)</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>대변상태</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 양호
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 지속적인 설사
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 변비
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 장루
                          </label>
                          <span className="rounded bg-red-100 px-1 text-[10px] text-red-600">배설관리</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          <input type="text" className={inputClass} style={{ width: 'auto', flex: 1 }} />
                          <span>)</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>기저귀여부</th>
                      <td className={tdClass}>
                        <label className="flex items-center gap-1">
                          <input type="checkbox" /> 기저귀
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Judgement & Oral Status */}
            <div className="flex w-[450px] flex-col gap-2">
              {/* 1. Nutrition Judgment */}
              <div className="flex flex-col border border-[#B8D1E0]">
                <div className="flex items-center justify-end border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1">
                  <span className="mr-2 text-[12px] text-gray-500">작성자 : 최인경</span>
                  <div className="flex gap-1">
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">
                      이전 자료 조회
                    </button>
                  </div>
                </div>
                <div className="flex h-[200px]">
                  <div className="flex w-[100px] flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                    <span>판단근거</span>
                    <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>

              {/* 2. Oral Status */}
              <div className="flex flex-col border border-[#B8D1E0]">
                <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                  <span>2. 구강상태</span>
                  <div className="flex gap-1">
                    <span className="font-normal text-gray-500">작성자 : 최인경</span>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">
                      이전 자료 조회
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <table className="mb-2 w-full border-collapse">
                    <tbody>
                      <tr>
                        <th className={thClass} style={{ width: '80px' }}>
                          치아상태
                        </th>
                        <td className={tdClass}>
                          <div className="mb-1 flex flex-wrap gap-2">
                            <label className={radioLabelClass}>
                              <input type="radio" name="teeth" /> 양호
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name="teeth" /> 청결불량
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name="teeth" /> 치아 약함
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name="teeth" /> 틀니
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className={radioLabelClass}>
                              <input type="radio" name="teeth" /> 잔존 치아 없음
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name="teeth" /> 기타
                            </label>
                            <input type="text" className={inputClass} style={{ width: 'auto', flex: 1 }} />
                            <span>)</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass}>잇몸상태</th>
                        <td className={tdClass}>
                          <div className="flex items-center gap-2">
                            <label>
                              <input type="checkbox" /> 치은염증
                            </label>
                            <label>
                              <input type="checkbox" /> 치석
                            </label>
                            <label>
                              <input type="checkbox" /> 기타
                            </label>
                            <input type="text" className={inputClass} style={{ width: 'auto', flex: 1 }} />
                            <span>)</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex h-[150px] border border-[#B8D1E0]">
                    <div className="flex w-[100px] flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                      <span>판단근거</span>
                      <span className="text-red-500">*</span>
                    </div>
                    <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Disease Status
        return (
          <div className="flex h-full gap-4">
            {/* Left Column: 3. Disease Status */}
            <div className="flex flex-1 flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>3. 질병상태</span>
                <div className="flex gap-1">
                  <span className="text-gray-500">작성자 : 최인경</span>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">이전 자료 조회</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '90px' }}>
                        과거 병력
                      </th>
                      <td className={tdClass}>
                        <input type="text" className={inputClass} />
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>현 진단명</th>
                      <td className={tdClass}>
                        <input type="text" className={inputClass} />
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>만성질환</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 당뇨
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 고혈압
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 만성 호흡기질환
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 암
                          </label>
                          <div className="flex flex-1 items-center gap-1">
                            ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>순환기계</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 뇌경색
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 뇌출혈
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 협심증
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 심근경색증
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>신경계</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 치매
                          </label>
                          (
                          <label className="flex items-center gap-1">
                            <input type="radio" name="dementia_level" /> 경도인지장애
                            <i className="ri-question-fill text-gray-500"></i>
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="radio" name="dementia_level" /> 중등도치매
                            <i className="ri-question-fill text-gray-500"></i>
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="radio" name="dementia_level" /> 중증치매
                            <i className="ri-question-fill text-gray-500"></i>
                          </label>
                          )
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 파킨슨병
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 간질
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ width: '150px' }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>근골격계</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 관절염
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 요통, 좌골통
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 골절 등 후유증
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>정신, 행동장애</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 중풍
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 우울증
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 수면장애
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 정신질환
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>호흡기계</th>
                      <td className={tdClass}>
                        <div className="flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 호흡곤란
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 결핵
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기관지 절개관
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 흡인
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 산소요법
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>만성 신장질환</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 만성신부전증
                          </label>
                          (
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 복막투석
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 혈액투석
                          </label>
                          )
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>기타 질환</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 알레르기
                          </label>
                          (
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 식품
                          </label>
                          <input type="text" className={inputClass} style={{ width: '80px' }} />
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          <input type="text" className={inputClass} style={{ width: '80px' }} />)
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Bedsore Info */}
            <div className="flex w-[480px] flex-col gap-2">
              <div className="flex h-full flex-col border border-[#B8D1E0]">
                <div className="flex items-center justify-end border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1">
                  <span className="mr-2 text-[12px] text-gray-500">작성자 : 최인경</span>
                  <div className="flex gap-1">
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">
                      이전 자료 조회
                    </button>
                  </div>
                </div>

                <div className="flex h-full flex-col p-2">
                  {/* Bedsore Table */}
                  <div className="mb-2 border border-[#B8D1E0]">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr>
                          <th className={thClass} rowSpan={2} style={{ width: '40px', color: '#2E6A9E' }}>
                            욕창
                          </th>
                          <th className={thClass} style={{ width: '50px' }}>
                            단계 <span className="bg-red-500 px-0.5 text-[9px] text-white">욕창간호</span>{' '}
                            <i className="ri-question-fill text-gray-500"></i>
                          </th>
                          <td className={tdClass}>
                            <div className="flex gap-2">
                              <label className={radioLabelClass}>
                                <input type="radio" name="bedsore_stage" /> 1단계
                              </label>
                              <label className={radioLabelClass}>
                                <input type="radio" name="bedsore_stage" /> 2단계
                              </label>
                              <label className={radioLabelClass}>
                                <input type="radio" name="bedsore_stage" /> 3단계
                              </label>
                              <label className={radioLabelClass}>
                                <input type="radio" name="bedsore_stage" /> 4단계
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className={thClass}>
                            부위 <span className="bg-red-500 px-0.5 text-[9px] text-white">욕창간호</span>
                          </th>
                          <td className={tdClass}>
                            <div className="mb-1 flex flex-wrap gap-2">
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 머리
                              </label>
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 등
                              </label>
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 어깨
                              </label>
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 팔꿈치
                              </label>
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 엉덩이
                              </label>
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 뒤꿈치
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#2E6A9E]">기타</span>
                              ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className={thClass} colSpan={2} style={{ color: '#2E6A9E' }}>
                            욕창방지
                          </th>
                          <td className={tdClass}>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-1 font-bold text-[#2E6A9E]">
                                <input type="checkbox" /> 욕창방지
                              </label>
                              ( <span className="text-[#333]">도구 :</span>{' '}
                              <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Judgment Basis - Fills remaining height */}
                  <div className="flex flex-1 border border-[#B8D1E0]">
                    <div className="flex w-[100px] flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                      <span>판단근거</span>
                      <span className="text-red-500">*</span>
                    </div>
                    <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Implement other cases (3, 4, 5, 6) similarly based on screenshots...
      case 3: // Physical & Cognitive
        return (
          <div className="grid h-full grid-cols-2 gap-4">
            {/* Left: 4. Physical State */}
            <div className="flex flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>4. 신체상태 (일상생활동작수행능력)</span>
                <div className="flex gap-1">
                  <span className="text-gray-500">작성자 : 최인경</span>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">이전 자료 조회</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {/* Physical Status & Vitals */}
                <table className="mb-2 w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '100px', color: 'blue' }}>
                        수급자 상태
                      </th>
                      <td className={tdClass}>
                        <div className="flex gap-4">
                          <label className={radioLabelClass}>
                            <input type="radio" name="phy_status" /> 자립
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="phy_status" /> 준와상
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="phy_status" /> 와상
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>키</th>
                      <td className={tdClass}>
                        <div className="flex items-center gap-1">
                          <input type="text" className={inputClass} style={{ width: '80px', textAlign: 'right' }} /> cm
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>체중</th>
                      <td className={tdClass}>
                        <div className="flex items-center gap-1">
                          <input type="text" className={inputClass} style={{ width: '80px', textAlign: 'right' }} /> kg
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* ADL Table */}
                <table className="w-full border-collapse">
                  <tbody>
                    {[
                      { label: '옷 벗고 입기', name: 'adl_dress' },
                      { label: '세수하기', name: 'adl_face' },
                      { label: '양치질하기', name: 'adl_brush' },
                      { label: '식사하기', name: 'adl_eat' },
                      { label: '목욕하기', name: 'adl_bath' },
                      { label: '체위변경 하기', name: 'adl_position' },
                      { label: '일어나 앉기', name: 'adl_situp' },
                      { label: '옮겨 앉기', name: 'adl_transfer' },
                      { label: '화장실 사용하기', name: 'adl_toilet' },
                      { label: '몸단장하기', name: 'adl_groom' },
                    ].map((item, idx) => (
                      <tr key={idx}>
                        <th className={thClass}>{item.label}</th>
                        <td className={tdClass}>
                          <div className="flex justify-center gap-4">
                            <label className={radioLabelClass}>
                              <input type="radio" name={item.name} /> 완전자립
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name={item.name} /> 부분도움
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name={item.name} /> 완전도움
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Judgment Basis */}
                <div className="mt-2 flex h-[150px] border border-[#B8D1E0]">
                  <div className="flex w-[80px] items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                    판단근거 <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>

            {/* Right: 5. Cognitive State */}
            <div className="flex flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>5. 인지상태</span>
                <div className="flex gap-1">
                  <span className="text-gray-500">작성자 : 최인경</span>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">이전 자료 조회</button>
                </div>
              </div>
              <div className="flex h-full flex-col p-2">
                <div className="mb-2 border border-[#F0E68C] bg-[#FFF8DC] p-2 text-center text-[12px] font-bold text-[#333]">
                  욕구사정 작성일 기준 최근 작성된 CIST 평가가 없습니다.
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    {[
                      { id: 1, text: '망상 (남을 의심하거나, 위협을 느낌)' },
                      { id: 2, text: '환각 (헛것을 보거나 환청을 듣는다.)' },
                      { id: 3, text: '배회 (의미 없이 걷는다.)' },
                      { id: 4, text: '반복적인 행동 (의미 없는 행동을 한다.)' },
                      { id: 5, text: '부적절한 행동 (불결행위 및 숨기는 행동을 한다.)' },
                      { id: 6, text: '폭력적 행동 (주변인에게 폭력적인 행동을 보인다.)' },
                      { id: 7, text: '우울 (슬프거나 쳐져있고 때로는 운다.)' },
                      { id: 8, text: '불안 (서성이거나, 안절부절 못하다.)' },
                    ].map(row => (
                      <tr key={row.id}>
                        <td
                          className="border border-[#B8D1E0] bg-[#F1F8FF] px-2 py-1 text-center text-[12px] font-bold text-[#333]"
                          style={{ width: '40px' }}
                        >
                          {row.id}
                        </td>
                        <td className={clsx(tdClass, 'text-left font-bold')}>{row.text}</td>
                        <td className={tdClass} style={{ width: '40px', textAlign: 'center' }}>
                          <input type="checkbox" className="h-4 w-4" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Judgment Basis - Fills remaining height */}
                <div className="mt-2 flex flex-1 border border-[#B8D1E0]">
                  <div className="flex w-[80px] items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                    판단근거 <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Communication & Family
        return (
          <div className="grid h-full grid-cols-2 gap-4">
            {/* Left: 6. Communication */}
            <div className="flex flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>6. 의사소통</span>
                <div className="flex gap-1">
                  <span className="text-gray-500">작성자 : 최인경</span>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">이전 자료 조회</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '80px' }}>
                        청력상태
                      </th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        <div className="flex flex-col gap-1.5">
                          <label className={radioLabelClass}>
                            <input type="radio" name="hearing" /> 정상(보청기 사용 포함)
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="hearing" /> 가까운 곳에서 대화는 가능하나 먼 곳의 말소리는 듣지
                            못한다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="hearing" /> 큰소리만 들을 수 있다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="hearing" /> 소리에 거의 반응이 없다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="hearing" /> 들리는지 판단 불능
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>의사소통</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        <div className="flex flex-col gap-1.5">
                          <label className={radioLabelClass}>
                            <input type="radio" name="communication" /> 모두 이해하고 의사를 표현한다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="communication" /> 대부분 이해하고 의사를 표현한다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="communication" /> 가끔 이해하고 의사를 표현한다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="communication" />{' '}
                            <span className="font-bold text-blue-600">
                              거의 이해하지 못하고 의사를 전달하지 못한다. (면담 불가
                              <i className="ri-question-fill ml-1 text-gray-500"></i>)
                            </span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>발음능력</th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        <div className="flex flex-col gap-1.5">
                          <label className={radioLabelClass}>
                            <input type="radio" name="pronunciation" /> 정확하게 발음이 가능하다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="pronunciation" /> 웅얼거리는 소리로만 한다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="pronunciation" /> 간혹 어눌한 발음이 섞인다.
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="pronunciation" /> 전혀 발음하지 못한다.
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 flex h-[150px] border border-[#B8D1E0]">
                  <div className="flex w-[80px] items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                    판단근거 <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>

            {/* Right: 7. Family & Environment */}
            <div className="flex flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>7. 가족 및 환경상태</span>
                <div className="flex gap-1">
                  <span className="text-gray-500">작성자 : 최인경</span>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">이전 자료 조회</button>
                </div>
              </div>
              <div className="flex h-full flex-col p-2">
                <table className="mb-2 w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '80px' }}>
                        동거인
                      </th>
                      <td className={tdClass} colSpan={3}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 독거
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 배우자
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 부모
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 자녀
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 자부, 사위
                          </label>
                        </div>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 손자녀
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 친척
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 친구, 이웃
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>자녀수</th>
                      <td className={tdClass} colSpan={3}>
                        <div className="flex items-center gap-4">
                          <label className={radioLabelClass}>
                            <input type="radio" name="children_cnt" /> 무
                          </label>
                          <div className="flex items-center gap-2">
                            <label className={radioLabelClass}>
                              <input type="radio" name="children_cnt" /> 유
                            </label>
                            ( 아들 : <input type="text" className={inputClass} style={{ width: '40px' }} /> 명, 딸 :{' '}
                            <input type="text" className={inputClass} style={{ width: '40px' }} /> 명 )
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Primary Caregiver Group */}
                    <tr>
                      <th className={thClass} rowSpan={4} style={{ width: '30px' }}>
                        주수발자
                      </th>
                      <th className={thClass} style={{ width: '70px' }}>
                        유무
                      </th>
                      <td className={tdClass}>
                        <div className="flex gap-4">
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_exist" /> 무
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_exist" /> 유
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>관계</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_rel" /> 배우자
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_rel" /> 자녀
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_rel" /> 자부
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_rel" /> 사위
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_rel" /> 형제자매
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_rel" /> 친척
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className={radioLabelClass}>
                            <input type="radio" name="caregiver_rel" /> 기타
                          </label>
                          ( <input type="text" className={inputClass} style={{ flex: 1 }} /> )
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>경제 상태</th>
                      <td className={tdClass}>
                        <div className="flex flex-wrap gap-2">
                          <label className={radioLabelClass}>
                            <input type="radio" name="economic" /> 안정
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="economic" /> 불안정
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="economic" /> 연금생활
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="economic" /> 기초 생활수급
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="economic" /> 의료급여
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>수발 부담</th>
                      <td className={tdClass}>
                        <div className="mb-1 flex flex-wrap gap-2">
                          <label className={radioLabelClass}>
                            <input type="radio" name="burden" /> 전혀 부담되지 않음
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="burden" /> 아주 가끔 부담됨
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="burden" /> 가끔 부담됨
                          </label>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <label className={radioLabelClass}>
                            <input type="radio" name="burden" /> 자주 부담됨
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="burden" /> 항상 부담됨
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 flex flex-1 border border-[#B8D1E0]">
                  <div className="flex w-[80px] items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                    판단근거 <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Resource & Rehabilitation
        return (
          <div className="grid h-full grid-cols-2 gap-4">
            {/* Left: 8. Resource Utilization */}
            <div className="flex flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>8. 자원이용 욕구</span>
                <div className="flex gap-1">
                  <span className="text-gray-500">작성자 : 최인경</span>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">이전 자료 조회</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <table className="mb-2 w-full border-collapse">
                  <tbody>
                    {/* Medical Resources Group */}
                    <tr>
                      <th className={thClass} rowSpan={3} style={{ width: '80px' }}>
                        진료 병원
                      </th>
                      <th className={thClass} style={{ width: '100px' }}>
                        병원명 (진료과)
                      </th>
                      <td className={tdClass}>
                        <input type="text" className={inputClass} />
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>정기진료</th>
                      <td className={tdClass}>
                        <div className="flex gap-4">
                          <label className={radioLabelClass}>
                            <input type="radio" name="regular_checkup" /> 무
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="regular_checkup" /> 유
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>전화번호</th>
                      <td className={tdClass}>
                        <input type="text" className={inputClass} />
                      </td>
                    </tr>
                    {/* Religious Activity */}
                    <tr>
                      <th className={thClass} colSpan={2}>
                        종교활동
                      </th>
                      <td className={tdClass}>
                        <div className="flex flex-wrap gap-2">
                          <label className={radioLabelClass}>
                            <input type="radio" name="religion" /> 천주교
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="religion" /> 기독교
                          </label>
                          <label className={radioLabelClass}>
                            <input type="radio" name="religion" /> 불교
                          </label>
                          <div className="flex items-center gap-1">
                            <label className={radioLabelClass}>
                              <input type="radio" name="religion" /> 기타
                            </label>
                            ({' '}
                            <input
                              type="text"
                              className={inputClass}
                              placeholder="무교 또는 기타 종교"
                              style={{ width: '120px' }}
                            />{' '}
                            )
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex flex-1 border border-[#B8D1E0]" style={{ height: 'calc(100% - 150px)' }}>
                  <div className="flex w-[80px] items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                    판단근거 <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>

            {/* Right: 9. Rehabilitation Status */}
            <div className="flex flex-col border border-[#B8D1E0]">
              <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                <span>9. 재활상태</span>
                <div className="flex gap-1">
                  <span className="text-gray-500">작성자 : 최인경</span>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                  <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">이전 자료 조회</button>
                </div>
              </div>
              <div className="flex h-full flex-col p-2">
                <table className="mb-2 w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '80px' }}>
                        운동장애
                      </th>
                      <td className={tdClass}>
                        <div className="flex flex-wrap gap-2">
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 우측상지
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 좌측상지
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 우측하지
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" /> 좌측하지
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>관절구축</th>
                      <td className={tdClass}>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          <div className="flex items-center gap-1">
                            <input type="checkbox" /> 어깨관절 ({' '}
                            <label>
                              <input type="checkbox" /> 좌
                            </label>{' '}
                            <label>
                              <input type="checkbox" /> 우
                            </label>{' '}
                            )
                          </div>
                          <div className="flex items-center gap-1">
                            <input type="checkbox" /> 팔꿈치관절 ({' '}
                            <label>
                              <input type="checkbox" /> 좌
                            </label>{' '}
                            <label>
                              <input type="checkbox" /> 우
                            </label>{' '}
                            )
                          </div>
                          <div className="flex items-center gap-1">
                            <input type="checkbox" /> 손목 및 수지관절 ({' '}
                            <label>
                              <input type="checkbox" /> 좌
                            </label>{' '}
                            <label>
                              <input type="checkbox" /> 우
                            </label>{' '}
                            )
                          </div>
                          <div className="flex items-center gap-1">
                            <input type="checkbox" /> 고관절 ({' '}
                            <label>
                              <input type="checkbox" /> 좌
                            </label>{' '}
                            <label>
                              <input type="checkbox" /> 우
                            </label>{' '}
                            )
                          </div>
                          <div className="flex items-center gap-1">
                            <input type="checkbox" /> 무릎관절 ({' '}
                            <label>
                              <input type="checkbox" /> 좌
                            </label>{' '}
                            <label>
                              <input type="checkbox" /> 우
                            </label>{' '}
                            )
                          </div>
                          <div className="flex items-center gap-1">
                            <input type="checkbox" /> 발목관절 ({' '}
                            <label>
                              <input type="checkbox" /> 좌
                            </label>{' '}
                            <label>
                              <input type="checkbox" /> 우
                            </label>{' '}
                            )
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>보행장애</th>
                      <td className={tdClass}>
                        <div className="mb-2">
                          <label className="mb-1 flex items-center gap-1 font-bold text-[#333]">
                            <input type="checkbox" /> 지난 3개월 간 낙상
                          </label>
                          <div className="flex gap-2 pl-4">
                            (
                            <label className={radioLabelClass}>
                              <input type="radio" name="fall_history" /> 매일
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name="fall_history" /> 주 1회 이상
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name="fall_history" /> 월 1회 이상
                            </label>
                            <label className={radioLabelClass}>
                              <input type="radio" name="fall_history" /> 가끔
                            </label>
                            )
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 flex items-center gap-1 font-bold text-[#333]">
                            <input type="checkbox" /> 걸음걸이 및 균형
                          </label>
                          <div className="flex flex-col gap-1 pl-4">
                            (
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> 서거나 걸을 때 균형을 유지하지 못함
                            </label>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 일어서거나 걸을 때 어지러움
                              </label>
                              <label className="flex items-center gap-1">
                                <input type="checkbox" /> 보조도구나 부축해서 걷기
                              </label>
                            </div>
                            )
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 flex flex-1 border border-[#B8D1E0]">
                  <div className="flex w-[80px] items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] text-[12px] font-bold text-[#333]">
                    판단근거 <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Subjective & Overall
        return (
          <div className="grid h-full grid-cols-2 gap-4">
            {/* Left Column: 10. Subjective & 11. Overall */}
            <div className="flex flex-col gap-4">
              {/* 10. Subjective Needs */}
              <div className="flex h-1/2 flex-col border border-[#B8D1E0]">
                <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                  <span>10. 주관적 욕구</span>
                  <div className="flex gap-1">
                    <span className="text-gray-500">작성자 : 최인경</span>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">
                      이전 자료 조회
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 border-t border-[#B8D1E0]">
                  <div className="flex w-[120px] flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] p-2 text-center text-[12px] font-bold text-[#333]">
                    수급자 또는 보호자가
                    <br />
                    희망하는 욕구
                    <span className="text-red-500">*</span>
                  </div>
                  <textarea
                    className="flex-1 resize-none p-2 text-[12px] outline-none"
                    placeholder="수급자 또는 보호자가 희망하는 서비스(신체·인지 서비스 등)"
                  ></textarea>
                </div>
              </div>

              {/* 11. Overall Evaluation */}
              <div className="flex h-1/2 flex-col border border-[#B8D1E0]">
                <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-bold">
                  <span>11. 총평</span>
                  <div className="flex gap-1">
                    <span className="text-gray-500">작성자 : 최인경</span>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">선택</button>
                    <button className="rounded bg-[#5F7183] px-1.5 py-0.5 text-[10px] text-white">
                      이전 자료 조회
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 border-t border-[#B8D1E0]">
                  <div className="flex w-[120px] flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#FFEAEA] p-2 text-center text-[12px] font-bold text-[#333]">
                    총평 <span className="text-red-500">*</span>
                  </div>
                  <textarea className="flex-1 resize-none p-2 text-[12px] outline-none"></textarea>
                </div>
              </div>
            </div>

            {/* Right Column: Reference Summary */}
            <div className="flex flex-col border border-[#B8D1E0]">
              <div className="border-b border-[#B8D1E0] bg-white px-2 py-1 text-[12px] font-bold text-[#333]">
                작성된 각 항목의 판단근거 및 종합의견을 토대로 11. 총평을 작성하십시오.
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {[
                      '1. 영양상태',
                      '2. 구강상태',
                      '3. 질병상태',
                      '4. 신체상태',
                      '5. 인지상태',
                      '6. 의사소통',
                      '7. 가족 및 환경상태',
                      '8. 자원이용 욕구',
                      '9. 재활상태',
                      '10. 주관적 욕구',
                    ].map((item, idx) => (
                      <tr key={idx}>
                        <td
                          className="border border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center text-[12px] font-bold text-[#333]"
                          style={{ width: '150px' }}
                        >
                          {item}
                        </td>
                        <td className="border border-[#B8D1E0] p-2"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-4 text-center text-gray-500">Comming Soon...</div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-[95vh] w-full max-w-[1600px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-3">
              <h2 className="text-[18px] font-black text-[#333]">욕구사정 평가</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                <i className="ri-close-line text-2xl font-bold"></i>
              </button>
            </div>

            {/* Top Toolbar */}
            <div className="flex items-center gap-4 border-b border-gray-200 bg-white px-5 py-3 text-[12px]">
              <div className="flex items-center gap-2">
                <span className="font-bold">수급자명</span>
                <span className="min-w-[60px] border bg-gray-50 px-2 py-0.5 text-center">
                  {resident?.name || '20원'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">조사사유</span>
                <label className="flex items-center gap-1">
                  <input type="radio" checked className="text-orange-500" /> 신규
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" /> 재사정
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" /> 상태변화
                </label>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  작성일<span className="text-red-500">*</span>
                </span>
                <input type="text" value={date} className="w-[90px] border px-2 py-0.5 text-center" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  작성자<span className="text-red-500">*</span>
                </span>
                <div className="flex">
                  <input type="text" value={author} className="w-[60px] border border-r-0 px-2 py-0.5 text-center" />
                  <button className="bg-[#5F7183] px-2 text-[11px] text-white">선택</button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Sidebar (Tabs) */}
              <div className="flex w-[160px] flex-col gap-1 bg-[#2C3E50] p-2 text-white">
                <div className="mb-2 rounded border border-[#F0E68C] bg-[#FFF8DC] p-2 text-[11px] text-[#333]">
                  <span className="font-bold text-red-500">* 필수</span> <br />
                  <span className="text-green-600">☑ 작성</span>, <span className="text-gray-500">☐ 미작성</span>
                </div>
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={clsx(
                      'flex items-center gap-2 rounded px-3 py-3 text-left text-[12px] transition-colors',
                      activeTabId === tab.id
                        ? 'bg-[#3498DB] font-bold text-white shadow-md'
                        : 'text-gray-300 hover:bg-[#34495E]',
                    )}
                  >
                    <span className="font-bold text-red-400">*</span>
                    <i className="ri-checkbox-blank-line text-gray-400"></i>
                    <span className="whitespace-pre-line">{tab.label}</span>
                  </button>
                ))}

                <div className="mt-auto rounded bg-[#425568] p-3 text-center text-[12px] leading-tight text-gray-300">
                  욕구사정 항목
                  <br />
                  프로그램 연결
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex flex-1 flex-col overflow-hidden bg-white">
                <div className="flex-1 overflow-auto bg-[#F5F5F5] p-4">
                  {/* Render Active Tab Content */}
                  <div className="h-full border border-gray-200 bg-white p-4 shadow-sm">{renderTabContent()}</div>
                </div>
              </div>

              {/* Action Sidebar */}
              <div className="flex w-[120px] flex-col gap-2 border-l border-gray-200 bg-white p-3 pt-5">
                <button className="w-full rounded border border-gray-300 bg-white py-2 text-[12px] font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                  전체
                  <br />
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
