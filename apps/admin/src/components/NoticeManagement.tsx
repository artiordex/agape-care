import { useState } from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  views: number;
}

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: '2024년 설 연휴 운영 안내', content: '설 연휴 기간 운영 시간이 변경됩니다...', published: true, createdAt: '2024-01-20', views: 245 },
    { id: 2, title: '정기 시설 점검 안내', content: '다음 주 화요일 시설 점검이 예정되어 있습니다...', published: true, createdAt: '2024-02-15', views: 189 },
    { id: 3, title: '신규 프로그램 안내', content: '새로운 인지 재활 프로그램이 시작됩니다...', published: false, createdAt: '2024-03-01', views: 67 },
    { id: 4, title: '건강검진 일정 공지', content: '연례 건강검진 일정을 안내드립니다...', published: true, createdAt: '2024-03-10', views: 312 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleTogglePublish = (id: number) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, published: !notice.published } : notice
    ));
  };

  const handleEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setEditContent(notice.content);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const handleAddNew = () => {
    setSelectedNotice(null);
    setEditContent('');
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">공지사항 관리</h2>
          <p className="text-gray-600">공지사항을 작성하고 게시하세요</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-add-line text-xl"></i>
          새 공지사항 작성
        </button>
      </div>

      {/* 공지사항 목록 */}
      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    notice.published 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {notice.published ? '게시중' : '비공개'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{notice.content}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {notice.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-eye-line"></i>
                    조회 {notice.views}회
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(notice.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                    notice.published
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  <i className={`${notice.published ? 'ri-eye-off-line' : 'ri-eye-line'} mr-1`}></i>
                  {notice.published ? '비공개' : '게시'}
                </button>
                <button
                  onClick={() => handleEdit(notice)}
                  className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-edit-line text-xl"></i>
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-delete-bin-line text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedNotice ? '공지사항 수정' : '새 공지사항 작성'}
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
                  defaultValue={selectedNotice?.title}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="공지사항 제목"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">내용</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* 간단한 텍스트 에디터 툴바 */}
                  <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                      <i className="ri-bold"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                      <i className="ri-italic"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                      <i className="ri-underline"></i>
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                      <i className="ri-list-unordered"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                      <i className="ri-list-ordered"></i>
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                      <i className="ri-link"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                      <i className="ri-image-line"></i>
                    </button>
                  </div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 border-0 focus:ring-0 resize-none"
                    placeholder="공지사항 내용을 입력하세요..."
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">게시 상태</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="published" defaultChecked className="cursor-pointer" />
                    <span className="text-sm text-gray-700">즉시 게시</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="published" className="cursor-pointer" />
                    <span className="text-sm text-gray-700">비공개 저장</span>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}