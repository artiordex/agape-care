'use client';

import React from 'react';
import clsx from 'clsx';

interface BurdenRateHistory {
  id: string;
  residentId: string;
  startDate: string;
  endDate: string | null;
  rateName: string;
  rate: number;
  reason: string;
  createdBy: string;
  createdAt: string;
}

interface Props {
  readonly history: BurdenRateHistory[];
  readonly onEdit: (id: string) => void;
  readonly onDelete: (id: string) => void;
}

/**
 * [Component] 본인부담률 변경 이력 그리드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세서 스타일 적용
 */
export default function BurdenRateHistoryTable({ history, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 테이블 섹션 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 rounded-full bg-[#5C8D5A]"></div>
          <h3 className="text-[12px] font-black uppercase tracking-tight text-gray-800">본인부담률 자격 변동 내역</h3>
        </div>
        <div className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
          Audit Log: Access Records
        </div>
      </div>

      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {/* 고밀도 테이블 헤더 */}
          <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
            <tr>
              <th className="px-5 py-3">적용 시작일</th>
              <th className="px-5 py-3">적용 종료일</th>
              <th className="px-5 py-3">부담률 명칭</th>
              <th className="px-5 py-3 text-center">부담률(%)</th>
              <th className="px-5 py-3">변경 및 판정 사유</th>
              <th className="px-5 py-3">처리 관리자</th>
              <th className="px-5 py-3">기록 일시</th>
              <th className="px-5 py-3 text-right">이력 관리</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-[12px]">
            {history.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-20 text-center">
                  <i className="ri-history-line mb-2 block text-4xl text-gray-200"></i>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    등록된 부담률 변동 이력이 없습니다
                  </p>
                </td>
              </tr>
            ) : (
              history.map(item => {
                const isActive = !item.endDate; // 종료일이 없으면 현재 적용 중

                return (
                  <tr
                    key={item.id}
                    className={clsx(
                      'group transition-colors',
                      isActive ? 'bg-emerald-50/30 hover:bg-emerald-50/50' : 'hover:bg-gray-50/50',
                    )}
                  >
                    {/* 1. 시작일 */}
                    <td className="px-5 py-4 font-mono text-[11px] font-bold text-gray-700">{item.startDate}</td>

                    {/* 2. 종료일 (상태 표시 포함) */}
                    <td className="px-5 py-4">
                      {item.endDate ? (
                        <span className="font-mono text-[11px] text-gray-400">{item.endDate}</span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5C8D5A] opacity-75"></span>
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5C8D5A]"></span>
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-tighter text-[#5C8D5A]">
                            Active Now
                          </span>
                        </div>
                      )}
                    </td>

                    {/* 3. 부담률명 */}
                    <td className="px-5 py-4">
                      <span
                        className={clsx(
                          'rounded-sm border px-2 py-0.5 text-[10px] font-black tracking-tight shadow-sm',
                          isActive
                            ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white'
                            : 'border-gray-200 bg-gray-100 text-gray-500',
                        )}
                      >
                        {item.rateName}
                      </span>
                    </td>

                    {/* 4. 부담률(%) */}
                    <td className="px-5 py-4 text-center">
                      <span
                        className={clsx(
                          'font-mono text-[13px] font-black',
                          isActive ? 'text-[#5C8D5A]' : 'text-gray-900',
                        )}
                      >
                        {item.rate}%
                      </span>
                    </td>

                    {/* 5. 변경 사유 */}
                    <td className="px-5 py-4">
                      <p className="max-w-[200px] truncate text-[11px] font-medium text-gray-600" title={item.reason}>
                        {item.reason}
                      </p>
                    </td>

                    {/* 6. 처리자 */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-[9px] font-black text-gray-400">
                          {item.createdBy.charAt(0)}
                        </div>
                        <span className="text-[11px] font-bold text-gray-700">{item.createdBy}</span>
                      </div>
                    </td>

                    {/* 7. 기록 일시 */}
                    <td className="px-5 py-4 font-mono text-[10px] text-gray-400">{item.createdAt}</td>

                    {/* 8. 이력 관리 액션 */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => onEdit(item.id)}
                          className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-[10px] font-black text-gray-600 shadow-sm transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A] active:scale-95"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-[10px] font-black text-gray-400 shadow-sm transition-all hover:border-red-400 hover:text-red-500 active:scale-95"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
