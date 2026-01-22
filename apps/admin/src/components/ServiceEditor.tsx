export default function ServiceEditor() {
  const services = [
    { id: 1, name: '인지 프로그램', icon: 'ri-brain-line' },
    { id: 2, name: '여가 프로그램', icon: 'ri-music-line' },
    { id: 3, name: '의료 지원', icon: 'ri-heart-pulse-line' },
    { id: 4, name: '재활 치료', icon: 'ri-walk-line' },
    { id: 5, name: '영양 관리', icon: 'ri-restaurant-line' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">서비스 안내 편집</h1>
        <p className="text-sm text-gray-500 mt-1">제공 서비스 정보를 편집합니다</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i className={`${service.icon} text-xl text-emerald-600`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              </div>
              <button className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                <i className="ri-edit-line mr-1"></i>
                편집
              </button>
            </div>
            <p className="text-sm text-gray-600">
              서비스 설명이 여기에 표시됩니다. 편집 버튼을 클릭하여 내용을 수정할 수 있습니다.
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
          <i className="ri-add-line mr-1"></i>
          서비스 추가
        </button>
      </div>
    </div>
  );
}
