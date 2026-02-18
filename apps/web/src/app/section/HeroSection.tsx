/**
 * Description : HeroSection.tsx - ?? HeroSection UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

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
      image: '/images/sample.svg',
      title: '가족을 돌보는 마음으로,\n안심하고 맡기실 수 있습니다',
      subtitle: '전문 인력의 체계적인 케어와 따뜻한 보살핌으로\n어르신의 존엄한 삶을 지켜드립니다',
    },
    {
      image: '/images/sample.svg',
      title: '인지활동·치매전문 케어로\n삶의 질을 높입니다',
      subtitle: '개별 맞춤형 프로그램으로 기억력과 집중력 향상에\n도움을 드리고 있습니다',
    },
    {
      image: '/images/sample.svg',
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
    <section className="relative flex items-center justify-center overflow-hidden py-20 md:py-24">
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
          <h1 className="mb-4 whitespace-pre-line text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {current.title}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl whitespace-pre-line text-base leading-relaxed text-white/95 sm:text-lg">
            {current.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#consultation"
              className="cursor-pointer whitespace-nowrap rounded-lg bg-[#5C8D5A] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#4A7548]"
            >
              입소 상담하기
            </a>
            <a
              href="#services"
              className="cursor-pointer whitespace-nowrap rounded-lg bg-white/95 px-6 py-3 text-base font-semibold text-[#5C8D5A] shadow-lg transition-all hover:bg-white"
            >
              프로그램 안내 보기
            </a>
            <a
              href="#facility"
              className="cursor-pointer whitespace-nowrap rounded-lg border-2 border-white bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/20"
            >
              시설둘러보기
            </a>
          </div>
        </motion.div>

        {/* 하단 인디케이터 점 */}
        <div className="mt-8 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-all ${
                safeIndex === index ? 'w-8 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 아래 화살표 애니메이션 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <i className="ri-arrow-down-line text-2xl text-white/70" />
        </motion.div>
      </div>
    </section>
  );
}
