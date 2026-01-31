'use client';

import React, { useState } from 'react';

interface Props {
  accounts: any[];
  onAddAccount: () => void;
}

/**
 * [3] 계정과목 관리 탭
 * 계정 체계 조회, 필터링 및 관리 UI
 */
export default function AccountTab({ accounts, onAddAccount }: Props) {
  const [filterClass, setFilterClass] = useState('all');

  // 계정 분류별 한글 레이블 및 색상 설정
  const classMap: Record<string, { label: string; color: string }> = {
    asset: { label: '자산', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    liability: { label: '부채', color: 'text-red-700 bg-red-50 border-red-200' },
    equity: { label: '자본', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    revenue: { label: '수익', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    expense: { label: '비용', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  };

  const filteredAccounts = accounts.filter(a => filterClass === 'all' || a.accountClass === filterClass);

  return (
    <div className="animate-in fade-in space-y-3 text-[11px] duration-500">
      {/* 1. 계정 분류 필터 및 액션 바 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border border-gray-300 bg-white p-2 shadow-sm">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilterClass('all')}
            className={`border px-3 py-1 font-bold ${filterClass === 'all' ? 'border-[#1a5a96] bg-[#1a5a96] text-white' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            전체
          </button>
          {Object.entries(classMap).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setFilterClass(key)}
              className={`border px-3 py-1 font-bold transition-colors ${
                filterClass === key
                  ? 'border-[#1a5a96] bg-[#1a5a96] text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          <div className="relative flex items-center gap-2 border border-gray-300 bg-gray-50 px-2 py-1">
            <i className="ri-search-line text-gray-400"></i>
            <input type="text" placeholder="계정명/코드 검색" className="w-32 bg-transparent outline-none" />
          </div>
          <button
            onClick={onAddAccount}
            className="flex items-center gap-1 bg-[#1a5a96] px-4 py-1 font-bold text-white hover:bg-[#144675]"
          >
            <i className="ri-add-line"></i> 계정과목 등록
          </button>
        </div>
      </div>

      {/* 2. 계정 리스트 테이블 (고밀도) */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-300 bg-[#eef3f8] font-bold text-gray-600">
            <tr>
              <th className="w-20 border-r border-gray-300 p-2">계정코드</th>
              <th className="border-r border-gray-300 p-2 text-left text-blue-900">계정과목명</th>
              <th className="w-24 border-r border-gray-300 p-2">분류</th>
              <th className="w-32 border-r border-gray-300 p-2">계정유형</th>
              <th className="w-20 border-r border-gray-300 p-2">사용여부</th>
              <th className="w-20 p-2">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAccounts.map(account => (
              <tr key={account.id} className="transition-colors hover:bg-blue-50/50">
                <td className="border-r border-gray-200 p-1.5 text-center font-mono font-bold text-gray-500">
                  {account.code}
                </td>
                <td className="border-r border-gray-200 p-1.5 font-black text-gray-800">{account.name}</td>
                <td className="border-r border-gray-200 p-1.5 text-center">
                  <span
                    className={`rounded-sm border px-2 py-0.5 text-[10px] font-bold ${classMap[account.accountClass]?.color}`}
                  >
                    {classMap[account.accountClass]?.label}
                  </span>
                </td>
                <td className="border-r border-gray-200 p-1.5 text-center text-gray-600">{account.accountType}</td>
                <td className="border-r border-gray-200 p-1.5 text-center">
                  {account.isActive ? (
                    <span className="font-bold text-emerald-600">사용</span>
                  ) : (
                    <span className="text-gray-300">미사용</span>
                  )}
                </td>
                <td className="flex justify-center gap-2 p-1.5 text-center">
                  <button className="text-blue-600 hover:underline">수정</button>
                  <button className="text-red-400 hover:text-red-600">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 하단 요약 정보 */}
      <div className="flex items-center justify-between px-2 text-[10px] font-bold text-gray-500">
        <div className="flex gap-3">
          <span>• 검색 결과: {filteredAccounts.length}건</span>
          <span>• 사용중인 계정: {filteredAccounts.filter(a => a.isActive).length}건</span>
        </div>
        <p>* 시스템 기본 계정과목은 삭제가 불가능합니다.</p>
      </div>
    </div>
  );
}
