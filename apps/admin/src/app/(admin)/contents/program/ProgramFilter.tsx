'use client';

import { ProgramCategory } from './program.type';

interface Props {
  readonly activeCategory: ProgramCategory;
  readonly onCategoryChange: (category: ProgramCategory) => void;
  readonly viewMode: 'calendar' | 'list';
  readonly onViewModeChange: (mode: 'calendar' | 'list') => void;
}

/**
 * [Component] 프로그램 카테고리 필터 및 뷰 모드 전환
 * 이미지 스타일 적용
 */
export default function ProgramFilter({ activeCategory, onCategoryChange, viewMode, onViewModeChange }: Props) {
  const categories: ProgramCategory[] = [
    '전체',
    '인지활동',
    '여가활동',
    '물리치료',
    '음악치료',
    '미술활동',
    '특별행사',
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6">
        {/* 카테고리 탭 */}
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 뷰 모드 전환 */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => onViewModeChange('calendar')}
            className={`rounded px-3 py-1.5 text-sm font-medium ${
              viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            캘린더 보기
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`rounded px-3 py-1.5 text-sm font-medium ${
              viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            목록 보기
          </button>
        </div>
      </div>
    </div>
  );
}
