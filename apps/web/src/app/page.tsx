/**
 * Description : page.tsx - ?? home ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import HeroSection from './section/HeroSection';
import NewsSection from './section/NotificationSection';

// 스크롤 애니메이션
function AnimatedSection({ children, delay = 0 }: Readonly<{ children: React.ReactNode; delay?: number }>) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      {children}
    </div>
  );
}

// 메인 페이지
export default function HomePage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <AnimatedSection delay={200}>
        <NewsSection />
      </AnimatedSection>
    </div>
  );
}
