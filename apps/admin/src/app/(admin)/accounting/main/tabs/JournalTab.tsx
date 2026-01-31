'use client';

import React, { useState } from 'react';

/**
 * [2] 전표 관리 탭
 * 복식부기 기반의 전표 입력 및 차대평형 검증 UI
 */
export default function JournalTab() {
  // 전표 행 데이터 상태 (기본 2줄 제공)
  const [rows, setRows] = useState([
    { id: 1, account: '', debit: 0, credit: 0, memo: '' },
    { id: 2, account: '', debit: 0, credit: 0, memo: '' },
  ]);

  // 합계 계산
  const totalDebit = rows.reduce((sum, r) => sum + r.debit, 0);
  const totalCredit = rows.reduce((sum, r) => sum + r.credit, 0);
  const difference = totalDebit - totalCredit;

  const addRow = () => {
    setRows([...rows, { id: Date.now(), account: '', debit: 0, credit: 0, memo: '' }]);
  };

  return (
    <div className="animate-in fade-in space-y-3 text-[11px] duration-500">
      {/* 상단 액션 바 */}
      <div className="flex items-center justify-between border border-gray-300 bg-white p-2 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">전표일자:</span>
            <input
              type="date"
              className="border border-gray-300 p-1 outline-none focus:border-blue-500"
              defaultValue="2026-01-30"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">결의번호:</span>
            <span className="font-mono text-blue-600">20260130-001</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={addRow}
            className="border border-gray-400 bg-white px-3 py-1 font-bold text-gray-700 hover:bg-gray-50"
          >
            행 추가
          </button>
          <button className="bg-[#1a5a96] px-5 py-1 font-bold text-white hover:bg-[#144675]">전표 저장</button>
        </div>
      </div>

      {/* 복식부기 입력 테이블 */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-300 bg-[#eef3f8]">
            <tr>
              <th className="w-10 border-r border-gray-300 p-2">No</th>
              <th className="w-48 border-r border-gray-300 p-2 text-left text-blue-900">계정과목 (F2 검색)</th>
              <th className="w-32 border-r border-gray-300 p-2 text-right">차변(Debit)</th>
              <th className="w-32 border-r border-gray-300 p-2 text-right">대변(Credit)</th>
              <th className="border-r border-gray-300 p-2 text-left">적요(내용)</th>
              <th className="w-12 p-2 text-center text-red-600">삭제</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr key={row.id} className="transition-colors hover:bg-blue-50/50">
                <td className="border-r border-gray-200 p-1.5 text-center text-gray-400">{index + 1}</td>
                <td className="border-r border-gray-200 p-1.5">
                  <div className="flex gap-1">
                    <input
                      type="text"
                      placeholder="계정코드/명"
                      className="w-full border border-gray-200 p-1 outline-none focus:border-blue-400"
                    />
                    <button className="border border-gray-300 bg-gray-100 px-1 text-gray-500 hover:bg-gray-200">
                      <i className="ri-search-line"></i>
                    </button>
                  </div>
                </td>
                <td className="border-r border-gray-200 p-1.5">
                  <input
                    type="number"
                    className="w-full p-1 text-right font-mono outline-none focus:bg-yellow-50"
                    onChange={e => {
                      const newRows = [...rows];
                      newRows[index].debit = Number(e.target.value);
                      setRows(newRows);
                    }}
                  />
                </td>
                <td className="border-r border-gray-200 p-1.5">
                  <input
                    type="number"
                    className="w-full p-1 text-right font-mono outline-none focus:bg-yellow-50"
                    onChange={e => {
                      const newRows = [...rows];
                      newRows[index].credit = Number(e.target.value);
                      setRows(newRows);
                    }}
                  />
                </td>
                <td className="border-r border-gray-200 p-1.5">
                  <input
                    type="text"
                    className="w-full p-1 text-gray-700 outline-none focus:border-blue-400"
                    placeholder="거래 상세 내용을 입력하세요"
                  />
                </td>
                <td className="p-1.5 text-center">
                  <button className="text-gray-300 transition-colors hover:text-red-500">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* 합계 및 검증 푸터 */}
          <tfoot className="border-t-2 border-gray-300 bg-gray-50 font-black">
            <tr>
              <td colSpan={2} className="border-r border-gray-300 p-2 text-right text-gray-600">
                합계금액
              </td>
              <td className="border-r border-gray-300 bg-blue-50/50 p-2 text-right text-blue-700">
                {totalDebit.toLocaleString()}
              </td>
              <td className="border-r border-gray-300 bg-red-50/50 p-2 text-right text-red-700">
                {totalCredit.toLocaleString()}
              </td>
              <td className="p-2 font-normal text-gray-500">
                {difference === 0 ? (
                  <span className="flex items-center gap-1 text-emerald-600">
                    <i className="ri-checkbox-circle-fill"></i> 차대평형 일치
                  </span>
                ) : (
                  <span className="flex animate-pulse items-center gap-1 text-red-600">
                    <i className="ri-error-warning-fill"></i> 차액 발생: {Math.abs(difference).toLocaleString()}원
                  </span>
                )}
              </td>
              <td className="bg-white"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 도움말 가이드 */}
      <div className="border-l-4 border-[#1a5a96] bg-blue-50 p-2 text-[10px] text-gray-600">
        <p>
          💡 **전표 입력 팁**: 계정과목 칸에서 **F2**키를 누르거나 검색 아이콘을 클릭하여 계정 체계를 조회할 수
          있습니다. 차변과 대변의 합계가 일치해야 저장이 가능합니다.
        </p>
      </div>
    </div>
  );
}
