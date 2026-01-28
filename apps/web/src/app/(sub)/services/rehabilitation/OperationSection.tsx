'use client';

export default function OperationSection() {
  const operationMethods = [
    {
      icon: 'ri-home-heart-line',
      title: '자체 운영',
      description: '시설 내 재활치료실을 갖추고 전문 물리치료사가 상주하여 직접 재활 프로그램을 운영합니다',
    },
    {
      icon: 'ri-user-star-line',
      title: '방문 치료',
      description: '외부 협력 물리치료사가 정기적으로 방문하여 개인별 맞춤 재활 치료를 제공합니다',
    },
    {
      icon: 'ri-links-line',
      title: '의료기관 연계',
      description: '협력 병원 및 재활 전문 기관과 연계하여 필요한 경우 전문 재활 치료를 지원합니다',
    },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#96B493]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            운영 방식
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">다양한 재활 치료 운영 체계</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            어르신의 건강 상태에 따라 적합한 방식으로 재활 서비스를 제공합니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {operationMethods.map((m, i) => (
            <div key={m.title} className="rounded-2xl bg-white p-8 text-center transition hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#96B493]/10">
                <i className={`${m.icon} text-3xl text-[#5C8D5A]`} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">{m.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{m.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#5C8D5A]/10 to-[#96B493]/10 p-10 text-center">
          <i className="ri-time-line mb-4 text-5xl text-[#5C8D5A]" />
          <h3 className="mb-3 text-2xl font-bold text-gray-800">개인별 맞춤 일정 운영</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
            어르신의 상태에 따라 주 2~3회 또는 매일 진행되는 개인별 재활 일정을 수립합니다. 모든 치료 내용은 기록되어
            보호자님께 정기적으로 공유됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
