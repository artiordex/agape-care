'use client';

import { useState } from 'react';
import Link from 'next/link';

import NoticeSidebar from '@/components/NoticeSidebar';
import { galleryMock } from '@/mocks/gallery';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const itemsPerPage = 9;

  const categories = ['전체', '행사', '일상', '인지프로그램', '여가활동'];

  const filteredItems = galleryMock.filter(item => selectedCategory === '전체' || item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const openLightbox = (image: string, title: string) => {
    if (!image) return;
    setSelectedImage(image);
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
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">어르신들의 활동 순간을 기록합니다</p>
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
        {/* Sidebar */}
        <NoticeSidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full px-6 py-2.5 font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
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
                  {/* Image */}
                  <div
                    className="relative h-64 cursor-pointer overflow-hidden"
                    onClick={() => openLightbox(item.images?.[0] || '', item.title || '')}
                  >
                    <img
                      src={item.images?.[0] || ''}
                      alt={item.title || '갤러리 이미지'}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={e => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                    {item.images && item.images.length > 1 && (
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

                    <h3 className="mb-2 mt-2 line-clamp-1 text-lg font-bold text-gray-900">
                      {item.title || '제목 없음'}
                    </h3>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">{item.description || '설명 없음'}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <i className="ri-calendar-line" />
                      <span>{item.date || '날짜 정보 없음'}</span>
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
              onError={e => (e.currentTarget.src = '/placeholder-image.jpg')}
            />
            <p className="mt-4 text-center text-lg text-white">{selectedTitle || '제목 없음'}</p>
          </div>
        </div>
      )}
    </main>
  );
}
