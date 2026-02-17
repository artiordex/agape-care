'use client';

import clsx from 'clsx';

/**
 * [Page] 수급자 간호 기록 (DailyNursing)
 * 바이탈 체크, 혈당 측정, 투약 여부 등 일일 간호 처치 기록 관리
 */
export default function DailyNursingPage() {
  const nursingRecords = [
    {
      id: 1,
      name: '이을순',
      room: '101호',
      vital: '120/80 - 72 - 36.5',
      bs: '142',
      medication: '완료',
      note: '안정적인 상태 유지 중',
      time: '09:30',
    },
    {
      id: 2,
      name: '김복남',
      room: '102호',
      vital: '135/85 - 80 - 36.8',
      bs: '110',
      medication: '거부',
      note: '혈압약 복용 거부하여 보호자 상담 예정',
      time: '10:15',
    },
    {
      id: 3,
      name: '박금자',
      room: '201호',
      vital: '110/70 - 68 - 36.2',
      bs: '125',
      medication: '완료',
      note: '욕창 부위 드레싱 시행함',
      time: '11:00',
    },
    {
      id: 4,
      name: '최장수',
      room: '205호',
      vital: '128/82 - 75 - 36.6',
      bs: '190',
      medication: '완료',
      note: '혈당 수치 높아 식이 조절 권고',
      time: '13:30',
    },
    {
      id: 5,
      name: '정옥순',
      room: '302호',
      vital: '118/72 - 70 - 36.4',
      bs: '105',
      medication: '완료',
      note: '정상',
      time: '15:20',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f7f9] p-6 font-sans">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-blue-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Medical Care Logs</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-800">수급자 간호 기록</h1>
          <p className="mt-1 text-sm font-medium text-gray-400">
            실시간 바이탈 사인 및 간호 처치 내역을 기록하고 모니터링합니다.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-end">
            <span className="mb-1 text-[10px] font-bold uppercase italic tracking-tighter text-gray-400">
              Last Sync
            </span>
            <span className="font-mono text-xs font-bold text-gray-600">2026-02-18 17:44:32</span>
          </div>
          <button className="flex items-center gap-2 rounded border border-gray-200 bg-white px-6 py-2 text-xs font-black text-gray-700 shadow-sm transition-all hover:border-blue-500">
            <i className="ri-history-line"></i> 과거 기록 조회
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-8 py-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-600">금일 간호 처치 현황</h3>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
            5 Records Found Today
          </span>
        </div>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">성함/생활실</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                바이탈 (BP-PR-BT)
              </th>
              <th className="px-8 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                혈당
              </th>
              <th className="px-8 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                투약
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                간호 요약/특이사항
              </th>
              <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-gray-400">
                기록 시간
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {nursingRecords.map(doc => (
              <tr key={doc.id} className="transition-all hover:bg-blue-50/20">
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-gray-700">{doc.name}</p>
                  <p className="text-[10px] font-bold text-blue-500">{doc.room}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="rounded border border-gray-200 bg-gray-100 px-3 py-1 font-mono text-xs font-bold italic text-gray-600 shadow-inner">
                    {doc.vital}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span
                    className={clsx('text-xs font-black', Number(doc.bs) > 150 ? 'text-red-500' : 'text-emerald-600')}
                  >
                    {doc.bs} <span className="ml-0.5 text-[10px] font-normal text-gray-300">mg/dL</span>
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span
                    className={clsx(
                      'rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-tighter',
                      doc.medication === '완료'
                        ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
                        : 'border-red-100 bg-red-50 text-red-600 shadow-sm',
                    )}
                  >
                    {doc.medication}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <p className="max-w-xs truncate text-xs text-gray-500">{doc.note}</p>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="font-mono text-[10px] font-black italic text-gray-300">{doc.time}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 pb-12 md:grid-cols-2">
        <div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-6">
          <i className="ri-error-warning-fill text-3xl text-red-500"></i>
          <div>
            <h4 className="text-sm font-black text-red-700">고위험 수급자 리마인더</h4>
            <p className="mt-1 text-xs leading-relaxed text-red-600">
              최장수 어르신 혈당 190mg/dL 측정되었습니다. 담당의 보고 및 식이 제한 필요 여부 검토해 주세요.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <i className="ri-check-double-line text-3xl text-emerald-500"></i>
          <div>
            <h4 className="text-sm font-black text-emerald-700">모니터링 정상 지표</h4>
            <p className="mt-1 text-xs leading-relaxed text-emerald-600">
              이을순 어르신 외 3명 바이탈 사인 정상 범위 내로 안정적인 상태 유지 중입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
