'use client';

export default function ProgramListSection() {
  const programs = [
    {
      icon: 'ri-brain-line',
      title: '인지자극훈련',
      description: '기억력, 주의력, 집중력 향상을 위한 체계적인 훈련 프로그램입니다',
      activities: ['숫자 기억하기', '사진 맞추기', '단어 연상 게임', '시간 개념 훈련'],
    },
    {
      icon: 'ri-puzzle-line',
      title: '퍼즐 및 보드게임',
      description: '손과 두뇌를 함께 사용하는 다양한 활동으로 인지 능력을 자극합니다',
      activities: ['직소 퍼즐', '오목·장기·바둑', '숫자 게임', '색칠하기'],
    },
    {
      icon: 'ri-chat-3-line',
      title: '언어활동 프로그램',
      description: '대화와 표현을 통해 언어 능력과 사회성을 동시에 향상시킵니다',
      activities: ['옛날이야기 나누기', '속담 맞추기', '노래 가사 따라 부르기', '일기 쓰기'],
    },
    {
      icon: 'ri-group-line',
      title: '그룹 인지활동',
      description: '소규모 그룹 활동을 통해 사회성과 인지 기능을 함께 향상시킵니다',
      activities: ['그룹 토론', '공동 작품 만들기', '함께 요리하기', '계절 행사 준비'],
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            프로그램 구성
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">다양한 인지 활동 프로그램</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            어르신의 인지 수준에 맞춘 체계적이고 전문적인 프로그램을 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {programs.map(program => (
            <div key={program.title} className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C8D5A]/10">
                <i className={`${program.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">{program.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">{program.description}</p>

              <div className="space-y-2">
                {program.activities.map(activity => (
                  <div key={activity} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#5C8D5A]" />
                    {activity}
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
