'use client';

import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect, useState } from 'react';

// 컴포넌트 Import
import EmployeeSidebar from './EmployeeSidebar';
import PermissionGrid from './PermissionGrid';
import RBACHeader from './RBACHeader';

// JSON 데이터 Import
import menuData from '@/data/menu.json';

/* ===== 1. 정적 데이터 파싱 (menu.json 기반 변환) ===== */
// rbac.json 삭제로 인해 menu.json 구조를 권한 트리 구조로 변환
const allPermissions = (menuData.menus || []).map((category: any) => {
  // 1. 하위 메뉴가 있는 경우 (일반적인 카테고리)
  if (category.children && category.children.length > 0) {
    return {
      categoryId: category.id,
      categoryName: category.name,
      menus: category.children.map((menu: any) => ({
        menuId: menu.id,
        menuName: menu.name,
        screens: [
          {
            screenId: menu.component || menu.id,
            screenName: menu.name,
            actions: ['read', 'write', 'update', 'delete', 'export', 'approve'], // 기본 액션셋
          },
        ],
      })),
    };
  }
  // 2. 하위 메뉴가 없는 경우 (대시보드 등)
  else {
    return {
      categoryId: category.id,
      categoryName: category.name,
      menus: [
        {
          menuId: category.id,
          menuName: category.name,
          screens: [
            {
              screenId: category.component || category.id,
              screenName: category.name,
              actions: ['read', 'export'], // 단일 페이지는 조회/출력 위주
            },
          ],
        },
      ],
    };
  }
});

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

  /* ===== Auth 상태 ===== */
  const { isInitialized, accessToken } = useAuthStore(state => ({
    isInitialized: state.isInitialized,
    accessToken: state.accessToken,
  }));

  /* ===== API: 역할 목록 조회 ===== */
  const { data: rolesData, isLoading: isLoadingRoles } = api.settings.getRoles.useQuery(
    ['rbac-roles'],
    {}, // No query params needed
  );

  const roleTemplates = (rolesData?.body?.data ?? []).map((r: any) => ({
    id: r.code, // roleId -> code
    name: r.name, // roleName -> name
    description: r.description,
  }));

  /* ===== API: 직원 목록 조회 (staff.json 대체) ===== */
  const { data: employeesData, isLoading: isLoadingEmployees, error: employeesError } = api.employee.getEmployees.useQuery(
    ['rbac-employees'],
    { query: { page: 1, limit: 100 } },
    { enabled: isInitialized && !!accessToken },
  );

  // API 응답 구조: body.data = GetEmployeesResponseSchema = { data: EmployeeSchema[], pagination: {...} }
  // TransformInterceptor로 인해 body = { data: { data: [...], pagination: {...} }, statusCode: 200 }
  // 실제 직원 배열: body.data.data
  const employees = (employeesData?.body?.data?.data ?? []).map((emp: any) => ({
    id: emp.id,
    name: emp.name,
    position: emp.role?.name ?? emp.roleName ?? '미지정', // 중첩 객체 role.name 또는 직접 필드
    departmentName: emp.department?.name ?? emp.departmentName ?? '미지정', // 중첩 객체 department.name
    role: emp.role?.code?.toLowerCase() ?? emp.role?.name?.toLowerCase() ?? 'general-staff',
  }));

  /* ===== [DEBUG] 직원 데이터 로딩 상태 콘솔 출력 ===== */
  useEffect(() => {
    console.log('[RBAC] ══════════════════════════════════════');
    console.log('[RBAC] isInitialized   :', isInitialized);
    console.log('[RBAC] accessToken     :', accessToken ? `${accessToken.slice(0, 20)}...` : 'null');
    console.log('[RBAC] query enabled   :', isInitialized && !!accessToken);
    console.log('[RBAC] isLoadingEmp    :', isLoadingEmployees);
    console.log('[RBAC] employeesError  :', employeesError);
    console.log('[RBAC] employeesData   :', employeesData);
    console.log('[RBAC] body keys       :', employeesData?.body ? Object.keys(employeesData.body) : []);
    console.log('[RBAC] employees count :', employees.length);
    if (employees.length > 0) {
      console.log('[RBAC] employees[0]    :', employees[0]);
    }
    console.log('[RBAC] ══════════════════════════════════════');
  }, [isInitialized, accessToken, isLoadingEmployees, employeesData, employeesError, employees.length]);

  /* ===== API: 선택된 직원의 권한 조회 (useQuery 조건부 실행) ===== */
  const { data: permissionData, isLoading: isLoadingPermission } = api.settings.getEmployeePermission.useQuery(
    ['employee-permission', selectedEmployee ?? ''],
    { params: { employeeId: selectedEmployee ?? '' } },
    { enabled: !!selectedEmployee }, // 직원 선택 시에만 실행
  );

  /* ===== API: 권한 저장 mutation ===== */
  const { mutateAsync: savePermissionMutation } = api.settings.updateEmployeePermission.useMutation();

  /* ===== 권한 빈 구조 초기화 ===== */
  const initializeEmployeePermission = (emp: any) => {
    const base: any = { employeeId: emp?.id, employeeName: emp?.name, permissions: {} };
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

  // API 응답으로 권한 상태 동기화
  useEffect(() => {
    if (!selectedEmployee) return;

    if (isLoadingPermission) return; // 로딩 중 대기

    const emp = employees.find((e: any) => e.id === selectedEmployee);

    // settings controller: body = { success: true, data: perm | null }
    const savedPermissions = (permissionData?.body as any)?.data?.permissions;

    if (savedPermissions && Object.keys(savedPermissions).length > 0) {
      // DB에 저장된 권한 있음 → 복원
      setPermissions(prev => ({
        ...prev,
        [selectedEmployee]: {
          employeeId: selectedEmployee,
          employeeName: emp?.name ?? '',
          permissions: savedPermissions,
        },
      }));
    } else if (!permissions[selectedEmployee]) {
      // DB 권한 없음 + 로컬 상태도 없음 → 빈 구조로 초기화
      setPermissions(prev => ({
        ...prev,
        [selectedEmployee]: initializeEmployeePermission(emp),
      }));
    }
  }, [selectedEmployee, permissionData, isLoadingPermission]);

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

  // API로 권한 저장 (localStorage 대체)
  const savePermission = async (empId: string) => {
    setIsSaving(true);
    try {
      await savePermissionMutation({
        params: { employeeId: empId },
        body: { permissions: permissions[empId].permissions },
      });
      alert('✅ 저장되었습니다.');
    } catch {
      alert('❌ 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
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

  const filteredEmployees = employees.filter((e: any) => e.name.includes(searchQuery));
  const currentEmployee = selectedEmployee ? employees.find((e: any) => e.id === selectedEmployee) || null : null;

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

  // 선택한 직원의 권한 로딩 중 여부
  const isLoadingCurrentPermission = !!selectedEmployee && isLoadingPermission;

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
          isLoadingEmployees={isLoadingEmployees}
          isLoadingRoles={isLoadingRoles}
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
          isLoadingPermission={isLoadingCurrentPermission}
        />
      </div>
    </main>
  );
}
