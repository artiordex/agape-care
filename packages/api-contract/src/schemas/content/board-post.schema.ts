/**
 * @description 게시판 게시글 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const BoardPostSchema = z.object({
  id: z.coerce.string(),
  boardKey: z.string().min(1, '게시판 키는 필수입니다.'), // 'FREE', 'QNA' 등
  title: z.string().min(1, '제목은 필수입니다.'),
  content: z.string().min(1, '내용은 필수입니다.'),
  authorId: z.coerce.string().nullable().optional(),
  viewCount: z.number().int().default(0),
  isPinned: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BoardPost = z.infer<typeof BoardPostSchema>;
