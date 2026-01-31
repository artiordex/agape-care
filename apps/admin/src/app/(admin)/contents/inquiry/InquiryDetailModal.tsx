'use client';

import { WebInquiry } from './inquiry.type';

interface Props {
  inquiry: WebInquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE') => void;
  onDelete: (id: string) => void;
}

/**
 * [Component] 웹 문의 상세보기 및 관리 모달
 * 아가페 그린 테마 적용
 */
export default function InquiryDetailModal({ inquiry, onClose, onUpdateStatus, onDelete }: Props) {
  if (!inquiry) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    if (confirm('정말로 이 문의를 삭제하시겠습니까?')) {
      onDelete(inquiry.id);
      onClose();
    }
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
          <h2 className="text-[15px] font-black uppercase italic text-gray-800">Inquiry Detail View</h2>
        </div>

        <div className="flex items-center gap-3">
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
            <h1 className="text-[28px] font-black uppercase tracking-[0.2em] text-gray-900">상 담 문 의 내 역</h1>
            <p className="mt-2 text-[11px] font-bold uppercase italic tracking-[0.3em] text-gray-400">
              Agape Web Inquiry Record
            </p>
          </div>

          {/* 기본 정보 테이블 */}
          <table className="mb-8 w-full border-collapse border-2 border-gray-900 text-[12px]">
            <tbody>
              <tr>
                <th className="w-32 border border-gray-300 bg-gray-100 p-3 text-left font-black">접수번호</th>
                <td className="border border-gray-300 p-3 font-mono font-bold">#{inquiry.id.padStart(6, '0')}</td>
                <th className="w-32 border border-gray-300 bg-gray-100 p-3 text-left font-black">접수일시</th>
                <td className="border border-gray-300 p-3 font-mono font-bold tracking-tighter">
                  {new Date(inquiry.createdAt).toLocaleString('ko-KR')}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">상담유형</th>
                <td className="border border-gray-300 p-3 font-bold">{inquiry.type}</td>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">처리상태</th>
                <td className="border border-gray-300 p-3">
                  <span
                    className={`inline-block rounded-none border px-3 py-1 text-[11px] font-black ${
                      inquiry.status === 'PENDING'
                        ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                        : inquiry.status === 'IN_PROGRESS'
                          ? 'border-blue-200 bg-blue-100 text-blue-800'
                          : 'border-green-200 bg-green-100 text-green-800'
                    }`}
                  >
                    {inquiry.status === 'PENDING' ? '대기중' : inquiry.status === 'IN_PROGRESS' ? '처리중' : '완료'}
                  </span>
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">문의자</th>
                <td className="border border-gray-300 p-3 text-[14px] font-black text-[#5C8D5A]">{inquiry.name}</td>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">연락처</th>
                <td className="border border-gray-300 p-3 font-mono font-bold">{inquiry.phone}</td>
              </tr>
              {inquiry.email && (
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">이메일</th>
                  <td colSpan={3} className="border border-gray-300 p-3 font-mono font-bold">
                    {inquiry.email}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 문의 내용 */}
          <div className="border-2 border-gray-300">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-[10px] font-black uppercase italic text-gray-400">
              Inquiry Message Details (문의 내용 상세)
            </div>
            <div className="min-h-[300px] whitespace-pre-wrap p-8 text-[13px] font-medium leading-[1.8]">
              {inquiry.message}
            </div>
          </div>

          {/* 하단 문서 정보 */}
          <div className="mt-12 flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest text-gray-300">
            <span>Agape_Inquiry_System_v4.2</span>
            <span>Page 01 of 01</span>
          </div>
        </div>
      </div>

      {/* 하단 액션 바 (인쇄 시 숨김) */}
      <div className="flex shrink-0 justify-between border-t border-gray-200 bg-white px-8 py-4 print:hidden">
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 border border-red-300 bg-red-50 px-6 py-2.5 text-[12px] font-black text-red-600 shadow-sm transition-all hover:bg-red-100"
          >
            <i className="ri-delete-bin-line"></i>
            삭제
          </button>
        </div>

        <div className="flex gap-2">
          <h3 className="mr-4 text-[11px] font-black uppercase text-gray-400">처리 상태 변경:</h3>
          {(['PENDING', 'IN_PROGRESS', 'DONE'] as const).map(status => (
            <button
              key={status}
              onClick={() => onUpdateStatus(inquiry.id, status)}
              className={`rounded-none border px-5 py-2.5 text-[11px] font-black transition-all ${
                inquiry.status === status
                  ? status === 'PENDING'
                    ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                    : status === 'IN_PROGRESS'
                      ? 'border-blue-200 bg-blue-100 text-blue-800'
                      : 'border-green-200 bg-green-100 text-green-800'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status === 'PENDING' ? '대기중' : status === 'IN_PROGRESS' ? '처리중' : '완료'}
            </button>
          ))}
        </div>
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
