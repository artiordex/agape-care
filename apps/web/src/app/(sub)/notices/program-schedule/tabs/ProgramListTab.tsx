/**
 * Description : ProgramListTab.tsx - 📌 프로그램 일정 목록 탭
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface ProgramListTabProps {
  readonly filteredPrograms: readonly any[];
  readonly getCategoryInfo: (categoryId: string) => { name: string; color: string };
  readonly openProgramDetail: (id: string) => void;
}

/* 테이블 헤더 정의 */
interface HeaderItem {
  readonly label: string;
  readonly span: number;
  readonly align?: 'left' | 'center' | 'right';
}

const headers: readonly HeaderItem[] = [
  { label: '날짜', span: 2 },
  { label: '시간', span: 2 },
  { label: '카테고리', span: 2 },
  { label: '프로그램 정보', span: 4, align: 'left' },
  { label: '담당자', span: 2 },
];

/* Tailwind JIT 안전 처리용 */
const spanClassMap: Record<number, string> = {
  2: 'col-span-2',
  4: 'col-span-4',
};

/* 컴포넌트 */

export default function ProgramListTab({ filteredPrograms, getCategoryInfo, openProgramDetail }: ProgramListTabProps) {
  return (
    <div className="w-full overflow-hidden rounded-none border border-gray-300 bg-white shadow-none">
      {/* 테이블 헤더 영역 */}
      <div className="grid grid-cols-12 border-b border-gray-300 bg-gray-50">
        {headers.map((h, index) => {
          const isLast = index === headers.length - 1;

          return (
            <div
              key={h.label}
              className={` ${spanClassMap[h.span]} ${isLast ? '' : 'border-r border-gray-300'} px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-gray-500 ${h.align === 'left' ? 'pl-6 text-left' : 'text-center'} `}
            >
              {h.label}
            </div>
          );
        })}
      </div>

      {/* 테이블 데이터 영역 */}
      <div className="divide-y divide-gray-100">
        {filteredPrograms.length === 0 ? (
          <div className="py-20 text-center text-gray-300">
            <p className="text-sm font-normal">현재 등록된 프로그램 데이터가 없습니다.</p>
          </div>
        ) : (
          filteredPrograms.map((p: any) => {
            const info = getCategoryInfo(p.category);

            return (
              <div
                key={p.id}
                onClick={() => openProgramDetail(p.id)}
                className="group grid cursor-pointer grid-cols-12 items-center transition-colors hover:bg-[#5C8D5A]/5"
              >
                {/* 날짜 */}
                <div className="col-span-2 border-r border-gray-100 p-5 text-center text-xs text-gray-500">
                  {p.date}
                </div>

                {/* 시간 */}
                <div className="col-span-2 border-r border-gray-100 p-5 text-center text-sm font-medium text-gray-900">
                  <span className="text-[#5C8D5A]">{p.start_time}</span> - {p.end_time}
                </div>

                {/* 카테고리 */}
                <div className="col-span-2 flex justify-center border-r border-gray-100 p-5">
                  <span
                    className="inline-block rounded-none border px-3 py-1 text-[10px] font-medium"
                    style={{
                      borderColor: info.color,
                      color: info.color,
                      backgroundColor: `${info.color}05`,
                    }}
                  >
                    {info.name}
                  </span>
                </div>

                {/* 프로그램 정보 */}
                <div className="col-span-4 border-r border-gray-100 p-5 pl-6">
                  <div className="text-sm font-medium text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                    {p.title}
                  </div>

                  {p.description && (
                    <div className="mt-1 max-w-[90%] truncate text-[11px] font-normal text-gray-400">
                      {p.description}
                    </div>
                  )}
                </div>

                {/* 담당자 */}
                <div className="col-span-2 p-5 text-center text-xs text-gray-500">
                  <span className="rounded-none border border-gray-100 bg-gray-50 px-2 py-1">{p.staff}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 하단 정보 바 */}
      {filteredPrograms.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-3 text-right">
          <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
            Total Records: {filteredPrograms.length}
          </span>
        </div>
      )}
    </div>
  );
}
