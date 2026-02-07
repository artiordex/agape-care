/**
 * Description : ResidentList.tsx - 📌 입소자 관리 입소자 리스트 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

interface Props {
  readonly residents: any[];
  readonly selectedResident: any;
  readonly searchTerm: string;
  readonly filterStatus: string;
  readonly onSelectResident: (resident: any) => void;
  readonly onSearchChange: (term: string) => void;
  readonly onFilterChange: (status: string) => void;
  readonly getStatusColor: (status: string) => string;
  readonly getGradeColor: (grade: string) => string;
}

export default function ResidentList({
  residents,
  selectedResident,
  searchTerm,
  filterStatus,
  onSelectResident,
  onSearchChange,
  onFilterChange,
  getStatusColor,
  getGradeColor,
}: Props) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = ['전체', '입소중', '외출중', '외박중', '퇴소', '대기중'];

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 통계 계산
  const stats = {
    total: residents.length,
    male: residents.filter(r => r.gender === '남').length,
    female: residents.filter(r => r.gender === '여').length,
  };

  const handleStatusSelect = (status: string) => {
    onFilterChange(status);
    setShowStatusDropdown(false);
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-300 bg-white p-4 antialiased">
      {/* 상단 제어 탭 영역 */}
      <div className="mb-2 flex flex-wrap gap-1">
        {/* 현황선택 - 드롭다운 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
          >
            현황선택
          </button>
          {showStatusDropdown && (
            <div className="absolute left-0 top-full z-30 mt-1 w-24 border border-[#B8D1E0] bg-white shadow-lg">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusSelect(status)}
                  className={clsx(
                    'w-full px-3 py-1.5 text-left text-[12px] hover:bg-blue-50',
                    filterStatus === status ? 'bg-[#E8F1F8] font-medium text-[#2E6A9E]' : 'text-gray-700',
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {['생활실선택', '분류선택'].map(tab => (
          <button
            key={tab}
            className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
          >
            {tab}
          </button>
        ))}
        {/* 이름조회 (입력 필드 스타일) */}
        <div className="relative">
          <input
            type="text"
            placeholder="이름조회"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-16 border border-[#728292] px-2 py-1 text-[12px] font-medium outline-none focus:border-[#5C8D5A]"
          />
        </div>
        <button className="ml-1 border border-[#4A7548] bg-[#5C8D5A] px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#4A7548]">
          신규등록
        </button>
      </div>

      {/* 2. 메인 테이블 영역 - 이미지의 연청록색 격자 및 헤더 스타일 적용 */}
      <div className="flex-1 overflow-auto border border-[#B8D1E0]">
        <table className="w-full border-collapse text-[13px]">
          <thead className="sticky top-0 z-20">
            <tr className="bg-[#E8F1F8] text-gray-700">
              {['연번', '현황', '수급자명', '생활실', '성별', '나이', '등급', '인정만료'].map(header => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b border-r border-[#B8D1E0] px-2 py-2 font-medium last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B8D1E0]">
            {residents.map((resident, index) => {
              const isSelected = selectedResident?.id === resident.id;

              // 나이 계산
              const birthYear = Number.parseInt(resident.birthDate.split('-')[0]);
              const age = 2026 - birthYear;

              return (
                <tr
                  key={resident.id}
                  onClick={() => onSelectResident(resident)}
                  className={clsx(
                    'cursor-pointer transition-colors',
                    isSelected ? 'bg-[#FFF9C4]' : 'bg-white hover:bg-blue-50/50',
                  )}
                >
                  <td className="border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-500">{index + 1}</td>
                  <td className="border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-800">{resident.status}</td>
                  <td
                    className={clsx(
                      'border-r border-[#B8D1E0] px-2 py-1.5 text-center font-medium',
                      resident.status === '외출중' ? 'font-bold text-blue-600' : 'text-gray-900',
                    )}
                  >
                    {resident.name}
                  </td>
                  <td className="max-w-[80px] truncate border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-600">
                    {resident.room}
                  </td>
                  <td className="border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-600">{resident.gender}</td>
                  <td className="border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-600">{age}</td>
                  <td className="border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-800">{resident.grade}</td>
                  <td className="px-2 py-1.5 text-center text-gray-500 last:border-r-0">{resident.gradeValidUntil}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. 하단 통계 바 - 이미지의 하단 디자인 재현 */}
      <div className="mt-3 flex items-center justify-between border border-[#B8D1E0] bg-[#E8F1F8] px-4 py-2">
        <div className="flex gap-6 text-[12px] font-medium text-[#2E6A9E]">
          <span className="flex items-center gap-1">▶ 전체:{stats.total}명</span>
          <span className="flex items-center gap-1">▶ 남자:{stats.male}명</span>
          <span className="flex items-center gap-1">▶ 여자:{stats.female}명</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="retired-check"
            checked={filterStatus === '퇴소'}
            onChange={e => onFilterChange(e.target.checked ? '퇴소' : '전체')}
            className="h-4 w-4 rounded-none border-[#B8D1E0] accent-[#5C8D5A]"
          />
          <label htmlFor="retired-check" className="cursor-pointer text-[12px] font-medium text-gray-700">
            퇴소자 포함 검색
          </label>
        </div>
      </div>
    </div>
  );
}
