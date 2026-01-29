'use client';

export default function DonationVolunteerEditor() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">후원 및 자원봉사 편집</h1>
        <p className="mt-1 text-sm text-gray-500">후원 및 자원봉사 안내 페이지를 편집합니다</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">후원 안내</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">후원 계좌</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="은행명"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder="계좌번호"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">예금주</label>
              <input
                type="text"
                placeholder="실버타운 요양원"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">후원 안내 문구</label>
              <textarea
                rows={4}
                placeholder="후원금은 어르신들의 복지 향상을 위해 소중히 사용됩니다..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">자원봉사 안내</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">봉사 활동 소개</label>
              <textarea
                rows={4}
                placeholder="자원봉사자를 모집합니다. 어르신들과 함께하는 시간을 나눠주세요..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">신청 방법</label>
              <textarea
                rows={3}
                placeholder="전화 또는 이메일로 신청해 주세요..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">문의처</label>
              <input
                type="text"
                placeholder="02-1234-5678"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
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
