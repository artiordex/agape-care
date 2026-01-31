'use client';

import React from 'react';
import clsx from 'clsx';

interface OutingRecord {
  id: number;
  residentId: number;
  residentName: string;
  type: '외출' | '외박' | '병원외래';
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  expectedReturnDate: string;
  expectedReturnTime: string;
  destination: string;
  purpose: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  hospital?: string;
  notes: string;
  status: '진행중' | '복귀완료' | '복귀미처리';
  createdAt: string;
  createdBy: string;
}

interface Props {
  readonly records: OutingRecord[];
  readonly onViewDetail: (record: OutingRecord) => void;
  readonly onEdit: (record: OutingRecord) => void;
  readonly onReturn: (record: OutingRecord) => void;
}

/**
 * [Component] 외출·외박 이력 관리 그리드
 * 아가페 그린(#5C8D5A) 테마 및 복귀 미처리 강조 UI 적용
 */
export default function OutingRecordsTable({ records, onViewDetail, onEdit, onReturn }: Props) {
  // 구분별 배지 색상 매핑
  const getTypeStyle = (type: string) => {
    switch (type) {
      case '외출':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case '외박':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case '병원외래':
        return 'bg-emerald-50 text-[#5C8D5A] border-emerald-100';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white font-sans antialiased shadow-sm">
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {/* 테이블 헤더: 고밀도 ERP 스타일 */}
          <thead className="border-b border-gray-200 bg-[#f8fafc] text-[10px] font-black uppercase tracking-tighter text-gray-500">
            <tr>
              <th className="px-4 py-3 text-center">No.</th>
              <th className="px-4 py-3">구분</th>
              <th className="px-4 py-3 text-center">출발 일시</th>
              <th className="px-4 py-3 text-center">복귀(예정) 일시</th>
              <th className="px-4 py-3">행선지 / 목적</th>
              <th className="px-4 py-3">인도 보호자</th>
              <th className="px-4 py-3">연락처</th>
              <th className="px-4 py-3">비고(병원)</th>
              <th className="px-4 py-3 text-right">관제 액션</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-[12px]">
            {records.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-20 text-center">
                  <i className="ri-file-list-3-line mb-2 block text-4xl text-gray-200"></i>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    검색된 외출·외박 이력이 없습니다
                  </p>
                </td>
              </tr>
            ) : (
              records.map((record, index) => {
                const isLate = record.status === '복귀미처리';

                return (
                  <tr
                    key={record.id}
                    className={clsx(
                      'group transition-colors',
                      isLate ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-gray-50/50',
                    )}
                  >
                    {/* 1. 연번 및 상태 표시 */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center">
                        {isLate && (
                          <span className="mb-1 flex h-1.5 w-1.5 animate-pulse rounded-full bg-red-600"></span>
                        )}
                        <span className="font-mono text-[11px] font-bold text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </td>

                    {/* 2. 구분 배지 */}
                    <td className="px-4 py-4">
                      <span
                        className={clsx(
                          'rounded-sm border px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter shadow-sm',
                          getTypeStyle(record.type),
                        )}
                      >
                        {record.type}
                      </span>
                    </td>

                    {/* 3. 출발 정보 */}
                    <td className="px-4 py-4 text-center">
                      <div className="font-mono text-[11px] font-bold leading-none text-gray-700">
                        {record.departureDate}
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-gray-400">{record.departureTime}</div>
                    </td>

                    {/* 4. 복귀 정보 (복귀 완료 여부에 따른 색상 변화) */}
                    <td className="px-4 py-4 text-center">
                      <div
                        className={clsx(
                          'font-mono text-[11px] font-black leading-none',
                          record.returnDate ? 'text-[#5C8D5A]' : isLate ? 'text-red-600' : 'text-gray-400',
                        )}
                      >
                        {record.returnDate || record.expectedReturnDate}
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-gray-400">
                        {record.returnTime || record.expectedReturnTime}
                      </div>
                    </td>

                    {/* 5. 행선지 및 목적 */}
                    <td className="px-4 py-4">
                      <div className="max-w-[120px] truncate text-[12px] font-black tracking-tight text-gray-800">
                        {record.destination}
                      </div>
                      <div className="mt-0.5 max-w-[120px] truncate text-[10px] font-medium text-gray-400">
                        {record.purpose}
                      </div>
                    </td>

                    {/* 6. 보호자 정보 */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-bold text-gray-700">{record.guardianName}</span>
                        <span className="text-[10px] font-black uppercase italic text-gray-300">
                          {record.guardianRelation}
                        </span>
                      </div>
                    </td>

                    {/* 7. 연락처 */}
                    <td className="px-4 py-4 font-mono text-[11px] font-bold text-gray-500">{record.guardianPhone}</td>

                    {/* 8. 비고 (병원명 등) */}
                    <td className="px-4 py-4">
                      <p className="max-w-[100px] truncate text-[11px] font-bold text-gray-400">
                        {record.hospital || record.notes || '-'}
                      </p>
                    </td>

                    {/* 9. 관리 액션 */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => onViewDetail(record)}
                          className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]"
                        >
                          상세
                        </button>
                        {record.status !== '복귀완료' && (
                          <>
                            <button
                              onClick={() => onEdit(record)}
                              className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-[10px] font-black text-gray-600 transition-all hover:border-orange-400 hover:text-orange-500"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => onReturn(record)}
                              className="rounded-md border border-[#5C8D5A] bg-emerald-50 px-2.5 py-1.5 text-[10px] font-black text-[#5C8D5A] shadow-sm transition-all hover:bg-[#5C8D5A] hover:text-white"
                            >
                              복귀처리
                            </button>
                          </>
                        )}
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
