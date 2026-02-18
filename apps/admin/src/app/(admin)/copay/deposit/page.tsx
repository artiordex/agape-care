/**
 * Description : page.tsx - ?? copay/deposit ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

// ================= Mock Data =================
interface Resident {
  id: number;
  status: '입소중' | '외출중' | '퇴소' | '';
  name: string;
  guardian: string;
  prepaidDetail: { date: string; label: string } | null;
  unpaid: string;
  prepaidBalance: string;
}

const RESIDENTS: Resident[] = [
  {
    id: 1,
    status: '외출중',
    name: '김말자',
    guardian: '-',
    prepaidDetail: { date: '1월3일', label: '1월3일' },
    unpaid: '512,130',
    prepaidBalance: '0',
  },
  {
    id: 2,
    status: '입소중',
    name: '성기철',
    guardian: '-',
    prepaidDetail: { date: '20원', label: '20원' },
    unpaid: '471,520',
    prepaidBalance: '0',
  },
  {
    id: 3,
    status: '입소중',
    name: 'ㅁㄴㅇㄹ',
    guardian: '11',
    prepaidDetail: null,
    unpaid: '15,988',
    prepaidBalance: '0',
  },
  {
    id: 4,
    status: '입소중',
    name: 'ㅈㄷㅈㄷ',
    guardian: '-',
    prepaidDetail: null,
    unpaid: '640,450',
    prepaidBalance: '0',
  },
  {
    id: 5,
    status: '입소중',
    name: '가나다',
    guardian: '김사랑',
    prepaidDetail: null,
    unpaid: '658,020',
    prepaidBalance: '0',
  },
  {
    id: 6,
    status: '입소중',
    name: '가나다',
    guardian: '-',
    prepaidDetail: null,
    unpaid: '311,820',
    prepaidBalance: '0',
  },
  {
    id: 7,
    status: '입소중',
    name: '가나당',
    guardian: '김가나',
    prepaidDetail: null,
    unpaid: '400,330',
    prepaidBalance: '0',
  },
  {
    id: 8,
    status: '입소중',
    name: '강계희',
    guardian: '-',
    prepaidDetail: null,
    unpaid: '-',
    prepaidBalance: '49,035,490',
  },
  {
    id: 9,
    status: '입소중',
    name: '강으뜸',
    guardian: '강소망',
    prepaidDetail: null,
    unpaid: '400,000',
    prepaidBalance: '0',
  },
  {
    id: 10,
    status: '입소중',
    name: '강춘애',
    guardian: '김진숙',
    prepaidDetail: null,
    unpaid: '71,400',
    prepaidBalance: '0',
  },
  {
    id: 11,
    status: '입소중',
    name: '고길동',
    guardian: '-',
    prepaidDetail: null,
    unpaid: '827,470',
    prepaidBalance: '0',
  },
  {
    id: 12,
    status: '입소중',
    name: '고수레',
    guardian: '홍길동',
    prepaidDetail: null,
    unpaid: '603,390',
    prepaidBalance: '0',
  },
  {
    id: 13,
    status: '입소중',
    name: '김곱',
    guardian: '123',
    prepaidDetail: null,
    unpaid: '6,440',
    prepaidBalance: '0',
  },
  {
    id: 14,
    status: '입소중',
    name: '김길동',
    guardian: '김가나',
    prepaidDetail: null,
    unpaid: '594,951',
    prepaidBalance: '0',
  },
  {
    id: 15,
    status: '입소중',
    name: '김꽃님',
    guardian: '김아무개',
    prepaidDetail: null,
    unpaid: '1,913,500',
    prepaidBalance: '0',
  },
  {
    id: 16,
    status: '입소중',
    name: '김나나',
    guardian: '김도래',
    prepaidDetail: null,
    unpaid: '1,647,800',
    prepaidBalance: '0',
  },
];

const BILLING_HISTORY = [{ month: '2026년 01월', amount: '512,130', paid: '0', unpaid: '512,130' }];

// ================= Main Page =================
export default function CopayDepositPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const selectedResident = RESIDENTS.find(r => r.id === selectedId) || RESIDENTS[0];

  return (
    <div className="flex h-[calc(100vh-60px)] bg-[#f0f2f5] p-2 font-sans text-xs text-[#333] antialiased">
      {/*
        [Left Panel] Resident List
      */}
      <div className="flex w-[400px] shrink-0 flex-col gap-2 p-1">
        {/* Year & Filters */}
        <div className="flex flex-col gap-2 rounded border border-[#B8D1E0] bg-white p-2 shadow-sm">
          <div className="flex items-center justify-center gap-2 border border-[#B8D1E0] bg-[#E8F1F8] py-1">
            <button className="flex h-5 w-5 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <span className="text-[14px] font-bold text-[#204987]">2026년</span>
            <button className="flex h-5 w-5 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <FilterButton label="현황선택" />
            <FilterButton label="생활실선택" />
            <FilterButton label="등급선택" />
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="이름조회"
                className="h-[26px] w-full border border-gray-300 px-2 text-[11px]"
              />
              <i className="ri-search-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* List Table */}
        <div className="flex flex-1 flex-col overflow-hidden rounded border border-[#B8D1E0] bg-white shadow-sm">
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-center">
              <thead className="sticky top-0 bg-[#E8F1F8] text-[11px] font-bold text-[#333]">
                <tr>
                  <th className="w-[40px] border-b border-r border-[#B8D1E0] py-1.5">연번</th>
                  <th className="w-[50px] border-b border-r border-[#B8D1E0] py-1.5">현황</th>
                  <th className="w-[60px] border-b border-r border-[#B8D1E0] py-1.5">수급자명</th>
                  <th className="w-[60px] border-b border-r border-[#B8D1E0] py-1.5">보호자명</th>
                  <th className="border-b border-r border-[#B8D1E0] py-1.5">잔여선납액</th>
                  <th className="border-b border-[#B8D1E0] py-1.5">미납액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {RESIDENTS.map((r, idx) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={clsx(
                      'cursor-pointer hover:bg-blue-50',
                      selectedId === r.id ? 'bg-[#e3f2fd]' : idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]',
                    )}
                  >
                    <td className="border-r border-gray-200 py-1.5">{idx + 1}</td>
                    <td className="border-r border-gray-200 py-1.5">
                      <span
                        className={clsx(
                          'text-[10px]',
                          r.status === '외출중' ? 'font-bold text-green-600' : 'text-[#333]',
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="border-r border-gray-200 py-1.5 font-bold">
                      {r.prepaidDetail ? (
                        <div className="flex flex-col leading-none">
                          <span>{r.prepaidDetail.date}</span>
                          <span className="text-[9px] text-gray-500">{r.prepaidDetail.label}</span>
                        </div>
                      ) : (
                        r.name
                      )}
                    </td>
                    <td className="border-r border-gray-200 py-1.5 text-gray-600">{r.guardian}</td>
                    <td className="border-r border-gray-200 px-2 py-1.5 text-right">
                      {r.prepaidBalance !== '0' ? r.prepaidBalance : '-'}
                    </td>
                    <td className="px-2 py-1.5 text-right text-[#333]">{r.unpaid !== '-' ? r.unpaid : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer Summary */}
          <div className="flex justify-between border-t border-[#B8D1E0] bg-[#f8fafc] p-1 px-4 text-center text-[11px] font-bold text-[#333]">
            <span>150 명</span>
            <span className="text-right">
              <span className="mr-4">50,030,441</span>
              <span>361,158,196</span>
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <button className="flex flex-1 items-center justify-center gap-1 rounded bg-[#17a2b8] py-1.5 font-bold text-white shadow hover:bg-[#138496]">
              <i className="ri-file-excel-2-line"></i> 은행 입금 관리
            </button>
            <button className="flex-1 rounded bg-[#78909c] py-1.5 font-bold leading-tight text-white shadow hover:bg-[#607d8b]">
              현금영수증 관리
              <br />
              <span className="text-[9px] font-normal">(팝빌연동)</span>
            </button>
          </div>
          <button className="rounded bg-[#17a2b8] py-1 font-bold text-white shadow hover:bg-[#138496]">
            본인부담금
            <br />
            영수증 발송
          </button>
          <button className="mt-1 rounded bg-[#2980b9] py-2 font-bold text-white shadow hover:bg-[#2066aa]">
            장기요양급여비 납부확인서 일괄 출력
          </button>
        </div>
      </div>

      {/*
        [Right Panel] Detail Content
      */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden p-1">
        {/* Resident Info Box */}
        <div className="rounded border border-[#B8D1E0] bg-white p-2 shadow-sm">
          <div className="mb-2 flex items-center gap-1">
            <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
            <h3 className="font-bold text-[#204987]">수급자 기본정보</h3>
          </div>

          <div className="flex gap-2">
            <table className="flex-1 border-collapse border border-[#B8D1E0]">
              <tbody>
                <tr>
                  <th className="w-[80px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold text-[#333]">
                    수급자명
                  </th>
                  <td className="border border-[#B8D1E0] px-2 py-1 font-bold">{selectedResident.name}</td>
                  <th className="w-[100px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold text-[#333]">
                    성별 / 생년월일
                  </th>
                  <td className="border border-[#B8D1E0] px-2 py-1">남 (96세) / 1930.01.01</td>
                  <td rowSpan={2} className="w-[300px] border border-[#B8D1E0] px-2 py-1 align-middle">
                    <span className="mr-2 font-bold">보호자</span>
                    <span>김말자 010-1234-5678</span>
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold text-[#333]">
                    입소일
                  </th>
                  <td className="border border-[#B8D1E0] px-2 py-1">2026.01.03</td>
                  <th className="border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold text-[#333]">
                    등급 / 부담률
                  </th>
                  <td className="border border-[#B8D1E0] px-2 py-1">2등급(12%)</td>
                </tr>
                <tr>
                  <th className="border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold text-[#333]">
                    잔여 선납액
                  </th>
                  <td className="border border-[#B8D1E0] px-2 py-1 font-bold text-blue-600">0 원</td>
                  <th className="border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold text-[#333]">
                    미납액
                  </th>
                  <td className="border border-[#B8D1E0] px-2 py-1 font-bold text-red-500" colSpan={2}>
                    {selectedResident.unpaid} 원
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col justify-center gap-1">
              <button className="rounded bg-[#17a2b8] px-2 py-1 text-[11px] text-white shadow hover:bg-[#138496]">
                환불처리
              </button>
              <button className="rounded bg-[#78909c] px-2 py-1 text-[11px] text-white shadow hover:bg-[#607d8b]">
                선납액 이력
              </button>
            </div>
          </div>

          <div className="mt-2 flex justify-center">
            <button className="rounded bg-[#5bc0de] px-8 py-2 text-[14px] font-bold text-white shadow hover:bg-[#46b8da]">
              입금 처리
            </button>
          </div>
        </div>

        {/* Tables Split */}
        <div className="flex flex-1 gap-2 overflow-hidden">
          {/* Billing History */}
          <div className="flex flex-1 flex-col overflow-hidden rounded border border-[#B8D1E0] bg-white shadow-sm">
            <div className="flex items-center gap-1 border-b border-[#B8D1E0] bg-[#f8fafc] p-2">
              <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
              <h3 className="font-bold text-[#204987]">본인부담금 청구내역</h3>
            </div>
            <div className="flex-1 overflow-auto bg-white">
              <table className="w-full border-collapse text-center">
                <thead className="sticky top-0 border-b border-[#B8D1E0] bg-[#E8F1F8] font-bold text-[#333]">
                  <tr>
                    <th className="border-r border-[#B8D1E0] py-2">급여제공월</th>
                    <th className="border-r border-[#B8D1E0] py-2">청구액</th>
                    <th className="border-r border-[#B8D1E0] py-2">
                      입금액
                      <br />
                      <span className="text-[10px] font-normal">(조정액)</span>
                    </th>
                    <th className="border-r border-[#B8D1E0] py-2">미납액</th>
                    <th className="py-2">상세내역</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {BILLING_HISTORY.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border-r border-gray-100 py-3">{item.month}</td>
                      <td className="border-r border-gray-100 px-4 py-3 text-right">{item.amount}</td>
                      <td className="border-r border-gray-100 px-4 py-3 text-right">0</td>
                      <td className="border-r border-gray-100 px-4 py-3 text-right font-bold text-red-500">
                        {item.unpaid}
                      </td>
                      <td className="space-y-1 py-3 text-[10px]">
                        <div>
                          <button className="mr-1 rounded bg-[#78909c] px-1.5 py-0.5 text-white">명세1</button>
                          <button className="rounded bg-[#78909c] px-1.5 py-0.5 text-white">명세2</button>
                        </div>
                        <div>
                          <button className="rounded bg-[#78909c] px-1.5 py-0.5 text-white">청구</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#B8D1E0] bg-[#f0f8ff] p-2 text-right">
              <div className="flex justify-between text-[11px] font-bold text-[#333]">
                <span>청구총액</span>
                <span>입금총액 + 조정총액</span>
                <span className="text-red-500">미납총액</span>
              </div>
              <div className="mt-1 flex justify-between text-[13px] font-bold text-[#333]">
                <span>512,130</span>
                <span>0 + 0 = 0</span>
                <span className="text-red-500">512,130</span>
              </div>
            </div>
            <div className="flex gap-1 border-t border-[#B8D1E0] bg-[#546e7a] p-1">
              <button className="flex-1 py-1 text-center text-[11px] font-bold text-white hover:bg-[#455a64]">
                [2025년]장기요양급여비납부확인서출력
              </button>
              <button className="flex-1 border-l border-white/20 py-1 text-center text-[11px] font-bold text-white hover:bg-[#455a64]">
                [2026년]장기요양급여비납부확인서출력
              </button>
            </div>
          </div>

          {/* Deposit History */}
          <div className="flex flex-1 flex-col overflow-hidden rounded border border-[#B8D1E0] bg-white shadow-sm">
            <div className="flex items-center gap-1 border-b border-[#B8D1E0] bg-[#f8fafc] p-2">
              <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
              <h3 className="font-bold text-[#204987]">본인부담금 입금내역</h3>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-auto bg-white">
              <table className="h-full w-full border-collapse text-center">
                <thead className="sticky top-0 h-[40px] border-b border-[#B8D1E0] bg-[#E8F1F8] font-bold text-[#333]">
                  <tr>
                    <th className="border-r border-[#B8D1E0] py-2">입금일</th>
                    <th className="border-r border-[#B8D1E0] py-2">
                      입금액
                      <br />
                      <span className="text-[10px] font-normal">(조정액)</span>
                    </th>
                    <th className="border-r border-[#B8D1E0] py-2">입금자</th>
                    <th className="border-r border-[#B8D1E0] py-2">입금방법</th>
                    <th className="border-r border-[#B8D1E0] py-2">
                      현금
                      <br />
                      영수증
                    </th>
                    <th className="border-r border-[#B8D1E0] py-2">출력</th>
                    <th className="py-2">처리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="py-10 text-gray-500">
                      조회된 입금 내역이 없습니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#B8D1E0] bg-[#f0f8ff] p-2 text-right">
              <div className="flex justify-end text-[11px] font-bold text-[#333]">
                <span>입금총액 + 조정총액</span>
              </div>
              <div className="mt-1 flex justify-end text-[13px] font-bold text-[#333]">
                <span>0 + 0 = 0</span>
              </div>
            </div>
            <div className="flex gap-1 border-t border-[#B8D1E0] bg-[#546e7a] p-1">
              <button className="flex-1 py-1 text-center text-[11px] font-bold text-white hover:bg-[#455a64]">
                [2025년] 입금내역 출력
              </button>
              <button className="flex-1 border-l border-white/20 py-1 text-center text-[11px] font-bold text-white hover:bg-[#455a64]">
                [2026년] 입금내역 출력
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers
function FilterButton({ label }: { readonly label: string }) {
  return (
    <button
      className="whitespace-nowrap rounded px-2 py-1 text-[11px] font-bold text-white shadow-sm"
      style={{ background: 'linear-gradient(to bottom, #7f9db9, #6a8bad)' }}
    >
      {label}
    </button>
  );
}
