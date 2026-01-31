'use client';

interface QuarterlySummary {
  recipientId: string;
  recipientName: string;
  gender: string;
  age: number;
  roomNumber: string;
  grade: string;
  status: string;
  admissionDate: string;
  mainDiseases: string;
  type: 'consultation' | 'interview';
  year: number;
  q1Count: number;
  q2Count: number;
  q3Count: number;
  q4Count: number;
}

interface Props {
  readonly data: QuarterlySummary[];
  readonly onSelectRecipient: (recipient: QuarterlySummary) => void;
}

/**
 * [Component] 분기별 상담 이행 현황 모니터링 그리드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 관제 스타일 적용
 */
export default function ConsultationQuarterlyTable({ data, onSelectRecipient }: Props) {
  /** * 분기별 이행 상태 시각화 로직
   * 아가페 표준 색상을 적용하여 가독성 강화
   */
  const getQuarterBadge = (count: number) => {
    if (count === 0) {
      return (
        <div className="flex flex-col items-center">
          <span className="mb-1 h-1.5 w-1.5 rounded-full bg-gray-200"></span>
          <span className="rounded-sm border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-gray-400 shadow-sm">
            미작성
          </span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <span className="mb-1 h-1.5 w-1.5 animate-pulse rounded-full bg-[#5C8D5A]"></span>
        <span className="rounded-sm border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-[#5C8D5A] shadow-sm">
          {count}건 완료
        </span>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white font-sans antialiased shadow-sm">
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {/* 고밀도 테이블 헤더: ERP 관제 스타일 */}
          <thead className="border-b border-gray-200 bg-[#f8fafc] text-[10px] font-black uppercase tracking-tighter text-gray-500">
            <tr>
              <th className="px-5 py-3 text-center">No.</th>
              <th className="px-5 py-3">수급자 마스터 정보</th>
              <th className="px-5 py-3">생활실 / 등급</th>
              <th className="px-5 py-3 text-center">1분기</th>
              <th className="px-5 py-3 text-center">2분기</th>
              <th className="px-5 py-3 text-center">3분기</th>
              <th className="px-5 py-3 text-center">4분기</th>
              <th className="px-5 py-3 text-right">관제 액션</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-[12px]">
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-20 text-center">
                  <i className="ri-folder-search-line mb-2 block text-4xl text-gray-200"></i>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    검색된 상담 대상자가 없습니다
                  </p>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.recipientId} className="group transition-colors hover:bg-gray-50/50">
                  {/* 1. 번호 */}
                  <td className="px-5 py-4 text-center">
                    <span className="font-mono text-[11px] font-bold text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </td>

                  {/* 2. 수급자 기본 정보 */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-[12px] font-black text-gray-400 transition-colors group-hover:border-[#5C8D5A] group-hover:bg-[#5C8D5A] group-hover:text-white">
                        {item.recipientName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[13px] font-black tracking-tight text-gray-900">
                          {item.recipientName} 어르신
                        </p>
                        <p className="text-[10px] font-bold uppercase text-gray-400">
                          {item.gender} / 만 {item.age}세
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* 3. 생활실 및 등급 */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-[11px] font-black text-[#5C8D5A]">
                        <i className="ri-door-open-line"></i> {item.roomNumber}호
                      </span>
                      <span className="w-fit rounded-sm border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-gray-500">
                        {item.grade}
                      </span>
                    </div>
                  </td>

                  {/* 4~7. 분기별 이행 현황 */}
                  <td className="px-5 py-4 text-center">{getQuarterBadge(item.q1Count)}</td>
                  <td className="px-5 py-4 text-center">{getQuarterBadge(item.q2Count)}</td>
                  <td className="px-5 py-4 text-center">{getQuarterBadge(item.q3Count)}</td>
                  <td className="px-5 py-4 text-center">{getQuarterBadge(item.q4Count)}</td>

                  {/* 8. 관리 버튼 */}
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => onSelectRecipient(item)}
                      className="rounded-md border border-[#5C8D5A] bg-emerald-50 px-4 py-1.5 text-[11px] font-black text-[#5C8D5A] shadow-sm transition-all hover:bg-[#5C8D5A] hover:text-white active:scale-95"
                    >
                      상세 조회 / 작성
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
