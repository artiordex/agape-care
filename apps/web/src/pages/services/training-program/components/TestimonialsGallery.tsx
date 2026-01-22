import { useState } from 'react';

export default function TestimonialsGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const testimonials = [
    {
      text: '어머니가 프로그램 참여 후 표정이 밝아지고 대화도 늘었어요',
      author: '김○○ 님 가족'
    },
    {
      text: '단계별로 진행되니 부담 없이 적응할 수 있어서 좋았습니다',
      author: '이○○ 님 가족'
    },
    {
      text: '전문 상담사 선생님들의 세심한 케어에 감사드립니다',
      author: '박○○ 님 가족'
    },
    {
      text: '일상생활에서 스스로 할 수 있는 것들이 많이 늘었어요',
      author: '최○○ 님 가족'
    },
    {
      text: '프로그램이 다양하고 재미있어서 할아버지가 기다리세요',
      author: '정○○ 님 가족'
    }
  ];

  const galleryImages = [
    {
      url: 'https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png',
      alt: '프로그램 활동 모습 1'
    },
    {
      url: 'https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png',
      alt: '프로그램 활동 모습 2'
    },
    {
      url: 'https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png',
      alt: '프로그램 활동 모습 3'
    },
    {
      url: 'https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png',
      alt: '프로그램 활동 모습 4'
    },
    {
      url: 'https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png',
      alt: '프로그램 활동 모습 5'
    },
    {
      url: 'https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png',
      alt: '프로그램 활동 모습 6'
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-teal-50 to-amber-50 rounded-full text-[#5C8D5A] font-semibold text-sm mb-4">
            Testimonials & Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            참여자 <span className="text-[#5C8D5A]">후기 & 갤러리</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            실제 프로그램에 참여하신 분들의 소중한 이야기와<br />
            다양한 활동 모습을 확인해보세요
          </p>
        </div>

        {/* 후기 섹션 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            <i className="ri-chat-quote-line text-[#5C8D5A] mr-2"></i>
            참여자 후기
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-3 mb-4">
                  <i className="ri-double-quotes-l text-3xl text-[#5C8D5A]"></i>
                  <p className="text-base text-gray-700 leading-relaxed flex-1">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-teal-100 to-amber-100 rounded-full">
                    <i className="ri-user-smile-line text-xl text-[#5C8D5A]"></i>
                  </div>
                  <p className="text-sm font-semibold text-gray-600">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 갤러리 섹션 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            <i className="ri-gallery-line text-[#5C8D5A] mr-2"></i>
            활동 갤러리
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <i className="ri-zoom-in-line text-4xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="닫기"
          >
            <i className="ri-close-line text-3xl text-white"></i>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="이전 이미지"
          >
            <i className="ri-arrow-left-s-line text-3xl text-white"></i>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="다음 이미지"
          >
            <i className="ri-arrow-right-s-line text-3xl text-white"></i>
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[selectedImage].url}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <p className="text-white text-center mt-4 text-lg">
              {galleryImages[selectedImage].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}