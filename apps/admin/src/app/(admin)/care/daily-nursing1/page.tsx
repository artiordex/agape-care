/**
 * Description : page.tsx - ?? care/daily-nursing1 ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

/**
 * [Page] 수급자 간호 기록 (DailyNursing)
 * 바이탈 체크, 혈당 측정, 투약 여부 등 일일 간호 처치 기록 관리
 */
export default function DailyNursingPage() {
  const [selectedResidentId, setSelectedResidentId] = useState<number>(8);
  const [activeTab, setActiveTab] = useState<string>('nursing-log');

  // Mock Data: Resident List
  const residents = [
    {
      id: 8,
      status: '입소중',
      name: '가나당',
      room: '다용실2',
      indicators: { log: true, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 9,
      status: '입소중',
      name: '강계희',
      room: '소망',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 10,
      status: '입소중',
      name: '강으뜸',
      room: '특실',
      indicators: { log: true, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 11,
      status: '입소중',
      name: '강춘애',
      room: '계양새...',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 12,
      status: '입소중',
      name: '고길동',
      room: '초록',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 13,
      status: '입소중',
      name: '고수레',
      room: '무지개',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 14,
      status: '입소중',
      name: '구시민',
      room: '노랑나...',
      indicators: { log: true, med: false, bed: true, tube: false, exc: false },
    },
    {
      id: 15,
      status: '입소중',
      name: '김급',
      room: '맹꽁이...',
      indicators: { log: true, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 16,
      status: '입소중',
      name: '김길동',
      room: '예쁜이방',
      indicators: { log: true, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 17,
      status: '입소중',
      name: '김꽃님',
      room: '장미 1호',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 18,
      status: '입소중',
      name: '김나나',
      room: '2호실',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 19,
      status: '입소중',
      name: '김나영',
      room: '101-1',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 20,
      status: '입소중',
      name: '김다라',
      room: '샤랄라',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 21,
      status: '입소중',
      name: '김로이',
      room: '신규신규',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 22,
      status: '입소중',
      name: '김말복',
      room: '하하호호',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 23,
      status: '입소중',
      name: '김명자',
      room: '행복',
      indicators: { log: false, med: true, bed: false, tube: false, exc: false },
    },
    {
      id: 24,
      status: '입소중',
      name: '김사랑',
      room: '홍길동2...',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
    {
      id: 25,
      status: '입소중',
      name: '김성찬',
      room: '룰라라',
      indicators: { log: false, med: false, bed: false, tube: false, exc: false },
    },
  ];

  // Mock Data: Selected Resident Detail
  const selectedResident = {
    name: '가나당',
    gender: '여',
    age: 96,
    dob: '1930.01.05',
    grade: '3등급 (12%)',
    admissionDate: '2026.01.23',
    disease: '치매',
  };

  // Mock Data: Nursing Log History
  const logHistory = [
    {
      id: 2,
      date: '2026.02.08',
      bp: '142 / 65',
      pulse: 87,
      temp: 36.5,
      resp: '-',
      bs: '-',
      weight: '-',
      health: '-',
      care: '-',
      note: '-',
      writer: '개드립...',
      canDelete: true,
    },
    {
      id: 1,
      date: '2026.02.03',
      bp: '-',
      pulse: '-',
      temp: '-',
      resp: '-',
      bs: '-',
      weight: '-',
      health: '-',
      care: '-',
      note: '협력의 진료-서강의원',
      writer: '양안순',
      canDelete: true,
    },
  ];

  const tabs = [
    { id: 'nursing-log', label: '1.간호일지' },
    { id: 'medication', label: '2.투약관리' },
    { id: 'bedsore', label: '3.욕창간호' },
    { id: 'tube', label: '4.비위관관리' },
    { id: 'urinary', label: '5.도뇨관관리' },
    { id: 'excretion', label: '6.배설관리' },
    { id: 'medical-record', label: '7.진료기록' },
    { id: 'nursing-care', label: '8.간호처치' },
    { id: 'documents', label: '9.간호서류관리' },
  ];

  // Common Styles
  const sideThClass = 'bg-[#E0ECF7] text-[11px] font-bold text-[#333] border border-[#B0C4DE] py-1 text-center';
  const sideTdClass =
    'bg-white text-[11px] text-[#333] border border-[#B0C4DE] py-1 text-center cursor-pointer hover:bg-blue-50';
  const sectionHeaderClass = 'text-[13px] font-bold text-[#2E6A9E] mb-1 flex items-center gap-1';
  const infoThClass =
    'bg-[#E0ECF7] text-[12px] font-bold text-[#333] border border-[#B0C4DE] text-center w-[80px] py-1';
  const infoTdClass = 'bg-white text-[12px] text-[#333] border border-[#B0C4DE] px-2 py-1';

  return (
    <div className="flex h-screen bg-white font-sans text-[#333]">
      {/* 1. Left Sidebar: Resident List */}
      <aside className="flex w-[320px] flex-col border-r border-[#B0C4DE] bg-[#F8FAFC]">
        {/* Date Navigator */}
        <div className="flex items-center justify-between border-b border-[#B0C4DE] bg-[#91B5D0] p-2 text-white">
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#7A9CB5] hover:bg-[#6A8CA5]">
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold">2026년 02월 18일(수)</span>
            <i className="ri-calendar-line"></i>
          </div>
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#7A9CB5] hover:bg-[#6A8CA5]">
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-1 border-b border-[#B0C4DE] bg-[#E0ECF7] p-1">
          {['현황선택', '생활실선택', '이름', '주요질환'].map(label => (
            <button
              key={label}
              className={clsx(
                'rounded border border-[#A0B4CE] bg-white py-1 text-[11px] font-bold text-[#555] shadow-sm',
                label === '이름' && 'text-gray-400',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Resident Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className={clsx(sideThClass, 'w-[40px]')}>연번</th>
                <th className={clsx(sideThClass, 'w-[50px]')}>현황</th>
                <th className={clsx(sideThClass, 'w-[60px]')}>수급자명</th>
                <th className={clsx(sideThClass, 'w-[60px]')}>생활실</th>
                <th className={clsx(sideThClass, 'w-[20px]')}>
                  일<br />지
                </th>
                <th className={clsx(sideThClass, 'w-[20px]')}>
                  투<br />약
                </th>
                <th className={clsx(sideThClass, 'w-[20px]')}>
                  욕<br />창
                </th>
                <th className={clsx(sideThClass, 'w-[20px]')}>
                  비<br />위
                </th>
                <th className={clsx(sideThClass, 'w-[20px]')}>
                  배<br />설
                </th>
              </tr>
            </thead>
            <tbody>
              {residents.map(res => (
                <tr
                  key={res.id}
                  onClick={() => setSelectedResidentId(res.id)}
                  className={selectedResidentId === res.id ? 'bg-[#FFF9C4]' : ''}
                >
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.id}</td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.status}</td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4] font-bold')}>
                    {res.name}
                  </td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.room}</td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>
                    {res.indicators.log && <span className="inline-block h-2 w-2 rounded-full bg-[#333]"></span>}
                  </td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>
                    {res.indicators.med && <span className="inline-block h-2 w-2 rounded-full bg-[#333]"></span>}
                  </td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>
                    {res.indicators.bed && <span className="inline-block h-2 w-2 rounded-full bg-[#333]"></span>}
                  </td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>
                    {res.indicators.tube && <span className="inline-block h-2 w-2 rounded-full bg-[#333]"></span>}
                  </td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>
                    {res.indicators.exc && <span className="inline-block h-2 w-2 rounded-full bg-[#333]"></span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between border-t border-[#B0C4DE] bg-[#F1F5F9] px-2 py-1.5 text-[11px] font-bold text-[#333]">
          <div className="flex gap-2">
            <span className="text-blue-600">▶ 전체:140명</span>
            <span className="text-gray-600">▶ 남자:59명</span>
            <span className="text-gray-600">▶ 여자:81명</span>
          </div>
          <div className="flex flex-col text-right text-[9px]">
            <div className="flex items-center justify-end gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>: 작성대상{' '}
              <i className="ri-question-fill text-gray-400"></i>
            </div>
            <div className="flex items-center justify-end gap-1">
              <i className="ri-check-line text-blue-600"></i>: 작성완료
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Right Content */}
      <main className="flex flex-1 flex-col overflow-y-auto p-4">
        {/* Top Info Layout */}
        <div className="mb-4 flex items-start gap-4">
          {/* Resident Info Box */}
          <div className="flex-1">
            <div className={sectionHeaderClass}>
              <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 수급자 기본정보
            </div>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <th className={infoThClass}>수급자명</th>
                  <td className={infoTdClass}>{selectedResident.name}</td>
                  <th className={infoThClass}>성별</th>
                  <td className={infoTdClass}>
                    {selectedResident.gender} ({selectedResident.age}세)
                  </td>
                  <th className={infoThClass}>생년월일</th>
                  <td className={infoTdClass}>{selectedResident.dob}</td>
                </tr>
                <tr>
                  <th className={infoThClass}>등급/부담률</th>
                  <td className={infoTdClass}>{selectedResident.grade}</td>
                  <th className={infoThClass}>입소일</th>
                  <td className={infoTdClass} colSpan={3}>
                    {selectedResident.admissionDate}
                  </td>
                </tr>
                <tr>
                  <th className={infoThClass}>주요질환</th>
                  <td className={infoTdClass} colSpan={5}>
                    {selectedResident.disease}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Needs Assessment Box (Simplified) */}
          <div className="w-[180px]">
            <div className={sectionHeaderClass}>
              <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 욕구사정
            </div>
            <table className="w-full border-collapse">
              <tbody>
                {[{ label: '상태', hasIcon: true }, { label: '배설' }, { label: '질병상태' }].map((item, i) => (
                  <tr key={i}>
                    <th className={infoThClass} style={{ width: '60px' }}>
                      {item.label} {item.hasIcon && <i className="ri-question-fill text-gray-500"></i>}
                    </th>
                    <td className={infoTdClass}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-[1px]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'px-4 py-1.5 text-[13px] font-bold text-white transition-colors',
                activeTab === tab.id ? 'bg-[#5B9BD5]' : 'bg-[#7CA9C9] hover:bg-[#6A95B3]',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vital Signs Record */}
        <div className="mb-4 rounded border border-[#B0C4DE] bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className={sectionHeaderClass}>
              <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 바이탈 기록
            </div>
            <div className="flex gap-1">
              <button className="rounded bg-[#99AAB9] px-2 py-0.5 text-[10px] text-white shadow-sm">
                혈압,맥박,체온&건강관리기록 전일자료 조회
              </button>
              <button className="rounded bg-[#99AAB9] px-2 py-0.5 text-[10px] text-white shadow-sm">
                최근 바이탈 현황 조회
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <div className="flex items-center border border-[#B0C4DE] bg-[#F1F5F9] px-2 py-1">
              <span className="mr-2 font-bold">회차</span>
              <span className="mr-2">시간(필수시)</span>
              <span className="mr-1 font-bold text-[#E96D71]">
                혈압<span>(mm/Hg)</span>
              </span>
              <span className="mr-1 font-bold text-[#333]">
                맥박<span>(회/분)</span>
              </span>
              <span className="mr-1 font-bold text-[#333]">
                체온<span>(℃)</span>
              </span>
              <span className="mr-1 font-bold text-[#333]">
                호흡<span>(회/분)</span>
              </span>
              <span className="mr-1 font-bold text-[#333]">
                혈당<span>(mg/dL)</span>
              </span>
              <span className="mr-1 font-bold text-[#333]">
                체중<span>(kg)</span>
              </span>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[12px]">
            <div className="flex w-full items-center gap-2 border-b border-[#ddd] bg-[#EBF5FF] p-1 px-2">
              <span className="w-8 font-bold">1회</span>
              <input type="time" className="w-20 border border-[#B0C4DE] px-1" />
              <div className="flex items-center gap-0.5">
                <input type="text" className="w-12 border border-[#B0C4DE] text-center" />{' '}
                <span className="text-gray-400">/</span>{' '}
                <input type="text" className="w-12 border border-[#B0C4DE] text-center" />
              </div>
              <input type="text" className="w-12 border border-[#B0C4DE] text-center" />
              <input type="text" className="w-12 border border-[#B0C4DE] text-center" />
              <input type="text" className="w-12 border border-[#B0C4DE] text-center" />
              <input type="text" className="w-12 border border-[#B0C4DE] text-center" />
              <input type="text" className="w-12 border border-[#B0C4DE] text-center" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button className="rounded bg-[#7F9EB5] px-2 py-0.5 text-[11px] text-white shadow-sm">회차추가</button>
            <span className="text-[11px] text-gray-400">※ 회차추가는 최대 3회까지만 됩니다.</span>
          </div>
        </div>

        {/* Health Management Record */}
        <div className="mb-4 rounded border border-[#B0C4DE] bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className={sectionHeaderClass}>
              <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 건강관리기록 (필요시 계약의사에게 제공)
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 border border-[#B0C4DE] bg-[#F9FCFF] p-2 text-[12px]">
            {/* Row 1 */}
            <div className="col-span-1 border border-[#B0C4DE] bg-[#E0ECF7] py-1 text-center font-bold">문제</div>
            <div className="col-span-1 flex items-center gap-2 border border-[#B0C4DE] bg-white px-2">
              <label className="flex items-center gap-1">
                <input type="radio" name="prob" /> 유
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="prob" defaultChecked className="accent-[#F06C00]" />{' '}
                <span className="font-bold text-[#F06C00]">무</span>
              </label>
            </div>
            <div className="col-span-1 border border-[#B0C4DE] bg-[#E0ECF7] py-1 text-center font-bold">낙상</div>
            <div className="col-span-1 flex items-center gap-2 border border-[#B0C4DE] bg-white px-2">
              <label className="flex items-center gap-1">
                <input type="radio" name="fall" /> 유
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="fall" defaultChecked className="accent-[#F06C00]" />{' '}
                <span className="font-bold text-[#F06C00]">무</span>
              </label>
            </div>
            <div className="col-span-1 border border-[#B0C4DE] bg-[#E0ECF7] py-1 text-center font-bold">실금</div>
            <div className="col-span-1 flex items-center gap-2 border border-[#B0C4DE] bg-white px-2">
              <label className="flex items-center gap-1">
                <input type="radio" name="inc" /> 유
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="inc" defaultChecked className="accent-[#F06C00]" />{' '}
                <span className="font-bold text-[#F06C00]">무</span>
              </label>
            </div>
            {/* Row 2 */}
            <div className="col-span-1 border border-[#B0C4DE] bg-[#E0ECF7] py-1 text-center font-bold">탈수</div>
            <div className="col-span-1 flex items-center gap-2 border border-[#B0C4DE] bg-white px-2">
              <label className="flex items-center gap-1">
                <input type="radio" name="deh" /> 의심
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="deh" defaultChecked className="accent-[#F06C00]" />{' '}
                <span className="font-bold text-[#F06C00]">없음</span>
              </label>
            </div>
            <div className="col-span-1 border border-[#B0C4DE] bg-[#E0ECF7] py-1 text-center font-bold">욕창</div>
            <div className="col-span-2 flex items-center gap-2 border border-[#B0C4DE] bg-white px-2">
              <label className="flex items-center gap-1">
                <input type="radio" name="bed" /> 유
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="bed" defaultChecked className="accent-[#F06C00]" />{' '}
                <span className="font-bold text-[#F06C00]">무</span>
              </label>
              <span className="text-[11px] text-gray-400">
                ( 부위: <input type="text" className="w-16 border-b border-gray-300 outline-none" /> )
              </span>
            </div>
            <div className="col-span-1"></div> {/* Spacer to match layout */}
            {/* Row 3 */}
            <div className="col-span-1 border border-[#B0C4DE] bg-[#E0ECF7] py-1 text-center font-bold">섬망</div>
            <div className="col-span-1 flex items-center gap-2 border border-[#B0C4DE] bg-white px-2">
              <label className="flex items-center gap-1">
                <input type="radio" name="del" /> 의심
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="del" defaultChecked className="accent-[#F06C00]" />{' '}
                <span className="font-bold text-[#F06C00]">없음</span>
              </label>
            </div>
            <div className="col-span-1 border border-[#B0C4DE] bg-[#E0ECF7] py-1 text-center font-bold">통증</div>
            <div className="col-span-2 flex items-center gap-2 border border-[#B0C4DE] bg-white px-2">
              <label className="flex items-center gap-1">
                <input type="radio" name="pain" /> 강
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="pain" /> 중
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="pain" /> 약
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="pain" defaultChecked className="accent-[#F06C00]" />{' '}
                <span className="font-bold text-[#F06C00]">없음</span>
              </label>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>

        {/* Nursing Log Form */}
        <div className="mb-4 rounded border border-[#B0C4DE] bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className={sectionHeaderClass}>
              <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 간호일지
            </div>
            <div className="flex gap-1">
              <button className="rounded bg-[#99AAB9] px-2 py-0.5 text-[10px] text-white shadow-sm">
                전일 자료 조회
              </button>
              <button className="rounded bg-[#99AAB9] px-2 py-0.5 text-[10px] text-white shadow-sm">
                최근 식사 현황 조회
              </button>
            </div>
          </div>
          <div className="flex border-t border-[#B0C4DE]">
            {/* Left Form */}
            <div className="flex-1 border-r border-[#B0C4DE]">
              <div className="flex items-center border-b border-[#B0C4DE]">
                <div className="w-[100px] bg-[#E0ECF7] py-2 text-center text-[12px] font-bold text-[#333]">
                  건강관리 <i className="ri-question-fill text-gray-500"></i>
                </div>
                <div className="flex-1 bg-[#F9FAFB] p-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <input type="text" className="flex-1 border border-[#ccc] px-1 text-[12px]" disabled />
                    <span className="text-[11px] text-gray-500">
                      (급여계획 <input type="text" className="w-8 border-b text-center" /> 분)
                    </span>
                    <i className="ri-file-text-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="flex items-center border-b border-[#B0C4DE]">
                <div className="w-[100px] bg-[#E0ECF7] py-2 text-center text-[12px] font-bold text-[#333]">
                  간호관리 <i className="ri-question-fill text-gray-500"></i>
                </div>
                <div className="flex-1 bg-[#F9FAFB] p-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <input type="text" className="flex-1 border border-[#ccc] px-1 text-[12px]" disabled />
                    <span className="text-[11px] text-gray-500">
                      (급여계획 <input type="text" className="w-8 border-b text-center" /> 분)
                    </span>
                    <i className="ri-file-text-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="flex h-[100px]">
                <div className="flex w-[100px] flex-col items-center justify-center bg-[#E0ECF7] py-2 text-center text-[12px] font-bold text-[#333]">
                  <span>특이사항</span>
                  <button className="mt-1 rounded bg-[#577083] px-2 py-0.5 text-[10px] text-white">
                    특이사항 불러오기
                  </button>
                </div>
                <div className="relative flex-1 p-2">
                  <textarea
                    className="h-full w-full resize-none border border-[#ccc] p-1 text-[12px]"
                    placeholder="(급여기록지 특이사항)&#13;&#10;※ 50자 초과시 별지첨부"
                  ></textarea>
                  <div className="absolute bottom-2 right-4 text-[11px] text-gray-400">
                    0자 작성 (한글:1자, 숫자,영문:0.5자)
                  </div>
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="flex w-[300px] flex-col">
              <div className="flex h-[40px] items-center border-b border-[#B0C4DE]">
                <div className="flex h-full w-[80px] items-center justify-center bg-[#E0ECF7] text-[12px] font-bold text-[#333]">
                  작성자 <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-1 items-center gap-1 px-2">
                  <input
                    type="text"
                    value="개드립진짜"
                    className="w-24 border border-[#ccc] px-1 text-[12px]"
                    readOnly
                  />
                  <button className="rounded bg-[#7F9EB5] px-2 py-0.5 text-[10px] text-white">선택</button>
                </div>
              </div>
              <div className="flex flex-1">
                <div className="flex w-[80px] items-center justify-center bg-[#E0ECF7] text-[12px] font-bold text-[#333]">
                  내용 상세
                </div>
                <div className="flex-1 bg-white p-2 text-[11px] text-gray-400">
                  (내부관리용)
                  <br />
                  ※급여기록지에
                  <br />
                  표기되지 않으며,
                  <br />
                  필요시만 작성
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            <button className="rounded bg-[#2E6A9E] px-6 py-2 text-[13px] font-bold text-white shadow-md">저장</button>
            <button className="rounded bg-[#7F9EB5] px-4 py-2 text-[13px] font-bold text-white shadow-md">
              건강관리 기록지 출력
            </button>
            <button className="rounded bg-[#7F9EB5] px-4 py-2 text-[13px] font-bold text-white shadow-md">
              간호 기록지(월별) 출력
            </button>
          </div>
        </div>

        {/* Log History */}
        <div className="flex-1 rounded border border-[#B0C4DE] bg-white p-3 shadow-sm">
          <div className={sectionHeaderClass}>
            <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 간호일지 내역
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={clsx(sideThClass, 'w-[40px]')}>연번</th>
                <th className={clsx(sideThClass, 'w-[80px]')}>작성일</th>
                <th className={clsx(sideThClass, 'w-[70px]')}>혈압</th>
                <th className={clsx(sideThClass, 'w-[40px]')}>맥박</th>
                <th className={clsx(sideThClass, 'w-[40px]')}>체온</th>
                <th className={clsx(sideThClass, 'w-[40px]')}>호흡</th>
                <th className={clsx(sideThClass, 'w-[40px]')}>혈당</th>
                <th className={clsx(sideThClass, 'w-[40px]')}>체중</th>
                <th className={clsx(sideThClass, 'w-[50px]')}>건강(분)</th>
                <th className={clsx(sideThClass, 'w-[50px]')}>간호(분)</th>
                <th className={sideThClass}>간호일지 특이사항</th>
                <th className={clsx(sideThClass, 'w-[60px]')}>담당자</th>
                <th className={clsx(sideThClass, 'w-[50px]')}>삭제</th>
              </tr>
            </thead>
            <tbody>
              {logHistory.map(log => (
                <tr key={log.id}>
                  <td className={sideTdClass}>{log.id}</td>
                  <td className={sideTdClass}>{log.date}</td>
                  <td className={sideTdClass}>{log.bp}</td>
                  <td className={sideTdClass}>{log.pulse}</td>
                  <td className={sideTdClass}>{log.temp}</td>
                  <td className={sideTdClass}>{log.resp}</td>
                  <td className={sideTdClass}>{log.bs}</td>
                  <td className={sideTdClass}>{log.weight}</td>
                  <td className={sideTdClass}>{log.health}</td>
                  <td className={sideTdClass}>{log.care}</td>
                  <td className={clsx(sideTdClass, 'px-2 text-left')}>{log.note}</td>
                  <td className={sideTdClass}>{log.writer}</td>
                  <td className={sideTdClass}>
                    <button className="rounded bg-[#E96D71] px-2 py-0.5 text-[10px] text-white">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
