interface Props {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
  totalCount: number;
}

export default function CategoryFilter({ categories, selected, onSelect, totalCount }: Props) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '전체':
        return 'ri-grid-line';
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

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">갤러리</h2>
        <p className="text-sm text-gray-600">
          총 <span className="font-semibold text-[#5C8D5A]">{totalCount}</span>개
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
              selected === cat
                ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white shadow-sm'
                : 'border-gray-300 bg-white text-gray-700 hover:border-[#5C8D5A] hover:bg-teal-50'
            }`}
          >
            <i className={`${getCategoryIcon(cat)} text-base`} />
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
