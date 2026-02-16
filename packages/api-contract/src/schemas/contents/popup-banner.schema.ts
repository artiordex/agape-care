/**
 * @description 팝업 및 배너 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const PopupBannerSchema = z.object({
  id: z.coerce.string(),
  title: z.string().min(1, '제목은 필수입니다.'),
  content: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  linkUrl: z.string().nullable().optional(),
  displayType: z.enum(['POPUP', 'BANNER', 'MODAL']).default('POPUP'),
  status: z.enum(['활성', '비활성', '예약']).optional(),
  position: z.object({ x: z.number(), y: z.number() }).nullable().optional(),
  width: z.number().int().nullable().optional(),
  height: z.number().int().nullable().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isActive: z.boolean().default(true),
  showOnce: z.boolean().default(false),
  priority: z.number().int().default(0),
  createdBy: z.coerce.string().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type PopupBanner = z.infer<typeof PopupBannerSchema>;
