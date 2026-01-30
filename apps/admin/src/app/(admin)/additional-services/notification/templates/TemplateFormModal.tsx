'use client';

import { useState, useEffect } from 'react';
import type { Template } from './TemplateTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Partial<Template>) => void;
  template?: Template | null;
}

export default function TemplateFormModal({ isOpen, onClose, onSave, template }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [channel, setChannel] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (template) {
      setName(template.name);
      setCategory(template.category);
      setChannel(template.channel);
      setContent(template.content);
      setStatus(template.status);
    } else {
      setName('');
      setCategory('');
      setChannel('');
      setContent('');
      setStatus('active');
    }
  }, [template]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('템플릿명을 입력하세요');
      return;
    }
    if (!category) {
      alert('카테고리를 선택하세요');
      return;
    }
    if (!channel) {
      alert('채널을 선택하세요');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력하세요');
      return;
    }

    const templateData: Partial<Template> = {
      id: template?.id,
      name,
      category,
      channel,
      content,
      status,
    };

    onSave(templateData);
  };

  const insertVariable = (variable: string) => {
    setContent(content + variable);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl rounded-lg bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-900">{template ? '템플릿 수정' : '새 템플릿 등록'}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 내용 */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-4">
            {/* 템플릿명 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                템플릿명 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="예: 월간 청구 안내"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* 카테고리 & 채널 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  카테고리 <span className="text-red-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="notice">일반 공지</option>
                  <option value="urgent">긴급 알림</option>
                  <option value="billing">청구 안내</option>
                  <option value="schedule">일정 안내</option>
                  <option value="health">건강 정보</option>
                  <option value="event">행사 안내</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  채널 <span className="text-red-600">*</span>
                </label>
                <select
                  value={channel}
                  onChange={e => setChannel(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="sms">SMS/LMS</option>
                  <option value="band">Band</option>
                  <option value="kakao">카카오톡</option>
                </select>
              </div>
            </div>

            {/* 상태 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">상태</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="active"
                    checked={status === 'active'}
                    onChange={e => setStatus(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">사용중</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="inactive"
                    checked={status === 'inactive'}
                    onChange={e => setStatus(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">미사용</span>
                </label>
              </div>
            </div>

            {/* 변수 삽입 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">변수 삽입</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => insertVariable('#{수급자명}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}수급자명{'}'}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('#{보호자명}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}보호자명{'}'}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('#{생활실}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}생활실{'}'}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('#{청구월}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}청구월{'}'}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('#{금액}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}금액{'}'}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('#{시설명}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}시설명{'}'}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('#{날짜}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}날짜{'}'}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable('#{시간}')}
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  #{'{'}시간{'}'}
                </button>
              </div>
            </div>

            {/* 내용 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                내용 <span className="text-red-600">*</span>
              </label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={8}
                placeholder="템플릿 내용을 입력하세요. 변수를 사용하여 개인화된 메시지를 작성할 수 있습니다."
                className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs text-gray-500">변수는 발송 시 실제 값으로 자동 치환됩니다</span>
                <span className="text-xs text-gray-500">{content.length} / 2000 bytes</span>
              </div>
            </div>

            {/* 미리보기 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">미리보기</label>
              <div className="rounded border border-gray-200 bg-gray-50 p-4">
                <div className="whitespace-pre-wrap text-sm text-gray-700">
                  {content || '내용을 입력하면 미리보기가 표시됩니다'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {template ? '수정' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}
