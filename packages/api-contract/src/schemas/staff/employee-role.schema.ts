/**
 * @description 직원 역할 및 권한(RBAC) 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const EmployeeRoleSchema = z.object({
  id: z.coerce.string(),
  code: z.string().min(1, '역할 코드는 필수입니다.'), // 'ADMIN', 'NURSE' 등
  name: z.string().min(1, '역할명은 필수입니다.'),
  description: z.string().nullable().optional(),
  permissions: z.record(z.any()).default({}), // JSONB 권한 플래그
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EmployeeRole = z.infer<typeof EmployeeRoleSchema>;
