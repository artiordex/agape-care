'use client';

import clsx from 'clsx';

export default function HistoryTableView({ data, onSelect }: any) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '마감':
        return 'bg-emerald-50 text-[#5C8D5A] border-emerald-100';
      case '작성중':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      default:
        return 'bg-gray-50 text-gray-400 border-gray-200';
    }
  };

  return (
    <div className="w-full overflow-hidden font-sans">
      <table className="w-full border-collapse text-[11px]">
        <thead className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50">
          <tr className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
            <th className="w-12 p-3 text-center">No.</th>
            <th className="w-24 p-3 text-center">기록일자</th>
            <th className="w-32 p-3 text-left">수급자명</th>
            <th className="w-24 p-3 text-center">생활실</th>
            <th className="w-24 p-3 text-center">기록유형</th>
            <th className="w-20 p-3 text-center">상태</th>
            <th className="p-3 text-left">요약 및 특이사항</th>
            <th className="w-24 p-3 text-center">작성자</th>
            <th className="w-16 p-3 text-center">상세</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row: any, index: number) => (
            <tr key={row.id} className="group transition-colors hover:bg-emerald-50/30">
              <td className="p-3 text-center font-mono text-gray-300">{index + 1}</td>
              <td className="p-3 text-center font-mono font-bold text-gray-600">{row.date}</td>
              <td className="p-3 font-black text-[#5C8D5A]">{row.beneficiaryName}</td>
              <td className="p-3 text-center font-bold text-gray-500">{row.room}</td>
              <td className="p-3 text-center">
                <span className="rounded bg-gray-100 px-2 py-0.5 font-bold text-gray-600">{row.type}</span>
              </td>
              <td className="p-3 text-center">
                <span
                  className={clsx(
                    'rounded border px-2 py-0.5 text-[10px] font-black shadow-sm',
                    getStatusStyle(row.status),
                  )}
                >
                  {row.status}
                </span>
              </td>
              <td className="max-w-xs truncate p-3 text-gray-600">{row.summary}</td>
              <td className="p-3 text-center font-bold text-gray-400">{row.author}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => onSelect(row)}
                  className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]"
                >
                  조회
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
