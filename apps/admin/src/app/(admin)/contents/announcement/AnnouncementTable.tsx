'use client';

import React from 'react';
import clsx from 'clsx';
import { Announcement } from './announcement.type';

interface Props {
  readonly announcements: Announcement[];
  readonly onSelect: (announcement: Announcement) => void;
  readonly onEdit: (announcement: Announcement) => void;
  readonly onDelete: (id: string) => void;
  readonly onTogglePin: (id: string) => void;
}

/**
 * [Component] 공지사항 관리 그리드 테이블
 * image_102a40.png의 헤더 및 컬럼 규격 적용
 * 관리 기능 (수정/삭제/고정) 포함
 */
export default function AnnouncementTable({ announcements, onSelect, onEdit, onDelete, onTogglePin }: Props) {
  // 카테고리별 스타일
  const categoryStyles: any = {
    긴급: 'text-red-600 bg-red-50 border-red-100',
    교육: 'text-blue-600 bg-blue-50 border-blue-100',
    일반: 'text-gray-500 bg-gray-50 border-gray-100',
    행사: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    점검: 'text-orange-600 bg-orange-50 border-orange-100',
  };

  return (
    <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
      <table className="w-full border-collapse text-center font-sans">
        <thead className="bg-[#5C8D5A] text-white shadow-md">
          <tr className="text-[14px] font-black tracking-tight">
            <th className="w-20 border-r border-white/10 py-4 uppercase italic">번호</th>
            <th className="w-28 border-r border-white/10 py-4 uppercase italic">구분</th>
            <th className="border-r border-white/10 px-8 py-4 text-left uppercase italic">제목</th>
            <th className="w-28 border-r border-white/10 py-4 uppercase italic">작성자</th>
            <th className="w-32 border-r border-white/10 py-4 uppercase italic">작성일</th>
            <th className="w-24 border-r border-white/10 py-4 uppercase italic">조회</th>
            <th className="w-32 py-4 uppercase italic">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {announcements.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-20 text-[14px] font-bold uppercase italic tracking-widest text-gray-300">
                <i className="ri-inbox-line mb-2 block text-4xl"></i>
                No announcement records found
              </td>
            </tr>
          ) : (
            announcements.map(item => (
              <tr key={item.id} className="group transition-all hover:bg-emerald-50/30">
                {/* 번호 */}
                <td className="py-5 font-mono text-[13px] font-bold text-gray-400">
                  {item.isPinned ? <i className="ri-pushpin-2-fill text-[#5C8D5A]"></i> : item.id}
                </td>

                {/* 카테고리 */}
                <td className="py-5">
                  <span
                    className={clsx(
                      'rounded-none border px-3 py-1 text-[11px] font-black',
                      categoryStyles[item.category] || categoryStyles['일반'],
                    )}
                  >
                    {item.category}
                  </span>
                </td>

                {/* 제목 (클릭 시 상세보기) */}
                <td
                  onClick={() => onSelect(item)}
                  className="cursor-pointer px-8 py-5 text-left font-black text-gray-800 transition-colors group-hover:text-[#5C8D5A]"
                >
                  <div className="flex items-center gap-2">
                    {item.title}
                    {item.attachments && item.attachments.length > 0 && (
                      <i className="ri-attachment-2 text-[12px] text-gray-400"></i>
                    )}
                  </div>
                </td>

                {/* 작성자 */}
                <td className="py-5 text-[13px] font-bold text-gray-600">{item.author}</td>

                {/* 작성일 */}
                <td className="py-5 font-mono text-[13px] font-bold text-gray-400">{item.createdAt}</td>

                {/* 조회수 */}
                <td className="py-5 font-mono text-[13px] font-bold text-gray-400">{item.views.toLocaleString()}</td>

                {/* 관리 버튼 */}
                <td className="py-5">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onTogglePin(item.id);
                      }}
                      className={`p-2 text-[12px] transition-all ${
                        item.isPinned ? 'text-[#5C8D5A] hover:text-[#4A7548]' : 'text-gray-300 hover:text-[#5C8D5A]'
                      }`}
                      title={item.isPinned ? '고정 해제' : '상단 고정'}
                    >
                      <i className="ri-pushpin-2-fill"></i>
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                      className="p-2 text-[12px] text-gray-400 transition-all hover:text-blue-600"
                      title="수정"
                    >
                      <i className="ri-edit-line"></i>
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                      className="p-2 text-[12px] text-gray-400 transition-all hover:text-red-600"
                      title="삭제"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
