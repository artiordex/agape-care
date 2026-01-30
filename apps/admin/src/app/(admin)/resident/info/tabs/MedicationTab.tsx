const SAMPLE_MEDICATIONS = [
  { name: '혈압약', dosage: '1정', time: '아침 식후', status: '완료' },
  { name: '당뇨약', dosage: '1정', time: '아침/저녁 식후', status: '완료' },
  { name: '치매약', dosage: '1정', time: '저녁 식후', status: '예정' },
];

export default function MedicationTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">투약 정보</h3>
        <button className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <i className="ri-add-line text-base"></i>
          추가
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">약품명</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">용량</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">복용시간</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">상태</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {SAMPLE_MEDICATIONS.map((med, idx) => (
              <tr key={idx} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{med.name}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">{med.dosage}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">{med.time}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      med.status === '완료' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {med.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-400 transition-colors hover:text-gray-600">
                    <i className="ri-more-2-fill text-base"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
