'use client';

import Link from 'next/link';

export default function MedicalNursingPage() {
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
      description: '내과, 정형외과, 치과 등 협력 병원과의 긴밀한 연계로 신속한 진료를 지원합니다',
      details: ['정기 건강검진 연계', '외래 진료 동행', '입원 치료 지원', '전문의 자문'],
    },
    {
      icon: 'ri-first-aid-kit-line',
      title: '응급 상황 대응',
      description: '낙상, 질식, 급성 질환 등 응급 상황 발생 시 즉각 대응하고 119와 연계합니다',
      details: ['응급처치 실시', '119 신속 연락', '보호자 즉시 통보', '병원 이송 동행'],
    },
    {
      icon: 'ri-syringe-line',
      title: '기본 의료 처치',
      description: '상처 소독, 욕창 관리, 카테터 관리 등 기본적인 의료 처치를 제공합니다',
      details: ['상처 소독 및 드레싱', '욕창 예방 및 관리', '도뇨관·위관 관리', '흡인 및 산소 관리'],
    },
    {
      icon: 'ri-stethoscope-line',
      title: '만성 질환 관리',
      description: '고혈압, 당뇨, 치매 등 만성 질환을 체계적으로 관리하고 악화를 예방합니다',
      details: ['혈압·혈당 정기 측정', '식이 조절 지원', '운동 요법 안내', '합병증 예방 교육'],
    },
  ];

  const cooperationHospitals = [
    { type: '내과', service: '정기 건강검진, 만성질환 관리' },
    { type: '정형외과', service: '골절, 관절 질환 치료' },
    { type: '치과', service: '구강 검진, 치아 치료' },
    { type: '안과', service: '시력 검사, 백내장 진료' },
    { type: '이비인후과', service: '청력 검사, 이명 치료' },
    { type: '피부과', service: '욕창, 피부 질환 치료' },
  ];

  const nursingStandards = [
    {
      icon: 'ri-nurse-line',
      title: '법정 인력 기준 준수',
      description: '간호사 또는 간호조무사 1명 이상 상주하여 24시간 건강 관리를 제공합니다',
    },
    {
      icon: 'ri-time-line',
      title: '24시간 상주 체계',
      description: '낮과 밤 교대 근무로 언제든지 어르신의 건강 상태를 확인할 수 있습니다',
    },
    {
      icon: 'ri-file-text-line',
      title: '건강 기록 관리',
      description: '모든 건강 체크와 투약 내역은 개별 기록지에 작성되어 체계적으로 관리됩니다',
    },
    {
      icon: 'ri-parent-line',
      title: '보호자 정기 보고',
      description: '어르신의 건강 상태와 의료 서비스 내역을 보호자님께 정기적으로 공유합니다',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-cyan-50/30">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 pb-24 pt-40 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="hover:underline">
              홈
            </Link>
            <i className="ri-arrow-right-s-line"/>
            <span className="font-semibold">의료지원·간호서비스</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">의료지원·간호서비스</h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
            정원 29인 소규모 요양원 법정 기준에 따라 간호사 또는 간호조무사가 상주하며, 어르신의 건강 상태를 24시간
            모니터링하고 투약 관리, 응급 상황 대응, 협력 의료기관 연계 등 전문적인 의료지원 서비스를 제공합니다.
          </p>
        </div>
      </section>

      {/* Services */}
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
            {services.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:border-[#5C8D5A]/30 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C8D5A]/10">
                  <i className={`${s.icon} text-3xl text-[#5C8D5A]`}/>
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-800">{s.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">{s.description}</p>

                <div className="space-y-2">
                  {s.details.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
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

      {/* Cooperation Hospitals */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              의료 연계
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">협력 의료기관 네트워크</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              전문 의료기관과의 긴밀한 협력으로 신속하고 정확한 진료를 지원합니다
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cooperationHospitals.map((h, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 transition hover:shadow-xl">
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
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
              응급 상황 발생 시 119 긴급 출동 요청과 동시에 협력 병원 응급실로 신속하게 이송되며, 간호 인력이 동행하여
              어르신의 상태를 정확하게 전달합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Nursing Standards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              운영 기준
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">노인장기요양보험법 기준 준수</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              법정 기준을 철저히 준수하여 안전하고 전문적인 의료서비스를 제공합니다
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {nursingStandards.map((n, i) => (
              <div key={i} className="rounded-2xl bg-[#F9F8F6] p-6 text-center transition hover:shadow-xl">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className={`${n.icon} text-2xl text-[#5C8D5A]`} />
                </div>

                <h3 className="mb-3 text-base font-bold text-gray-800">{n.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-gradient-to-br from-[#5C8D5A] to-[#4A7148] p-12 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-bold">의료지원·간호서비스 문의</h2>
            <p className="mb-8 text-base opacity-90">어르신의 건강 상태에 맞는 의료 서비스를 안내해 드립니다</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#5C8D5A] hover:bg-gray-50"
              >
                <i className="ri-phone-line text-xl" />
                전화 상담하기
              </a>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-white hover:bg-white/20"
              >
                <i className="ri-mail-line text-xl" />
                온라인 문의
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
