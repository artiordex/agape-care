'use client';

import React from 'react';
import clsx from 'clsx';

export default function HistoryActionBar({ viewMode, setViewMode }: any) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-white px-2 py-3 font-sans">
      <div className="flex items-center gap-3">
        <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setViewMode('table')}
            className={clsx(
              'flex items-center gap-1.5 rounded-md px-4 py-1.5 text-[11px] font-black transition-all',
              viewMode === 'table' ? 'bg-[#5C8D5A] text-white shadow-md' : 'text-gray-400 hover:text-gray-600',
            )}
          >
            <i className="ri-table-line"></i> 테이블형
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={clsx(
              'flex items-center gap-1.5 rounded-md px-4 py-1.5 text-[11px] font-black transition-all',
              viewMode === 'card' ? 'bg-[#5C8D5A] text-white shadow-md' : 'text-gray-400 hover:text-gray-600',
            )}
          >
            <i className="ri-layout-grid-line"></i> 카드형
          </button>
        </div>
        <span className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
          Result Count: <span className="text-[#5C8D5A]">124</span> Units
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <ActionButton icon="ri-file-excel-2-line" label="Excel" color="text-green-600" />
        <ActionButton icon="ri-file-pdf-line" label="PDF" color="text-red-600" />
        <ActionButton icon="ri-printer-line" label="Print" color="text-gray-600" />
      </div>
    </div>
  );
}

function ActionButton({ icon, label, color }: any) {
  return (
    <button className="flex items-center gap-1.5 rounded border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50">
      <i className={`${icon} ${color}`}></i>
      {label}
    </button>
  );
}
