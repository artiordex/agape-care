'use client';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'ri-heart-line',
      title: '정서 안정',
      description: '즐거운 활동으로 우울감을 완화하고 정서적 안정을 찾습니다',
    },
    {
      icon: 'ri-group-2-line',
      title: '사회성 향상',
      description: '함께하는 활동을 통해 자연스럽게 교류와 소통이 이루어집니다',
    },
    {
      icon: 'ri-creative-commons-by-line',
      title: '자율적 선택',
      description: '관심사에 따라 원하는 프로그램을 자유롭게 선택할 수 있습니다',
    },
    {
      icon: 'ri-cake-3-line',
      title: '생신 및 기념일',
      description: '매월 생신잔치로 특별한 추억을 만듭니다',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map(f => (
            <div key={f.title} className="rounded-2xl bg-[#F9F8F6] p-6 text-center hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7BA178]/10">
                <i className={`${f.icon} text-2xl text-[#5C8D5A]`} />
              </div>
              <h3 className="mb-3 font-bold text-gray-800">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
