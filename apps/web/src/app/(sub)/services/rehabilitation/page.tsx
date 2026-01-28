'use client';

import Link from 'next/link';

export default function RehabilitationPage() {
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

  const operationMethods = [
    {
      icon: 'ri-home-heart-line',
      title: '자체 운영',
      description: '시설 내 재활치료실을 갖추고 전문 물리치료사가 상주하여 직접 재활 프로그램을 운영합니다',
    },
    {
      icon: 'ri-user-star-line',
      title: '방문 치료',
      description: '외부 협력 물리치료사가 정기적으로 방문하여 개인별 맞춤 재활 치료를 제공합니다',
    },
    {
      icon: 'ri-links-line',
      title: '의료기관 연계',
      description: '협력 병원 및 재활 전문 기관과 연계하여 필요한 경우 전문 재활 치료를 지원합니다',
    },
  ];

  const benefits = [
    {
      icon: 'ri-shield-check-line',
      title: '낙상 위험 감소',
      description: '균형 감각과 근력 향상으로 낙상 사고를 예방합니다',
    },
    {
      icon: 'ri-user-smile-line',
      title: '일상 기능 회복',
      description: '스스로 움직이고 활동하는 능력을 회복하여 삶의 질이 향상됩니다',
    },
    {
      icon: 'ri-heart-add-line',
      title: '만성 통증 완화',
      description: '관절과 근육의 통증을 완화하고 신체 기능을 개선합니다',
    },
    {
      icon: 'ri-emotion-happy-line',
      title: '심리적 안정',
      description: '신체 활동을 통해 우울감이 감소하고 정서적 안정을 찾습니다',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-indigo-50/30">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 pb-24 pt-40 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="hover:underline">
              홈
            </Link>
            <i className="ri-arrow-right-s-line"/>
            <span className="font-semibold">재활치료 서비스</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">재활치료 서비스</h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
            정원 29인 요양원에서는 자체 물리치료실 운영 또는 외부 전문 물리치료사와의 협력을 통해 어르신의 신체 기능
            회복과 유지를 돕는 재활 프로그램을 제공합니다. 개인 상태에 맞춘 체계적인 재활 치료가 진행됩니다.
          </p>
        </div>
      </section>

      {/* 재활 프로그램 */}
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
            {programs.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:border-[#96B493]/30 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#96B493]/10">
                  <i className={`${p.icon} text-3xl text-[#5C8D5A]`} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-800">{p.title}</h3>
                <p className="mb-6 text-sm text-gray-600">{p.description}</p>

                <div className="space-y-2">
                  {p.activities.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
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

      {/* 운영 방식 */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-[#96B493]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              운영 방식
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">다양한 재활 치료 운영 체계</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              시설 여건에 따라 자체 운영, 방문 치료, 의료기관 연계 등 적합한 방식으로 재활 서비스를 제공합니다
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {operationMethods.map((m, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 text-center transition hover:shadow-xl">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#96B493]/10">
                  <i className={`${m.icon} text-3xl text-[#5C8D5A]`} />
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-800">{m.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{m.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#5C8D5A]/10 to-[#96B493]/10 p-10 text-center">
            <i className="ri-time-line mb-4 text-5xl text-[#5C8D5A]" />
            <h3 className="mb-3 text-2xl font-bold text-gray-800">개인별 맞춤 일정 운영</h3>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
              어르신의 건강 상태와 재활 목표에 따라 주 2~3회 또는 매일 진행되는 개인별 재활 일정을 수립하며, 모든 치료
              내용은 기록되어 보호자님께 정기적으로 공유됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 기대 효과 */}
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
            {benefits.map((b, i) => (
              <div key={i} className="rounded-2xl bg-[#F9F8F6] p-6 text-center transition hover:shadow-xl">
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

      {/* CTA */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-gradient-to-br from-[#96B493] to-[#5C8D5A] p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">재활치료 서비스 문의</h2>
            <p className="mb-8 text-base opacity-90">어르신께 적합한 재활 프로그램을 안내해 드립니다</p>

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
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white hover:bg-white/20"
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
