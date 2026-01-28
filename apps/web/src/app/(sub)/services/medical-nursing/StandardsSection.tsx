'use client';

export default function StandardsSection() {
  const nursingStandards = [
    {
      icon: 'ri-nurse-line',
      title: '법정 인력 기준 준수',
      description: '간호사 또는 간호조무사 1명 이상 상주하여 24시간 건강 관리를 제공합니다',
    },
    {
      icon: 'ri-time-line',
      title: '24시간 상주 체계',
      description: '교대 근무로 언제든지 어르신의 상태를 확인할 수 있습니다',
    },
    {
      icon: 'ri-file-text-line',
      title: '건강 기록 관리',
      description: '모든 체크 내역이 기록지로 남아 체계적으로 관리됩니다',
    },
    {
      icon: 'ri-parent-line',
      title: '보호자 정기 보고',
      description: '정기적으로 보호자님께 건강 상태가 공유됩니다',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            운영 기준
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">노인장기요양보험법 기준 준수</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            법정 기준을 준수하여 안전하고 전문적인 서비스를 제공합니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {nursingStandards.map((n, i) => (
            <div key={n.title} className="rounded-2xl bg-[#F9F8F6] p-6 text-center hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className={`${n.icon} text-2xl text-[#5C8D5A]`} />
              </div>
              <h3 className="mb-3 font-bold">{n.title}</h3>
              <p className="text-sm text-gray-600">{n.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
