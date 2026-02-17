'use client';

import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import MeetingHeader from './MeetingHeader';
import MeetingFormModal from './MeetingFormModal';
import { MeetingRecord, MeetingCategory } from './meeting.type';

/**
 * [Page] 아가페 회의 및 간담회 통합 관제 대시보드
 * image_109a86.png의 분기별 현황판 레이아웃 적용
 */
export default function MeetingManagementPage() {
  const [records, setRecords] = useState<MeetingRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MeetingCategory>('committee');
  const [selectedYear, setSelectedYear] = useState(2026);
  const [editingRecord, setEditingRecord] = useState<MeetingRecord | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  // 초기 데이터 로드 (Local Storage)
  useEffect(() => {
    const saved = localStorage.getItem('agape_meetings');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  const saveToStorage = (data: MeetingRecord[]) => {
    localStorage.setItem('agape_meetings', JSON.stringify(data));
    setRecords(data);
  };

  // 셀 클릭 핸들러
  const handleCellClick = (category: MeetingCategory, quarter: number | null, existingRecord: MeetingRecord | null) => {
    setSelectedCategory(category);
    setSelectedQuarter(quarter);
    setEditingRecord(existingRecord);
    setIsModalOpen(true);
  };

  // 회의록 저장 핸들러
  const handleSave = (formData: any) => {
    if (editingRecord) {
      // 수정 모드
      const updated = records.map(r =>
        r.id === editingRecord.id ? { ...formData, id: editingRecord.id, quarter: editingRecord.quarter } : r,
      );
      saveToStorage(updated);
    } else {
      // 신규 생성 모드
      const newRecord: MeetingRecord = {
        ...formData,
        id: Date.now().toString(),
        category: selectedCategory,
        quarter: selectedQuarter || 1,
        status: '작성완료' as const,
        attendanceRate: Math.round(
          (formData.participants.filter((p: string) => p).length / formData.participants.length) * 100,
        ),
      };
      saveToStorage([...records, newRecord]);
    }
    setIsModalOpen(false);
    setEditingRecord(null);
    setSelectedQuarter(null);
  };

  // 분기별 데이터 매핑 로직 (현황판용)
  const getStatusByQuarter = (category: MeetingCategory, quarter: number) => {
    const record = records.find(r => r.category === category && r.quarter === quarter);
    return record ? '작성완료' : '미작성';
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans text-gray-900 antialiased">
      {/* 1. 상단 액션 헤더 */}
      <MeetingHeader
        year={selectedYear}
        onYearChange={setSelectedYear}
        onAdd={cat => {
          setSelectedCategory(cat);
          setIsModalOpen(true);
        }}
      />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-full space-y-6">
          {/* 2. 회의 현황판 그리드 (image_109a86.png 스타일) */}
          <div className="border border-gray-300 bg-white shadow-xl">
            <table className="w-full border-collapse text-[12px]">
              <thead className="bg-[#f8fafc] font-black uppercase italic tracking-tighter text-gray-500">
                <tr>
                  <th className="w-40 border-b border-r border-gray-200 py-4">회의명</th>
                  <th className="border-b border-r border-gray-200" colSpan={4}>
                    분기별 시행 및 작성 현황
                  </th>
                  <th className="border-b border-gray-200">회의 생성 (필요시)</th>
                </tr>
                <tr className="bg-emerald-50/50 text-[#5C8D5A]">
                  <th className="border-b border-r border-gray-200">구분</th>
                  {[1, 2, 3, 4].map(q => (
                    <th key={q} className="border-b border-r border-gray-200 py-2">
                      {q}분기
                    </th>
                  ))}
                  <th className="border-b border-gray-200">자유 생성</th>
                </tr>
              </thead>
              <tbody className="text-center font-bold">
                {/* 행 1: 운영위원회 */}
                <StatusRow
                  title="운영위원회 회의"
                  category="committee"
                  records={records}
                  subItems={['종사자 처우개선 의견수렴', '노인학대예방']}
                  onCellClick={handleCellClick}
                />
                {/* 행 2: 보호자 소통 */}
                <StatusRow
                  title="보호자 소통 (간담회)"
                  category="guardian"
                  records={records}
                  onCellClick={handleCellClick}
                />
              </tbody>
            </table>
          </div>

          {/* 3. 최근 회의록 타임라인 리스트 영역 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 이 부분은 MeetingList 컴포넌트로 구현 예정 */}
            <div className="rounded-none border border-dashed border-gray-300 p-12 text-center font-black uppercase italic text-gray-300 lg:col-span-3">
              Meeting Detail Stream Area
            </div>
          </div>
        </div>
      </div>

      {/* 회의 등록 모달 */}
      <MeetingFormModal
        isOpen={isModalOpen}
        category={selectedCategory}
        record={editingRecord}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
          setSelectedQuarter(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}

/** [Sub] 현황판 로우 컴포넌트 */
function StatusRow({ title, category, records, subItems, onCellClick }: any) {
  return (
    <tr className="group border-b border-gray-200">
      <td className="border-r border-gray-200 bg-gray-50 p-4 font-black text-gray-800">{title}</td>
      {[1, 2, 3, 4].map(q => {
        const existingRecord = records.find((r: any) => r.category === category && r.quarter === q);
        const hasRecord = !!existingRecord;

        return (
          <td
            key={q}
            onClick={() => onCellClick(category, q, existingRecord)}
            className={clsx(
              'cursor-pointer border-r border-gray-200 p-4 transition-all',
              hasRecord
                ? 'bg-emerald-50 text-[#5C8D5A] hover:bg-emerald-100'
                : 'text-gray-300 hover:bg-gray-50 hover:text-gray-600',
            )}
          >
            {hasRecord ? (
              <div className="flex flex-col items-center gap-1">
                <span className="rounded-none border border-[#5C8D5A] px-2 py-0.5 text-[10px] font-black">
                  작성완료
                </span>
                {subItems && (
                  <div className="mt-1 flex gap-1 text-[9px] font-normal opacity-70">
                    {subItems.map((s: string) => (
                      <span key={s} className="border bg-white px-1">
                        ● {s}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-1 flex items-center gap-1 text-[9px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                  <i className="ri-edit-line"></i>
                  <span>수정하기</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span>미작성</span>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-[#5C8D5A] opacity-0 transition-opacity group-hover:opacity-100">
                  <i className="ri-add-circle-line"></i>
                  <span>작성하기</span>
                </div>
              </div>
            )}
          </td>
        );
      })}
      <td
        className="cursor-pointer bg-gray-50/30 transition-all hover:bg-emerald-50"
        onClick={() => onCellClick(category, null, null)}
      >
        <button className="flex items-center justify-center gap-1 text-gray-400 transition-all hover:text-[#5C8D5A]">
          <i className="ri-add-line"></i>
          <span className="text-[10px] font-bold">생성</span>
        </button>
      </td>
    </tr>
  );
}
