/**
 * Description : ProgramModal.tsx - 📌 프로그램 일정 상세 모달
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

export default function ProgramModal({ selected, close }: any) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={close}>
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* =======================
            헤더 (Agape Green)
        ======================== */}
        <div className="bg-[#5C8D5A] p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">{selected.title}</h2>

            <button
              onClick={close}
              className="flex h-10 w-10 items-center justify-center rounded border border-white/40 bg-white/10 transition-colors hover:bg-white/20"
            >
              <i className="ri-close-line text-xl text-white" />
            </button>
          </div>
        </div>

        {/* =======================
            내용
        ======================== */}
        <div className="p-6">
          {/* 상세 정보 테이블 */}
          <div className="mb-6 overflow-hidden rounded-lg border border-[#5C8D5A]/20">
            <table className="w-full">
              <tbody className="divide-y divide-[#5C8D5A]/10">
                <tr className="transition-colors hover:bg-[#5C8D5A]/5">
                  <td className="w-32 border-r border-[#5C8D5A]/10 bg-[#5C8D5A]/5 p-4 text-sm font-semibold text-[#5C8D5A]">
                    날짜
                  </td>
                  <td className="p-4 text-sm text-gray-900">{selected.date}</td>
                </tr>

                <tr className="transition-colors hover:bg-[#5C8D5A]/5">
                  <td className="border-r border-[#5C8D5A]/10 bg-[#5C8D5A]/5 p-4 text-sm font-semibold text-[#5C8D5A]">
                    시간
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {selected.start_time} - {selected.end_time}
                  </td>
                </tr>

                <tr className="transition-colors hover:bg-[#5C8D5A]/5">
                  <td className="border-r border-[#5C8D5A]/10 bg-[#5C8D5A]/5 p-4 text-sm font-semibold text-[#5C8D5A]">
                    담당자
                  </td>
                  <td className="p-4 text-sm text-gray-900">{selected.staff}</td>
                </tr>

                <tr className="transition-colors hover:bg-[#5C8D5A]/5">
                  <td className="border-r border-[#5C8D5A]/10 bg-[#5C8D5A]/5 p-4 text-sm font-semibold text-[#5C8D5A]">
                    설명
                  </td>
                  <td className="p-4 text-sm text-gray-700">{selected.description}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 닫기 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={close}
              className="rounded border border-[#5C8D5A] bg-[#5C8D5A] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4E7B4D]"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
