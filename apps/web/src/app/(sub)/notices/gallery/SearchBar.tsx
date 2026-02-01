/**
 * Description : SearchBar.tsx - 📌 갤러리 검색 바
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="제목 또는 설명 검색..."
        className="h-12 w-64 rounded border border-gray-200 bg-white pl-10 pr-10 text-sm transition-colors focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
      />
      <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
        >
          <i className="ri-close-circle-fill text-lg" />
        </button>
      )}
    </div>
  );
}
