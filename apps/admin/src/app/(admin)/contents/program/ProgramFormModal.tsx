'use client';

import { useEffect, useState } from 'react';
import { Program, ProgramCategory } from './program.type';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: Partial<Program>) => void;
  readonly program?: Program | null;
  readonly initialDate?: string;
}

// 수급자 데이터 타입
interface Recipient {
  id: string;
  name: string;
  gender: '남' | '여';
  age: number;
  level: string; // 등급
}

// 하드코딩된 수급자 데이터
const RECIPIENTS: Recipient[] = [
  { id: '1', name: '고물리', gender: '남', age: 80, level: '3등급' },
  { id: '2', name: '구시민', gender: '여', age: 90, level: '2등급' },
  { id: '3', name: '금 일봉', gender: '남', age: 80, level: '3등급' },
  { id: '4', name: '김◯◯', gender: '여', age: 96, level: '2등급' },
  { id: '5', name: '김갑동', gender: '남', age: 49, level: '' },
  { id: '6', name: '김옥분', gender: '여', age: 84, level: '3등급' },
  { id: '7', name: '김나나', gender: '여', age: 76, level: '4등급' },
  { id: '8', name: '박순자', gender: '여', age: 88, level: '1등급' },
  { id: '9', name: '이영희', gender: '여', age: 82, level: '2등급' },
  { id: '10', name: '최철수', gender: '남', age: 75, level: '3등급' },
];

/**
 * [Modal] 프로그램 작성 및 수정 프로토콜
 */
export default function ProgramFormModal({ isOpen, onClose, onSave, program, initialDate }: Props) {
  const [formData, setFormData] = useState<Partial<Program>>({
    title: '',
    category: '인지활동',
    date: initialDate || new Date().toISOString().split('T')[0],
    time: '10:00',
    duration: 60,
    instructor: '',
    location: '1층 강당',
    participants: 0,
    maxParticipants: 20,
    description: '',
    status: '예정',
    color: '#3B82F6',
  });

  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [showRecipientModal, setShowRecipientModal] = useState(false);

  const categories: ProgramCategory[] = ['인지활동', '여가활동', '물리치료', '음악치료', '미술활동', '특별행사'];

  const categoryColors: Record<string, string> = {
    인지활동: '#3B82F6',
    여가활동: '#10B981',
    물리치료: '#F59E0B',
    음악치료: '#8B5CF6',
    미술활동: '#EC4899',
    특별행사: '#EF4444',
  };

  useEffect(() => {
    if (program) {
      setFormData({ ...program });
      setSelectedRecipients(program.recipientIds || []);
    } else {
      setFormData({
        title: '',
        category: '인지활동',
        date: initialDate || new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: 60,
        instructor: '',
        location: '1층 강당',
        participants: 0,
        maxParticipants: 20,
        description: '',
        status: '예정',
        color: '#3B82F6',
      });
      setSelectedRecipients([]);
    }
  }, [program, initialDate, isOpen]);

  const handleCategoryChange = (category: ProgramCategory) => {
    setFormData({
      ...formData,
      category,
      color: categoryColors[category] || '#3B82F6',
    });
  };

  const handleToggleRecipient = (id: string) => {
    setSelectedRecipients(prev => (prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedRecipients.length === RECIPIENTS.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(RECIPIENTS.map(r => r.id));
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.instructor) {
      alert('⚠️ 프로그램명과 담당자를 입력해주세요.');
      return;
    }

    // 선택된 수급자 수를 참여인원으로 자동 설정
    const dataToSave = {
      ...formData,
      recipientIds: selectedRecipients,
      participants: selectedRecipients.length,
    };

    onSave(dataToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{program ? '프로그램 수정' : '프로그램 추가'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 폼 본문 */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-4">
          {/* 프로그램명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">프로그램명 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="예: 뇌건강 체조"
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">카테고리 *</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    formData.category === cat
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 날짜 및 시간 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">날짜 *</label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">시간 *</label>
              <input
                type="time"
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">소요시간 (분)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 60 })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 담당자 및 장소 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">담당자 *</label>
              <input
                type="text"
                value={formData.instructor}
                onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="예: 김영희"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">장소</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 대상 수급자 선택 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                대상 수급자 ({selectedRecipients.length}명 선택)
              </label>
              <button
                type="button"
                onClick={() => setShowRecipientModal(true)}
                className="rounded-md border border-blue-600 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
              >
                수급자 선택
              </button>
            </div>

            {selectedRecipients.length > 0 ? (
              <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                <div className="flex flex-wrap gap-2">
                  {selectedRecipients.map(id => {
                    const recipient = RECIPIENTS.find(r => r.id === id);
                    if (!recipient) return null;
                    return (
                      <div
                        key={id}
                        className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm"
                      >
                        <span>{recipient.name}</span>
                        <span className="text-gray-400">({recipient.age}세)</span>
                        <button
                          type="button"
                          onClick={() => handleToggleRecipient(id)}
                          className="ml-1 text-gray-400 hover:text-red-600"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 py-6 text-center text-xs text-gray-400">
                수급자를 선택해주세요
              </div>
            )}
          </div>

          {/* 상태 및 최대인원 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">최대인원</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={e => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 20 })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">상태</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="예정">예정</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
                <option value="취소">취소</option>
              </select>
            </div>
          </div>

          {/* 프로그램 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">프로그램 설명</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="프로그램 내용을 상세히 입력해주세요"
            />
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {program ? '수정' : '등록'}
          </button>
        </div>
      </div>

      {/* 수급자 선택 모달 */}
      {showRecipientModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">프로그램 대상 수급자</h3>
                <p className="mt-1 text-xs text-gray-500">총 인원 {RECIPIENTS.length}명</p>
              </div>
              <button onClick={() => setShowRecipientModal(false)} className="text-gray-400 hover:text-gray-500">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* 수급자 목록 */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {/* 전체 선택 */}
              <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRecipients.length === RECIPIENTS.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900">전체 선택</span>
                </label>
                <span className="text-sm text-gray-500">{selectedRecipients.length}명 선택됨</span>
              </div>

              {/* 수급자 테이블 */}
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr className="text-left text-xs font-medium text-gray-600">
                    <th className="px-3 py-2 text-center">선택</th>
                    <th className="px-3 py-2">수급자</th>
                    <th className="px-3 py-2 text-center">성별</th>
                    <th className="px-3 py-2 text-center">나이</th>
                    <th className="px-3 py-2 text-center">등급</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {RECIPIENTS.map(recipient => (
                    <tr
                      key={recipient.id}
                      className={`transition-colors hover:bg-gray-50 ${
                        selectedRecipients.includes(recipient.id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-3 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRecipients.includes(recipient.id)}
                          onChange={() => handleToggleRecipient(recipient.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-gray-900">{recipient.name}</td>
                      <td className="px-3 py-3 text-center text-sm text-gray-600">{recipient.gender}</td>
                      <td className="px-3 py-3 text-center text-sm text-gray-600">{recipient.age}세</td>
                      <td className="px-3 py-3 text-center text-sm text-gray-600">{recipient.level || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 모달 푸터 */}
            <div className="flex justify-between border-t border-gray-200 px-6 py-4">
              <div className="text-sm text-gray-600">
                선택된 수급자: <span className="font-bold text-blue-600">{selectedRecipients.length}명</span>
              </div>
              <button
                onClick={() => setShowRecipientModal(false)}
                className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
