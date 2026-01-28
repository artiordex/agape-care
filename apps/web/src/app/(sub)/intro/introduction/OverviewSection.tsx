'use client';

export default function OverviewSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">기관 개요</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-[#5C8D5A]" />
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
    </section>
  );
}
