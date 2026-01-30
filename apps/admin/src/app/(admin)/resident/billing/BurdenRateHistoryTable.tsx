'use client';

interface BurdenRateHistory {
  id: string;
  residentId: string;
  startDate: string;
  endDate: string | null;
  rateName: string;
  rate: number;
  reason: string;
  createdBy: string;
  createdAt: string;
}

interface Props {
  history: BurdenRateHistory[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BurdenRateHistoryTable({ history, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">본인부담률 변경 이력</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">적용 시작일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">종료일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">부담률명</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">부담률</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">변경 사유</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">처리자</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">등록일시</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">관리</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {history.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <i className="ri-file-list-line mb-2 block text-4xl text-gray-300"></i>
                  <p className="text-sm text-gray-500">등록된 이력이 없습니다.</p>
                </td>
              </tr>
            ) : (
              history.map(item => (
                <tr key={item.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.startDate}</td>
                  <td className="px-4 py-3 text-sm">
                    {item.endDate ? (
                      <span className="text-gray-900">{item.endDate}</span>
                    ) : (
                      <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                        현재 적용 중
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {item.rateName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{item.rate}%</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.reason}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.createdBy}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onEdit(item.id)}
                        className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
