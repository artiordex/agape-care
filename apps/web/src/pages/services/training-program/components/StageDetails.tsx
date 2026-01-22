export default function StageDetails() {
  const stages = [
    {
      number: '1',
      title: '초기 적응',
      subtitle: 'Initial Adaptation',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      icon: 'ri-seedling-line',
      goal: '안정적인 환경 적응과 기초 상태 파악',
      description: `단계 1은 초기 적응 단계로, 참여자의 현재 상태를 파악하고 안정적 환경에 적응할 수 있도록 돕습니다. 전문 상담사가 1:1 면담을 진행하며, 가벼운 인지 활동 프로그램으로 일상생활 감각을 회복합니다.

초기 적응을 통해 불안감을 낮추고 프로그램에 대한 자신감을 형성합니다. 어르신의 개별적인 특성과 필요를 세심하게 파악하여, 이후 단계의 맞춤형 케어 계획을 수립합니다.

가족과의 긴밀한 소통을 통해 어르신의 생활 습관, 선호도, 건강 상태 등을 종합적으로 이해하며, 편안하고 안전한 환경을 조성합니다.`,
      activities: [
        '1:1 전문 상담 및 상태 평가',
        '환경 적응 프로그램',
        '기초 인지 활동 (퍼즐, 카드 게임)',
        '친밀감 형성 레크리에이션',
        '가족 면담 및 정보 공유'
      ]
    },
    {
      number: '2',
      title: '기능 향상',
      subtitle: 'Function Enhancement',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      icon: 'ri-bar-chart-box-line',
      goal: '인지 기능과 신체 능력의 점진적 향상',
      description: `단계 2에서는 인지 기능 향상과 일상생활 동작 훈련이 결합된 실습 중심의 프로그램이 진행됩니다. 그룹 활동과 전문가 주도 프로그램을 통해 참여자는 기억력·주의력·문제 해결 능력을 향상시키며, 신체 활동을 통해 균형감과 근력을 강화합니다.

다양한 인지 자극 활동(기억 게임, 단어 연상, 계산 문제)과 생활 실습(요리, 정리정돈, 원예)을 통해 실질적인 생활 능력을 기릅니다.

개인별 진행 상황을 정기적으로 평가하며, 필요에 따라 프로그램 강도와 내용을 조정하여 최적의 효과를 도출합니다. 사회적 상호작용을 통해 정서적 유대감도 함께 강화됩니다.`,
      activities: [
        '인지 게임 및 두뇌 훈련',
        '생활 실습 (요리, 청소, 정리)',
        '그룹 활동 및 사회성 훈련',
        '신체 활동 (걷기, 스트레칭, 가벼운 체조)',
        '기억력·주의력 향상 프로그램'
      ]
    },
    {
      number: '3',
      title: '응용·자립 활동',
      subtitle: 'Application & Independence',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      icon: 'ri-trophy-line',
      goal: '실생활 적용 능력 및 자립 의지 강화',
      description: `3단계는 응용과 자립 활동 중심의 단계로, 실생활 시나리오 기반 훈련이 주를 이룹니다. 참여자는 사회적 상호작용 훈련과 자가 수행 능력 강화 활동을 통해 자신감을 높이고, 독립적인 일상생활이 가능하도록 지원합니다.

실제 생활과 유사한 상황을 재현하여 실전 대응 능력을 키우고, 복잡한 문제 해결 능력과 판단력을 발달시킵니다. 쇼핑, 교통수단 이용, 금전 관리 등 실생활 필수 기능을 연습합니다.

참여자는 자신의 성취를 확인하며 긍정적인 자아 개념을 형성하고, 가족과 지역사회로의 복귀를 준비합니다. 최종 평가를 통해 향상된 능력을 확인하고 향후 유지 관리 계획을 수립합니다.`,
      activities: [
        '실생활 시뮬레이션 훈련',
        '복합 문제 해결 과제',
        '지역사회 연계 활동 (외부 활동)',
        '자가 관리 능력 강화',
        '종합 평가 및 성과 확인'
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-teal-50 to-amber-50 rounded-full text-[#5C8D5A] font-semibold text-sm mb-4">
            3 Stage Program
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            단계별 프로그램 <span className="text-[#5C8D5A]">상세</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            어르신의 상태와 필요에 맞춰 체계적으로 설계된 3단계 프로그램을 통해<br />
            점진적이고 안전한 발전을 경험하실 수 있습니다
          </p>
        </div>

        {/* 단계별 상세 블록 */}
        <div className="space-y-12">
          {stages.map((stage, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* 왼쪽: 타이틀 & 목표 */}
                <div className={`bg-gradient-to-br ${stage.bgColor} p-10 flex flex-col justify-center`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-20 h-20 flex items-center justify-center bg-gradient-to-br ${stage.color} rounded-2xl shadow-lg`}>
                      <i className={`${stage.icon} text-4xl text-white`}></i>
                    </div>
                    <div>
                      <div className={`inline-block px-4 py-1 bg-gradient-to-r ${stage.color} text-white rounded-full text-sm font-bold mb-2`}>
                        STAGE {stage.number}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{stage.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{stage.subtitle}</p>
                    </div>
                  </div>

                  {/* 목표 박스 */}
                  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#5C8D5A]">
                    <div className="flex items-start gap-3">
                      <i className="ri-focus-3-line text-2xl text-[#5C8D5A] mt-1"></i>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">목표</h4>
                        <p className="text-lg font-bold text-gray-900">{stage.goal}</p>
                      </div>
                    </div>
                  </div>

                  {/* 이미지 (작은 썸네일) */}
                  <div className="mt-6 rounded-xl overflow-hidden shadow-md">
                    <img
                      src="https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png"
                      alt={stage.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>

                {/* 오른쪽: 설명 & 활동 */}
                <div className="p-10 flex flex-col justify-between">
                  {/* 설명 */}
                  <div className="mb-8">
                    <div className="prose prose-lg max-w-none">
                      {stage.description.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-base text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* 주요 활동 리스트 */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <i className="ri-checkbox-circle-line text-[#5C8D5A]"></i>
                      주요 활동
                    </h4>
                    <ul className="space-y-3">
                      {stage.activities.map((activity, aIndex) => (
                        <li key={aIndex} className="flex items-start gap-3">
                          <i className="ri-arrow-right-circle-fill text-[#5C8D5A] text-xl mt-0.5 flex-shrink-0"></i>
                          <span className="text-base text-gray-700">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="mt-16 bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8 text-center border-2 border-[#5C8D5A]/20">
          <i className="ri-information-line text-4xl text-[#5C8D5A] mb-4"></i>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <strong className="text-gray-900">모든 프로그램은 전문 상담사와 함께 단계별로 진행되며,</strong><br />
            참여자의 상태에 따라 맞춤형 지원을 제공합니다.<br />
            각 단계는 개인의 속도에 맞춰 유연하게 조정 가능합니다.
          </p>
        </div>
      </div>
    </section>
  );
}