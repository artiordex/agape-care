'use client';

export default function DesignInfoEditor() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">디자인 정보 관리</h1>
        <p className="mt-1 text-sm text-gray-500">홈페이지 디자인 요소를 관리합니다</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">로고 이미지</label>
            <div className="flex items-center gap-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <i className="ri-image-line text-3xl text-gray-400"></i>
              </div>
              <button className="whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <i className="ri-upload-line mr-1"></i>
                업로드
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">파비콘</label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <i className="ri-image-line text-xl text-gray-400"></i>
              </div>
              <button className="whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <i className="ri-upload-line mr-1"></i>
                업로드
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">메인 컬러</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  defaultValue="#10b981"
                  className="h-12 w-12 cursor-pointer rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  defaultValue="#10b981"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">서브 컬러</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  defaultValue="#14b8a6"
                  className="h-12 w-12 cursor-pointer rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  defaultValue="#14b8a6"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button className="whitespace-nowrap rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              취소
            </button>
            <button className="whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
