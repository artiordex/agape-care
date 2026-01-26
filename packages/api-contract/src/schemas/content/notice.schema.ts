/**
 * @description 공지사항 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const NoticeSchema = z.object({
  id: z.coerce.string(),
  title: z.string().min(1, '제목은 필수입니다.'),
  content: z.string().min(1, '내용은 필수입니다.'),
  category: z.string().nullable().default('GENERAL'),
  isPinned: z.boolean().default(false),
  isActive: z.boolean().default(true),
  publishedAt: z.coerce.date().nullable().optional(),
  createdBy: z.coerce.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Notice = z.infer<typeof NoticeSchema>;
