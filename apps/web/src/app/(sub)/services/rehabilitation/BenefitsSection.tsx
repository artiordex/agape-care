'use client';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: 'ri-shield-check-line',
      title: '낙상 위험 감소',
      description: '균형 감각과 근력 향상으로 낙상 사고를 예방합니다',
    },
    {
      icon: 'ri-user-smile-line',
      title: '일상 기능 회복',
      description: '스스로 움직이고 활동하는 능력이 회복되어 삶의 질이 향상됩니다',
    },
    {
      icon: 'ri-heart-add-line',
      title: '만성 통증 완화',
      description: '관절·근육 통증 완화 및 신체 기능 개선 효과가 있습니다',
    },
    {
      icon: 'ri-emotion-happy-line',
      title: '심리적 안정',
      description: '신체 활동으로 우울감이 감소하고 정서적 안정을 돕습니다',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#96B493]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            기대 효과
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">재활 치료를 통한 긍정적 변화</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            체계적인 재활 치료로 어르신의 신체 기능과 삶의 질이 향상됩니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map(b => (
            <div key={b.title} className="rounded-2xl bg-[#F9F8F6] p-6 text-center transition hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#96B493]/10">
                <i className={`${b.icon} text-2xl text-[#5C8D5A]`} />
              </div>
              <h3 className="mb-3 text-base font-bold text-gray-800">{b.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
