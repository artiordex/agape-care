'use client';

import React from 'react';
import clsx from 'clsx';
import { Announcement } from './announcement.type';

interface Props {
  readonly isOpen: boolean;
  readonly announcement: Announcement | null;
  readonly onClose: () => void;
  readonly onEdit: (announcement: Announcement) => void;
  readonly onDelete: (id: string) => void;
}

/**
 * [Component] 공지사항 상세 조회 및 인쇄용 모달
 * 아가페 표준 UI 적용
 */
export default function AnnouncementDetailModal({ isOpen, announcement, onClose, onEdit, onDelete }: Props) {
  if (!isOpen || !announcement) return null;

  const categoryStyles: any = {
    긴급: 'text-red-600 bg-red-50 border-red-100',
    교육: 'text-blue-600 bg-blue-50 border-blue-100',
    일반: 'text-gray-500 bg-gray-50 border-gray-100',
    행사: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    점검: 'text-orange-600 bg-orange-50 border-orange-100',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[250] flex flex-col bg-gray-100 font-sans text-gray-900 antialiased print:bg-white">
      {/* 상단 관제 바 (인쇄 시 숨김) */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-300 bg-white px-8 py-4 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-gray-400 transition-all hover:text-gray-900"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="text-[12px] font-black uppercase tracking-widest">Back to List</span>
          </button>
          <div className="mx-2 h-4 w-[1px] bg-gray-200"></div>
          <h2 className="text-[15px] font-black uppercase italic text-gray-800">Document Preview Mode</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(announcement)}
            className="flex items-center gap-2 border border-gray-300 bg-white px-6 py-2.5 text-[12px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50"
          >
            <i className="ri-edit-line text-lg"></i>
            수정
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#5C8D5A] px-6 py-2.5 text-[12px] font-black text-white shadow-lg transition-all hover:bg-[#4A7548] active:scale-95"
          >
            <i className="ri-printer-line text-lg"></i>
            인쇄
          </button>

          <button onClick={onClose} className="p-2 text-gray-400 transition-all hover:text-red-500">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      </div>

      {/* 메인 문서 영역 */}
      <div className="flex-1 overflow-y-auto p-12 print:overflow-visible print:p-0">
        <div className="mx-auto max-w-[800px] bg-white p-[60px] shadow-2xl ring-1 ring-gray-200 print:shadow-none print:ring-0">
          {/* 문서 타이틀 헤더 */}
          <div className="mb-12 border-b-4 border-gray-900 pb-6 text-center">
            <h1 className="text-[28px] font-black uppercase tracking-[0.2em] text-gray-900">공 지 사 항</h1>
            <p className="mt-2 text-[11px] font-bold uppercase italic tracking-[0.3em] text-gray-400">
              Agape Medical Welfare Facility Notice
            </p>
          </div>

          {/* 기본 정보 테이블 */}
          <table className="mb-8 w-full border-collapse border-2 border-gray-900 text-[12px]">
            <tbody>
              <tr>
                <th className="w-28 border border-gray-300 bg-gray-100 p-3 text-left font-black">구분</th>
                <td className="border border-gray-300 p-3">
                  <span
                    className={clsx(
                      'rounded-none border px-3 py-1 text-[11px] font-black',
                      categoryStyles[announcement.category] || categoryStyles['일반'],
                    )}
                  >
                    {announcement.category}
                  </span>
                </td>
                <th className="w-28 border border-gray-300 bg-gray-100 p-3 text-left font-black">작성일</th>
                <td className="border border-gray-300 p-3 font-mono font-bold tracking-tighter">
                  {announcement.createdAt}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">작성자</th>
                <td className="border border-gray-300 p-3 font-bold">{announcement.author}</td>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">조회수</th>
                <td className="border border-gray-300 p-3 font-mono font-bold">
                  {announcement.views.toLocaleString()}회
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">제목</th>
                <td colSpan={3} className="border border-gray-300 p-3 text-[14px] font-black text-[#5C8D5A]">
                  {announcement.title}
                </td>
              </tr>
            </tbody>
          </table>

          {/* 본문 내용 */}
          <div className="border-2 border-gray-300">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-[10px] font-black uppercase italic text-gray-400">
              Notice Content Details (공지 내용 상세)
            </div>
            <div className="min-h-[400px] whitespace-pre-wrap p-8 text-[13px] font-medium leading-[1.8]">
              {announcement.content}
            </div>
          </div>

          {/* 첨부파일 */}
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="mt-8 border border-gray-300 bg-gray-50 p-6">
              <h3 className="mb-3 text-[11px] font-black uppercase text-gray-600">첨부파일</h3>
              <div className="space-y-2">
                {announcement.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[12px]">
                    <i className="ri-attachment-2 text-[#5C8D5A]"></i>
                    <span className="font-medium text-gray-700">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 하단 문서 정보 */}
          <div className="mt-12 flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest text-gray-300">
            <span>Agape_Notice_System_v4.2</span>
            <span>Page 01 of 01</span>
          </div>
        </div>
      </div>

      {/* 하단 액션 바 (인쇄 시 숨김) */}
      <div className="flex shrink-0 justify-center gap-3 border-t border-gray-200 bg-white p-4 print:hidden">
        <button
          onClick={() => onEdit(announcement)}
          className="flex items-center gap-2 border border-gray-300 bg-white px-8 py-3 text-[13px] font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50"
        >
          <i className="ri-edit-line"></i>
          수정하기
        </button>
        <button
          onClick={() => onDelete(announcement.id)}
          className="flex items-center gap-2 border border-red-300 bg-red-50 px-8 py-3 text-[13px] font-black text-red-600 shadow-sm transition-all hover:bg-red-100"
        >
          <i className="ri-delete-bin-line"></i>
          삭제하기
        </button>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          @page {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
