'use client';

import clsx from 'clsx';
import { useState } from 'react';

/**
 * [Page] 일일점검 (DailyInspection)
 * 시설의 일일 안전 및 위생 점검을 관리하는 페이지
 */
export default function DailyInspectionPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const inspectionItems = [
    { id: 1, area: '주방', task: '조리 도구 세척 및 소독 상태 확인', status: '양호', time: '08:30' },
    { id: 2, area: '생활실', task: '냉난방기 작동 및 환기 상태 확인', status: '양호', time: '09:00' },
    { id: 3, area: '화장실', task: '바닥 건조 및 청결 상태 확인', status: '요관찰', time: '10:00' },
    { id: 4, area: '비상구', task: '적치물 방치 여부 점검', status: '양호', time: '11:00' },
    { id: 5, area: '전기실', task: '누전 차단기 및 배전반 육안 점검', status: '양호', time: '13:00' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] p-6 font-sans antialiased">
      {/* 대시보드 헤더 */}
      <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-6">
        <div>
          <h1 className="flex items-center gap-3 text-[28px] font-black tracking-tight text-gray-800">
            <span className="block h-8 w-1.5 bg-[#5C8D5A]"></span>
            일일 시설 점검
          </h1>
          <p className="mt-2 text-sm font-medium italic tracking-wide text-gray-400">
            Daily Facility Safety & Hygiene Protocol
          </p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm outline-none focus:border-[#5C8D5A]"
          />
          <button className="flex items-center gap-2 rounded bg-[#5C8D5A] px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4d754b]">
            <i className="ri-check-double-line text-lg"></i> 점검 완료 등록
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* 요약 카드 */}
        <div className="space-y-4 lg:col-span-1">
          <div className="rounded border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Inspection Result</p>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-600">점검률</span>
              <span className="text-lg font-black text-[#5C8D5A]">80%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[80%] bg-[#5C8D5A]"></div>
            </div>
            <p className="mt-4 text-[10px] leading-relaxed text-gray-400">
              ※ 오늘 총 10개의 점검 항목 중 8개가 완료되었습니다. 미완료 항목은 주방 소독 및 비상벨 테스트입니다.
            </p>
          </div>

          <div className="rounded bg-[#1f2937] p-6 text-white shadow-xl">
            <i className="ri-error-warning-fill mb-4 text-3xl text-orange-400"></i>
            <h4 className="mb-2 text-sm font-bold">특이사항 보고</h4>
            <textarea
              placeholder="특이사항이나 보수가 필요한 내용을 입력하세요..."
              className="h-32 w-full rounded border border-gray-700 bg-gray-800 p-3 text-xs text-gray-300 outline-none transition-all placeholder:text-gray-600 focus:border-orange-400"
            ></textarea>
          </div>
        </div>

        {/* 메인 점검 테이블 */}
        <div className="lg:col-span-3">
          <div className="border border-gray-300 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-6 py-4">
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500">
                <i className="ri-list-check text-lg text-[#5C8D5A]"></i> 점검 항목 리스트
              </span>
              <span className="border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase text-[#5C8D5A]">
                Agape Standard Active
              </span>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-tighter text-gray-400">
                    점검 시간
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-tighter text-gray-400">
                    대상 영역
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-tighter text-gray-400">
                    점검 내용
                  </th>
                  <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-tighter text-gray-400">
                    점검 상태
                  </th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-tighter text-gray-400">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inspectionItems.map(item => (
                  <tr key={item.id} className="transition-colors hover:bg-blue-50/20">
                    <td className="px-6 py-5 font-mono text-xs text-gray-400">{item.time}</td>
                    <td className="px-6 py-5 text-xs font-black text-gray-700">{item.area}</td>
                    <td className="px-6 py-5 text-xs text-gray-500">{item.task}</td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={clsx(
                          'rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest',
                          item.status === '양호'
                            ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
                            : 'border-orange-100 bg-orange-50 text-orange-600',
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-gray-300 hover:text-[#5C8D5A]">
                        <i className="ri-more-fill text-xl"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            <span className="h-1 w-1 animate-pulse rounded-full bg-red-400"></span>
            Automatic Audit Trail is recording this session.
          </div>
        </div>
      </div>
    </div>
  );
}
