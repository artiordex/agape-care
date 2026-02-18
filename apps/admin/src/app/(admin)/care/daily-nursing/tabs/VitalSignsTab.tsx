/**
 * Description : VitalSignsTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

interface VitalRecord {
  time: string;
  bloodPressure: { systolic: string; diastolic: string };
  pulse: string;
  temperature: string;
  respiration: string;
  weight: string;
  bloodSugar: string;
}

interface Props {
  readonly record: any; // Using any to be flexible with parent props for now
  readonly onChange: (record: any) => void;
}

/**
 * [Tab Content] 1. 간호일지 및 활력징후 기록 서식
 * - 바이탈 기록 + 건강관리기록 + 간호일지 통합 UI
 */
export default function VitalSignsTab({ record: initialRecord, onChange }: Props) {
  // Local state for UI fields not yet in parent
  const [healthCheck, setHealthCheck] = useState({
    problem: 'no',
    fall: 'no',
    incontinence: 'no',
    dehydration: 'none',
    bedsore: 'no',
    bedsoreLoc: '',
    delirium: 'none',
    pain: 'none',
  });

  const [nursingLog, setNursingLog] = useState({
    healthManage: false,
    healthTime: '',
    careManage: false,
    careTime: '',
    content: '',
    writer: '김간호',
    detailContent: '',
  });

  // Styles
  const sectionTitleClass = 'text-[13px] font-bold text-[#2E6A9E] mb-1 flex items-center gap-1';
  const tableHeaderClass = 'bg-[#E8F1F8] border border-[#B8D1E0] text-[12px] font-bold text-[#333] text-center py-1.5';
  const tableCellClass = 'bg-white border border-[#B8D1E0] p-1 text-center';
  const inputClass =
    'w-full border border-gray-300 px-2 py-1 text-[12px] text-center focus:border-blue-500 outline-none';
  const radioLabelClass = 'flex items-center gap-1 text-[12px] text-gray-700 cursor-pointer';

  return (
    <div className="flex flex-col gap-4 font-sans text-[#333] antialiased">
      {/* TOP SECTION: Vital Signs & Health Management */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left: 바이탈 기록 */}
        <div className="flex-1">
          <div className="mb-1 flex items-end justify-between">
            <div className={sectionTitleClass}>
              <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 바이탈 기록
            </div>
            <div className="flex gap-1">
              <button className="rounded bg-[#8FA1B0] px-2 py-0.5 text-[11px] text-white hover:bg-[#7A8B9A]">
                혈압,맥박,체온&건강관리기록전일자료조회
              </button>
              <button className="rounded bg-[#8FA1B0] px-2 py-0.5 text-[11px] text-white hover:bg-[#7A8B9A]">
                최근바이탈현황조회
              </button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={tableHeaderClass} style={{ width: '50px' }}>
                  회차
                </th>
                <th className={tableHeaderClass}>시간(필요시)</th>
                <th className={tableHeaderClass}>혈압(mmHg)</th>
                <th className={tableHeaderClass}>맥박(회/분)</th>
                <th className={tableHeaderClass}>체온(℃)</th>
                <th className={tableHeaderClass}>호흡(회/분)</th>
                <th className={tableHeaderClass}>혈당(mg/dL)</th>
                <th className={tableHeaderClass}>체중(kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tableCellClass}>1회</td>
                <td className={tableCellClass}>
                  <div className="flex items-center justify-center gap-1">
                    <input type="text" className="w-8 border border-gray-300 py-0.5 text-center text-[12px]" /> :
                    <input type="text" className="w-8 border border-gray-300 py-0.5 text-center text-[12px]" />
                  </div>
                </td>
                <td className={tableCellClass}>
                  <div className="flex items-center justify-center gap-1">
                    <input type="text" className="w-10 border border-black py-0.5 text-center text-[12px] font-bold" />{' '}
                    /
                    <input type="text" className="w-10 border border-gray-300 py-0.5 text-center text-[12px]" />
                  </div>
                </td>
                <td className={tableCellClass}>
                  <input type="text" className={inputClass} />
                </td>
                <td className={tableCellClass}>
                  <input type="text" className={inputClass} />
                </td>
                <td className={tableCellClass}>
                  <input type="text" className={inputClass} />
                </td>
                <td className={tableCellClass}>
                  <input type="text" className={inputClass} />
                </td>
                <td className={tableCellClass}>
                  <input type="text" className={inputClass} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-1 flex items-center gap-2">
            <button className="rounded bg-[#7A8B9A] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#687a8a]">
              회차추가
            </button>
            <span className="text-[11px] text-gray-500">※ 회차추가는 최대 3회까지만 됩니다.</span>
          </div>
        </div>

        {/* Right: 건강관리기록 */}
        <div className="flex-1 lg:max-w-[500px]">
          <div className={sectionTitleClass}>
            <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 건강관리기록 (필요시 계약의사에게 제공)
          </div>

          <table className="w-full border-collapse">
            <tbody>
              {/* Row 1 */}
              <tr>
                <th className={`${tableHeaderClass} w-[60px]`}>문제</th>
                <td className={tableCellClass}>
                  <div className="flex justify-center gap-3">
                    <RadioGroup
                      name="problem"
                      options={['유', '무']}
                      value={healthCheck.problem}
                      onChange={(v: string) => setHealthCheck({ ...healthCheck, problem: v })}
                    />
                  </div>
                </td>
                <th className={`${tableHeaderClass} w-[60px]`}>낙상</th>
                <td className={tableCellClass}>
                  <div className="flex justify-center gap-3">
                    <RadioGroup
                      name="fall"
                      options={['유', '무']}
                      value={healthCheck.fall}
                      onChange={(v: string) => setHealthCheck({ ...healthCheck, fall: v })}
                      highlight="무"
                    />
                  </div>
                </td>
                <th className={`${tableHeaderClass} w-[60px]`}>실금</th>
                <td className={tableCellClass}>
                  <div className="flex justify-center gap-3">
                    <RadioGroup
                      name="incontinence"
                      options={['유', '무']}
                      value={healthCheck.incontinence}
                      onChange={(v: string) => setHealthCheck({ ...healthCheck, incontinence: v })}
                      highlight="무"
                    />
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr>
                <th className={tableHeaderClass}>탈수</th>
                <td className={tableCellClass}>
                  <div className="flex justify-center gap-3">
                    <RadioGroup
                      name="dehydration"
                      options={['참고', '없음']}
                      labels={['의심', '없음']}
                      value={healthCheck.dehydration}
                      onChange={(v: string) => setHealthCheck({ ...healthCheck, dehydration: v })}
                      highlight="참고"
                    />
                  </div>
                </td>
                <th className={tableHeaderClass}>욕창</th>
                <td className={tableCellClass} colSpan={3}>
                  <div className="flex items-center gap-3">
                    <RadioGroup
                      name="bedsore"
                      options={['유', '무']}
                      value={healthCheck.bedsore}
                      onChange={(v: string) => setHealthCheck({ ...healthCheck, bedsore: v })}
                      highlight="무"
                    />
                    <span className="text-[12px]">
                      ( 부위: <input type="text" className="w-24 border border-gray-300 px-1 py-0.5" /> )
                    </span>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <th className={tableHeaderClass}>섬망</th>
                <td className={tableCellClass}>
                  <div className="flex justify-center gap-3">
                    <RadioGroup
                      name="delirium"
                      options={['참고', '없음']}
                      labels={['의심', '없음']}
                      value={healthCheck.delirium}
                      onChange={(v: string) => setHealthCheck({ ...healthCheck, delirium: v })}
                      highlight="참고"
                    />
                  </div>
                </td>
                <th className={tableHeaderClass}>통증</th>
                <td className={tableCellClass} colSpan={3}>
                  <div className="flex justify-start gap-3 px-2">
                    <RadioGroup
                      name="pain"
                      options={['강', '중', '약', '없음']}
                      value={healthCheck.pain}
                      onChange={(v: string) => setHealthCheck({ ...healthCheck, pain: v })}
                      highlight="없음"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MIDDLE SECTION: Nursing Log */}
      <div>
        <div className="mb-1 flex items-end justify-between">
          <div className={sectionTitleClass}>
            <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 간호일지
          </div>
          <div className="flex gap-1">
            <button className="rounded bg-[#8FA1B0] px-2 py-0.5 text-[11px] text-white hover:bg-[#7A8B9A]">
              전일 자료 조회
            </button>
            <button className="rounded bg-[#8FA1B0] px-2 py-0.5 text-[11px] text-white hover:bg-[#7A8B9A]">
              최근 식사 현황 조회
            </button>
          </div>
        </div>

        <table className="w-full border-collapse border border-[#B8D1E0]">
          <tbody>
            <tr>
              {/* Left Column: 특이사항 */}
              <td className="w-[120px] border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center align-middle">
                <div className="mb-2 flex items-center justify-center gap-1 text-[12px] font-bold">
                  건강관리 <i className="ri-question-fill text-gray-500"></i>
                </div>
                <div className="mb-2 text-[13px] font-bold">특이사항</div>
                <button className="rounded bg-[#6C757D] px-2 py-1 text-[11px] text-white hover:bg-[#5a6268]">
                  특이사항 불러오기
                </button>
              </td>
              <td className="border-r border-[#B8D1E0] p-0 align-top">
                {/* Top Controls */}
                <div className="flex items-center gap-4 border-b border-[#B8D1E0] bg-white px-3 py-2">
                  <div className="flex items-center gap-1 text-[12px]">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="font-bold">(급여계획</span>
                    <input type="text" className="w-10 border border-gray-300 text-center" />
                    <span className="font-bold">분)</span>
                    <i className="ri-file-search-line cursor-pointer text-gray-500"></i>
                  </div>
                  <div className="h-4 w-[1px] bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-[12px]">
                    <span className="font-bold">간호관리</span>
                    <i className="ri-question-fill text-gray-500"></i>
                    <input type="checkbox" className="ml-1 h-4 w-4" />
                    <span className="font-bold">(급여계획</span>
                    <input type="text" className="w-10 border border-gray-300 text-center" />
                    <span className="font-bold">분)</span>
                    <i className="ri-file-search-line cursor-pointer text-gray-500"></i>
                  </div>
                </div>
                {/* Textarea */}
                <div className="relative p-2">
                  <textarea
                    className="h-[100px] w-full resize-none border border-gray-300 p-2 text-[12px] outline-none focus:border-blue-500"
                    placeholder="(급여기록지 특이사항)&#13;&#10;※ 50자 초과시 별지첨부"
                  ></textarea>
                  <div className="mt-1 text-right text-[11px] text-gray-500">0자 작성(한글:1자, 숫자,영문:0.5자)</div>
                </div>
              </td>

              {/* Right Column: 내용 상세 */}
              <td className="w-[100px] border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center text-[12px] font-bold">
                작성자<span className="text-red-500">*</span>
              </td>
              <td className="w-[300px] p-0 align-top">
                <div className="flex gap-1 border-b border-[#B8D1E0] p-1">
                  <input
                    type="text"
                    value={nursingLog.writer}
                    className="flex-1 border border-gray-300 px-2 py-1 text-[12px]"
                    readOnly
                  />
                  <button className="rounded bg-[#5C7C95] px-2 text-[11px] text-white">선택</button>
                </div>
                <div className="flex h-full items-stretch">
                  <div className="flex w-[80px] items-center justify-center border-r border-[#B8D1E0] bg-white text-[12px] font-bold text-gray-600">
                    내용 상세
                  </div>
                  <textarea
                    className="h-[100px] flex-1 resize-none border-none bg-[#F9F9F9] p-2 text-[12px] outline-none"
                    placeholder="(내부관리용)&#13;&#10;※급여기록지에&#13;&#10;표기되지 않으며,&#13;&#10;필요시만 작성"
                  ></textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 my-6 flex justify-center gap-2 pb-4">
        <button className="rounded bg-[#5C8D5A] px-8 py-2 text-[13px] font-bold text-white shadow hover:bg-[#4a7548]">
          저장
        </button>
        <button className="rounded border border-[#5C8D5A] bg-white px-4 py-2 text-[13px] font-bold text-[#5C8D5A] shadow hover:bg-emerald-50">
          건강관리 기록지 출력
        </button>
        <button className="rounded border border-[#5C8D5A] bg-white px-4 py-2 text-[13px] font-bold text-[#5C8D5A] shadow hover:bg-emerald-50">
          간호 기록지(월별) 출력
        </button>
      </div>

      {/* BOTTOM SECTION: History Table */}
      <div className="mt-4">
        <div className={sectionTitleClass}>
          <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 간호일지 내역
        </div>
        <div className="custom-scrollbar h-[200px] overflow-y-auto border border-[#B8D1E0]">
          <table className="relative w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr>
                {['연번', '작성일', '혈압', '맥박', '체온', '호흡', '혈당', '체중', '건강(분)', '간호(분)'].map(h => (
                  <th
                    key={h}
                    className="whitespace-nowrap border-b border-r border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-medium text-[#333]"
                  >
                    {h}
                  </th>
                ))}
                <th className="w-[40%] border-b border-r border-[#B8D1E0] bg-[#E8F1F8] py-1 text-[12px] font-medium text-[#333]">
                  간호일지 특이사항
                </th>
                <th className="whitespace-nowrap border-b border-r border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-medium text-[#333]">
                  담당자
                </th>
                <th className="whitespace-nowrap border-b border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1 text-[12px] font-medium text-[#333]">
                  삭제
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {/* Mock Row 1 */}
              <tr className="hover:bg-blue-50">
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">2</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">2026.02.08</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">142 / 65</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">87</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">36.5</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] px-2 py-1.5 text-left text-[12px]"></td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">개드립...</td>
                <td className="border-b border-[#B8D1E0] py-1.5 text-center">
                  <button className="rounded bg-[#E74C3C] px-1.5 py-0.5 text-[10px] text-white">삭제</button>
                </td>
              </tr>
              {/* Mock Row 2 */}
              <tr className="hover:bg-blue-50">
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">1</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">2026.02.03</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px] text-gray-400">-</td>
                <td className="border-b border-r border-[#B8D1E0] px-2 py-1.5 text-left text-[12px]">
                  협력의 진료-서강의원
                </td>
                <td className="border-b border-r border-[#B8D1E0] py-1.5 text-center text-[12px]">양안순</td>
                <td className="border-b border-[#B8D1E0] py-1.5 text-center">
                  <button className="rounded bg-[#E74C3C] px-1.5 py-0.5 text-[10px] text-white">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Helper Radio Group */
function RadioGroup({ name, options, labels, value, onChange, highlight }: any) {
  return (
    <div className="flex items-center gap-3">
      {options.map((opt: string, idx: number) => {
        const label = labels ? labels[idx] : opt;
        const isSelected = value === opt;
        const isHighlight = highlight === opt; // Button style highlight if matches

        return (
          <label key={opt} className="flex cursor-pointer items-center gap-1">
            <div className="relative flex h-4 w-4 items-center justify-center">
              <input
                type="radio"
                name={name}
                checked={isSelected}
                onChange={() => onChange(opt)}
                className="peer h-4 w-4 appearance-none rounded-full border border-gray-300 checked:border-[#E67E22]"
              />
              <div className="absolute h-2 w-2 scale-0 rounded-full bg-[#E67E22] transition-transform peer-checked:scale-100"></div>
            </div>
            <span className={clsx('text-[12px]', isSelected ? 'font-bold text-black' : 'text-gray-600')}>{label}</span>
          </label>
        );
      })}
    </div>
  );
}
