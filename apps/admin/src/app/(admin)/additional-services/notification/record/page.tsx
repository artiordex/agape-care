/**
 * Description : page.tsx - 발송 로그/이력 조회 (Carefor Style / Agape Care ERP Theme)
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';
import Header from './Header';

// 가상 데이터 인터페이스
interface NotificationLog {
  id: number;
  sentAt: string;
  residentName: string;
  recipientName: string;
  category: string;
  method: string;
  deduction: number;
  contact: string;
  content: string;
}

export default function NotificationLogPage() {
  const [activeTab, setActiveTab] = useState('history');
  const [startDate, setStartDate] = useState('2026-02-01');
  const [endDate, setEndDate] = useState('2026-02-18');
  const [residentSearch, setResidentSearch] = useState('');
  const [recipientSearch, setRecipientSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [methodFilter, setMethodFilter] = useState('전체');
  const [contactSearch, setContactSearch] = useState('');
  const [contentSearch, setContentSearch] = useState('');

  // 샘플 데이터
  const [logs] = useState<NotificationLog[]>([
    {
      id: 1,
      sentAt: '2026-02-17 14:30',
      residentName: '김철수',
      recipientName: '김영희',
      category: '청구안내',
      method: '알림톡',
      deduction: 1,
      contact: '010-1234-5678',
      content: '2월분 시설 이용료 청구 안내...',
    },
    {
      id: 2,
      sentAt: '2026-02-16 10:15',
      residentName: '이영희',
      recipientName: '박지민',
      category: '일반공지',
      method: 'SMS',
      deduction: 1,
      contact: '010-1111-2222',
      content: '시설 정기 소독 일정 안내드립니다.',
    },
    {
      id: 3,
      sentAt: '2026-02-15 16:45',
      residentName: '박정수',
      recipientName: '최현우',
      category: '건강검진',
      method: 'LMS',
      deduction: 3,
      contact: '010-3333-4444',
      content: '오는 목요일 정기 건강검진이 예정되어 있습니다.',
    },
  ]);

  const handleDownload = () => {
    alert('발송 내역 엑셀 다운로드를 시작합니다.');
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans text-gray-800 antialiased">
      <Header onDownload={handleDownload} />

      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3 pt-4">
        {/* 상단 탭 (Carefor Style) */}
        <div className="flex border-b-2 border-[#5C8D5A] bg-white">
          <button
            onClick={() => setActiveTab('history')}
            className={clsx(
              'px-6 py-2 text-[13px] font-bold transition-all',
              activeTab === 'history' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:bg-gray-50',
            )}
          >
            안내 발송 내역
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={clsx(
              'px-6 py-2 text-[13px] font-bold transition-all',
              activeTab === 'results' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:bg-gray-50',
            )}
          >
            전송 결과 상세
          </button>
        </div>

        {/* 필터 영역 */}
        <div className="flex flex-col gap-2 border border-[#B8D1E0] bg-white p-2 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold">
            <span className="min-w-[60px] whitespace-nowrap text-gray-600">발송기간 :</span>
            <div className="flex items-center gap-1">
              <input
                type="date"
                className="border border-[#B8D1E0] px-2 py-1 outline-none"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                className="border border-[#B8D1E0] px-2 py-1 outline-none"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="수급자명"
              className="w-24 border border-[#B8D1E0] px-2 py-1 italic outline-none placeholder:text-gray-300"
              value={residentSearch}
              onChange={e => setResidentSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="수신자명"
              className="w-24 border border-[#B8D1E0] px-2 py-1 italic outline-none placeholder:text-gray-300"
              value={recipientSearch}
              onChange={e => setRecipientSearch(e.target.value)}
            />

            <select
              className="border border-[#B8D1E0] bg-white px-2 py-1 font-bold outline-none"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option>전체 발송구분</option>
              <option>청구안내</option>
              <option>일반공지</option>
              <option>긴급알림</option>
            </select>

            <select
              className="border border-[#B8D1E0] bg-white px-2 py-1 font-bold outline-none"
              value={methodFilter}
              onChange={e => setMethodFilter(e.target.value)}
            >
              <option>전체 발송방법</option>
              <option>알림톡</option>
              <option>SMS</option>
              <option>LMS</option>
            </select>

            <input
              type="text"
              placeholder="주소/핸드폰/이메일주소"
              className="min-w-[150px] flex-1 border border-[#B8D1E0] px-2 py-1 italic outline-none placeholder:text-gray-300"
              value={contactSearch}
              onChange={e => setContactSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="내용"
              className="min-w-[150px] flex-1 border border-[#B8D1E0] px-2 py-1 italic outline-none placeholder:text-gray-300"
              value={contentSearch}
              onChange={e => setContentSearch(e.target.value)}
            />

            <button className="rounded-sm bg-[#8FA1B0] px-5 py-1 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#7D8E9D]">
              조회
            </button>
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className="flex flex-1 flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-left text-[11px]">
              <thead className="sticky top-0 z-10 border-b border-[#B8D1E0] bg-[#E8F1F8] font-bold text-gray-600">
                <tr>
                  <th className="w-12 border-r border-[#B8D1E0] px-3 py-2 text-center">연번</th>
                  <th className="w-28 border-r border-[#B8D1E0] px-3 py-2">발송일시</th>
                  <th className="w-20 border-r border-[#B8D1E0] px-3 py-2">수급자명</th>
                  <th className="w-20 border-r border-[#B8D1E0] px-3 py-2">수신자명</th>
                  <th className="w-24 border-r border-[#B8D1E0] px-3 py-2">발송구분</th>
                  <th className="w-20 border-r border-[#B8D1E0] px-3 py-2">발송방법</th>
                  <th className="w-16 border-r border-[#B8D1E0] px-3 py-2 text-center">문자차감</th>
                  <th className="w-40 border-r border-[#B8D1E0] px-3 py-2">주소/핸드폰/이메일</th>
                  <th className="px-3 py-2">내용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-gray-400">
                      조회된 알림 발송 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  logs.map((log, idx) => (
                    <tr key={log.id} className="group transition-colors hover:bg-blue-50/50">
                      <td className="border-r border-gray-100 px-3 py-2.5 text-center text-gray-400">{idx + 1}</td>
                      <td className="border-r border-gray-100 px-3 py-2.5 font-medium">{log.sentAt}</td>
                      <td className="border-r border-gray-100 px-3 py-2.5 font-bold">{log.residentName}</td>
                      <td className="border-r border-gray-100 px-3 py-2.5">{log.recipientName}</td>
                      <td className="border-r border-gray-100 px-3 py-2.5">
                        <span className="font-bold text-[#5C8D5A]">{log.category}</span>
                      </td>
                      <td className="border-r border-gray-100 px-3 py-2.5">{log.method}</td>
                      <td className="border-r border-gray-100 px-3 py-2.5 text-center font-bold text-blue-600">
                        {log.deduction}
                      </td>
                      <td className="border-r border-gray-100 px-3 py-2.5 text-gray-500">{log.contact}</td>
                      <td className="max-w-xs truncate px-3 py-2.5" title={log.content}>
                        {log.content}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 푸터 통계 (Carefor Style) */}
          <div className="flex items-center justify-between border-t border-[#B8D1E0] bg-[#E8F1F8] p-2 text-[11px] font-bold text-[#5C8D5A]">
            <div className="flex gap-4">
              <span>‣ 알림톡 : 0건 (0개 차감)</span>
              <span>‣ SMS : 0건 (0개 차감)</span>
              <span>‣ LMS : 0건 (0개 차감)</span>
              <span>‣ MMS : 0건 (0개 차감)</span>
              <span>
                ‣ 전체 : {logs.length}건 ({logs.reduce((acc, curr) => acc + curr.deduction, 0)}개 차감)
              </span>
            </div>
            <div className="flex gap-4 italic text-gray-400">
              <span>‣ 알림톡 : 건당 1개</span>
              <span>‣ SMS : 건당 1개</span>
              <span>‣ LMS : 건당 3개</span>
              <span>‣ MMS : 건당 15개</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
