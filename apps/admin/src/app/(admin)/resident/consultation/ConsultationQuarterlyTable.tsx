'use client';

interface QuarterlySummary {
  recipientId: string;
  recipientName: string;
  gender: string;
  age: number;
  roomNumber: string;
  grade: string;
  status: string;
  admissionDate: string;
  mainDiseases: string;
  type: 'consultation' | 'interview';
  year: number;
  q1Count: number;
  q2Count: number;
  q3Count: number;
  q4Count: number;
}

interface Props {
  data: QuarterlySummary[];
  onSelectRecipient: (recipient: QuarterlySummary) => void;
}

export default function ConsultationQuarterlyTable({ data, onSelectRecipient }: Props) {
  const getQuarterStatus = (count: number) => {
    if (count === 0) {
      return { text: '미작성', color: 'bg-gray-100 text-gray-600', icon: '○' };
    }
    return { text: `${count}건`, color: 'bg-blue-50 text-blue-700', icon: '●' };
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">번호</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">수급자명</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">성별/나이</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">생활실</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">등급</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">1분기</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">2분기</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">3분기</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">4분기</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-4 py-12 text-center">
                <i className="ri-file-search-line mb-2 block text-4xl text-gray-300"></i>
                <p className="text-sm text-gray-500">조회 결과가 없습니다.</p>
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const q1 = getQuarterStatus(item.q1Count);
              const q2 = getQuarterStatus(item.q2Count);
              const q3 = getQuarterStatus(item.q3Count);
              const q4 = getQuarterStatus(item.q4Count);

              return (
                <tr key={item.recipientId} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.recipientName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.gender} / {item.age}세
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.roomNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.grade}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${q1.color}`}>
                      {q1.icon} {q1.text}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${q2.color}`}>
                      {q2.icon} {q2.text}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${q3.color}`}>
                      {q3.icon} {q3.text}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${q4.color}`}>
                      {q4.icon} {q4.text}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onSelectRecipient(item)}
                      className="rounded border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      조회/작성
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
