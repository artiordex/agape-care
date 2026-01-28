'use client';

export default function MenuSettingsEditor() {
  const menuItems = [
    { id: 1, name: '센터소개', visible: true, order: 1 },
    { id: 2, name: '서비스안내', visible: true, order: 2 },
    { id: 3, name: '시설안내', visible: true, order: 3 },
    { id: 4, name: '이용안내', visible: true, order: 4 },
    { id: 5, name: '알림마당', visible: true, order: 5 },
    { id: 6, name: '커뮤니티', visible: false, order: 6 },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">메뉴 사용 설정</h1>
        <p className="mt-1 text-sm text-gray-500">홈페이지 메뉴 노출 및 순서를 관리합니다</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <i className="ri-information-line mr-1 text-emerald-600"></i>
            드래그하여 메뉴 순서를 변경할 수 있습니다
          </p>
        </div>

        <div className="space-y-2">
          {menuItems.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <i className="ri-draggable cursor-move text-gray-400"></i>
                <span className="font-medium text-gray-900">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">순서: {item.order}</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked={item.visible} className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300"></div>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-6">
          <button className="whitespace-nowrap rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            취소
          </button>
          <button className="whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
