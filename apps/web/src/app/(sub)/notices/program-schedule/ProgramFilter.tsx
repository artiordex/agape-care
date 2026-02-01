/**
 * Description : ProgramFilter.tsx - 📌 프로그램 일정 카테고리 필터
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-px border border-[#5C8D5A]/20 bg-[#5C8D5A]/5 font-['Pretendard']">
      {/* 전체보기 버튼 */}
      <button
        onClick={() => setSelectedCategory('전체')}
        className={`flex items-center gap-3 px-6 py-3 text-sm font-bold transition-colors ${
          selectedCategory === '전체'
            ? 'bg-[#5C8D5A] text-white'
            : 'bg-white text-gray-600 hover:bg-[#5C8D5A]/10 hover:text-[#5C8D5A]'
        }`}
      >
        <i className="ri-grid-fill text-md" />
        <span className="tracking-wide">전체보기</span>
      </button>

      {/* 개별 카테고리 버튼 */}
      {categories.map(c => {
        const isActive = selectedCategory === c.name;

        return (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(isActive ? '전체' : c.name)}
            className={`relative flex items-center gap-3 border-l border-[#5C8D5A]/10 px-6 py-3 text-sm font-bold transition-colors ${
              isActive ? 'bg-[#5C8D5A] text-white' : 'bg-white text-gray-600 hover:bg-[#5C8D5A]/10 hover:text-[#5C8D5A]'
            }`}
          >
            <div className="flex h-4 w-4 items-center justify-center" style={{ color: isActive ? '#ffffff' : c.color }}>
              <i className={`${c.icon} text-md`} />
            </div>

            <span className="tracking-wide">{c.name}</span>

            {isActive && <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />}
          </button>
        );
      })}
    </div>
  );
}
