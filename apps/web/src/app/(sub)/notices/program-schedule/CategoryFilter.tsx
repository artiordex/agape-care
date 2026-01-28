'use client';
import React from 'react';

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: { id: string; name: string; color: string; icon: string }[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {categories.map(c => (
        <button
          key={c.id}
          onClick={() => setSelectedCategory(selectedCategory === c.name ? '전체' : c.name)}
          className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 ${
            selectedCategory === c.name ? 'bg-white' : 'bg-gray-50 opacity-60'
          }`}
          style={{ borderColor: selectedCategory === c.name ? c.color : '#ddd' }}
        >
          <span className="h-4 w-4 rounded-full" style={{ backgroundColor: c.color }} />
          {c.name}
        </button>
      ))}
    </div>
  );
}
