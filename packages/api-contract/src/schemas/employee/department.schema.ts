/**
 * @description 부서 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 부서 정보
 */
export const DepartmentSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 부서 생성 요청
 */
export const CreateDepartmentRequestSchema = z.object({
  code: z.string().min(1, '부서 코드는 필수입니다'),
  name: z.string().min(1, '부서명은 필수입니다'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

/**
 * 부서 수정 요청
 */
export const UpdateDepartmentRequestSchema = z.object({
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

/**
 * 부서 목록 조회 쿼리
 */
export const GetDepartmentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  isActive: z.coerce.boolean().optional(),
  search: z.string().optional(), // 코드, 이름 검색
});

/**
 * 부서 목록 응답
 */
export const GetDepartmentsResponseSchema = z.object({
  data: z.array(DepartmentSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 부서 상세 응답 (직원 수 포함)
 */
export const DepartmentDetailSchema = DepartmentSchema.extend({
  employeeCount: z.number().optional(),
});

// Type exports
export type Department = z.infer<typeof DepartmentSchema>;
export type CreateDepartmentRequest = z.infer<typeof CreateDepartmentRequestSchema>;
export type UpdateDepartmentRequest = z.infer<typeof UpdateDepartmentRequestSchema>;
export type GetDepartmentsQuery = z.infer<typeof GetDepartmentsQuerySchema>;
export type GetDepartmentsResponse = z.infer<typeof GetDepartmentsResponseSchema>;
export type DepartmentDetail = z.infer<typeof DepartmentDetailSchema>;
