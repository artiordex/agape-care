/**
 * @description 계정 과목 카테고리 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const AccountKindEnum = z.enum(['INCOME', 'EXPENSE', 'ASSET', 'LIABILITY']);

export const AccountCategorySchema = z.object({
  id: z.coerce.string(),
  code: z.string().min(1, '카테고리 코드는 필수입니다.'),
  name: z.string().min(1, '카테고리명은 필수입니다.'),
  kind: AccountKindEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AccountCategory = z.infer<typeof AccountCategorySchema>;
