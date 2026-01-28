'use client';

import NoticeSidebar from '@/components/NoticeSidebar';
import Link from 'next/link';
import { useState } from 'react';

/* mock 제거 — 하드코딩된 갤러리 데이터 */
const galleryItems = [
  {
    id: 1,
    title: '어르신 생신 행사 🎉',
    category: '행사',
    date: '2026-01-10',
    description: '어르신 생신을 축하드리는 행사 사진입니다.',
    images: ['/img/gallery/sample-1.jpg'],
  },
  {
    id: 2,
    title: '점심 식사 시간 🍱',
    category: '일상',
    date: '2026-01-07',
    description: '맛있는 점심을 드시는 모습입니다.',
    images: ['/img/gallery/sample-2.jpg', '/img/gallery/sample-3.jpg'],
  },
  {
    id: 3,
    title: '인지 프로그램 활동',
    category: '인지프로그램',
    date: '2026-01-03',
    description: '어르신들의 인지 기능 향상 활동입니다.',
    images: ['/img/gallery/sample-4.jpg'],
  },
  {
    id: 4,
    title: '산책하는 모습 🌿',
    category: '여가활동',
    date: '2025-12-30',
    description: '날씨 좋은 날 야외 산책 사진입니다.',
    images: ['/img/gallery/sample-5.jpg'],
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const itemsPerPage = 9;
  const categories = ['전체', '행사', '일상', '인지프로그램', '여가활동'];

  const filteredItems =
    selectedCategory === '전체' ? galleryItems : galleryItems.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (src: string, title: string) => {
    if (!src) return;
    setSelectedImage(src);
    setSelectedTitle(title);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case '행사':
        return 'bg-rose-50 text-rose-700';
      case '일상':
        return 'bg-teal-50 text-teal-700';
      case '인지프로그램':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-amber-50 text-amber-700';
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 pt-20">
      {/* Hero Section */}
      <div className="mb-8 border-b border-gray-100 bg-gradient-to-br from-rose-50 via-white to-teal-50 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">갤러리</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">어르신들의 활동 순간을 기록합니다</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mb-12 border-b border-gray-100 bg-gray-50/80 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-600">
            홈
          </Link>
          <i className="ri-arrow-right-s-line text-gray-400" />
          <span>알림마당</span>
          <i className="ri-arrow-right-s-line text-gray-400" />
          <span>갤러리</span>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <NoticeSidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full px-6 py-2.5 font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentItems.map(item => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg"
                >
                  <div
                    className="relative h-64 cursor-pointer overflow-hidden"
                    onClick={() => openLightbox(item.images[0], item.title)}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={e => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />

                    {item.images.length > 1 && (
                      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white">
                        <i className="ri-image-line" />
                        <span>{item.images.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getCategoryStyle(
                        item.category,
                      )}`}
                    >
                      {item.category}
                    </span>

                    <h3 className="mb-2 mt-2 line-clamp-1 text-lg font-bold text-gray-900">{item.title}</h3>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">{item.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <i className="ri-calendar-line" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <i className="ri-image-line text-4xl text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">사진이 없습니다</h3>
              <p className="text-gray-600">다른 카테고리를 선택해보세요</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                    currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-arrow-left-s-line" />
                </button>

                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium transition ${
                      currentPage === idx + 1 ? 'bg-rose-600 text-white' : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                    currentPage === totalPages ? 'opacity-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-arrow-right-s-line" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <i className="ri-close-line text-2xl" />
          </button>

          <div className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <img
              src={selectedImage || '/placeholder-image.jpg'}
              alt={selectedTitle}
              className="max-h-[80vh] w-full rounded-lg object-contain"
              onError={e => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
            <p className="mt-4 text-center text-lg text-white">{selectedTitle}</p>
          </div>
        </div>
      )}
    </main>
  );
}
