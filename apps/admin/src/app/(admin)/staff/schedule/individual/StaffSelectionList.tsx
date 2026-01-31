'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface Staff {
  id: string;
  name: string;
  position: string;
  status: string;
}

interface Props {
  readonly staffList: Staff[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}

/**
 * [Component] 개인 상세 관제용 인력 선택 사이드바
 * 고딕체 및 완전 직각형 UI 적용
 */
export default function StaffSelectionList({ staffList, selectedId, onSelect }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = staffList.filter(
    staff => staff.name.includes(searchTerm) || staff.position.includes(searchTerm),
  );

  return (
    <div className="flex h-[700px] flex-col overflow-hidden rounded-none border border-gray-300 bg-white shadow-sm">
      {/* 검색 헤더 */}
      <div className="space-y-3 border-b border-gray-200 bg-[#f8fafc] p-4">
        <div className="flex items-center gap-2">
          <i className="ri-user-search-line text-[#5C8D5A]"></i>
          <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">조회 대상 인력 필터</h4>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="성명 또는 직종 검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-none border border-gray-300 bg-white px-3 py-2.5 pl-9 text-[12px] font-bold text-gray-700 shadow-inner outline-none transition-all focus:border-[#5C8D5A]"
          />
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* 인력 노드 리스트 */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {filteredList.map(staff => {
          const isActive = selectedId === staff.id;
          return (
            <div
              key={staff.id}
              onClick={() => onSelect(staff.id)}
              className={clsx(
                'flex cursor-pointer items-center border-b border-gray-50 px-4 py-4 transition-all',
                isActive ? 'bg-emerald-50 shadow-[inset_4px_0_0_#5C8D5A]' : 'hover:bg-gray-50',
              )}
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className={clsx('text-[14px] font-black', isActive ? 'text-[#5C8D5A]' : 'text-gray-900')}>
                    {staff.name}
                  </span>
                  <span className="text-[9px] font-black uppercase italic tracking-tighter text-gray-300">
                    ID: {staff.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-none border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-bold uppercase italic text-gray-400">
                    {staff.position}
                  </span>
                  <span className="text-[10px] font-black uppercase text-emerald-600/60">{staff.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 시스템 가이드 */}
      <div className="border-t border-gray-200 bg-gray-50 p-3">
        <p className="text-center text-[9px] font-black uppercase italic tracking-widest text-gray-300">
          Personal Analysis Interface Active
        </p>
      </div>
    </div>
  );
}
