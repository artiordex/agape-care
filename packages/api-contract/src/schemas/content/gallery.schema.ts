/**
 * @description 갤러리 아이템 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const GalleryItemSchema = z.object({
  id: z.coerce.string(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  eventDate: z.coerce.date().nullable().optional(),
  createdBy: z.coerce.string().nullable().optional(),
  isPublic: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
