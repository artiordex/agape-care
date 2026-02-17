/**
 * Description : page.tsx - 템플릿 관리 (Agape Care ERP Theme)
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useState } from 'react';
import TemplateDetailModal from './TemplateDetailModal';
import TemplateFilters from './TemplateFilters';
import TemplateFormModal from './TemplateFormModal';
import TemplateHeader from './TemplateHeader';
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
      content: '안녕하세요, #{시설명}입니다. #{수급자명} 어르신의 청구 금액은...',
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
      content: '[건강검진 일정 안내] #{수급자명} 어르신 건강검진 일정을 안내...',
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
      content: '[긴급 안내] #{보호자명}님, 긴급한 사항이 발생하여 연락드립니다.',
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
      content: '[설날 행사 안내] #{수급자명} 어르신 가족분들께 인사드립니다.',
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
      setTemplates(
        templates.map(t =>
          t.id === templateData.id
            ? { ...t, ...templateData, updatedAt: new Date().toISOString().split('T')[0] ?? '' }
            : t,
        ),
      );
    } else {
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
    }
    setIsFormModalOpen(false);
    setEditingTemplate(null);
  };

  return (
    <div className="flex h-screen flex-col gap-4 overflow-hidden bg-[#f0f2f5] p-4 font-sans text-gray-800 antialiased">
      {/* 1. 커스텀 헤더 (Accounting 스타일) */}
      <TemplateHeader
        onOpenCreate={() => setIsFormModalOpen(true)}
        onExcelDownload={() => alert('데이터 출력 준비 중')}
      />

      {/* 2. 통계 카드 */}
      <TemplateStats
        totalTemplates={totalTemplates}
        activeTemplates={activeTemplates}
        smsTemplates={smsTemplates}
        kakaoTemplates={kakaoTemplates}
      />

      {/* 3. 필터 바 */}
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

      {/* 4. 리스트 테이블 */}
      <TemplateTable
        templates={templates}
        onView={handleView}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />

      {/* 모달 시스템 */}
      <TemplateFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSave}
        template={editingTemplate}
      />

      {isDetailModalOpen && (
        <TemplateDetailModal
          template={selectedTemplate}
          onClose={() => setIsDetailModalOpen(false)}
          onEdit={() => {
            setIsDetailModalOpen(false);
            setEditingTemplate(selectedTemplate);
            setIsFormModalOpen(true);
          }}
        />
      )}
    </div>
  );
}
