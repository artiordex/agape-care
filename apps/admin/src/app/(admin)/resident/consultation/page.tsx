/**
 * Description : page.tsx - ?? resident/consultation ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';
import ConsultationLogModal from './modals/ConsultationLogModal';

/**
 * [Page] 상담 및 면담 관리 (ConsultationManagement)
 * 정기 상담 일지 및 신규 수급자 초기 면담 기록 관리
 */
export default function ConsultationManagementPage() {
  const [activeTab, setActiveTab] = useState<'consultation' | 'interview'>('consultation');
  const [isConsultationLogModalOpen, setIsConsultationLogModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedResident, setSelectedResident] = useState<any>(null);

  const handleOpenConsultationModal = (row: any, quarterIdx: number) => {
    // Only open if in consultation tab (or both if needed, but request specified quarterly)
    setSelectedResident(row);
    // You might want to pass which quarter was clicked
    setSelectedRecord({ ...row, quarter: quarterIdx });
    setIsConsultationLogModalOpen(true);
  };

  // 모의 데이터 - 상담일지 (Tab 1)
  const consultationData = [
    {
      id: 1,
      status: '입소중',
      name: '코코넛땅콩실',
      displayDate: '1월3일',
      room: '2호실',
      grade: '2등급',
      admissionDate: '2026.01.03',
      q1: { status: 'COMPLETE', text: '입소 2026.01.03', date: '' },
      q2: { status: 'UNWRITTEN', text: '미작성', date: '' },
      q3: { status: 'UNWRITTEN', text: '미작성', date: '' },
      q4: { status: 'UNWRITTEN', text: '미작성', date: '' },
    },
    // ... more data
  ];

  // 모의 데이터 - 신규 수급자 면담 (Tab 2)
  const interviewData = [
    {
      id: 1,
      status: '입소중',
      name: '코코넛땅콩실',
      displayDate: '1월3일',
      grade: '2등급',
      admissionDate: '2026.01.03',
      s1: { status: 'UNWRITTEN', text: '미작성', period: '2026.01.03 ~ 2026.01.09' },
      s2: { status: 'UNWRITTEN', text: '미작성', period: '2026.01.10 ~ 2026.01.16' },
      s3: { status: 'UNWRITTEN', text: '미작성', period: '2026.01.17 ~ 2026.01.23' },
      s4: { status: 'UNWRITTEN', text: '미작성', period: '2026.01.24 ~ 2026.01.30' },
    },
    {
      id: 2,
      status: '입소중',
      name: 'ㅁㄴㅇㄹ', // Matching screenshot placeholder?
      displayDate: 'ㅁㄴㅇㄹ',
      grade: '등급외',
      admissionDate: '2026.01.27',
      s1: { status: 'UNWRITTEN', text: '미작성', period: '2026.01.27 ~ 2026.02.02' },
      s2: { status: 'UNWRITTEN', text: '미작성', period: '2026.02.03 ~ 2026.02.09' },
      s3: { status: 'UNWRITTEN', text: '미작성', period: '2026.02.10 ~ 2026.02.16' },
      s4: { status: 'UNWRITTEN', text: '미작성', period: '2026.02.17 ~ 2026.02.23' },
    },
  ];

  const currentData = activeTab === 'consultation' ? consultationData : interviewData;

  // 스타일 클래스
  const thClass =
    'border border-[#B8D1E0] bg-[#E8F1F8] py-2 text-center text-[12px] font-bold text-[#333] tracking-tight';
  const summaryThClass =
    'border border-[#B8D1E0] bg-[#F1F8FF] py-1 text-center text-[11px] font-bold text-[#2E6A9E] tracking-tight';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] text-[#333]';
  const unwrittenClass = 'bg-[#FFF9C4] text-gray-600'; // 노란 배경

  return (
    <div className="flex min-h-screen flex-col bg-white p-6 font-sans">
      {/* 1. 탭 네비게이션 */}
      <div className="flex border-b-[3px] border-[#57A5CE]">
        <button
          onClick={() => setActiveTab('consultation')}
          className={clsx(
            'px-6 py-2 text-[14px] font-bold transition-colors',
            activeTab === 'consultation'
              ? 'z-10 mb-[-3px] rounded-t-lg border-l-2 border-r-2 border-t-2 border-[#57A5CE] bg-white pb-3 text-[#57A5CE]'
              : 'mb-[0px] ml-1 rounded-t-lg bg-[#57A5CE] text-white hover:bg-[#468db3]',
          )}
        >
          상담일지
        </button>
        <button
          onClick={() => setActiveTab('interview')}
          className={clsx(
            'ml-1 px-6 py-2 text-[14px] font-bold transition-colors',
            activeTab === 'interview'
              ? 'z-10 mb-[-3px] rounded-t-lg border-l-2 border-r-2 border-t-2 border-[#57A5CE] bg-white pb-3 text-[#57A5CE]'
              : 'mb-[0px] rounded-t-lg bg-[#57A5CE] text-white hover:bg-[#468db3]',
          )}
        >
          신규 수급자 면담일지
        </button>
      </div>

      {/* 2. 컨트롤 바 */}
      <div className="mt-4 flex items-center justify-between border-b border-[#B8D1E0] bg-[#E8F1F8] px-4 py-2">
        <div className="flex items-center gap-2">
          <button className="rounded border border-[#9CA3AF] bg-gradient-to-b from-[#7A8B9A] to-[#5F7183] px-3 py-1.5 text-[12px] font-bold text-white shadow-sm hover:from-[#6A7B8A] hover:to-[#4F6173]">
            현황선택
          </button>
          <button className="rounded border border-[#9CA3AF] bg-gradient-to-b from-[#7A8B9A] to-[#5F7183] px-3 py-1.5 text-[12px] font-bold text-white shadow-sm hover:from-[#6A7B8A] hover:to-[#4F6173]">
            생활실선택
          </button>
          <button className="rounded border border-[#9CA3AF] bg-gradient-to-b from-[#7A8B9A] to-[#5F7183] px-3 py-1.5 text-[12px] font-bold text-white shadow-sm hover:from-[#6A7B8A] hover:to-[#4F6173]">
            등급선택
          </button>
          <div className="flex items-center rounded border border-[#B8D1E0] bg-white px-2 py-1">
            <input type="text" placeholder="이름조회" className="w-24 text-[12px] outline-none" />
            {/* <button><i className="ri-search-line text-gray-400"></i></button> */}
          </div>
        </div>

        {/* 날짜 네비게이터 */}
        <div className="flex items-center gap-4">
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#57A5CE] text-white hover:bg-[#468db3]">
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <span className="text-[16px] font-black text-[#333]">2026년</span>
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#57A5CE] text-white hover:bg-[#468db3]">
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        {/* 우측 버튼 (상담일지 탭일 때만) */}
        {activeTab === 'consultation' ? (
          <button className="rounded bg-[#57A5CE] px-4 py-1.5 text-[12px] font-bold text-white shadow-md hover:bg-[#468db3]">
            전체 상담내역
            <span className="block text-[10px] font-normal">(급여반영 4건)</span>
          </button>
        ) : (
          <div className="w-[120px]"></div>
        )}
      </div>

      {/* 3. 데이터 테이블 */}
      <div className="overflow-x-auto border-t-2 border-[#5C8D5A]">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col w-width="50px" style={{ width: '50px' }} />
            <col w-width="70px" style={{ width: '70px' }} />
            <col w-width="80px" style={{ width: '80px' }} />
            <col w-width="100px" style={{ width: '100px' }} />
            <col w-width="70px" style={{ width: '70px' }} />
            {activeTab === 'interview' && <col w-width="100px" style={{ width: '100px' }} />}
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th className={thClass}>연번</th>
              <th className={thClass}>현황</th>
              <th className={thClass}>수급자명</th>
              <th className={thClass}>생활실</th>
              <th className={thClass}>등급</th>
              {activeTab === 'interview' && <th className={thClass}>입소일</th>}
              <th className={thClass}>{activeTab === 'consultation' ? '1분기' : '1회차'}</th>
              <th className={thClass}>{activeTab === 'consultation' ? '2분기' : '2회차'}</th>
              <th className={thClass}>{activeTab === 'consultation' ? '3분기' : '3회차'}</th>
              <th className={thClass}>{activeTab === 'consultation' ? '4분기' : '4회차'}</th>
            </tr>
            {/* Summary Row */}
            <tr className="bg-[#F8FBFF]">
              <td
                className={summaryThClass}
                colSpan={activeTab === 'interview' ? 6 : 5}
                style={{ textAlign: 'center', paddingRight: '10px' }}
              >
                * 상담수급자수 / 대상자수
              </td>
              <td className={summaryThClass}>{activeTab === 'consultation' ? '12 / 105' : '0 / 40'}</td>
              <td className={summaryThClass}>{activeTab === 'consultation' ? '2 / 138' : '0 / 40'}</td>
              <td className={summaryThClass}>{activeTab === 'consultation' ? '0 / 138' : '0 / 40'}</td>
              <td className={summaryThClass}>{activeTab === 'consultation' ? '0 / 137' : '0 / 39'}</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row: any) => (
              <tr key={row.id} className="h-[60px] hover:bg-gray-50">
                <td className={tdClass}>{row.id}</td>
                <td className={clsx(tdClass, 'font-bold')}>{row.status}</td>
                <td className={tdClass}>
                  {activeTab === 'consultation' ? (
                    <div className="flex flex-col">
                      <span>{row.displayDate}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span>{row.displayDate}</span>
                      <span className="text-[11px] font-bold">{row.name}</span>
                    </div>
                  )}
                </td>
                <td className={tdClass}>
                  {activeTab === 'consultation' ? (
                    <div className="flex flex-col leading-tight">
                      <span className="text-[11px]">{row.name}</span>
                      <span className="text-[11px] text-gray-500">{row.room}</span>
                    </div>
                  ) : (
                    row.room
                  )}
                </td>
                <td className={tdClass}>{row.grade}</td>
                {activeTab === 'interview' && <td className={tdClass}>{row.admissionDate}</td>}

                {/* Dynamic Columns based on Tab */}
                {[1, 2, 3, 4].map(idx => {
                  const key = activeTab === 'consultation' ? `q${idx}` : `s${idx}`;
                  const item = row[key];
                  return (
                    <td
                      key={idx}
                      className={clsx(
                        tdClass,
                        item.status === 'UNWRITTEN' && unwrittenClass,
                        'cursor-pointer hover:bg-blue-50',
                      )}
                      onClick={() => handleOpenConsultationModal(row, idx)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-bold">{item.text}</span>
                        {item.period && <span className="mt-1 text-[10px] text-gray-500">({item.period})</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConsultationLogModal
        isOpen={isConsultationLogModalOpen}
        onClose={() => setIsConsultationLogModalOpen(false)}
        resident={selectedResident}
        record={selectedRecord}
      />
    </div>
  );
}
