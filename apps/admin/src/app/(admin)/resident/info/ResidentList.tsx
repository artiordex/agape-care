'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface Props {
  readonly residents: any[];
  readonly selectedResident: any;
  readonly searchTerm: string;
  readonly filterStatus: string;
  readonly onSelectResident: (resident: any) => void;
  readonly onSearchChange: (value: string) => void;
  readonly onFilterChange: (status: string) => void;
  readonly getStatusColor: (status: string) => string;
  readonly getGradeColor: (grade: string) => string;
}

/**
 * [Sidebar Component] 수급자 통합 검색 테이블
 * 폰트: Pretendard
 */
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
  const router = useRouter();

  // 성별 통계 계산
  const stats = useMemo(() => {
    const maleCount = residents.filter(r => r.gender === '남성' || r.gender === '남자').length;
    const femaleCount = residents.filter(r => r.gender === '여성' || r.gender === '여자').length;
    return { maleCount, femaleCount, total: residents.length };
  }, [residents]);

  return (
    <div className="flex w-[500px] flex-col border-r border-gray-300 bg-white font-['Pretendard'] antialiased shadow-sm">
      {/* 상단 필터 영역 (글꼴 추가 확대: 16px/15px) */}
      <div className="space-y-5 border-b border-gray-200 bg-[#f8fafc] p-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="수급자 성명 검색..."
            /** * [글꼴 확대] 기존 14px -> 16px로 추가 확대 */
            className="w-full rounded-none border border-gray-300 bg-white px-5 py-4 text-[16px] font-bold shadow-sm outline-none focus:border-[#5C8D5A]"
          />
          <i className="ri-search-line absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* [글꼴 확대] 기존 13px -> 15px로 추가 확대 */}
          <select
            className="rounded-none border border-gray-300 bg-white px-3 py-2.5 text-[15px] font-black text-gray-700 outline-none focus:border-[#5C8D5A]"
            onChange={e => onFilterChange(e.target.value)}
          >
            <option value="전체">현황선택</option>
            <option value="입소">입소</option>
            <option value="외박">외박</option>
            <option value="퇴소">퇴소</option>
          </select>
          <select className="rounded-none border border-gray-300 bg-white px-3 py-2.5 text-[15px] font-black text-gray-700 outline-none focus:border-[#5C8D5A]">
            <option>생활실 선택</option>
            <option>301호</option>
            <option>302호</option>
          </select>
          <select className="rounded-none border border-gray-300 bg-white px-3 py-2.5 text-[15px] font-black text-gray-700 outline-none focus:border-[#5C8D5A]">
            <option>분류선택</option>
            <option>일반</option>
            <option>기초</option>
          </select>
        </div>

        <button
          onClick={() => router.push('/resident/info/new')}
          className="flex w-full items-center justify-center gap-3 rounded-none bg-[#5C8D5A] py-4 text-[16px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-user-add-line text-xl"></i>수급자 신규등록
        </button>
      </div>

      {/* 데이터 테이블 영역 (본문 글꼴 확대: 16px) */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <table className="w-full border-collapse text-center">
          <thead className="sticky top-0 z-10 bg-gray-100 text-[13px] font-black uppercase tracking-widest text-gray-500">
            <tr className="border-b border-gray-200">
              <th className="py-4">성명</th>
              <th>성별</th>
              <th>등급</th>
              <th>생활실</th>
              <th>현황</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[16px]">
            {residents.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-32 text-[18px] font-black italic text-gray-300">
                  조회된 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              residents.map(resident => (
                <tr
                  key={resident.id}
                  onClick={() => onSelectResident(resident)}
                  className={clsx(
                    'cursor-pointer transition-colors hover:bg-emerald-50/50',
                    selectedResident?.id === resident.id
                      ? 'bg-emerald-50 ring-2 ring-inset ring-[#5C8D5A]'
                      : 'bg-white',
                  )}
                >
                  <td className="py-5 font-black text-gray-900">{resident.name}</td>
                  <td className="font-bold text-gray-600">
                    {resident.gender === '남성' || resident.gender === '남자' ? '남자' : '여자'}
                  </td>
                  <td>
                    <span
                      className={clsx('rounded-sm px-2.5 py-1.5 text-[12px] font-black', getGradeColor(resident.grade))}
                    >
                      {resident.grade.split(' ')[1] || resident.grade}
                    </span>
                  </td>
                  <td className="font-mono font-bold text-gray-700">{resident.room}</td>
                  <td>
                    <span
                      className={clsx(
                        'rounded-full px-4 py-1.5 text-[12px] font-black',
                        getStatusColor(resident.status),
                      )}
                    >
                      {resident.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 요약 바 */}
      <div className="border-t border-gray-200 bg-[#f8fafc] px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-black tracking-tight text-gray-500">
            전체 수급자 인원: <span className="font-mono text-[18px] text-[#5C8D5A]">{stats.total}</span>명
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
                <i className="ri-men-line text-[16px]"></i>
              </div>
              <span className="text-[14px] font-black text-gray-700">남자: {stats.maleCount}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-rose-100 bg-rose-50 text-rose-600 shadow-sm">
                <i className="ri-women-line text-[16px]"></i>
              </div>
              <span className="text-[14px] font-black text-gray-700">여자: {stats.femaleCount}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5c8d5a;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
