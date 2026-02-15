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
  category: z.string().nullable().default('GENERAL'),
  eventDate: z.coerce.date().nullable().optional(),
  createdBy: z.coerce.string().nullable().optional(),
  isPublic: z.boolean().default(true),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  files: z
    .array(
      z.object({
        id: z.coerce.string(),
        file: z
          .object({
            id: z.coerce.string(),
            url: z.string(),
            filename: z.string(),
          })
          .nullable()
          .optional(),
      }),
    )
    .optional(),
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
