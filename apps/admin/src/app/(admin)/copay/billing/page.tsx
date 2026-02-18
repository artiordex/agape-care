/**
 * Description : page.tsx - ?? copay/billing ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

// ================= Types =================
interface BillingRecord {
  id: number;
  date: string; // 연번 날짜 or 입소중/퇴소 상태
  status: '입소' | '퇴소' | '';
  name: string;
  grade: string;
  days: number;
  totalCost: string; // 급여비용 공단부담금
  copay: string; // 급여비용 본인부담금
  mealMaterial: string; // 식사 재료비
  tubeFeeding: string; // 경관 유동식
  snack: string; // 간식비
  privateRoom: string; // 상급 침실비
  haircut: string; // 이·미용비
  medicine: string; // 진료 약제비
  contractDoctor: string; // 계약의사 진료비
  other: string; // 기타비용
  gradeDiff: string; // 등급외 (비급여)
  totalUserCopay: string; // 부담금합계
  prepaid: string; // 선납 적용액
  currentTotal: string; // 당월 총액
  previousUnpaid: string; // 이전 미납액
  billingAmount: string; // 청구액 (청구발송일)
  deposit: string; // 청구입금액
  isProcessed: boolean; // 처리 상태 (청구서조회 버튼)
  selected: boolean;
}

// ================= Mock Data =================
const RECORDS: BillingRecord[] = [
  {
    id: 1,
    date: '1월3일',
    status: '',
    name: '성기철',
    grade: '2등급 일반(20%)',
    days: 29,
    totalCost: '1,968,560',
    copay: '492,130',
    mealMaterial: '18,000',
    tubeFeeding: '0',
    snack: '2,000',
    privateRoom: '0',
    haircut: '0',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '512,130',
    prepaid: '0',
    currentTotal: '512,130',
    previousUnpaid: '0',
    billingAmount: '512,130',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 2,
    date: '20원',
    status: '',
    name: '이춘희',
    grade: '2등급 감경(8%)',
    days: 31,
    totalCost: '2,462,420',
    copay: '214,120',
    mealMaterial: '54,000',
    tubeFeeding: '0',
    snack: '8,000',
    privateRoom: '0',
    haircut: '1,000',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '277,120',
    prepaid: '0',
    currentTotal: '277,120',
    previousUnpaid: '0',
    billingAmount: '277,120',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 3,
    date: 'ㅁㄴㅇㄹ',
    status: '',
    name: '김민수',
    grade: '등급외 등급외(100%)',
    days: 5,
    totalCost: '0',
    copay: '0',
    mealMaterial: '0',
    tubeFeeding: '0',
    snack: '0',
    privateRoom: '0',
    haircut: '1,000',
    medicine: '0',
    contractDoctor: '13,370',
    other: '0',
    gradeDiff: '85',
    totalUserCopay: '14,455',
    prepaid: '0',
    currentTotal: '14,455',
    previousUnpaid: '0',
    billingAmount: '14,455',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 4,
    date: 'ㅇㅇㅇ',
    status: '퇴소',
    name: '안순옥',
    grade: '3등급 일반(20%)',
    days: 4,
    totalCost: '260,930',
    copay: '65,230',
    mealMaterial: '0',
    tubeFeeding: '0',
    snack: '0',
    privateRoom: '0',
    haircut: '1,000',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '66,230',
    prepaid: '0',
    currentTotal: '66,230',
    previousUnpaid: '140,150',
    billingAmount: '206,380',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 5,
    date: 'ㅈㄷㅈㄷ',
    status: '',
    name: '박박박',
    grade: '1등급 일반(20%)',
    days: 18,
    totalCost: '1,302,990',
    copay: '325,740',
    mealMaterial: '0',
    tubeFeeding: '0',
    snack: '0',
    privateRoom: '0',
    haircut: '1,000',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '326,740',
    prepaid: '0',
    currentTotal: '326,740',
    previousUnpaid: '0',
    billingAmount: '326,740',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 6,
    date: '가나다',
    status: '',
    name: '최고심',
    grade: '4등급 일반(20%)',
    days: 9,
    totalCost: '691,560',
    copay: '172,890',
    mealMaterial: '10,500',
    tubeFeeding: '0',
    snack: '4,800',
    privateRoom: '0',
    haircut: '1,000',
    medicine: '2,500',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '191,690',
    prepaid: '0',
    currentTotal: '191,690',
    previousUnpaid: '0',
    billingAmount: '191,690',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 7,
    date: '가나당',
    status: '',
    name: '홍길동',
    grade: '3등급 감경(12%)',
    days: 9,
    totalCost: '645,800',
    copay: '88,060', // Adjusted roughly
    mealMaterial: '21,000',
    tubeFeeding: '0',
    snack: '4,800',
    privateRoom: '0',
    haircut: '1,000',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '114,860',
    prepaid: '0',
    currentTotal: '114,860',
    previousUnpaid: '0',
    billingAmount: '114,860',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 8,
    date: '강계희',
    status: '',
    name: '강계희',
    grade: '3등급 감경(12%)',
    days: 31,
    totalCost: '2,319,510',
    copay: '366,710',
    mealMaterial: '342,000',
    tubeFeeding: '0',
    snack: '46,500',
    privateRoom: '0',
    haircut: '5,000',
    medicine: '0',
    contractDoctor: '1,470',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '0',
    prepaid: '선납전액 존재',
    currentTotal: '0',
    previousUnpaid: '0',
    billingAmount: '0',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 9,
    date: '강으뜸',
    status: '',
    name: '강으뜸',
    grade: '3등급 기초(0%)',
    days: 31,
    totalCost: '2,527,740',
    copay: '0',
    mealMaterial: '0',
    tubeFeeding: '0',
    snack: '0',
    privateRoom: '0',
    haircut: '0',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '0',
    prepaid: '0',
    currentTotal: '0',
    previousUnpaid: '0',
    billingAmount: '0',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 10,
    date: '강춘애',
    status: '',
    name: '강춘애',
    grade: '3등급 의료(8%)',
    days: 31,
    totalCost: '2,739,350',
    copay: '238,200',
    mealMaterial: '409,500',
    tubeFeeding: '0',
    snack: '62,000',
    privateRoom: '0',
    haircut: '0',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '709,700',
    prepaid: '0',
    currentTotal: '709,700',
    previousUnpaid: '0',
    billingAmount: '709,700',
    deposit: '709,700',
    isProcessed: true,
    selected: false,
  },
  {
    id: 11,
    date: '고길동',
    status: '',
    name: '고길동',
    grade: '3등급 일반(20%)',
    days: 13,
    totalCost: '815,400',
    copay: '203,850',
    mealMaterial: '111,000',
    tubeFeeding: '0',
    snack: '50,000',
    privateRoom: '0',
    haircut: '5,000',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '369,850',
    prepaid: '0',
    currentTotal: '369,850',
    previousUnpaid: '0',
    billingAmount: '369,850',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 12,
    date: '고둘리',
    status: '',
    name: '고둘리',
    grade: '3등급 일반(20%)',
    days: 31,
    totalCost: '2,118,430',
    copay: '529,590',
    mealMaterial: '0',
    tubeFeeding: '0',
    snack: '0',
    privateRoom: '0',
    haircut: '5,000',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '534,590',
    prepaid: '0',
    currentTotal: '534,590',
    previousUnpaid: '3,221,510',
    billingAmount: '3,756,100',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
  {
    id: 13,
    date: '고수레',
    status: '',
    name: '고수레',
    grade: '4등급 일반(20%)',
    days: 9,
    totalCost: '587,090',
    copay: '146,770',
    mealMaterial: '0',
    tubeFeeding: '0',
    snack: '0',
    privateRoom: '0',
    haircut: '0',
    medicine: '0',
    contractDoctor: '0',
    other: '0',
    gradeDiff: '0',
    totalUserCopay: '146,770',
    prepaid: '0',
    currentTotal: '146,770',
    previousUnpaid: '0',
    billingAmount: '146,770',
    deposit: '0',
    isProcessed: true,
    selected: false,
  },
];

// ================= Main Page =================
export default function CopayBillingPage() {
  const [data, setData] = useState<BillingRecord[]>(RECORDS);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5] p-4 font-sans text-xs antialiased">
      {/*
        Header & Controls
        - Row 1: Title, Filters
        - Row 2: Date Navigation, Period, Right Stats/Controls
      */}
      <div className="mb-2">
        <h2 className="mb-2 text-lg font-bold text-[#204987]">본인부담금 청구관리</h2>

        {/* Filters Row */}
        <div className="flex items-center gap-1 border-b border-[#B8D1E0] bg-white p-2">
          <FilterButton label="현황선택" />
          <FilterButton label="분류선택" />
          <FilterButton label="생활실선택" />
          <FilterButton label="등급선택" />
          <div className="relative">
            <input
              type="text"
              placeholder="이름조회"
              className="h-[28px] w-[120px] rounded border border-gray-300 px-2 text-[11px]"
            />
          </div>
          <div className="flex-1"></div>
        </div>

        {/* Date / Month / Deadline Controls */}
        <div className="mt-2 flex items-center justify-between rounded-t-md border border-b-0 border-[#B8D1E0] bg-[#E8F1F8] p-2">
          {/* Left: Spacer to center the nav if needed, or just left aligned content */}
          <div className="flex w-1/4"></div>

          {/* Center: Month Nav */}
          <div className="flex items-center gap-2">
            <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold text-[#204987]">2026년 01월</span>
              <button className="text-gray-500 hover:text-[#204987]">
                <i className="ri-calendar-2-fill"></i>
              </button>
            </div>
            <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
              <i className="ri-arrow-right-s-line"></i>
            </button>
            <span className="text-[11px] text-[#555]">(사용기간 : 2026.01.01 ~ 2026.01.31)</span>
          </div>

          {/* Right: Closing controls */}
          <div className="flex w-1/4 items-center justify-end gap-2 text-[11px]">
            <span className="font-bold text-[#555]">※ 마감</span>
            <button className="flex h-5 w-5 items-center justify-center rounded bg-gray-400 text-white">?</button>
            <button className="rounded bg-[#2980b9] px-3 py-1 font-bold text-white shadow hover:bg-[#216593]">
              마감 해제
              <br />
              <span className="text-[9px] font-normal opacity-90">최인경 (2026.02.11)</span>
            </button>
          </div>
        </div>

        {/* Additional Controls Bar (Below Month Nav) */}
        <div className="flex items-center justify-end gap-3 border border-t-0 border-[#B8D1E0] bg-[#fffbf0] px-3 py-1.5 text-[11px]">
          <span className="text-[#333]">※ 후청구</span>
          <span className="border-l border-gray-300 pl-3 text-[#333]">|</span>
          <span className="text-[#333]">급여 수가</span>
          <button className="flex h-3.5 w-3.5 items-center justify-center rounded bg-gray-400 text-[9px] text-white">
            ?
          </button>
          <span className="font-bold text-[#333]">2.1 : 1</span>
          <span className="border-l border-gray-300 pl-3 text-[#333]">|</span>
          <span className="text-[#333]">※ 청구서 발행일(청구일자) : </span>
          <input type="date" className="h-[22px] border border-gray-300 px-1 text-[11px]" defaultValue="2026-02-01" />
          <span className="border-l border-gray-300 pl-3 text-[#333]">|</span>
          <span className="text-[#333]">※ 납부기한</span>
          <button className="flex h-3.5 w-3.5 items-center justify-center rounded bg-gray-400 text-[9px] text-white">
            ?
          </button>
          <span className="text-[#333]"> : </span>
          <input type="date" className="h-[22px] border border-gray-300 px-1 text-[11px]" defaultValue="2026-02-10" />
          <button className="rounded bg-[#17a2b8] px-2 py-0.5 text-white hover:bg-[#138496]">감산(있음)</button>
        </div>
      </div>

      {/*
        Main Table
      */}
      <div className="flex-1 overflow-auto border border-[#B8D1E0] bg-white shadow-sm">
        <table className="w-full min-w-[1600px] border-collapse text-center">
          <thead className="sticky top-0 z-10 bg-[#E8F1F8] text-[11px] font-bold text-[#333]">
            <tr>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                <input type="checkbox" />
              </th>
              <th className="w-[30px] border-b border-r border-[#B8D1E0] p-1">연번</th>
              <th className="w-[60px] border-b border-r border-[#B8D1E0] p-1">수급자명</th>
              <th className="w-[80px] border-b border-r border-[#B8D1E0] p-1">
                등급
                <br />
                본인부담률
              </th>
              <th className="w-[30px] border-b border-r border-[#B8D1E0] p-1">일수</th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                급여비용
                <br />
                공단부담금
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                급여비용
                <br />
                본인부담금
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                식사
                <br />
                재료비
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                경관
                <br />
                유동식
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">간식비</th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                상급
                <br />
                침실비
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">이·미용비</th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                진료
                <br />
                약제비
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                계약의사
                <br />
                진찰비
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">기타비용</th>
              <th className="border-b border-r border-[#B8D1E0] p-1">등급외</th>
              <th className="border-b border-r border-[#B8D1E0] p-1">부담금합계</th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                선납
                <br />
                적용액
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1">당월 총액</th>
              <th className="border-b border-r border-[#B8D1E0] p-1">
                이전
                <br />
                미납액
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1 text-black">
                청구액
                <br />
                (청구발송일)
              </th>
              <th className="border-b border-r border-[#B8D1E0] p-1 text-red-600">청구입금액</th>
              <th className="w-[70px] border-b border-[#B8D1E0] p-1">처리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[11px] text-[#333]">
            {data.map((row, idx) => (
              <tr key={row.id} className="hover:bg-blue-50/50">
                <td className="border-r border-gray-200 py-2">
                  <input type="checkbox" />
                </td>
                <td className="border-r border-gray-200 py-2">{idx + 1}</td>
                <td className="border-r border-gray-200 py-2">
                  <div className="font-bold">{row.name}</div>
                  {row.status === '퇴소' && (
                    <span className="rounded bg-[#9b59b6] px-1 text-[9px] text-white">퇴소</span>
                  )}
                  {row.id === 3 && <div className="text-[9px]">{row.date}</div>}
                  {row.id === 1 && <div className="text-[9px]">{row.date}</div>}
                  {row.id === 2 && <div className="text-[9px]">{row.date}</div>}
                  {row.id > 3 && row.status !== '퇴소' && row.date.length < 5 && row.date !== '' && (
                    <div className="text-[9px]">{row.date}</div>
                  )}
                </td>
                <td className="whitespace-pre-line border-r border-gray-200 py-2 text-[10px] leading-tight">
                  {row.grade.replace(' ', '\n')}
                </td>
                <td className="border-r border-gray-200 py-2">{row.days}</td>
                <td className="border-r border-gray-200 px-2 py-2 text-right text-gray-500">{row.totalCost}</td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.copay === '0' ? <span className="text-gray-300">0</span> : row.copay}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.mealMaterial === '0' ? (
                    <span className="text-gray-300">0</span>
                  ) : (
                    <span className="mr-1 text-gray-400 line-through">{row.mealMaterial}</span>
                  )}{' '}
                  <span className="ml-1 hidden">...</span>
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right text-gray-300">{row.tubeFeeding}</td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.snack === '0' ? (
                    <span className="text-gray-300">0</span>
                  ) : (
                    <span className="text-gray-400 line-through">{row.snack}</span>
                  )}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right text-gray-300">{row.privateRoom}</td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.haircut === '0' ? <span className="text-gray-300">0</span> : row.haircut}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.medicine === '0' ? <span className="text-gray-300">0</span> : row.medicine}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.contractDoctor === '0' ? <span className="text-gray-300">0</span> : row.contractDoctor}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right text-gray-300">{row.other}</td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.gradeDiff === '0' ? <span className="text-gray-300">0</span> : row.gradeDiff}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right font-bold">
                  {row.totalUserCopay === '0' ? <span className="text-gray-300">0</span> : row.totalUserCopay}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right">
                  {row.prepaid === '0' ? (
                    <span className="text-gray-300">0</span>
                  ) : row.prepaid === '선납전액 존재' ? (
                    <span className="rounded border border-green-500 px-1 text-[9px] text-green-600">
                      선납전액 존재
                    </span>
                  ) : (
                    row.prepaid
                  )}
                  {row.prepaid === '선납전액 존재' && <div className="pr-1 text-right text-[10px]">0</div>}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right font-bold">
                  {row.currentTotal === '0' ? <span className="text-gray-300">0</span> : row.currentTotal}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right text-red-500">
                  {row.previousUnpaid === '0' ? <span className="text-gray-300">0</span> : row.previousUnpaid}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right font-bold text-black">
                  {row.billingAmount === '0' ? <span className="text-gray-300">0</span> : row.billingAmount}
                </td>
                <td className="border-r border-gray-200 px-2 py-2 text-right text-red-500">
                  {row.deposit === '0' ? <span className="text-gray-300">0</span> : row.deposit}
                </td>
                <td className="px-1 py-1">
                  <button className="whitespace-nowrap rounded border border-[#637d91] bg-white px-1.5 py-0.5 text-[10px] text-[#637d91] hover:bg-gray-50">
                    청구서조회
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-[#B8D1E0] bg-[#f8fafc] text-[11px] font-bold text-[#333]">
            <tr>
              <td colSpan={5} className="border-r border-[#B8D1E0] py-2 text-center">
                총 139 건
              </td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">271,582,530</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">44,183,030</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">5,408,500</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">0</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">7,497,700</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">66,900,000</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">535,000</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">287,000</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">17,510</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">0</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">3,808,605</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right text-[12px] text-black">129,717,154</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right">0</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right text-[12px] text-black">129,717,154</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right text-red-500">186,420,349</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right text-[12px] text-black">316,137,503</td>
              <td className="border-r border-[#B8D1E0] px-2 py-2 text-right text-red-500">2,096,730</td>
              <td className="py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 opacity-50 grayscale">
          <div className="flex h-10 w-[200px] items-center justify-center rounded bg-gray-300 text-xl font-bold text-white">
            마감처리 되었습니다.
          </div>
          <div className="text-[10px]">(생성취소)</div>
        </div>
        <div className="flex gap-1">
          <ActionButton label="청구서 발송" color="bg-[#17a2b8]" />
          <ActionButton label="청구서발송리스트 출력" color="bg-[#546e7a]" multiline />
          <ActionButton label="주소 라벨지 출력" color="bg-[#546e7a]" multiline />
          <ActionButton label="급여비용 명세서 출력" color="bg-[#546e7a]" multiline />
          <ActionButton label="급여비용 영수증 출력" color="bg-[#546e7a]" multiline />
          <ActionButton label="본인부담청구리스트 출력" color="bg-[#546e7a]" multiline />
          <button className="flex items-center justify-center rounded bg-[#27ae60] p-2 text-white hover:bg-[#219150]">
            <i className="ri-file-excel-2-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helpers
function FilterButton({ label }: { readonly label: string }) {
  return (
    <button
      className="rounded px-3 py-1 text-[11px] font-bold text-white shadow-sm"
      style={{ background: 'linear-gradient(to bottom, #7f9db9, #6a8bad)' }}
    >
      {label}
    </button>
  );
}

function ActionButton({
  label,
  color,
  multiline,
}: {
  readonly label: string;
  readonly color: string;
  readonly multiline?: boolean;
}) {
  return (
    <button
      className={clsx(
        'rounded px-3 py-1.5 text-[11px] font-bold leading-tight text-white shadow hover:opacity-90',
        color,
      )}
    >
      {multiline
        ? label.split(' ').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))
        : label}
    </button>
  );
}
