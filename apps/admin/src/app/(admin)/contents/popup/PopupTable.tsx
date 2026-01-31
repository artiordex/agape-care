'use client';

import React from 'react';
import { Popup } from './popup.type';

interface Props {
  readonly popups: Popup[];
  readonly onView: (popup: Popup) => void;
  readonly onEdit: (popup: Popup) => void;
  readonly onDelete: (id: string) => void;
  readonly onToggleStatus: (id: string) => void;
}

/**
 * [Component] 팝업 관리 그리드 테이블
 * 아가페 그린 테마 적용
 */
export default function PopupTable({ popups, onView, onEdit, onDelete, onToggleStatus }: Props) {
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
    <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
      <table className="w-full border-collapse text-center font-sans">
        <thead className="bg-[#5C8D5A] text-white shadow-md">
          <tr className="text-[14px] font-black tracking-tight">
            <th className="w-32 border-r border-white/10 px-6 py-4 uppercase italic">미리보기</th>
            <th className="border-r border-white/10 px-6 py-4 text-left uppercase italic">팝업 제목</th>
            <th className="w-32 border-r border-white/10 px-6 py-4 uppercase italic">노출기간</th>
            <th className="w-24 border-r border-white/10 px-6 py-4 uppercase italic">우선순위</th>
            <th className="w-24 border-r border-white/10 px-6 py-4 uppercase italic">상태</th>
            <th className="w-32 px-6 py-4 uppercase italic">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {popups.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-20 text-center">
                <i className="ri-window-line mb-2 block text-4xl text-gray-200"></i>
                <p className="text-[14px] font-bold uppercase italic tracking-widest text-gray-300">
                  등록된 팝업이 없습니다
                </p>
              </td>
            </tr>
          ) : (
            popups.map(popup => (
              <tr key={popup.id} className="group transition-all hover:bg-emerald-50/30">
                {/* 미리보기 */}
                <td className="px-6 py-4">
                  <div
                    onClick={() => onView(popup)}
                    className="mx-auto flex h-16 w-24 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-50 transition-all hover:border-[#5C8D5A]"
                  >
                    {popup.imageUrl ? (
                      <img src={popup.imageUrl} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <i className="ri-image-line text-2xl text-gray-300"></i>
                    )}
                  </div>
                </td>

                {/* 제목 */}
                <td
                  onClick={() => onView(popup)}
                  className="cursor-pointer px-6 py-4 text-left text-[13px] font-black text-gray-800 transition-colors group-hover:text-[#5C8D5A]"
                >
                  {popup.title}
                </td>

                {/* 노출기간 */}
                <td className="px-6 py-4">
                  <div className="flex flex-col text-[11px]">
                    <span className="font-mono font-bold text-gray-600">{popup.startDate}</span>
                    <span className="font-bold text-gray-400">~</span>
                    <span className="font-mono font-bold text-gray-600">{popup.endDate}</span>
                  </div>
                </td>

                {/* 우선순위 */}
                <td className="px-6 py-4">
                  <span className="rounded-none border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-black text-gray-700">
                    {popup.priority}순위
                  </span>
                </td>

                {/* 상태 */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleStatus(popup.id)}
                    className={`rounded-none border px-3 py-1 text-[11px] font-black transition-all ${getStatusColor(popup.status)}`}
                  >
                    {popup.status}
                  </button>
                </td>

                {/* 관리 버튼 */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onView(popup)}
                      className="p-2 text-[12px] text-gray-400 transition-all hover:text-[#5C8D5A]"
                      title="상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>

                    <button
                      onClick={() => onEdit(popup)}
                      className="p-2 text-[12px] text-gray-400 transition-all hover:text-blue-600"
                      title="수정"
                    >
                      <i className="ri-edit-line"></i>
                    </button>

                    <button
                      onClick={() => onDelete(popup.id)}
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
