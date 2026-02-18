/**
 * Description : VisitReservationDetailModal.tsx - ?? VisitReservationDetailModal UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { VisitReservation } from './inquiry.type';

interface Props {
  reservation: VisitReservation | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED') => void;
  onDelete: (id: string) => void;
}

/**
 * [Component] 방문 예약 상세보기 및 관리 모달
 * 아가페 그린 테마 적용
 */
export default function VisitReservationDetailModal({
  reservation,
  onClose,
  onUpdateStatus,
  onDelete,
}: Props) {
  if (!reservation) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    if (confirm('정말로 이 예약을 삭제하시겠습니까?')) {
      onDelete(reservation.id);
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
          <h2 className="text-[15px] font-black uppercase italic text-gray-800">Visit Reservation Detail View</h2>
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
            <h1 className="text-[28px] font-black uppercase tracking-[0.2em] text-gray-900">방 문 예 약 내 역</h1>
            <p className="mt-2 text-[11px] font-bold uppercase italic tracking-[0.3em] text-gray-400">
              Agape Visit Reservation Record
            </p>
          </div>

          {/* 기본 정보 테이블 */}
          <table className="mb-8 w-full border-collapse border-2 border-gray-900 text-[12px]">
            <tbody>
              <tr>
                <th className="w-32 border border-gray-300 bg-gray-100 p-3 text-left font-black">예약번호</th>
                <td className="border border-gray-300 p-3 font-mono font-bold">
                  #{reservation.id.padStart(6, '0')}
                </td>
                <th className="w-32 border border-gray-300 bg-gray-100 p-3 text-left font-black">신청일시</th>
                <td className="border border-gray-300 p-3 font-mono font-bold tracking-tighter">
                  {new Date(reservation.createdAt).toLocaleString('ko-KR')}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">방문 예정일</th>
                <td className="border border-gray-300 p-3 font-mono font-bold">{reservation.visitDate}</td>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">방문 시간</th>
                <td className="border border-gray-300 p-3 font-mono font-bold">{reservation.visitTime}</td>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">처리상태</th>
                <td className="border border-gray-300 p-3" colSpan={3}>
                  <span
                    className={`inline-block rounded-none border px-3 py-1 text-[11px] font-black ${
                      reservation.status === 'PENDING'
                        ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                        : reservation.status === 'APPROVED'
                          ? 'border-green-200 bg-green-100 text-green-800'
                          : reservation.status === 'REJECTED'
                            ? 'border-red-200 bg-red-100 text-red-800'
                            : 'border-gray-200 bg-gray-100 text-gray-800'
                    }`}
                  >
                    {reservation.status === 'PENDING'
                      ? '대기중'
                      : reservation.status === 'APPROVED'
                        ? '승인됨'
                        : reservation.status === 'REJECTED'
                          ? '반려됨'
                          : '취소됨'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* 방문자 정보 */}
          <div className="mb-8">
            <h3 className="mb-4 border-l-4 border-[#5C8D5A] pl-3 text-[14px] font-black uppercase italic text-gray-800">
              방문자 정보
            </h3>
            <table className="w-full border-collapse border-2 border-gray-900 text-[12px]">
              <tbody>
                <tr>
                  <th className="w-32 border border-gray-300 bg-gray-100 p-3 text-left font-black">방문자명</th>
                  <td className="border border-gray-300 p-3 text-[14px] font-black text-[#5C8D5A]">
                    {reservation.visitorName}
                  </td>
                  <th className="w-32 border border-gray-300 bg-gray-100 p-3 text-left font-black">연락처</th>
                  <td className="border border-gray-300 p-3 font-mono font-bold">{reservation.visitorPhone}</td>
                </tr>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">어르신 관계</th>
                  <td className="border border-gray-300 p-3 font-bold">{reservation.visitorRelationship}</td>
                  <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">방문 인원</th>
                  <td className="border border-gray-300 p-3 font-mono font-bold">{reservation.visitorCount}명</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 어르신 정보 */}
          <div className="mb-8">
            <h3 className="mb-4 border-l-4 border-[#5C8D5A] pl-3 text-[14px] font-black uppercase italic text-gray-800">
              어르신 정보
            </h3>
            <table className="w-full border-collapse border-2 border-gray-900 text-[12px]">
              <tbody>
                <tr>
                  <th className="w-32 border border-gray-300 bg-gray-100 p-3 text-left font-black">어르신명</th>
                  <td className="border border-gray-300 p-3 text-[14px] font-black text-[#5C8D5A]">
                    {reservation.residentName}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 방문 목적 */}
          {reservation.visitPurpose && (
            <div className="mb-8">
              <h3 className="mb-4 border-l-4 border-[#5C8D5A] pl-3 text-[14px] font-black uppercase italic text-gray-800">
                방문 목적
              </h3>
              <div className="border-2 border-gray-300 p-4 text-[13px] font-medium leading-[1.8]">
                {reservation.visitPurpose}
              </div>
            </div>
          )}

          {/* 건강 체크 */}
          <div className="mb-8">
            <h3 className="mb-4 border-l-4 border-[#5C8D5A] pl-3 text-[14px] font-black uppercase italic text-gray-800">
              건강 상태 확인
            </h3>
            <table className="w-full border-collapse border-2 border-gray-900 text-[12px]">
              <tbody>
                <tr>
                  <th className="w-48 border border-gray-300 bg-gray-100 p-3 text-left font-black">감염 증상 여부</th>
                  <td className="border border-gray-300 p-3 font-bold">
                    {reservation.healthCheckSymptoms ? (
                      <span className="text-red-600">있음</span>
                    ) : (
                      <span className="text-green-600">없음</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-3 text-left font-black">이동 보조 필요</th>
                  <td className="border border-gray-300 p-3 font-bold">
                    {reservation.healthCheckAssistance ? (
                      <span className="text-orange-600">필요</span>
                    ) : (
                      <span className="text-gray-600">불필요</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 관리자 메모 */}
          {reservation.notes && (
            <div className="mb-8">
              <h3 className="mb-4 border-l-4 border-[#5C8D5A] pl-3 text-[14px] font-black uppercase italic text-gray-800">
                관리자 메모
              </h3>
              <div className="border-2 border-gray-300 bg-yellow-50 p-4 text-[13px] font-medium leading-[1.8]">
                {reservation.notes}
              </div>
            </div>
          )}

          {/* 하단 문서 정보 */}
          <div className="mt-12 flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest text-gray-300">
            <span>Agape_Visit_System_v4.2</span>
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
          {(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] as const).map(status => (
            <button
              key={status}
              onClick={() => onUpdateStatus(reservation.id, status)}
              className={`rounded-none border px-5 py-2.5 text-[11px] font-black transition-all ${
                reservation.status === status
                  ? status === 'PENDING'
                    ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                    : status === 'APPROVED'
                      ? 'border-green-200 bg-green-100 text-green-800'
                      : status === 'REJECTED'
                        ? 'border-red-200 bg-red-100 text-red-800'
                        : 'border-gray-200 bg-gray-100 text-gray-800'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status === 'PENDING'
                ? '대기중'
                : status === 'APPROVED'
                  ? '승인'
                  : status === 'REJECTED'
                    ? '반려'
                    : '취소'}
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
