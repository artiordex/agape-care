'use client';

export default function ProgramListSection() {
  const programs = [
    {
      icon: 'ri-music-2-line',
      title: '음악 프로그램',
      description: '추억의 노래를 함께 부르고 악기를 연주하며 정서적 안정을 찾습니다',
      activities: ['노래교실', '악기 연주', '음악 감상', '리듬 따라하기'],
      frequency: '주 3회',
    },
    {
      icon: 'ri-palette-line',
      title: '미술 활동',
      description: '그림 그리기, 색칠하기 등 창작 활동으로 표현력을 높입니다',
      activities: ['수채화 그리기', '색칠 공부', '만들기 활동', '계절 작품 만들기'],
      frequency: '주 2회',
    },
    {
      icon: 'ri-plant-line',
      title: '원예 활동',
      description: '식물을 가꾸며 자연과 교감하고 성취감을 느낍니다',
      activities: ['화분 가꾸기', '채소 키우기', '꽃꽂이', '텃밭 관리'],
      frequency: '주 2회',
    },
    {
      icon: 'ri-movie-2-line',
      title: '영상 프로그램',
      description: '영화, 다큐멘터리를 관람하며 여가 시간을 즐깁니다',
      activities: ['영화 감상', '옛날 드라마 보기', '자연 다큐', '음악 방송'],
      frequency: '주 2회',
    },
    {
      icon: 'ri-book-open-line',
      title: '독서 및 회상 활동',
      description: '책 읽기와 이야기 나누기로 추억을 회상하고 소통합니다',
      activities: ['책 읽어주기', '옛날이야기', '신문 읽기', '시 낭송'],
      frequency: '주 3회',
    },
    {
      icon: 'ri-gamepad-line',
      title: '레크리에이션',
      description: '즐거운 게임과 놀이로 웃음과 활력을 되찾습니다',
      activities: ['풍선 배구', '공 굴리기', '윷놀이', '민속 놀이'],
      frequency: '주 2회',
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            다양한 프로그램
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">즐거운 일상을 만드는 여가 활동</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            주 5일 다양한 프로그램이 매일 오전·오후 2회씩 운영됩니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 transition hover:border-[#7BA178]/30 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7BA178]/10">
                <i className={`${p.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
                <span className="rounded-full bg-[#5C8D5A]/10 px-3 py-1 text-xs font-semibold text-[#5C8D5A]">
                  {p.frequency}
                </span>
              </div>

              <p className="mb-6 text-sm text-gray-600">{p.description}</p>

              <div className="space-y-2">
                {p.activities.map((a, idx) => (
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
