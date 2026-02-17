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
  readonly selectedIds: string[];
  readonly onSelectionChange: (ids: string[]) => void;
}

/**
 * [컴포넌트] 자동 근무 배정 대상자 선택 리스트
 * 아가페 그린(#5C8D5A) 테마 및 고딕체·직각형 UI 적용
 */
export default function StaffSelectionList({ staffList, selectedIds, onSelectionChange }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. 실시간 필터링 로직 (고딕체 기반 검색)
  const filteredList = staffList.filter(
    staff => staff.name.includes(searchTerm) || staff.position.includes(searchTerm),
  );

  // 2. 전체 선택/해제 프로토콜
  const toggleAll = () => {
    if (selectedIds.length === filteredList.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(filteredList.map(s => s.id));
    }
  };

  // 3. 개별 인력 노드 선택 토글
  const toggleStaff = (id: string) => {
    const nextIds = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    onSelectionChange(nextIds);
  };

  return (
    <div className="flex h-full flex-col rounded-none border border-gray-300 bg-white font-sans text-gray-900 antialiased shadow-inner">
      {/* A. 리스트 헤더 및 검색 컨트롤 */}
      <div className="space-y-3 border-b border-gray-200 bg-[#f8fafc] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-group-line text-[#5C8D5A]"></i>
            <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">배정 대상 인원 설정</h4>
          </div>
          <span className="rounded-none border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-[#5C8D5A]">
            선택됨: {selectedIds.length} / {staffList.length} 명
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="직원 성명 또는 직종으로 검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-none border border-gray-300 bg-white px-3 py-2.5 pl-9 text-[12px] font-bold text-gray-700 shadow-inner outline-none transition-all focus:border-[#5C8D5A]"
          />
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* B. 데이터 그리드 필드 헤더 */}
      <div className="flex items-center border-b border-gray-200 bg-gray-100 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <div className="flex w-10 justify-center">
          <input
            type="checkbox"
            checked={selectedIds.length > 0 && selectedIds.length === filteredList.length}
            onChange={toggleAll}
            className="h-4 w-4 cursor-pointer rounded-none border-2 border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
          />
        </div>
        <div className="flex-1 px-3 italic">직원 식별 정보 (성명 / 직종)</div>
        <div className="w-20 text-center italic">재직 상태</div>
      </div>

      {/* C. 고밀도 인력 리스트 스크롤 영역 */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {filteredList.length > 0 ? (
          filteredList.map(staff => {
            const isSelected = selectedIds.includes(staff.id);
            return (
              <div
                key={staff.id}
                onClick={() => toggleStaff(staff.id)}
                className={clsx(
                  'flex cursor-pointer items-center border-b border-gray-50 px-4 py-3 transition-colors',
                  isSelected ? 'bg-emerald-50/50' : 'hover:bg-gray-50',
                )}
              >
                <div className="flex w-10 justify-center">
                  <input
                    type="checkbox"
                    readOnly
                    checked={isSelected}
                    className="h-4 w-4 cursor-pointer rounded-none border-2 border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                  />
                </div>
                <div className="flex-1 px-3">
                  <div className="flex items-center gap-2">
                    <span className={clsx('text-[13px] font-black', isSelected ? 'text-[#5C8D5A]' : 'text-gray-900')}>
                      {staff.name}
                    </span>
                    <span className="rounded-none border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-400">
                      {staff.position}
                    </span>
                  </div>
                </div>
                <div className="w-20 text-center">
                  <span className="text-[10px] font-black italic text-emerald-600">{staff.status}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <i className="ri-user-search-line mb-2 text-4xl text-gray-100"></i>
            <p className="text-[12px] font-bold italic text-gray-300">검색 결과와 일치하는 직원이 없습니다.</p>
          </div>
        )}
      </div>

      {/* D. 하단 마스터 노드 상태 가이드 */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2">
        <span className="text-[9px] font-black uppercase italic tracking-widest text-gray-400">
          Data Node: HR_Master_Sync_Active
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onSelectionChange([])}
            className="text-[10px] font-black uppercase text-gray-400 transition-colors hover:text-red-500"
          >
            전체 선택 해제
          </button>
        </div>
      </div>
    </div>
  );
}
