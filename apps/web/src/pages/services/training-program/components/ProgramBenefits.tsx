export default function ProgramBenefits() {
  const benefits = [
    {
      icon: 'ri-brain-line',
      title: '인지 기능 향상',
      description: '기억력, 주의력, 문제해결 능력이 체계적으로 개선됩니다'
    },
    {
      icon: 'ri-user-heart-line',
      title: '일상생활 자립 능력 강화',
      description: '스스로 할 수 있는 일이 늘어나며 자신감이 향상됩니다'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '정서 안정 및 사회성 개선',
      description: '불안과 우울이 감소하고 긍정적인 마음가짐을 가집니다'
    },
    {
      icon: 'ri-team-line',
      title: '가족 만족도 증가',
      description: '가족과의 관계가 개선되고 보호자의 부담이 줄어듭니다'
    },
    {
      icon: 'ri-shield-check-line',
      title: '안전한 환경',
      description: '전문 인력의 세심한 관리 아래 안전하게 진행됩니다'
    },
    {
      icon: 'ri-star-smile-line',
      title: '삶의 질 향상',
      description: '전반적인 생활 만족도와 행복감이 증가합니다'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-teal-50 to-amber-50 rounded-full text-[#5C8D5A] font-semibold text-sm mb-4">
            Program Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            프로그램 <span className="text-[#5C8D5A]">기대 효과</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            체계적이고 전문적인 3단계 프로그램을 통해<br />
            다음과 같은 긍정적인 변화를 경험하실 수 있습니다
          </p>
        </div>

        {/* 효과 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-100 hover:border-[#5C8D5A] hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-teal-500 to-amber-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <i className={`${benefit.icon} text-3xl text-white`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-[#5C8D5A] text-xl"></i>
                {benefit.title}
              </h3>
              
              <p className="text-base text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 강조 박스 */}
        <div className="mt-16 bg-gradient-to-r from-teal-500 to-amber-500 rounded-2xl p-10 text-center shadow-xl">
          <div className="max-w-4xl mx-auto">
            <i className="ri-medal-line text-5xl text-white mb-4"></i>
            <h3 className="text-3xl font-bold text-white mb-4">
              검증된 효과, 신뢰할 수 있는 프로그램
            </h3>
            <p className="text-lg text-white/95 leading-relaxed">
              수년간의 임상 경험과 연구를 바탕으로 설계된 프로그램으로,<br />
              실제 참여자들의 높은 만족도와 눈에 띄는 개선 효과를 확인하실 수 있습니다.<br />
              전문 인력의 체계적인 관리와 개인 맞춤형 접근으로 최상의 결과를 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}