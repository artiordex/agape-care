/**
 * Description : GalleryAllTab.tsx - 📌 갤러리 전체 그리드 보기
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  images: string[];
}

interface Props {
  items: GalleryItem[];
  onItemClick: (images: string[], title: string, category: string, date: string, description: string) => void;
}

export default function GalleryAllTab({ items, onItemClick }: Readonly<Props>) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const getCategoryStyle = (category: string) => {
    return 'bg-[#5C8D5A]/10 text-[#5C8D5A] border-[#5C8D5A]/20';
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map(item => {
        const imageKey = `${item.id}-${item.images[0]}`;
        const hasImageError = imageErrors[imageKey];
        const hasImages = item.images && item.images.length > 0 && item.images[0];

        return (
          <article
            key={item.id}
            className={`group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all ${
              hasImages ? 'hover:border-[#5C8D5A]/50 hover:shadow-md' : ''
            }`}
          >
            {/* Image Area - Clickable */}
            <button
              onClick={() => onItemClick(item.images, item.title, item.category, item.date, item.description)}
              className="relative h-64 w-full overflow-hidden bg-gray-100 text-left"
              aria-label={`${item.title} 이미지 보기`}
            >
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
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <i className="ri-search-eye-line text-3xl text-white" />
                  </div>
                </>
              )}
            </button>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${getCategoryStyle(item.category)}`}
                >
                  <i className={`${getCategoryIcon(item.category)} text-sm`} />
                  {item.category}
                </span>
              </div>

              {/* Title - Explicitly Clickable as per user request */}
              <button
                onClick={() => onItemClick(item.images, item.title, item.category, item.date, item.description)}
                className="mb-2 text-left"
              >
                <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors hover:text-[#5C8D5A] group-hover:text-[#5C8D5A]">
                  {item.title}
                </h3>
              </button>

              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">{item.description}</p>

              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="ri-calendar-line" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
