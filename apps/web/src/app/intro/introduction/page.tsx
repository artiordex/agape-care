function OrganizationChart() {
  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">기관의 가치와 목표</h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600">
            소규모 정원형 시설의 강점을 바탕으로 더 나은 미래를 만들어갑니다
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* 핵심 가치 */}
          <div className="mb-8 rounded-2xl bg-white p-10 shadow-md">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
              <i className="ri-star-line mr-2 text-[#5C8D5A]"/>
              우리의 핵심 가치
            </h3>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-[#F9F8F6] p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-user-heart-line text-3xl text-[#5C8D5A]"/>
                </div>
                <h4 className="mb-2 font-bold text-gray-800">개별 맞춤 케어</h4>
                <p className="text-sm text-gray-600">어르신 한 분 한 분의 특성과 필요에 맞춘 세심한 돌봄</p>
              </div>

              <div className="rounded-xl bg-[#F9F8F6] p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-home-heart-line text-3xl text-[#5C8D5A]"/>
                </div>
                <h4 className="mb-2 font-bold text-gray-800">가족 같은 환경</h4>
                <p className="text-sm text-gray-600">소규모 정원으로 가능한 따뜻하고 친밀한 분위기</p>
              </div>

              <div className="rounded-xl bg-[#F9F8F6] p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-shield-star-line text-3xl text-[#5C8D5A]"/>
                </div>
                <h4 className="mb-2 font-bold text-gray-800">전문성과 신뢰</h4>
                <p className="text-sm text-gray-600">법적 기준을 준수하는 체계적이고 전문적인 운영</p>
              </div>
            </div>

            <p className="text-center text-base leading-relaxed text-gray-700">
              저희는 정원 29인 소규모 정원형 시설의 장점을 최대한 활용하여, 대규모 시설에서는 제공하기 어려운 개별화된
              케어와 가족 같은 접근을 실현하고 있습니다. 어르신 한 분 한 분의 이름과 성격, 선호도를 모두 기억하며, 마치
              우리 가족을 돌보듯 세심하게 관심을 기울이고 있습니다.
            </p>
          </div>

          {/* 장기적 목표 */}
          <div className="rounded-2xl bg-white p-10 shadow-md">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
              <i className="ri-compass-3-line mr-2 text-[#5C8D5A]"/>
              장기적 목표 및 운영 방향성
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 rounded-xl bg-[#F9F8F6] p-6">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-gray-800">지속적인 서비스 품질 향상</h4>
                  <p className="text-sm leading-relaxed text-gray-600">
                    정기적인 직원 교육과 시설 개선을 통해 어르신께 더 나은 환경과 서비스를 제공하기 위해 끊임없이
                    노력하고 있습니다. 최신 요양 트렌드와 케어 기법을 지속적으로 학습하여 전문성을 높여가고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-xl bg-[#F9F8F6] p-6">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-gray-800">의료기관과의 협력 강화</h4>
                  <p className="text-sm leading-relaxed text-gray-600">
                    협력 의료기관과의 네트워크를 확대하고 긴밀한 협력 체계를 구축하여, 어르신께서 필요한 의료 서비스를
                    신속하고 정확하게 받으실 수 있도록 하고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-xl bg-[#F9F8F6] p-6">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-gray-800">프로그램 다양화 및 개별화</h4>
                  <p className="text-sm leading-relaxed text-gray-600">
                    어르신의 다양한 관심사와 기능 수준에 맞춘 프로그램을 지속적으로 개발하고, 개별화된 활동 계획을 통해
                    어르신께서 의미 있고 즐거운 시간을 보내실 수 있도록 하고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-xl bg-[#F9F8F6] p-6">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-gray-800">투명한 운영과 신뢰 구축</h4>
                  <p className="text-sm leading-relaxed text-gray-600">
                    보호자님과의 지속적인 소통과 정보 공유를 통해 투명한 운영을 실천하고, 신뢰를 바탕으로 한 장기적인
                    파트너십을 구축해 나가고 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-xl bg-[#F9F8F6] p-6">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-arrow-right-circle-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-gray-800">지역사회와의 연계 활동</h4>
                  <p className="text-sm leading-relaxed text-gray-600">
                    지역사회와의 교류를 통해 어르신께서 사회적 관계를 유지하시고, 지역 주민의 일원으로서 의미 있는
                    활동에 참여하실 수 있도록 지원하고 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-[#5C8D5A] bg-gradient-to-r from-[#5C8D5A]/10 to-[#5C8D5A]/5 p-6">
              <p className="text-base leading-relaxed text-gray-700">
                저희는 어르신의 행복과 보호자의 안심을 최우선으로 생각하며, 소규모 정원형 요양원의 장점을 최대한 살려
                더욱 발전하는 요양원이 되도록 노력하겠습니다. 어르신께서 존엄하고 행복한 노후를 보내실 수 있도록, 그리고
                보호자님께서 믿고 맡기실 수 있는 곳이 되도록 끊임없이 발전해 나가겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 기관 개요 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">기관 개요</h2>
            <div className="mx-auto mb-6 h-1 w-20 bg-[#5C8D5A]"/>
          </div>

          <div className="mx-auto max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              저희 요양원은 <strong className="text-[#5C8D5A]">정원 29인 소규모 정원형 요양원</strong>으로,{' '}
              <strong className="text-[#5C8D5A]">노인장기요양보험 지정기관</strong>으로 등록되어 있습니다. 소규모 시설의
              장점을 살려 어르신 한 분 한 분을 가족처럼 세심하게 돌보는 것을 가장 중요한 가치로 삼고 있습니다.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              어르신께서 편안하고 존엄한 일상을 유지하실 수 있도록 개별 맞춤형 케어를 제공하며, 가족이 느끼는 안심을
              최우선으로 운영하고 있습니다. 24시간 상주 인력이 배치되어 있어 언제든지 어르신의 건강과 안전을 지키고
              있으며, 소규모 정원형 시설이기에 가능한 세심한 관심과 따뜻한 돌봄을 실천하고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              저희는 단순히 요양 서비스를 제공하는 것을 넘어, 어르신께서 존엄성과 자율성을 유지하시며 정서적으로 안정된
              환경에서 생활하실 수 있도록 최선을 다하고 있습니다. 가족을 대신해 따뜻하게 모시는 마음으로 매일 어르신과
              함께하고 있습니다.
            </p>
          </div>
        </div>

        {/* 운영 철학 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">운영 철학</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">어르신의 존엄성과 행복을 최우선으로 생각합니다</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-[#F9F8F6] p-8 transition-all hover:shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-user-heart-line text-3xl text-[#5C8D5A]"/>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">존엄성과 자율성 존중</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                어르신의 존엄성과 자율성을 최우선으로 존중하며, 개개인의 선택과 의견을 소중히 여기는 개별 맞춤형 케어를
                실천하고 있습니다.
              </p>
            </div>

            <div className="rounded-xl bg-[#F9F8F6] p-8 transition-all hover:shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-shield-star-line text-3xl text-[#5C8D5A]"/>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">안전과 정서적 안정</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                안전시설과 응급대응 체계를 완비하여 어르신과 보호자가 안심할 수 있으며, 정서적 안정을 위한 다양한
                프로그램을 운영하고 있습니다.
              </p>
            </div>

            <div className="rounded-xl bg-[#F9F8F6] p-8 transition-all hover:shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-heart-3-line text-3xl text-[#5C8D5A]"/>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">가족 같은 돌봄</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                소규모 정원형 시설만의 장점을 살려 어르신 한 분 한 분을 가족처럼 따뜻하게 대하며, 편안하고 행복한 일상을
                만들어드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* 시설 규모 및 환경 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">시설 규모 및 환경</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              법적 기준 이상의 쾌적하고 안전한 공간을 제공합니다
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              정원 29명 규모의 요양원으로서 법적 기준을 충족하는 넓은 생활 공간과 안전 구조를 갖추고 있습니다. 모든
              침실은 1인당 6.6㎡ 이상의 면적을 확보하여 어르신께서 여유롭게 생활하실 수 있으며, 공용 거실과
              프로그램실에서는 다양한 활동이 진행됩니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              욕실과 복도에는 안전바를 설치하고 모든 바닥은 미끄럼 방지 시공을 통해 안전사고 예방에 최선을 다하고
              있습니다. 또한 식당 및 조리실, 세면·목욕시설, 요양보호사실, 간호사실 등 법정 필수 시설을 완비하였으며,
              스프링클러와 화재감지기, 경보설비 등 화재·피난시설을 갖추어 만일의 상황에도 신속하게 대응할 수 있습니다.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-home-smile-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">침실 6.6㎡ 이상</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-community-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">공용 거실·프로그램실</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-restaurant-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">식당 및 조리실</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-drop-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">세면·목욕시설</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-shield-check-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">안전바 설치</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-alarm-warning-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">화재감지 시스템</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-vidicon-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">CCTV 운영</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <i className="ri-footprint-line mb-3 text-3xl text-[#5C8D5A]"/>
              <p className="text-sm font-semibold text-gray-800">미끄럼 방지 바닥</p>
            </div>
          </div>
        </div>

        {/* 전문 인력 구성 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">전문 인력 구성</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              법적 기준을 충족하는 전문 인력이 24시간 어르신을 돌봅니다
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              정원 29인 기준에 맞춰 시설장, 사회복지사, 간호사 또는 간호조무사, 요양보호사, 영양사, 조리원, 사무원 등
              법적 인력 기준을 충족하는 전문 인력을 배치하고 있습니다. 특히 요양보호사는 입소자 2.5명당 1명 이상 배치
              기준을 준수하며, 24시간 교대제로 상주하여 어르신의 생활을 세심하게 돌보고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              간호 인력과 사회복지사는 함께 협력하여 어르신의 건강 상태와 정서적 안정을 지속적으로 살피며, 야간근무
              인력도 배치되어 있어 밤낮 없이 안전하고 편안한 환경을 제공하고 있습니다. 모든 직원은 정기적인 교육과
              훈련을 통해 전문성을 높이고, 어르신을 가족처럼 따뜻하게 모시는 마음으로 근무하고 있습니다.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-user-star-line text-2xl text-[#5C8D5A]"/>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-gray-800">시설장</h4>
                <p className="text-sm text-gray-600">시설 전반 운영 관리</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-hand-heart-line text-2xl text-[#5C8D5A]"/>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-gray-800">사회복지사</h4>
                <p className="text-sm text-gray-600">1명 이상 배치</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-nurse-line text-2xl text-[#5C8D5A]"/>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-gray-800">간호사·간호조무사</h4>
                <p className="text-sm text-gray-600">1명 이상 배치</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-heart-pulse-line text-2xl text-[#5C8D5A]"/>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-gray-800">요양보호사</h4>
                <p className="text-sm text-gray-600">입소자 2.5명당 1명 이상</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-restaurant-2-line text-2xl text-[#5C8D5A]"/>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-gray-800">영양사·조리원</h4>
                <p className="text-sm text-gray-600">급식 관리 및 조리</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-moon-line text-2xl text-[#5C8D5A]"/>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-gray-800">야간근무 인력</h4>
                <p className="text-sm text-gray-600">24시간 케어 체계</p>
              </div>
            </div>
          </div>
        </div>

        {/* 안전관리 시스템 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">안전관리 시스템</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              어르신과 보호자가 안심할 수 있는 안전 체계를 구축하고 있습니다
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              안전은 운영의 가장 중요한 가치로, 시설 내부의 모든 복도와 주요 동선에는 CCTV가 설치되어 있으며 비상벨과
              스프링클러, 화재감지기 등 법적 기준 이상의 안전 설비를 마련하고 있습니다. 화재안전관리자를 선임하여
              정기적으로 소방훈련 및 점검을 실시하며, 모든 직원은 응급상황 대응 교육을 이수하고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              감염병 대응 체계도 철저히 갖추고 있어 COVID-19를 포함한 각종 감염병 예방을 위해 방문객 출입 관리와 위생
              수칙을 엄격히 준수하고 있습니다. 또한 어르신의 생활 기록과 상태를 실시간으로 모니터링하여 작은 변화도
              놓치지 않고 대응하고 있습니다.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-fire-line text-xl text-[#5C8D5A]"/>
                </div>
                <h4 className="font-bold text-gray-800">화재안전 관리</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                화재안전관리자 선임, 스프링클러·감지기·비상벨 설치, 정기 소방훈련 실시
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-shield-cross-line text-xl text-[#5C8D5A]"/>
                </div>
                <h4 className="font-bold text-gray-800">감염병 대응</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                COVID-19 대응 체계, 방문객 출입 관리, 위생 수칙 준수
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-vidicon-line text-xl text-[#5C8D5A]"/>
                </div>
                <h4 className="font-bold text-gray-800">CCTV 모니터링</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">주요 동선 CCTV 설치, 24시간 모니터링 시스템 운영</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-file-list-3-line text-xl text-[#5C8D5A]"/>
                </div>
                <h4 className="font-bold text-gray-800">생활 기록 관리</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">실시간 상태 모니터링, 생활일지 작성 및 공유</p>
            </div>
          </div>
        </div>

        {/* 의료·간호·건강관리 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">의료·간호·건강관리</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              전문 의료진과의 협력으로 어르신의 건강을 세심하게 관리합니다
            </p>
          </div>

          <div className="mx-auto max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              간호 인력이 매일 어르신의 활력 징후를 점검하고 투약 관리를 철저히 진행하며, 필요한 경우 협력 의료기관과
              즉시 연계하여 신속한 대응이 가능하도록 운영됩니다. 정기적인 건강체크를 통해 어르신의 건강 상태를
              지속적으로 모니터링하며, 작은 변화도 놓치지 않고 기록하고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              응급상황에 대비한 시스템을 갖추고 있어 만일의 상황에서도 신속하게 대처할 수 있으며, 협력 의료기관과의
              긴밀한 협조 체계를 통해 어르신께 필요한 의료 서비스를 즉각 제공하고 있습니다.
            </p>
          </div>
        </div>

        {/* 영양·식단 관리 */}
        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">영양·식단 관리</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              균형 잡힌 영양과 맞춤형 식단으로 어르신의 건강을 지킵니다
            </p>
          </div>

          <div className="mx-auto max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              식단은 영양사의 검수와 관리에 따라 균형 잡힌 영양을 제공하며, 1일 3식과 간식을 제공하여 어르신께서 건강한
              식생활을 유지하실 수 있도록 돕고 있습니다. 연령과 질환, 저작 상태에 맞춘 맞춤형 특식도 제공하여 어르신이
              안전하게 식사하실 수 있도록 하고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              모든 조리 과정은 위생 및 보건 기준을 철저히 준수하며, 신선한 식재료를 사용하여 정성스럽게 준비하고
              있습니다. 어르신의 기호와 건강 상태를 고려한 식단을 제공함으로써 맛과 영양을 모두 만족시키고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <OrganizationChart />
      <PhilosophySection />
    </main>
  );
}
