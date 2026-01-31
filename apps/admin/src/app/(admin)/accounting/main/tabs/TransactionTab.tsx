'use client';

import React, { useState } from 'react';

interface Props {
  transactions: any[];
  onDelete: (id: string) => void;
}

/**
 * [5] 상세 내역 탭
 * 다중 필터링 기능을 갖춘 고밀도 회계 장부 리스트
 */
export default function TransactionTab({ transactions, onDelete }: Props) {
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    payment: 'all',
    query: '',
  });

  const filteredData = transactions.filter(t => {
    const matchType = filters.type === 'all' || t.type === filters.type;
    const matchCategory = filters.category === 'all' || t.category === filters.category;
    const matchPayment = filters.payment === 'all' || t.paymentMethod === filters.payment;
    const matchQuery = t.description.includes(filters.query);
    return matchType && matchCategory && matchPayment && matchQuery;
  });

  return (
    <div className="animate-in fade-in space-y-3 text-[11px] duration-500">
      {/* 1. 고급 필터 섹션 */}
      <div className="border border-gray-300 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-1">
            <label className="ml-0.5 text-[10px] font-bold text-gray-500">거래구분</label>
            <select
              value={filters.type}
              onChange={e => setFilters({ ...filters, type: e.target.value })}
              className="w-full border border-gray-300 p-1.5 outline-none focus:border-blue-500"
            >
              <option value="all">전체 구분</option>
              <option value="income">수입 (+)</option>
              <option value="expense">지출 (-)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="ml-0.5 text-[10px] font-bold text-gray-500">결제방법</label>
            <select
              value={filters.payment}
              onChange={e => setFilters({ ...filters, payment: e.target.value })}
              className="w-full border border-gray-300 p-1.5 outline-none focus:border-blue-500"
            >
              <option value="all">전체 결제</option>
              <option value="계좌이체">계좌이체</option>
              <option value="카드">카드</option>
              <option value="현금">현금</option>
            </select>
          </div>

          <div className="space-y-1 lg:col-span-2">
            <label className="ml-0.5 text-[10px] font-bold text-gray-500">적요/내용 검색</label>
            <div className="relative">
              <input
                type="text"
                placeholder="거래 내용 또는 메모 검색"
                value={filters.query}
                onChange={e => setFilters({ ...filters, query: e.target.value })}
                className="w-full border border-gray-300 p-1.5 pr-8 outline-none focus:border-blue-500"
              />
              <i className="ri-search-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <button className="flex items-center justify-center gap-1 bg-[#1a5a96] py-1.5 font-bold text-white shadow-sm hover:bg-[#144675]">
            <i className="ri-filter-3-line"></i> 필터 적용
          </button>
        </div>
      </div>

      {/* 2. 상세 내역 테이블 */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <div className="max-h-[500px] overflow-x-auto overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 border-b border-gray-300 bg-[#eef3f8] text-gray-600">
              <tr>
                <th className="w-24 border-r border-gray-300 p-2">일자</th>
                <th className="w-16 border-r border-gray-300 p-2">구분</th>
                <th className="w-32 border-r border-gray-300 p-2 text-left">카테고리</th>
                <th className="border-r border-gray-300 p-2 text-left text-blue-900">적요 및 상세내용</th>
                <th className="w-32 border-r border-gray-300 p-2 text-right">금액</th>
                <th className="w-20 border-r border-gray-300 p-2">결제수단</th>
                <th className="w-20 border-r border-gray-300 p-2">작성자</th>
                <th className="w-16 p-2">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="bg-gray-50 p-10 text-center italic text-gray-400">
                    조회 조건에 맞는 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredData.map(tx => (
                  <tr key={tx.id} className="transition-colors hover:bg-blue-50/50">
                    <td className="border-r border-gray-200 p-1.5 text-center font-mono text-gray-500">{tx.date}</td>
                    <td className="border-r border-gray-200 p-1.5 text-center">
                      <span
                        className={`rounded-sm border px-2 py-0.5 text-[9px] font-bold ${
                          tx.type === 'income'
                            ? 'border-blue-200 bg-blue-50 text-blue-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                        }`}
                      >
                        {tx.type === 'income' ? '수입' : '지출'}
                      </span>
                    </td>
                    <td className="border-r border-gray-200 p-1.5 text-gray-600">{tx.category}</td>
                    <td className="border-r border-gray-200 p-1.5 font-bold text-gray-800">
                      <div>{tx.description}</div>
                      {tx.memo && <div className="mt-0.5 text-[9px] font-normal italic text-gray-400">{tx.memo}</div>}
                    </td>
                    <td
                      className={`border-r border-gray-200 p-1.5 text-right font-mono font-black ${
                        tx.type === 'income' ? 'text-blue-600' : 'text-red-600'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'}
                      {tx.amount.toLocaleString()}
                    </td>
                    <td className="border-r border-gray-200 p-1.5 text-center text-gray-500">{tx.paymentMethod}</td>
                    <td className="border-r border-gray-200 p-1.5 text-center text-gray-400">{tx.createdBy}</td>
                    <td className="p-1.5 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:underline">수정</button>
                        <button onClick={() => onDelete(tx.id)} className="text-red-400 hover:text-red-600">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 집계 섹션 */}
      <div className="flex justify-end gap-6 border border-gray-300 bg-[#f8fafc] p-2 px-6 font-black shadow-inner">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-gray-500">Total Income</span>
          <span className="text-sm text-blue-700">
            +
            {filteredData
              .filter(t => t.type === 'income')
              .reduce((a, b) => a + b.amount, 0)
              .toLocaleString()}
          </span>
        </div>
        <div className="h-4 w-[1px] self-center bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-gray-500">Total Expense</span>
          <span className="text-sm text-red-700">
            -
            {filteredData
              .filter(t => t.type === 'expense')
              .reduce((a, b) => a + b.amount, 0)
              .toLocaleString()}
          </span>
        </div>
        <div className="h-4 w-[1px] self-center bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-gray-500">Balance</span>
          <span className="text-sm text-gray-900">
            {(
              filteredData.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0) -
              filteredData.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0)
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
    </div>
  );
}
