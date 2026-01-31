import React, { useEffect, useState } from 'react';
import { FreeBoardPost, FreeBoardFormValues } from './free-board.type';

interface FreeBoardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FreeBoardFormValues) => void;
  initialData?: FreeBoardPost | null;
}

const FreeBoardFormModal = ({ isOpen, onClose, onSubmit, initialData }: FreeBoardFormModalProps) => {
  const [formData, setFormData] = useState<FreeBoardFormValues>({
    category: '일반',
    title: '',
    content: '',
    status: '게시',
    isNotice: false,
  });

  // 수정 모드일 경우 초기 데이터 세팅
  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category,
        title: initialData.title,
        content: initialData.content,
        status: initialData.status,
        isNotice: initialData.isNotice,
      });
    } else {
      setFormData({ category: '일반', title: '', content: '', status: '게시', isNotice: false });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">{initialData ? '게시글 수정' : '새 게시글 작성'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 폼 본문 */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">카테고리</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="일반">일반</option>
                <option value="질문">질문</option>
                <option value="정보">정보</option>
                <option value="잡담">잡담</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">상태</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="게시">게시</option>
                <option value="숨김">숨김</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="제목을 입력하세요"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">내용</label>
            <textarea
              rows={8}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="게시글 본문을 작성하세요"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isNotice"
              checked={formData.isNotice}
              onChange={e => setFormData({ ...formData, isNotice: e.target.checked })}
              className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isNotice" className="cursor-pointer text-sm font-medium text-gray-700">
              이 게시글을 상단 공지로 고정합니다.
            </label>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-700"
          >
            {initialData ? '수정 완료' : '등록 하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardFormModal;
