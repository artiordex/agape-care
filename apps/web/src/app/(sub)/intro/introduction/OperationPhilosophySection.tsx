'use client';

export default function OperationPhilosophySection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">운영 철학</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">어르신의 존엄성과 행복을 최우선으로 생각합니다</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-[#F9F8F6] p-8 transition-all hover:shadow-lg">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-user-heart-line text-3xl text-[#5C8D5A]" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">존엄성과 자율성 존중</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              어르신의 존엄성과 자율성을 최우선으로 존중하며, 개개인의 선택과 의견을 소중히 여기는 개별 맞춤형 케어를
              실천하고 있습니다.
            </p>
          </div>

          <div className="rounded-xl bg-[#F9F8F6] p-8 transition-all hover:shadow-lg">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-shield-star-line text-3xl text-[#5C8D5A]" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">안전과 정서적 안정</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              안전시설과 응급대응 체계를 완비하여 어르신과 보호자가 안심할 수 있으며, 정서적 안정을 위한 다양한
              프로그램을 운영하고 있습니다.
            </p>
          </div>

          <div className="rounded-xl bg-[#F9F8F6] p-8 transition-all hover:shadow-lg">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-heart-3-line text-3xl text-[#5C8D5A]" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">가족 같은 돌봄</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              소규모 정원형 시설만의 장점을 살려 어르신 한 분 한 분을 가족처럼 따뜻하게 대하며, 편안하고 행복한 일상을
              만들어드립니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
