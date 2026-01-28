import { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  images: string[];
}

interface Props {
  items: GalleryItem[];
  onClick: (images: string[], title: string) => void;
}

export default function GalleryGrid({ items, onClick }: Props) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case '행사':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case '일상':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case '인지프로그램':
        return 'bg-green-50 text-green-700 border-green-200';
      case '여가활동':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
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

  const handleImageError = (imageKey: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
    e.currentTarget.style.display = 'none';
  };

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <i className="ri-image-line text-4xl text-gray-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">사진이 없습니다</h3>
        <p className="text-sm text-gray-500">다른 카테고리를 선택해보세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map(item => {
        const imageKey = `${item.id}-${item.images[0]}`;
        const hasImageError = imageErrors[imageKey];
        const hasImages = item.images && item.images.length > 0 && item.images[0];

        return (
          <article
            key={item.id}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => hasImages && !hasImageError && onClick(item.images, item.title)}
              className="relative block h-64 w-full overflow-hidden bg-gray-100 text-left"
              disabled={!hasImages || hasImageError}
            >
              {/* 이미지가 로드되지 않았거나 에러인 경우 플레이스홀더 */}
              {hasImageError || !hasImages ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <i className={`${getCategoryIcon(item.category)} mb-3 text-5xl text-gray-400`} />
                  <span className="text-sm font-medium text-gray-500">{item.category}</span>
                </div>
              ) : (
                <>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={e => handleImageError(imageKey, e)}
                    loading="lazy"
                  />
                  {item.images.length > 1 && (
                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      <i className="ri-image-line" />
                      <span>{item.images.length}</span>
                    </div>
                  )}
                </>
              )}
            </button>

            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${getCategoryStyle(item.category)}`}
                >
                  <i className={`${getCategoryIcon(item.category)} text-sm`} />
                  {item.category}
                </span>
              </div>

              <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">{item.title}</h3>

              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">{item.description}</p>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="ri-calendar-line" />
                  <span>{item.date}</span>
                </div>
                {hasImages && !hasImageError && (
                  <button
                    onClick={() => onClick(item.images, item.title)}
                    className="text-sm font-medium text-[#5C8D5A] transition-colors hover:text-[#4A7548]"
                  >
                    자세히 보기 →
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
