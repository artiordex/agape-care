/**
 * @description 세부 계정 과목 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.coerce.string(),
  categoryId: z.coerce.string().nullable(),
  code: z.string().min(1, '계정 코드는 필수입니다.'),
  name: z.string().min(1, '계정명은 필수입니다.'),
  description: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateAccountSchema = AccountSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type Account = z.infer<typeof AccountSchema>;
