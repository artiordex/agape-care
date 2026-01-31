'use client';

import React from 'react';
import clsx from 'clsx';

interface TubeManagement {
  tubeType: 'gastric' | 'peg' | 'tracheostomy' | 'none';
  insertionDate: string;
  changeDate: string;
  feedingAmount: string;
  feedingTimes: string[];
  tubeStatus: string[];
  note: string;
}

interface Props {
  readonly management: TubeManagement;
  readonly onChange: (management: TubeManagement) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 4. 비위관/튜브 관리 및 영양 공급 기록
 * image_81bc11.png의 2단 레이아웃 및 아가페 그린(#5C8D5A) 테마 적용
 */
export default function TubeManagementTab({ management, onChange, onSave }: Props) {
  const tubeStatuses = ['정상', '막힘', '이탈', '누출', '발적', '통증', '감염징후'];

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* 1. 메인 입력 영역: 2단 그리드 시스템 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* [좌측] 비위관 관리기록 (7/12 섹션) */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm lg:col-span-7">
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-4 py-2">
            <div className="flex items-center gap-2">
              <i className="ri-indent-decrease text-[#5C8D5A]"></i>
              <h4 className="text-[12px] font-black uppercase text-gray-800">비위관 관리기록</h4>
            </div>
            <button className="rounded border border-gray-300 bg-white px-2.5 py-1 text-[9px] font-black text-gray-500 shadow-sm transition-all hover:bg-emerald-50 hover:text-[#5C8D5A]">
              전일 자료 조회
            </button>
          </div>

          <div className="flex-1 p-0">
            <div className="flex h-full border-b border-gray-100">
              {/* 왼쪽 레이블 영역 */}
              <div className="flex w-[120px] shrink-0 items-center justify-center border-r border-gray-100 bg-emerald-50/30 p-4 text-center">
                <p className="text-[11px] font-black leading-tight text-[#5C8D5A]">
                  비위관 교체
                  <br />및<br />
                  관리 기록
                </p>
              </div>
              {/* 입력 영역 */}
              <div className="flex-1 p-2">
                <textarea
                  value={management.note}
                  onChange={e => onChange({ ...management, note: e.target.value })}
                  placeholder="L-Tube 교체 여부 및 삽입 상태를 상세히 기록하세요."
                  className="h-full min-h-[160px] w-full resize-none border-none p-3 text-[12px] font-medium leading-relaxed outline-none placeholder:text-gray-300 focus:ring-0"
                />
              </div>
            </div>

            {/* 작성자 선택 필드 */}
            <div className="flex items-center border-t border-gray-200">
              <div className="w-[120px] shrink-0 border-r border-gray-100 bg-emerald-50/30 px-4 py-2.5 text-center">
                <label className="text-[11px] font-black text-gray-700">
                  작성자 <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex flex-1 items-center gap-2 px-3">
                <input
                  type="text"
                  readOnly
                  className="w-40 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-[11px] font-bold text-gray-600 outline-none"
                  value="최인정"
                />
                <button className="rounded bg-[#5C8D5A] px-4 py-1 text-[10px] font-black text-white shadow-sm hover:bg-[#4A7548]">
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* [우측] 비위관 영양(필요시) 테이블 (5/12 섹션) */}
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm lg:col-span-5">
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-4 py-2">
            <div className="flex items-center gap-2">
              <i className="ri-play-list-add-line text-orange-500"></i>
              <h4 className="text-[12px] font-black uppercase text-gray-800">
                비위관 영양 <span className="text-orange-600">(필요시)</span>
              </h4>
            </div>
            <button className="rounded border border-gray-300 bg-white px-2.5 py-1 text-[9px] font-black text-gray-500 shadow-sm transition-all hover:text-[#5C8D5A]">
              전일 자료 조회
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b border-gray-200 bg-emerald-50/50 text-[10px] font-black uppercase tracking-tighter text-[#5C8D5A]">
                <tr>
                  <th className="w-12 border-r border-gray-200 px-2 py-2 text-center">횟수</th>
                  <th className="border-r border-gray-200 px-2 py-2 text-left">식사종류</th>
                  <th className="w-16 border-r border-gray-200 px-2 py-2 text-center">식사량</th>
                  <th className="w-20 border-r border-gray-200 px-2 py-2 text-center">식사시간</th>
                  <th className="w-10 px-2 py-2 text-center">지움</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="transition-colors hover:bg-gray-50">
                    <td className="border-r border-gray-200 px-2 py-1.5 text-center font-black text-gray-400">{i}회</td>
                    <td className="border-r border-gray-200 px-2 py-1.5">
                      <select className="w-full rounded border border-gray-200 bg-transparent px-1 py-0.5 text-[11px] font-bold text-gray-700 outline-none focus:border-[#5C8D5A]">
                        <option>선택</option>
                        <option>뉴케어</option>
                        <option>그린비아</option>
                      </select>
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1.5">
                      <input
                        type="text"
                        className="w-full border-b border-gray-200 bg-transparent text-center outline-none focus:border-[#5C8D5A]"
                        placeholder="ml"
                      />
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1.5">
                      <div className="flex items-center justify-center gap-0.5">
                        <input
                          type="text"
                          className="w-6 rounded border border-gray-200 text-center"
                          placeholder="00"
                        />
                        <span>:</span>
                        <input
                          type="text"
                          className="w-6 rounded border border-gray-200 text-center"
                          placeholder="00"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <button className="text-gray-300 hover:text-red-500">
                        <i className="ri-delete-back-2-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. 하단 누적 이력 관리 그리드 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="h-4 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[13px] font-black uppercase tracking-tight text-gray-800">비위관/영양 관리 기록 이력</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center">No.</th>
                <th className="px-4 py-3">관리 일자</th>
                <th className="px-4 py-3">튜브종류</th>
                <th className="px-4 py-3 text-center">주입량</th>
                <th className="px-4 py-3 text-center">주입시간</th>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">특이사항</th>
                <th className="px-4 py-3 text-center">담당자</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center opacity-40">
                    <i className="ri-database-2-line mb-2 text-4xl"></i>
                    <p className="font-black uppercase tracking-widest">해당 수급자의 누적 기록이 없습니다</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 통합 액션 (Agape-Standard) */}
      <div className="flex justify-center gap-2 pt-4">
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-16 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-save-3-line text-lg"></i> 저장 및 확정
        </button>
        <button className="flex flex-col items-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-[13px] font-black leading-none text-gray-600 transition-all hover:bg-gray-50">
          비위관 기록지 출력
          <span className="mt-1 text-[9px] font-bold uppercase tracking-tighter text-gray-400">
            2026.01.01 ~ 2026.01.31
          </span>
        </button>
      </div>
    </div>
  );
}
