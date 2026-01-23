export default function IntroEditor() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">기관 소개 편집</h1>
        <p className="text-sm text-gray-500 mt-1">기관 소개 페이지 콘텐츠를 편집합니다</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">인사말</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                placeholder="시설장 인사말"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <textarea
                rows={6}
                placeholder="인사말 내용을 입력하세요..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">연혁</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="2024"
                className="w-24 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="주요 내용"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
            <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              <i className="ri-add-line mr-1"></i>
              연혁 추가
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
            미리보기
          </button>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
