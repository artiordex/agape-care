'use client';

import { VisitReservation } from './inquiry.type';

interface Props {
  data: VisitReservation[];
  onView: (reservation: VisitReservation) => void;
  onUpdateStatus: (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED') => void;
  onDelete: (id: string) => void;
}

/**
 * [Component] 방문 예약 관리 테이블
 * 아가페 그린 테마 적용
 */
export default function VisitReservationTable({ data, onView, onUpdateStatus, onDelete }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="rounded-none border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-xs font-black text-yellow-800">
            대기중
          </span>
        );
      case 'APPROVED':
        return (
          <span className="rounded-none border border-green-200 bg-green-100 px-2 py-0.5 text-xs font-black text-green-800">
            승인됨
          </span>
        );
      case 'REJECTED':
        return (
          <span className="rounded-none border border-red-200 bg-red-100 px-2 py-0.5 text-xs font-black text-red-800">
            반려됨
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="rounded-none border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-black text-gray-800">
            취소됨
          </span>
        );
      default:
        return (
          <span className="rounded-none border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-black text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
      <table className="min-w-full border-collapse text-center font-sans">
        <thead className="bg-[#5C8D5A] text-white shadow-md">
          <tr className="text-[14px] font-black tracking-tight">
            <th className="w-20 border-r border-white/10 px-6 py-4 uppercase italic">No.</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">신청일시</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">방문자</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">어르신</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">방문일시</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">인원</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">상태</th>
            <th className="px-6 py-4 uppercase italic">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-20 text-center">
                <i className="ri-inbox-line mb-2 block text-4xl text-gray-200"></i>
                <p className="text-[14px] font-bold uppercase italic tracking-widest text-gray-300">
                  등록된 방문 예약이 없습니다
                </p>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className="group transition-all hover:bg-emerald-50/30">
                <td className="px-6 py-4 font-mono text-[13px] font-bold text-gray-400">
                  {String(data.length - index).padStart(3, '0')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-[12px] font-bold text-gray-500">
                  {new Date(item.createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="text-[13px] font-black text-gray-900">{item.visitorName}</div>
                  <div className="mt-1 font-mono text-[11px] font-bold text-gray-400">
                    {item.visitorRelationship}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[13px] font-black text-gray-900">
                  {item.residentName}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-mono text-[12px] font-bold text-gray-700">{item.visitDate}</div>
                  <div className="mt-1 font-mono text-[11px] font-bold text-gray-400">{item.visitTime}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-[13px] font-bold text-gray-700">
                  {item.visitorCount}명
                </td>
                <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(item.status)}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onView(item)}
                      className="p-2 text-[12px] text-gray-400 transition-all hover:text-[#5C8D5A]"
                      title="상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>

                    {item.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(item.id, 'APPROVED')}
                          className="p-2 text-[12px] text-gray-400 transition-all hover:text-green-600"
                          title="승인"
                        >
                          <i className="ri-check-line"></i>
                        </button>
                        <button
                          onClick={() => onUpdateStatus(item.id, 'REJECTED')}
                          className="p-2 text-[12px] text-gray-400 transition-all hover:text-red-600"
                          title="반려"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => onDelete(item.id)}
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
