'use client';

export default function CareLevelsSection() {
  const careLevels = [
    {
      level: '1등급',
      condition: '완전 자립 불가',
      color: 'from-red-500 to-red-600',
      services: ['24시간 전담 케어', '전면적 일상생활 지원', '집중 건강 모니터링', '전문 간호 서비스'],
    },
    {
      level: '2등급',
      condition: '상당 부분 도움 필요',
      color: 'from-orange-500 to-orange-600',
      services: ['일상생활 전반 지원', '정기 건강 체크', '맞춤형 재활 프로그램', '영양 관리'],
    },
    {
      level: '3등급',
      condition: '부분적 도움 필요',
      color: 'from-amber-500 to-amber-600',
      services: ['필요 시 생활 지원', '건강 상태 모니터링', '재활 운동 지원', '사회 활동 참여'],
    },
    {
      level: '4-5등급',
      condition: '경증 도움 필요',
      color: 'from-teal-500 to-teal-600',
      services: ['자립 생활 지원', '예방적 건강 관리', '여가 프로그램 참여', '사회성 유지 활동'],
    },
  ];

  return (
    <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">등급별 맞춤 케어</h2>
          <p className="text-lg text-gray-600">장기요양등급에 따른 차별화된 케어 서비스</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {careLevels.map(level => (
            <div
              key={level.level}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`bg-gradient-to-br p-6 text-center ${level.color}`}>
                <h3 className="mb-2 text-2xl font-bold text-white">{level.level}</h3>
                <p className="text-sm text-white/90">{level.condition}</p>
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {level.services.map(s => (
                    <li key={s} className="flex items-start gap-2">
                      <i className="ri-check-line mt-1 text-teal-600" />
                      <span className="text-sm text-gray-700">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
