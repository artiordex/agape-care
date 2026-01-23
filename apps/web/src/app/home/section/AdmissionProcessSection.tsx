import { motion } from 'framer-motion';

export default function AdmissionProcessSection() {
  const steps = [
    {
      icon: 'ri-phone-line',
      title: '상담 신청',
      description: '전화 또는 온라인으로\n무료 상담을 신청해 주세요',
      color: '#5C8D5A',
    },
    {
      icon: 'ri-user-heart-line',
      title: '방문 상담',
      description: '센터를 직접 방문하여\n시설과 프로그램을 확인하세요',
      color: '#7BA178',
    },
    {
      icon: 'ri-file-list-3-line',
      title: '준비서류 안내',
      description: '입소에 필요한 서류를\n안내해 드립니다',
      color: '#96B493',
    },
    {
      icon: 'ri-hospital-line',
      title: '장기요양등급 안내',
      description: '장기요양등급 신청 및\n인정 절차를 도와드립니다',
      color: '#A8C5A5',
    },
    {
      icon: 'ri-file-text-line',
      title: '계약 및 입소',
      description: '계약 진행 후\n편안하게 입소하실 수 있습니다',
      color: '#5C8D5A',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
            입소 절차
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            간편하고 빠른 입소 절차
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            상담부터 입소까지 전 과정을 친절하게 안내해 드립니다
          </p>
        </motion.div>

        <div className="relative">
          {/* 연결선 */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#5C8D5A] via-[#96B493] to-[#5C8D5A] opacity-20"/>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="relative w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-lg z-10 bg-white border-4 border-white"
                  style={{ backgroundColor: `${step.color}10` }}
                >
                  <div
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: step.color }}
                  >
                    {index + 1}
                  </div>
                  <i
                    className={`${step.icon} text-5xl`}
                    style={{ color: step.color }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#5C8D5A] text-white text-lg font-semibold rounded-lg hover:bg-[#4A7548] transition-all shadow-lg whitespace-nowrap cursor-pointer"
          >
            <i className="ri-phone-line"/>
            무료 상담 신청하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}
