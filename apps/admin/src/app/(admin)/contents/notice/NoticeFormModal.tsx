/**
 * Description : NoticeFormModal.tsx - ?? NoticeFormModal UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Notice, NoticeCategory } from './notice.type';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: Partial<Notice>) => void;
  readonly notice?: Notice | null;
}

export default function NoticeFormModal({ isOpen, onClose, onSave, notice }: Props) {
  const editorRef = useRef<Editor>(null);
  const [formData, setFormData] = useState<Partial<Notice>>({
    category: '일반',
    title: '',
    content: '',
    isPinned: false,
    author: '관리자',
    attachments: [],
  });

  const categories: NoticeCategory[] = ['일반', '긴급', '교육', '행사', '점검'];

  useEffect(() => {
    if (notice) {
      setFormData({ ...notice });
      // 에디터에 기존 내용 세팅
      editorRef.current?.getInstance().setMarkdown(notice.content || '');
    } else {
      setFormData({
        category: '일반',
        title: '',
        content: '',
        isPinned: false,
        author: '관리자',
        attachments: [],
      });
      editorRef.current?.getInstance().setMarkdown('');
    }
  }, [notice, isOpen]);

  const handleSubmit = () => {
    // 에디터에서 content 추출
    const content = editorRef.current?.getInstance().getMarkdown() || '';

    if (!formData.title || !content.trim()) {
      alert('⚠️ 제목과 내용을 입력해주세요.');
      return;
    }

    onSave({ ...formData, content });
  };

  const handleAddAttachment = () => {
    const fileName = prompt('첨부파일 이름을 입력하세요:');
    if (fileName) {
      const newAttachment = { name: fileName, url: '#' };
      setFormData({
        ...formData,
        attachments: [...(formData.attachments || []), newAttachment],
      });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const updated = formData.attachments?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, attachments: updated });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-none border-2 border-[#5C8D5A] bg-white shadow-2xl">
        {/* 헤더 */}
        <div className="flex shrink-0 items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-edit-box-line text-xl"></i>
            <h3 className="text-sm font-black uppercase italic tracking-widest">
              {notice ? 'Notice Revision' : 'New Notice Entry'}
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
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">공지 구분 *</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as NoticeCategory })}
                className="w-full rounded-none border border-gray-200 bg-white px-3 py-2.5 text-[13px] font-bold outline-none focus:border-[#5C8D5A]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">작성자 *</label>
              <input
                type="text"
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                className="w-full rounded-none border border-gray-200 bg-white px-3 py-2.5 text-[13px] font-bold outline-none focus:border-[#5C8D5A]"
                placeholder="작성자명"
              />
            </div>
          </div>

          {/* 고정 여부 */}
          <div className="flex items-center gap-4 border border-gray-200 bg-white p-4">
            <label className="group flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={e => setFormData({ ...formData, isPinned: e.target.checked })}
                className="hidden"
              />
              <div
                className={clsx(
                  'flex h-5 w-5 items-center justify-center border-2 transition-all',
                  formData.isPinned ? 'border-[#5C8D5A] bg-[#5C8D5A]' : 'border-gray-300 bg-white',
                )}
              >
                {formData.isPinned && <i className="ri-check-line text-[14px] text-white"></i>}
              </div>
              <span className="text-[12px] font-black text-gray-600">
                <i className="ri-pushpin-2-fill mr-1 text-[#5C8D5A]"></i>
                최상단 고정 공지 (중요 공지사항)
              </span>
            </label>
            {formData.isPinned && (
              <span className="ml-auto rounded-none border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-black text-red-600">
                ⚠️ 고정 공지는 항상 최상단에 표시됩니다
              </span>
            )}
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400">공지 제목 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[14px] font-black shadow-sm outline-none focus:border-[#5C8D5A]"
              placeholder="공지사항 제목을 입력하십시오."
              maxLength={100}
            />
            <div className="text-right text-[10px] font-bold text-gray-400">{formData.title?.length || 0} / 100자</div>
          </div>

          {/* Toast UI Editor */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400">상세 내용 *</label>
            <div className="border border-gray-200">
              <Editor
                ref={editorRef}
                initialValue={notice?.content || ''}
                previewStyle="vertical"
                height="400px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                language="ko-KR"
                placeholder="공지할 상세 내용을 기록하십시오."
              />
            </div>
          </div>

          {/* 첨부파일 */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400">첨부파일</label>
            <div className="border border-gray-200 bg-white p-4">
              {formData.attachments && formData.attachments.length > 0 ? (
                <div className="mb-3 space-y-2">
                  {formData.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between border border-gray-100 bg-gray-50 p-2">
                      <div className="flex items-center gap-2 text-[12px]">
                        <i className="ri-file-text-line text-[#5C8D5A]"></i>
                        <span className="font-medium text-gray-700">{file.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveAttachment(idx)}
                        className="p-1 text-gray-400 transition-all hover:text-red-600"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-3 py-4 text-center text-[11px] text-gray-400">첨부된 파일이 없습니다.</div>
              )}

              <button
                onClick={handleAddAttachment}
                className="flex w-full items-center justify-center gap-2 border-2 border-dashed border-gray-300 py-3 text-[12px] font-bold text-gray-500 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]"
              >
                <i className="ri-add-line"></i>
                첨부파일 추가
              </button>
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
              데이터 최종 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
