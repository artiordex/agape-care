'use client';

export default function IntroEditor() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">기관 소개 편집</h1>
        <p className="mt-1 text-sm text-gray-500">기관 소개 페이지 콘텐츠를 편집합니다</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">인사말</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">제목</label>
              <input
                type="text"
                placeholder="시설장 인사말"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">내용</label>
              <textarea
                rows={6}
                placeholder="인사말 내용을 입력하세요..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">연혁</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="2024"
                className="w-24 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="주요 내용"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-50">
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
            <button className="w-full whitespace-nowrap rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
              <i className="ri-add-line mr-1"></i>
              연혁 추가
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="whitespace-nowrap rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            미리보기
          </button>
          <button className="whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
