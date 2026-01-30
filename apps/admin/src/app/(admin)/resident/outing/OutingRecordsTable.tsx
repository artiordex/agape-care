'use client';

interface OutingRecord {
  id: number;
  residentId: number;
  residentName: string;
  type: '외출' | '외박' | '병원외래';
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  expectedReturnDate: string;
  expectedReturnTime: string;
  destination: string;
  purpose: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  hospital?: string;
  notes: string;
  status: '진행중' | '복귀완료' | '복귀미처리';
  createdAt: string;
  createdBy: string;
}

interface Props {
  records: OutingRecord[];
  onViewDetail: (record: OutingRecord) => void;
  onEdit: (record: OutingRecord) => void;
  onReturn: (record: OutingRecord) => void;
}

export default function OutingRecordsTable({ records, onViewDetail, onEdit, onReturn }: Props) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case '외출':
        return 'bg-blue-50 text-blue-700';
      case '외박':
        return 'bg-purple-50 text-purple-700';
      case '병원외래':
        return 'bg-teal-50 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">연번</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">구분</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">출발일</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">출발시간</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">복귀일</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">복귀시간</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">행선지</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">목적</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">보호자</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">관계</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">전화번호</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">병원</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {records.length === 0 ? (
            <tr>
              <td colSpan={13} className="px-4 py-12 text-center">
                <i className="ri-file-search-line mb-2 block text-4xl text-gray-300"></i>
                <p className="text-sm text-gray-500">외출/외박 기록이 없습니다.</p>
              </td>
            </tr>
          ) : (
            records.map((record, index) => (
              <tr
                key={record.id}
                className={`transition-colors hover:bg-gray-50 ${record.status === '복귀미처리' ? 'bg-red-50' : ''}`}
              >
                <td className="px-4 py-3 text-center text-sm text-gray-900">
                  {record.status === '복귀미처리' && <span className="mr-1 font-bold text-red-600">□</span>}
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${getTypeColor(record.type)}`}>
                    {record.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900">{record.departureDate}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-900">{record.departureTime}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-900">
                  {record.returnDate || record.expectedReturnDate}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900">
                  {record.returnTime || record.expectedReturnTime}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.destination}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.purpose}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.guardianName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.guardianRelation}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.guardianPhone}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.hospital || '-'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onViewDetail(record)}
                      className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      상세
                    </button>
                    {record.status !== '복귀완료' && (
                      <>
                        <button
                          onClick={() => onEdit(record)}
                          className="rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => onReturn(record)}
                          className="rounded border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
                        >
                          복귀
                        </button>
                      </>
                    )}
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
