'use client';

import { useState, useEffect } from 'react';
import StaffHeader from './StaffHeader';
import StaffListPanel from './StaffListPanel';
import StaffBasicInfo from './StaffBasicInfo';
import StaffTabs from './StaffTabs';

interface Staff {
  id: string;
  name: string;
  status: string;
  position: string;
  gender: string;
  hireDate: string;
}

export default function StaffManagementPage() {
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadStaffList();
  }, []);

  useEffect(() => {
    if (selectedStaffId) {
      loadStaffDetail(selectedStaffId);
    }
  }, [selectedStaffId]);

  const loadStaffList = () => {
    const mockData: Staff[] = [
      { id: '1', name: 'DPDL5', status: '재직', position: '사회복지사', gender: '여', hireDate: '2025.12.01' },
      { id: '2', name: '트으느르', status: '재직', position: '사회복지사', gender: '여', hireDate: '2025.07.01' },
      { id: '3', name: '스드느스', status: '재직', position: '물리치료사', gender: '여', hireDate: '2026.01.28' },
      { id: '4', name: '권혜경', status: '재직', position: '사회복지사', gender: '여', hireDate: '2026.02.11' },
      { id: '5', name: '뜨스곰', status: '재직', position: '오양브로자', gender: '여', hireDate: '2026.01.07' }
    ];
    setStaffList(mockData);
    const firstStaff = mockData[0];
    if (firstStaff) {
      setSelectedStaffId(firstStaff.id);
    }
  };

  const loadStaffDetail = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (staff) {
      setSelectedStaff({
        ...staff,
        birth: '1994.01.05',
        age: 30,
        education: '직업능력개발',
        program: '오양브로자',
        programType: '현장',
        phone: '010-1234-4567',
        email: '이메일',
        address: '',
        note: '',
        photo: null,
      });
    }
  };

  const handleNewStaff = () => {
    alert('신규 직원 등록 모달을 엽니다.');
    // TODO: 신규 직원 등록 모달 구현
  };

  const handleSave = () => {
    if (!selectedStaff) {
      alert('저장할 직원 정보가 없습니다.');
      return;
    }

    setIsSaving(true);

    // API 저장 시뮬레이션
    setTimeout(() => {
      alert(`${selectedStaff.name} 직원의 정보가 저장되었습니다.`);
      setIsSaving(false);
    }, 1000);
  };

  const handleExport = () => {
    alert('직원 목록을 Excel 파일로 내보냅니다.');
    // TODO: Excel 내보내기 구현
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* 상단 헤더 */}
      <StaffHeader
        selectedStaffName={selectedStaff?.name || null}
        totalStaffCount={staffList.length}
        isSaving={isSaving}
        onNewStaff={handleNewStaff}
        onSave={handleSave}
        onExport={handleExport}
      />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 직원 목록 */}
        <div className="w-[450px] border-r border-gray-300 bg-white">
          <StaffListPanel
            staffList={staffList}
            selectedStaffId={selectedStaffId}
            onStaffSelect={setSelectedStaffId}
            onNewStaff={handleNewStaff}
          />
        </div>

        {/* 우측: 직원 상세 정보 */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* 상단: 기본 정보 */}
          <div className="border-b border-gray-300 bg-white p-4">
            <StaffBasicInfo staff={selectedStaff} />
          </div>

          {/* 중단: 탭 컨텐츠 */}
          <div className="flex-1 overflow-y-auto">
            <StaffTabs activeTab={activeTab} onTabChange={setActiveTab} staff={selectedStaff} />
          </div>
        </div>
      </div>
    </div>
  );
}
