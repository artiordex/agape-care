'use client';

interface FreeBoardHeaderProps {
  readonly totalCount: number;
  readonly onAddClick: () => void;
}

/**
 * [Component] 자유게시판 운영 관리 시스템 고정 헤더
 * 아가페 표준 UI 및 전사적 액션 버튼 프로토콜 적용
 */
const FreeBoardHeader = ({ totalCount, onAddClick }: FreeBoardHeaderProps) => {
  return (
    /** * [구조] shrink-0을 적용하여 부모의 flex-col 레이아웃 내에서
     * 높이가 유지되며 상단에 고정됩니다.
     */
    <div className="flex shrink-0 flex-col justify-between gap-4 border-b border-gray-300 bg-white p-6 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 좌측: 시스템 노드 정보 */}
      <div className="flex items-center gap-4">
        {/* 아가페 그린 포인트 아이콘 박스 */}
        <div className="rounded-none bg-[#5C8D5A] p-3 text-white shadow-md">
          <i className="ri-chat-history-line text-2xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
              게시판 관리
            </h1>
          </div>
          <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            사용자 화면 게시판 관리 페이지 입니다.
          </p>
        </div>
      </div>

      {/* 우측: 전사적 액션 버튼 그룹 */}
      <div className="flex items-center gap-3">
        {/* 데이터 새로고침 액션 */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-black text-gray-500 transition-all hover:bg-gray-50 active:scale-95"
        >
          <i className="ri-refresh-line font-bold"></i>
          데이터 동기화
        </button>

        {/* 메인 액션: 등록 버튼 */}
        <button
          onClick={onAddClick}
          className="flex cursor-pointer items-center gap-2 rounded-none bg-[#5C8D5A] px-6 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-lg"></i>새 게시글 등록
        </button>
      </div>
    </div>
  );
};

export default FreeBoardHeader;
