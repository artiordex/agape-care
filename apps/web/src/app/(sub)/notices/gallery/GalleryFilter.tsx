/**
 * Description : GalleryFilter.tsx - 📌 갤러리 카테고리 필터
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface GalleryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  totalCount: number;
}

export default function GalleryFilter({ categories, selected, onSelect, totalCount }: GalleryFilterProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '전체':
        return 'ri-grid-fill';
      case '행사':
        return 'ri-calendar-event-line';
      case '일상':
        return 'ri-home-smile-line';
      case '인지프로그램':
        return 'ri-brain-line';
      case '여가활동':
        return 'ri-music-2-line';
      default:
        return 'ri-image-line';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '행사':
        return '#DC2626'; // red-600
      case '일상':
        return '#2563EB'; // blue-600
      case '인지프로그램':
        return '#7C3AED'; // violet-600
      case '여가활동':
        return '#EA580C'; // orange-600
      default:
        return '#5C8D5A';
    }
  };

  return (
    <div className="mb-8">
      {/* 카테고리 버튼 */}
      <div className="flex flex-wrap gap-px border border-[#5C8D5A]/20 bg-[#5C8D5A]/5">
        {categories.map(cat => {
          const isActive = selected === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`relative flex items-center gap-3 border-l border-[#5C8D5A]/10 px-6 py-3 text-sm font-bold transition-colors first:border-l-0 ${
                isActive
                  ? 'bg-[#5C8D5A] text-white'
                  : 'bg-white text-gray-600 hover:bg-[#5C8D5A]/10 hover:text-[#5C8D5A]'
              }`}
            >
              <div
                className="flex h-4 w-4 items-center justify-center"
                style={{ color: isActive ? '#ffffff' : getCategoryColor(cat) }}
              >
                <i className={`${getCategoryIcon(cat)} text-base`} />
              </div>

              <span className="tracking-wide">{cat}</span>

              {isActive && <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
