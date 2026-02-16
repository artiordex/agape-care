import { Program } from '@agape-care/api-contract';

interface ProgramListProps {
  programs: Program[];
  isLoading: boolean;
}

export default function ProgramList({ programs, isLoading }: ProgramListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!programs.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-gray-50 text-center">
        <div className="mb-4 rounded-full bg-gray-100 p-4 text-4xl text-gray-400">📋</div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">등록된 프로그램이 없습니다</h3>
        <p className="text-gray-500">새로운 프로그램이 등록될 때까지 잠시만 기다려주세요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {programs.map(program => (
        <article
          key={program.id}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-[#5C8D5A]/10 px-2.5 py-1 text-xs font-medium text-[#5C8D5A]">
                {program.category || '일반'}
              </span>
              <time className="text-xs text-gray-400">
                {new Date(program.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <h3 className="mb-3 line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-[#5C8D5A]">
              {program.title}
            </h3>

            <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
              {program.description || '내용이 없습니다.'}
            </p>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
            <button className="flex w-full items-center justify-center text-sm font-medium text-gray-600 transition-colors hover:text-[#5C8D5A]">
              상세보기 <i className="ri-arrow-right-line ml-1" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
