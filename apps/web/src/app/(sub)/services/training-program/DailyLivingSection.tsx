'use client';

export default function DailyLivingSection() {
  const categories = [
    {
      icon: 'ri-hand-heart-line',
      title: '일상 동작 훈련(ADL)',
      description: '스스로 생활할 수 있는 능력을 유지하기 위해 기본 동작 훈련을 진행합니다.',
      items: ['세수·양치 연습', '옷 갈아입기', '화장실 사용 훈련', '식사 동작 훈련'],
    },
    {
      icon: 'ri-team-line',
      title: '도움이 필요한 동작(IADL)',
      description: '가벼운 보조가 필요한 일상 동작을 단계별로 지도합니다.',
      items: ['물건 정리하기', '간단한 청소', '전화 사용', '가벼운 심부름 훈련'],
    },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm text-[#5C8D5A]">
            일상생활 훈련
          </span>
          <h2 className="mb-4 mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">일상생활 동작 훈련(ADL · IADL)</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            스스로 생활할 수 있도록 기본 동작부터 인지 기반 행동까지 단계적으로 훈련합니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map(c => (
            <div key={c.title} className="rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#7BA178]/10">
                <i className={`${c.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">{c.title}</h3>
              <p className="mb-6 text-sm text-gray-600">{c.description}</p>

              <ul className="space-y-2">
                {c.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#7BA178]" />
                    {item}
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
