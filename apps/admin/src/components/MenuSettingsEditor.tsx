export default function MenuSettingsEditor() {
  const menuItems = [
    { id: 1, name: '센터소개', visible: true, order: 1 },
    { id: 2, name: '서비스안내', visible: true, order: 2 },
    { id: 3, name: '시설안내', visible: true, order: 3 },
    { id: 4, name: '이용안내', visible: true, order: 4 },
    { id: 5, name: '알림마당', visible: true, order: 5 },
    { id: 6, name: '커뮤니티', visible: false, order: 6 }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">메뉴 사용 설정</h1>
        <p className="text-sm text-gray-500 mt-1">홈페이지 메뉴 노출 및 순서를 관리합니다</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <i className="ri-information-line text-emerald-600 mr-1"></i>
            드래그하여 메뉴 순서를 변경할 수 있습니다
          </p>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <i className="ri-draggable text-gray-400 cursor-move"></i>
                <span className="font-medium text-gray-900">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">순서: {item.order}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.visible} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
            취소
          </button>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
