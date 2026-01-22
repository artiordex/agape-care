import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://readdy.ai/api/search-image?query=warm%20peaceful%20elderly%20care%20facility%20with%20bright%20natural%20sunlight%20streaming%20through%20large%20windows%20comfortable%20modern%20interior%20with%20soft%20beige%20and%20warm%20green%20tones%20serene%20atmosphere%20professional%20healthcare%20environment&width=1920&height=1080&seq=hero-slide-1&orientation=landscape',
      title: '가족을 돌보는 마음으로,\n안심하고 맡기실 수 있습니다',
      subtitle: '전문 인력의 체계적인 케어와 따뜻한 보살핌으로\n어르신의 존엄한 삶을 지켜드립니다',
    },
    {
      image: 'https://readdy.ai/api/search-image?query=elderly%20people%20enjoying%20cognitive%20activities%20in%20bright%20modern%20nursing%20home%20warm%20natural%20lighting%20soft%20beige%20and%20green%20color%20scheme%20peaceful%20atmosphere%20professional%20care%20environment&width=1920&height=1080&seq=hero-slide-2&orientation=landscape',
      title: '인지활동·치매전문 케어로\n삶의 질을 높입니다',
      subtitle: '개별 맞춤형 프로그램으로 기억력과 집중력 향상에\n도움을 드리고 있습니다',
    },
    {
      image: 'https://readdy.ai/api/search-image?query=professional%20nursing%20staff%20caring%20for%20elderly%20in%20modern%20facility%20warm%20peaceful%20atmosphere%20with%20natural%20lighting%20soft%20neutral%20colors%20comfortable%20healthcare%20environment&width=1920&height=1080&seq=hero-slide-3&orientation=landscape',
      title: '24시간 전문요양 서비스',
      subtitle: '간호사와 요양보호사가 365일 24시간\n어르신의 건강과 안전을 책임집니다',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50"></div>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#consultation"
              className="px-8 py-4 bg-[#5C8D5A] text-white text-lg font-semibold rounded-lg hover:bg-[#4A7548] transition-all shadow-lg whitespace-nowrap cursor-pointer"
            >
              입소 상담하기
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white/95 text-[#5C8D5A] text-lg font-semibold rounded-lg hover:bg-white transition-all shadow-lg whitespace-nowrap cursor-pointer"
            >
              프로그램 안내 보기
            </a>
            <a
              href="#facility"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-all shadow-lg whitespace-nowrap cursor-pointer"
            >
              시설둘러보기
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="ri-arrow-down-line text-3xl text-white/70"></i>
        </motion.div>
      </div>
    </section>
  );
}