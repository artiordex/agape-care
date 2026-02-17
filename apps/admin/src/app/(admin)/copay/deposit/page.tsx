'use client';

import clsx from 'clsx';

/**
 * [Page] 본인부담금 입금 관리 (CopayDeposit)
 * 수급자별 입금 내역 매칭, 미납 관리, 영수증 처리 페이지
 */
export default function CopayDepositPage() {
  const depositData = [
    {
      id: 1,
      name: '성기철',
      amount: '432,100',
      bank: '국민은행',
      date: '2026-02-15',
      status: '입금완료',
      type: '가상계좌',
    },
    { id: 2, name: '이춘희', amount: '380,000', bank: '-', date: '-', status: '미납', type: '-' },
    {
      id: 3,
      name: '김민수',
      amount: '250,000',
      bank: '신한은행',
      date: '2026-02-14',
      status: '입금완료',
      type: '자동이체',
    },
    { id: 4, name: '안순옥', amount: '450,000', bank: '-', date: '-', status: '미납', type: '-' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f4f6] p-6 font-sans antialiased">
      <div className="mb-8 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
              Live Deposit Monitoring
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-800">본인부담금 입금 관리</h1>
          <p className="mt-2 text-sm font-medium text-gray-400">
            수급자별 수납 내역을 실시간으로 확인하고 미납 상태를 관리합니다.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Received</p>
            <p className="text-2xl font-black tracking-tighter text-gray-800">
              682,100 <span className="text-sm font-bold text-gray-300">원</span>
            </p>
          </div>
          <div className="h-12 w-[1px] bg-gray-100"></div>
          <div className="text-right">
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Pending Amount</p>
            <p className="text-2xl font-black tracking-tighter text-red-500">
              830,000 <span className="text-sm font-bold text-gray-300">원</span>
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/30 px-8 py-5">
          <span className="text-xs font-black uppercase tracking-widest text-gray-500">실시간 입출금 매칭 현황</span>
          <button className="rounded bg-gray-800 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-gray-200">
            입금 내역 가져오기
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">수급자 성함</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">
                입금 예정 금액
              </th>
              <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                입금 수단
              </th>
              <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                입금 일시
              </th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {depositData.map(doc => (
              <tr key={doc.id} className="group transition-all hover:bg-blue-50/10">
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-gray-700">{doc.name}</p>
                  <p className="text-[10px] font-bold uppercase italic tracking-tighter text-gray-400">{doc.bank}</p>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="font-mono text-sm font-black text-gray-700">{doc.amount}원</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="rounded bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase text-gray-400">
                    {doc.type}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="font-mono text-[10px] font-bold uppercase italic text-gray-400">{doc.date}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span
                    className={clsx(
                      'rounded border px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter shadow-sm',
                      doc.status === '입금완료'
                        ? 'border-blue-100 bg-blue-50 text-blue-600'
                        : 'border-red-100 bg-red-50 text-red-600',
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

      <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
        <span>System Status: Bank Sync Active</span>
        <span>© Agape Care Financial System 2026</span>
      </div>
    </div>
  );
}
