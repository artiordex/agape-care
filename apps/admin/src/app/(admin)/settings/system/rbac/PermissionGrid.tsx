'use client';

import React from 'react';

// 액션별 한글 레이블 및 보안 등급 색상
const actionLabels: { [key: string]: { label: string; color: string } } = {
  read: { label: '조회', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  write: { label: '등록', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  update: { label: '수정', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  delete: { label: '삭제', color: 'bg-red-50 text-red-600 border-red-200' },
  export: { label: '출력', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  approve: { label: '승인', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
};

interface Props {
  selectedEmployee: string | null;
  currentEmployee: any;
  permissions: any;
  totalScreens: number;
  countActivePermissions: (empId: string) => number;
  savePermission: (empId: string) => void;
  selectAllPermissions: (empId: string) => void;
  clearAllPermissions: (empId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  allPermissions: any[];
  expandedCategories: Set<string>;
  expandedMenus: Set<string>;
  toggleCategory: (catId: string) => void;
  toggleMenu: (menuId: string) => void;
  toggleCategoryCheck: (empId: string, catId: string) => void;
  toggleMenuCheck: (empId: string, catId: string, menuId: string) => void;
  toggleScreenCheck: (empId: string, catId: string, menuId: string, screenId: string) => void;
  toggleAction: (empId: string, catId: string, menuId: string, screenId: string, action: string) => void;
}

export default function PermissionGrid({
  selectedEmployee,
  currentEmployee,
  permissions,
  totalScreens,
  countActivePermissions,
  savePermission,
  selectAllPermissions,
  clearAllPermissions,
  expandAll,
  collapseAll,
  allPermissions,
  expandedCategories,
  expandedMenus,
  toggleCategory,
  toggleMenu,
  toggleCategoryCheck,
  toggleMenuCheck,
  toggleScreenCheck,
  toggleAction,
}: Props) {
  if (!selectedEmployee || !permissions[selectedEmployee]) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 text-gray-400">
        <i className="ri-shield-keyhole-line mb-4 text-6xl opacity-20"></i>
        <p className="text-[13px] font-black uppercase tracking-widest">Select an employee to manage security levels</p>
      </div>
    );
  }

  const activeCount = countActivePermissions(selectedEmployee);
  const securityScore = Math.round((activeCount / totalScreens) * 100);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#f0f2f5] text-[11px]">
      {/* 1. 하이엔드 보안 헤더 */}
      <div className="border-b border-gray-300 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
              <i className="ri-shield-user-fill text-2xl text-[#1a5a96]"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-gray-900">{currentEmployee?.name} 님의 보안 명세서</h3>
                <span className="rounded bg-[#1a5a96] px-1.5 py-0.5 text-[9px] font-black uppercase text-white">
                  Level {securityScore > 50 ? 'High' : 'Normal'}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                Access Status: {activeCount} of {totalScreens} Screens Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* 보안 등급 게이지 */}
            <div className="hidden text-right sm:block">
              <p className="mb-1 text-[9px] font-black uppercase text-gray-400">Security Score</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-[#1a5a96] transition-all duration-500"
                    style={{ width: `${securityScore}%` }}
                  ></div>
                </div>
                <span className="font-mono font-black text-[#1a5a96]">{securityScore}%</span>
              </div>
            </div>
            <button
              onClick={() => savePermission(selectedEmployee)}
              className="flex items-center gap-2 bg-[#1a5a96] px-6 py-2.5 font-black text-white shadow-md transition-all hover:bg-[#144675] active:scale-95"
            >
              <i className="ri-save-3-line"></i> 변경사항 보안 저장
            </button>
          </div>
        </div>

        {/* 전역 컨트롤바 */}
        <div className="flex gap-1.5 border-t border-gray-100 pt-2">
          <ControlButton
            onClick={() => selectAllPermissions(selectedEmployee)}
            icon="ri-checkbox-multiple-line"
            label="전체 권한 부여"
            color="text-blue-600"
          />
          <ControlButton
            onClick={() => clearAllPermissions(selectedEmployee)}
            icon="ri-close-circle-line"
            label="전체 권한 회수"
            color="text-red-500"
          />
          <div className="mx-2 h-4 w-[1px] self-center bg-gray-200"></div>
          <ControlButton onClick={expandAll} icon="ri-expand-vertical-line" label="항목 모두 펼치기" />
          <ControlButton onClick={collapseAll} icon="ri-collapse-vertical-line" label="항목 모두 접기" />
        </div>
      </div>

      {/* 2. 계층형 권한 그리드 (스크롤 영역) */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {allPermissions.map(category => (
          <div key={category.categoryId} className="overflow-hidden border border-gray-300 bg-white shadow-sm">
            {/* 카테고리 로우 */}
            <div className={`group flex items-center border-b border-gray-200 bg-[#f8fafc] px-4 py-2.5`}>
              <button
                onClick={() => toggleCategory(category.categoryId)}
                className="mr-3 text-gray-400 hover:text-[#1a5a96]"
              >
                <i
                  className={`ri-arrow-${expandedCategories.has(category.categoryId) ? 'down' : 'right'}-s-line text-lg`}
                ></i>
              </button>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={permissions[selectedEmployee]?.permissions[category.categoryId]?.checked || false}
                  onChange={() => toggleCategoryCheck(selectedEmployee, category.categoryId)}
                  className="h-4 w-4 rounded border-gray-300 text-[#1a5a96] focus:ring-[#1a5a96]"
                />
                <span className="text-[12px] font-black uppercase tracking-tight text-gray-800">
                  {category.categoryName}
                </span>
              </label>
              <span className="ml-auto text-[9px] font-bold uppercase italic text-gray-400">
                System Category Module
              </span>
            </div>

            {/* 메뉴 및 화면 그리드 */}
            {expandedCategories.has(category.categoryId) && (
              <div className="divide-y divide-gray-100">
                {category.menus.map(menu => (
                  <div key={menu.menuId} className="bg-white">
                    {/* 메뉴 헤더 */}
                    <div className="flex items-center border-b border-gray-100 bg-gray-50/50 px-10 py-2">
                      <button onClick={() => toggleMenu(menu.menuId)} className="mr-3 text-gray-300">
                        <i className={`ri-arrow-${expandedMenus.has(menu.menuId) ? 'down' : 'right'}-s-fill`}></i>
                      </button>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            permissions[selectedEmployee]?.permissions[category.categoryId]?.menus[menu.menuId]
                              ?.checked || false
                          }
                          onChange={() => toggleMenuCheck(selectedEmployee, category.categoryId, menu.menuId)}
                          className="h-3.5 w-3.5 rounded border-gray-300 text-[#1a5a96]"
                        />
                        <span className="font-bold text-gray-700">{menu.menuName}</span>
                      </label>
                    </div>

                    {/* 화면별 액션 그리드 */}
                    {expandedMenus.has(menu.menuId) && (
                      <div className="divide-y divide-gray-50">
                        {menu.screens.map(screen => (
                          <div
                            key={screen.screenId}
                            className="flex items-center px-16 py-3 transition-colors hover:bg-blue-50/20"
                          >
                            <div className="flex w-48 shrink-0 items-center gap-3">
                              <input
                                type="checkbox"
                                checked={
                                  permissions[selectedEmployee]?.permissions[category.categoryId]?.menus[menu.menuId]
                                    ?.screens[screen.screenId]?.checked || false
                                }
                                onChange={() =>
                                  toggleScreenCheck(selectedEmployee, category.categoryId, menu.menuId, screen.screenId)
                                }
                                className="h-3.5 w-3.5 rounded border-gray-300 text-[#1a5a96]"
                              />
                              <span className="font-bold text-gray-600">{screen.screenName}</span>
                            </div>

                            {/* 액션 태그 그룹 */}
                            <div className="ml-4 flex flex-wrap gap-1.5">
                              {screen.actions.map(action => {
                                const isActive =
                                  permissions[selectedEmployee]?.permissions[category.categoryId]?.menus[
                                    menu.menuId
                                  ]?.screens[screen.screenId]?.actions.includes(action);
                                const labelInfo = actionLabels[action] || {
                                  label: action,
                                  color: 'bg-gray-50 text-gray-500',
                                };

                                return (
                                  <button
                                    key={action}
                                    onClick={() =>
                                      toggleAction(
                                        selectedEmployee,
                                        category.categoryId,
                                        menu.menuId,
                                        screen.screenId,
                                        action,
                                      )
                                    }
                                    className={`rounded-[4px] border px-2.5 py-1 text-[9px] font-black transition-all ${isActive ? `${labelInfo.color} scale-105 shadow-sm` : 'border-gray-200 bg-white text-gray-300 hover:border-gray-300'} `}
                                  >
                                    {isActive && <i className="ri-check-line mr-1"></i>}
                                    {labelInfo.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 내부 서브 컴포넌트: 컨트롤 버튼 */
function ControlButton({ onClick, icon, label, color = 'text-gray-500' }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-bold transition-colors hover:bg-gray-100 ${color}`}
    >
      <i className={`${icon} text-sm`}></i>
      <span>{label}</span>
    </button>
  );
}
