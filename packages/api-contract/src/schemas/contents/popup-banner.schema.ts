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
  // 상대 경로도 허용하도록 수정
  imageUrl: z.string().nullable().optional(),
  linkUrl: z.string().nullable().optional(),
  displayType: z.enum(['POPUP', 'BANNER', 'MODAL']).default('POPUP'),
  position: z.string().nullable().optional(),
  width: z.number().int().nullable().optional(),
  height: z.number().int().nullable().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isActive: z.boolean().default(true),
  showOnce: z.boolean().default(false),
  priority: z.number().int().default(0),
  createdBy: z.coerce.string().nullable().optional(),
  // 문자열도 허용하도록 수정
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type PopupBanner = z.infer<typeof PopupBannerSchema>;
