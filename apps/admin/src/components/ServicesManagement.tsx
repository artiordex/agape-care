import { useState } from 'react';

interface Service {
  id: number;
  title: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, title: '인지 재활 프로그램', category: '재활 서비스', status: 'active', createdAt: '2024-01-15', updatedAt: '2024-03-20' },
    { id: 2, title: '물리 치료', category: '의료 서비스', status: 'active', createdAt: '2024-01-20', updatedAt: '2024-03-18' },
    { id: 3, title: '여가 활동', category: '문화 서비스', status: 'active', createdAt: '2024-02-01', updatedAt: '2024-03-15' },
    { id: 4, title: '영양 상담', category: '건강 서비스', status: 'inactive', createdAt: '2024-02-10', updatedAt: '2024-03-10' },
    { id: 5, title: '가족 상담', category: '상담 서비스', status: 'active', createdAt: '2024-02-15', updatedAt: '2024-03-05' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = ['all', '재활 서비스', '의료 서비스', '문화 서비스', '건강 서비스', '상담 서비스'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">서비스 관리</h2>
          <p className="text-gray-600">요양원 서비스를 등록하고 관리하세요</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-add-line text-xl"></i>
          새 서비스 등록
        </button>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">검색</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="서비스명으로 검색..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">카테고리</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? '전체' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 서비스 목록 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">제목</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">카테고리</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">상태</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">등록일</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">수정일</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{service.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {service.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.createdAt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.updatedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="py-12 text-center">
            <i className="ri-inbox-line text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">검색 결과가 없습니다</p>
          </div>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedService ? '서비스 수정' : '새 서비스 등록'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">서비스명</label>
                <input
                  type="text"
                  defaultValue={selectedService?.title}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="서비스명 입력"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">카테고리</label>
                <select
                  defaultValue={selectedService?.category}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  {categories.filter(c => c !== 'all').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">상세 설명</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="서비스에 대한 상세 설명을 입력하세요"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">상태</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked={selectedService?.status === 'active'} className="cursor-pointer" />
                    <span className="text-sm text-gray-700">활성</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked={selectedService?.status === 'inactive'} className="cursor-pointer" />
                    <span className="text-sm text-gray-700">비활성</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}