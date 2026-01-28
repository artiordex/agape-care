'use client';

export default function CarePhilosophySection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">우리의 케어 철학</h2>
          <p className="text-lg text-gray-600">어르신 중심의 전인적 케어를 실천합니다</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600">
              <i className="ri-user-heart-line text-4xl text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">개인 맞춤형</h3>
            <p className="text-gray-600">
              어르신 한 분 한 분의 상태와 필요에 맞춘 개별화된 케어 계획을 수립하고 실행합니다
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600">
              <i className="ri-team-line text-4xl text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">전문 팀 케어</h3>
            <p className="text-gray-600">
              간호사, 물리치료사, 요양보호사 등 전문 인력이 팀을 이루어 통합적 케어를 제공합니다
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-amber-500">
              <i className="ri-heart-3-line text-4xl text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">가족 같은 돌봄</h3>
            <p className="text-gray-600">전문성과 함께 따뜻한 마음으로 어르신을 가족처럼 정성껏 모십니다</p>
          </div>
        </div>
      </div>
    </section>
  );
}
