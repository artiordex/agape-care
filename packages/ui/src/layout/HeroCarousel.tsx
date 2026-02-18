/**
 * Description : HeroCarousel.tsx - ?? HeroCarousel UI ????
 * Author : Shiwoo Min
 * Date : 2025-09-19
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { HeroCarouselProps } from '../ui-types.js';

export default function HeroCarousel({
  slides,
  interval = 5000,
  autoPlay = true,
  align = 'center',
  className,
  showIndicators = true,
  showArrows = true,
  renderCtas,
  onSlideChange,
  contentPaddingClass = 'py-20 lg:py-32',
  maxWidthClass = 'max-w-7xl',
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = slides.length;

  const idBase = useMemo(() => `hero-carousel-${Math.random().toString(36).slice(2, 8)}`, []);
  const timerRef = useRef<number | null>(null);

  // 자동재생
  useEffect(() => {
    if (!autoPlay || paused || len <= 1) return;
    timerRef.current = window.setInterval(() => {
      setCurrent(prev => (prev + 1) % len);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoPlay, paused, len, interval]);

  useEffect(() => {
    onSlideChange?.(current);
  }, [current, onSlideChange]);

  // 슬라이드 없으면 그리기 생략
  if (len === 0) return null;

  // 키보드 내비게이션
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') setCurrent(p => (p - 1 + len) % len);
    if (e.key === 'ArrowRight') setCurrent(p => (p + 1) % len);
  };

  // 현재 슬라이드 안전 참조(noUncheckedIndexedAccess 대응)
  const cur = slides[current];
  if (!cur) return null;

  return (
    <section
      className={`relative overflow-hidden ${contentPaddingClass} ${className ?? ''}`}
      aria-roledescription="carousel"
      aria-label="프로모션 배너"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* 배경 슬라이드들 — 인라인 스타일 제거, 클래스만 사용 */}
      {slides.map((s, i) => (
        <div
          key={`${idBase}-bg-${i}`}
          className={`slide ${i === current ? 'slideActive' : ''}`}
          aria-hidden={i === current ? undefined : true}
        >
          {/* 전체 배경 이미지 */}
          <img
            src={s.image}
            alt={s.alt ?? ''}
            className="absolute inset-0 h-full w-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
          {/* 파랑 그라데이션 오버레이 (customs.css 의 .overlay) */}
          <div className="overlay" aria-hidden="true" />
        </div>
      ))}

      {/* 콘텐츠 */}
      <div className="relative z-10">
        <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={`w-full ${align === 'left' ? 'text-left' : 'text-center'} text-white`}>
            <h1 className="mb-6 text-4xl font-bold lg:text-6xl" aria-live="polite">
              {cur.title}
              <br />
              {cur.highlight && <span className="text-yellow-400">{cur.highlight}</span>}
            </h1>
            {cur.description && <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100">{cur.description}</p>}
            {renderCtas?.(current)}
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      {showIndicators && len > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {slides.map((_, i) => (
            <button
              key={`${idBase}-dot-${i}`}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-3 w-3 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`슬라이드 ${i + 1}로 이동`}
              aria-controls={`${idBase}-track`}
              aria-current={i === current ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      {/* 화살표 */}
      {showArrows && len > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrent(p => (p - 1 + len) % len)}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label="이전 슬라이드"
          >
            <i aria-hidden className="ri-arrow-left-line flex h-6 w-6 items-center justify-center" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent(p => (p + 1) % len)}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label="다음 슬라이드"
          >
            <i aria-hidden className="ri-arrow-right-line flex h-6 w-6 items-center justify-center" />
          </button>
        </>
      )}

      {/* SR 전용 진행도 */}
      <div id={`${idBase}-track`} className="sr-only" aria-live="polite">
        {current + 1} / {len}
      </div>
    </section>
  );
}
