'use client';

import React from 'react';

interface Employee {
  id: string;
  name: string;
  position: string;
  role: string;
}

interface RoleTemplate {
  id: string;
  name: string;
  description: string;
}

interface Props {
  activeTab: 'employee' | 'role';
  setActiveTab: (tab: 'employee' | 'role') => void;
  employees: Employee[];
  roleTemplates: RoleTemplate[];
  selectedEmployee: string | null;
  setSelectedEmployee: (id: string) => void;
  selectedRole: string | null;
  setSelectedRole: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filteredEmployees: Employee[];
  countActivePermissions: (empId: string) => number;
  totalScreens: number;
  copyPermission: () => void;
  pastePermission: () => void;
  copiedPermission: any;
}

/**
 * [Sidebar] 직원 및 역할 선택 사이드바
 * 고밀도 리스트 및 권한 복제 액션 포함
 */
export default function EmployeeBar({
  activeTab,
  setActiveTab,
  employees,
  roleTemplates,
  selectedEmployee,
  setSelectedEmployee,
  selectedRole,
  setSelectedRole,
  searchQuery,
  setSearchQuery,
  filteredEmployees,
  countActivePermissions,
  totalScreens,
  copyPermission,
  pastePermission,
  copiedPermission,
}: Props) {
  return (
    <div className="flex w-80 flex-col border-r border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 1. 시스템 탭 네비게이션 */}
      <div className="border-b border-gray-200 bg-[#f8fafc] p-1">
        <div className="flex gap-1">
          <TabButton
            active={activeTab === 'employee'}
            onClick={() => setActiveTab('employee')}
            icon="ri-user-3-fill"
            label="직원별 관리"
            count={employees.length}
          />
          <TabButton
            active={activeTab === 'role'}
            onClick={() => setActiveTab('role')}
            icon="ri-shield-star-fill"
            label="역할별 템플릿"
            count={roleTemplates.length}
          />
        </div>
      </div>

      {/* 2. 검색 영역 */}
      <div className="border-b border-gray-200 bg-white p-3">
        <div className="group relative">
          <input
            type="text"
            placeholder={activeTab === 'employee' ? '성명 또는 직위 검색...' : '역할 명칭 검색...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-sm border border-gray-300 py-2 pl-9 pr-3 font-bold outline-none transition-all placeholder:text-gray-300 focus:border-[#1a5a96] focus:ring-1 focus:ring-[#1a5a96]"
          />
          <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a5a96]"></i>
        </div>
      </div>

      {/* 3. 메인 리스트 영역 */}
      <div className="flex-1 overflow-y-auto bg-gray-50/30">
        {activeTab === 'employee' ? (
          /* 직원 리스트 */
          <div className="divide-y divide-gray-100">
            {filteredEmployees.map(emp => {
              const isSelected = selectedEmployee === emp.id;
              const activePerms = countActivePermissions(emp.id);

              return (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp.id)}
                  className={`cursor-pointer border-l-4 px-4 py-3 transition-all ${
                    isSelected
                      ? 'border-[#1a5a96] bg-blue-50/50 shadow-[inset_0_0_10px_rgba(26,90,150,0.05)]'
                      : 'group border-transparent hover:bg-white hover:pl-5'
                  } `}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-black tracking-tighter ${isSelected ? 'text-[#1a5a96]' : 'text-gray-700'}`}>
                        {emp.name}
                      </h4>
                      <span className="rounded-[2px] border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-gray-400">
                        {emp.position}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] uppercase text-gray-300">{emp.id}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-[#1a5a96] opacity-50 transition-all"
                          style={{ width: `${(activePerms / totalScreens) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] font-black text-blue-600/70">
                        {activePerms}/{totalScreens}
                      </span>
                    </div>
                    <i
                      className={`ri-arrow-right-s-line transition-transform ${isSelected ? 'translate-x-1 text-[#1a5a96]' : 'text-gray-200'}`}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 역할 템플릿 리스트 */
          <div className="divide-y divide-gray-100">
            {roleTemplates.map(role => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`cursor-pointer border-l-4 px-4 py-4 transition-all ${selectedRole === role.id ? 'border-emerald-500 bg-emerald-50/30' : 'border-transparent hover:bg-white'} `}
              >
                <div className="mb-1 flex items-center gap-2">
                  <i
                    className={`ri-shield-star-line ${selectedRole === role.id ? 'text-emerald-500' : 'text-gray-300'}`}
                  ></i>
                  <h4 className="font-black text-gray-800">{role.name}</h4>
                </div>
                <p className="line-clamp-2 text-[10px] font-medium italic leading-relaxed text-gray-400">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. 하단 권한 복제 도구 (Batch Tool) */}
      <div className="space-y-2 border-t border-gray-200 bg-white p-3">
        <div className="mb-1 flex items-center gap-2 px-1">
          <i className="ri-clipboard-fill text-xs text-[#1a5a96]"></i>
          <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Permission Batch Tool</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton
            onClick={copyPermission}
            disabled={!selectedEmployee}
            icon="ri-file-copy-2-line"
            label="권한 복사"
          />
          <ActionButton
            onClick={pastePermission}
            disabled={!selectedEmployee || !copiedPermission}
            icon="ri-clipboard-line"
            label="권한 적용"
            isPrimary
          />
        </div>
        {copiedPermission && (
          <p className="mt-1 animate-pulse text-center text-[9px] font-bold text-emerald-600">
            <i className="ri-check-double-line mr-1"></i>
            {copiedPermission.employeeName}님의 권한이 클립보드에 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}

/** 내부 서브 컴포넌트: 상단 탭 버튼 */
function TabButton({ active, onClick, icon, label, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 font-black transition-all ${
        active ? 'border border-gray-200 bg-white text-[#1a5a96] shadow-sm' : 'text-gray-400 hover:text-gray-600'
      } `}
    >
      <i className={`${icon} text-sm`}></i>
      <span className="tracking-tighter">{label}</span>
      <span className={`rounded-full px-1 text-[9px] ${active ? 'bg-blue-100' : 'bg-gray-100'}`}>{count}</span>
    </button>
  );
}

/** 내부 서브 컴포넌트: 하단 액션 버튼 */
function ActionButton({ onClick, disabled, icon, label, isPrimary }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-1.5 rounded-sm border py-2 font-black transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100 ${
        isPrimary
          ? 'border-[#1a5a96] bg-[#1a5a96] text-white hover:bg-[#144675]'
          : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
      } `}
    >
      <i className={`${icon} text-sm`}></i>
      <span>{label}</span>
    </button>
  );
}
