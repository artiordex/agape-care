'use client';

interface Props {
  readonly selectedName: string | null;
  readonly activeTab: 'employee' | 'role';
  readonly isSaving: boolean;
  readonly onSave: () => void;
}

/**
 * [Header] 권한 및 보안 계정 관리 통합 헤더
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 국문 인터페이스
 */
export default function RBACHeader({ selectedName, activeTab, isSaving, onSave }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 정체성 및 타이틀 */}
      <div className="flex items-center gap-3">
        {/* 아가페 그린 테마 아이콘 박스 */}
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-admin-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">권한 및 보안 계정 관리</h1>
            <span className="rounded border border-red-100 bg-red-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-600">
              보안 핵심 설정
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#5C8D5A]">
              {activeTab === 'employee' ? '개별 권한 설정' : '역할별 템플릿 관리'}
            </p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              역할 기반 접근 제어 시스템 (RBAC)
            </p>
          </div>
        </div>
      </div>

      {/* 2. 중앙: 현재 편집 대상 (선택 시 노출) */}
      {selectedName && (
        <div className="animate-in fade-in zoom-in hidden items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 duration-300 xl:flex">
          <div className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#5C8D5A] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5C8D5A]"></span>
          </div>
          <p className="text-[11px] font-black text-gray-700">
            현재 편집 중: <span className="ml-1 text-[#5C8D5A]">{selectedName}</span>
          </p>
        </div>
      )}

      {/* 3. 오른쪽: 전역 보안 액션 */}
      <div className="flex items-center gap-2">
        {/* 권한 변경 이력 (Audit Log) */}
        <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50">
          <i className="ri-history-line"></i>
          보안 변경 이력
        </button>

        {/* 저장 버튼 (Main Action - Agape Green) */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <i className="ri-loader-4-line animate-spin text-sm"></i>
              보안 정책 동기화 중...
            </>
          ) : (
            <>
              <i className="ri-shield-check-line text-sm"></i>
              보안 설정 즉시 반영
            </>
          )}
        </button>
      </div>
    </div>
  );
}
