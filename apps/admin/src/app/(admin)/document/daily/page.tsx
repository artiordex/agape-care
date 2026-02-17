'use client';

import clsx from 'clsx';
import { useState } from 'react';

/**
 * [Page] 일지 작성 관리 (DocumentDaily)
 * 급여제공기록지, 간호일지, 요양일지 등 각종 일지 관리 샘플 페이지
 */
export default function DocumentDailyPage() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const categories = ['전체', '급여제공기록지', '간호일지', '요양일지', '물리치료일지'];

  const mockDocuments = [
    {
      id: 1,
      type: '급여제공기록지',
      title: '2026-02-18 김갑순 어르신 급여제공기록',
      writer: '이요양',
      date: '2026-02-18',
      status: '작성중',
    },
    {
      id: 2,
      type: '간호일지',
      title: '2026-02-18 오전 간호 상태 점검',
      writer: '박간호',
      date: '2026-02-18',
      status: '완료',
    },
    {
      id: 3,
      type: '요양일지',
      title: '2026-02-17 야간 요양 관찰 기록',
      writer: '최요양',
      date: '2026-02-17',
      status: '완료',
    },
    {
      id: 4,
      type: '물리치료일지',
      title: '2026-02-17 물리치료 시행 기록',
      writer: '정물리',
      date: '2026-02-17',
      status: '완료',
    },
    {
      id: 5,
      type: '급여제공기록지',
      title: '2026-02-17 이을순 어르신 급여제공기록',
      writer: '최요양',
      date: '2026-02-17',
      status: '완료',
    },
  ];

  const filteredDocs =
    activeCategory === '전체' ? mockDocuments : mockDocuments.filter(doc => doc.type === activeCategory);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] p-6 font-sans">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-800">일지 작성 관리</h1>
          <p className="mt-1 text-sm text-gray-500">어르신별 일지 및 업무 기록을 관리합니다.</p>
        </div>
        <button className="flex items-center gap-2 rounded bg-[#5C8D5A] px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:bg-[#4A7548]">
          <i className="ri-edit-2-line"></i> 새 일지 작성
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              'rounded-full border px-4 py-1.5 text-xs font-bold transition-all',
              activeCategory === cat
                ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white'
                : 'border-gray-200 bg-white text-gray-500 hover:border-[#5C8D5A] hover:text-[#5C8D5A]',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">일지 유형</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">제목</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">작성자</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">작성 일시</th>
              <th className="px-6 py-4 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">
                상태
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-black uppercase tracking-widest text-gray-400">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDocs.map(doc => (
              <tr key={doc.id} className="transition-colors hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <span className="rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase italic text-[#5C8D5A]">
                    {doc.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-gray-700">{doc.title}</td>
                <td className="px-6 py-4 text-xs text-gray-500">{doc.writer}</td>
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{doc.date}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={clsx(
                      'rounded px-2 py-0.5 text-[10px] font-black uppercase',
                      doc.status === '완료' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600',
                    )}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 transition-colors hover:text-[#5C8D5A]">
                    <i className="ri-settings-3-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
