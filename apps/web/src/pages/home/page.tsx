import { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ServicesSection from './components/ServicesSection';
import FeaturesSection from './components/FeaturesSection';
import AdmissionProcessSection from './components/AdmissionProcessSection';
import NewsSection from './components/NewsSection';
import ConsultationSection from './components/ConsultationSection';

// Intersection Observer를 사용한 스크롤 애니메이션 컴포넌트
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
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
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />
      
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
      
      <Footer />
    </div>
  );
}
