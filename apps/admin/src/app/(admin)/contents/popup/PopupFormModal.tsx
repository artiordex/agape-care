'use client';

import React, { useState, useEffect } from 'react';
import { Popup } from './popup.type';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: Partial<Popup>) => void;
  readonly popup?: Popup | null;
}

/**
 * [Modal] 팝업 작성 및 수정 프로토콜
 * 아가페 표준 직각형 레이아웃 적용
 */
export default function PopupFormModal({ isOpen, onClose, onSave, popup }: Props) {
  const [formData, setFormData] = useState<Partial<Popup>>({
    title: '',
    status: '비활성',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    linkUrl: '',
    imageUrl: '',
    priority: 1,
    position: { x: 100, y: 100 },
    width: 500,
    height: 700,
    showOnce: true,
  });

  useEffect(() => {
    if (popup) {
      setFormData({ ...popup });
    } else {
      setFormData({
        title: '',
        status: '비활성',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        linkUrl: '',
        imageUrl: '',
        priority: 1,
        position: { x: 100, y: 100 },
        width: 500,
        height: 700,
        showOnce: true,
      });
    }
  }, [popup, isOpen]);

  const handleSubmit = () => {
    if (!formData.title) {
      alert('⚠️ 팝업 제목을 입력해주세요.');
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-none border-2 border-[#5C8D5A] bg-white shadow-2xl">
        {/* 헤더 */}
        <div className="flex shrink-0 items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-window-line text-xl"></i>
            <h3 className="text-sm font-black uppercase italic tracking-widest">
              {popup ? 'Popup Revision' : 'New Popup Entry'}
            </h3>
          </div>
          <button onClick={onClose} className="cursor-pointer p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 폼 본문 */}
        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto bg-[#f8fafc] p-8">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">팝업 제목 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[14px] font-black shadow-sm outline-none focus:border-[#5C8D5A]"
                placeholder="관리용 제목을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">시작일 *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[13px] font-bold outline-none focus:border-[#5C8D5A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">종료일 *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[13px] font-bold outline-none focus:border-[#5C8D5A]"
              />
            </div>
          </div>

          {/* 팝업 설정 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">우선순위</label>
              <input
                type="number"
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
                min="1"
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[13px] font-bold outline-none focus:border-[#5C8D5A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">상태</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[13px] font-bold outline-none focus:border-[#5C8D5A]"
              >
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
                <option value="예약">예약</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showOnce}
                  onChange={e => setFormData({ ...formData, showOnce: e.target.checked })}
                  className="h-4 w-4"
                />
                <span className="text-[11px] font-bold text-gray-600">하루동안 보지않기</span>
              </label>
            </div>
          </div>

          {/* 크기 및 위치 */}
          <div className="border border-gray-200 bg-white p-4">
            <h4 className="mb-3 text-[11px] font-black uppercase text-gray-600">팝업 크기 및 위치</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">너비 (px)</label>
                <input
                  type="number"
                  value={formData.width}
                  onChange={e => setFormData({ ...formData, width: parseInt(e.target.value) || 500 })}
                  className="w-full rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">높이 (px)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={e => setFormData({ ...formData, height: parseInt(e.target.value) || 700 })}
                  className="w-full rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">X 위치 (px)</label>
                <input
                  type="number"
                  value={formData.position?.x}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      position: { ...formData.position!, x: parseInt(e.target.value) || 100 },
                    })
                  }
                  className="w-full rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Y 위치 (px)</label>
                <input
                  type="number"
                  value={formData.position?.y}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      position: { ...formData.position!, y: parseInt(e.target.value) || 100 },
                    })
                  }
                  className="w-full rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
                />
              </div>
            </div>
          </div>

          {/* 링크 URL */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400">연결 링크 (URL)</label>
            <input
              type="text"
              value={formData.linkUrl}
              onChange={e => setFormData({ ...formData, linkUrl: e.target.value })}
              className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[13px] outline-none focus:border-[#5C8D5A]"
              placeholder="https://example.com"
            />
          </div>

          {/* 이미지 URL */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400">팝업 이미지 URL</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[13px] outline-none focus:border-[#5C8D5A]"
              placeholder="https://example.com/image.jpg"
            />
            <div className="mt-3 flex min-h-[200px] items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="preview" className="max-h-[200px] max-w-full object-contain" />
              ) : (
                <div className="text-center text-gray-400">
                  <i className="ri-image-line mb-2 text-4xl"></i>
                  <p className="text-[11px] font-bold">이미지 미리보기</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 푸터 액션 */}
        <div className="flex shrink-0 justify-between border-t border-gray-100 bg-gray-50 p-6">
          <div className="text-[10px] text-gray-400">* 표시는 필수 입력 항목입니다.</div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="cursor-pointer rounded-none border border-gray-300 bg-white px-8 py-3 text-[12px] font-black text-gray-400 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="cursor-pointer rounded-none bg-[#5C8D5A] px-10 py-3 text-[12px] font-black text-white shadow-lg hover:bg-[#4A7548] active:scale-95"
            >
              <i className="ri-save-3-line mr-2"></i>
              설정 저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
