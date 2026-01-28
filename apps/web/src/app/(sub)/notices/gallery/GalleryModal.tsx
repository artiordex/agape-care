import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  images: string[];
  title: string;
  onClose: () => void;
}

export default function GalleryModal({ open, images, title, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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

  // 이미지가 없거나 모두 에러인 경우
  const hasValidImages = images.some((_, index) => !imageErrors[index]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* 헤더 */}
      <div className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 md:p-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white md:text-xl">{title}</h3>
            {hasValidImages && (
              <p className="mt-1 text-sm text-white/80">
                {currentIndex + 1} / {images.length}
              </p>
            )}
          </div>

          {/* 키보드 단축키 안내 */}
          <div className="mr-4 hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <kbd className="rounded bg-white/20 px-2 py-1 text-xs font-semibold">←</kbd>
              <kbd className="rounded bg-white/20 px-2 py-1 text-xs font-semibold">→</kbd>
              <span>이동</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <kbd className="rounded bg-white/20 px-2 py-1 text-xs font-semibold">ESC</kbd>
              <span>닫기</span>
            </div>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:h-12 md:w-12"
            aria-label="닫기"
          >
            <i className="ri-close-line text-xl md:text-2xl" />
          </button>
        </div>
      </div>

      {/* 메인 이미지 영역 */}
      <div className="relative flex h-full w-full items-center justify-center p-4 pb-32 pt-24 md:p-20">
        {hasValidImages ? (
          <>
            {/* 이전 버튼 */}
            {images.length > 1 && currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:left-8"
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
                  className="max-h-[70vh] w-auto rounded-lg object-contain shadow-2xl"
                  onError={() => handleImageError(currentIndex)}
                />
              )}
            </div>

            {/* 다음 버튼 */}
            {images.length > 1 && currentIndex < images.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:right-8"
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
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2 md:gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                    currentIndex === index ? 'ring-4 ring-white' : 'opacity-60 hover:opacity-100'
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
