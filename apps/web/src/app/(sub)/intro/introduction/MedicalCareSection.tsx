'use client';

export default function MedicalCareSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">의료·간호·건강관리</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            전문 의료진과의 협력으로 어르신의 건강을 세심하게 관리합니다
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
          <p className="mb-6 text-base leading-relaxed text-gray-700">
            간호 인력이 매일 어르신의 활력 징후를 점검하고 투약 관리를 철저히 진행하며, 필요한 경우 협력 의료기관과 즉시
            연계하여 신속한 대응이 가능하도록 운영됩니다. 정기적인 건강체크를 통해 어르신의 건강 상태를 지속적으로
            모니터링하며, 작은 변화도 놓치지 않고 기록하고 있습니다.
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            응급상황에 대비한 시스템을 갖추고 있어 만일의 상황에서도 신속하게 대처할 수 있으며, 협력 의료기관과의 긴밀한
            협조 체계를 통해 어르신께 필요한 의료 서비스를 즉각 제공하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
