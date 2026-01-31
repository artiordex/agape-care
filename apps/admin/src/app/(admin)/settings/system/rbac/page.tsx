'use client';

import { useEffect, useState } from 'react';

// 컴포넌트 Import
import EmployeeSidebar from './EmployeeSidebar';
import PermissionGrid from './PermissionGrid';
import RBACHeader from './RBACHeader';

// JSON 데이터 Import
import rbacData from '@/data/rbac.json';
import roleData from '@/data/role.json';
import staffData from '@/data/staff.json';

/* ===== 1. 데이터 파싱 ===== */
const allPermissions = rbacData.categories;
const roleTemplates = roleData.roles.map(r => ({
  id: r.roleId,
  name: r.roleName,
  description: r.description,
}));

const employees = Object.entries(staffData)
  .filter(([k]) => k.endsWith('Team'))
  .flatMap(([_, team], tIdx) =>
    (team as any[]).map((m, i) => ({
      id: m.id || `emp_${tIdx}_${i}`,
      name: m.name,
      position: m.position,
      role: 'general-staff',
    })),
  );

/* ===== 2. 메인 페이지 ===== */
export default function RBACManagementPage() {
  const [activeTab, setActiveTab] = useState<'employee' | 'role'>('employee');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [permissions, setPermissions] = useState<{ [key: string]: any }>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [copiedPermission, setCopiedPermission] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) loadPermissions();
  }, [isClient]);

  // 권한 로드 및 초기화
  const loadPermissions = () => {
    const loaded: { [key: string]: any } = {};
    employees.forEach(emp => {
      const stored = localStorage.getItem(`agape_rbac_v2_${emp.id}`);
      loaded[emp.id] = stored ? JSON.parse(stored) : initializeEmployeePermission(emp);
    });
    setPermissions(loaded);
  };

  const initializeEmployeePermission = (emp: any) => {
    const base: any = { employeeId: emp.id, employeeName: emp.name, permissions: {} };
    allPermissions.forEach(cat => {
      base.permissions[cat.categoryId] = { checked: false, menus: {} };
      cat.menus.forEach(menu => {
        base.permissions[cat.categoryId].menus[menu.menuId] = { checked: false, screens: {} };
        menu.screens.forEach(screen => {
          base.permissions[cat.categoryId].menus[menu.menuId].screens[screen.screenId] = {
            checked: false,
            actions: [],
          };
        });
      });
    });
    return base;
  };

  /* ===== 3. [핵심] 권한 토글 로직 (클릭 시 실행됨) ===== */

  // (1) 카테고리 전체 체크
  const toggleCategoryCheck = (empId: string, catId: string) => {
    setPermissions(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const cat = next[empId].permissions[catId];
      cat.checked = !cat.checked;

      // 하위 모든 메뉴/화면/액션 일괄 변경
      const catDef = allPermissions.find(c => c.categoryId === catId);
      catDef?.menus.forEach(menu => {
        cat.menus[menu.menuId].checked = cat.checked;
        menu.screens.forEach(screen => {
          cat.menus[menu.menuId].screens[screen.screenId].checked = cat.checked;
          cat.menus[menu.menuId].screens[screen.screenId].actions = cat.checked ? [...screen.actions] : [];
        });
      });
      return next;
    });
  };

  // (2) 메뉴 전체 체크
  const toggleMenuCheck = (empId: string, catId: string, menuId: string) => {
    setPermissions(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const menuPerm = next[empId].permissions[catId].menus[menuId];
      menuPerm.checked = !menuPerm.checked;

      // 하위 모든 화면/액션 일괄 변경
      const menuDef = allPermissions.find(c => c.categoryId === catId)?.menus.find(m => m.menuId === menuId);
      menuDef?.screens.forEach(screen => {
        menuPerm.screens[screen.screenId].checked = menuPerm.checked;
        menuPerm.screens[screen.screenId].actions = menuPerm.checked ? [...screen.actions] : [];
      });
      return next;
    });
  };

  // (3) 화면 개별 체크
  const toggleScreenCheck = (empId: string, catId: string, menuId: string, screenId: string) => {
    setPermissions(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const screenPerm = next[empId].permissions[catId].menus[menuId].screens[screenId];
      screenPerm.checked = !screenPerm.checked;

      const screenDef = allPermissions
        .find(c => c.categoryId === catId)
        ?.menus.find(m => m.menuId === menuId)
        ?.screens.find(s => s.screenId === screenId);

      screenPerm.actions = screenPerm.checked ? [...(screenDef?.actions || [])] : [];
      return next;
    });
  };

  // (4) 개별 액션 (조회/등록 등) 체크
  const toggleAction = (empId: string, catId: string, menuId: string, screenId: string, action: string) => {
    setPermissions(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const screen = next[empId].permissions[catId].menus[menuId].screens[screenId];

      screen.actions = screen.actions.includes(action)
        ? screen.actions.filter((a: string) => a !== action)
        : [...screen.actions, action];

      screen.checked = screen.actions.length > 0;
      return next;
    });
  };

  /* ===== 4. 나머지 액션들 ===== */
  const savePermission = async (empId: string) => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    localStorage.setItem(`agape_rbac_v2_${empId}`, JSON.stringify(permissions[empId]));
    setIsSaving(false);
    alert('✅ 저장되었습니다.');
  };

  const selectAllPermissions = (empId: string) => {
    setPermissions(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      allPermissions.forEach(cat => {
        next[empId].permissions[cat.categoryId].checked = true;
        cat.menus.forEach(menu => {
          next[empId].permissions[cat.categoryId].menus[menu.menuId].checked = true;
          menu.screens.forEach(screen => {
            next[empId].permissions[cat.categoryId].menus[menu.menuId].screens[screen.screenId] = {
              checked: true,
              actions: [...screen.actions],
            };
          });
        });
      });
      return next;
    });
  };

  const clearAllPermissions = (empId: string) => {
    setPermissions(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      Object.keys(next[empId].permissions).forEach(catId => {
        next[empId].permissions[catId].checked = false;
        Object.keys(next[empId].permissions[catId].menus).forEach(menuId => {
          next[empId].permissions[catId].menus[menuId].checked = false;
          Object.keys(next[empId].permissions[catId].menus[menuId].screens).forEach(screenId => {
            next[empId].permissions[catId].menus[menuId].screens[screenId] = { checked: false, actions: [] };
          });
        });
      });
      return next;
    });
  };

  const filteredEmployees = employees.filter(e => e.name.includes(searchQuery));
  const currentEmployee = selectedEmployee ? employees.find(e => e.id === selectedEmployee) || null : null;
  const countActivePermissions = (empId: string) => {
    let cnt = 0;
    Object.values(permissions[empId]?.permissions || {}).forEach((cat: any) =>
      Object.values(cat.menus).forEach((menu: any) =>
        Object.values(menu.screens).forEach((s: any) => s.checked && cnt++),
      ),
    );
    return cnt;
  };
  const totalScreens = allPermissions.reduce((sum, c) => sum + c.menus.reduce((m, m2) => m + m2.screens.length, 0), 0);

  if (!isClient) return null;

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      <RBACHeader
        selectedName={currentEmployee?.name || null}
        activeTab={activeTab}
        isSaving={isSaving}
        onSave={() => selectedEmployee && savePermission(selectedEmployee)}
      />
      <div className="flex flex-1 overflow-hidden">
        <EmployeeSidebar
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
          copyPermission={() => {}}
          pastePermission={() => {}}
          copiedPermission={copiedPermission}
        />
        <PermissionGrid
          selectedEmployee={selectedEmployee}
          currentEmployee={currentEmployee}
          permissions={permissions}
          totalScreens={totalScreens}
          countActivePermissions={countActivePermissions}
          savePermission={savePermission}
          selectAllPermissions={selectAllPermissions}
          clearAllPermissions={clearAllPermissions}
          expandAll={() => setExpandedCategories(new Set(allPermissions.map(c => c.categoryId)))}
          collapseAll={() => {
            setExpandedCategories(new Set());
            setExpandedMenus(new Set());
          }}
          allPermissions={allPermissions}
          expandedCategories={expandedCategories}
          expandedMenus={expandedMenus}
          toggleCategory={id =>
            setExpandedCategories(prev => {
              const n = new Set(prev);
              n.has(id) ? n.delete(id) : n.add(id);
              return n;
            })
          }
          toggleMenu={id =>
            setExpandedMenus(prev => {
              const n = new Set(prev);
              n.has(id) ? n.delete(id) : n.add(id);
              return n;
            })
          }
          toggleCategoryCheck={toggleCategoryCheck}
          toggleMenuCheck={toggleMenuCheck}
          toggleScreenCheck={toggleScreenCheck}
          toggleAction={toggleAction}
        />
      </div>
    </main>
  );
}
