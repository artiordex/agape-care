'use client';

export default function BehaviorEmotionSection() {
  const programs = [
    {
      icon: 'ri-emotion-normal-line',
      title: '감정 조절 훈련',
      description: '불안·우울을 완화하고 긍정적인 감정 표현을 유도하는 프로그램입니다.',
      items: ['감정 표현 연습', '호흡 이완 훈련', '긍정 회상 대화', '스트레스 완화 활동'],
    },
    {
      icon: 'ri-group-line',
      title: '사회적 행동 훈련',
      description: '타인과의 의사소통 능력을 향상시키는 그룹 기반 훈련입니다.',
      items: ['차례 지켜 말하기', '소규모 그룹 토론', '협동 게임', '상호작용 촉진 활동'],
    },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm text-[#5C8D5A]">
            감정·행동 관리
          </span>
          <h2 className="mb-4 mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">감정·행동 조절 프로그램</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            어르신의 감정적 안정과 사회적 상호작용 향상을 위한 프로그램을 제공합니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {programs.map(p => (
            <div key={p.title} className="rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#7BA178]/10">
                <i className={`${p.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">{p.title}</h3>
              <p className="mb-6 text-sm text-gray-600">{p.description}</p>

              <ul className="space-y-2">
                {p.items.map(it => (
                  <li key={it} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#7BA178]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
