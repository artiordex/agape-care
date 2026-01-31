'use client';

import React from 'react';
import { Popup } from './popup.type';

interface Props {
  readonly isOpen: boolean;
  readonly popup: Popup | null;
  readonly onClose: () => void;
  readonly onEdit: (popup: Popup) => void;
  readonly onDelete: (id: string) => void;
}

/**
 * [Component] 팝업 상세보기 및 미리보기 모달
 * 아가페 그린 테마 적용
 */
export default function PopupDetailModal({ isOpen, popup, onClose, onEdit, onDelete }: Props) {
  if (!isOpen || !popup) return null;

  const handleDelete = () => {
    if (confirm('정말로 이 팝업을 삭제하시겠습니까?')) {
      onDelete(popup.id);
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '활성':
        return 'border-green-200 bg-green-100 text-green-800';
      case '비활성':
        return 'border-gray-200 bg-gray-100 text-gray-600';
      case '예약':
        return 'border-blue-200 bg-blue-100 text-blue-800';
      default:
        return 'border-gray-200 bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex flex-col bg-gray-100 font-sans text-gray-900 antialiased">
      {/* 상단 관제 바 */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-300 bg-white px-8 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-gray-400 transition-all hover:text-gray-900"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="text-[12px] font-black uppercase tracking-widest">Back to List</span>
          </button>
          <div className="mx-2 h-4 w-[1px] bg-gray-200"></div>
          <h2 className="text-[15px] font-black uppercase italic text-gray-800">Popup Preview Mode</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(popup)}
            className="flex items-center gap-2 border border-gray-300 bg-white px-6 py-2.5 text-[12px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50"
          >
            <i className="ri-edit-line text-lg"></i>
            수정
          </button>

          <button onClick={onClose} className="p-2 text-gray-400 transition-all hover:text-red-500">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽: 정보 패널 */}
        <div className="w-[400px] overflow-y-auto border-r border-gray-300 bg-white p-8">
          <h3 className="mb-6 text-[18px] font-black text-gray-900">팝업 상세 정보</h3>

          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="space-y-3">
              <InfoItem label="제목" value={popup.title} />
              <InfoItem
                label="상태"
                value={
                  <span
                    className={`inline-block rounded-none border px-3 py-1 text-[11px] font-black ${getStatusColor(popup.status)}`}
                  >
                    {popup.status}
                  </span>
                }
              />
              <InfoItem label="우선순위" value={`${popup.priority}순위`} />
            </div>

            {/* 노출 기간 */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="mb-3 text-[13px] font-black text-gray-700">노출 기간</h4>
              <InfoItem label="시작일" value={popup.startDate} />
              <InfoItem label="종료일" value={popup.endDate} />
            </div>

            {/* 팝업 설정 */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="mb-3 text-[13px] font-black text-gray-700">팝업 설정</h4>
              <InfoItem label="크기" value={`${popup.width} x ${popup.height} px`} />
              <InfoItem label="위치" value={`X: ${popup.position.x}px, Y: ${popup.position.y}px`} />
              <InfoItem label="하루동안 보지않기" value={popup.showOnce ? '사용' : '미사용'} />
            </div>

            {/* 연결 링크 */}
            {popup.linkUrl && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="mb-3 text-[13px] font-black text-gray-700">연결 링크</h4>
                <a
                  href={popup.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-[12px] text-blue-600 hover:text-blue-800"
                >
                  {popup.linkUrl}
                </a>
              </div>
            )}

            {/* 등록 정보 */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="mb-3 text-[13px] font-black text-gray-700">등록 정보</h4>
              <InfoItem label="등록일시" value={new Date(popup.createdAt).toLocaleString('ko-KR')} />
              <InfoItem label="수정일시" value={new Date(popup.updatedAt).toLocaleString('ko-KR')} />
            </div>
          </div>
        </div>

        {/* 오른쪽: 미리보기 */}
        <div className="flex flex-1 items-center justify-center overflow-auto bg-gradient-to-br from-gray-100 to-gray-200 p-12">
          <div
            className="relative overflow-hidden border-4 border-[#5C8D5A] bg-white shadow-2xl"
            style={{
              width: `${popup.width}px`,
              height: `${popup.height}px`,
              maxWidth: '90%',
              maxHeight: '90%',
            }}
          >
            {/* 팝업 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
              <span className="text-[11px] font-bold text-gray-600">{popup.title}</span>
              <div className="flex items-center gap-2">
                {popup.showOnce && (
                  <button className="text-[10px] font-bold text-gray-500 hover:text-gray-700">
                    오늘 하루 보지 않기
                  </button>
                )}
                <button className="text-[16px] text-gray-400 hover:text-gray-600">✕</button>
              </div>
            </div>

            {/* 팝업 본문 */}
            <div className="flex h-[calc(100%-40px)] items-center justify-center p-4">
              {popup.imageUrl ? (
                <img src={popup.imageUrl} alt={popup.title} className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="text-center text-gray-400">
                  <i className="ri-image-line mb-4 text-6xl"></i>
                  <p className="text-[14px] font-bold">이미지 없음</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 바 */}
      <div className="flex shrink-0 justify-between border-t border-gray-200 bg-white px-8 py-4">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 border border-red-300 bg-red-50 px-6 py-2.5 text-[12px] font-black text-red-600 shadow-sm transition-all hover:bg-red-100"
        >
          <i className="ri-delete-bin-line"></i>
          삭제
        </button>

        <button
          onClick={() => onEdit(popup)}
          className="flex items-center gap-2 bg-[#5C8D5A] px-8 py-2.5 text-[12px] font-black text-white shadow-lg transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-edit-line"></i>
          수정하기
        </button>
      </div>
    </div>
  );
}

// 정보 항목 컴포넌트
function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between border-b border-gray-100 pb-2">
      <span className="text-[11px] font-black uppercase text-gray-400">{label}</span>
      <span className="text-[12px] font-bold text-gray-700">{value}</span>
    </div>
  );
}
