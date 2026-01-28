'use client';

export default function BasicTrainingSection() {
  const programs = [
    {
      icon: 'ri-brain-line',
      title: '기본 인지 자극 훈련',
      description: '기억력·주의력·문제해결력을 유지하고 향상시키기 위한 기초 인지 교육 프로그램입니다.',
      activities: ['숫자·단어 기억하기', '연속 그림 순서 맞추기', '퍼즐 맞추기', '시간·계절 구분 훈련'],
    },
    {
      icon: 'ri-mental-health-line',
      title: '치매 예방 두뇌 훈련',
      description: '두뇌 신경 회로를 활성화하여 초기 치매 예방에 도움을 줍니다.',
      activities: ['두뇌 스트레칭', '기억 회상 인터뷰', '소리·색깔 자극 훈련', '집중력 강화 게임'],
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm text-[#5C8D5A]">
            기초 인지 교육
          </span>
          <h2 className="mb-4 mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">기본 인지 및 치매예방 교육</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            어르신의 기본 인지 능력을 유지하고 치매를 예방하기 위한 훈련을 진행합니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {programs.map(p => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#7BA178]/10">
                <i className={`${p.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">{p.title}</h3>
              <p className="mb-6 text-sm text-gray-600">{p.description}</p>

              <div className="space-y-2">
                {p.activities.map(a => (
                  <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#7BA178]" />
                    {a}
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
