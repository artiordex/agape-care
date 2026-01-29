// app/settings/RBACManagement/page.tsx
'use client';

import { useEffect, useState } from 'react';

import EmployeeBar from './EmployeeBar';
import PermissionPanel from './PermissionPanel';

// JSON data
import rbacData from '@/data/rbac.json';
import roleData from '@/data/role.json';
import staffData from '@/data/staff.json';

/* ===== types (기존 그대로) ===== */
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

interface RoleTemplate {
  id: string;
  name: string;
  description: string;
}

/* ===== constants ===== */
const allPermissions: Permission[] = rbacData.categories;

const roleTemplates: RoleTemplate[] = roleData.roles.map(r => ({
  id: r.roleId,
  name: r.roleName,
  description: r.description,
}));

const employees: Employee[] = Object.entries(staffData)
  .filter(([k]) => k.endsWith('Team'))
  .flatMap(([_, team], tIdx) =>
    (team as any[]).map((m, i) => ({
      id: `emp_${tIdx}_${i}`,
      name: m.name,
      position: m.position,
      role: 'general-staff',
    })),
  );

/* ===== page ===== */
export default function RBACPage() {
  const [activeTab, setActiveTab] = useState<'employee' | 'role'>('employee');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [permissions, setPermissions] = useState<{ [key: string]: EmployeePermission }>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [copiedPermission, setCopiedPermission] = useState<EmployeePermission | null>(null);
  const [isClient, setIsClient] = useState(false);

  /* ===== lifecycle ===== */
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    loadPermissions();
  }, [isClient]);

  /* ===== helpers ===== */
  const initializeEmployeePermission = (emp: Employee): EmployeePermission => {
    const base: EmployeePermission = {
      employeeId: emp.id,
      employeeName: emp.name,
      role: emp.role,
      permissions: {},
    };

    allPermissions.forEach(cat => {
      const categoryPermission: CategoryPermission = { checked: false, menus: {} };
      base.permissions[cat.categoryId] = categoryPermission;

      cat.menus.forEach(menu => {
        const menuPermission: MenuPermission = { checked: false, screens: {} };
        categoryPermission.menus[menu.menuId] = menuPermission;

        menu.screens.forEach(screen => {
          menuPermission.screens[screen.screenId] = {
            checked: false,
            actions: [],
          };
        });
      });
    });

    return base;
  };

  const loadPermissions = () => {
    const loaded: { [key: string]: EmployeePermission } = {};
    employees.forEach(emp => {
      const stored = localStorage.getItem(`rbac_permissions_${emp.id}`);
      loaded[emp.id] = stored ? JSON.parse(stored) : initializeEmployeePermission(emp);
    });
    setPermissions(loaded);
  };

  /* ===== persistence ===== */
  const savePermission = (empId: string) => {
    localStorage.setItem(`rbac_permissions_${empId}`, JSON.stringify(permissions[empId]));
    alert('권한이 저장되었습니다!');
  };

  /* ===== toggle logic (기존 100% 동일) ===== */
  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => {
      const s = new Set(prev);
      s.has(catId) ? s.delete(catId) : s.add(catId);
      return s;
    });
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => {
      const s = new Set(prev);
      s.has(menuId) ? s.delete(menuId) : s.add(menuId);
      return s;
    });
  };

  const toggleCategoryCheck = (empId: string, catId: string) => {
    setPermissions(prev => {
      const next = structuredClone(prev);
      const cat = next[empId]?.permissions?.[catId];
      if (!cat) return next;

      cat.checked = !cat.checked;

      Object.values(cat.menus).forEach(menu => {
        menu.checked = cat.checked;
        Object.entries(menu.screens).forEach(([screenId, screen]) => {
          const def = allPermissions
            .find(c => c.categoryId === catId)
            ?.menus.find(m => m.menuId === Object.keys(cat.menus).find(id => cat.menus[id] === menu))
            ?.screens.find(s => s.screenId === screenId);
          screen.checked = cat.checked;
          screen.actions = cat.checked ? [...(def?.actions || [])] : [];
        });
      });

      return next;
    });
  };

  const toggleMenuCheck = (empId: string, catId: string, menuId: string) => {
    setPermissions(prev => {
      const next = structuredClone(prev);
      const menu = next[empId]?.permissions?.[catId]?.menus?.[menuId];
      if (!menu) return next;

      menu.checked = !menu.checked;

      Object.entries(menu.screens).forEach(([screenId, screen]) => {
        const def = allPermissions
          .find(c => c.categoryId === catId)
          ?.menus.find(m => m.menuId === menuId)
          ?.screens.find(s => s.screenId === screenId);
        screen.checked = menu.checked;
        screen.actions = menu.checked ? [...(def?.actions || [])] : [];
      });

      const cat = next[empId]?.permissions?.[catId];
      if (cat) {
        cat.checked = Object.values(cat.menus).some(m => m.checked);
      }
      return next;
    });
  };

  const toggleScreenCheck = (empId: string, catId: string, menuId: string, screenId: string) => {
    setPermissions(prev => {
      const next = structuredClone(prev);
      const screen = next[empId]?.permissions?.[catId]?.menus?.[menuId]?.screens?.[screenId];
      if (!screen) return next;

      screen.checked = !screen.checked;

      const def = allPermissions
        .find(c => c.categoryId === catId)
        ?.menus.find(m => m.menuId === menuId)
        ?.screens.find(s => s.screenId === screenId);

      screen.actions = screen.checked ? [...(def?.actions || [])] : [];

      const menu = next[empId]?.permissions?.[catId]?.menus?.[menuId];
      if (menu) {
        menu.checked = Object.values(menu.screens).some(s => s.checked);
      }

      const cat = next[empId]?.permissions?.[catId];
      if (cat) {
        cat.checked = Object.values(cat.menus).some(m => m.checked);
      }
      return next;
    });
  };

  const toggleAction = (empId: string, catId: string, menuId: string, screenId: string, action: string) => {
    setPermissions(prev => {
      const next = structuredClone(prev);
      const screen = next[empId]?.permissions?.[catId]?.menus?.[menuId]?.screens?.[screenId];
      if (!screen) return next;

      screen.actions = screen.actions.includes(action)
        ? screen.actions.filter(a => a !== action)
        : [...screen.actions, action];
      screen.checked = screen.actions.length > 0;
      return next;
    });
  };

  /* ===== bulk ===== */
  const selectAllPermissions = (empId: string) => {
    setPermissions(prev => {
      const next = structuredClone(prev);
      allPermissions.forEach(cat => {
        const catPerm = next[empId]?.permissions?.[cat.categoryId];
        if (catPerm) {
          catPerm.checked = true;
          cat.menus.forEach(menu => {
            const menuPerm = catPerm.menus?.[menu.menuId];
            if (menuPerm) {
              menuPerm.checked = true;
              menu.screens.forEach(screen => {
                menuPerm.screens[screen.screenId] = {
                  checked: true,
                  actions: [...screen.actions],
                };
              });
            }
          });
        }
      });
      return next;
    });
  };

  const clearAllPermissions = (empId: string) => {
    setPermissions(prev => {
      const next = structuredClone(prev);
      allPermissions.forEach(cat => {
        const catPerm = next[empId]?.permissions?.[cat.categoryId];
        if (catPerm) {
          catPerm.checked = false;
          cat.menus.forEach(menu => {
            const menuPerm = catPerm.menus?.[menu.menuId];
            if (menuPerm) {
              menuPerm.checked = false;
              menu.screens.forEach(screen => {
                menuPerm.screens[screen.screenId] = {
                  checked: false,
                  actions: [],
                };
              });
            }
          });
        }
      });
      return next;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set(allPermissions.map(c => c.categoryId)));
    setExpandedMenus(new Set(allPermissions.flatMap(c => c.menus.map(m => m.menuId))));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
    setExpandedMenus(new Set());
  };

  /* ===== copy / paste ===== */
  const copyPermission = () => {
    if (!selectedEmployee) return;
    const empPermission = permissions[selectedEmployee];
    if (!empPermission) return;
    setCopiedPermission(structuredClone(empPermission));
    alert('✅ 권한이 복사되었습니다!');
  };

  const pastePermission = () => {
    if (!selectedEmployee || !copiedPermission) return;
    setPermissions(prev => ({
      ...prev,
      [selectedEmployee]: {
        ...copiedPermission,
        employeeId: selectedEmployee,
        employeeName: employees.find(e => e.id === selectedEmployee)?.name || '',
      },
    }));
    alert('✅ 권한이 붙여넣기 되었습니다!');
  };

  /* ===== derived ===== */
  const filteredEmployees = employees.filter(e => e.name.includes(searchQuery) || e.position.includes(searchQuery));

  const countActivePermissions = (empId: string) => {
    let cnt = 0;
    Object.values(permissions[empId]?.permissions || {}).forEach(cat =>
      Object.values(cat.menus).forEach(menu => Object.values(menu.screens).forEach(s => s.checked && cnt++)),
    );
    return cnt;
  };

  const totalScreens = allPermissions.reduce((sum, c) => sum + c.menus.reduce((m, m2) => m + m2.screens.length, 0), 0);

  const currentEmployee = selectedEmployee ? employees.find(e => e.id === selectedEmployee) || null : null;

  if (!isClient) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-600">권한 관리 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        <EmployeeBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          employees={employees}
          roleTemplates={roleTemplates}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredEmployees={filteredEmployees}
          countActivePermissions={countActivePermissions}
          totalScreens={totalScreens}
          copyPermission={copyPermission}
          pastePermission={pastePermission}
          copiedPermission={copiedPermission}
        />

        <PermissionPanel
          selectedEmployee={selectedEmployee}
          currentEmployee={currentEmployee}
          permissions={permissions}
          totalScreens={totalScreens}
          countActivePermissions={countActivePermissions}
          savePermission={savePermission}
          selectAllPermissions={selectAllPermissions}
          clearAllPermissions={clearAllPermissions}
          expandAll={expandAll}
          collapseAll={collapseAll}
          allPermissions={allPermissions}
          expandedCategories={expandedCategories}
          expandedMenus={expandedMenus}
          toggleCategory={toggleCategory}
          toggleMenu={toggleMenu}
          toggleCategoryCheck={toggleCategoryCheck}
          toggleMenuCheck={toggleMenuCheck}
          toggleScreenCheck={toggleScreenCheck}
          toggleAction={toggleAction}
        />
      </div>
    </div>
  );
}
