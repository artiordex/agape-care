/**
 * Description : RoomTypeSection.tsx - 📌 객실 안내 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import facilityData from '@/data/facility.json';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Room {
  id: number;
  name: string;
  size: string;
  capacity: string;
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

const ImageGalleryModal = ({ isOpen, onClose, images, title }: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      globalThis.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      globalThis.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative mx-4 w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
          aria-label="Close modal"
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
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white"
                  aria-label="Previous image"
                >
                  <i className="ri-arrow-left-s-line text-2xl text-gray-900" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white"
                  aria-label="Next image"
                >
                  <i className="ri-arrow-right-s-line text-2xl text-gray-900" />
                </button>
              </>
            )}
          </div>

          <div className="bg-gray-50 p-4">
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-20 md:w-20 ${
                    currentIndex === index ? 'border-[#5C8D5A]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomTypeSection = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // JSON 데이터에서 객실 정보 추출
  const { rooms } = facilityData as any;

  return (
    <>
      <section className="bg-white py-20">
        {/* 컨텐츠 넓이를 화면의 90%로 설정 */}
        <div className="mx-auto w-[90%] px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-center gap-3"
          >
            <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">객실 안내</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {rooms.map((room: Room, index: number) => (
              <motion.button
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group w-full overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-sm transition-all hover:shadow-xl"
                onClick={() => setSelectedRoom(room)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedRoom(room);
                  }
                }}
                type="button"
                aria-label={`${room.name} details`}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-[#5C8D5A] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    {room.capacity}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{room.name}</h3>
                  <p className="mb-4 text-sm font-medium text-gray-500">면적: {room.size}</p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-900">주요 시설</h4>
                    <ul className="space-y-2">
                      {room.features.map(feature => (
                        <li key={feature} className="flex items-center text-sm text-gray-600">
                          <i className="ri-check-line mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5C8D5A]/10 text-[#5C8D5A]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-sm font-bold text-[#5C8D5A]">
                      <i className="ri-image-line mr-1.5" />
                      {room.galleryImages.length + 1}개 사진 보기
                    </span>
                    <i className="ri-arrow-right-line text-gray-300 transition-colors group-hover:text-[#5C8D5A]" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <ImageGalleryModal
        isOpen={selectedRoom !== null}
        onClose={() => setSelectedRoom(null)}
        images={selectedRoom ? [selectedRoom.image, ...selectedRoom.galleryImages] : []}
        title={selectedRoom?.name || ''}
      />
    </>
  );
};

export default RoomTypeSection;
