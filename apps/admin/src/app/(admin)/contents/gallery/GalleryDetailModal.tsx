'use client';

import React from 'react';
import { GalleryItem } from './gallery.type';

interface GalleryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem | null;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

const GalleryDetailModal = ({ isOpen, onClose, item, onEdit, onDelete }: GalleryDetailModalProps) => {
  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-in fade-in zoom-in w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex h-full flex-col md:flex-row">
          {/* 1. 왼쪽: 이미지 프리뷰 영역 (Dark Mode) */}
          <div className="relative flex min-h-[400px] flex-1 items-center justify-center bg-[#1e293b] p-4">
            <img src={item.imageUrl} alt={item.title} className="max-h-[70vh] w-auto max-w-full rounded shadow-2xl" />
            {/* 상단 배지 */}
            <div className="absolute left-6 top-6 flex gap-2">
              <span className="rounded bg-[#5C8D5A] px-3 py-1 text-xs font-black text-white shadow-lg">
                {item.category}
              </span>
              <span
                className={`rounded px-3 py-1 text-xs font-black shadow-lg ${
                  item.status === '게시' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                }`}
              >
                ● {item.status === '게시' ? 'ACTIVE' : 'HIDDEN'}
              </span>
            </div>
          </div>

          {/* 2. 오른쪽: 상세 정보 사이드바 */}
          <div className="flex w-full flex-col border-l border-gray-100 bg-white md:w-80">
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-50 px-6 py-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Asset Details</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* 본문 정보 */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Title</label>
                <h2 className="mt-1 text-lg font-bold leading-tight text-gray-900">{item.title}</h2>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Description</label>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                  {item.description || '상세 설명이 등록되지 않았습니다.'}
                </p>
              </div>

              <div className="space-y-3 border-t border-gray-50 pt-4">
                <DetailRow label="Author" value={item.authorName} />
                <DetailRow label="Author ID" value={item.authorId} />
                <DetailRow label="Views" value={item.viewCount.toLocaleString()} />
                <DetailRow label="Created At" value={new Date(item.createdAt).toLocaleString()} />
                <DetailRow label="Updated At" value={new Date(item.updatedAt).toLocaleString()} />
              </div>
            </div>

            {/* 하단 액션 버튼 */}
            <div className="space-y-2 bg-gray-50 p-4">
              <button
                onClick={() => onEdit(item)}
                className="w-full rounded bg-gray-800 py-2.5 text-xs font-bold text-white transition-all hover:bg-gray-900"
              >
                콘텐츠 정보 수정
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="w-full rounded border border-red-200 bg-white py-2.5 text-xs font-bold text-red-500 transition-all hover:bg-red-50"
              >
                이미지 영구 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 상세 정보 행 컴포넌트 */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[11px]">
      <span className="font-bold uppercase text-gray-400">{label}</span>
      <span className="font-mono font-medium text-gray-700">{value}</span>
    </div>
  );
}

export default GalleryDetailModal;
