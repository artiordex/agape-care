/**
 * @description 직원(Employee) 도메인 통합 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */

import { z } from 'zod';

/**
 * [상태] 직원 상태 열거형
 */
export const EmployeeStatusSchema = z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE']);

/**
 * [엔티티] 직원 기본 정보 스키마
 * DB의 BIGINT 및 DATE 타입을 API 통신용 string(ISO)으로 변환하여 정의
 */
export const EmployeeSchema = z.object({
  id: z.string(),
  departmentId: z.string().nullable(),
  departmentName: z.string().nullable().optional(), // DB 조인 결과값
  roleId: z.string().nullable(),
  roleName: z.string().nullable().optional(), // DB 조인 결과값
  email: z.string().email().nullable(),
  name: z.string().min(1, '성함은 필수입니다.'),
  phoneNumber: z.string().nullable(),
  hireDate: z.string().nullable(), // ISO 8601 Date String
  resignDate: z.string().nullable(),
  status: EmployeeStatusSchema.default('ACTIVE'),
  isAdmin: z.boolean().default(false),
  meta: z.record(z.unknown()).default({}),
  lastLoginAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * [요청] 직원 생성 요청 스키마
 */
export const CreateEmployeeRequestSchema = z.object({
  departmentId: z.string().optional(),
  roleId: z.string().optional(),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  name: z.string().min(1, '이름은 필수입니다.'),
  phoneNumber: z.string().optional(),
  hireDate: z.string().optional(),
  status: EmployeeStatusSchema.default('ACTIVE'),
  isAdmin: z.boolean().default(false),
  meta: z.record(z.unknown()).optional(),
});

/**
 * [요청] 직원 수정 요청 스키마
 */
export const UpdateEmployeeRequestSchema = z.object({
  departmentId: z.string().nullable().optional(),
  roleId: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  name: z.string().min(1).optional(),
  phoneNumber: z.string().nullable().optional(),
  hireDate: z.string().nullable().optional(),
  resignDate: z.string().nullable().optional(),
  status: EmployeeStatusSchema.optional(),
  isAdmin: z.boolean().optional(),
  meta: z.record(z.unknown()).optional(),
});

/**
 * [요청] 직원 비밀번호 변경 요청 스키마 (관리자용)
 */
export const ChangeEmployeePasswordRequestSchema = z
  .object({
    newPassword: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

/**
 * [쿼리] 직원 목록 조회 쿼리 파라미터 스키마
 */
export const GetEmployeesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  departmentId: z.string().optional(),
  roleId: z.string().optional(),
  status: EmployeeStatusSchema.optional(),
  search: z.string().optional(), // 이름, 이메일 통합 검색
  sortBy: z.enum(['name', 'hireDate', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

/**
 * [응답] 직원 목록 조회 응답 스키마 (페이지네이션 포함)
 */
export const GetEmployeesResponseSchema = z.object({
  data: z.array(EmployeeSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * [응답] 직원 상세 정보 스키마 (교육 이력 및 근태 통계 포함)
 */
export const EmployeeDetailSchema = EmployeeSchema.extend({
  educations: z.array(z.any()).optional(), // 추후 EmployeeEducationSchema로 교체 가능
  attendanceStats: z
    .object({
      totalDays: z.number(),
      presentDays: z.number(),
      lateDays: z.number(),
      absentDays: z.number(),
    })
    .optional(),
});

/**
 * [응답] 직원 통계 스키마 (대시보드용)
 */
export const EmployeeStatsSchema = z.object({
  total: z.number(),
  active: z.number(),
  onLeave: z.number(),
  inactive: z.number(),
  byDepartment: z.record(z.number()),
  byRole: z.record(z.number()),
  recentHires: z.number(),
});

// --- 타입 추출 (Type Exports) ---
export type EmployeeStatus = z.infer<typeof EmployeeStatusSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;
export type CreateEmployeeRequest = z.infer<typeof CreateEmployeeRequestSchema>;
export type UpdateEmployeeRequest = z.infer<typeof UpdateEmployeeRequestSchema>;
export type ChangeEmployeePasswordRequest = z.infer<typeof ChangeEmployeePasswordRequestSchema>;
export type GetEmployeesQuery = z.infer<typeof GetEmployeesQuerySchema>;
export type GetEmployeesResponse = z.infer<typeof GetEmployeesResponseSchema>;
export type EmployeeDetail = z.infer<typeof EmployeeDetailSchema>;
export type EmployeeStats = z.infer<typeof EmployeeStatsSchema>;
