/**
 * @description Settings API Contract
 * @author Agape Care Team
 * @date 2026-01-29
 */

import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema';
import {
  CreateDepartmentRequestSchema,
  CreateEmployeeRoleRequestSchema,
  DepartmentSchema,
  EmployeeRoleSchema,
  UpdateDepartmentRequestSchema,
  UpdateEmployeeRoleRequestSchema,
} from '../schemas/employee/index';
import {
  FacilityInfoSchema,
  SystemConfigSchema,
  UpdateFacilityInfoSchema,
  UpdateSystemConfigSchema,
} from '../schemas/setting/setting.schema';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

export const settingContract = {
  // ==================== Facility Info ====================
  getFacilityInfo: {
    method: 'GET' as const,
    path: '/api/settings/facility',
    responses: {
      200: ApiResponseSchema(FacilityInfoSchema),
    },
    summary: '시설 정보 조회',
    headers: authHeader,
  },

  updateFacilityInfo: {
    method: 'PATCH' as const,
    path: '/api/settings/facility',
    body: UpdateFacilityInfoSchema,
    responses: {
      200: ApiResponseSchema(FacilityInfoSchema),
    },
    summary: '시설 정보 수정',
    headers: authHeader,
  },

  // ==================== System Config ====================
  getSystemConfig: {
    method: 'GET' as const,
    path: '/api/settings/system',
    responses: {
      200: ApiResponseSchema(z.array(SystemConfigSchema)),
    },
    summary: '시스템 설정 조회',
    headers: authHeader,
  },

  updateSystemConfig: {
    method: 'PATCH' as const,
    path: '/api/settings/system',
    body: UpdateSystemConfigSchema,
    responses: {
      200: ApiResponseSchema(z.array(SystemConfigSchema)),
    },
    summary: '시스템 설정 수정',
    headers: authHeader,
  },

  // ==================== Roles (RBAC) ====================
  getRoles: {
    method: 'GET' as const,
    path: '/api/settings/roles',
    responses: {
      200: ApiResponseSchema(z.array(EmployeeRoleSchema)),
    },
    summary: '역할 목록 조회',
    headers: authHeader,
  },

  createRole: {
    method: 'POST' as const,
    path: '/api/settings/roles',
    body: CreateEmployeeRoleRequestSchema,
    responses: {
      201: ApiResponseSchema(EmployeeRoleSchema),
    },
    summary: '역할 생성',
    headers: authHeader,
  },

  updateRole: {
    method: 'PATCH' as const,
    path: '/api/settings/roles/:id',
    body: UpdateEmployeeRoleRequestSchema,
    responses: {
      200: ApiResponseSchema(EmployeeRoleSchema),
    },
    summary: '역할 수정',
    headers: authHeader,
  },

  deleteRole: {
    method: 'DELETE' as const,
    path: '/api/settings/roles/:id',
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
    summary: '역할 삭제',
    headers: authHeader,
  },

  // ==================== Departments ====================
  getDepartments: {
    method: 'GET' as const,
    path: '/api/settings/departments',
    responses: {
      200: ApiResponseSchema(z.array(DepartmentSchema)),
    },
    summary: '부서 목록 조회',
    headers: authHeader,
  },

  createDepartment: {
    method: 'POST' as const,
    path: '/api/settings/departments',
    body: CreateDepartmentRequestSchema,
    responses: {
      201: ApiResponseSchema(DepartmentSchema),
    },
    summary: '부서 생성',
    headers: authHeader,
  },

  updateDepartment: {
    method: 'PATCH' as const,
    path: '/api/settings/departments/:id',
    body: UpdateDepartmentRequestSchema,
    responses: {
      200: ApiResponseSchema(DepartmentSchema),
    },
    summary: '부서 수정',
    headers: authHeader,
  },

  deleteDepartment: {
    method: 'DELETE' as const,
    path: '/api/settings/departments/:id',
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
    summary: '부서 삭제',
    headers: authHeader,
  },
} as const;

export type SettingContract = typeof settingContract;
