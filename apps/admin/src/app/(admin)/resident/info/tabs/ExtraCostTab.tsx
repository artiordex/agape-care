const EXTRA_COSTS = [
  { id: 1, category: '이미용', item: '이발', price: 10000, quantity: 1, date: '2024-01-20' },
  { id: 2, category: '간식', item: '과일', price: 5000, quantity: 4, date: '2024-01-15' },
  { id: 3, category: '위생용품', item: '기저귀', price: 30000, quantity: 1, date: '2024-01-10' },
  { id: 4, category: '의류', item: '실내복', price: 25000, quantity: 2, date: '2024-01-05' },
];

export default function ExtraCostTab() {
  const total = EXTRA_COSTS.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">기타비용 / 비급여</h3>
        <button className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <i className="ri-add-line text-base"></i>
          항목 추가
        </button>
      </div>

      {/* 월별 필터 */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <i className="ri-arrow-left-s-line text-base"></i>
        </button>
        <span className="px-4 text-sm font-semibold text-gray-900">2024년 1월</span>
        <button className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <i className="ri-arrow-right-s-line text-base"></i>
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">날짜</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">분류</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">항목</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-700">단가</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">수량</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-700">합계</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {EXTRA_COSTS.map(cost => (
              <tr key={cost.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{cost.date}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {cost.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{cost.item}</td>
                <td className="px-4 py-3 text-right text-sm text-gray-700">{cost.price.toLocaleString()}원</td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">{cost.quantity}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                  {(cost.price * cost.quantity).toLocaleString()}원
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-400 transition-colors hover:text-gray-600">
                    <i className="ri-more-2-fill text-base"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-gray-300 bg-gray-50">
            <tr>
              <td colSpan={5} className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                월 합계
              </td>
              <td className="px-4 py-3 text-right text-base font-bold text-blue-700">{total.toLocaleString()}원</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '이미용', amount: 10000 },
          { label: '간식', amount: 20000 },
          { label: '위생용품', amount: 30000 },
          { label: '의류', amount: 50000 },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="mb-1 text-xs text-gray-600">{stat.label}</p>
            <p className="text-sm font-bold text-gray-900">{stat.amount.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
}
