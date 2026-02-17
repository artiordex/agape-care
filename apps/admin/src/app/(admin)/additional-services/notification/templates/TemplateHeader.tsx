/**
 * Description : TemplateHeader.tsx - 템플릿 관리 통합 헤더
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly onOpenCreate: () => void;
  readonly onExcelDownload?: () => void;
}

export default function TemplateHeader({ onOpenCreate, onExcelDownload }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-sm border border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* 왼쪽: 타이틀 및 설명 */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md">
          <i className="ri-file-list-3-line text-xl"></i>
        </div>
        <div>
          <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">템플릿 관리</h1>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#5C8D5A]">
              Notification Template Library
            </p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold text-gray-400">자주 사용하는 발송 메세지 통합 관리</p>
          </div>
        </div>
      </div>

      {/* 오른쪽: 액션 버튼 */}
      <div className="flex items-center gap-2">
        {onExcelDownload && (
          <button
            onClick={onExcelDownload}
            className="flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            <i className="ri-file-excel-2-line text-sm"></i>
            데이터 출력
          </button>
        )}

        <button
          onClick={onOpenCreate}
          className="flex items-center gap-1.5 bg-[#5C8D5A] px-5 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-sm font-black"></i>새 템플릿 등록
        </button>

        <button className="flex h-9 w-9 items-center justify-center border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#5C8D5A]">
          <i className="ri-settings-3-line text-lg"></i>
        </button>
      </div>
    </div>
  );
}
