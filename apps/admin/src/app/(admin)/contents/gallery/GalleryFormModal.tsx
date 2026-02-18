/**
 * Description : GalleryFormModal.tsx - ?? GalleryFormModal UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { GalleryFormValues, GalleryItem, GalleryStatus } from './gallery.type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: GalleryItem | null;
}

const MAX_IMAGES = 20;

const GalleryFormModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<GalleryFormValues>({
    category: '활동',
    title: '',
    description: '',
    status: '게시',
    isPublic: true,
    imageUrl: '',
  });

  const [previews, setPreviews] = useState<{ file: File | null; url: string; id?: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category,
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        isPublic: initialData.isPublic,
        imageUrl: initialData.imageUrl,
      });
      // 기존 이미지가 있으면 미리보기에 세팅 (id 포함)
      setPreviews(
        initialData.files
          ? initialData.files.map(f => ({ file: null, url: f.file?.url || '', id: f.file?.id }))
          : initialData.imageUrl
            ? [{ file: null, url: initialData.imageUrl }]
            : [],
      );
    } else {
      setFormData({ category: '활동', title: '', description: '', status: '게시', isPublic: true, imageUrl: '' });
      setPreviews([]);
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - previews.length;

    if (remaining <= 0) {
      toast.error(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`);
      return;
    }

    if (files.length > remaining) {
      toast.warning(`${files.length}장 중 ${remaining}장만 추가됩니다. (최대 ${MAX_IMAGES}장)`);
    }

    const sliced = files.slice(0, remaining);

    sliced.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, { file, url: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });

    // input 초기화 (같은 파일 재선택 가능하게)
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;

    const remaining = MAX_IMAGES - previews.length;
    if (remaining <= 0) {
      toast.error(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`);
      return;
    }

    files.slice(0, remaining).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, { file, url: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast.error('제목을 입력해주세요.');
      return;
    }
    if (previews.length === 0) {
      toast.error('이미지를 최소 1장 업로드해주세요.');
      return;
    }
    onSubmit({ ...formData, images: previews });
    toast.success(initialData ? '변경사항이 저장되었습니다.' : '이미지가 등록되었습니다.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">
              {initialData ? '이미지 자산 수정' : '신규 이미지 자산 등록'}
            </h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[#5C8D5A]">
              {previews.length} / {MAX_IMAGES}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 폼 본문 */}
        <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
          {/* 이미지 업로드 영역 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400">Media Upload</label>
              <span className="text-xs text-gray-400">최대 {MAX_IMAGES}장</span>
            </div>

            {/* 드래그앤드롭 업로드 존 */}
            {previews.length < MAX_IMAGES && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-8 transition-all hover:border-[#5C8D5A] hover:bg-emerald-50/30"
              >
                <i className="ri-image-add-line text-4xl text-gray-300 transition-colors group-hover:text-[#5C8D5A]"></i>
                <p className="mt-2 text-xs font-bold text-gray-400 group-hover:text-[#5C8D5A]">
                  클릭하거나 이미지를 드래그하여 업로드
                </p>
                <p className="mt-1 text-[11px] text-gray-300">PNG, JPG, WEBP 지원 · 최대 {MAX_IMAGES}장</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            )}

            {/* 이미지 그리드 미리보기 */}
            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {previews.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <img src={item.url} alt={`preview-${idx}`} className="h-full w-full object-cover" />
                    {/* 순서 번호 */}
                    <div className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] font-bold text-white">
                      {idx + 1}
                    </div>
                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => handleRemove(idx)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </div>
                ))}

                {/* 추가 버튼 (그리드 안에) */}
                {previews.length < MAX_IMAGES && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-[#5C8D5A] hover:bg-emerald-50/30"
                  >
                    <i className="ri-add-line text-2xl text-gray-300"></i>
                    <span className="mt-1 text-[10px] text-gray-300">추가</span>
                  </div>
                )}
              </div>
            )}
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
                onChange={e => {
                  const status = e.target.value as GalleryStatus;
                  setFormData({ ...formData, status, isPublic: status === '게시' });
                }}
                className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
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
            onClick={handleSubmit}
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
