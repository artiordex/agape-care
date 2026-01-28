'use client';

export default function SafetyEducationSection() {
  const trainings = [
    {
      icon: 'ri-alert-line',
      title: '낙상 예방 교육',
      items: ['올바른 보행법', '손잡이 사용법', '미끄럼 방지 연습', '안전한 일어서기·앉기'],
    },
    {
      icon: 'ri-first-aid-kit-line',
      title: '응급 상황 대응',
      items: ['119 신고 요령', '기도 막힘 대처', '화재 발생 시 행동', '응급 구조요령 교육'],
    },
    {
      icon: 'ri-shield-cross-line',
      title: '감염 예방 교육',
      items: ['손 위생 교육', '기침 예절', '마스크 올바른 착용', '감염 증상 확인법'],
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm text-[#5C8D5A]">안전 교육</span>
          <h2 className="mb-4 mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">안전·응급 상황 예방 교육</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            안전사고를 줄이고 응급 상황에 대비하기 위한 필수 교육을 진행합니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {trainings.map(t => (
            <div
              key={t.title}
              className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#7BA178]/10">
                <i className={`${t.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-4 text-lg font-bold text-gray-800">{t.title}</h3>

              <ul className="space-y-2">
                {t.items.map(item => (
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
