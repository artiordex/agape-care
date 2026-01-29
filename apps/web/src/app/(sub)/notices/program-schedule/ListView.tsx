'use client';

export default function ListView({ filteredPrograms, getCategoryInfo, openProgramDetail }: any) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* 테이블 헤더 */}
      <div className="grid grid-cols-12 border-b-2 border-gray-900 bg-gray-50">
        <div className="col-span-2 border-r border-gray-200 p-4 text-center text-sm font-bold text-gray-700">날짜</div>
        <div className="col-span-2 border-r border-gray-200 p-4 text-center text-sm font-bold text-gray-700">시간</div>
        <div className="col-span-2 border-r border-gray-200 p-4 text-center text-sm font-bold text-gray-700">
          카테고리
        </div>
        <div className="col-span-4 border-r border-gray-200 p-4 text-sm font-bold text-gray-700">프로그램명</div>
        <div className="col-span-2 p-4 text-center text-sm font-bold text-gray-700">담당자</div>
      </div>

      {/* 테이블 내용 */}
      <div className="divide-y divide-gray-200">
        {filteredPrograms.length === 0 ? (
          <div className="py-12 text-center text-gray-500">등록된 프로그램이 없습니다</div>
        ) : (
          filteredPrograms.map((p: any) => {
            const info = getCategoryInfo(p.category);
            return (
              <div
                key={p.id}
                onClick={() => openProgramDetail(p.id)}
                className="grid cursor-pointer grid-cols-12 transition-colors hover:bg-gray-50"
              >
                <div className="col-span-2 border-r border-gray-200 p-4 text-center text-sm text-gray-700">
                  {p.date}
                </div>
                <div className="col-span-2 border-r border-gray-200 p-4 text-center text-sm text-gray-700">
                  {p.start_time} - {p.end_time}
                </div>
                <div className="col-span-2 border-r border-gray-200 p-4 text-center">
                  <span className="inline-block rounded border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                    {info.name}
                  </span>
                </div>
                <div className="col-span-4 border-r border-gray-200 p-4">
                  <div className="font-semibold text-gray-900">{p.title}</div>
                  {p.description && <div className="mt-1 text-sm text-gray-600">{p.description}</div>}
                </div>
                <div className="col-span-2 p-4 text-center text-sm text-gray-700">{p.staff}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
