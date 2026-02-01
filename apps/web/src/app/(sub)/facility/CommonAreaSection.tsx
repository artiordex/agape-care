/**
 * Description : CommonAreaSection.tsx - 📌 공용 공간 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import facilityData from '@/data/facility.json';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CommonArea {
  id: number;
  name: string;
  description: string;
  features: string[];
  image: string;
  galleryImages: string[];
}

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

// 이미지 갤러리 모달 컴포넌트
const ImageGalleryModal = ({ isOpen, onClose, images, title }: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    globalThis.addEventListener('keydown', handleEsc);
    return () => globalThis.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-black/80"
        onClick={onClose}
        aria-label="이미지 갤러리 닫기"
      />

      <div className="relative mx-4 w-full max-w-5xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
          aria-label="닫기"
        >
          <i className="ri-close-line text-3xl" />
        </button>

        <div className="overflow-hidden rounded-lg bg-white font-['Pretendard']">
          <div className="border-b p-6">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          <div className="relative">
            <div className="h-[300px] w-full bg-gray-100 md:h-[500px]">
              <img
                src={images[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                className="h-full w-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white md:h-12 md:w-12"
                  aria-label="이전 이미지"
                >
                  <i className="ri-arrow-left-s-line text-2xl text-gray-900" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white md:h-12 md:w-12"
                  aria-label="다음 이미지"
                >
                  <i className="ri-arrow-right-s-line text-2xl text-gray-900" />
                </button>
              </>
            )}
          </div>

          <div className="bg-gray-50 p-4">
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
              {images.map((image, idx) => (
                <button
                  key={`gallery-${image}-${idx}`}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-20 md:w-20 ${
                    currentIndex === idx ? 'border-[#5C8D5A]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`${idx + 1}번 큰 이미지 보기`}
                >
                  <img src={image} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommonAreaSection = () => {
  const [selectedArea, setSelectedArea] = useState<CommonArea | null>(null);

  // JSON 데이터에서 commonAreas 배열 추출
  const commonAreasData = facilityData.commonAreas as CommonArea[];

  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="mx-auto w-[90%] px-4">
          {/* 섹션 타이틀 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-center gap-3"
          >
            <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">공용 공간 안내</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* JSON 데이터를 기반으로 카드 렌더링 */}
            {commonAreasData.map(area => (
              <motion.button
                key={area.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-sm transition-all hover:shadow-md"
                onClick={() => setSelectedArea(area)}
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/0" />
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{area.name}</h3>
                  <p className="mb-4 line-clamp-2 h-10 text-sm text-gray-600">{area.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">주요 특징</h4>
                    <ul className="space-y-1">
                      {area.features.map(feature => (
                        <li key={feature} className="flex items-center text-sm text-gray-600">
                          <i className="ri-check-line mr-2 flex h-4 w-4 items-center justify-center text-[#5C8D5A]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-sm font-medium text-[#5C8D5A]">
                      <i className="ri-image-line mr-1.5" />
                      {area.galleryImages.length + 1}개 사진 보기
                    </span>
                    <i className="ri-arrow-right-line text-gray-300 transition-colors group-hover:text-[#5C8D5A]" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 모달 데이터 전달 */}
      <ImageGalleryModal
        isOpen={selectedArea !== null}
        onClose={() => setSelectedArea(null)}
        images={selectedArea ? [selectedArea.image, ...selectedArea.galleryImages] : []}
        title={selectedArea?.name || ''}
      />
    </>
  );
};

export default CommonAreaSection;
