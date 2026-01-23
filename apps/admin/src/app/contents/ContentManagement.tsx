import { useState } from 'react';

interface Content {
  id: number;
  title: string;
  type: 'menu' | 'banner' | 'gallery';
  thumbnail?: string;
  status: 'active' | 'inactive';
  order: number;
}

export default function ContentManagement() {
  const [contents, setContents] = useState<Content[]>([
    { id: 1, title: '인지 재활 프로그램', type: 'menu', thumbnail: 'https://readdy.ai/api/search-image?query=elderly%20cognitive%20rehabilitation%20therapy%20with%20memory%20games%20and%20puzzles%20in%20bright%20modern%20medical%20facility%20with%20healthcare%20professional%20assistance&width=400&height=300&seq=content1&orientation=landscape', status: 'active', order: 1 },
    { id: 2, title: '메인 배너 - 봄맞이', type: 'banner', thumbnail: 'https://readdy.ai/api/search-image?query=spring%20season%20beautiful%20garden%20with%20blooming%20flowers%20elderly%20care%20facility%20peaceful%20natural%20scenery%20warm%20sunlight%20fresh%20green%20plants&width=400&height=300&seq=content2&orientation=landscape', status: 'active', order: 1 },
    { id: 3, title: '여가 활동 사진', type: 'gallery', thumbnail: 'https://readdy.ai/api/search-image?query=elderly%20people%20enjoying%20leisure%20activities%20art%20painting%20music%20performance%20social%20gathering%20in%20nursing%20home%20happy%20smiling%20faces%20warm%20atmosphere&width=400&height=300&seq=content3&orientation=landscape', status: 'active', order: 1 },
    { id: 4, title: '물리 치료 서비스', type: 'menu', thumbnail: 'https://readdy.ai/api/search-image?query=physical%20therapy%20rehabilitation%20elderly%20patient%20with%20professional%20therapist%20modern%20equipment%20medical%20facility%20clean%20bright%20environment&width=400&height=300&seq=content4&orientation=landscape', status: 'inactive', order: 2 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredContents = filterType === 'all' 
    ? contents 
    : contents.filter(c => c.type === filterType);

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setContents(contents.filter(c => c.id !== id));
    }
  };

  const handleAddNew = () => {
    setSelectedContent(null);
    setShowModal(true);
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'menu': return '메뉴';
      case 'banner': return '배너';
      case 'gallery': return '갤러리';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'menu': return 'bg-blue-100 text-blue-700';
      case 'banner': return 'bg-purple-100 text-purple-700';
      case 'gallery': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">사용자 콘텐츠 관리</h2>
          <p className="text-gray-600">사용자에게 표시되는 콘텐츠를 관리하세요</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-add-line text-xl"></i>
          새 콘텐츠 추가
        </button>
      </div>

      {/* 필터 */}
      <div className="flex gap-2">
        {['all', 'menu', 'banner', 'gallery'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              filterType === type
                ? 'bg-gradient-to-r from-teal-500 to-amber-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {type === 'all' ? '전체' : getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* 콘텐츠 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative w-full h-48 bg-gray-100">
              {content.thumbnail ? (
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="ri-image-line text-5xl text-gray-300"></i>
                </div>
              )}
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
                {getTypeLabel(content.type)}
              </span>
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                content.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {content.status === 'active' ? '활성' : '비활성'}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{content.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">순서: {content.order}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(content)}
                    className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-edit-line text-lg"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <i className="ri-inbox-line text-5xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">표시할 콘텐츠가 없습니다</p>
        </div>
      )}

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedContent ? '콘텐츠 수정' : '새 콘텐츠 추가'}
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  defaultValue={selectedContent?.title}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="콘텐츠 제목"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">유형</label>
                <select
                  defaultValue={selectedContent?.type}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="menu">메뉴</option>
                  <option value="banner">배너</option>
                  <option value="gallery">갤러리</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">썸네일 이미지</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                  <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-600 mb-1">이미지를 드래그하거나 클릭하여 업로드</p>
                  <p className="text-xs text-gray-500">PNG, JPG 최대 5MB</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">표시 순서</label>
                <input
                  type="number"
                  defaultValue={selectedContent?.order || 1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">상태</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked={selectedContent?.status === 'active'} className="cursor-pointer" />
                    <span className="text-sm text-gray-700">활성</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked={selectedContent?.status === 'inactive'} className="cursor-pointer" />
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