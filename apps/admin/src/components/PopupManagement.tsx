export default function PopupManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">팝업 관리</h1>
        <p className="text-sm text-gray-500 mt-1">홈페이지 팝업 배너를 관리합니다</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>전체 상태</option>
              <option>활성</option>
              <option>비활성</option>
              <option>예약</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap">
            <i className="ri-add-line mr-1"></i>
            팝업 추가
          </button>
        </div>

        <div className="text-center py-12 text-gray-500">
          <i className="ri-window-line text-5xl mb-4 text-gray-300"></i>
          <p className="text-sm">등록된 팝업이 없습니다</p>
          <p className="text-xs mt-1">새로운 팝업을 추가해 주세요</p>
        </div>
      </div>
    </div>
  );
}
