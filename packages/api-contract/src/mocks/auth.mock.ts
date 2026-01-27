/**
 * @description 인증 및 세션 Mock 데이터
 * @author Shiwoo Min
 * @date 2026-01-27
 */

export const mockCurrentUser = {
  id: '1', // employees.id
  email: 'admin@agape-care.kr',
  name: '시스템관리자',
  isAdmin: true,
  departmentId: null,
  roleId: null,
  status: 'ACTIVE' as const,
  lastLoginAt: '2026-01-27T00:56:00Z',
};

export const mockAuthTokens = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-access-token',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-refresh-token',
};

export const mockLoginResponse = {
  accessToken: mockAuthTokens.accessToken,
  refreshToken: mockAuthTokens.refreshToken,
  user: mockCurrentUser,
};

// 테스트용 직원 계정
export const mockEmployeeUsers = [
  {
    id: '1',
    email: 'admin@agape-care.kr',
    name: '시스템관리자',
    departmentId: null,
    departmentName: null,
    roleId: null,
    roleName: null,
    isAdmin: true,
    status: 'ACTIVE' as const,
    phoneNumber: '02-1234-5678',
    hireDate: '2020-01-01',
    lastLoginAt: '2026-01-27T00:56:00Z',
  },
  {
    id: '2',
    email: 'director@agape-care.kr',
    name: '김원장',
    departmentId: '1',
    departmentName: '경영관리팀',
    roleId: '1',
    roleName: '시설장',
    isAdmin: true,
    status: 'ACTIVE' as const,
    phoneNumber: '010-1234-5678',
    hireDate: '2020-01-01',
    lastLoginAt: '2026-01-26T18:12:20Z',
  },
  {
    id: '3',
    email: 'nurse1@agape-care.kr',
    name: '박간호사',
    departmentId: '2',
    departmentName: '간호팀',
    roleId: '2',
    roleName: '간호사',
    isAdmin: false,
    status: 'ACTIVE' as const,
    phoneNumber: '010-2345-6789',
    hireDate: '2021-03-15',
    lastLoginAt: '2026-01-27T08:30:00Z',
  },
  {
    id: '4',
    email: 'care1@agape-care.kr',
    name: '이요양사',
    departmentId: '3',
    departmentName: '요양팀',
    roleId: '3',
    roleName: '요양보호사',
    isAdmin: false,
    status: 'ACTIVE' as const,
    phoneNumber: '010-3456-7890',
    hireDate: '2021-06-01',
    lastLoginAt: '2026-01-27T08:45:00Z',
  },
  {
    id: '5',
    email: 'care2@agape-care.kr',
    name: '최요양사',
    departmentId: '3',
    departmentName: '요양팀',
    roleId: '3',
    roleName: '요양보호사',
    isAdmin: false,
    status: 'ACTIVE' as const,
    phoneNumber: '010-4567-8901',
    hireDate: '2022-01-10',
    lastLoginAt: '2026-01-27T08:50:00Z',
  },
];

// 로그인 테스트용 계정 정보
export const mockTestAccounts = [
  {
    email: 'admin@agape-care.kr',
    password: '1234', // bcrypt: $2b$10$abc...
    user: mockEmployeeUsers[0],
  },
  {
    email: 'director@agape-care.kr',
    password: '1234',
    user: mockEmployeeUsers[1],
  },
  {
    email: 'nurse1@agape-care.kr',
    password: '1234',
    user: mockEmployeeUsers[2],
  },
  {
    email: 'care1@agape-care.kr',
    password: '1234',
    user: mockEmployeeUsers[3],
  },
];
