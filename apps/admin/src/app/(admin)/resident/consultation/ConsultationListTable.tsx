'use client';

interface Consultation {
  id: string;
  recipientId: string;
  recipientName: string;
  type: 'consultation' | 'interview';
  year: number;
  quarter: number;
  occurredAt: string;
  targetType: 'recipient' | 'guardian';
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
  categoryCode: string;
  categoryName: string;
  methodCode: string;
  methodName: string;
  staffId: string;
  staffName: string;
  content: string;
  actionContent?: string;
  attachmentCount: number;
  isBenefitReflected: boolean;
  createdAt: string;
  createdBy: string;
}

interface Props {
  data: Consultation[];
  onViewDetail: (consultation: Consultation) => void;
}

export default function ConsultationListTable({ data, onViewDetail }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">번호</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">상담일시</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">분기</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">대상</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">구분</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">방법</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">상담직원</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">첨부</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-12 text-center">
                <i className="ri-file-search-line mb-2 block text-4xl text-gray-300"></i>
                <p className="text-sm text-gray-500">등록된 상담 기록이 없습니다.</p>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(item.occurredAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.quarter}분기</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.targetType === 'recipient' ? '수급자' : `보호자(${item.guardianName})`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.categoryName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.methodName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.staffName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.attachmentCount > 0 && (
                    <span className="inline-flex items-center text-blue-600">
                      <i className="ri-attachment-2 mr-1"></i>
                      {item.attachmentCount}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onViewDetail(item)}
                    className="rounded border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    상세
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
