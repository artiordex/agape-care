/**
 * Description : GalleryTable.tsx - ?? GalleryTable UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import React from 'react';
import { GalleryItem as GalleryItemType } from './gallery.type';
import GalleryItem from './GalleryItem';

interface GalleryTableProps {
  items: GalleryItemType[];
  onEdit: (item: GalleryItemType) => void;
  onDelete: (id: string) => void;
  onDetail: (item: GalleryItemType) => void;
}

const GalleryTable = ({ items, onEdit, onDelete, onDetail }: GalleryTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* 섹션 헤더: ERP 스타일의 정밀 레이아웃 */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-[#f8fafc] px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 rounded-full bg-[#5C8D5A]"></div>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#1e293b]">Gallery Activity Registry</h2>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
          Unit: Image Assets / Sync Status
        </div>
      </div>

      {/* 테이블 헤더: 이미지 열(Preview) 추가 */}
      <div className="grid grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/50 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <div className="col-span-1 text-center">No</div>
        <div className="col-span-1">Category</div>
        <div className="col-span-2 text-center">Preview</div>
        <div className="col-span-3">Subject & Description</div>
        <div className="col-span-1 text-center">Views</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-center">Date</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* 리스트 본문 */}
      <div className="divide-y divide-gray-100">
        {items.length > 0 ? (
          items.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              displayIndex={items.length - index}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
              onDetail={() => onDetail(item)}
            />
          ))
        ) : (
          <div className="py-32 text-center">
            <i className="ri-image-line mb-2 block text-4xl text-gray-200"></i>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-300">No media assets found</p>
          </div>
        )}
      </div>

      {/* 푸터: 추가 로드 버튼 */}
      <div className="border-t border-gray-100 bg-gray-50/30 p-3">
        <button className="w-full rounded border border-dashed border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 transition-all hover:bg-white hover:shadow-sm">
          🔄 View Full Media Logs & Pagination
        </button>
      </div>
    </div>
  );
};

export default GalleryTable;
