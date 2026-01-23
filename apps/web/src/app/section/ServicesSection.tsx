import { motion } from 'framer-motion';

export default function ServicesSection() {
  const services = [
    {
      icon: 'ri-heart-pulse-line',
      title: '치매 전문 케어',
      description: '치매 전문 교육을 받은 요양보호사와 간호사가 개별 맞춤형 프로그램으로 인지 기능 유지를 돕습니다.',
      color: '#5C8D5A',
    },
    {
      icon: 'ri-palette-line',
      title: '인지활동 프로그램',
      description: '음악치료, 미술치료, 원예치료 등 다양한 프로그램으로 기억력과 집중력 향상에 도움을 드립니다.',
      color: '#7BA178',
    },
    {
      icon: 'ri-heart-add-line',
      title: '재활·물리치료',
      description: '전문 물리치료사의 체계적인 재활 프로그램으로 신체 기능 회복과 유지를 지원합니다.',
      color: '#96B493',
    },
    {
      icon: 'ri-stethoscope-line',
      title: '의료지원 간호 서비스',
      description: '간호사가 24시간 상주하여 건강 상태를 모니터링하고 응급 상황에 즉시 대응합니다.',
      color: '#A8C5A5',
    },
    {
      icon: 'ri-restaurant-2-line',
      title: '영양관리 및 맞춤 식단',
      description: '영양사가 관리하는 균형 잡힌 식단과 개인별 특이식 제공으로 건강한 식생활을 책임집니다.',
      color: '#5C8D5A',
    },
    {
      icon: 'ri-music-2-line',
      title: '여가 활동 프로그램',
      description: '노래교실, 영화감상, 산책, 레크리에이션 등 다양한 여가활동으로 즐거운 일상을 만듭니다.',
      color: '#7BA178',
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
            주요 서비스
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            전문적이고 체계적인 케어 서비스
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            어르신의 신체적·정신적 건강과 행복한 일상을 위한 종합 케어 서비스를 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#F9F8F6] rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-[#5C8D5A]/20"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <i
                  className={`${service.icon} text-3xl`}
                  style={{ color: service.color }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center text-[#5C8D5A] font-semibold text-sm group-hover:gap-2 transition-all">
                자세히 보기
                <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform"/>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
