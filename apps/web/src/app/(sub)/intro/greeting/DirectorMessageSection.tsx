'use client';

export default function DirectorMessageSection() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">시설장 인사말</h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5C8D5A]/5 to-[#5C8D5A]/10 p-12">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-[#5C8D5A]/5"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-40 w-40 rounded-full bg-[#5C8D5A]/5"></div>

          {/* 내부 콘텐츠 */}
          <div className="relative space-y-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-heart-3-line text-4xl text-[#5C8D5A]" />
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              저희 요양원을 찾아주신 보호자님과 어르신께 진심으로 감사드립니다.
            </p>

            <p className="text-base leading-relaxed text-gray-700">
              정원 29인 소규모 정원형 시설만의 장점을 살려, 어르신 한 분 한 분께 세심한 관심과 개별 맞춤형 케어를
              제공하는 것이 저희의 가장 큰 자랑입니다. 가족 같은 분위기 속에서 어르신께서 편안하고 행복한 일상을 보내실
              수 있도록 최선을 다하고 있습니다.
            </p>

            <p className="text-base leading-relaxed text-gray-700">
              저희는 단순한 요양 서비스를 넘어, 어르신의 존엄성과 자율성을 존중하며 정서적으로 안정된 환경을 만들어가고
              있습니다. 전문 인력과 안전한 시설을 기반으로 어르신을 가족처럼 모시겠습니다.
            </p>

            <p className="text-base leading-relaxed text-gray-700">
              보호자님과의 지속적인 소통을 통해 신뢰를 쌓아가고 있으며, 언제든지 궁금하신 사항은 편하게 문의하실 수
              있도록 열려 있습니다.
            </p>

            <p className="mt-8 text-lg font-semibold text-[#5C8D5A]">가족 같은 마음으로 어르신을 모시겠습니다.</p>

            <div className="mt-8 border-t border-gray-300 pt-6">
              <p className="text-sm text-gray-600">시설장 드림</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
