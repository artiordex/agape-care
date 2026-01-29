'use client';

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
    <div className="flex w-80 flex-col border-r border-gray-200 bg-white">
      {/* 탭 */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex">
          <button
            onClick={() => setActiveTab('employee')}
            className={`flex-1 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'employee'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-user-line mr-2" />
            직원 ({employees.length})
          </button>

          <button
            onClick={() => setActiveTab('role')}
            className={`flex-1 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'role'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-shield-user-line mr-2" />
            역할 ({roleTemplates.length})
          </button>
        </div>
      </div>

      {/* 직원 탭 */}
      {activeTab === 'employee' && (
        <>
          {/* 검색 */}
          <div className="border-b border-gray-100 p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="직원 검색..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
            </div>
          </div>

          {/* 직원 목록 */}
          <div className="flex-1 overflow-y-auto">
            {filteredEmployees.map(emp => (
              <div
                key={emp.id}
                onClick={() => setSelectedEmployee(emp.id)}
                className={`border-b border-gray-100 px-4 py-3 transition-colors ${
                  selectedEmployee === emp.id
                    ? 'border-l-2 border-l-blue-600 bg-blue-50'
                    : 'cursor-pointer hover:bg-gray-50'
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-900">{emp.name}</h4>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {emp.position}
                  </span>
                </div>

                <p className="mb-1 text-xs text-gray-500">{emp.id}</p>

                <p className="text-xs text-blue-600">
                  권한: {countActivePermissions(emp.id)} / {totalScreens}
                </p>
              </div>
            ))}
          </div>

          {/* 복사 / 붙여넣기 */}
          <div className="space-y-2 border-t border-gray-200 p-3">
            <button
              onClick={copyPermission}
              disabled={!selectedEmployee}
              className="flex w-full items-center justify-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <i className="ri-file-copy-line text-base" />
              권한 복사
            </button>

            <button
              onClick={pastePermission}
              disabled={!selectedEmployee || !copiedPermission}
              className="flex w-full items-center justify-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <i className="ri-clipboard-line text-base" />
              권한 붙여넣기
            </button>
          </div>
        </>
      )}

      {/* 역할 탭 */}
      {activeTab === 'role' && (
        <div className="flex-1 overflow-y-auto">
          {roleTemplates.map(role => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`border-b border-gray-100 px-4 py-3 transition-colors ${
                selectedRole === role.id ? 'border-l-2 border-l-blue-600 bg-blue-50' : 'cursor-pointer hover:bg-gray-50'
              }`}
            >
              <h4 className="mb-1 text-sm font-semibold text-gray-900">{role.name}</h4>
              <p className="text-xs text-gray-500">{role.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
