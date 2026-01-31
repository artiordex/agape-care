'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  readonly excelData: any[];
  readonly showPreview: boolean;
  readonly saveMode: 'overwrite' | 'merge' | 'selective';
  readonly selectedDates: Set<string>;
  readonly onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onDownloadTemplate: () => void;
  readonly onSetSaveMode: (mode: 'overwrite' | 'merge' | 'selective') => void;
  readonly onToggleDate: (date: string) => void;
  readonly onSelectAll: (checked: boolean) => void;
  readonly onCommit: () => void;
  readonly onClose: () => void;
}

/**
 * [Component] 월간 식단 엑셀 업로드 및 데이터 검토 모달
 * 데이터 병합 전략(Overwrite/Merge/Selective) 제공 및 프리뷰 그리드 포함
 */
export default function ExcelUploadModal({
  excelData,
  showPreview,
  saveMode,
  selectedDates,
  onFileChange,
  onDownloadTemplate,
  onSetSaveMode,
  onToggleDate,
  onSelectAll,
  onCommit,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border-2 border-gray-400 bg-white shadow-2xl">
        {/* 1. 모달 헤더 */}
        <header className="flex items-center justify-between border-b-2 border-gray-300 bg-blue-50 p-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded bg-[#5C8D5A] p-1 text-white">
                <i className="ri-file-excel-2-fill text-lg"></i>
              </div>
              <h2 className="text-[14px] font-black uppercase tracking-tight text-blue-900">
                {showPreview ? '엑셀 데이터 검토 및 반영' : '식단표 엑셀 업로드'}
              </h2>
            </div>
            <p className="mt-0.5 text-[10px] font-bold text-gray-500">
              {showPreview
                ? `총 ${excelData.length}건의 데이터를 검토 중입니다.`
                : '엑셀 양식을 다운로드하여 작성 후 업로드하세요.'}
            </p>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 transition-colors hover:text-gray-600">
            <i className="ri-close-line"></i>
          </button>
        </header>

        {/* 2. 메인 컨텐츠 영역 */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {!showPreview ? (
            /* 가이드 및 업로드 섹션 */
            <div className="space-y-4 overflow-y-auto p-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={onDownloadTemplate}
                  className="flex items-center gap-2 border-b-2 border-[#5C8D5A] px-4 py-2 text-[11px] font-black text-[#5C8D5A] hover:bg-emerald-50"
                >
                  <i className="ri-download-cloud-2-line"></i>
                  월간 식단표 엑셀 양식 다운로드
                </button>
              </div>

              <div className="flex items-center gap-4 border border-gray-200 bg-[#f8fafc] p-4">
                <label className="text-[11px] font-black text-gray-700">파일 선택</label>
                <label className="cursor-pointer border-2 border-dashed border-[#5C8D5A] bg-white px-6 py-2 text-[11px] font-black text-[#5C8D5A] transition-all hover:bg-emerald-50">
                  <input type="file" accept=".xlsx,.xls" onChange={onFileChange} className="hidden" />+ 내 컴퓨터에서
                  엑셀 파일 선택
                </label>
              </div>

              <div className="space-y-1 border border-gray-300 bg-gray-50 p-4 text-[10px] leading-relaxed text-gray-600">
                <p className="mb-1 font-black uppercase text-gray-800 underline decoration-red-200 underline-offset-4">
                  ※ 업로드 주의사항
                </p>
                <p>
                  • 반드시 제공된 <span className="font-bold text-blue-600">정식 엑셀 양식</span>에 맞춰 데이터를
                  작성하셔야 합니다.
                </p>
                <p>• 날짜 형식(YYYY-MM-DD)이 올바르지 않을 경우 데이터가 누락될 수 있습니다.</p>
                <p>• 업로드 후 하단 '반영' 버튼을 눌러야 최종 저장됩니다.</p>
              </div>
            </div>
          ) : (
            /* 데이터 프리뷰 및 병합 설정 */
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="grid grid-cols-3 gap-2 border-b border-gray-300 bg-gray-50 p-3">
                <SaveModeButton
                  mode="overwrite"
                  active={saveMode === 'overwrite'}
                  onClick={() => onSetSaveMode('overwrite')}
                  label="데이터 덮어쓰기"
                  desc="기존 식단 완전 삭제 후 반영"
                />
                <SaveModeButton
                  mode="merge"
                  active={saveMode === 'merge'}
                  onClick={() => onSetSaveMode('merge')}
                  label="데이터 병합(Merge)"
                  desc="빈 일자만 채우고 기존 보호"
                />
                <SaveModeButton
                  mode="selective"
                  active={saveMode === 'selective'}
                  onClick={() => onSetSaveMode('selective')}
                  label="선택적 반영"
                  desc="체크한 날짜만 골라서 반영"
                />
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                <table className="w-full border-collapse border border-blue-400 text-[10px]">
                  <thead className="sticky top-0 z-10 border-b-2 border-blue-400 bg-blue-50 shadow-sm">
                    <tr>
                      {saveMode === 'selective' && (
                        <th className="w-10 border-r border-blue-400 p-2">
                          <input
                            type="checkbox"
                            onChange={e => onSelectAll(e.target.checked)}
                            checked={selectedDates.size === excelData.length}
                            className="accent-[#5C8D5A]"
                          />
                        </th>
                      )}
                      <th className="w-24 border-r border-blue-400 p-2">날짜</th>
                      <th className="border-r border-blue-400 p-2">아침</th>
                      <th className="border-r border-blue-400 p-2">점심</th>
                      <th className="border-r border-blue-400 p-2 text-blue-900">저녁</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, i) => (
                      <tr key={i} className="border-b border-blue-400 hover:bg-emerald-50/30">
                        {saveMode === 'selective' && (
                          <td className="border-r border-blue-400 p-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedDates.has(row.date)}
                              onChange={() => onToggleDate(row.date)}
                              className="accent-[#5C8D5A]"
                            />
                          </td>
                        )}
                        <td className="border-r border-blue-400 p-2 font-mono font-bold text-blue-900">{row.date}</td>
                        <td className="border-r border-blue-400 p-2 leading-tight">{row.breakfast.menu}</td>
                        <td className="border-r border-blue-400 p-2 leading-tight">{row.lunch.menu}</td>
                        <td className="p-2 leading-tight">{row.dinner.menu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* 3. 모달 푸터 */}
        <footer className="flex justify-end gap-2 border-t-2 border-gray-300 bg-gray-100 p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <button
            onClick={onClose}
            className="min-w-[100px] border border-gray-400 bg-gray-500 px-5 py-2 text-[11px] font-black text-white transition-all hover:bg-gray-600"
          >
            취소
          </button>
          {showPreview && (
            <button
              onClick={onCommit}
              className="min-w-[120px] border border-blue-700 bg-blue-600 px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              데이터 최종 반영
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

/** 서브 컴포넌트: 저장 모드 선택 버튼 */
function SaveModeButton({ mode, active, onClick, label, desc }: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-col items-start border-2 p-3 text-left transition-all',
        active ? 'border-blue-600 bg-blue-50 shadow-inner' : 'border-gray-200 bg-white hover:border-blue-300',
      )}
    >
      <div className={clsx('mb-0.5 text-[11px] font-black uppercase', active ? 'text-blue-900' : 'text-gray-400')}>
        {label}
      </div>
      <div className="text-[9px] font-bold leading-tight text-gray-500">{desc}</div>
    </button>
  );
}
