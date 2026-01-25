'use client';

export default function ServiceEditor() {
  const services = [
    { id: 1, name: '인지 프로그램', icon: 'ri-brain-line' },
    { id: 2, name: '여가 프로그램', icon: 'ri-music-line' },
    { id: 3, name: '의료 지원', icon: 'ri-heart-pulse-line' },
    { id: 4, name: '재활 치료', icon: 'ri-walk-line' },
    { id: 5, name: '영양 관리', icon: 'ri-restaurant-line' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">서비스 안내 편집</h1>
        <p className="mt-1 text-sm text-gray-500">제공 서비스 정보를 편집합니다</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4">
        {services.map(service => (
          <div key={service.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  <i className={`${service.icon} text-xl text-emerald-600`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              </div>
              <button className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50">
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
        <button className="whitespace-nowrap rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <i className="ri-add-line mr-1"></i>
          서비스 추가
        </button>
      </div>
    </div>
  );
}
