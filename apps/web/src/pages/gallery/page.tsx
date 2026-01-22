import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';
import NoticeSidebar from '../../components/feature/NoticeSidebar';
import { galleryMock } from '../../mocks/gallery';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const itemsPerPage = 9;

  const categories = ['전체', '행사', '일상', '인지프로그램', '여가활동'];

  const filteredItems = galleryMock.filter(item => {
    return selectedCategory === '전체' || item.category === selectedCategory;
  });

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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <FloatingSidebar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-rose-50 via-white to-teal-50 py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                갤러리
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                어르신들의 활동 순간을 기록합니다
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-gray-50/80 py-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-teal-600 transition-colors">홈</Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-700">알림마당</span>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-700">갤러리</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <NoticeSidebar />

            {/* Main Content */}
            <div className="flex-1">
              {/* Category Filter */}
              <div className="mb-12">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                    >
                      {/* Image */}
                      <div 
                        className="relative h-64 overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(item.images?.[0] || '', item.title || '')}
                      >
                        <img
                          src={item.images?.[0] || ''}
                          alt={item.title || '갤러리 이미지'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.jpg';
                          }}
                        />
                        {item.images && item.images.length > 1 && (
                          <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                            <i className="ri-image-line"></i>
                            <span>{item.images.length}</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="mb-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryStyle(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                          {item.title || '제목 없음'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.description || '설명 없음'}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <i className="ri-calendar-line"></i>
                          <span>{item.date || '날짜 정보 없음'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <i className="ri-image-line text-4xl text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    사진이 없습니다
                  </h3>
                  <p className="text-gray-600">
                    다른 카테고리를 선택해보세요
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredItems.length > 0 && totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${
                        currentPage === 1 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      <i className="ri-arrow-left-s-line text-gray-600"></i>
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors whitespace-nowrap ${
                            currentPage === pageNumber
                              ? 'bg-rose-600 text-white'
                              : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${
                        currentPage === totalPages 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      <i className="ri-arrow-right-s-line text-gray-600"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            aria-label="닫기"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage || '/placeholder-image.jpg'} 
              alt={selectedTitle || '갤러리 이미지'}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
            <p className="text-white text-center mt-4 text-lg">{selectedTitle || '제목 없음'}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
