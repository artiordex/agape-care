'use client';

import React from 'react';
import { GalleryItem as GalleryItemType } from './gallery.type';

interface GalleryItemProps {
  item: GalleryItemType;
  displayIndex: number;
  onEdit: () => void;
  onDelete: () => void;
  onDetail: () => void;
}

const GalleryItem = ({ item, displayIndex, onEdit, onDelete, onDetail }: GalleryItemProps) => {
  return (
    <div className="group grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-[#f1f5f9]/50">
      {/* 번호 */}
      <div className="col-span-1 flex justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-[10px] font-bold text-gray-400">
          {displayIndex}
        </div>
      </div>

      {/* 카테고리 */}
      <div className="col-span-1">
        <span className="rounded-[2px] border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-[#5C8D5A]">
          {item.category}
        </span>
      </div>

      {/* 이미지 미리보기: 갤러리 관리의 핵심 */}
      <div className="col-span-2 flex justify-center">
        <div
          className="relative h-14 w-20 cursor-pointer overflow-hidden rounded border border-gray-200 bg-gray-100 shadow-sm transition-transform group-hover:scale-105"
          onClick={onDetail}
        >
          <img src={item.thumbnailUrl} alt={item.title} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* 제목 및 설명 */}
      <div className="col-span-3">
        <div className="flex cursor-pointer flex-col" onClick={onDetail}>
          <span className="line-clamp-1 text-sm font-bold text-[#334155] transition-colors group-hover:text-[#5C8D5A]">
            {item.title}
          </span>
          <p className="line-clamp-1 text-[10px] font-medium text-gray-400">
            {item.description || 'No description provided.'}
          </p>
        </div>
      </div>

      {/* 조회수 */}
      <div className="col-span-1 text-center text-xs font-bold text-gray-500">{item.viewCount.toLocaleString()}</div>

      {/* 상태 */}
      <div className="col-span-1 text-center">
        <span
          className={`text-[10px] font-black uppercase ${
            item.status === '게시' ? 'text-emerald-500' : 'text-orange-500'
          }`}
        >
          ● {item.status === '게시' ? 'Active' : 'Hidden'}
        </span>
      </div>

      {/* 등록일 */}
      <div className="col-span-2 text-center font-mono text-[11px] font-bold text-gray-400">
        {new Date(item.createdAt).toLocaleDateString()}
        <span className="block text-[9px] font-normal text-gray-300">ADMIN: {item.authorName}</span>
      </div>

      {/* 관리 액션 */}
      <div className="col-span-1 text-right">
        <button
          onClick={onDetail}
          className="border-b border-transparent text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
