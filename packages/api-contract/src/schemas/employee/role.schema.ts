/**
 * @description 직원 역할(권한) 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 직원 역할 정보
 */
export const EmployeeRoleSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.record(z.unknown()), // JSON 권한 정보
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 직원 역할 생성 요청
 */
export const CreateEmployeeRoleRequestSchema = z.object({
  code: z.string().min(1, '역할 코드는 필수입니다'),
  name: z.string().min(1, '역할명은 필수입니다'),
  description: z.string().optional(),
  permissions: z.record(z.unknown()).default({}),
});

/**
 * 직원 역할 수정 요청
 */
export const UpdateEmployeeRoleRequestSchema = z.object({
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  permissions: z.record(z.unknown()).optional(),
});

/**
 * 직원 역할 목록 조회 쿼리
 */
export const GetEmployeeRolesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(), // 코드, 이름 검색
});

/**
 * 직원 역할 목록 응답
 */
export const GetEmployeeRolesResponseSchema = z.object({
  data: z.array(EmployeeRoleSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 권한 정보 (예시)
 */
export const PermissionSchema = z.object({
  module: z.string(), // 'resident', 'employee', 'care', etc.
  actions: z.array(z.enum(['create', 'read', 'update', 'delete'])),
});

// Type exports
export type EmployeeRole = z.infer<typeof EmployeeRoleSchema>;
export type CreateEmployeeRoleRequest = z.infer<typeof CreateEmployeeRoleRequestSchema>;
export type UpdateEmployeeRoleRequest = z.infer<typeof UpdateEmployeeRoleRequestSchema>;
export type GetEmployeeRolesQuery = z.infer<typeof GetEmployeeRolesQuerySchema>;
export type GetEmployeeRolesResponse = z.infer<typeof GetEmployeeRolesResponseSchema>;
export type Permission = z.infer<typeof PermissionSchema>;
