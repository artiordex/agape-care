'use client';

export default function ProgramModal({ selected, close }: any) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="border-b-2 border-gray-900 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{selected.title}</h2>
            <button
              onClick={close}
              className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50"
            >
              <i className="ri-close-line text-xl text-gray-600" />
            </button>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6">
          {/* 상세 정보 테이블 */}
          <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="w-32 border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">
                    날짜
                  </td>
                  <td className="p-4 text-sm text-gray-900">{selected.date}</td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">시간</td>
                  <td className="p-4 text-sm text-gray-900">
                    {selected.start_time} - {selected.end_time}
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">
                    담당자
                  </td>
                  <td className="p-4 text-sm text-gray-900">{selected.staff}</td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">설명</td>
                  <td className="p-4 text-sm text-gray-700">{selected.description}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 닫기 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={close}
              className="rounded border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
