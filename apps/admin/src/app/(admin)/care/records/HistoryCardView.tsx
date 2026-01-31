'use client';

import React from 'react';

export default function HistoryCardView({ data, onSelect }: any) {
  return (
    <div className="grid grid-cols-1 gap-4 p-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((record: any) => (
        <div
          key={record.id}
          onClick={() => onSelect(record)}
          className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#5C8D5A] hover:shadow-lg"
        >
          <div className="mb-4 flex items-start justify-between border-b border-gray-50 pb-3">
            <div>
              <h3 className="text-[14px] font-black text-[#5C8D5A] group-hover:underline">{record.beneficiaryName}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{record.room}</p>
            </div>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[9px] font-black uppercase text-[#5C8D5A]">
              {record.status}
            </span>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded border border-gray-100 bg-[#f8fafc] px-2 py-0.5 text-[10px] font-black text-gray-500">
              {record.type}
            </span>
            <span className="font-mono text-[10px] font-bold italic text-gray-300">{record.date}</span>
          </div>
          <p className="mb-4 line-clamp-2 h-8 text-[11px] leading-relaxed text-gray-600">{record.summary}</p>
          <div className="flex items-center justify-between border-t border-gray-50 pt-3">
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-black text-gray-400">
                {record.author[0]}
              </div>
              <span className="text-[10px] font-bold text-gray-500">{record.author}</span>
            </div>
            <i className="ri-arrow-right-line text-[#5C8D5A] opacity-0 transition-opacity group-hover:opacity-100"></i>
          </div>
        </div>
      ))}
    </div>
  );
}
