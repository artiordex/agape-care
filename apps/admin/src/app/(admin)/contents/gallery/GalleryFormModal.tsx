'use client';

import React, { useEffect, useState, useRef } from 'react';
import { GalleryItem, GalleryFormValues, GalleryStatus } from './gallery.type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void; // 이미지 전송을 위해 FormData 사용
  initialData?: GalleryItem | null;
}

const GalleryFormModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<GalleryFormValues>({
    category: '활동',
    title: '',
    description: '',
    status: '게시',
    imageUrl: '',
  });

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category,
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        imageUrl: initialData.imageUrl,
      });
      setPreview(initialData.imageUrl);
    } else {
      setFormData({ category: '활동', title: '', description: '', status: '게시', imageUrl: '' });
      setPreview(null);
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">
            {initialData ? '이미지 자산 수정' : '신규 이미지 자산 등록'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 폼 본문 */}
        <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
          {/* 이미지 업로드 영역 */}
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-400">Media Upload</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-[#5C8D5A] hover:bg-emerald-50/30"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-contain" />
              ) : (
                <div className="text-center">
                  <i className="ri-image-add-line text-4xl text-gray-300 transition-colors group-hover:text-[#5C8D5A]"></i>
                  <p className="mt-2 text-xs font-bold text-gray-400 group-hover:text-[#5C8D5A]">
                    클릭하여 이미지 파일 선택
                  </p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">카테고리</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
              >
                <option value="활동">활동</option>
                <option value="시설">시설</option>
                <option value="행사">행사</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">노출 상태</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
              >
                <option value="게시">게시 (Active)</option>
                <option value="숨김">숨김 (Hidden)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
              placeholder="이미지 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">설명 (Caption)</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
              placeholder="이미지에 대한 추가 설명을 입력하세요"
            />
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={() => {
              /* FormData 생성 후 onSubmit 호출 */
            }}
            className="rounded-lg bg-[#5C8D5A] px-6 py-2 text-sm font-bold text-white shadow-md shadow-emerald-100 transition-all hover:bg-[#4A7548]"
          >
            {initialData ? '변경사항 저장' : '이미지 등록'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryFormModal;
