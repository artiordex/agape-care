/**
 * Description : AdmissionHistoryTab.tsx - 📋 이미지(image_772f1b.png) 기반 수급자 입소/퇴소 이력 관리
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

// --- 데이터 인터페이스 ---
interface AdmissionHistory {
  id: number;
  type: string; // 최초입소, 재입소, 퇴소 등
  date: string;
  time: string;
  reason: string;
  adjustment: string; // 퇴소정산
  reportDate: string; // 연계기록지 작성일
  reportReason: string; // 연계사유
  isProvided: string; // 제공여부
}

export default function AdmissionHistoryTab() {
  // 📌 실제 데이터 예시 (배열에 데이터를 넣으면 상단부터 채워집니다)
  const [historyData] = useState<AdmissionHistory[]>([
    {
      id: 1,
      type: '최초입소',
      date: '2026.01.06',
      time: '11:00',
      reason: '',
      adjustment: '-',
      reportDate: '',
      reportReason: '',
      isProvided: '-',
    },
  ]);

  const FIXED_ROWS = 10; // 테이블의 일정한 높이 유지를 위한 고정 행 수

  // 공통 스타일 클래스
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-[#2E6A9E]';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900 bg-white text-center h-[38px]';
  const emptyTdClass = 'border border-[#B8D1E0] bg-white h-[38px]';

  return (
    <div className="flex flex-col gap-3 bg-white p-4 font-sans antialiased">
      {/* 1. 상단 타이틀 및 제어 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[14px] font-black text-[#2E6A9E]">
          <i className="ri-play-fill"></i> 수급자 입소/퇴소 이력
        </div>
        <button className="rounded bg-[#57A5CE] px-4 py-1 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#468db3]">
          입소/퇴소 이력 수정
        </button>
      </div>

      {/* 2. 메인 이력 테이블 (이미지 2단 헤더 구조 완벽 재현) */}
      <div className="overflow-hidden border-t-2 border-[#57A5CE]">
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            {/* 1단 헤더 */}
            <tr className="bg-[#E8F1F8]">
              <th rowSpan={2} className={clsx(thClass, 'w-12')}>
                연번
              </th>
              <th colSpan={4} className={thClass}>
                입소/퇴소 정보
              </th>
              <th colSpan={4} className={thClass}>
                연계기록지 정보
              </th>
            </tr>
            {/* 2단 헤더 */}
            <tr className="bg-[#E8F1F8]">
              <th className={thClass}>구분</th>
              <th className={thClass}>일자</th>
              <th className={thClass}>시간</th>
              <th className={thClass}>퇴소사유</th>
              <th className={thClass}>퇴소정산</th>
              <th className={thClass}>작성일</th>
              <th className={thClass}>연계사유</th>
              <th className={thClass}>제공여부</th>
              <th className={clsx(thClass, 'w-16')}>조회</th>
            </tr>
          </thead>
          <tbody>
            {/* 데이터 행 렌더링 */}
            {historyData.map(item => (
              <tr key={item.id}>
                <td className={tdClass}>{item.id}</td>
                <td className={tdClass}>{item.type}</td>
                <td className={tdClass}>{item.date}</td>
                <td className={tdClass}>{item.time}</td>
                <td className={tdClass}>{item.reason}</td>
                <td className={tdClass}>{item.adjustment}</td>
                <td className={tdClass}>{item.reportDate}</td>
                <td className={tdClass}>{item.reportReason}</td>
                <td className={tdClass}>{item.isProvided}</td>
                <td className={tdClass}>
                  <button className="rounded bg-[#7A8B9A] px-2 py-0.5 text-[11px] text-white shadow-inner">조회</button>
                </td>
              </tr>
            ))}
            {/* 나머지 빈 행 공간 채우기 (여백 유지) */}
            {Array.from({ length: Math.max(0, FIXED_ROWS - historyData.length) }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array.from({ length: 10 }).map((_, j) => (
                  <td key={j} className={emptyTdClass}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. 하단 상태 요약 (기존 통계 유지) */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded border border-[#B8D1E0] bg-[#F8FAFC] p-4 text-center">
          <p className="mb-1 text-left text-xs font-bold text-gray-600">총 입소 횟수</p>
          <p className="text-xl font-black text-[#2E6A9E]">{historyData.length}회</p>
        </div>
        <div className="rounded border border-[#B8D1E0] bg-[#F8FAFC] p-4 text-center">
          <p className="mb-1 text-left text-xs font-bold text-gray-600">총 재원 기간</p>
          <p className="text-xl font-black text-[#2E6A9E]">1개월 미만</p>
        </div>
        <div className="rounded border border-[#B8D1E0] bg-[#DCF2D8] p-4 text-center">
          <p className="mb-1 text-left text-xs font-bold text-emerald-700">현재 상태</p>
          <p className="text-xl font-black text-emerald-700">입소중</p>
        </div>
      </div>
    </div>
  );
}
