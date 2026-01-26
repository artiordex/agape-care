/**
 * @description 직원 기본 정보 및 계정 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const EmployeeStatusEnum = z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE']);

export const EmployeeSchema = z.object({
  id: z.coerce.string(),
  departmentId: z.coerce.string().nullable().optional(),
  roleId: z.coerce.string().nullable().optional(),
  email: z.string().email('올바른 이메일 형식이 아닙니다.').nullable().optional(),
  passwordHash: z.string().nullable().optional(), // API 응답 시에는 보통 생략하거나 처리 필요
  name: z.string().min(1, '이름은 필수입니다.'),
  phoneNumber: z.string().nullable().optional(),
  hireDate: z.coerce.date().nullable().optional(),
  resignDate: z.coerce.date().nullable().optional(),
  status: EmployeeStatusEnum.default('ACTIVE'),
  isAdmin: z.boolean().default(false),
  meta: z.record(z.any()).default({}),
  lastLoginAt: z.coerce.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * 신규 직원 등록용 스키마
 */
export const CreateEmployeeSchema = EmployeeSchema.omit({
  id: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').optional(),
});

/**
 * 직원 정보 수정용 스키마
 */
export const UpdateEmployeeSchema = CreateEmployeeSchema.partial();

export type Employee = z.infer<typeof EmployeeSchema>;
