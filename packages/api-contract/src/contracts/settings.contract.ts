/**
 * @description Settings API Contract
 * @author Agape Care Team
 * @date 2026-02-17
 */

import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema.js';
import {
  CreateDepartmentRequestSchema,
  CreateEmployeeRoleRequestSchema,
  DepartmentSchema,
  EmployeeRoleSchema,
  UpdateDepartmentRequestSchema,
  UpdateEmployeeRoleRequestSchema,
} from '../schemas/employee/index.js';
import {
  EmployeePermissionSchema,
  FacilitySchema,
  SiteInfoSchema,
  UpdateEmployeePermissionRequestSchema,
  UpdateFacilityRequestSchema,
  UpdateSiteInfoRequestSchema,
} from '../schemas/settings/settings.schema.js';

const authHeader = z.object({
  authorization: z.string().optional().describe('Bearer {token}'),
});

export const settingContract = {
  // ==================== Facility Info ====================
  getFacilityInfo: {
    method: 'GET' as const,
    path: '/settings/facility',
    responses: {
      200: ApiResponseSchema(FacilitySchema),
    },
    summary: '시설 정보 조회',
    headers: authHeader,
  },

  updateFacilityInfo: {
    method: 'PATCH' as const,
    path: '/settings/facility',
    body: UpdateFacilityRequestSchema,
    responses: {
      200: ApiResponseSchema(FacilitySchema),
    },
    summary: '시설 정보 수정',
    headers: authHeader,
  },

  // ==================== Site Info (System Config) ====================
  getSiteInfo: {
    method: 'GET' as const,
    path: '/settings/site',
    responses: {
      200: ApiResponseSchema(SiteInfoSchema),
    },
    summary: '사이트 설정 조회',
    headers: authHeader,
  },

  updateSiteInfo: {
    method: 'PATCH' as const,
    path: '/settings/site',
    body: UpdateSiteInfoRequestSchema,
    responses: {
      200: ApiResponseSchema(SiteInfoSchema),
    },
    summary: '사이트 설정 수정',
    headers: authHeader,
  },

  // ==================== Roles (RBAC) ====================
  getRoles: {
    method: 'GET' as const,
    path: '/settings/roles',
    responses: {
      200: ApiResponseSchema(z.array(EmployeeRoleSchema)),
    },
    summary: '역할 목록 조회',
    headers: authHeader,
  },

  createRole: {
    method: 'POST' as const,
    path: '/settings/roles',
    body: CreateEmployeeRoleRequestSchema,
    responses: {
      201: ApiResponseSchema(EmployeeRoleSchema),
    },
    summary: '역할 생성',
    headers: authHeader,
  },

  updateRole: {
    method: 'PATCH' as const,
    path: '/settings/roles/:id',
    body: UpdateEmployeeRoleRequestSchema,
    responses: {
      200: ApiResponseSchema(EmployeeRoleSchema),
    },
    summary: '역할 수정',
    headers: authHeader,
  },

  deleteRole: {
    method: 'DELETE' as const,
    path: '/settings/roles/:id',
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
    summary: '역할 삭제',
    headers: authHeader,
  },

  // ==================== Employee Permissions (RBAC Overrides) ====================
  getEmployeePermission: {
    method: 'GET' as const,
    path: '/settings/permissions/:employeeId',
    responses: {
      200: ApiResponseSchema(EmployeePermissionSchema.nullable()), // Can be null if no override
    },
    summary: '직원 개인 권한 조회',
    headers: authHeader,
  },

  updateEmployeePermission: {
    method: 'PUT' as const,
    path: '/settings/permissions/:employeeId',
    body: UpdateEmployeePermissionRequestSchema,
    responses: {
      200: ApiResponseSchema(EmployeePermissionSchema),
    },
    summary: '직원 개인 권한 수정',
    headers: authHeader,
  },

  // ==================== Departments ====================
  getDepartments: {
    method: 'GET' as const,
    path: '/settings/departments',
    responses: {
      200: ApiResponseSchema(z.array(DepartmentSchema)),
    },
    summary: '부서 목록 조회',
    headers: authHeader,
  },

  createDepartment: {
    method: 'POST' as const,
    path: '/settings/departments',
    body: CreateDepartmentRequestSchema,
    responses: {
      201: ApiResponseSchema(DepartmentSchema),
    },
    summary: '부서 생성',
    headers: authHeader,
  },

  updateDepartment: {
    method: 'PATCH' as const,
    path: '/settings/departments/:id',
    body: UpdateDepartmentRequestSchema,
    responses: {
      200: ApiResponseSchema(DepartmentSchema),
    },
    summary: '부서 수정',
    headers: authHeader,
  },

  deleteDepartment: {
    method: 'DELETE' as const,
    path: '/settings/departments/:id',
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
    summary: '부서 삭제',
    headers: authHeader,
  },
} as const;

export type SettingContract = typeof settingContract;
