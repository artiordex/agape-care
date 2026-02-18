/**
 * Description : page.tsx - ?? document/physical ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

/**
 * [Page] 물리 치료 관리 (DocumentPhysical)
 * 물리/작업 치료 대상자 관리 및 일일 처치 이력 관리
 */
export default function DocumentPhysicalPage() {
  const therapyRecords = [
    {
      id: 1,
      name: '성기철',
      room: '101호',
      therapy: '적외선 치료 (L-Back)',
      status: '진행완료',
      duration: '20분',
      time: '10:00',
    },
    {
      id: 2,
      name: '이춘희',
      room: '103호',
      therapy: '작업치료 (소근육 운동)',
      status: '진행완료',
      duration: '30분',
      time: '11:00',
    },
    {
      id: 3,
      name: '김민수',
      room: '201호',
      therapy: '슬링 운동 치료',
      status: '진행중',
      duration: '40분',
      time: '14:00',
    },
    {
      id: 4,
      name: '안순옥',
      room: '202호',
      therapy: '간섭파 요법 (ICT)',
      status: '대기',
      duration: '15분',
      time: '15:30',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f7f9] p-6 font-sans">
      <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-8">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tighter text-gray-800">
            <i className="ri-pulse-line text-[#5C8D5A]"></i> 물리/작업 치료 관리
          </h1>
          <p className="mt-1 text-sm font-medium italic tracking-wide text-gray-400">
            Physical & Occupational Therapy Archive
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4 rounded-full border border-gray-200 bg-white px-6 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Active Devices: 08</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Queue: 03</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
        {/* 장비 상태 모니터링 */}
        <div className="space-y-6 xl:col-span-1">
          <h3 className="px-1 text-xs font-black uppercase tracking-widest text-gray-400">Therapy Station Status</h3>
          {[
            { name: 'BST-101 (적외선)', status: 'In Use', color: 'bg-emerald-500' },
            { name: 'BST-102 (적외선)', status: 'Ready', color: 'bg-gray-200' },
            { name: 'ICT-201 (간섭파)', status: 'Service', color: 'bg-red-400' },
            { name: 'OT-Table (작업)', status: 'In Use', color: 'bg-emerald-500' },
          ].map(device => (
            <div
              key={device.name}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
            >
              <span className="text-xs font-black text-gray-700">{device.name}</span>
              <div className="flex items-center gap-2">
                <span className={clsx('h-1.5 w-1.5 rounded-full', device.color)}></span>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">{device.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 치료 리스트 */}
        <div className="xl:col-span-3">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100 bg-[#f8fafc]">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    어르신 / 생활실
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    치료 항목
                  </th>
                  <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    처치시간
                  </th>
                  <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    진행시간
                  </th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {therapyRecords.map(doc => (
                  <tr key={doc.id} className="group transition-all hover:bg-blue-50/20">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-gray-700">{doc.name}</p>
                      <p className="text-[10px] font-bold text-gray-400">{doc.room}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-black italic text-gray-600 transition-colors group-hover:text-blue-600">
                        {doc.therapy}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center font-mono text-xs font-bold italic text-gray-400">
                      {doc.time}
                    </td>
                    <td className="px-8 py-6 text-center text-xs font-black text-[#5C8D5A]">{doc.duration}</td>
                    <td className="px-8 py-6 text-right">
                      <span
                        className={clsx(
                          'rounded border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm',
                          doc.status === '진행완료'
                            ? 'border-gray-200 bg-gray-100 text-gray-400'
                            : doc.status === '진행중'
                              ? 'animate-pulse border-blue-100 bg-blue-50 text-blue-600'
                              : 'border-orange-100 bg-orange-50 text-orange-600',
                        )}
                      >
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
