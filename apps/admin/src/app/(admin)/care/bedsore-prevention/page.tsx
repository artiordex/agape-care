'use client';

import clsx from 'clsx';

/**
 * [Page] 욕창예방 관리 (BedsorePrevention)
 * 고위험 수급자의 체위 변경 및 욕창 발생 부위 집중 관리 페이지
 */
export default function BedsorePreventionPage() {
  const records = [
    {
      id: 1,
      name: '이옥자',
      room: '101호',
      status: '고위험',
      lastChange: '14:00',
      position: '우측 가로놓기',
      nextChange: '16:00',
      manager: '김요양',
    },
    {
      id: 2,
      name: '박태식',
      room: '102호',
      status: '요관찰',
      lastChange: '14:30',
      position: '좌측 가로놓기',
      nextChange: '16:30',
      manager: '최요양',
    },
    {
      id: 3,
      name: '한영자',
      room: '201호',
      status: '안전',
      lastChange: '13:00',
      position: '바로 눕기',
      nextChange: '17:00',
      manager: '박요양',
    },
    {
      id: 4,
      name: '최봉출',
      room: '202호',
      status: '고위험',
      lastChange: '15:00',
      position: '바로 눕기',
      nextChange: '17:00',
      manager: '김요양',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f5f9] p-6 font-sans antialiased">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tighter text-gray-800">
            <i className="ri-shield-cross-line text-red-500"></i> 욕창 예방 관리
          </h1>
          <p className="mt-1 text-sm font-medium italic text-gray-500">Bedsore Prevention & Position Change Protocol</p>
        </div>
        <div className="flex gap-10 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-center">
            <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">High Risk</p>
            <p className="text-center text-lg font-black uppercase tracking-tighter text-red-500">
              03 <span className="text-[10px] text-gray-300">Pers.</span>
            </p>
          </div>
          <div className="text-center">
            <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">Due Now</p>
            <p className="text-center text-lg font-black uppercase tracking-tighter text-orange-500">
              02 <span className="text-[10px] text-gray-300">Tasks</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        {/* 집중 관리 구역 알림 */}
        <div className="space-y-6 xl:col-span-1">
          <div className="rounded-2xl bg-[#1e293b] p-6 text-white shadow-xl">
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Position Change Map</h3>
            <div className="relative flex aspect-square items-center justify-center rounded-lg border border-slate-700 bg-slate-800">
              <div className="flex h-48 w-24 items-center justify-center rounded-full border-2 border-slate-600">
                <div className="h-32 w-1 rounded-full bg-slate-700"></div>
              </div>
              {/* 핫스팟 예시 */}
              <div className="absolute left-1/2 top-1/4 h-4 w-4 animate-ping rounded-full bg-red-400/30"></div>
              <div className="absolute left-1/2 top-1/4 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></div>
            </div>
            <p className="mt-6 text-center text-[10px] italic leading-relaxed text-gray-400">
              ※ 현재 미골 어르신 2명, 천골 어르신 1명 집중 관리 중입니다. 체위 변경 시 피부 상태를 반드시 사진으로
              기록해 주세요.
            </p>
          </div>
        </div>

        {/* 메인 관리 테이블 */}
        <div className="xl:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-50 px-8 py-5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">실시간 체위 변경 현황</span>
              <button className="text-[10px] font-bold text-blue-500 hover:underline">일괄 기록하기</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    대상자 정보
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    위험 등급
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    최근 변경 / 체위
                  </th>
                  <th className="px-8 py-4 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    다음 변경
                  </th>
                  <th className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {records.map(doc => (
                  <tr key={doc.id} className="transition-colors hover:bg-blue-50/10">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-gray-800">{doc.name}</p>
                      <p className="text-[10px] font-medium text-gray-400">{doc.room}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={clsx(
                          'rounded border px-2.5 py-1 text-[10px] font-black uppercase tracking-tighter',
                          doc.status === '고위험'
                            ? 'border-red-100 bg-red-50 text-red-500'
                            : doc.status === '요관찰'
                              ? 'border-orange-100 bg-orange-50 text-orange-500'
                              : 'border-gray-100 bg-gray-50 text-gray-400',
                        )}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black italic tracking-tighter text-gray-600">
                        {doc.lastChange} <i className="ri-arrow-right-s-line text-gray-300"></i>
                      </p>
                      <p className="mt-1 text-[10px] font-bold text-blue-500">{doc.position}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={clsx(
                          'font-mono text-xs font-black',
                          doc.nextChange <= '16:00' ? 'animate-pulse text-red-500' : 'text-gray-400',
                        )}
                      >
                        {doc.nextChange}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="rounded bg-gray-800 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-gray-200">
                        변경 기록
                      </button>
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
