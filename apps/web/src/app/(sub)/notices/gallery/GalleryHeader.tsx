/**
 * Description : GalleryHeader.tsx - 📌 갤러리 헤더 (날짜 네비게이션 + 뷰 모드)
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import SearchBar from './SearchBar';

interface GalleryHeaderProps {
  currentDate: Date;
  viewMode: 'week' | 'month' | 'grid' | 'all';
  searchQuery: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewModeChange: (mode: 'week' | 'month' | 'grid' | 'all') => void;
  onSearchChange: (query: string) => void;
}

export default function GalleryHeader({
  currentDate,
  viewMode,
  searchQuery,
  onPrev,
  onNext,
  onToday,
  onViewModeChange,
  onSearchChange,
}: GalleryHeaderProps) {
  const getDisplayText = () => {
    const month = currentDate.getMonth() + 1;
    if (viewMode === 'week') {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const dayOfMonth = currentDate.getDate();
      const weekOfMonth = Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
      return `${month}월 ${weekOfMonth}주차`;
    }
    if (viewMode === 'month') {
      return `${currentDate.getFullYear()}년 ${month}월`;
    }
    if (viewMode === 'all') {
      return '전체 보기';
    }
    return '그리드 보기';
  };

  const getSubTitleText = () => {
    switch (viewMode) {
      case 'week':
        return '주간 갤러리';
      case 'month':
        return '월간 갤러리';
      case 'grid':
        return '그리드 보기';
      case 'all':
        return '전체 갤러리';
      default:
        return '';
    }
  };

  return (
    <div className="mb-10 flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-end">
      {/* 왼쪽 */}
      <div className="flex items-start gap-5">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            {viewMode === 'grid' ? (
              <span className="text-[#5C8D5A]">{getDisplayText()}</span>
            ) : (
              <>
                {viewMode === 'week' ? (
                  <span className="text-[#5C8D5A]">{getDisplayText()}</span>
                ) : (
                  <>
                    {currentDate.getFullYear()}.
                    <span className="text-[#5C8D5A]">{(currentDate.getMonth() + 1).toString().padStart(2, '0')}</span>
                  </>
                )}
              </>
            )}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{getSubTitleText()}</p>
        </div>
      </div>

      {/* 오른쪽 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 날짜 이동 버튼 그룹 (그리드 보기일 때는 숨김) */}
        {viewMode !== 'grid' && (
          <div className="flex border border-gray-200 bg-white">
            <button
              onClick={onPrev}
              className="flex h-12 w-12 items-center justify-center border-r border-gray-100 transition-colors hover:bg-[#5C8D5A]/10"
              title={viewMode === 'week' ? '이전 주' : '이전 달'}
            >
              <i className="ri-arrow-left-s-line text-xl text-gray-600" />
            </button>

            <button
              onClick={onToday}
              className="flex h-12 items-center px-6 text-sm font-semibold text-[#5C8D5A] transition-colors hover:bg-[#5C8D5A]/10"
            >
              이번 주
            </button>

            <button
              onClick={onNext}
              className="flex h-12 w-12 items-center justify-center border-l border-gray-100 transition-colors hover:bg-[#5C8D5A]/10"
              title={viewMode === 'week' ? '다음 주' : '다음 달'}
            >
              <i className="ri-arrow-right-s-line text-xl text-gray-600" />
            </button>
          </div>
        )}

        {/* 검색 바 */}
        <SearchBar value={searchQuery} onChange={onSearchChange} />

        {/* 뷰 모드 전환 */}
        <div className="flex border border-[#5C8D5A] bg-white p-1">
          <button
            onClick={() => onViewModeChange('all')}
            className={`flex h-10 items-center gap-2 px-5 text-sm font-bold transition-colors ${
              viewMode === 'all' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-list-check" /> 목록
          </button>

          <button
            onClick={() => onViewModeChange('week')}
            className={`flex h-10 items-center gap-2 px-5 text-sm font-bold transition-colors ${
              viewMode === 'week' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-todo-line" /> 주간
          </button>

          <button
            onClick={() => onViewModeChange('month')}
            className={`flex h-10 items-center gap-2 px-5 text-sm font-bold transition-colors ${
              viewMode === 'month' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-calendar-fill" /> 월간
          </button>

          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex h-10 items-center gap-2 px-5 text-sm font-bold transition-colors ${
              viewMode === 'grid' ? 'bg-[#5C8D5A] text-white' : 'text-gray-500 hover:text-[#5C8D5A]'
            }`}
          >
            <i className="ri-grid-fill" /> 그리드
          </button>
        </div>
      </div>
    </div>
  );
}
