'use client';

import { useState } from 'react';
import ResidentList from './ResidentList';
import ResidentProfile from './ResidentProfile';
import ResidentTabs from './ResidentTabs';

export default function ResidentManagement() {
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="flex h-full bg-gray-50">
      {/* 좌측 목록 */}
      <ResidentList selectedResident={selectedResident} onSelect={setSelectedResident} />

      {/* 우측 상세 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedResident ? (
          <>
            <ResidentProfile resident={selectedResident} onEdit={() => setShowEditModal(true)} />

            <ResidentTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">입소자를 선택하세요</div>
        )}
      </div>
    </div>
  );
}
