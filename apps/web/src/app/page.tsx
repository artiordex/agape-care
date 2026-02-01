/**
 * Description : page.tsx - 📌 Agape-Care 메인 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import AdmissionProcessSection from './section/AdmissionProcessSection';
import ConsultationSection from './section/ConsultationSection';
import FeaturesSection from './section/FeaturesSection';
import HeroSection from './section/HeroSection';
import IntroSection from './section/IntroSection';
import NewsSection from './section/NewsSection';
import ServicesSection from './section/ServicesSection';

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

      <AnimatedSection>
        <IntroSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <ServicesSection />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <FeaturesSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <AdmissionProcessSection />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <NewsSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <ConsultationSection />
      </AnimatedSection>
    </div>
  );
}
