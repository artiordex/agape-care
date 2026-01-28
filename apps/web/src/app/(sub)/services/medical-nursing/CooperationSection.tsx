'use client';

export default function CooperationSection() {
  const cooperationHospitals = [
    { type: '내과', service: '정기 건강검진, 만성질환 관리' },
    { type: '정형외과', service: '골절, 관절 질환 치료' },
    { type: '치과', service: '구강 검진, 치아 치료' },
    { type: '안과', service: '시력 검사, 백내장 진료' },
    { type: '이비인후과', service: '청력 검사, 이명 치료' },
    { type: '피부과', service: '욕창, 피부 질환 치료' },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            의료 연계
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">협력 의료기관 네트워크</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            전문 의료기관과의 협력을 통해 더 안전한 의료 서비스를 제공합니다
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cooperationHospitals.map((h, i) => (
            <div key={h.type} className="rounded-2xl bg-white p-6 transition hover:shadow-xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-hospital-fill text-xl text-[#5C8D5A]" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{h.type}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{h.service}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#5C8D5A]/10 to-[#7BA178]/10 p-10 text-center">
          <i className="ri-ambulance-line mb-4 text-5xl text-[#5C8D5A]" />
          <h3 className="mb-3 text-2xl font-bold text-gray-800">응급 의료 연계 시스템</h3>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            응급 상황 시 119 및 협력 병원과 즉시 연계하여 신속히 대응합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
