'use client';

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
    {
      id: 1,
      title: '2024년 설 연휴 운영 안내',
      content: '설 연휴 기간 운영 시간이 변경됩니다...',
      published: true,
      createdAt: '2024-01-20',
      views: 245,
    },
    {
      id: 2,
      title: '정기 시설 점검 안내',
      content: '다음 주 화요일 시설 점검이 예정되어 있습니다...',
      published: true,
      createdAt: '2024-02-15',
      views: 189,
    },
    {
      id: 3,
      title: '신규 프로그램 안내',
      content: '새로운 인지 재활 프로그램이 시작됩니다...',
      published: false,
      createdAt: '2024-03-01',
      views: 67,
    },
    {
      id: 4,
      title: '건강검진 일정 공지',
      content: '연례 건강검진 일정을 안내드립니다...',
      published: true,
      createdAt: '2024-03-10',
      views: 312,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleTogglePublish = (id: number) => {
    setNotices(notices.map(notice => (notice.id === id ? { ...notice, published: !notice.published } : notice)));
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
    <div className="animate-fadeIn space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">공지사항 관리</h2>
          <p className="text-gray-600">공지사항을 작성하고 게시하세요</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 px-6 py-3 font-bold text-white transition-all hover:shadow-xl"
        >
          <i className="ri-add-line text-xl"></i>새 공지사항 작성
        </button>
      </div>

      {/* 공지사항 목록 */}
      <div className="grid grid-cols-1 gap-4">
        {notices.map(notice => (
          <div
            key={notice.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      notice.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {notice.published ? '게시중' : '비공개'}
                  </span>
                </div>

                <p className="mb-4 line-clamp-2 text-sm text-gray-600">{notice.content}</p>

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
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-all ${
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
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50"
                >
                  <i className="ri-edit-line text-xl"></i>
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50"
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
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedNotice ? '공지사항 수정' : '새 공지사항 작성'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">제목</label>
                <input
                  type="text"
                  defaultValue={selectedNotice?.title}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  placeholder="공지사항 제목"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">내용</label>
                <div className="overflow-hidden rounded-lg border border-gray-300">
                  {/* 간단한 텍스트 에디터 툴바 */}
                  <div className="flex gap-1 border-b border-gray-300 bg-gray-50 p-2">
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
                      <i className="ri-bold"></i>
                    </button>
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
                      <i className="ri-italic"></i>
                    </button>
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
                      <i className="ri-underline"></i>
                    </button>
                    <div className="mx-1 w-px bg-gray-300"></div>
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
                      <i className="ri-list-unordered"></i>
                    </button>
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
                      <i className="ri-list-ordered"></i>
                    </button>
                    <div className="mx-1 w-px bg-gray-300"></div>
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
                      <i className="ri-link"></i>
                    </button>
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
                      <i className="ri-image-line"></i>
                    </button>
                  </div>
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    rows={12}
                    className="w-full resize-none border-0 px-4 py-3 focus:ring-0"
                    placeholder="공지사항 내용을 입력하세요..."
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">게시 상태</label>
                <div className="flex gap-4">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="published" defaultChecked className="cursor-pointer" />
                    <span className="text-sm text-gray-700">즉시 게시</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="published" className="cursor-pointer" />
                    <span className="text-sm text-gray-700">비공개 저장</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 px-6 py-3 font-bold text-white transition-all hover:shadow-xl"
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
