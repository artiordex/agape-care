/**
 * Description : GalleryGridTab.tsx - ?? ? UI ????
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

export default function GalleryGridTab({ items, onItemClick }: Readonly<Props>) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (imageKey: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
    e.currentTarget.style.display = 'none';
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

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <i className="ri-image-line text-4xl text-gray-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">사진이 없습니다</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map(item => {
        const imageKey = `${item.id}-${item.images[0]}`;
        const hasImageError = imageErrors[imageKey];
        const hasImages = item.images && item.images.length > 0 && item.images[0];

        return (
          <button
            key={item.id}
            onClick={() => onItemClick(item.images, item.title, item.category, item.date, item.description)}
            className="group relative aspect-square overflow-hidden bg-gray-100"
          >
            {hasImageError || !hasImages ? (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gray-200">
                <i className={`${getCategoryIcon(item.category)} text-2xl text-gray-400`} />
              </div>
            ) : (
              <>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={e => handleImageError(imageKey, e)}
                  loading="lazy"
                />

                {/* 오버레이 (호버 시 표시) */}
                <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="line-clamp-1 text-[10px] font-medium text-white">{item.title}</p>
                  <p className="text-[8px] text-white/70">{item.date}</p>
                </div>

                {/* 이미지 개수 표시 (우측 상단) */}
                {item.images.length > 1 && (
                  <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-sm bg-black/50 text-[10px] text-white backdrop-blur-[2px]">
                    <i className="ri-image-line mr-0.5" />
                    {item.images.length}
                  </div>
                )}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
