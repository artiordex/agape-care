'use client';

export default function ProgramsSection() {
  const programs = [
    {
      icon: 'ri-walk-line',
      title: '보행 훈련',
      description: '안전하게 걷는 능력을 회복하고 유지하기 위한 체계적인 보행 훈련을 제공합니다',
      activities: ['평행봉 보행 연습', '워커 보행 훈련', '계단 오르내리기', '균형 감각 훈련'],
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '관절 운동 치료',
      description: '관절의 유연성과 가동 범위를 유지하고 개선하는 운동을 진행합니다',
      activities: ['어깨·팔 관절 운동', '무릎·다리 관절 운동', '손·손가락 관절 운동', '척추 유연성 운동'],
    },
    {
      icon: 'ri-body-scan-line',
      title: '근력 강화 운동',
      description: '일상생활에 필요한 기본 근력을 유지하고 향상시키는 프로그램입니다',
      activities: ['밴드 운동', '아령 운동', '의자 스쿼트', '복근·등근육 강화'],
    },
    {
      icon: 'ri-hand-heart-line',
      title: '손·손가락 기능 회복',
      description: '일상 동작에 필요한 손의 미세 운동 능력을 회복하고 유지합니다',
      activities: ['손가락 구부리기', '작은 물건 집기', '퍼즐 맞추기', '점토 만들기'],
    },
    {
      icon: 'ri-stretch-line',
      title: '스트레칭 프로그램',
      description: '근육의 긴장을 완화하고 유연성을 높이는 스트레칭 활동을 진행합니다',
      activities: ['전신 스트레칭', '목·어깨 이완', '허리·골반 스트레칭', '종아리·발목 운동'],
    },
    {
      icon: 'ri-mental-health-line',
      title: '낙상 예방 훈련',
      description: '균형 감각과 근력을 강화하여 낙상 위험을 줄이는 예방 프로그램입니다',
      activities: ['균형잡기 훈련', '반응 속도 훈련', '안전한 일어서기', '낙상 대처법 교육'],
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#96B493]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            재활 프로그램
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">체계적인 재활 치료 프로그램</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            어르신의 신체 상태와 목표에 맞춘 맞춤형 재활 프로그램을 제공합니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(p => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:border-[#96B493]/30 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#96B493]/10">
                <i className={`${p.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">{p.title}</h3>
              <p className="mb-6 text-sm text-gray-600">{p.description}</p>

              <div className="space-y-2">
                {p.activities.map(act => (
                  <div key={act} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#96B493]" />
                    {act}
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
