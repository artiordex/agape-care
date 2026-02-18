/**
 * Description : page.tsx - ?? document/program ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

/**
 * [Page] 프로그램 계획서 (DocumentProgram)
 * 시설 내 인지, 신체, 여가 등 각종 프로그램 운영 계획 및 결과 관리
 */
export default function DocumentProgramPage() {
  const programs = [
    {
      id: 1,
      type: '인지기능',
      title: '기억력 향상 실버 퀴즈',
      date: '2026-02-18',
      manager: '최복지',
      status: '결과보고대기',
      attendees: 12,
    },
    {
      id: 2,
      name: '신체기능',
      title: '활력 쑥쑥 실버 요가',
      date: '2026-02-17',
      manager: '박강사',
      status: '완료',
      attendees: 15,
    },
    {
      id: 3,
      name: '여가활동',
      title: '노래교실 및 레크리에이션',
      date: '2026-02-16',
      manager: '김복지',
      status: '완료',
      attendees: 20,
    },
    {
      id: 4,
      name: '사회심리',
      title: '어르신 생신 잔치',
      date: '2026-02-15',
      manager: '최복지',
      status: '완료',
      attendees: 45,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] p-6 font-sans">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-800">프로그램 계획 및 보고</h1>
          <p className="mt-1 text-sm font-medium italic text-gray-400">Integrated Social Welfare Program Protocol</p>
        </div>
        <button className="flex items-center gap-2 rounded bg-[#5C8D5A] px-6 py-2.5 text-xs font-black text-white shadow-lg shadow-emerald-50 transition-all hover:bg-[#4d754b]">
          <i className="ri-file-add-line text-lg"></i> 새 계획서 작성
        </button>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded border border-t-4 border-gray-200 border-t-emerald-500 bg-white p-6 shadow-sm">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">This Month Target</p>
          <p className="text-3xl font-black text-gray-800">
            24 / <span className="text-emerald-500">30</span>
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            80.2% Compliance Rate
          </p>
        </div>
        <div className="rounded border border-t-4 border-gray-200 border-t-blue-500 bg-white p-6 shadow-sm">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Attendees</p>
          <p className="text-3xl font-black text-gray-800">
            482 <span className="text-sm text-blue-500">Pers.</span>
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            YTD Accumulated Stats
          </p>
        </div>
        <div className="rounded border border-t-4 border-gray-200 border-t-orange-500 bg-white p-6 shadow-sm">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Pending Reports</p>
          <p className="text-3xl font-black text-gray-800">
            03 <span className="text-sm text-orange-500">Reports</span>
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            Action Required ASAP
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b border-gray-100 bg-[#f8fafc]">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                프로그램 유형 / 제목
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">진행일자</th>
              <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                참여인원
              </th>
              <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                담당자
              </th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">
                진행 상태
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {programs.map(doc => (
              <tr key={doc.id} className="cursor-pointer transition-all hover:bg-blue-50/20">
                <td className="px-8 py-6">
                  <span className="mb-1 inline-block rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-black uppercase italic tracking-tighter text-blue-500">
                    {doc.type}
                  </span>
                  <h4 className="text-sm font-black text-gray-700">{doc.title}</h4>
                </td>
                <td className="px-8 py-6">
                  <span className="font-mono text-xs font-bold italic tracking-tighter text-gray-400">{doc.date}</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-xs font-black text-gray-500">{doc.attendees}명</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-xs font-bold text-gray-600">{doc.manager}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span
                    className={clsx(
                      'rounded px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter shadow-sm',
                      doc.status === '완료'
                        ? 'bg-gray-100 text-gray-400'
                        : 'border border-orange-100 bg-orange-50 text-orange-600',
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
  );
}
