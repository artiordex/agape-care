/**
 * @description 시스템 설정 공통 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

export const SystemSettingSchema = z.object({
  key: z.string(),
  value: z.any(),
  description: z.string().nullable(),
  updatedAt: z.string(),
});

export type SystemSetting = z.infer<typeof SystemSettingSchema>;
