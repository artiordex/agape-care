/**
 * @description 웹사이트 설정 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const WebsiteSettingSchema = z.object({
  id: z.coerce.string(),
  category: z.string().min(1, '카테고리는 필수입니다.'),
  key: z.string().min(1, '키는 필수입니다.'),
  value: z.any().default({}), // JSONB 대응
  description: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  updatedBy: z.coerce.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type WebsiteSetting = z.infer<typeof WebsiteSettingSchema>;
