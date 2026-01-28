'use client';

export default function NutritionSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            모든 조리 과정은 위생 및 보건 기준을 철저히 준수하며, 신선한 식재료를 사용하여 정성스럽게 준비하고 있습니다.
            어르신의 기호와 건강 상태를 고려한 식단을 제공함으로써 맛과 영양을 모두 만족시키고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
