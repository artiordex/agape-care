/**
 * Description : ProgramGroupModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ProgramGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident: {
    name: string;
    admissionDate: string;
    // Add other fields as needed based on mockData in page.tsx
    // For specific fields not in page.tsx, we can mock them here or allow optional
  } | null;
}

const MOCK_GROUPS = [
  { id: 1, type: '가족', name: '123', description: '123' },
  { id: 2, type: '가족', name: '아이언', description: '가족지지' },
  { id: 3, type: '신체', name: '1거실', description: '실내유산소' },
  { id: 4, type: '신체', name: '1거실(세라밴드)', description: '111' },
  { id: 5, type: '신체', name: '1거실(실내유산소)', description: '11' },
];

export default function ProgramGroupModal({ isOpen, onClose, resident }: ProgramGroupModalProps) {
  // Local state for form fields
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [date, setDate] = useState('2025.11.01');
  const [author, setAuthor] = useState('최인경');
  const [remarks, setRemarks] = useState('');

  // Styles reused from page.tsx for consistency
  const thClass =
    'border border-[#B8D1E0] bg-[#E8F1F8] py-2 text-center text-[12px] font-bold text-[#333] tracking-tight whitespace-nowrap';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-center text-[12px] text-[#333]';
  const sectionTitleClass = 'flex items-center gap-1 text-[13px] font-bold text-[#2E6A9E] mb-2';

  const toggleGroup = (id: number) => {
    setSelectedGroups(prev => (prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex w-full max-w-[800px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
              <h2 className="text-[16px] font-black text-[#333]">프로그램 수급자 그룹 신규 등록</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-red-500">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              {/* 1. 수급자 정보 */}
              <div>
                <div className={sectionTitleClass}>
                  <i className="ri-arrow-right-s-fill text-[#5C8D5A]"></i>
                  수급자 정보
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '100px' }}>
                        수급자명
                      </th>
                      <td className={tdClass} style={{ width: '150px' }}>
                        {resident?.name || '20원'}
                      </td>
                      <th className={thClass} style={{ width: '100px' }}>
                        생년월일
                      </th>
                      <td className={tdClass} style={{ width: '150px' }}>
                        1930.01.02(남)
                      </td>
                      <th className={thClass} style={{ width: '100px' }}>
                        입소일
                      </th>
                      <td className={tdClass} style={{ width: '150px' }}>
                        {resident?.admissionDate || '2025.11.01'}
                      </td>
                      <th className={thClass} style={{ width: '80px' }}>
                        등급
                      </th>
                      <td className={tdClass}>2등급</td>
                    </tr>
                    <tr>
                      <th className={thClass}>주요질환</th>
                      <td colSpan={7} className="h-[40px] border border-[#B8D1E0] p-2 text-left text-[12px]"></td>
                    </tr>
                  </tbody>
                </table>

                {/* 기초평가 & 현재 그룹 */}
                <div className="mt-[-1px]">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <th className={thClass} rowSpan={2} style={{ width: '100px' }}>
                          기초평가
                        </th>
                        <th className={thClass}>욕구사정 평가(신체상태)</th>
                        <th className={thClass}>낙상위험도 평가</th>
                        <th className={thClass}>욕창위험도 평가</th>
                        <th className={thClass}>인지기능 평가</th>
                        <th className={thClass}>급여제공계획(기능회복훈련)</th>
                      </tr>
                      <tr>
                        <td className={clsx(tdClass, 'h-[60px]')}>-</td>
                        <td className={tdClass}></td>
                        <td className={tdClass}></td>
                        <td className={clsx(tdClass, 'text-red-500')}>-</td>
                        <td className={tdClass}>-</td>
                      </tr>
                      <tr>
                        <th className={thClass}>
                          현재
                          <br />
                          프로그램
                          <br />
                          수급자 그룹
                        </th>
                        <td className={tdClass} colSpan={5}>
                          <div className="py-4 text-center text-gray-500">
                            현재 설정된 프로그램 수급자 그룹이 없습니다.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. 프로그램 수급자 그룹 정보 */}
              <div>
                <div className={sectionTitleClass}>
                  <i className="ri-arrow-right-s-fill text-[#5C8D5A]"></i>
                  프로그램 수급자 그룹 정보
                </div>

                {/* Form Row */}
                <table className="mb-2 w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '100px' }}>
                        작성일<span className="ml-0.5 text-red-500">*</span>
                      </th>
                      <td className={tdClass} style={{ width: '180px', textAlign: 'left' }}>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-[100px] border border-gray-300 px-2 py-1 outline-none focus:border-blue-400"
                          />
                          <i className="ri-calendar-line cursor-pointer text-lg text-gray-400"></i>
                        </div>
                      </td>
                      <th className={thClass} style={{ width: '100px' }}>
                        작성자<span className="ml-0.5 text-red-500">*</span>
                      </th>
                      <td className={tdClass} style={{ width: '180px', textAlign: 'left' }}>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            className="w-[80px] border border-gray-300 px-2 py-1 outline-none focus:border-blue-400"
                          />
                          <button className="rounded bg-[#5F7183] px-2 py-1 text-[11px] text-white hover:bg-[#4F6173]">
                            선택
                          </button>
                        </div>
                      </td>
                      <th className={thClass} style={{ width: '80px' }}>
                        비고
                      </th>
                      <td className={tdClass} style={{ textAlign: 'left' }}>
                        <input
                          type="text"
                          className="w-full border border-gray-300 px-2 py-1 outline-none focus:border-blue-400"
                          value={remarks}
                          onChange={e => setRemarks(e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Groups Grid */}
                <div className="h-[200px] overflow-y-auto border border-[#B8D1E0] bg-[#F1F8FF]">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#E8F1F8]">
                      <tr>
                        <th className="w-[50px] border-b border-[#B8D1E0] py-2 text-center text-[12px] font-bold text-[#555]">
                          선택
                        </th>
                        <th className="w-[50px] border-b border-[#B8D1E0] py-2 text-center text-[12px] font-bold text-[#555]">
                          연번
                        </th>
                        <th className="w-[120px] border-b border-[#B8D1E0] py-2 text-center text-[12px] font-bold text-[#555]">
                          프로그램 유형 구분
                        </th>
                        <th className="w-[200px] border-b border-[#B8D1E0] py-2 text-center text-[12px] font-bold text-[#555]">
                          그룹명
                        </th>
                        <th className="border-b border-[#B8D1E0] py-2 text-center text-[12px] font-bold text-[#555]">
                          그룹설명
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {MOCK_GROUPS.map((group, idx) => (
                        <tr key={group.id} className="hover:bg-gray-50">
                          <td className="border-b border-gray-100 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedGroups.includes(group.id)}
                              onChange={() => toggleGroup(group.id)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border-b border-gray-100 py-2 text-center text-[12px] text-gray-600">
                            {idx + 1}
                          </td>
                          <td className="border-b border-gray-100 py-2 text-center">
                            <span
                              className={clsx(
                                'rounded px-2 py-0.5 text-[10px] text-white',
                                group.type === '가족' ? 'bg-[#AB6E24]' : 'bg-[#1B896F]',
                              )}
                            >
                              {group.type}
                            </span>
                          </td>
                          <td className="border-b border-gray-100 py-2 text-center text-[12px] font-medium text-gray-800">
                            {group.name}
                          </td>
                          <td className="border-b border-gray-100 px-4 py-2 text-left text-[12px] text-gray-600">
                            {group.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 border-t border-gray-200 bg-[#F9FAFB] px-5 py-4">
              <button
                className="w-24 rounded bg-[#2E8BCC] py-2 text-[14px] font-bold text-white transition-colors hover:bg-[#2070A8]"
                onClick={() => {
                  // Handle Save
                  onClose();
                }}
              >
                저장
              </button>
              <button
                onClick={onClose}
                className="w-24 rounded bg-[#666] py-2 text-[14px] font-bold text-white transition-colors hover:bg-[#555]"
              >
                창닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
