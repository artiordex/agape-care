'use client';

export default function StaffSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">전문 인력 구성</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            법적 기준을 충족하는 전문 인력이 24시간 어르신을 돌봅니다
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
          <p className="mb-6 text-base leading-relaxed text-gray-700">
            정원 29인 기준에 맞춰 시설장, 사회복지사, 간호사 또는 간호조무사, 요양보호사, 영양사, 조리원, 사무원 등 법적
            인력 기준을 충족하는 전문 인력을 배치하고 있습니다. 특히 요양보호사는 입소자 2.5명당 1명 이상 배치 기준을
            준수하며, 24시간 교대제로 상주하여 어르신의 생활을 세심하게 돌보고 있습니다.
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            간호 인력과 사회복지사는 함께 협력하여 어르신의 건강 상태와 정서적 안정을 지속적으로 살피며, 야간근무 인력도
            배치되어 있어 밤낮 없이 안전하고 편안한 환경을 제공하고 있습니다. 모든 직원은 정기적인 교육과 훈련을 통해
            전문성을 높이고, 어르신을 가족처럼 따뜻하게 모시는 마음으로 근무하고 있습니다.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-user-star-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-gray-800">시설장</h4>
              <p className="text-sm text-gray-600">시설 전반 운영 관리</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-hand-heart-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-gray-800">사회복지사</h4>
              <p className="text-sm text-gray-600">1명 이상 배치</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-nurse-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-gray-800">간호사·간호조무사</h4>
              <p className="text-sm text-gray-600">1명 이상 배치</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-heart-pulse-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-gray-800">요양보호사</h4>
              <p className="text-sm text-gray-600">입소자 2.5명당 1명 이상</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-restaurant-2-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-gray-800">영양사·조리원</h4>
              <p className="text-sm text-gray-600">급식 관리 및 조리</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-moon-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-gray-800">야간근무 인력</h4>
              <p className="text-sm text-gray-600">24시간 케어 체계</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
