'use client';

import { useState, useEffect } from 'react';
import type { RecipientGroup } from './RecipientGroupTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: Partial<RecipientGroup>) => void;
  group?: RecipientGroup | null;
}

export default function RecipientGroupFormModal({ isOpen, onClose, onSave, group }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (group) {
      setName(group.name);
      setType(group.type);
      setDescription(group.description);
      setStatus(group.status);
    } else {
      setName('');
      setType('');
      setDescription('');
      setStatus('active');
    }
  }, [group]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('그룹명을 입력하세요');
      return;
    }
    if (!type) {
      alert('그룹 유형을 선택하세요');
      return;
    }

    const groupData: Partial<RecipientGroup> = {
      id: group?.id,
      name,
      type,
      description,
      status,
    };

    onSave(groupData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-900">{group ? '그룹 수정' : '새 그룹 등록'}</h2>
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
            {/* 그룹명 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                그룹명 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="예: 1층 수급자"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* 그룹 유형 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                그룹 유형 <span className="text-red-600">*</span>
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="resident">수급자</option>
                <option value="guardian">보호자</option>
                <option value="staff">직원</option>
                <option value="mixed">혼합</option>
              </select>
              <p className="mt-1.5 text-xs text-gray-500">그룹에 포함될 대상자의 유형을 선택하세요</p>
            </div>

            {/* 설명 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">설명</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="그룹에 대한 설명을 입력하세요"
                className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
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

            {/* 안내 메시지 */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <i className="ri-information-line mt-0.5 text-base text-blue-600"></i>
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-900">구성원 관리 안내</p>
                  <p className="mt-1 text-xs text-blue-700">
                    그룹 생성 후 '구성원 관리' 버튼을 통해 대상자를 추가할 수 있습니다.
                  </p>
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
            {group ? '수정' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}
