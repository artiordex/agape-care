'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

type SlideItem = {
  image: string;
  title: string;
  subtitle: string;
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 명확하게 SlideItem[] 로 타입 지정 (undefined 포함 X)
  const slides: SlideItem[] = [
    {
      image:
        'https://readdy.ai/api/search-image?query=warm%20peaceful%20elderly%20care%20facility%20with%20bright%20natural%20sunlight%20streaming%20through%20large%20windows%20comfortable%20modern%20interior%20with%20soft%20beige%20and%20warm%20green%20tones%20serene%20atmosphere%20professional%20healthcare%20environment&width=1920&height=1080&seq=hero-slide-1&orientation=landscape',
      title: '가족을 돌보는 마음으로,\n안심하고 맡기실 수 있습니다',
      subtitle: '전문 인력의 체계적인 케어와 따뜻한 보살핌으로\n어르신의 존엄한 삶을 지켜드립니다',
    },
    {
      image:
        'https://readdy.ai/api/search-image?query=elderly%20people%20enjoying%20cognitive%20activities%20in%20bright%20modern%20nursing%20home%20warm%20natural%20lighting%20soft%20beige%20and%20green%20color%20scheme%20peaceful%20atmosphere%20professional%20care%20environment&width=1920&height=1080&seq=hero-slide-2&orientation=landscape',
      title: '인지활동·치매전문 케어로\n삶의 질을 높입니다',
      subtitle: '개별 맞춤형 프로그램으로 기억력과 집중력 향상에\n도움을 드리고 있습니다',
    },
    {
      image:
        'https://readdy.ai/api/search-image?query=professional%20nursing%20staff%20caring%20for%20elderly%20in%20modern%20facility%20warm%20peaceful%20atmosphere%20with%20natural%20lighting%20soft%20neutral%20colors%20comfortable%20healthcare%20environment&width=1920&height=1080&seq=hero-slide-3&orientation=landscape',
      title: '24시간 전문요양 서비스',
      subtitle: '간호사와 요양보호사가 365일 24시간\n어르신의 건강과 안전을 책임집니다',
    },
  ];

  const safeIndex = Math.min(Math.max(currentSlide, 0), slides.length - 1);
  const current = slides[safeIndex]!;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 배경 슬라이드들 */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            safeIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50" />
        </div>
      ))}

      {/* 텍스트 & 버튼 영역 */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 whitespace-pre-line text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {current.title}
          </h1>
          <p className="mx-auto mb-12 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-white/95 sm:text-xl">
            {current.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#consultation"
              className="cursor-pointer whitespace-nowrap rounded-lg bg-[#5C8D5A] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#4A7548]"
            >
              입소 상담하기
            </a>
            <a
              href="#services"
              className="cursor-pointer whitespace-nowrap rounded-lg bg-white/95 px-8 py-4 text-lg font-semibold text-[#5C8D5A] shadow-lg transition-all hover:bg-white"
            >
              프로그램 안내 보기
            </a>
            <a
              href="#facility"
              className="cursor-pointer whitespace-nowrap rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/20"
            >
              시설둘러보기
            </a>
          </div>
        </motion.div>

        {/* 하단 인디케이터 점 */}
        <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 transform gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
                safeIndex === index ? 'w-8 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 아래 화살표 애니메이션 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <i className="ri-arrow-down-line text-3xl text-white/70" />
        </motion.div>
      </div>
    </section>
  );
}
