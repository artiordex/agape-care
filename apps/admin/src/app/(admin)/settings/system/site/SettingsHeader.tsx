'use client';

interface Props {
  readonly isSaving: boolean;
  readonly onSave: () => void;
  readonly onReset: () => void;
}

/**
 * 사이트 설정 관리 시스템 통합 헤더
 * 시스템 타이틀 및 전역 저장/초기화 액션 포함
 */
export default function SettingsHeader({ isSaving, onSave, onReset }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 설명 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-gray-200">
          <i className="ri-settings-5-line text-xl"></i>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">사이트 및 시스템 설정</h1>
            <span className="rounded border border-[#E1EBE1] bg-[#F1F6F1] px-1.5 py-0.5 text-[11px] font-black uppercase tracking-widest text-[#5C8D5A]">
              시스템 설정
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[12px] font-bold text-[#5C8D5A]">전역 사이트 설정</p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              홈페이지 및 시스템 공통 노출 정보 관리
            </p>
          </div>
        </div>
      </div>

      {/* 2. 오른쪽: 전역 액션 버튼 그룹 */}
      <div className="flex items-center gap-2">
        {/* 상태 안내 (데스크탑 전용) */}
        <div className="mr-4 hidden items-center gap-1.5 text-[12px] font-bold uppercase text-gray-400 lg:flex">
          <i className="ri-shield-check-line text-emerald-500"></i>
          <span>시스템 상태: 안전</span>
        </div>

        {/* 초기화 버튼 */}
        <button
          onClick={onReset}
          disabled={isSaving}
          className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[12px] font-bold text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="ri-refresh-line"></i>정보 초기화
        </button>

        {/* 저장 버튼 (Main Action) */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-5 py-2 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-[#4A7348] active:scale-95 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>저장 중...
            </>
          ) : (
            <>
              <i className="ri-save-3-line"></i>사이트 설정 저장
            </>
          )}
        </button>
      </div>
    </div>
  );
}
