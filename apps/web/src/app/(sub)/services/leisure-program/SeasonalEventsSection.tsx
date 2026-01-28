'use client';

export default function SeasonalEventsSection() {
  const seasonalEvents = [
    { month: '봄', event: '봄맞이 나들이, 꽃구경' },
    { month: '여름', event: '여름 음악회, 수박 파티' },
    { month: '가을', event: '추석 행사, 단풍 나들이' },
    { month: '겨울', event: '송년회, 윷놀이 대회' },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            특별 프로그램
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">계절별 행사 및 생신잔치</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            사계절 특별 행사와 매월 생신잔치를 따뜻하게 진행합니다
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {seasonalEvents.map(e => (
            <div key={e.month} className="rounded-2xl bg-white p-6 text-center transition hover:shadow-xl">
              <div className="mb-3 text-3xl font-bold text-[#5C8D5A]">{e.month}</div>
              <p className="text-sm leading-relaxed text-gray-700">{e.event}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#5C8D5A]/10 to-[#7BA178]/10 p-10 text-center">
          <i className="ri-cake-3-line mb-4 text-5xl text-[#5C8D5A]" />
          <h3 className="mb-3 text-2xl font-bold text-gray-800">매월 생신잔치</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
            매월 생신을 맞은 어르신을 위해 따뜻한 축하 모임을 열어드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
