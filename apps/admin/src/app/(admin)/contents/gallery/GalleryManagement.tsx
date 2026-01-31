'use client';

import React from 'react';
import clsx from 'clsx';

interface GalleryManagementProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onCreate: () => void;
}

/**
 * [Component] 갤러리 하단 시스템 액션 바
 * 완전 직각형 디자인으로 행정적 신뢰감 강조
 */
export default function GalleryManagement({ selectedCount, onBulkDelete, onCreate }: GalleryManagementProps) {
  return (
    <div className="flex items-center gap-0 border-t border-gray-200 bg-gray-50 p-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
      {/* 레이블 섹션 */}
      <div className="flex h-10 items-center bg-gray-700 px-4 text-[10px] font-black uppercase tracking-widest text-gray-300">
        Asset Control
      </div>

      {/* 액션 버튼 그룹 */}
      <div className="flex flex-1 items-center">
        <ActionButton label="선택 항목 숨김" icon="ri-eye-off-line" disabled={selectedCount === 0} />
        <ActionButton
          label={`선택 삭제 ${selectedCount > 0 ? `(${selectedCount})` : ''}`}
          icon="ri-delete-bin-7-line"
          color="red"
          disabled={selectedCount === 0}
          onClick={onBulkDelete}
        />
        <ActionButton label="엑셀 데이터 추출" icon="ri-file-excel-2-line" />
        <ActionButton label="이미지 최적화 실행" icon="ri-magic-line" />

        {/* 우측 정렬 등록 버튼 */}
        <div className="ml-auto flex items-center">
          <ActionButton label="새 이미지 등록" icon="ri-add-fill" isPrimary onClick={onCreate} />
        </div>
      </div>
    </div>
  );
}

/** [Sub] 하단 전용 직각형 액션 버튼 */
function ActionButton({
  label,
  icon,
  isPrimary,
  color,
  disabled,
  onClick,
}: {
  label: string;
  icon: string;
  isPrimary?: boolean;
  color?: 'red';
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex h-10 items-center gap-2 rounded-none border-r border-gray-200 px-5 text-[11px] font-bold transition-all',
        disabled && 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-30',
        !disabled && !isPrimary && color !== 'red' && 'bg-white text-gray-600 hover:bg-gray-100',
        !disabled && !isPrimary && color === 'red' && 'bg-white text-red-500 hover:bg-red-50',
        !disabled && isPrimary && 'bg-[#5C8D5A] text-white hover:bg-[#4A7548]',
      )}
    >
      <i className={clsx(icon, 'text-sm')}></i>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
