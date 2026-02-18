/**
 * Description : OutingRecordsTable.tsx - ?? OutingRecordsTable UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React from 'react';
import clsx from 'clsx';

interface OutingRecord {
  id: number;
  type: '외출' | '외박' | '병원외래';
  departureDate: string;
  departureTime: string;
  returnDate?: string;
  returnTime?: string;
  expectedReturnDate: string;
  expectedReturnTime: string;
  destination: string;
  purpose: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  hospital?: string;
  status: '진행중' | '복귀완료' | '복귀미처리';
}

interface Props {
  readonly records: OutingRecord[];
  readonly onViewDetail: (record: OutingRecord) => void;
  readonly onReturn: (record: OutingRecord) => void;
}

export default function OutingRecordsTable({ records, onViewDetail, onReturn }: Props) {
  // 케어포 스타일 공통 클래스
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-2 text-center text-[12px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1.5 text-[12px] text-gray-900 bg-white text-center h-[38px]';

  return (
    <div className="flex flex-col gap-2 font-sans antialiased">
      {/* 테이블 상단 안내 (image_81aa93.png 재현) */}
      <div className="mb-1 flex items-end justify-between">
        <div className="flex items-center gap-1 text-[14px] font-black text-[#2E6A9E]">
          <i className="ri-play-fill"></i> 2026년 외출, 외박 이력
        </div>
        <div className="text-[11px] font-bold text-gray-600">
          ※ <span className="mr-1 inline-block h-3 w-3 border border-red-500 bg-white align-middle"></span> :{' '}
          <span className="font-black text-red-600">복귀 미처리</span>
        </div>
      </div>

      {/* 메인 그리드 영역 */}
      <div className="overflow-x-auto border-t-2 border-[#57A5CE]">
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr className="bg-[#E8F1F8]">
              <th className={clsx(thClass, 'w-10')}>연번</th>
              <th className={clsx(thClass, 'w-14')}>구분</th>
              <th className={thClass}>일자</th>
              <th className={thClass}>시간</th>
              <th className={thClass}>복귀일</th>
              <th className={thClass}>시간</th>
              <th className={thClass}>행선지</th>
              <th className={thClass}>목적</th>
              <th className={thClass}>보호자</th>
              <th className={thClass}>관계</th>
              <th className={thClass}>전화번호</th>
              <th className={thClass}>병원</th>
              <th className={clsx(thClass, 'w-16')}>조회</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => {
                const isLate = record.status === '복귀미처리'; //

                return (
                  <tr key={record.id} className="hover:bg-blue-50/50">
                    <td className={tdClass}>{index + 1}</td>
                    <td className={tdClass}>{record.type}</td>
                    <td className={tdClass}>{record.departureDate}</td>
                    <td className={tdClass}>{record.departureTime}</td>
                    {/* 복귀 정보: 미처리 시 빨간색 강조 */}
                    <td className={clsx(tdClass, isLate && 'font-bold text-red-600')}>
                      {record.returnDate || record.expectedReturnDate}
                    </td>
                    <td className={clsx(tdClass, isLate && 'font-bold text-red-600')}>
                      {record.returnTime || record.expectedReturnTime}
                    </td>
                    <td className={clsx(tdClass, 'truncate text-left')}>{record.destination}</td>
                    <td className={clsx(tdClass, 'truncate text-left')}>{record.purpose}</td>
                    <td className={tdClass}>{record.guardianName}</td>
                    <td className={tdClass}>{record.guardianRelation}</td>
                    <td className={tdClass}>{record.guardianPhone}</td>
                    <td className={tdClass}>{record.hospital || '-'}</td>
                    <td className={tdClass}>
                      <button
                        onClick={() => onViewDetail(record)}
                        className="rounded bg-[#57A5CE] px-2 py-0.5 text-[11px] text-white shadow-inner hover:bg-[#468db3]"
                      >
                        조회
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={13} className={clsx(tdClass, 'h-40 italic text-gray-400')}>
                  조회된 외출·외박 이력이 없습니다.
                </td>
              </tr>
            )}
            {/* 고정 여백 유지를 위한 빈 행 (필요 시 추가) */}
            {Array.from({ length: Math.max(0, 10 - records.length) }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array.from({ length: 13 }).map((_, j) => (
                  <td key={j} className="h-[38px] border border-[#B8D1E0] bg-white"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
