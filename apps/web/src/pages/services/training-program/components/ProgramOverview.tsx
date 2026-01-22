export default function ProgramOverview() {
  const coreValues = [
    {
      icon: 'ri-brain-line',
      title: '인지 지능 개선',
      description: '기억력과 사고력 향상'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '정서 안정',
      description: '심리적 안정감 제공'
    },
    {
      icon: 'ri-hand-heart-line',
      title: '일상생활 자립 지원',
      description: '독립적인 생활 능력 향상'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽: 이미지 */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png"
                alt="프로그램 개요"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* 장식 요소 */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-teal-100 to-amber-100 rounded-2xl -z-10"></div>
          </div>

          {/* 오른쪽: 콘텐츠 */}
          <div>
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-teal-50 to-amber-50 rounded-full mb-6">
              <span className="text-[#5C8D5A] font-semibold text-sm">Program Overview</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              프로그램 <span className="text-[#5C8D5A]">개요</span>
            </h2>
            
            <div className="space-y-4 mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                보육훈련 3단계 프로그램은 어르신의 <strong className="text-gray-900">인지기능 개선과 일상생활 수행 능력 향상</strong>을 목표로 설계된 종합 프로그램입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                단계별 진행으로 참여자의 상태를 세밀하게 평가하며, 개인별 맞춤 케어를 제공합니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                전문 상담사와 함께 체계적이고 안전한 환경에서 진행되며, 어르신의 삶의 질을 높이는 데 중점을 둡니다.
              </p>
            </div>

            {/* 핵심 목적 카드 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">핵심 목적</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coreValues.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#5C8D5A]"
                  >
                    <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-teal-500 to-amber-500 rounded-full mb-4">
                      <i className={`${value.icon} text-3xl text-white`}></i>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}