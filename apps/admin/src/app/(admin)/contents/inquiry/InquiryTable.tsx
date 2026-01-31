'use client';

import { WebInquiry } from './inquiry.type';

interface Props {
  data: WebInquiry[];
  onView: (inquiry: WebInquiry) => void;
  onUpdateStatus: (id: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE') => void;
  onDelete: (id: string) => void;
}

/**
 * [Component] 웹 문의 관리 테이블
 * 아가페 그린 테마 적용
 */
export default function InquiryTable({ data, onView, onUpdateStatus, onDelete }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="rounded-none border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-xs font-black text-yellow-800">
            대기중
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="rounded-none border border-blue-200 bg-blue-100 px-2 py-0.5 text-xs font-black text-blue-800">
            처리중
          </span>
        );
      case 'DONE':
        return (
          <span className="rounded-none border border-green-200 bg-green-100 px-2 py-0.5 text-xs font-black text-green-800">
            완료
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case '입소상담':
        return 'border-emerald-100 bg-emerald-50 text-emerald-700';
      case '시설문의':
        return 'border-blue-100 bg-blue-50 text-blue-700';
      case '채용문의':
        return 'border-purple-100 bg-purple-50 text-purple-700';
      default:
        return 'border-gray-100 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
      <table className="min-w-full border-collapse text-center font-sans">
        <thead className="bg-[#5C8D5A] text-white shadow-md">
          <tr className="text-[14px] font-black tracking-tight">
            <th className="w-20 border-r border-white/10 px-6 py-4 uppercase italic">No.</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">신청일시</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">상담유형</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">이름</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">연락처</th>
            <th className="border-r border-white/10 px-6 py-4 uppercase italic">상태</th>
            <th className="px-6 py-4 uppercase italic">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-20 text-center">
                <i className="ri-inbox-line mb-2 block text-4xl text-gray-200"></i>
                <p className="text-[14px] font-bold uppercase italic tracking-widest text-gray-300">
                  등록된 상담 문의가 없습니다
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
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-block rounded-none border px-3 py-1 text-[11px] font-black ${getTypeColor(item.type)}`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[13px] font-black text-gray-900">{item.name}</td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-[12px] font-bold text-gray-500">
                  {item.phone}
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
                      <button
                        onClick={() => onUpdateStatus(item.id, 'IN_PROGRESS')}
                        className="p-2 text-[12px] text-gray-400 transition-all hover:text-blue-600"
                        title="처리 시작"
                      >
                        <i className="ri-play-circle-line"></i>
                      </button>
                    )}

                    {item.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => onUpdateStatus(item.id, 'DONE')}
                        className="p-2 text-[12px] text-gray-400 transition-all hover:text-green-600"
                        title="완료 처리"
                      >
                        <i className="ri-check-double-line"></i>
                      </button>
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
