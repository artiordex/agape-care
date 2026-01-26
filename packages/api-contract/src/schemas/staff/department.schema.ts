/**
 * @description 부서 정보 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const DepartmentSchema = z.object({
  id: z.coerce.string(),
  code: z.string().min(1, '부서 코드는 필수입니다.'),
  name: z.string().min(1, '부서명은 필수입니다.'),
  description: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Department = z.infer<typeof DepartmentSchema>;
