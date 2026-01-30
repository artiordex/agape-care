'use client';

import { useState } from 'react';
import TemplateDetailModal from './TemplateDetailModal';
import TemplateFilters from './TemplateFilters';
import TemplateFormModal from './TemplateFormModal';
import TemplateStats from './TemplateStats';
import TemplateTable, { type Template } from './TemplateTable';

export default function TemplatePage() {
  // 필터 상태
  const [categoryFilter, setCategoryFilter] = useState('');
  const [channelFilter, setChannelFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 모달 상태
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  // 샘플 데이터
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: '월간 청구 안내',
      category: 'billing',
      channel: 'sms',
      content:
        '안녕하세요, #{시설명}입니다.\n\n#{수급자명} 어르신의 #{청구월} 청구 금액은 #{금액}원입니다.\n\n입금 기한: #{날짜}\n계좌번호: 000-0000-0000\n\n문의사항은 언제든지 연락주세요.\n감사합니다.',
      status: 'active',
      usageCount: 156,
      createdBy: '김관리',
      createdAt: '2026-01-15',
      updatedAt: '2026-01-25',
    },
    {
      id: 2,
      name: '건강검진 일정 안내',
      category: 'schedule',
      channel: 'band',
      content:
        '[건강검진 일정 안내]\n\n#{수급자명} 어르신 건강검진 일정을 안내드립니다.\n\n일시: #{날짜} #{시간}\n장소: 2층 건강검진실\n준비사항: 공복 상태 유지\n\n#{시설명}',
      status: 'active',
      usageCount: 89,
      createdBy: '이간호사',
      createdAt: '2026-01-10',
      updatedAt: '2026-01-20',
    },
    {
      id: 3,
      name: '긴급 공지',
      category: 'urgent',
      channel: 'kakao',
      content:
        '[긴급 안내]\n\n#{보호자명}님, 긴급한 사항이 발생하여 연락드립니다.\n\n#{수급자명} 어르신 관련하여 즉시 연락주시기 바랍니다.\n\n#{시설명}\n연락처: 000-0000-0000',
      status: 'active',
      usageCount: 23,
      createdBy: '박직원',
      createdAt: '2026-01-05',
      updatedAt: '2026-01-18',
    },
    {
      id: 4,
      name: '설날 행사 안내',
      category: 'event',
      channel: 'band',
      content:
        '[설날 행사 안내]\n\n#{수급자명} 어르신 가족분들께 인사드립니다.\n\n설날을 맞아 #{날짜} #{시간}에 작은 행사를 준비했습니다.\n참석 가능 여부를 회신 부탁드립니다.\n\n#{시설명}',
      status: 'active',
      usageCount: 45,
      createdBy: '최관리자',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-15',
    },
    {
      id: 5,
      name: '구 청구 안내 (미사용)',
      category: 'billing',
      channel: 'sms',
      content: '이전 청구 안내 템플릿입니다. (사용 중지됨)',
      status: 'inactive',
      usageCount: 234,
      createdBy: '김관리',
      createdAt: '2025-06-01',
      updatedAt: '2025-12-31',
    },
    {
      id: 6,
      name: '건강 정보 - 겨울철 주의사항',
      category: 'health',
      channel: 'kakao',
      content:
        '[겨울철 건강 관리]\n\n#{수급자명} 어르신 가족분들께,\n\n겨울철 건강 관리 요령을 안내드립니다.\n\n1. 실내 적정 온도 유지\n2. 충분한 수분 섭취\n3. 규칙적인 운동\n\n#{시설명}',
      status: 'active',
      usageCount: 67,
      createdBy: '이간호사',
      createdAt: '2025-12-15',
      updatedAt: '2026-01-10',
    },
    {
      id: 7,
      name: '외출/외박 승인 안내',
      category: 'notice',
      channel: 'sms',
      content:
        '안녕하세요, #{시설명}입니다.\n\n#{수급자명} 어르신의 #{날짜} 외출/외박이 승인되었습니다.\n\n귀가 예정: #{시간}\n\n안전한 외출 되시기 바랍니다.',
      status: 'active',
      usageCount: 112,
      createdBy: '박직원',
      createdAt: '2025-11-20',
      updatedAt: '2026-01-05',
    },
  ]);

  // 통계 계산
  const totalTemplates = templates.length;
  const activeTemplates = templates.filter(t => t.status === 'active').length;
  const smsTemplates = templates.filter(t => t.channel === 'sms').length;
  const kakaoTemplates = templates.filter(t => t.channel === 'kakao').length;

  // 핸들러
  const handleView = (id: number) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      setSelectedTemplate(template);
      setIsDetailModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      setEditingTemplate(template);
      setIsFormModalOpen(true);
    }
  };

  const handleCopy = (id: number) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      const copiedTemplate: Template = {
        ...template,
        id: Math.max(...templates.map(t => t.id)) + 1,
        name: `${template.name} (복사)`,
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0] ?? '',
        updatedAt: new Date().toISOString().split('T')[0] ?? '',
      };
      setTemplates([...templates, copiedTemplate]);
      alert('템플릿이 복사되었습니다.');
    }
  };

  const handleToggleStatus = (id: number) => {
    setTemplates(
      templates.map(t => (t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t)),
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('템플릿을 삭제하시겠습니까?')) {
      setTemplates(templates.filter(t => t.id !== id));
      alert('템플릿이 삭제되었습니다.');
    }
  };

  const handleSave = (templateData: Partial<Template>) => {
    if (templateData.id) {
      // 수정
      setTemplates(
        templates.map(t =>
          t.id === templateData.id
            ? {
                ...t,
                ...templateData,
                updatedAt: new Date().toISOString().split('T')[0] ?? '',
              }
            : t,
        ),
      );
      alert('템플릿이 수정되었습니다.');
    } else {
      // 신규 등록
      const newTemplate: Template = {
        id: Math.max(...templates.map(t => t.id)) + 1,
        name: templateData.name || '',
        category: templateData.category || '',
        channel: templateData.channel || '',
        content: templateData.content || '',
        status: templateData.status || 'active',
        usageCount: 0,
        createdBy: '현재사용자',
        createdAt: new Date().toISOString().split('T')[0] ?? '',
        updatedAt: new Date().toISOString().split('T')[0] ?? '',
      };
      setTemplates([...templates, newTemplate]);
      alert('템플릿이 등록되었습니다.');
    }
    setIsFormModalOpen(false);
    setEditingTemplate(null);
  };

  const handleOpenCreateModal = () => {
    setEditingTemplate(null);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingTemplate(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleEditFromDetail = () => {
    setIsDetailModalOpen(false);
    setEditingTemplate(selectedTemplate);
    setIsFormModalOpen(true);
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">템플릿 관리</h1>
            <p className="mt-1 text-sm text-gray-600">알림 발송에 사용할 템플릿을 관리하세요</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <i className="ri-add-line"></i>
            <span>새 템플릿 등록</span>
          </button>
        </div>

        {/* 통계 카드 */}
        <TemplateStats
          totalTemplates={totalTemplates}
          activeTemplates={activeTemplates}
          smsTemplates={smsTemplates}
          kakaoTemplates={kakaoTemplates}
        />

        {/* 필터 */}
        <TemplateFilters
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          channelFilter={channelFilter}
          onChannelChange={setChannelFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          searchKeyword={searchKeyword}
          onSearchChange={setSearchKeyword}
        />

        {/* 테이블 */}
        <TemplateTable
          templates={templates}
          onView={handleView}
          onEdit={handleEdit}
          onCopy={handleCopy}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </div>

      {/* 생성/수정 모달 */}
      <TemplateFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSave}
        template={editingTemplate}
      />

      {/* 상세보기 모달 */}
      {isDetailModalOpen && (
        <TemplateDetailModal
          template={selectedTemplate}
          onClose={handleCloseDetailModal}
          onEdit={handleEditFromDetail}
        />
      )}
    </div>
  );
}
