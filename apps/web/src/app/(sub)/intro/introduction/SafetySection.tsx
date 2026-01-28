'use client';

export default function SafetySection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            수칙을 엄격히 준수하고 있습니다. 또한 어르신의 생활 기록과 상태를 실시간으로 모니터링하여 작은 변화도 놓치지
            않고 대응하고 있습니다.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-fire-line text-xl text-[#5C8D5A]" />
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
                <i className="ri-shield-cross-line text-xl text-[#5C8D5A]" />
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
                <i className="ri-vidicon-line text-xl text-[#5C8D5A]" />
              </div>
              <h4 className="font-bold text-gray-800">CCTV 모니터링</h4>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">주요 동선 CCTV 설치, 24시간 모니터링 시스템 운영</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-file-list-3-line text-xl text-[#5C8D5A]" />
              </div>
              <h4 className="font-bold text-gray-800">생활 기록 관리</h4>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">실시간 상태 모니터링, 생활일지 작성 및 공유</p>
          </div>
        </div>
      </div>
    </section>
  );
}
