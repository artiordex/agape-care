'use client';

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
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('전체')}
          className={`rounded border px-4 py-2 text-sm font-semibold transition-all ${
            selectedCategory === '전체'
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          전체
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(selectedCategory === c.name ? '전체' : c.name)}
            className={`rounded border px-4 py-2 text-sm font-semibold transition-all ${
              selectedCategory === c.name
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
