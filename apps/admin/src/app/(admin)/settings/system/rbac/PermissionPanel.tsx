'use client';

interface Screen {
  screenId: string;
  screenName: string;
  actions: string[];
}

interface Menu {
  menuId: string;
  menuName: string;
  screens: Screen[];
}

interface Permission {
  categoryId: string;
  categoryName: string;
  menus: Menu[];
}

interface ScreenPermission {
  checked: boolean;
  actions: string[];
}

interface MenuPermission {
  checked: boolean;
  screens: {
    [screenId: string]: ScreenPermission;
  };
}

interface CategoryPermission {
  checked: boolean;
  menus: {
    [menuId: string]: MenuPermission;
  };
}

interface EmployeePermission {
  employeeId: string;
  employeeName: string;
  role: string;
  permissions: {
    [categoryId: string]: CategoryPermission;
  };
}

interface Employee {
  id: string;
  name: string;
  position: string;
  role: string;
}

const actionLabels: { [key: string]: string } = {
  read: '조회',
  write: '등록',
  update: '수정',
  delete: '삭제',
  export: '출력',
  approve: '승인',
};

interface Props {
  selectedEmployee: string | null;
  currentEmployee: Employee | null;

  permissions: { [key: string]: EmployeePermission };

  totalScreens: number;
  countActivePermissions: (empId: string) => number;

  savePermission: (empId: string) => void;
  selectAllPermissions: (empId: string) => void;
  clearAllPermissions: (empId: string) => void;

  expandAll: () => void;
  collapseAll: () => void;

  allPermissions: Permission[];

  expandedCategories: Set<string>;
  expandedMenus: Set<string>;

  toggleCategory: (catId: string) => void;
  toggleMenu: (menuId: string) => void;

  toggleCategoryCheck: (empId: string, catId: string) => void;
  toggleMenuCheck: (empId: string, catId: string, menuId: string) => void;
  toggleScreenCheck: (empId: string, catId: string, menuId: string, screenId: string) => void;
  toggleAction: (empId: string, catId: string, menuId: string, screenId: string, action: string) => void;
}

export default function PermissionPanel({
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
  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {selectedEmployee && permissions[selectedEmployee] ? (
        <>
          {/* Header */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{currentEmployee?.name}님의 권한</h3>
                <p className="mt-1 text-sm text-gray-600">
                  전체 {totalScreens}개 중 {countActivePermissions(selectedEmployee)}개 활성화됨
                </p>
              </div>

              <button
                onClick={() => savePermission(selectedEmployee)}
                className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <i className="ri-save-line"></i>
                권한 저장
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectAllPermissions(selectedEmployee)}
                className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <i className="ri-checkbox-multiple-line"></i>
                전체 선택
              </button>

              <button
                onClick={() => clearAllPermissions(selectedEmployee)}
                className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <i className="ri-close-circle-line"></i>
                전체 해제
              </button>

              <button
                onClick={expandAll}
                className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <i className="ri-arrow-down-s-line"></i>
                모두 펼치기
              </button>

              <button
                onClick={collapseAll}
                className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <i className="ri-arrow-up-s-line"></i>
                모두 접기
              </button>
            </div>
          </div>

          {/* Permission List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {allPermissions.map(category => (
                <div key={category.categoryId} className="rounded-lg border border-gray-200 bg-white">
                  {/* Category Header */}
                  <div className="border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCategory(category.categoryId)}
                        className="text-gray-400 transition-colors hover:text-gray-600"
                      >
                        <i
                          className={`ri-arrow-${expandedCategories.has(category.categoryId) ? 'down' : 'right'}-s-line text-lg`}
                        ></i>
                      </button>

                      <input
                        type="checkbox"
                        checked={permissions[selectedEmployee]?.permissions[category.categoryId]?.checked || false}
                        onChange={() => toggleCategoryCheck(selectedEmployee, category.categoryId)}
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                      />

                      <span className="text-sm font-bold text-gray-900">{category.categoryName}</span>
                    </div>
                  </div>

                  {/* Category Content */}
                  {expandedCategories.has(category.categoryId) && (
                    <div className="space-y-2 p-4">
                      {category.menus.map(menu => (
                        <div key={menu.menuId} className="ml-6">
                          {/* Menu Header */}
                          <div className="mb-2 flex items-center gap-3">
                            <button
                              onClick={() => toggleMenu(menu.menuId)}
                              className="text-gray-400 transition-colors hover:text-gray-600"
                            >
                              <i
                                className={`ri-arrow-${expandedMenus.has(menu.menuId) ? 'down' : 'right'}-s-line text-base`}
                              ></i>
                            </button>

                            <input
                              type="checkbox"
                              checked={
                                permissions[selectedEmployee]?.permissions[category.categoryId]?.menus[menu.menuId]
                                  ?.checked || false
                              }
                              onChange={() => toggleMenuCheck(selectedEmployee, category.categoryId, menu.menuId)}
                              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                            />

                            <span className="text-sm font-semibold text-gray-800">{menu.menuName}</span>
                          </div>

                          {/* Menu Content */}
                          {expandedMenus.has(menu.menuId) && (
                            <div className="ml-6 space-y-2">
                              {menu.screens.map(screen => (
                                <div key={screen.screenId} className="rounded border border-gray-100 bg-gray-50 p-3">
                                  {/* Screen Checkbox */}
                                  <div className="mb-2 flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={
                                        permissions[selectedEmployee]?.permissions[category.categoryId]?.menus[
                                          menu.menuId
                                        ]?.screens[screen.screenId]?.checked || false
                                      }
                                      onChange={() =>
                                        toggleScreenCheck(
                                          selectedEmployee,
                                          category.categoryId,
                                          menu.menuId,
                                          screen.screenId,
                                        )
                                      }
                                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                                    />

                                    <span className="text-sm font-medium text-gray-700">{screen.screenName}</span>
                                  </div>

                                  {/* Actions */}
                                  <div className="ml-7 flex flex-wrap gap-2">
                                    {screen.actions.map(action => (
                                      <label
                                        key={action}
                                        className={`cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                                          permissions[selectedEmployee]?.permissions[category.categoryId]?.menus[
                                            menu.menuId
                                          ]?.screens[screen.screenId]?.actions.includes(action)
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={
                                            permissions[selectedEmployee]?.permissions[category.categoryId]?.menus[
                                              menu.menuId
                                            ]?.screens[screen.screenId]?.actions.includes(action) || false
                                          }
                                          onChange={() =>
                                            toggleAction(
                                              selectedEmployee,
                                              category.categoryId,
                                              menu.menuId,
                                              screen.screenId,
                                              action,
                                            )
                                          }
                                          className="hidden"
                                        />
                                        {actionLabels[action] ?? action}
                                      </label>
                                    ))}
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
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <i className="ri-shield-user-line mb-4 text-6xl text-gray-300"></i>
            <p className="text-sm text-gray-500">좌측에서 직원을 선택하세요</p>
          </div>
        </div>
      )}
    </div>
  );
}
