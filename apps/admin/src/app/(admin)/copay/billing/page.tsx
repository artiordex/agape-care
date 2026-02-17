'use client';

import clsx from 'clsx';

/**
 * [Page] 본인부담금 청구 관리 (CopayBilling)
 * 월별 본인부담금 계산, 청구서 발행 및 문자 발송 관리 페이지
 */
export default function CopayBillingPage() {
  const billingData = [
    { id: 1, name: '성기철', total: '1,245,600', copay: '432,100', status: '청구완료', date: '2026-02-10' },
    { id: 2, name: '이춘희', total: '1,180,000', copay: '380,000', status: '미청구', date: '-' },
    { id: 3, name: '김민수', total: '1,050,000', copay: '250,000', status: '청구완료', date: '2026-02-11' },
    { id: 4, name: '안순옥', total: '1,320,000', copay: '450,000', status: '미청구', date: '-' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] p-6 font-sans antialiased">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded border border-[#5C8D5A]/10 bg-[#5C8D5A]/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#5C8D5A]">
              Financial Protocol
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-800">본인부담금 청구 관리</h1>
          <p className="mt-1 text-sm font-medium italic text-gray-400">Copay Billing & Invoice Generation Matrix</p>
        </div>
        <button className="rounded-lg bg-[#5C8D5A] px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-100 transition-all hover:bg-[#4d754b]">
          일괄 청구서 생성
        </button>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: '청구 대상', value: '45명', icon: 'ri-user-heart-line', color: 'bg-blue-500' },
          { label: '미청구 건수', value: '12건', icon: 'ri-error-warning-line', color: 'bg-orange-500' },
          { label: '청구 완료 건수', value: '33건', icon: 'ri-check-double-line', color: 'bg-emerald-500' },
          { label: '총 청구 금액', value: '15,482,000원', icon: 'ri-money-dollar-circle-line', color: 'bg-slate-800' },
        ].map(stat => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
              <p className="text-xl font-black text-gray-800">{stat.value}</p>
            </div>
            <div
              className={clsx(
                'flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white shadow-lg',
                stat.color,
              )}
            >
              <i className={stat.icon}></i>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest opacity-60">수급자 성함</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest opacity-60">
                총 장기요양급여
              </th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-emerald-400 opacity-60">
                실 본인부담금
              </th>
              <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest opacity-60">
                최종 청구일
              </th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest opacity-60">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {billingData.map(doc => (
              <tr key={doc.id} className="group cursor-pointer transition-all hover:bg-blue-50/20">
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-gray-700 transition-colors group-hover:text-blue-600">
                    {doc.name}
                  </p>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="font-mono text-xs font-bold tracking-tighter text-gray-400">{doc.total}원</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="font-mono text-sm font-black tracking-tighter text-emerald-600">{doc.copay}원</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="font-mono text-[10px] font-bold uppercase italic leading-none text-gray-400">
                    {doc.date}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span
                    className={clsx(
                      'rounded-full border px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter shadow-sm',
                      doc.status === '청구완료'
                        ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
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
  );
}
