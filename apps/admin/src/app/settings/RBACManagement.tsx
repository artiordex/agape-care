
import { useState, useEffect } from 'react';

interface Permission {
  categoryId: string;
  categoryName: string;
  menus: {
    menuId: string;
    menuName: string;
    screens: {
      screenId: string;
      screenName: string;
      actions: string[];
    }[];
  }[];
}

interface EmployeePermission {
  employeeId: string;
  employeeName: string;
  role: string;
  permissions: {
    [categoryId: string]: {
      checked: boolean;
      menus: {
        [menuId: string]: {
          checked: boolean;
          screens: {
            [screenId: string]: {
              checked: boolean;
              actions: string[];
            };
          };
        };
      };
    };
  };
}

const allActions = ['read', 'write', 'update', 'delete', 'export', 'approve'];

const actionLabels: { [key: string]: string } = {
  read: '조회',
  write: '등록',
  update: '수정',
  delete: '삭제',
  export: '출력',
  approve: '승인'
};

const allPermissions: Permission[] = [
  {
    categoryId: 'cat_resident',
    categoryName: '입소자 관리',
    menus: [
      {
        menuId: 'resident_info',
        menuName: '입소자 정보관리',
        screens: [
          { screenId: 'basic_info', screenName: '기본정보', actions: allActions },
          { screenId: 'care_grade', screenName: '장기요양등급정보', actions: ['read', 'write', 'update', 'export'] },
          { screenId: 'admission_history', screenName: '입소변경이력', actions: ['read', 'export'] }
        ]
      },
      {
        menuId: 'health_status',
        menuName: '건강상태 관리',
        screens: [
          { screenId: 'vital_signs', screenName: '바이탈 체크', actions: ['read', 'write', 'update'] },
          { screenId: 'medical_history', screenName: '병력 관리', actions: allActions }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_care',
    categoryName: '케어 업무',
    menus: [
      {
        menuId: 'care_record',
        menuName: '케어 기록',
        screens: [
          { screenId: 'daily_care', screenName: '일일케어 기록', actions: ['read', 'write', 'update', 'export'] },
          { screenId: 'special_care', screenName: '특이사항 기록', actions: ['read', 'write', 'update'] }
        ]
      },
      {
        menuId: 'medication',
        menuName: '투약 관리',
        screens: [
          { screenId: 'medication_record', screenName: '투약 기록', actions: ['read', 'write', 'update', 'export'] },
          { screenId: 'medication_schedule', screenName: '투약 일정', actions: ['read', 'write', 'update'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_nursing',
    categoryName: '간호 업무',
    menus: [
      {
        menuId: 'nursing_record',
        menuName: '간호 기록',
        screens: [
          { screenId: 'nursing_daily', screenName: '일일 간호기록', actions: ['read', 'write', 'update', 'export'] },
          { screenId: 'wound_care', screenName: '상처 관리', actions: ['read', 'write', 'update'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_program',
    categoryName: '프로그램 관리',
    menus: [
      {
        menuId: 'program_schedule',
        menuName: '프로그램 일정',
        screens: [
          { screenId: 'program_plan', screenName: '프로그램 계획', actions: ['read', 'write', 'update', 'delete', 'export'] },
          { screenId: 'program_record', screenName: '프로그램 기록', actions: ['read', 'write', 'export'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_staff',
    categoryName: '직원 관리',
    menus: [
      {
        menuId: 'staff_info',
        menuName: '직원 정보',
        screens: [
          { screenId: 'staff_list', screenName: '직원 목록', actions: allActions },
          { screenId: 'staff_education', screenName: '교육 이력', actions: ['read', 'write', 'update', 'export'] }
        ]
      },
      {
        menuId: 'work_schedule',
        menuName: '근무표 관리',
        screens: [
          { screenId: 'schedule_plan', screenName: '근무표 작성', actions: ['read', 'write', 'update', 'export'] },
          { screenId: 'attendance', screenName: '출퇴근 관리', actions: ['read', 'export'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_accounting',
    categoryName: '회계 관리',
    menus: [
      {
        menuId: 'accounting',
        menuName: '회계 관리',
        screens: [
          { screenId: 'income', screenName: '수입 관리', actions: allActions },
          { screenId: 'expense', screenName: '지출 관리', actions: allActions },
          { screenId: 'financial_report', screenName: '재무 보고서', actions: ['read', 'export', 'approve'] }
        ]
      },
      {
        menuId: 'payroll',
        menuName: '급여 관리',
        screens: [
          { screenId: 'payroll_calc', screenName: '급여 계산', actions: ['read', 'write', 'update', 'export'] },
          { screenId: 'payroll_payment', screenName: '급여 지급', actions: ['read', 'approve', 'export'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_insurance',
    categoryName: '보험 청구',
    menus: [
      {
        menuId: 'insurance_claim',
        menuName: '장기요양 청구',
        screens: [
          { screenId: 'claim_create', screenName: '청구서 작성', actions: ['read', 'write', 'update', 'delete'] },
          { screenId: 'claim_submit', screenName: '청구서 제출', actions: ['read', 'approve', 'export'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_meal',
    categoryName: '식단 관리',
    menus: [
      {
        menuId: 'meal_plan',
        menuName: '식단표 관리',
        screens: [
          { screenId: 'meal_create', screenName: '식단표 작성', actions: ['read', 'write', 'update', 'delete'] },
          { screenId: 'meal_view', screenName: '식단표 조회', actions: ['read', 'export'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_inventory',
    categoryName: '재고 관리',
    menus: [
      {
        menuId: 'inventory',
        menuName: '재고 관리',
        screens: [
          { screenId: 'inventory_list', screenName: '재고 현황', actions: ['read', 'write', 'update', 'export'] },
          { screenId: 'order_mgmt', screenName: '발주 관리', actions: ['read', 'write', 'update', 'approve'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_board',
    categoryName: '게시판 관리',
    menus: [
      {
        menuId: 'notice',
        menuName: '공지사항',
        screens: [
          { screenId: 'notice_list', screenName: '공지사항 관리', actions: allActions }
        ]
      },
      {
        menuId: 'freeboard',
        menuName: '자유게시판',
        screens: [
          { screenId: 'freeboard_list', screenName: '자유게시판 관리', actions: allActions }
        ]
      },
      {
        menuId: 'gallery',
        menuName: '갤러리',
        screens: [
          { screenId: 'gallery_list', screenName: '갤러리 관리', actions: allActions }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_family',
    categoryName: '가족 소통',
    menus: [
      {
        menuId: 'family_comm',
        menuName: '가족 소통',
        screens: [
          { screenId: 'family_notice', screenName: '가족 알림', actions: ['read', 'write', 'update', 'delete'] },
          { screenId: 'family_inquiry', screenName: '문의 관리', actions: ['read', 'write', 'export'] }
        ]
      }
    ]
  },
  {
    categoryId: 'cat_system',
    categoryName: '시스템 관리',
    menus: [
      {
        menuId: 'rbac',
        menuName: '권한 관리',
        screens: [
          { screenId: 'rbac_employee', screenName: '직원 권한 설정', actions: ['read', 'write', 'update'] },
          { screenId: 'rbac_role', screenName: '역할 템플릿 관리', actions: ['read', 'write', 'update', 'delete'] }
        ]
      },
      {
        menuId: 'system_settings',
        menuName: '시스템 설정',
        screens: [
          { screenId: 'general_settings', screenName: '기본 설정', actions: ['read', 'write', 'update'] },
          { screenId: 'code_mgmt', screenName: '코드 관리', actions: allActions }
        ]
      }
    ]
  }
];

const employees = [
  { id: 'emp001', name: '김영희', position: '시설장', role: 'director' },
  { id: 'emp002', name: '이수진', position: '요양보호사', role: 'care-worker' },
  { id: 'emp003', name: '박철수', position: '조리원', role: 'cook' },
  { id: 'emp004', name: '최은영', position: '회계담당', role: 'accountant' },
  { id: 'emp005', name: '정미경', position: '간호조무사', role: 'nurse' },
  { id: 'emp006', name: '강민수', position: '사회복지사', role: 'social-worker' },
  { id: 'emp007', name: '윤지혜', position: '사무원', role: 'office-staff' },
  { id: 'emp008', name: '홍길동', position: '일반직원', role: 'general-staff' }
];

const roleTemplates = [
  { id: 'director', name: '시설장', description: '거의 모든 권한' },
  { id: 'social-worker', name: '사회복지사', description: '입소자 관리, 케어 기록, 프로그램 관리' },
  { id: 'nurse', name: '간호조무사', description: '간호 업무, 투약 관리' },
  { id: 'care-worker', name: '요양보호사', description: '케어 기록 작성' },
  { id: 'cook', name: '조리원', description: '식단 관리' },
  { id: 'office-staff', name: '사무원', description: '게시판, 문서 관리' },
  { id: 'accountant', name: '회계담당', description: '회계, 급여, 청구 관리' },
  { id: 'general-staff', name: '일반 직원', description: '최소 권한' }
];

export default function RBACManagement() {
  const [activeTab, setActiveTab] = useState<'employee' | 'role'>('employee');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [permissions, setPermissions] = useState<{ [key: string]: EmployeePermission }>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [copiedPermission, setCopiedPermission] = useState<EmployeePermission | null>(null);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = () => {
    const loaded: { [key: string]: EmployeePermission } = {};
    employees.forEach(emp => {
      const stored = localStorage.getItem(`rbac_permissions_${emp.id}`);
      if (stored) {
        loaded[emp.id] = JSON.parse(stored);
      } else {
        loaded[emp.id] = initializeEmployeePermission(emp.id, emp.name, emp.role);
      }
    });
    setPermissions(loaded);
  };

  const initializeEmployeePermission = (empId: string, empName: string, role: string): EmployeePermission => {
    const emp: EmployeePermission = {
      employeeId: empId,
      employeeName: empName,
      role: role,
      permissions: {} // ← fixed: provide an empty object instead of leaving it incomplete
    };

    allPermissions.forEach(cat => {
      emp.permissions[cat.categoryId] = {
        checked: false,
        menus: {}
      };
      cat.menus.forEach(menu => {
        emp.permissions[cat.categoryId].menus[menu.menuId] = {
          checked: false,
          screens: {}
        };
        menu.screens.forEach(screen => {
          emp.permissions[cat.categoryId].menus[menu.menuId].screens[screen.screenId] = {
            checked: false,
            actions: []
          };
        });
      });
    });

    return emp;
  };

  const savePermission = (empId: string) => {
    const perm = permissions[empId];
    if (perm) {
      localStorage.setItem(`rbac_permissions_${empId}`, JSON.stringify(perm));
      alert('✅ 권한이 저장되었습니다!');
    }
  };

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(catId)) {
        newSet.delete(catId);
      } else {
        newSet.add(catId);
      }
      return newSet;
    });
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const toggleCategoryCheck = (empId: string, catId: string) => {
    setPermissions(prev => {
      const newPerms = { ...prev };
      const emp = { ...newPerms[empId] };
      const cat = { ...emp.permissions[catId] };
      
      const newChecked = !cat.checked;
      cat.checked = newChecked;

      Object.keys(cat.menus).forEach(menuId => {
        cat.menus[menuId] = { ...cat.menus[menuId], checked: newChecked };
        Object.keys(cat.menus[menuId].screens).forEach(screenId => {
          const screenDef = allPermissions.find(c => c.categoryId === catId)
            ?.menus.find(m => m.menuId === menuId)
            ?.screens.find(s => s.screenId === screenId);
          cat.menus[menuId].screens[screenId] = {
            checked: newChecked,
            actions: newChecked ? (screenDef?.actions || []) : []
          };
        });
      });

      emp.permissions[catId] = cat;
      newPerms[empId] = emp;
      return newPerms;
    });
  };

  const toggleMenuCheck = (empId: string, catId: string, menuId: string) => {
    setPermissions(prev => {
      const newPerms = { ...prev };
      const emp = { ...newPerms[empId] };
      const cat = { ...emp.permissions[catId] };
      const menu = { ...cat.menus[menuId] };
      
      const newChecked = !menu.checked;
      menu.checked = newChecked;

      Object.keys(menu.screens).forEach(screenId => {
        const screenDef = allPermissions.find(c => c.categoryId === catId)
          ?.menus.find(m => m.menuId === menuId)
          ?.screens.find(s => s.screenId === screenId);
        menu.screens[screenId] = {
          checked: newChecked,
          actions: newChecked ? (screenDef?.actions || []) : []
        };
      });

      cat.menus[menuId] = menu;
      cat.checked = Object.values(cat.menus).some(m => m.checked);
      emp.permissions[catId] = cat;
      newPerms[empId] = emp;
      return newPerms;
    });
  };

  const toggleScreenCheck = (empId: string, catId: string, menuId: string, screenId: string) => {
    setPermissions(prev => {
      const newPerms = { ...prev };
      const emp = { ...newPerms[empId] };
      const cat = { ...emp.permissions[catId] };
      const menu = { ...cat.menus[menuId] };
      const screen = { ...menu.screens[screenId] };
      
      const newChecked = !screen.checked;
      screen.checked = newChecked;

      if (newChecked) {
        const screenDef = allPermissions.find(c => c.categoryId === catId)
          ?.menus.find(m => m.menuId === menuId)
          ?.screens.find(s => s.screenId === screenId);
        screen.actions = screenDef?.actions || [];
      } else {
        screen.actions = [];
      }

      menu.screens[screenId] = screen;
      menu.checked = Object.values(menu.screens).some(s => s.checked);
      cat.menus[menuId] = menu;
      cat.checked = Object.values(cat.menus).some(m => m.checked);
      emp.permissions[catId] = cat;
      newPerms[empId] = emp;
      return newPerms;
    });
  };

  const toggleAction = (empId: string, catId: string, menuId: string, screenId: string, action: string) => {
    setPermissions(prev => {
      const newPerms = { ...prev };
      const emp = { ...newPerms[empId] };
      const cat = { ...emp.permissions[catId] };
      const menu = { ...cat.menus[menuId] };
      const screen = { ...menu.screens[screenId] };
      
      if (screen.actions.includes(action)) {
        screen.actions = screen.actions.filter(a => a !== action);
      } else {
        screen.actions = [...screen.actions, action];
      }

      screen.checked = screen.actions.length > 0;
      menu.screens[screenId] = screen;
      menu.checked = Object.values(menu.screens).some(s => s.checked);
      cat.menus[menuId] = menu;
      cat.checked = Object.values(cat.menus).some(m => m.checked);
      emp.permissions[catId] = cat;
      newPerms[empId] = emp;
      return newPerms;
    });
  };

  const selectAllPermissions = (empId: string) => {
    setPermissions(prev => {
      const newPerms = { ...prev };
      const emp = { ...newPerms[empId] };
      
      allPermissions.forEach(cat => {
        emp.permissions[cat.categoryId].checked = true;
        cat.menus.forEach(menu => {
          emp.permissions[cat.categoryId].menus[menu.menuId].checked = true;
          menu.screens.forEach(screen => {
            emp.permissions[cat.categoryId].menus[menu.menuId].screens[screen.screenId] = {
              checked: true,
              actions: [...screen.actions]
            };
          });
        });
      });

      newPerms[empId] = emp;
      return newPerms;
    });
  };

  const clearAllPermissions = (empId: string) => {
    setPermissions(prev => {
      const newPerms = { ...prev };
      const emp = { ...newPerms[empId] };
      
      allPermissions.forEach(cat => {
        emp.permissions[cat.categoryId].checked = false;
        cat.menus.forEach(menu => {
          emp.permissions[cat.categoryId].menus[menu.menuId].checked = false;
          menu.screens.forEach(screen => {
            emp.permissions[cat.categoryId].menus[menu.menuId].screens[screen.screenId] = {
              checked: false,
              actions: []
            };
          });
        });
      });

      newPerms[empId] = emp;
      return newPerms;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set(allPermissions.map(c => c.categoryId)));
    const allMenuIds = allPermissions.flatMap(c => c.menus.map(m => m.menuId));
    setExpandedMenus(new Set(allMenuIds));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
    setExpandedMenus(new Set());
  };

  const copyPermission = () => {
    if (selectedEmployee && permissions[selectedEmployee]) {
      setCopiedPermission({ ...permissions[selectedEmployee] });
      alert('✅ 권한이 복사되었습니다!');
    }
  };

  const pastePermission = () => {
    if (copiedPermission && selectedEmployee) {
      setPermissions(prev => {
        const newPerms = { ...prev };
        newPerms[selectedEmployee] = {
          ...copiedPermission,
          employeeId: selectedEmployee,
          employeeName: employees.find(e => e.id === selectedEmployee)?.name || ''
        };
        return newPerms;
      });
      alert('✅ 권한이 붙여넣기 되었습니다!');
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.includes(searchQuery) || emp.position.includes(searchQuery)
  );

  const countActivePermissions = (empId: string): number => {
    if (!permissions[empId]) return 0;
    let count = 0;
    Object.values(permissions[empId].permissions).forEach(cat => {
      Object.values(cat.menus).forEach(menu => {
        Object.values(menu.screens).forEach(screen => {
          if (screen.checked) count++;
        });
      });
    });
    return count;
  };

  const totalScreens = allPermissions.reduce((sum, cat) => 
    sum + cat.menus.reduce((mSum, menu) => mSum + menu.screens.length, 0), 0
  );

  const currentEmployee = selectedEmployee ? employees.find(e => e.id === selectedEmployee) : null;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">권한 관리 (RBAC)</h2>
            <p className="text-sm text-gray-500 mt-1">직원별 세부 권한을 설정하고 관리합니다</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 좌측 패널 */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('employee')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'employee'
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="ri-user-line mr-2"></i>
                직원 ({employees.length})
              </button>
              <button
                onClick={() => setActiveTab('role')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'role'
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="ri-shield-user-line mr-2"></i>
                역할 ({roleTemplates.length})
              </button>
            </div>
          </div>

          {activeTab === 'employee' && (
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="직원 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredEmployees.map(emp => (
                  <div
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedEmployee === emp.id
                        ? 'bg-teal-50 border-l-4 border-l-teal-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-800">{emp.name}</h4>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                            {emp.position}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{emp.id}</p>
                        <p className="text-xs text-teal-600 mt-1">
                          권한: {countActivePermissions(emp.id)} / {totalScreens}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={copyPermission}
                  disabled={!selectedEmployee}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                >
                  <i className="ri-file-copy-line mr-2"></i>
                  권한 복사
                </button>
                <button
                  onClick={pastePermission}
                  disabled={!selectedEmployee || !copiedPermission}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                >
                  <i className="ri-clipboard-line mr-2"></i>
                  권한 붙여넣기
                </button>
              </div>
            </>
          )}

          {activeTab === 'role' && (
            <div className="flex-1 overflow-y-auto">
              {roleTemplates.map(role => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedRole === role.id
                      ? 'bg-teal-50 border-l-4 border-l-teal-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <h4 className="font-medium text-gray-800">{role.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 우측 패널 */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedEmployee && permissions[selectedEmployee] ? (
            <>
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{currentEmployee?.name}님의 권한</h3>
                    <p className="text-sm text-gray-500">
                      📊 권한 현황: 전체 {totalScreens}개 중 {countActivePermissions(selectedEmployee)}개 활성화됨
                    </p>
                  </div>
                  <button
                    onClick={() => savePermission(selectedEmployee)}
                    className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium transition-colors whitespace-nowrap"
                  >
                    <i className="ri-save-line mr-2"></i>
                    권한 저장
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => selectAllPermissions(selectedEmployee)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <i className="ri-checkbox-multiple-line mr-2"></i>
                    전체 선택
                  </button>
                  <button
                    onClick={() => clearAllPermissions(selectedEmployee)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <i className="ri-close-circle-line mr-2"></i>
                    전체 해제
                  </button>
                  <button
                    onClick={expandAll}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <i className="ri-arrow-down-s-line mr-2"></i>
                    모두 펼치기
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <i className="ri-arrow-up-s-line mr-2"></i>
                    모두 접기
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {allPermissions.map(category => (
                    <div key={category.categoryId} className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleCategory(category.categoryId)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <i className={`ri-arrow-${expandedCategories.has(category.categoryId) ? 'down' : 'right'}-s-line text-xl`}></i>
                          </button>
                          <input
                            type="checkbox"
                            checked={permissions[selectedEmployee].permissions[category.categoryId]?.checked || false}
                            onChange={() => toggleCategoryCheck(selectedEmployee, category.categoryId)}
                            className="w-5 h-5 text-teal-500 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
                          />
                          <span className="text-lg font-bold text-gray-800">
                            📁 {category.categoryName}
                          </span>
                        </div>
                      </div>

                      {expandedCategories.has(category.categoryId) && (
                        <div className="p-4 space-y-3">
                          {category.menus.map(menu => (
                            <div key={menu.menuId} className="ml-8">
                              <div className="flex items-center gap-3 mb-2">
                                <button
                                  onClick={() => toggleMenu(menu.menuId)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <i className={`ri-arrow-${expandedMenus.has(menu.menuId) ? 'down' : 'right'}-s-line text-lg`}></i>
                                </button>
                                <input
                                  type="checkbox"
                                  checked={permissions[selectedEmployee].permissions[category.categoryId]?.menus[menu.menuId]?.checked || false}
                                  onChange={() => toggleMenuCheck(selectedEmployee, category.categoryId, menu.menuId)}
                                  className="w-4 h-4 text-teal-500 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
                                />
                                <span className="font-semibold text-gray-700">
                                  📄 {menu.menuName}
                                </span>
                              </div>

                              {expandedMenus.has(menu.menuId) && (
                                <div className="ml-8 space-y-3">
                                  {menu.screens.map(screen => (
                                    <div key={screen.screenId} className="bg-gray-50 rounded-lg p-3">
                                      <div className="flex items-center gap-3 mb-2">
                                        <input
                                          type="checkbox"
                                          checked={permissions[selectedEmployee].permissions[category.categoryId]?.menus[menu.menuId]?.screens[screen.screenId]?.checked || false}
                                          onChange={() => toggleScreenCheck(selectedEmployee, category.categoryId, menu.menuId, screen.screenId)}
                                          className="w-4 h-4 text-teal-500 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                          📝 {screen.screenName}
                                        </span>
                                      </div>

                                      <div className="ml-7 flex flex-wrap gap-2">
                                        {screen.actions.map(action => (
                                          <label
                                            key={action}
                                            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                                              permissions[selectedEmployee].permissions[category.categoryId]?.menus[menu.menuId]?.screens[screen.screenId]?.actions.includes(action)
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={permissions[selectedEmployee].permissions[category.categoryId]?.menus[menu.menuId]?.screens[screen.screenId]?.actions.includes(action) || false}
                                              onChange={() => toggleAction(selectedEmployee, category.categoryId, menu.menuId, screen.screenId, action)}
                                              className="hidden"
                                            />
                                            {actionLabels[action]}
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
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-shield-user-line text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">좌측에서 직원을 선택하세요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
