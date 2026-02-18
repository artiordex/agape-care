/**
 * Description : page.tsx - ?? care/bedsore-prevention ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

// ================= Types =================
interface Resident {
  id: number;
  status: '입소중' | '퇴소';
  name: string;
  room: string;
  evalDate: string;
  score: number;
  risk: '위험' | '고위험';
  needsChange: boolean;
}

interface BedsoreRecord {
  day: number;
  dayOfWeek: string;
  risk: '위험' | '고위험';
  score: number;
  positionChangeCount?: number;
  hasBedsore: boolean | null; // true: 발생, false: 발생없음, null: -
  aids: {
    cushion: boolean;
    mat: boolean;
    mattress: boolean;
    etc: boolean;
  };
  provider: string;
  isSaved: boolean;
}

// ================= Mock Data =================
const RESIDENTS: Resident[] = [
  {
    id: 1,
    status: '입소중',
    name: '이옥자',
    room: '2호실',
    evalDate: '2026.02.04',
    score: 13,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 2,
    status: '입소중',
    name: '박태식',
    room: '다용실',
    evalDate: '2026.02.10',
    score: 16,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 3,
    status: '입소중',
    name: '강계희',
    room: '소망',
    evalDate: '2026.02.11',
    score: 6,
    risk: '고위험',
    needsChange: true,
  },
  {
    id: 4,
    status: '입소중',
    name: '강으뜸',
    room: '특실',
    evalDate: '2026.01.24',
    score: 18,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 5,
    status: '퇴소',
    name: '구시민',
    room: '노랑나비실',
    evalDate: '2026.02.04',
    score: 16,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 6,
    status: '퇴소',
    name: '금일봉',
    room: '연수방',
    evalDate: '2026.01.26',
    score: 15,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 7,
    status: '퇴소',
    name: '김철수',
    room: '래미안실',
    evalDate: '2025.11.12',
    score: 12,
    risk: '고위험',
    needsChange: true,
  },
  {
    id: 8,
    status: '입소중',
    name: '김나나',
    room: '2호실',
    evalDate: '2026.01.07',
    score: 8,
    risk: '고위험',
    needsChange: true,
  },
  {
    id: 9,
    status: '입소중',
    name: '김다라',
    room: '샤랄라',
    evalDate: '2025.11.15',
    score: 16,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 10,
    status: '입소중',
    name: '김로이',
    room: '신규신규',
    evalDate: '2026.01.15',
    score: 15,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 11,
    status: '입소중',
    name: '김말복',
    room: '하하호호',
    evalDate: '2025.02.06',
    score: 15,
    risk: '위험',
    needsChange: true,
  },
  {
    id: 12,
    status: '입소중',
    name: '김사랑',
    room: '홍길동222',
    evalDate: '2026.01.06',
    score: 15,
    risk: '위험',
    needsChange: true,
  },
];

const RECORDS: BedsoreRecord[] = Array.from({ length: 15 }, (_, i) => {
  const day = i + 1;
  const date = new Date(2026, 1, day); // Feb 2026
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()] ?? '일';

  return {
    day,
    dayOfWeek,
    risk: day <= 3 ? '고위험' : '위험',
    score: day <= 3 ? 9 : 13,
    positionChangeCount: day === 9 ? 1 : day === 10 ? 9 : undefined,
    hasBedsore: day <= 3 ? false : null,
    aids: {
      cushion: day >= 9,
      mat: false,
      mattress: day >= 9,
      etc: false,
    },
    provider: day <= 3 ? '개드립진짜' : day >= 9 && day <= 10 ? '최인경' : '',
    isSaved: day <= 3 || (day >= 9 && day <= 10),
  };
});

// ================= Main Component =================
export default function BedsorePreventionPage() {
  const [selectedResidentId, setSelectedResidentId] = useState<number>(1);
  const selectedResident = RESIDENTS.find(r => r.id === selectedResidentId) ?? RESIDENTS[0]!;

  return (
    <div className="flex h-[calc(100vh-60px)] gap-4 bg-[#f1f5f9] p-4 font-sans text-xs text-[#333] antialiased">
      {/*
        [Left Panel] Resident List
        - Width: ~35% or Fixed 400px
      */}
      <div className="flex w-[420px] shrink-0 flex-col overflow-hidden rounded-md border border-[#B8D1E0] bg-white shadow-sm">
        {/* Month Navigation */}
        <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] p-2">
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-[#204987]">2026년 02월</span>
            <button className="text-gray-500 hover:text-[#204987]">
              <i className="ri-calendar-2-fill"></i>
            </button>
          </div>
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-1 border-b border-[#B8D1E0] bg-white p-2">
          <button
            className="rounded px-3 py-1.5 text-[11px] font-bold text-white shadow-sm"
            style={{ background: 'linear-gradient(to bottom, #7f9db9, #6a8bad)' }}
          >
            현황선택
          </button>
          <button
            className="rounded px-3 py-1.5 text-[11px] font-bold text-white shadow-sm"
            style={{ background: 'linear-gradient(to bottom, #7f9db9, #6a8bad)' }}
          >
            생활실선택
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="이름조회"
              className="h-full w-full rounded border border-gray-300 px-2 text-[11px]"
            />
            <i className="ri-search-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* List Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-[#E8F1F8] text-[11px] font-bold text-[#333]">
              <tr>
                <th className="border-b border-r border-[#B8D1E0] px-1 py-2">연번</th>
                <th className="border-b border-r border-[#B8D1E0] px-1 py-2">현황</th>
                <th className="border-b border-r border-[#B8D1E0] px-1 py-2">수급자명</th>
                <th className="border-b border-r border-[#B8D1E0] px-1 py-2">생활실</th>
                <th colSpan={3} className="border-b border-[#B8D1E0] px-1 py-2">
                  <div className="border-b border-[#B8D1E0] pb-1">대상 욕창위험도 평가</div>
                  <div className="flex pt-1">
                    <span className="flex-1 border-r border-[#B8D1E0]">작성일</span>
                    <span className="flex-1 border-r border-[#B8D1E0]">점수</span>
                    <span className="flex-1">
                      체위변경
                      <br />
                      필요여부
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-center">
              {RESIDENTS.map((r, idx) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedResidentId(r.id)}
                  className={clsx(
                    'cursor-pointer hover:bg-blue-50',
                    selectedResidentId === r.id ? 'bg-[#e3f2fd]' : 'bg-white',
                  )}
                >
                  <td className="border-r border-gray-200 py-1.5">{idx + 1}</td>
                  <td className="border-r border-gray-200 py-1.5">{r.status}</td>
                  <td className="border-r border-gray-200 py-1.5 font-bold">{r.name}</td>
                  <td className="border-r border-gray-200 py-1.5">{r.room}</td>
                  <td className="border-r border-gray-200 py-1.5 text-[10px] text-gray-500">{r.evalDate}</td>
                  <td className="border-r border-gray-200 py-1.5">
                    <span
                      className={clsx(
                        'rounded px-1 py-0.5 text-[10px] font-bold text-white',
                        r.risk === '고위험' ? 'bg-[#c0392b]' : 'bg-[#9b59b6]',
                      )}
                    >
                      {r.risk}
                    </span>
                    <span className="ml-1 text-[10px] font-bold text-[#333]">({r.score}점)</span>
                  </td>
                  <td className="py-1.5">
                    {r.needsChange && (
                      <span className="rounded border border-red-200 bg-red-50 px-1 py-0.5 text-[10px] font-bold text-red-500">
                        체위변경
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="border-t border-[#B8D1E0] bg-[#f8fafc] p-2 text-right text-[11px] text-[#333]">
          ▶ 전체 : <span className="font-bold text-blue-600">41</span> 명 ▶ 욕창예방 :{' '}
          <span className="font-bold text-blue-600">39</span> 명 ▶ 욕창발생 :{' '}
          <span className="font-bold text-blue-600">2</span> 명
        </div>

        {/* Info Box */}
        <div className="border-t border-[#B8D1E0] bg-[#eef2ff] p-2 text-[10px] text-blue-800">
          <p className="mb-1">※ 욕창위험도 평가 점수가 18점 이하(위험/고위험)인 수급자는 욕창예방 대상입니다.</p>
          <p>
            ※ 욕창발생한 수급자는 <span className="underline">[3-1.간호급여 제공기록 &gt; 3.욕창간호]</span> 에서
            욕창간호를 기록합니다.
          </p>
        </div>
      </div>

      {/*
        [Right Panel] Monthly Record Detail
        - Flex-1
      */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#B8D1E0] bg-white shadow-sm">
        {/* Resident Info Header */}
        <div className="p-1">
          <div className="flex items-center gap-2 px-2 py-1">
            <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
            <h3 className="text-[12px] font-bold text-[#204987]">수급자 기본정보</h3>
          </div>
          <table className="w-full border-collapse border border-[#B8D1E0]">
            <tbody>
              <tr>
                <th className="w-[80px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold">수급자명</th>
                <td className="border border-[#B8D1E0] px-2 py-1 font-bold text-[#333]">{selectedResident.name}</td>
                <th className="w-[80px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold">상태</th>
                <td className="border border-[#B8D1E0] px-2 py-1 text-[#333]">욕창위험</td>
              </tr>
              <tr>
                <th className="w-[80px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold">등급</th>
                <td className="border border-[#B8D1E0] px-2 py-1 text-[#333]">3등급</td>
                <th className="w-[80px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold">생활실</th>
                <td className="border border-[#B8D1E0] px-2 py-1 text-[#333]">{selectedResident.room}</td>
              </tr>
              <tr>
                <th className="w-[80px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold">입소일</th>
                <td className="border border-[#B8D1E0] px-2 py-1 text-[#333]">2026.01.27</td>
                <th className="w-[80px] border border-[#B8D1E0] bg-[#E8F1F8] py-1 text-center font-bold">주요질환</th>
                <td className="border border-[#B8D1E0] px-2 py-1 text-[#333]">치매, 고혈압</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Record Table Controls */}
        <div className="mt-2 flex items-center justify-between border-b border-[#B8D1E0] px-2 py-1">
          <div className="flex items-center gap-2">
            <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
            <h3 className="text-[12px] font-bold text-[#204987]">욕창발생 위험군 예방 관리기록</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#333]">제공자 선택 기준일 :</span>
            <input type="date" className="h-[24px] border border-gray-300 px-1 text-[11px]" defaultValue="2026-02-18" />
            <span className="ml-2 text-[11px] text-[#333]">제공자 :</span>
            <div className="flex gap-1">
              <input
                type="text"
                className="h-[24px] w-[80px] border border-gray-300 px-1 text-[11px]"
                defaultValue="개드립진짜"
              />
              <button className="rounded bg-[#546E7A] px-2 py-0.5 text-[11px] text-white hover:bg-[#455A64]">
                선택
              </button>
            </div>
          </div>
        </div>

        {/* Main Record Table */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-[#E8F1F8] text-[11px] font-bold text-[#333]">
              <tr>
                <th className="w-[50px] border-r border-[#B8D1E0] py-2">일자</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">욕창위험도</th>
                <th className="w-[60px] border-r border-[#B8D1E0] py-2">체위변경</th>
                <th className="w-[100px] border-r border-[#B8D1E0] py-2">욕창 발생 여부</th>
                <th className="border-r border-[#B8D1E0] py-2">욕창방지 보조도구</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">제공자</th>
                <th className="w-[100px] py-2">기록</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center align-middle">
              {RECORDS.map(rec => (
                <tr
                  key={rec.day}
                  className={clsx(
                    'border-b border-gray-200 hover:bg-gray-50',
                    (rec.day === 9 || rec.day === 10) && 'bg-lime-50',
                  )}
                >
                  {/* Date */}
                  <td className="py-2 text-[#333]">
                    <span
                      className={clsx(
                        rec.dayOfWeek === '일' && 'text-red-500',
                        rec.dayOfWeek === '토' && 'text-blue-500',
                      )}
                    >
                      {rec.day.toString().padStart(2, '0')}({rec.dayOfWeek})
                    </span>
                  </td>

                  {/* Risk */}
                  <td className="py-2">
                    <span
                      className={clsx(
                        'font-white rounded px-1 py-0.5 text-[10px] font-bold text-white',
                        rec.risk === '고위험' ? 'bg-[#c0392b]' : 'bg-[#9b59b6]',
                      )}
                    >
                      {rec.risk}
                    </span>
                    <span className="ml-1 text-[10px] text-[#555]">({rec.score}점)</span>
                  </td>

                  {/* Position Change */}
                  <td className="py-2">
                    {rec.positionChangeCount ? (
                      <span className="rounded bg-[#788fa0] px-1.5 py-0.5 text-[10px] text-white">
                        {rec.positionChangeCount}회
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-300">-</span>
                    )}
                  </td>

                  {/* Occurrence */}
                  <td className="py-2">
                    {rec.hasBedsore !== null ? (
                      <div className="flex flex-col items-start gap-1 pl-4">
                        <label className="flex items-center gap-1 text-[11px]">
                          <input type="radio" checked={rec.hasBedsore === true} readOnly className="h-3 w-3" />
                          <span>발생</span>
                        </label>
                        <label className="flex items-center gap-1 text-[11px]">
                          <input
                            type="radio"
                            checked={rec.hasBedsore === false}
                            readOnly
                            className="h-3 w-3 accent-orange-500"
                          />
                          <span className="font-bold text-orange-600">발생 없음</span>
                        </label>
                      </div>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>

                  {/* Aids */}
                  <td className="px-4 py-2 text-left">
                    <div className="flex items-center gap-2">
                      <Checkbox label="쿠션" checked={rec.aids.cushion} />
                      <Checkbox label="방석" checked={rec.aids.mat} />
                      <Checkbox label="욕창예방매트리스" checked={rec.aids.mattress} />
                      <div className="flex items-center gap-1">
                        <Checkbox label="기타" checked={rec.aids.etc} />
                      </div>
                    </div>
                  </td>

                  {/* Provider */}
                  <td className="py-2 text-[11px]">{rec.provider || '-'}</td>

                  {/* Actions */}
                  <td className="py-2">
                    <div className="flex items-center justify-center gap-1">
                      <button className="rounded bg-[#2980b9] px-2 py-0.5 text-[10px] text-white hover:bg-[#2066aa]">
                        저장
                      </button>
                      {(rec.day === 1 || rec.day === 9 || rec.day === 10) && (
                        <button className="rounded bg-[#e74c3c] px-2 py-0.5 text-[10px] text-white hover:bg-[#c0392b]">
                          삭제
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-2 border-t border-[#B8D1E0] bg-[#f8fafc] p-2">
          <button className="rounded bg-[#788fa0] px-4 py-1.5 text-[12px] font-bold text-white shadow hover:bg-[#637d91]">
            체위변경 기록지 출력
            <div className="text-[10px] opacity-80">2026.02.01 - 2026.02.28</div>
          </button>
          <button className="rounded bg-[#788fa0] px-4 py-1.5 text-[12px] font-bold text-white shadow hover:bg-[#637d91]">
            욕창예방 기록지 출력
            <div className="text-[10px] opacity-80">2026.02.01 - 2026.02.28</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function Checkbox({ label, checked }: { readonly label: string; readonly checked: boolean }) {
  return (
    <label className="flex items-center gap-1">
      <div
        className={clsx(
          'flex h-3.5 w-3.5 items-center justify-center border',
          checked ? 'border-orange-500 bg-orange-500' : 'border-gray-300 bg-white',
        )}
      >
        {checked && <i className="ri-check-line text-xs text-white"></i>}
      </div>
      <span className={clsx('text-[11px]', checked ? 'font-bold text-[#333]' : 'text-gray-500')}>{label}</span>
    </label>
  );
}
