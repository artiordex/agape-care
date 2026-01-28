'use client';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'ri-user-heart-line',
      title: '개인 맞춤형 목표 설정',
      description: '어르신 개개인의 인지 수준과 관심사에 맞춘 맞춤형 프로그램을 제공합니다',
    },
    {
      icon: 'ri-team-line',
      title: '소규모 그룹 운영',
      description: '정원 29인 소규모 시설의 장점을 살려 4~6명 단위의 밀착 케어가 가능합니다',
    },
    {
      icon: 'ri-calendar-check-line',
      title: '주 5회 정기 운영',
      description: '월요일부터 금요일까지 매일 오전·오후 2회씩 체계적으로 진행됩니다',
    },
    {
      icon: 'ri-file-list-3-line',
      title: '활동 기록 관리',
      description: '활동 기록은 보호자님께 정기적으로 공유하여 신뢰를 높입니다',
    },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            운영 방식
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">소규모 맞춤형 케어의 장점</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            정원 29인 소규모 시설이기에 가능한 세심하고 개별적인 인지 케어를 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature.title} className="rounded-2xl bg-white p-6 text-center hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className={`${feature.icon} text-2xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-3 font-bold text-gray-800">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
