'use client';

import { useState } from 'react';

interface Member {
  id: number;
  name: string;
  type: string;
  room?: string;
  grade?: string;
  department?: string;
  phone: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  groupId: number | null;
  groupName: string;
}

export default function RecipientGroupMembersModal({ isOpen, onClose, groupId, groupName }: Props) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // 샘플 현재 구성원
  const [currentMembers] = useState<Member[]>([
    { id: 1, name: '김수급', type: 'resident', room: '101호', grade: '2등급', phone: '010-1111-1111' },
    { id: 2, name: '이보호', type: 'guardian', phone: '010-2222-2222' },
    { id: 3, name: '박간호', type: 'staff', department: '간호팀', phone: '010-3333-3333' },
  ]);

  // 샘플 추가 가능한 대상자
  const [availableMembers] = useState<Member[]>([
    { id: 4, name: '최수급', type: 'resident', room: '102호', grade: '3등급', phone: '010-4444-4444' },
    { id: 5, name: '정보호', type: 'guardian', phone: '010-5555-5555' },
    { id: 6, name: '강요양', type: 'staff', department: '요양팀', phone: '010-6666-6666' },
    { id: 7, name: '윤수급', type: 'resident', room: '103호', grade: '1등급', phone: '010-7777-7777' },
  ]);

  const handleToggleMember = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(m => m !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleAddMembers = () => {
    if (selectedMembers.length === 0) {
      alert('추가할 대상자를 선택하세요');
      return;
    }
    alert(`${selectedMembers.length}명을 그룹에 추가했습니다`);
    setSelectedMembers([]);
  };

  const handleRemoveMember = (id: number) => {
    if (confirm('이 대상자를 그룹에서 제외하시겠습니까?')) {
      alert(`대상자를 제외했습니다`);
    }
  };

  const getTypeBadge = (type: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      resident: { label: '수급자', className: 'bg-blue-50 text-blue-700' },
      guardian: { label: '보호자', className: 'bg-green-50 text-green-700' },
      staff: { label: '직원', className: 'bg-purple-50 text-purple-700' },
    };
    return badgeMap[type] || { label: type, className: 'bg-gray-50 text-gray-700' };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-5xl rounded-lg bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">구성원 관리</h2>
            <p className="mt-1 text-xs text-gray-600">{groupName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 내용 */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* 현재 구성원 */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">현재 구성원 ({currentMembers.length}명)</h3>
              </div>

              <div className="space-y-2">
                {currentMembers.length === 0 ? (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                    <i className="ri-user-line mb-2 block text-3xl text-gray-300"></i>
                    <p className="text-sm text-gray-500">구성원이 없습니다</p>
                  </div>
                ) : (
                  currentMembers.map(member => {
                    const typeBadge = getTypeBadge(member.type);
                    return (
                      <div key={member.id} className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">{member.name}</span>
                              <span className={`rounded px-2 py-0.5 text-xs font-medium ${typeBadge.className}`}>
                                {typeBadge.label}
                              </span>
                            </div>
                            <div className="mt-2 space-y-1">
                              {member.room && (
                                <p className="text-xs text-gray-600">
                                  <i className="ri-home-line mr-1"></i>
                                  {member.room}
                                </p>
                              )}
                              {member.grade && (
                                <p className="text-xs text-gray-600">
                                  <i className="ri-medal-line mr-1"></i>
                                  {member.grade}
                                </p>
                              )}
                              {member.department && (
                                <p className="text-xs text-gray-600">
                                  <i className="ri-building-line mr-1"></i>
                                  {member.department}
                                </p>
                              )}
                              <p className="text-xs text-gray-600">
                                <i className="ri-phone-line mr-1"></i>
                                {member.phone}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                          >
                            제외
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* 대상자 추가 */}
            <div>
              <div className="mb-4">
                <h3 className="mb-3 text-sm font-bold text-gray-900">대상자 추가</h3>

                {/* 필터 */}
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    placeholder="이름 검색"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">전체</option>
                    <option value="resident">수급자</option>
                    <option value="guardian">보호자</option>
                    <option value="staff">직원</option>
                  </select>
                </div>

                {/* 선택된 대상자 수 */}
                {selectedMembers.length > 0 && (
                  <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <p className="text-xs text-blue-700">
                      <i className="ri-checkbox-circle-line mr-1"></i>
                      {selectedMembers.length}명 선택됨
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-4 max-h-96 space-y-2 overflow-y-auto">
                {availableMembers.map(member => {
                  const typeBadge = getTypeBadge(member.type);
                  const isSelected = selectedMembers.includes(member.id);

                  return (
                    <div
                      key={member.id}
                      onClick={() => handleToggleMember(member.id)}
                      className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{member.name}</span>
                            <span className={`rounded px-2 py-0.5 text-xs font-medium ${typeBadge.className}`}>
                              {typeBadge.label}
                            </span>
                          </div>
                          <div className="mt-1 space-y-0.5">
                            {member.room && (
                              <p className="text-xs text-gray-600">
                                <i className="ri-home-line mr-1"></i>
                                {member.room}
                              </p>
                            )}
                            {member.grade && (
                              <p className="text-xs text-gray-600">
                                <i className="ri-medal-line mr-1"></i>
                                {member.grade}
                              </p>
                            )}
                            {member.department && (
                              <p className="text-xs text-gray-600">
                                <i className="ri-building-line mr-1"></i>
                                {member.department}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleAddMembers}
                disabled={selectedMembers.length === 0}
                className="w-full rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                선택한 대상자 추가 ({selectedMembers.length})
              </button>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
