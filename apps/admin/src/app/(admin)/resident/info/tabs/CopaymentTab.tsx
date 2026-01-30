export default function CopaymentTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">본인부담금 관리</h3>
        <button className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <i className="ri-printer-line text-base"></i>
          고지서 출력
        </button>
      </div>

      {/* 월별 청구 요약 */}
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-blue-100 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">요양급여 본인부담금</p>
          <p className="text-xl font-bold text-gray-900">450,000원</p>
          <p className="mt-1 text-xs text-gray-500">20% 부담</p>
        </div>
        <div className="rounded-lg border border-green-100 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">식대 본인부담금</p>
          <p className="text-xl font-bold text-gray-900">180,000원</p>
          <p className="mt-1 text-xs text-gray-500">전액 본인부담</p>
        </div>
        <div className="rounded-lg border border-purple-100 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">비급여 비용</p>
          <p className="text-xl font-bold text-gray-900">110,000원</p>
          <p className="mt-1 text-xs text-gray-500">기타비용</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="mb-1 text-xs text-blue-700">월 총액</p>
          <p className="text-xl font-bold text-blue-700">740,000원</p>
          <p className="mt-1 text-xs text-blue-600">2024년 1월</p>
        </div>
      </div>

      {/* 납부 내역 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h4 className="text-sm font-semibold text-gray-900">납부 내역</h4>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">청구월</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-700">청구액</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-700">납부액</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">납부일</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">상태</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">영수증</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { month: '2024-01', amount: 740000, paid: 740000, date: '2024-01-05', status: '완납' },
                { month: '2023-12', amount: 720000, paid: 720000, date: '2023-12-05', status: '완납' },
                { month: '2023-11', amount: 710000, paid: 710000, date: '2023-11-05', status: '완납' },
                { month: '2023-10', amount: 730000, paid: 730000, date: '2023-10-05', status: '완납' },
              ].map((payment, idx) => (
                <tr key={idx} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{payment.month}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700">{payment.amount.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                    {payment.paid.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">{payment.date}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 transition-colors hover:text-blue-700">
                      <i className="ri-download-line text-base"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 자동이체 정보 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h4 className="text-sm font-semibold text-gray-900">자동이체 정보</h4>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="mb-1 text-xs text-gray-500">은행</p>
                <p className="text-sm font-semibold text-gray-900">국민은행</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">계좌번호</p>
                <p className="text-sm font-semibold text-gray-900">123-456-789012</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">예금주</p>
                <p className="text-sm font-semibold text-gray-900">김철수</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">이체일</p>
                <p className="text-sm font-semibold text-gray-900">매월 5일</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <i className="ri-edit-line text-base"></i>
              변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
