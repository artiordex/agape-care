'use client';

export default function ServicesSection() {
  const services = [
    {
      icon: 'ri-heart-pulse-line',
      title: '건강 상태 모니터링',
      description: '간호사·간호조무사가 매일 혈압, 혈당, 체온 등 활력징후를 체크하고 기록합니다',
      details: ['혈압·혈당 측정', '체온 체크', '맥박 및 호흡 확인', '이상 징후 즉시 보고'],
    },
    {
      icon: 'ri-capsule-line',
      title: '투약 관리',
      description: '처방받은 약물을 정확한 시간에 안전하게 복용할 수 있도록 관리합니다',
      details: ['개인별 투약 일정 관리', '복약 확인 및 기록', '약물 부작용 모니터링', '처방 변경 사항 반영'],
    },
    {
      icon: 'ri-hospital-line',
      title: '협력 의료기관 연계',
      description: '협력 병원과의 연계로 신속한 진료를 지원합니다',
      details: ['정기 건강검진 연계', '외래 진료 동행', '입원 치료 지원', '전문의 자문'],
    },
    {
      icon: 'ri-first-aid-kit-line',
      title: '응급 상황 대응',
      description: '낙상, 질식, 급성 질환 등 응급 상황 발생 시 즉각 대응합니다',
      details: ['응급처치 실시', '119 신속 연락', '보호자 즉시 통보', '병원 이송 동행'],
    },
    {
      icon: 'ri-syringe-line',
      title: '기본 의료 처치',
      description: '상처 소독, 욕창 관리, 카테터 관리 등 기본 의료 처치를 제공합니다',
      details: ['상처 소독 및 드레싱', '욕창 예방 및 관리', '도뇨관·위관 관리', '흡인 및 산소 관리'],
    },
    {
      icon: 'ri-stethoscope-line',
      title: '만성 질환 관리',
      description: '고혈압, 당뇨, 치매 등 만성 질환을 체계적으로 관리합니다',
      details: ['혈압·혈당 정기 측정', '식이 조절', '운동 요법 안내', '합병증 예방'],
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            제공 서비스
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">전문적인 의료지원·간호 서비스</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            어르신의 건강을 지키는 체계적이고 안전한 의료 케어를 제공합니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <div
              key={s.title}
              className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:border-[#5C8D5A]/30 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C8D5A]/10">
                <i className={`${s.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">{s.title}</h3>
              <p className="mb-6 text-sm text-gray-600">{s.description}</p>

              <div className="space-y-2">
                {s.details.map(d => (
                  <div key={d} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5C8D5A]" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
