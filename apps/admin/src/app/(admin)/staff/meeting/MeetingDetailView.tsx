'use client';

import React from 'react';
import clsx from 'clsx';
import { MeetingRecord } from './meeting.type';

interface Props {
  readonly record: MeetingRecord;
  readonly onClose: () => void;
}

/**
 * [Component] 회의록 상세 조회 및 인쇄용 고밀도 프로토콜
 * 장기요양기관 평가 증빙용 공식 문서 레이아웃 적용
 */
export default function MeetingDetailView({ record, onClose }: Props) {
  const isCommittee = record.category === 'committee';

  // 인쇄 실행 핸들러
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[250] flex flex-col bg-gray-100 font-sans text-gray-900 antialiased print:bg-white">
      {/* 1. 상단 관제 바 (인쇄 시 숨김) */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-300 bg-white px-8 py-4 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-gray-400 transition-all hover:text-gray-900"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="text-[12px] font-black uppercase tracking-widest">Back to List</span>
          </button>
          <div className="mx-2 h-4 w-[1px] bg-gray-200"></div>
          <h2 className="text-[15px] font-black uppercase italic text-gray-800">Document Preview Mode</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#5C8D5A] px-6 py-2.5 text-[12px] font-black text-white shadow-lg transition-all hover:bg-[#4A7548] active:scale-95"
          >
            <i className="ri-printer-line text-lg"></i>
            회의록 정식 출력
          </button>
          <button onClick={onClose} className="p-2 text-gray-400 transition-all hover:text-red-500">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      </div>

      {/* 2. 메인 문서 영역 (A4 비율 최적화) */}
      <div className="flex-1 overflow-y-auto p-12 print:overflow-visible print:p-0">
        <div className="mx-auto max-w-[800px] bg-white p-[60px] shadow-2xl ring-1 ring-gray-200 print:shadow-none print:ring-0">
          {/* 문서 타이틀 헤더 */}
          <div className="mb-12 border-b-4 border-gray-900 pb-6 text-center">
            <h1 className="text-[28px] font-black uppercase tracking-[0.2em] text-gray-900">
              {isCommittee ? '운 영 위 원 회  회 의 록' : '보 호 자  소 통  간 담 회 록'}
            </h1>
            <p className="mt-2 text-[11px] font-bold uppercase italic tracking-[0.3em] text-gray-400">
              Agape Medical Welfare Facility Protocol
            </p>
          </div>

          {/* 결재란 (Sign Area) */}
          <div className="mb-8 flex justify-end">
            <table className="w-64 border-collapse border border-gray-400 text-[11px] font-black">
              <tbody>
                <tr>
                  <td rowSpan={2} className="w-8 border border-gray-400 bg-gray-50 py-4 text-center">
                    결<br />재
                  </td>
                  <td className="border border-gray-400 py-1 text-center">작 성</td>
                  <td className="border border-gray-400 py-1 text-center">의 장</td>
                  <td className="border border-gray-400 py-1 text-center">시 설 장</td>
                </tr>
                <tr className="h-16">
                  <td className="border border-gray-400 pb-1 text-center align-bottom font-normal italic text-gray-200">
                    印
                  </td>
                  <td className="border border-gray-400 pb-1 text-center align-bottom font-normal italic text-gray-200">
                    印
                  </td>
                  <td className="border border-gray-400 pb-1 text-center align-bottom font-normal italic text-gray-200">
                    印
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 기본 행정 사항 테이블 */}
          <table className="w-full border-collapse border-2 border-gray-900 text-[12px]">
            <tbody>
              <tr>
                <th className="w-24 border border-gray-300 bg-gray-100 p-3 text-left font-black">회의 일시</th>
                <td className="border border-gray-300 p-3 font-mono font-bold tracking-tighter">
                  {record.date} ({record.startTime} ~ {record.endTime})
                </td>
                <th className="w-24 border border-gray-300 bg-gray-100 p-3 text-left font-black">작성자</th>
                <td className="border border-gray-300 p-3 font-bold">{record.writer}</td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">회의 장소</th>
                <td className="border border-gray-300 p-3 font-bold">{record.location}</td>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">참석 인원</th>
                <td className="border border-gray-300 p-3 font-bold">{record.participants.length}명</td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">회의 주제</th>
                <td colSpan={3} className="border border-gray-300 p-3 text-[14px] font-black text-[#5C8D5A]">
                  {record.title}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">참석자 명단</th>
                <td colSpan={3} className="border border-gray-300 p-3 font-medium leading-relaxed">
                  {record.participants.join(', ')}
                </td>
              </tr>

              {/* 회의 내용 본문 */}
              <tr>
                <td colSpan={4} className="border border-gray-300 p-0">
                  <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-[10px] font-black uppercase italic text-gray-400">
                    Meeting Minute Details (회의 기록 상세)
                  </div>
                  <div className="min-h-[400px] whitespace-pre-wrap p-8 text-[13px] font-medium leading-[1.8]">
                    {record.content}
                  </div>
                </td>
              </tr>

              {/* 결과 및 결의사항 */}
              <tr>
                <td colSpan={4} className="border border-gray-300 p-0">
                  <div className="border-b border-gray-200 bg-[#5C8D5A]/5 px-4 py-2 text-[10px] font-black uppercase italic text-[#5C8D5A]">
                    Resolutions & Results (결의 및 조치 사항)
                  </div>
                  <div className="min-h-[150px] whitespace-pre-wrap p-8 text-[13px] font-black italic leading-[1.8] text-gray-800">
                    {record.result || '해당 사항 없음'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* 운영위원회 전용 체크사항 (인쇄용 시각화) */}
          {isCommittee && record.committeeOptions && (
            <div className="mt-8 grid grid-cols-3 gap-4 border border-gray-200 bg-gray-50 p-6">
              <PrintCheckItem label="종사자 처우개선 의견수렴" checked={record.committeeOptions.staffOpinion} />
              <PrintCheckItem label="노인학대예방 교육/의견" checked={record.committeeOptions.abusePrevention} />
              <PrintCheckItem label="종사자 처우개선 의견반영" checked={record.committeeOptions.treatmentReflected} />
            </div>
          )}

          {/* 하단 문서 정보 */}
          <div className="mt-12 flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest text-gray-300">
            <span>Agape_Meeting_Audit_System_v4.2</span>
            <span>Page 01 of 01</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print-hidden {
            display: none !important;
          }
          @page {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

/** [Sub] 인쇄용 체크박스 컴포넌트 */
function PrintCheckItem({ label, checked }: any) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={clsx(
          'flex h-5 w-5 items-center justify-center border-2',
          checked ? 'border-[#5C8D5A] bg-[#5C8D5A]' : 'border-gray-300 bg-white',
        )}
      >
        {checked && <i className="ri-check-line text-[14px] text-white"></i>}
      </div>
      <span className={clsx('text-[11px] font-black', checked ? 'text-gray-900' : 'text-gray-300')}>{label}</span>
    </div>
  );
}
