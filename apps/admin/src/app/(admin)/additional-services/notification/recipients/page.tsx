'use client';

import { useState } from 'react';
import RecipientGroupDetailModal from './RecipientGroupDetailModal';
import RecipientGroupFilters from './RecipientGroupFilters';
import RecipientGroupFormModal from './RecipientGroupFormModal';
import RecipientGroupMembersModal from './RecipientGroupMembersModal';
import RecipientGroupStats from './RecipientGroupStats';
import RecipientGroupTable, { type RecipientGroup } from './RecipientGroupTable';

export default function RecipientGroupPage() {
  // 필터 상태
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 모달 상태
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<RecipientGroup | null>(null);
  const [editingGroup, setEditingGroup] = useState<RecipientGroup | null>(null);
  const [managingGroupId, setManagingGroupId] = useState<number | null>(null);
  const [managingGroupName, setManagingGroupName] = useState('');

  // 샘플 데이터
  const [groups, setGroups] = useState<RecipientGroup[]>([
    {
      id: 1,
      name: '1층 수급자',
      type: 'resident',
      description: '1층에 거주하시는 수급자 어르신들',
      memberCount: 15,
      status: 'active',
      usageCount: 45,
      lastUsedAt: '2026-01-28',
      createdBy: '김관리',
      createdAt: '2025-12-01',
    },
    {
      id: 2,
      name: '고등급 수급자 보호자',
      type: 'guardian',
      description: '1-2등급 수급자 어르신의 보호자분들',
      memberCount: 23,
      status: 'active',
      usageCount: 67,
      lastUsedAt: '2026-01-25',
      createdBy: '이간호사',
      createdAt: '2025-11-15',
    },
    {
      id: 3,
      name: '간호팀',
      type: 'staff',
      description: '간호사 및 간호조무사',
      memberCount: 8,
      status: 'active',
      usageCount: 89,
      lastUsedAt: '2026-01-29',
      createdBy: '박원장',
      createdAt: '2025-10-01',
    },
    {
      id: 4,
      name: '외출 가능 수급자',
      type: 'resident',
      description: '외출/외박이 가능한 수급자 어르신',
      memberCount: 12,
      status: 'active',
      usageCount: 34,
      lastUsedAt: '2026-01-20',
      createdBy: '최직원',
      createdAt: '2025-09-10',
    },
    {
      id: 5,
      name: '긴급 연락망',
      type: 'mixed',
      description: '긴급 상황 시 연락할 보호자 및 직원',
      memberCount: 35,
      status: 'active',
      usageCount: 12,
      lastUsedAt: '2026-01-15',
      createdBy: '김관리',
      createdAt: '2025-08-20',
    },
    {
      id: 6,
      name: '2층 수급자 (미사용)',
      type: 'resident',
      description: '2층 거주 수급자 (현재 사용 중지)',
      memberCount: 10,
      status: 'inactive',
      usageCount: 23,
      lastUsedAt: '2025-12-31',
      createdBy: '이간호사',
      createdAt: '2025-07-01',
    },
    {
      id: 7,
      name: '요양팀',
      type: 'staff',
      description: '요양보호사 및 사회복지사',
      memberCount: 12,
      status: 'active',
      usageCount: 56,
      lastUsedAt: '2026-01-27',
      createdBy: '박원장',
      createdAt: '2025-06-15',
    },
  ]);

  // 통계 계산
  const totalGroups = groups.length;
  const activeGroups = groups.filter(g => g.status === 'active').length;
  const totalMembers = groups.reduce((sum, g) => sum + g.memberCount, 0);
  const recentlyUsed = groups.filter(g => g.lastUsedAt && g.lastUsedAt >= '2026-01-20').length;

  // 핸들러
  const handleView = (id: number) => {
    const group = groups.find(g => g.id === id);
    if (group) {
      setSelectedGroup(group);
      setIsDetailModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const group = groups.find(g => g.id === id);
    if (group) {
      setEditingGroup(group);
      setIsFormModalOpen(true);
    }
  };

  const handleManageMembers = (id: number) => {
    const group = groups.find(g => g.id === id);
    if (group) {
      setManagingGroupId(id);
      setManagingGroupName(group.name);
      setIsMembersModalOpen(true);
    }
  };

  const handleToggleStatus = (id: number) => {
    setGroups(groups.map(g => (g.id === id ? { ...g, status: g.status === 'active' ? 'inactive' : 'active' } : g)));
  };

  const handleDelete = (id: number) => {
    if (confirm('그룹을 삭제하시겠습니까?\n그룹 삭제 시 구성원 정보는 유지됩니다.')) {
      setGroups(groups.filter(g => g.id !== id));
      alert('그룹이 삭제되었습니다.');
    }
  };

  const handleSave = (groupData: Partial<RecipientGroup>) => {
    if (groupData.id) {
      // 수정
      setGroups(groups.map(g => (g.id === groupData.id ? { ...g, ...groupData } : g)));
      alert('그룹이 수정되었습니다.');
    } else {
      // 신규 등록
      const newGroup: RecipientGroup = {
        id: Math.max(...groups.map(g => g.id)) + 1,
        name: groupData.name || '',
        type: groupData.type || '',
        description: groupData.description || '',
        memberCount: 0,
        status: groupData.status || 'active',
        usageCount: 0,
        lastUsedAt: '',
        createdBy: '현재사용자',
        createdAt: new Date().toISOString().split('T')[0] ?? '',
      };
      setGroups([...groups, newGroup]);
      alert('그룹이 등록되었습니다.');
    }
    setIsFormModalOpen(false);
    setEditingGroup(null);
  };

  const handleOpenCreateModal = () => {
    setEditingGroup(null);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingGroup(null);
  };

  const handleCloseMembersModal = () => {
    setIsMembersModalOpen(false);
    setManagingGroupId(null);
    setManagingGroupName('');
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedGroup(null);
  };

  const handleEditFromDetail = () => {
    setIsDetailModalOpen(false);
    setEditingGroup(selectedGroup);
    setIsFormModalOpen(true);
  };

  const handleManageMembersFromDetail = () => {
    if (selectedGroup) {
      setIsDetailModalOpen(false);
      setManagingGroupId(selectedGroup.id);
      setManagingGroupName(selectedGroup.name);
      setIsMembersModalOpen(true);
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">수신자 그룹 관리</h1>
            <p className="mt-1 text-sm text-gray-600">알림 발송에 사용할 수신자 그룹을 관리하세요</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <i className="ri-add-line"></i>
            <span>새 그룹 등록</span>
          </button>
        </div>

        {/* 통계 카드 */}
        <RecipientGroupStats
          totalGroups={totalGroups}
          activeGroups={activeGroups}
          totalMembers={totalMembers}
          recentlyUsed={recentlyUsed}
        />

        {/* 필터 */}
        <RecipientGroupFilters
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          searchKeyword={searchKeyword}
          onSearchChange={setSearchKeyword}
        />

        {/* 테이블 */}
        <RecipientGroupTable
          groups={groups}
          onView={handleView}
          onEdit={handleEdit}
          onManageMembers={handleManageMembers}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </div>

      {/* 생성/수정 모달 */}
      <RecipientGroupFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSave}
        group={editingGroup}
      />

      {/* 구성원 관리 모달 */}
      <RecipientGroupMembersModal
        isOpen={isMembersModalOpen}
        onClose={handleCloseMembersModal}
        groupId={managingGroupId}
        groupName={managingGroupName}
      />

      {/* 상세보기 모달 */}
      {isDetailModalOpen && (
        <RecipientGroupDetailModal
          group={selectedGroup}
          onClose={handleCloseDetailModal}
          onEdit={handleEditFromDetail}
          onManageMembers={handleManageMembersFromDetail}
        />
      )}
    </div>
  );
}
