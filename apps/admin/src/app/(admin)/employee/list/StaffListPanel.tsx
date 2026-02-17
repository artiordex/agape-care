'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface Staff {
  id: string;
  name: string;
  status: string;
  position: string;
  gender: string;
  hireDate: string;
}

interface Props {
  readonly staffList: Staff[];
  readonly selectedStaffId: string;
  readonly onStaffSelect: (id: string) => void;
  readonly onNewStaff: () => void;
}

/**
 * [Component] 직원 목록 필터링 및 실시간 관제 리스트
 * 아가페 그린(#5C8D5A) 테마 및 직각형 고밀도 그리드 적용
 */
export default function StaffListPanel({ staffList, selectedStaffId, onStaffSelect, onNewStaff }: Props) {
  const [activeFilter, setActiveFilter] = useState('status');
  const [searchName, setSearchName] = useState('');

  // 탭 구성 정의
  const filterTabs = [
    { id: 'status', label: '재직 현황' },
    { id: 'position', label: '담당 직종' },
    { id: 'name', label: '이름 조회' },
  ];

  return (
    <div className="flex h-full flex-col border-r border-gray-300 font-sans antialiased">
      {/* 1. 상단 관제 필터 탭 (직각형) */}
      <div className="flex border-b border-gray-300 bg-[#f8fafc]">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={clsx(
              'flex-1 rounded-none border-r border-gray-200 px-3 py-3 text-[11px] font-black uppercase tracking-tighter transition-all',
              activeFilter === tab.id
                ? 'bg-white text-[#5C8D5A] shadow-[inset_0_3px_0_#5C8D5A]'
                : 'text-gray-400 hover:bg-gray-100',
            )}
          >
            {tab.label}
          </button>
        ))}
        {/* 신규 등록 퀵 버튼 */}
        <button
          onClick={onNewStaff}
          className="flex-1 rounded-none bg-[#5C8D5A] px-3 py-3 text-[11px] font-black text-white shadow-inner transition-all hover:bg-[#4A7548]"
        >
          직원 퀵 등록
        </button>
      </div>

      {/* 2. 이름 조회 검색 바 (필터 활성 시 노출) */}
      {activeFilter === 'name' && (
        <div className="animate-in slide-in-from-top-1 border-b border-gray-200 bg-white p-3">
          <div className="relative">
            <input
              type="text"
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              placeholder="직원 성명으로 정밀 검색..."
              className="w-full rounded-none border border-gray-300 bg-gray-50 px-3 py-2 text-[12px] font-bold text-gray-700 shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
            />
            <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      )}

      {/* 3. 직원 데이터 그리드 (고밀도 ERP 스타일) */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <table className="w-full border-collapse text-[12px]">
          <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-100 text-[10px] font-black uppercase tracking-tighter text-gray-400">
            <tr>
              <th className="border-r border-gray-200 px-2 py-3 text-center">NO</th>
              <th className="border-r border-gray-200 px-2 py-3 text-center">Status</th>
              <th className="border-r border-gray-200 px-3 py-3 text-left">Name</th>
              <th className="border-r border-gray-200 px-2 py-3 text-center">Sex</th>
              <th className="border-r border-gray-200 px-3 py-3 text-left">Role</th>
              <th className="px-2 py-3 text-center">Hire Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {staffList.map((staff, index) => {
              const isSelected = selectedStaffId === staff.id;
              return (
                <tr
                  key={staff.id}
                  onClick={() => onStaffSelect(staff.id)}
                  className={clsx(
                    'cursor-pointer transition-all hover:bg-emerald-50/50',
                    isSelected ? 'bg-emerald-50 shadow-[inset_4px_0_0_#5C8D5A]' : '',
                  )}
                >
                  <td className="border-r border-gray-50 px-2 py-3 text-center font-mono font-bold italic text-gray-300">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="border-r border-gray-50 px-2 py-3 text-center">
                    <span
                      className={clsx(
                        'rounded-none border px-1.5 py-0.5 text-[10px] font-black',
                        staff.status === '재직'
                          ? 'border-emerald-200 bg-emerald-100 text-[#5C8D5A]'
                          : 'border-gray-200 bg-gray-100 text-gray-400',
                      )}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td
                    className={clsx(
                      'border-r border-gray-50 px-3 py-3 font-black',
                      isSelected ? 'text-[#5C8D5A]' : 'text-gray-900',
                    )}
                  >
                    {staff.name}
                  </td>
                  <td className="border-r border-gray-50 px-2 py-3 text-center font-bold text-gray-500">
                    {staff.gender}
                  </td>
                  <td className="border-r border-gray-50 px-3 py-3 font-bold text-gray-600">{staff.position}</td>
                  <td className="px-2 py-3 text-center font-mono text-[10px] font-bold italic text-gray-400">
                    {staff.hireDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 하단 관제 상태 바 */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-[#f8fafc] px-4 py-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">HR Data Stream Active</span>
        <div className="h-1.5 w-1.5 animate-pulse bg-[#5C8D5A]"></div>
      </div>
    </div>
  );
}
