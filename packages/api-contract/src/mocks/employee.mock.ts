/**
 * @description 인사(Employee) 도메인 Mock 데이터
 * @author Shiwoo Min
 * @date 2026-01-27
 */

// 부서 목록
export const mockDepartments = [
  { id: 'D1', code: 'NS', name: '간호팀', isActive: true, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'D2', code: 'CS', name: '요양팀', isActive: true, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'D3', code: 'AD', name: '행정팀', isActive: true, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
];

// 직원 역할 및 권한
export const mockEmployeeRoles = [
  {
    id: 'R1',
    code: 'ADMIN',
    name: '관리자',
    permissions: { all: true },
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 'R2',
    code: 'NURSE',
    name: '간호사',
    permissions: { care: true },
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
];

// 직원 마스터 정보
export const mockEmployees = [
  {
    id: 'E001',
    name: '김요양',
    email: 'kim@agape.com',
    departmentName: '요양팀',
    roleName: '요양보호사',
    status: 'ACTIVE',
    isAdmin: false,
    createdAt: '2024-03-01',
    updatedAt: '2026-01-27',
  },
  {
    id: 'E003',
    name: '김시설',
    email: 'admin@agape.com',
    departmentName: '행정팀',
    roleName: '시설장',
    status: 'ACTIVE',
    isAdmin: true,
    createdAt: '2021-05-01',
    updatedAt: '2026-01-27',
  },
];
