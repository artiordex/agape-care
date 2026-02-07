/**
 * Description : DocumentsTab.tsx - 📂 케어포 스타일 서류 관리 및 여백 유지 리스트
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface DocumentRecord {
  id: number;
  name: string;
  category: string;
  uploadDate: string;
  size: string;
  status: string;
}

export default function DocumentsTab() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 데이터 예시
  const [documents] = useState<DocumentRecord[]>([
    {
      id: 1,
      name: '장기요양인정서',
      category: '필수서류',
      uploadDate: '2023-01-10',
      status: '등록완료',
      size: '2.4 MB',
    },
    { id: 2, name: '이용계약서', category: '필수서류', uploadDate: '2023-01-10', status: '등록완료', size: '1.8 MB' },
    {
      id: 3,
      name: '개인정보동의서',
      category: '필수서류',
      uploadDate: '2023-01-10',
      status: '등록완료',
      size: '1.2 MB',
    },
    { id: 4, name: '신분증 사본', category: '신분증명', uploadDate: '2023-01-10', status: '등록완료', size: '0.8 MB' },
    { id: 5, name: '건강진단서', category: '건강서류', uploadDate: '2023-01-15', status: '등록완료', size: '3.1 MB' },
    { id: 6, name: '진료기록부', category: '건강서류', uploadDate: '2023-02-20', status: '등록완료', size: '4.5 MB' },
  ]);

  const categories = ['전체', '필수서류', '신분증명', '건강서류', '기타'];
  const FIXED_ROWS = 15; // 케어포 스타일의 여백 유지를 위한 고정 행 개수

  // 공통 스타일
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-[#2E6A9E]';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900 bg-white text-center h-[38px]';
  const emptyTdClass = 'border border-[#B8D1E0] bg-white h-[38px]';

  return (
    <div className="flex flex-col gap-3 bg-white p-0 font-sans antialiased">
      {/* 1. 상단 필터 및 제어 바 */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex gap-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                'rounded border px-4 py-1 text-[12px] font-bold shadow-sm transition-all',
                selectedCategory === cat
                  ? 'border-[#468db3] bg-[#57A5CE] text-white'
                  : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="rounded bg-[#57A5CE] px-4 py-1 text-[12px] font-black text-white shadow-md hover:bg-[#468db3]">
          <i className="ri-upload-line mr-1"></i> 서류 업로드
        </button>
      </div>

      {/* 2. 서류 목록 테이블 (여백 유지 로직 적용) */}
      <div className="overflow-hidden border-t-2 border-[#57A5CE]">
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr className="bg-[#E8F1F8]">
              <th className={clsx(thClass, 'w-10')}>
                <input type="checkbox" />
              </th>
              <th className={clsx(thClass, 'w-12')}>연번</th>
              <th className={thClass}>서류명</th>
              <th className={thClass}>분류</th>
              <th className={thClass}>업로드일</th>
              <th className={thClass}>파일크기</th>
              <th className={thClass}>상태</th>
              <th className={clsx(thClass, 'w-16')}>조회</th>
            </tr>
          </thead>
          <tbody>
            {/* 데이터 행 렌더링 */}
            {documents.map((doc, idx) => (
              <tr key={doc.id} className="hover:bg-blue-50">
                <td className={tdClass}>
                  <input type="checkbox" />
                </td>
                <td className={tdClass}>{idx + 1}</td>
                <td className={clsx(tdClass, 'text-left font-medium')}>{doc.name}</td>
                <td className={tdClass}>{doc.category}</td>
                <td className={tdClass}>{doc.uploadDate}</td>
                <td className={tdClass}>{doc.size}</td>
                <td className={tdClass}>
                  <span className="font-bold text-emerald-600">{doc.status}</span>
                </td>
                <td className={tdClass}>
                  <button className="rounded bg-[#7A8B9A] px-2 py-0.5 text-[11px] text-white shadow-inner hover:bg-[#647481]">
                    조회
                  </button>
                </td>
              </tr>
            ))}
            {/* 나머지 빈 행 공간 채우기 (여백 유지) */}
            {Array.from({ length: Math.max(0, FIXED_ROWS - documents.length) }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <td key={j} className={emptyTdClass}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
