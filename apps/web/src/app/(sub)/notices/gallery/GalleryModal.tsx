/**
 * Description : GalleryModal.tsx - 📌 갤러리 이미지 슬라이드 모달
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  images: string[];
  title: string;
  category?: string;
  date?: string;
  description?: string;
  onClose: () => void;
}

export default function GalleryModal({ open, images, title, category, date, description, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(0);
      setImageErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, currentIndex, images.length]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (!open) return null;

  const hasValidImages = images.some((_, index) => !imageErrors[index]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black backdrop-blur-sm">
      {/* 헤더 - 항상 표시 */}
      <div className="relative z-30 w-full border-b border-white/10 bg-black/95 px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* 제목 + 카테고리 */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold text-white md:text-xl">{title}</h3>
                {category && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5C8D5A] px-3 py-1 text-xs font-semibold text-white">
                    <i className={getCategoryIcon(category)} />
                    {category}
                  </span>
                )}
              </div>

              {/* 설명 */}
              {description && <p className="mb-3 max-w-3xl text-sm leading-relaxed text-white/90">{description}</p>}

              {/* 날짜 + 이미지 카운터 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                {date && (
                  <div className="flex items-center gap-1.5">
                    <i className="ri-calendar-line text-base" />
                    <span>{date}</span>
                  </div>
                )}
                {hasValidImages && (
                  <div className="flex items-center gap-1.5">
                    <i className="ri-image-line text-base" />
                    <span>
                      {currentIndex + 1} / {images.length}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 md:h-12 md:w-12"
              aria-label="닫기"
            >
              <i className="ri-close-line text-xl md:text-2xl" />
            </button>
          </div>

          {/* 키보드 단축키 안내 */}
          <div className="flex items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-white/10 px-2 py-1 font-semibold">←</kbd>
              <kbd className="rounded bg-white/10 px-2 py-1 font-semibold">→</kbd>
              <span>이동</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-white/10 px-2 py-1 font-semibold">ESC</kbd>
              <span>닫기</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 이미지 영역 */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        {hasValidImages ? (
          <>
            {/* 이전 버튼 */}
            {images.length > 1 && currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:left-8"
                aria-label="이전 이미지"
              >
                <i className="ri-arrow-left-s-line text-2xl" />
              </button>
            )}

            {/* 이미지 */}
            <div className="relative max-h-full max-w-5xl">
              {imageErrors[currentIndex] || !images[currentIndex] ? (
                <div className="flex h-[60vh] w-[80vw] max-w-4xl items-center justify-center rounded-lg bg-gray-800">
                  <div className="text-center">
                    <i className="ri-image-line mb-4 text-6xl text-gray-500" />
                    <p className="text-white/60">이미지를 불러올 수 없습니다</p>
                  </div>
                </div>
              ) : (
                <img
                  src={images[currentIndex]}
                  alt={`${title} - ${currentIndex + 1}`}
                  className="block h-full max-h-[70vh] w-full max-w-5xl rounded-lg object-contain shadow-2xl"
                  onError={() => handleImageError(currentIndex)}
                />
              )}
            </div>

            {/* 다음 버튼 */}
            {images.length > 1 && currentIndex < images.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:right-8"
                aria-label="다음 이미지"
              >
                <i className="ri-arrow-right-s-line text-2xl" />
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
              <i className="ri-image-line text-4xl text-white/60" />
            </div>
            <p className="text-lg text-white/80">이미지가 없습니다</p>
          </div>
        )}
      </div>

      {/* 썸네일 영역 */}
      {images.length > 1 && hasValidImages && (
        <div className="relative z-30 w-full border-t border-white/10 bg-gradient-to-t from-black to-transparent p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="scrollbar-hide flex gap-2 overflow-x-auto md:gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                    currentIndex === index ? 'ring-4 ring-[#5C8D5A]' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {imageErrors[index] || !image ? (
                    <div className="flex h-16 w-16 items-center justify-center bg-gray-700 md:h-20 md:w-20">
                      <i className="ri-image-line text-xl text-gray-400" />
                    </div>
                  ) : (
                    <img
                      src={image}
                      alt={`썸네일 ${index + 1}`}
                      className="h-16 w-16 object-cover md:h-20 md:w-20"
                      onError={() => handleImageError(index)}
                    />
                  )}
                  {currentIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <i className="ri-eye-line text-xl text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 배경 클릭으로 닫기 */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-label="배경 클릭하여 닫기" />
    </div>
  );
}
